from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from config import HOST, PORT, GROQ_VISION_MODEL, GROQ_TEXT_MODEL
from routers import food_recognition, freshness, hygiene, cooking, nutrition

app = FastAPI(
    title="Food Verse AI - Multimodal Food Intelligence Platform",
    description="Backend API powering Food Recognition, Freshness Detection, Kitchen Hygiene Monitoring, Smart Cooking Assistant, and Personalized Nutrition Planning via Groq AI.",
    version="1.0.0"
)

# CORS setup for React Vite development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount all core AI routers
app.include_router(food_recognition.router)
app.include_router(freshness.router)
app.include_router(hygiene.router)
app.include_router(cooking.router)
app.include_router(nutrition.router)

@app.get("/")
def root():
    return {
        "project": "Food Verse AI – Multimodal Food Intelligence Agent",
        "status": "Online",
        "documentation": "/docs",
        "models": {
            "vision": GROQ_VISION_MODEL,
            "text": GROQ_TEXT_MODEL
        },
        "modules": [
            "/api/food/recognize",
            "/api/freshness/detect",
            "/api/hygiene/analyze",
            "/api/cooking/recipe",
            "/api/cooking/guide",
            "/api/nutrition/plan"
        ]
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "ai_engine": "Groq LPU Inference Engine",
        "vision_model": GROQ_VISION_MODEL,
        "text_model": GROQ_TEXT_MODEL,
        "ready": True
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host=HOST, port=PORT, reload=True)
