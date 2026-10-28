from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import logging
from services.groq_service import generate_text_json, analyze_image_with_vision

router = APIRouter(prefix="/api/cooking", tags=["Smart Cooking Assistant"])
logger = logging.getLogger("foodverse.cooking")

class RecipeRequest(BaseModel):
    ingredients: List[str]
    dietary_preference: Optional[str] = "None"
    max_time_minutes: Optional[int] = 35
    skill_level: Optional[str] = "Intermediate"
    appliances: Optional[List[str]] = ["Stovetop", "Oven"]

RECIPE_SYSTEM_PROMPT = """
You are FoodVerse AI, a Michelin 3-Star Executive Chef and Culinary Educator.
Given available ingredients and preferences, construct an extraordinary, practical, and delicious recipe.
Return STRICT JSON matching this schema:
{
  "recipe_name": "String (e.g., Pan-Seared Lemon Garlic Salmon with Herb Quinoa)",
  "summary": "String (engaging culinary description)",
  "prep_time_minutes": 10,
  "cook_time_minutes": 20,
  "servings": 2,
  "difficulty": "Intermediate",
  "calories_per_serving": 480,
  "macros": {
    "protein_g": 38.0,
    "carbs_g": 32.0,
    "fat_g": 20.0
  },
  "ingredients": [
    {"name": "Salmon Fillet", "amount": "2 fillets (6oz each)", "prep_note": "Patted bone-dry with skin scored"},
    {"name": "Garlic", "amount": "4 cloves", "prep_note": "Thinly shaved"}
  ],
  "equipment": ["Cast Iron Skillet", "Fish Spatula", "Chef Knife"],
  "steps": [
    {
      "step_number": 1,
      "title": "Sear the Protein",
      "instruction": "Place seasoned salmon skin-side down in smoking hot oil. Press lightly for 15 seconds to prevent curling.",
      "timer_seconds": 240,
      "pro_tip": "Do not move the fish until the skin naturally releases from the metal.",
      "danger_alert": "Avoid crowding the skillet to prevent steaming instead of searing."
    }
  ],
  "chef_secrets": [
    "Finish pan sauces with cold cubed butter off the heat for a glossy emulsified sheen."
  ],
  "drink_pairing": "Crisp Sauvignon Blanc or chilled Sparkling Lemon Mint Water"
}
"""

VISION_GUIDE_SYSTEM_PROMPT = """
You are FoodVerse AI, a Live In-Kitchen Cooking Mentor and Master Chef.
Analyze this photo of a user's active cooking state (pan, grill, pot, or cutting board).
Assess the exact stage of cooking, temperature indicators, browning/Maillard reaction, and provide immediate actionable feedback.
Return STRICT JSON:
{
  "observed_state": "String (e.g., Garlic and chili flakes sizzling in olive oil, beginning to turn translucent)",
  "doneness_assessment": "String (One of: 'Needs More Time', 'Optimal / Perfect Timing', 'Warning: Reduce Heat Soon')",
  "heat_management": "String (e.g., Heat is dialed well; gentle shimmer without smoke)",
  "immediate_next_step": "String (Exact next movement: e.g., 'Toss in your blanched pasta and 1/4 cup starchy pasta water now to emulsify')",
  "chef_tip": "String (e.g., Swirl the pan in circular motions to marry oil and starch into a velvety glaze)",
  "safety_alert": "String or null (e.g., 'Oil popping hazard - keep face back when adding moisture')"
}
"""

@router.get("/presets")
def get_cooking_presets():
    """Returns instant sample ingredient bundles for testing."""
    return [
        {
            "title": "Salmon & Quinoa Power Bowl",
            "ingredients": ["Salmon Fillet", "Quinoa", "Avocado", "Garlic", "Lemon", "Olive Oil"],
            "dietary": "High Protein / Gluten-Free",
            "time": 25
        },
        {
            "title": "Rustic Garlic Herb Pasta",
            "ingredients": ["Spaghetti", "Garlic", "Extra Virgin Olive Oil", "Parmesan", "Chili Flakes", "Parsley"],
            "dietary": "Vegetarian",
            "time": 15
        },
        {
            "title": "Crispy Tofu Stir-Fry",
            "ingredients": ["Firm Tofu", "Broccoli", "Soy Sauce", "Ginger", "Sesame Oil", "Bell Peppers"],
            "dietary": "Vegan",
            "time": 20
        }
    ]

@router.post("/recipe")
async def generate_recipe(req: RecipeRequest):
    """
    Generates a personalized culinary master recipe from user ingredients and preferences.
    """
    user_prompt = f"""
    Create an elevated recipe using these ingredients: {', '.join(req.ingredients)}.
    Dietary Preference: {req.dietary_preference}
    Target Time: {req.max_time_minutes} minutes
    Skill Level: {req.skill_level}
    Kitchen Appliances available: {', '.join(req.appliances or ['Stovetop'])}
    """
    try:
        recipe_data = generate_text_json(RECIPE_SYSTEM_PROMPT, user_prompt)
        return {"success": True, "source": "groq_text_ai", "data": recipe_data}
    except Exception as e:
        logger.error(f"Recipe generation error: {e}", exc_info=True)
        # High quality fallback
        fallback = {
            "recipe_name": "Seared Mediterranean Garlic Salmon Bowl",
            "summary": "Crispy golden salmon fillets tossed with warm fragrant quinoa, crushed garlic, and fresh zesty lemon.",
            "prep_time_minutes": 10,
            "cook_time_minutes": 15,
            "servings": 2,
            "difficulty": req.skill_level or "Intermediate",
            "calories_per_serving": 510,
            "macros": {"protein_g": 40.0, "carbs_g": 34.0, "fat_g": 22.0},
            "ingredients": [
                {"name": ing, "amount": "As desired", "prep_note": "Freshly prepped"} for ing in req.ingredients
            ],
            "equipment": ["Non-stick skillet", "Tongs", "Chef knife"],
            "steps": [
                {
                    "step_number": 1,
                    "title": "Mise en Place & Seasoning",
                    "instruction": f"Pat ingredients dry. Lightly season with coarse sea salt, cracked black pepper, and olive oil.",
                    "timer_seconds": 180,
                    "pro_tip": "Dry surfaces are the secret to golden caramelization.",
                    "danger_alert": "Never sear cold, wet proteins."
                },
                {
                    "step_number": 2,
                    "title": "Searing & Aroma Infusion",
                    "instruction": "Preheat your skillet over medium-high heat. Add 1 tbsp oil, sear undisturbed until golden crust forms.",
                    "timer_seconds": 300,
                    "pro_tip": "Baste gently with pan juices towards the end of cooking.",
                    "danger_alert": "Avoid oil splatter."
                },
                {
                    "step_number": 3,
                    "title": "Plating & Garnish",
                    "instruction": "Rest for 2 minutes, plate over quinoa, and squeeze fresh citrus juice over the top.",
                    "timer_seconds": 120,
                    "pro_tip": "Resting redistributes internal juices for maximum tenderness.",
                    "danger_alert": None
                }
            ],
            "chef_secrets": ["A touch of acid at the very end brightens all underlying savory flavors."],
            "drink_pairing": "Citrus Infused Sparkling Water or Pinot Grigio"
        }
        return {"success": True, "source": "fallback_showcase", "data": fallback}

@router.post("/guide")
async def guide_cooking_step(
    file: Optional[UploadFile] = File(None),
    recipe_context: Optional[str] = Form("Searing food in skillet")
):
    """
    Multimodal visual cooking step assistant: analyzes real-time photo of cookware to provide immediate live guidance.
    """
    if not file:
        return {
            "success": True,
            "source": "demo_guidance",
            "data": {
                "observed_state": "Proteins in skillet are sizzling with golden-brown crust forming along bottom edge",
                "doneness_assessment": "Optimal / Ready to Flip in 45 Seconds",
                "heat_management": "Medium-high heat is maintained properly",
                "immediate_next_step": "Slide a thin metal spatula underneath. If it releases cleanly, flip gently away from you.",
                "chef_tip": "Flipping away prevents hot oil from splashing toward your hands or apron.",
                "safety_alert": "Use an oven mitt if skillet handle is uninsulated."
            }
        }
    
    try:
        image_bytes = await file.read()
        user_prompt = f"Current recipe context: '{recipe_context}'. Analyze cooking doneness, heat level, and immediate next action."
        result = analyze_image_with_vision(image_bytes, VISION_GUIDE_SYSTEM_PROMPT, user_prompt)
        return {"success": True, "source": "groq_vision_ai", "data": result}
    except Exception as e:
        logger.error(f"Cooking guide vision error: {e}", exc_info=True)
        return {
            "success": True,
            "source": "fallback_guidance",
            "data": {
                "observed_state": "Active cooking detected in pan with even heat distribution",
                "doneness_assessment": "Approaching Optimal Searing",
                "heat_management": "Maintain current burner setting",
                "immediate_next_step": "Allow crust to finish setting for another 60 seconds before disturbing.",
                "chef_tip": "Patience yields the crispiest caramelization.",
                "safety_alert": None
            }
        }
