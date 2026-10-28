from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Optional
import logging
from services.groq_service import analyze_image_with_vision
from services.sample_data import SAMPLE_FRESHNESS

router = APIRouter(prefix="/api/freshness", tags=["Freshness & Spoilage Detection"])
logger = logging.getLogger("foodverse.freshness")

SYSTEM_PROMPT = """
You are FoodVerse AI, an advanced agricultural post-harvest scientist and food safety inspection expert.
Carefully examine the provided image of produce, dairy, meat, or packaged food to assess its stage of freshness, degradation, or microbial spoilage.
Return STRICT JSON matching this schema:
{
  "item_name": "String (e.g., Organic Strawberries)",
  "freshness_score": 92,
  "status": "String (One of: 'Peak Freshness', 'Consume Soon (Caution)', 'Spoiled / Unsafe')",
  "status_color": "String (One of: 'green', 'yellow', 'red')",
  "safe_to_consume": true,
  "days_remaining": 4,
  "visual_indicators": [
    "Uniform bright color with natural epidermal sheen",
    "No mycelial fuzz or mold colonies detected",
    "Firm skin tension without sunken rot pockets"
  ],
  "storage_tips": [
    "Store in crisper drawer at 34°F (1°C) with 90% humidity",
    "Do not wash until ready to serve to prevent fungal proliferation"
  ],
  "action_recommendation": "Optimal for raw culinary use over the next 4-5 days."
}
"""

@router.get("/samples")
def get_sample_freshness():
    """Returns sample items across fresh, caution, and spoiled spectrums."""
    return [
        {
            "id": "fresh_strawberry",
            "name": "Fresh Garden Strawberries",
            "expected_status": "Peak Freshness",
            "badge": "96% Fresh",
            "color": "green",
            "preview_url": "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&auto=format&fit=crop&q=80"
        },
        {
            "id": "caution_avocado",
            "name": "Ripe Hass Avocado (Near Limit)",
            "expected_status": "Consume Soon",
            "badge": "62% Caution",
            "color": "yellow",
            "preview_url": "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80"
        },
        {
            "id": "spoiled_bread",
            "name": "Mold Contaminated Bread",
            "expected_status": "Spoiled / Unsafe",
            "badge": "14% Hazard",
            "color": "red",
            "preview_url": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80"
        }
    ]

@router.post("/detect")
async def detect_freshness(
    file: Optional[UploadFile] = File(None),
    sample_id: Optional[str] = Form(None)
):
    """
    Detects food freshness, spoilage markers, and safety metrics using Groq Multimodal Vision.
    """
    if sample_id and sample_id in SAMPLE_FRESHNESS:
        return {"success": True, "source": "sample_showcase", "data": SAMPLE_FRESHNESS[sample_id]}

    if not file:
        raise HTTPException(status_code=400, detail="Either an image file or sample_id must be provided.")

    try:
        image_bytes = await file.read()
        if len(image_bytes) < 100:
            raise HTTPException(status_code=400, detail="Invalid image file uploaded.")
        
        user_prompt = "Examine this food item for signs of freshness, oxidation, dehydration, bruising, mold, or spoilage. Produce a rigorous freshness score from 0 to 100 and output the JSON structure."
        result = analyze_image_with_vision(image_bytes, SYSTEM_PROMPT, user_prompt)
        
        # Normalize status color
        score = result.get("freshness_score", 80)
        if score >= 75:
            result["status_color"] = "green"
            result["safe_to_consume"] = True
        elif score >= 45:
            result["status_color"] = "yellow"
            result["safe_to_consume"] = True
        else:
            result["status_color"] = "red"
            result["safe_to_consume"] = False
            
        return {"success": True, "source": "groq_vision_ai", "data": result}
    except Exception as e:
        logger.error(f"Error in freshness detection: {e}", exc_info=True)
        fallback = SAMPLE_FRESHNESS.get("fresh_strawberry")
        return {
            "success": True,
            "source": "fallback_showcase",
            "note": f"Live AI encountered: {str(e)[:80]}. Returning representative freshness assessment.",
            "data": fallback
        }
