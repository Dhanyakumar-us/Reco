"""
FastAPI Server for Laptop Recommendation System
"""

from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sys
import os

# Include local backend modules
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import MOCK_LAPTOPS, MOCK_MARKET_TRENDS, MOCK_SEASONAL_EVENTS, MOCK_NEWS_ITEMS
from recommendation.engine import rank_laptops
from models.price_predictor import predict_laptop_price
from chatbot.advisor import generate_chatbot_response

app = FastAPI(
    title="Laptop Recommendation Engine API",
    description="API for laptop matching, price prediction, market trends, and chatbot advisor",
    version="1.0.0"
)

# Enable CORS for frontend Vite dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class RecommendRequest(BaseModel):
    useCase: str = "gaming"
    budget: float = 150000.0
    minRam: int = 16
    minStorage: int = 512
    preferredBrand: str | None = None
    minBatteryHours: float | None = 0.0
    maxWeightKg: float | None = 5.0
    needsDedicatedGpu: bool = False
    preferredGpuTier: str = "any"
    minGpuTgpWatts: int = 0


class ChatRequest(BaseModel):
    message: str
    laptopId: str | None = None


@app.get("/api/health")
def health_check():
    return {"status": "ok", "app": "Laptop Recommendation System API"}


@app.get("/api/laptops")
def get_laptops(
    category: str | None = None,
    brand: str | None = None,
    maxPrice: float | None = None,
    minRam: int | None = None
):
    results = list(MOCK_LAPTOPS)
    
    if category and category != "all":
        results = [l for l in results if l["category"] == category]
    if brand:
        results = [l for l in results if l["brand"].lower() == brand.lower()]
    if maxPrice:
        results = [l for l in results if l["currentBestPrice"] <= maxPrice]
    if minRam:
        results = [l for l in results if l["specs"]["ramGB"] >= minRam]
        
    return {"success": True, "count": len(results), "laptops": results}


@app.get("/api/laptops/{laptop_id}")
def get_laptop_detail(laptop_id: str):
    for laptop in MOCK_LAPTOPS:
        if laptop["id"] == laptop_id:
            detail = dict(laptop)
            detail["prediction"] = predict_laptop_price(laptop)
            return {"success": True, "laptop": detail}
    raise HTTPException(status_code=404, detail="Laptop not found")


@app.post("/api/recommend")
def recommend_laptops(req: RecommendRequest):
    prefs = req.model_dump()
    ranked = rank_laptops(MOCK_LAPTOPS, prefs)
    return {
        "success": True,
        "totalMatches": len(ranked),
        "userPreferences": prefs,
        "recommendations": ranked
    }


@app.get("/api/market-trends")
def get_market_trends():
    return {
        "success": True,
        "trends": MOCK_MARKET_TRENDS,
        "events": MOCK_SEASONAL_EVENTS,
        "news": MOCK_NEWS_ITEMS
    }


@app.post("/api/chatbot")
def chatbot_endpoint(req: ChatRequest):
    resp = generate_chatbot_response(req.message, req.laptopId, MOCK_LAPTOPS)
    return {"success": True, "reply": resp}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
