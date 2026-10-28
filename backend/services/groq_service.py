import os
import io
import json
import re
import base64
import logging
from PIL import Image
from groq import Groq
from config import GROQ_API_KEY, GROQ_VISION_MODEL, GROQ_TEXT_MODEL

logger = logging.getLogger("foodverse.groq")
logging.basicConfig(level=logging.INFO)

client = Groq(api_key=GROQ_API_KEY)

def prepare_image_base64(image_bytes: bytes, max_size=(1024, 1024)) -> str:
    """
    Validates, resizes if necessary, and encodes an image to JPEG base64.
    Ensures minimum dimension of 64px to prevent vision model dimension errors.
    """
    img = Image.open(io.BytesIO(image_bytes))
    if img.mode in ("RGBA", "P"):
        img = img.convert("RGB")
    
    # Enforce minimum dimension
    w, h = img.size
    if w < 64 or h < 64:
        new_w = max(64, w)
        new_h = max(64, h)
        img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)

    # Enforce maximum dimension
    img.thumbnail(max_size, Image.Resampling.LANCZOS)
    
    buffered = io.BytesIO()
    img.save(buffered, format="JPEG", quality=85)
    return base64.b64encode(buffered.getvalue()).decode("utf-8")

def clean_json_response(raw_text: str) -> dict:
    """
    Extracts and parses JSON from LLM output, handling markdown fences or preamble.
    """
    text = raw_text.strip()
    # Check for ```json ... ``` or ``` ... ```
    match = re.search(r"```(?:json)?\s*([\s\S]*?)\s*```", text)
    if match:
        text = match.group(1).strip()
    
    # Locate first { or [ and last } or ]
    start = min([i for i in [text.find("{"), text.find("[")] if i != -1], default=-1)
    end = max([text.rfind("}"), text.rfind("]")])
    if start != -1 and end != -1:
        text = text[start:end+1]
    
    try:
        return json.loads(text)
    except Exception as e:
        logger.error(f"Failed to parse JSON directly: {e}. Raw: {raw_text[:200]}")
        # Try gentle fixes like removing trailing commas
        cleaned = re.sub(r",\s*([\]}])", r"\1", text)
        return json.loads(cleaned)

def analyze_image_with_vision(image_bytes: bytes, system_prompt: str, user_prompt: str) -> dict:
    """
    Sends an image and prompt to Groq vision model and returns parsed JSON.
    """
    b64_image = prepare_image_base64(image_bytes)
    full_prompt = f"{system_prompt}\n\nTask: {user_prompt}\n\nIMPORTANT: Respond ONLY with a valid JSON object matching the requested schema. Do not include introductory or explanatory conversational text."
    
    try:
        response = client.chat.completions.create(
            model=GROQ_VISION_MODEL,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": full_prompt},
                        {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{b64_image}"}}
                    ]
                }
            ],
            response_format={"type": "json_object"},
            temperature=0.2,
            max_tokens=2048
        )
        content = response.choices[0].message.content
        return clean_json_response(content)
    except Exception as e:
        logger.error(f"Groq Vision API error: {e}")
        # Try fallback without response_format if needed
        try:
            response = client.chat.completions.create(
                model=GROQ_VISION_MODEL,
                messages=[
                    {
                        "role": "user",
                        "content": [
                            {"type": "text", "text": full_prompt + " Output raw JSON."},
                            {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{b64_image}"}}
                        ]
                    }
                ],
                temperature=0.2,
                max_tokens=2048
            )
            return clean_json_response(response.choices[0].message.content)
        except Exception as e2:
            logger.error(f"Groq Vision API retry failed: {e2}")
            raise e2

def generate_text_json(system_prompt: str, user_prompt: str, model: str = None) -> dict:
    """
    Generates structured JSON using Groq's high-capacity text model.
    """
    chosen_model = model or GROQ_TEXT_MODEL
    full_prompt = f"{system_prompt}\n\nRequest: {user_prompt}\n\nIMPORTANT: Respond ONLY with a valid JSON object matching the requested schema. No markdown wrapping."
    
    try:
        response = client.chat.completions.create(
            model=chosen_model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt + "\n\nOutput only valid JSON."}
            ],
            response_format={"type": "json_object"},
            temperature=0.4,
            max_tokens=3000
        )
        content = response.choices[0].message.content
        return clean_json_response(content)
    except Exception as e:
        logger.error(f"Groq Text API error: {e}")
        # Fallback to secondary model if primary fails
        if chosen_model != GROQ_VISION_MODEL:
            logger.info(f"Retrying with fallback model {GROQ_VISION_MODEL}")
            return generate_text_json(system_prompt, user_prompt, model=GROQ_VISION_MODEL)
        raise e
