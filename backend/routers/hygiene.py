from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Optional
import logging
from services.groq_service import analyze_image_with_vision
from services.sample_data import SAMPLE_HYGIENE

router = APIRouter(prefix="/api/hygiene", tags=["Restaurant Hygiene & Smart Kitchen"])
logger = logging.getLogger("foodverse.hygiene")

SYSTEM_PROMPT = """
You are FoodVerse AI, a Senior HACCP Food Safety Auditor and Commercial Kitchen Inspector.
Analyze this photo of a commercial or domestic kitchen, food prep station, line cook area, or dining facility.
Inspect surface sanitation, cross-contamination risks, utensil storage, grease accumulation, personal protective equipment, and regulatory compliance.
Return STRICT JSON matching this schema:
{
  "facility_name": "String (e.g., Commercial Prep Line #2)",
  "overall_score": 91,
  "grade": "String (One of: 'A', 'B', 'C', 'F')",
  "grade_color": "String (One of: 'green', 'yellow', 'red')",
  "compliance_status": "String (e.g., Fully Compliant with FDA/HACCP Standards)",
  "categories": [
    {"name": "Cross-Contamination Prevention", "score": 95, "status": "Pass", "notes": "Proper segregation of raw vs ready-to-eat"},
    {"name": "Surface Sanitation & Cleanliness", "score": 90, "status": "Pass", "notes": "Stainless surfaces wiped and sanitized"},
    {"name": "Personnel Hygiene & PPE", "score": 88, "status": "Pass", "notes": "Gloves and headwear in order"},
    {"name": "Waste & Storage Management", "score": 92, "status": "Pass", "notes": "Receptacles covered and clean"}
  ],
  "violations": [
    {
      "severity": "Minor",
      "code": "SEC-04",
      "title": "Unlabeled Sanitizer Dispenser",
      "description": "Secondary spray bottle lacking chemical safety hazard labeling.",
      "remedy": "Affix OSHA compliant secondary label immediately."
    }
  ],
  "commendations": [
    "Stainless steel prep tables maintained with mirror clean finish",
    "No organic residue accumulation around cutting station"
  ],
  "recommendations": [
    "Verify quat test strip concentration at next shift turnover"
  ]
}
"""

@router.get("/samples")
def get_sample_kitchens():
    """Returns sample inspection scenes."""
    return [
        {
            "id": "clean_kitchen",
            "name": "Pristine Commercial Prep Kitchen",
            "grade": "Grade A (95%)",
            "color": "green",
            "preview_url": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80"
        },
        {
            "id": "moderate_kitchen",
            "name": "Active Line Station with Cross-Contact Hazard",
            "grade": "Grade C (74%)",
            "color": "yellow",
            "preview_url": "https://images.unsplash.com/photo-1574966739985-e24b4ce63b8b?w=600&auto=format&fit=crop&q=80"
        }
    ]

@router.post("/analyze")
async def analyze_hygiene(
    file: Optional[UploadFile] = File(None),
    sample_id: Optional[str] = Form(None)
):
    """
    Analyzes kitchen/restaurant imagery for sanitary compliance, food safety risks, and hygiene grading.
    """
    if sample_id and sample_id in SAMPLE_HYGIENE:
        return {"success": True, "source": "sample_showcase", "data": SAMPLE_HYGIENE[sample_id]}

    if not file:
        raise HTTPException(status_code=400, detail="Either an image file or sample_id must be provided.")

    try:
        image_bytes = await file.read()
        if len(image_bytes) < 100:
            raise HTTPException(status_code=400, detail="Invalid image file uploaded.")
        
        user_prompt = "Perform an exhaustive health inspection on this kitchen image. Check for grease, cross-contact, utensil hygiene, clutter, and sanitation. Output the complete JSON analysis."
        result = analyze_image_with_vision(image_bytes, SYSTEM_PROMPT, user_prompt)
        
        score = result.get("overall_score", 85)
        if score >= 90:
            result["grade"] = "A"
            result["grade_color"] = "green"
        elif score >= 80:
            result["grade"] = "B"
            result["grade_color"] = "green"
        elif score >= 70:
            result["grade"] = "C"
            result["grade_color"] = "yellow"
        else:
            result["grade"] = "F"
            result["grade_color"] = "red"
            
        result.setdefault("violations", [])
        result.setdefault("commendations", ["Kitchen space shows organized workflow structure"])
        result.setdefault("recommendations", ["Maintain standard sanitization schedule"])
        
        return {"success": True, "source": "groq_vision_ai", "data": result}
    except Exception as e:
        logger.error(f"Error in hygiene analysis: {e}", exc_info=True)
        fallback = SAMPLE_HYGIENE.get("clean_kitchen")
        return {
            "success": True,
            "source": "fallback_showcase",
            "note": f"Live AI encountered: {str(e)[:80]}. Returning standard inspection report.",
            "data": fallback
        }
