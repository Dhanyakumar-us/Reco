"""
Laptop Recommendation System - Full Stack Application Server
Serves REST API and Rich Web UI with Student Benefits, UNiDAYS Discounts, GPU TGP Power, Pros/Cons, Benchmarks & Cooling Architecture.
"""

from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import os
import sys

# Import local backend modules
sys.path.append(os.path.join(os.path.dirname(__file__), "backend"))

from database import MOCK_LAPTOPS, MOCK_MARKET_TRENDS, MOCK_SEASONAL_EVENTS, MOCK_NEWS_ITEMS
from recommendation.engine import rank_laptops
from models.price_predictor import predict_laptop_price
from chatbot.advisor import generate_chatbot_response

app = FastAPI(
    title="ApexFind - Laptop Recommendation System",
    description="Full-stack AI laptop recommendation engine with Student Benefits, Education Discounts & GPU TGP analysis",
    version="1.0.0"
)

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


# REST API Endpoints
@app.get("/api/health")
def health_check():
    return {"status": "ok", "app": "ApexFind Laptop Recommendation Engine"}


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


# Serve Single Page Web App HTML
@app.get("/", response_class=HTMLResponse)
def serve_ui():
    html_content = """<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ApexFind - Intelligent Laptop Recommendation Engine (₹)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: { sans: ['Inter', 'sans-serif'] },
          colors: {
            dark: { base: '#0B0F19', card: '#111827', surface: '#1F2937' }
          }
        }
      }
    }
  </script>
  <style>
    body { background-color: #0B0F19; color: #F3F4F6; font-family: 'Inter', sans-serif; }
    .glass-panel { background: rgba(17, 24, 39, 0.75); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.08); }
    .glass-panel-hover:hover { background: rgba(31, 41, 55, 0.85); border-color: rgba(6, 182, 212, 0.4); transform: translateY(-2px); transition: all 0.3s ease; }
    .gradient-text { background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .shadow-glow-cyan { box-shadow: 0 0 25px -4px rgba(6, 182, 212, 0.35); }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #0B0F19; }
    ::-webkit-scrollbar-thumb { background: #1F2937; border-radius: 3px; }
  </style>
</head>
<body class="min-h-screen flex flex-col selection:bg-cyan-500 selection:text-black">

  <!-- Header -->
  <header class="sticky top-0 z-30 glass-panel border-b border-gray-800 px-6 py-4 flex items-center justify-between">
    <div class="max-w-7xl mx-auto w-full flex items-center justify-between">
      <div class="flex items-center gap-3 cursor-pointer" onclick="switchTab('recommendations')">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5 shadow-glow-cyan">
          <div class="w-full h-full bg-[#0B0F19] rounded-[10px] flex items-center justify-center font-black text-cyan-400">🎓</div>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <span class="font-extrabold text-xl tracking-tight text-white">Apex<span class="gradient-text">Find</span></span>
            <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">Student Perks & Education Engine</span>
          </div>
          <p class="text-xs text-gray-400 hidden sm:block">UNiDAYS Discounts, Student Perks, Free AirPods/Gear & Laptop Recommendations</p>
        </div>
      </div>

      <nav class="flex items-center gap-1 bg-gray-900/90 p-1 rounded-xl border border-gray-800 text-xs font-semibold">
        <button id="nav-recommendations" onclick="switchTab('recommendations')" class="px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">Recommendations</button>
        <button id="nav-wizard" onclick="switchTab('wizard')" class="px-4 py-2 rounded-lg text-gray-400 hover:text-white">Spec Matcher</button>
        <button id="nav-trends" onclick="switchTab('trends')" class="px-4 py-2 rounded-lg text-gray-400 hover:text-white">Market Trends</button>
        <button id="nav-compare" onclick="switchTab('compare')" class="px-4 py-2 rounded-lg text-gray-400 hover:text-white relative">
          Compare <span id="compare-badge" class="ml-1 px-1.5 py-0.2 rounded-full bg-amber-500 text-black text-[10px] font-bold">0</span>
        </button>
      </nav>

      <button onclick="toggleChatbot()" class="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs shadow-glow-cyan">
        <span>💬 AI Advisor</span>
      </button>
    </div>
  </header>

  <!-- Main Body Content -->
  <main class="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-8 space-y-8">
    
    <!-- Tab 1: Recommendations -->
    <div id="tab-recommendations" class="space-y-8">
      
      <!-- Hero Banner -->
      <div class="glass-panel rounded-3xl p-8 md:p-10 border border-gray-800 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="relative z-10 max-w-2xl">
          <span class="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold mb-3">🎓 Student Education Discounts & Free Tech Perks Included</span>
          <h1 class="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Find Your Ideal Laptop at <span class="gradient-text">Student Prices (₹)</span>
          </h1>
          <p class="text-sm text-gray-300 mt-3 leading-relaxed">
            Unlock UNiDAYS student cashbacks, free AirPods/backpack bundles, 3-year warranty for ₹999, and live pricing from Amazon India, Flipkart & Education Stores.
          </p>
          <div class="flex flex-wrap items-center gap-2 mt-6 text-xs">
            <span class="text-gray-400">Match Profile:</span>
            <span id="pill-usecase" class="font-bold px-2.5 py-1 rounded-lg bg-gray-800 text-cyan-400 border border-gray-700">Gaming Workload</span>
            <span id="pill-budget" class="font-bold px-2.5 py-1 rounded-lg bg-gray-800 text-emerald-400 border border-gray-700">Max ₹1,50,000</span>
            <span id="pill-gpu" class="font-bold px-2.5 py-1 rounded-lg bg-gray-800 text-amber-400 border border-gray-700">GPU: Any TGP</span>
            <span id="pill-ram" class="font-bold px-2.5 py-1 rounded-lg bg-gray-800 text-purple-400 border border-gray-700">16GB+ RAM</span>
            <button onclick="switchTab('wizard')" class="font-bold px-3 py-1 rounded-lg bg-cyan-500 text-black shadow-glow-cyan">Tune Specs</button>
          </div>
        </div>
      </div>

      <!-- Filters Bar -->
      <div class="glass-panel p-4 rounded-2xl border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="relative w-full md:w-80">
          <input type="text" id="search-input" oninput="renderLaptops()" placeholder="Search laptops, student perks, GPUs..." class="w-full bg-gray-900 text-white placeholder-gray-500 text-xs rounded-xl px-4 py-2.5 border border-gray-800 focus:outline-none focus:border-cyan-400">
        </div>

        <div class="flex items-center gap-1.5 overflow-x-auto text-xs">
          <button onclick="setCategoryFilter('all')" class="cat-pill px-3 py-1.5 rounded-lg font-semibold bg-cyan-500 text-black shadow-glow-cyan" data-cat="all">All</button>
          <button onclick="setCategoryFilter('student')" class="cat-pill px-3 py-1.5 rounded-lg font-semibold bg-gray-900 text-gray-400 border border-gray-800" data-cat="student">🎓 Student Picks</button>
          <button onclick="setCategoryFilter('gaming')" class="cat-pill px-3 py-1.5 rounded-lg font-semibold bg-gray-900 text-gray-400 border border-gray-800" data-cat="gaming">Gaming</button>
          <button onclick="setCategoryFilter('coding')" class="cat-pill px-3 py-1.5 rounded-lg font-semibold bg-gray-900 text-gray-400 border border-gray-800" data-cat="coding">Coding</button>
          <button onclick="setCategoryFilter('creator')" class="cat-pill px-3 py-1.5 rounded-lg font-semibold bg-gray-900 text-gray-400 border border-gray-800" data-cat="creator">Creator</button>
          <button onclick="setCategoryFilter('budget')" class="cat-pill px-3 py-1.5 rounded-lg font-semibold bg-gray-900 text-gray-400 border border-gray-800" data-cat="budget">Budget</button>
        </div>

        <select id="sort-select" onchange="renderLaptops()" class="bg-gray-900 text-white text-xs rounded-xl px-3 py-2 border border-gray-800">
          <option value="match">Sort: Highest Match Score</option>
          <option value="student_savings">Best Student Savings (₹)</option>
          <option value="power">Highest Power Rating (/10)</option>
          <option value="price_low">Price: Low to High</option>
          <option value="rating">Highest Customer Rating</option>
        </select>
      </div>

      <!-- Laptop Cards Grid -->
      <div id="laptops-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
    </div>

    <!-- Tab 2: Spec Matcher Wizard -->
    <div id="tab-wizard" class="hidden glass-panel rounded-2xl p-8 border border-gray-800 space-y-8">
      <div>
        <h2 class="text-2xl font-bold text-white">Smart Specification & GPU Matcher</h2>
        <p class="text-xs text-gray-400 mt-1">Specify your exact workload, RAM, storage, and GPU Total Graphics Power (TGP in Watts) requirements.</p>
      </div>

      <div class="space-y-6">
        <div>
          <label class="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-3">1. Primary Use-Case Category</label>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            <button type="button" onclick="selectWizardUsecase('student')" class="wiz-uc p-4 rounded-xl border bg-purple-500/20 border-purple-400 text-white font-bold text-sm text-left" data-uc="student">🎓 Student & Portable</button>
            <button type="button" onclick="selectWizardUsecase('gaming')" class="wiz-uc p-4 rounded-xl border bg-gray-900 border-gray-800 text-gray-400 hover:text-white font-bold text-sm text-left" data-uc="gaming">🎮 Gaming & VR</button>
            <button type="button" onclick="selectWizardUsecase('coding')" class="wiz-uc p-4 rounded-xl border bg-gray-900 border-gray-800 text-gray-400 hover:text-white font-bold text-sm text-left" data-uc="coding">💻 Coding & Software Dev</button>
            <button type="button" onclick="selectWizardUsecase('creator')" class="wiz-uc p-4 rounded-xl border bg-gray-900 border-gray-800 text-gray-400 hover:text-white font-bold text-sm text-left" data-uc="creator">🎬 Video & 3D Editing</button>
            <button type="button" onclick="selectWizardUsecase('business')" class="wiz-uc p-4 rounded-xl border bg-gray-900 border-gray-800 text-gray-400 hover:text-white font-bold text-sm text-left" data-uc="business">💼 Business & Office</button>
            <button type="button" onclick="selectWizardUsecase('budget')" class="wiz-uc p-4 rounded-xl border bg-gray-900 border-gray-800 text-gray-400 hover:text-white font-bold text-sm text-left" data-uc="budget">🏷️ Everyday Budget</button>
          </div>
        </div>

        <div class="bg-gray-900/90 p-5 rounded-xl border border-cyan-500/30 space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-base font-bold text-cyan-400">⚡ 2. GPU Graphics & Total Power (TGP Watts)</span>
            </div>
            <span class="text-xs px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">Graphics Power Config</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="text-xs font-semibold text-gray-300 uppercase block mb-1.5">Preferred GPU Class</label>
              <select id="wiz-gpu-tier" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-white">
                <option value="any">Any GPU (Integrated or Discrete)</option>
                <option value="Mid">Mid-Range (NVIDIA RTX 4060 / 4070 - Recommended)</option>
                <option value="High">High-End Enthusiast (NVIDIA RTX 4080 / 4090)</option>
                <option value="Entry">Entry-Level (RTX 3050 / RTX 4050)</option>
                <option value="Integrated">Integrated / Ultra-Efficient (Intel Arc / Apple M3)</option>
              </select>
            </div>

            <div>
              <label class="text-xs font-semibold text-gray-300 uppercase block mb-1.5">Minimum GPU Power (TGP in Watts)</label>
              <select id="wiz-gpu-tgp" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-white">
                <option value="0">Any TGP Wattage</option>
                <option value="50">50W+ TGP (Thin & Light Discrete)</option>
                <option value="100">100W+ TGP (High Performance Gaming)</option>
                <option value="140">140W - 175W TGP (Maximum Unlocked TGP)</option>
              </select>
            </div>
          </div>
        </div>

        <div class="bg-gray-900 p-5 rounded-xl border border-gray-800">
          <div class="flex justify-between mb-2">
            <span class="text-xs font-semibold text-gray-300 uppercase">3. Target Budget Limit (₹)</span>
            <span id="wiz-budget-val" class="text-lg font-extrabold text-emerald-400">₹1,50,000</span>
          </div>
          <input type="range" id="wiz-budget" min="40000" max="350000" step="5000" value="150000" oninput="document.getElementById('wiz-budget-val').innerText = '₹' + Number(this.value).toLocaleString('en-IN')" class="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-emerald-400">
          <div class="flex justify-between text-xs text-gray-400 mt-2 font-mono">
            <span>₹40,000</span>
            <span>₹1,00,000</span>
            <span>₹2,00,000</span>
            <span>₹3,50,000+</span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-800">
            <label class="text-xs font-semibold text-gray-300 uppercase">Min RAM Capacity</label>
            <select id="wiz-ram" class="w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-white">
              <option value="8">8 GB RAM</option>
              <option value="16" selected>16 GB RAM (Recommended)</option>
              <option value="32">32 GB RAM (High-End)</option>
              <option value="64">64 GB RAM (Pro)</option>
            </select>
          </div>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-800">
            <label class="text-xs font-semibold text-gray-300 uppercase">Min Storage Space</label>
            <select id="wiz-storage" class="w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-white">
              <option value="256">256 GB SSD</option>
              <option value="512" selected>512 GB SSD</option>
              <option value="1024">1 TB (1024 GB) SSD</option>
              <option value="2048">2 TB (2048 GB) SSD</option>
            </select>
          </div>
          <div class="bg-gray-900 p-4 rounded-xl border border-gray-800">
            <label class="text-xs font-semibold text-gray-300 uppercase">Min Battery Life</label>
            <select id="wiz-battery" class="w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-white">
              <option value="0">Any Battery</option>
              <option value="6" selected>6+ Hours</option>
              <option value="10">10+ Hours</option>
              <option value="15">15+ Hours</option>
            </select>
          </div>
        </div>

        <div class="flex justify-end pt-4">
          <button onclick="applyWizard()" class="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold text-sm shadow-glow-cyan">
            Calculate & Apply Recommendations 🚀
          </button>
        </div>
      </div>
    </div>

    <!-- Tab 3: Market Trends -->
    <div id="tab-trends" class="hidden space-y-8">
      <div class="glass-panel p-8 rounded-2xl border border-gray-800">
        <h2 class="text-2xl font-bold text-white">Hardware Market Index & Price Trends (₹)</h2>
        <p class="text-xs text-gray-400 mt-1">Tracking Indian e-commerce RAM/NAND/GPU pricing, sales calendar, and news sentiment.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-4" id="trends-cards"></div>
      
      <div>
        <h3 class="text-lg font-bold text-white mb-4">Upcoming Promotional Sales Events</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4" id="events-cards"></div>
      </div>
    </div>

    <!-- Tab 4: Side-by-Side Compare -->
    <div id="tab-compare" class="hidden glass-panel rounded-2xl p-6 border border-gray-800">
      <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-800">
        <h2 class="text-xl font-bold text-white">Side-by-Side Laptop Comparison Matrix (₹)</h2>
        <button onclick="clearCompare()" class="px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-400 text-xs font-bold border border-rose-500/30">Clear Matrix</button>
      </div>
      <div id="compare-table-container" class="overflow-x-auto"></div>
    </div>

  </main>

  <!-- Laptop Detail Modal -->
  <div id="detail-modal" class="fixed inset-0 z-50 hidden flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
    <div class="glass-panel w-full max-w-4xl bg-[#0B0F19] rounded-2xl border border-gray-800 p-6 space-y-6 max-h-[90vh] overflow-y-auto relative">
      <button onclick="closeModal()" class="absolute top-4 right-4 p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white">✕</button>
      <div id="modal-content"></div>
    </div>
  </div>

  <!-- AI Chatbot Drawer -->
  <div id="chatbot-drawer" class="fixed inset-y-0 right-0 z-50 w-full sm:w-[400px] bg-[#0B0F19]/95 backdrop-blur-xl border-l border-gray-800 shadow-2xl flex flex-col justify-between hidden">
    <div class="p-4 border-b border-gray-800 bg-gray-900/80 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-cyan-500 text-black flex items-center justify-center font-bold">🎓</div>
        <div>
          <h4 class="font-bold text-xs text-white">AI Laptop & Student Advisor</h4>
          <span class="text-[10px] text-emerald-400">Online & Ready</span>
        </div>
      </div>
      <button onclick="toggleChatbot()" class="text-gray-400 hover:text-white">✕</button>
    </div>

    <div id="chat-messages" class="p-4 overflow-y-auto space-y-3 flex-1">
      <div class="bg-gray-900 border border-gray-800 p-3 rounded-xl text-xs text-gray-200">
        Namaste! Ask me about Student Discounts (UNiDAYS/College ID), Free AirPods bundles, 10-point Power Ratings, or GPU TGP Power!
      </div>
    </div>

    <form onsubmit="sendChatMessage(event)" class="p-3 border-t border-gray-800 bg-gray-900/80 flex items-center gap-2">
      <input type="text" id="chat-input" placeholder="Ask a laptop or student discount question..." class="flex-1 bg-gray-800 text-white text-xs rounded-xl px-3 py-2 border border-gray-700 focus:outline-none focus:border-cyan-400">
      <button type="submit" class="px-4 py-2 rounded-xl bg-cyan-500 text-black font-bold text-xs shadow-glow-cyan">Send</button>
    </form>
  </div>

  <!-- Application Logic JS -->
  <script>
    let allLaptops = [];
    let currentCategory = 'all';
    let userPrefs = { useCase: 'gaming', budget: 150000, minRam: 16, minStorage: 512, minBatteryHours: 6, preferredGpuTier: 'any', minGpuTgpWatts: 0 };
    let comparedIds = [];

    function formatRupees(num) {
      return '₹' + Number(num).toLocaleString('en-IN');
    }

    async function loadData() {
      try {
        const res = await fetch('/api/recommend', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(userPrefs)
        });
        const data = await res.json();
        allLaptops = data.recommendations;
      } catch(e) { console.error(e); }
      renderLaptops();
      loadTrends();
    }

    async function loadTrends() {
      try {
        const res = await fetch('/api/market-trends');
        const data = await res.json();
        renderTrends(data.trends, data.events);
      } catch(e) {}
    }

    function renderLaptops() {
      const grid = document.getElementById('laptops-grid');
      const search = document.getElementById('search-input').value.toLowerCase();
      const sort = document.getElementById('sort-select').value;

      let filtered = allLaptops.filter(l => {
        const matchCat = currentCategory === 'all' || l.category === currentCategory;
        const matchSearch = search === '' || l.name.toLowerCase().includes(search) || l.brand.toLowerCase().includes(search) || l.specs.gpu.toLowerCase().includes(search) || (l.certifications || []).some(c => c.toLowerCase().includes(search));
        return matchCat && matchSearch;
      });

      filtered.sort((a,b) => {
        if(sort === 'match') return (b.matchScore || 0) - (a.matchScore || 0);
        if(sort === 'power') return (b.powerScore10 || 0) - (a.powerScore10 || 0);
        if(sort === 'student_savings') return (a.studentBenefits ? a.studentBenefits.studentPrice : a.currentBestPrice) - (b.studentBenefits ? b.studentBenefits.studentPrice : b.currentBestPrice);
        if(sort === 'price_low') return a.currentBestPrice - b.currentBestPrice;
        if(sort === 'rating') return b.reviews.rating - a.reviews.rating;
        return 0;
      });

      grid.innerHTML = filtered.map(l => {
        const bestRetailer = l.retailers.find(r => r.isBestDeal) || l.retailers[0];
        const tgp = l.specs.tgpWatts || 30;
        const powerScore = l.powerScore10 || 9.2;
        const student = l.studentBenefits || {};
        const certs = (l.certifications || []).slice(0, 2);

        return `
        <div class="glass-panel glass-panel-hover rounded-2xl overflow-hidden border border-gray-800 flex flex-col justify-between p-5 space-y-4">
          <div class="relative h-44 rounded-xl overflow-hidden bg-gray-900">
            <img src="${l.image}" class="w-full h-full object-cover">
            <div class="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/80 text-cyan-400 font-black text-xs border border-cyan-500/30">
              ⚡ ${l.matchScore || 95}% Match
            </div>
            <div class="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-extrabold text-[11px] border border-amber-500/30 backdrop-blur-md">
              ⚡ ${powerScore} / 10 Power
            </div>
            <div class="absolute bottom-2 left-2">
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                ${l.prediction.recommendation.replace('_', ' ')}
              </span>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between text-xs text-gray-400 mb-1">
              <span class="font-bold text-cyan-400 uppercase">${l.brand}</span>
              <span class="text-amber-400 font-bold">★ ${l.reviews.rating} (${l.reviews.totalReviews})</span>
            </div>
            <h3 class="font-bold text-base text-white line-clamp-1">${l.name}</h3>

            <!-- Student Benefit Highlight Banner -->
            ${student.studentPrice ? `
            <div class="mt-2.5 p-2 rounded-xl bg-purple-500/15 border border-purple-500/30 text-xs space-y-0.5">
              <div class="flex items-center justify-between font-bold text-purple-300">
                <span>🎓 Student Price: ${formatRupees(student.studentPrice)}</span>
                <span class="text-[10px] bg-purple-500 text-black px-1.5 py-0.2 rounded font-black">UNiDAYS</span>
              </div>
              <p class="text-[10px] text-gray-300 truncate">• ${student.cashbackAmount}</p>
            </div>
            ` : ''}

            <!-- Official Certifications -->
            <div class="flex flex-wrap gap-1 mt-2">
              ${certs.map(c => `<span class="text-[9px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">📜 ${c}</span>`).join('')}
            </div>

            <div class="grid grid-cols-2 gap-1.5 text-xs text-gray-300 mt-3 bg-gray-900/60 p-2.5 rounded-lg border border-gray-800">
              <div><span class="text-gray-500 text-[9px] uppercase block">CPU</span><span class="truncate block font-medium">${l.specs.cpu}</span></div>
              <div><span class="text-gray-500 text-[9px] uppercase block">GPU & Power</span><span class="truncate block font-semibold text-amber-300">${l.specs.gpu} (${tgp}W)</span></div>
              <div><span class="text-gray-500 text-[9px] uppercase block">RAM/Storage</span><span class="font-medium">${l.specs.ramGB}GB / ${l.specs.storageGB}GB</span></div>
              <div><span class="text-gray-500 text-[9px] uppercase block">Battery Life</span><span class="truncate block font-medium text-emerald-400">${l.specs.batteryHours} Hours</span></div>
            </div>
          </div>

          <div class="pt-3 border-t border-gray-800 flex items-center justify-between">
            <div>
              <span class="text-[10px] text-gray-400 block">${bestRetailer.retailer}</span>
              <span class="text-xl font-black text-white">${formatRupees(l.currentBestPrice)}</span>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="toggleCompare('${l.id}')" class="p-2 rounded-lg border text-xs font-bold ${comparedIds.includes(l.id) ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' : 'bg-gray-800 text-gray-400'}">+ Compare</button>
              <button onclick="openDetail('${l.id}')" class="px-3 py-2 rounded-lg bg-cyan-500 text-black font-bold text-xs shadow-glow-cyan">Details</button>
              <a href="${student.studentStoreUrl || bestRetailer.url}" target="_blank" rel="noopener noreferrer" class="px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-black font-extrabold text-xs shadow-glow-cyan flex items-center gap-1">Student Deal ↗</a>
            </div>
          </div>
        </div>
      `;
      }).join('');
    }

    function renderTrends(trends, events) {
      document.getElementById('trends-cards').innerHTML = trends.map(t => `
        <div class="glass-panel p-4 rounded-xl border border-gray-800 space-y-1">
          <div class="flex justify-between items-center text-xs font-bold">
            <span class="text-gray-300">${t.component}</span>
            <span class="${t.trend==='down'?'text-emerald-400':'text-rose-400'}">${t.changePercent}%</span>
          </div>
          <p class="text-[11px] text-gray-400">${t.impactDescription}</p>
        </div>
      `).join('');

      document.getElementById('events-cards').innerHTML = events.map(e => `
        <div class="glass-panel p-4 rounded-xl border border-gray-800 space-y-2">
          <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 uppercase">${e.impactLevel} Impact</span>
          <h4 class="font-bold text-sm text-white">${e.name}</h4>
          <p class="text-xs text-emerald-400 font-semibold">${e.expectedDiscount}</p>
        </div>
      `).join('');
    }

    function openDetail(id) {
      const l = allLaptops.find(x => x.id === id);
      if(!l) return;
      
      const tgp = l.specs.tgpWatts || 30;
      const powerScore = l.powerScore10 || 9.2;
      const certs = l.certifications || [];
      const student = l.studentBenefits || {};
      const bench = l.benchmarks || {};
      const cooling = l.coolingSpecs || {};

      const retailerRows = l.retailers.map(r => `
        <tr class="border-b border-gray-800 ${r.isBestDeal ? 'bg-cyan-500/10 font-bold' : ''}">
          <td class="p-2.5 text-white flex items-center gap-2">${r.retailer} ${r.isBestDeal ? '<span class="text-[9px] bg-cyan-500 text-black px-1.5 py-0.5 rounded font-black">BEST DEAL</span>' : ''}</td>
          <td class="p-2.5 font-bold text-white">${formatRupees(r.price)}</td>
          <td class="p-2.5 text-emerald-400">${r.inStock ? '✓ In Stock' : 'Out of Stock'}</td>
          <td class="p-2.5 text-right"><a href="${r.url}" target="_blank" rel="noopener noreferrer" class="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-cyan-400 rounded text-xs font-semibold inline-flex items-center gap-1">Visit Store ↗</a></td>
        </tr>
      `).join('');

      document.getElementById('modal-content').innerHTML = `
        <div class="space-y-6">
          <div class="flex items-start justify-between">
            <div>
              <span class="text-xs uppercase font-bold text-cyan-400">${l.brand}</span>
              <h2 class="text-2xl font-black text-white">${l.name}</h2>
            </div>
            <div class="px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-center">
              <span class="text-xs uppercase font-bold block text-gray-400">Power Rating</span>
              <span class="text-2xl font-black">⚡ ${powerScore} / 10</span>
            </div>
          </div>

          <!-- Student Benefits Banner Section -->
          ${student.cashbackAmount ? `
          <div class="p-5 bg-gradient-to-r from-purple-900/40 via-purple-900/20 to-blue-900/30 border border-purple-500/40 rounded-2xl space-y-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-xl">🎓</span>
                <div>
                  <h4 class="font-extrabold text-sm text-purple-300">Official Student & Education Benefits</h4>
                  <p class="text-[11px] text-gray-300">Verification: ${student.verificationMethod}</p>
                </div>
              </div>
              ${student.studentPrice ? `<span class="text-lg font-black text-emerald-400">Student Price: ${formatRupees(student.studentPrice)}</span>` : ''}
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div class="p-3 bg-gray-900/80 rounded-xl border border-gray-800">
                <b class="text-purple-300 block mb-1">🎁 Included Student Perks:</b>
                <ul class="text-gray-200 space-y-1">
                  ${(student.freeBundledPerks || []).map(p => `<li>• ${p}</li>`).join('')}
                </ul>
              </div>

              <div class="p-3 bg-gray-900/80 rounded-xl border border-gray-800 space-y-1.5">
                <div><b class="text-emerald-400">Cashback & Off:</b> <span class="text-white">${student.cashbackAmount}</span></div>
                <div><b class="text-amber-400">Student Warranty:</b> <span class="text-white">${student.extendedWarrantyOffer}</span></div>
              </div>
            </div>

            <div class="flex justify-end pt-1">
              <a href="${student.studentStoreUrl}" target="_blank" rel="noopener noreferrer" class="px-5 py-2 rounded-xl bg-purple-500 text-black font-extrabold text-xs shadow-glow-cyan flex items-center gap-1">Claim Education Deal on ${l.brand} Store ↗</a>
            </div>
          </div>
          ` : ''}

          <div class="flex items-baseline justify-between p-4 bg-gray-900 rounded-xl border border-gray-800">
            <div>
              <span class="text-xs text-gray-400 block">Best Lowest Retail Price</span>
              <span class="text-2xl font-black text-white">${formatRupees(l.currentBestPrice)}</span>
              ${l.msrp > l.currentBestPrice ? `<span class="text-xs text-gray-500 line-through ml-2">${formatRupees(l.msrp)}</span>` : ''}
            </div>
            <a href="${l.retailers[0].url}" target="_blank" rel="noopener noreferrer" class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold text-xs shadow-glow-cyan flex items-center gap-1">Buy on ${l.retailers[0].retailer} ↗</a>
          </div>

          <!-- Official Certifications -->
          <div>
            <h4 class="font-bold text-sm text-white mb-2">📜 Official Hardware Certifications</h4>
            <div class="flex flex-wrap gap-2">
              ${certs.map(c => `<span class="px-3 py-1 rounded-lg bg-blue-500/15 border border-blue-400/30 text-blue-300 font-semibold text-xs">✓ ${c}</span>`).join('')}
            </div>
          </div>

          <!-- Pros and Cons -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl space-y-2">
              <h4 class="font-bold text-xs uppercase tracking-wider text-emerald-400 flex items-center gap-1">👍 Key Advantages (Pros)</h4>
              <ul class="text-xs text-gray-200 space-y-1.5">
                ${(l.reviews.pros || []).map(p => `<li>• ${p}</li>`).join('')}
              </ul>
            </div>

            <div class="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-2">
              <h4 class="font-bold text-xs uppercase tracking-wider text-amber-400 flex items-center gap-1">👎 Potential Drawbacks (Cons)</h4>
              <ul class="text-xs text-gray-200 space-y-1.5">
                ${(l.reviews.cons || []).map(c => `<li>• ${c}</li>`).join('')}
              </ul>
            </div>
          </div>

          <!-- Synthetic Benchmarks -->
          <div>
            <h4 class="font-bold text-sm text-white mb-2">📊 Synthetic Benchmark Scores</h4>
            <div class="grid grid-cols-3 gap-3 text-center">
              <div class="p-3 bg-gray-900 rounded-xl border border-gray-800">
                <span class="text-[10px] text-gray-400 uppercase block">Cinebench R23 Multi</span>
                <span class="text-lg font-black text-cyan-400">${bench.cinebenchR23 ? bench.cinebenchR23.toLocaleString('en-IN') + ' pts' : 'N/A'}</span>
              </div>
              <div class="p-3 bg-gray-900 rounded-xl border border-gray-800">
                <span class="text-[10px] text-gray-400 uppercase block">3DMark Time Spy GPU</span>
                <span class="text-lg font-black text-purple-400">${bench.timeSpyGpu ? bench.timeSpyGpu.toLocaleString('en-IN') + ' pts' : 'N/A'}</span>
              </div>
              <div class="p-3 bg-gray-900 rounded-xl border border-gray-800">
                <span class="text-[10px] text-gray-400 uppercase block">Geekbench 6 Multi</span>
                <span class="text-lg font-black text-emerald-400">${bench.geekbench6Multi ? bench.geekbench6Multi.toLocaleString('en-IN') + ' pts' : 'N/A'}</span>
              </div>
            </div>
          </div>

          <!-- Thermal Cooling System Specifications -->
          <div>
            <h4 class="font-bold text-sm text-white mb-2">❄️ Thermal Heating & Cooling System Specs</h4>
            <div class="p-4 bg-gray-900 rounded-xl border border-gray-800 space-y-2 text-xs">
              <div><b class="text-gray-400">Cooling Architecture:</b> <span class="text-white">${cooling.architecture || 'High Efficiency Dual Fan'}</span></div>
              <div class="grid grid-cols-3 gap-2 pt-2 border-t border-gray-800">
                <div><b class="text-gray-400">Fans / Heatpipes:</b> <span class="text-white">${cooling.fanCount || 2} Fans / ${cooling.heatpipes || 4} Pipes</span></div>
                <div><b class="text-gray-400">Max Surface Temp:</b> <span class="text-amber-400 font-bold">${cooling.maxSurfaceTempC || 40}°C Peak</span></div>
                <div><b class="text-gray-400">Noise Under Load:</b> <span class="text-cyan-300 font-bold">${cooling.noiseLevelDb || 40} dB</span></div>
              </div>
            </div>
          </div>

          <div>
            <h4 class="font-bold text-sm text-white mb-2">Live Retailer Price Comparison</h4>
            <table class="w-full text-left text-xs border-collapse bg-gray-900 rounded-xl overflow-hidden">
              <thead><tr class="bg-gray-800 text-gray-400"><th class="p-2.5">Retailer</th><th class="p-2.5">Price</th><th class="p-2.5">Status</th><th class="p-2.5 text-right">Link</th></tr></thead>
              <tbody>${retailerRows}</tbody>
            </table>
          </div>

          <div>
            <h4 class="font-bold text-sm text-white mb-2">Complete Hardware Specifications</h4>
            <div class="grid grid-cols-2 gap-3 text-xs bg-gray-900 p-4 rounded-xl border border-gray-800">
              <div><b class="text-gray-400">CPU:</b> <span class="text-white">${l.specs.cpu}</span></div>
              <div><b class="text-gray-400">GPU Model:</b> <span class="text-white">${l.specs.gpu}</span></div>
              <div><b class="text-gray-400">GPU Power (TGP):</b> <span class="text-amber-400 font-bold">${tgp} Watts TGP</span></div>
              <div><b class="text-gray-400">RAM:</b> <span class="text-white">${l.specs.ramGB} GB (${l.specs.ramType})</span></div>
              <div><b class="text-gray-400">Storage:</b> <span class="text-white">${l.specs.storageGB} GB SSD</span></div>
              <div><b class="text-gray-400">Display:</b> <span class="text-white">${l.specs.displaySize}" ${l.specs.resolution} (${l.specs.refreshRate}Hz)</span></div>
              <div><b class="text-gray-400">Battery:</b> <span class="text-white">${l.specs.batteryHours} Hours</span></div>
            </div>
          </div>
        </div>
      `;
      document.getElementById('detail-modal').classList.remove('hidden');
    }

    function closeModal() { document.getElementById('detail-modal').classList.add('hidden'); }
    function toggleChatbot() { document.getElementById('chatbot-drawer').classList.toggle('hidden'); }

    function switchTab(tab) {
      ['recommendations', 'wizard', 'trends', 'compare'].forEach(t => {
        document.getElementById('tab-' + t).classList.add('hidden');
        document.getElementById('nav-' + t).className = "px-4 py-2 rounded-lg text-gray-400 hover:text-white";
      });
      document.getElementById('tab-' + tab).classList.remove('hidden');
      document.getElementById('nav-' + tab).className = "px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-bold";
      if(tab === 'compare') renderCompareTable();
    }

    function setCategoryFilter(cat) {
      currentCategory = cat;
      document.querySelectorAll('.cat-pill').forEach(b => {
        if(b.dataset.cat === cat) b.className = "cat-pill px-3 py-1.5 rounded-lg font-semibold bg-cyan-500 text-black shadow-glow-cyan";
        else b.className = "cat-pill px-3 py-1.5 rounded-lg font-semibold bg-gray-900 text-gray-400 border border-gray-800";
      });
      renderLaptops();
    }

    function toggleCompare(id) {
      if(comparedIds.includes(id)) comparedIds = comparedIds.filter(x => x !== id);
      else if(comparedIds.length < 3) comparedIds.push(id);
      document.getElementById('compare-badge').innerText = comparedIds.length;
      renderLaptops();
    }

    function clearCompare() { comparedIds = []; document.getElementById('compare-badge').innerText = 0; renderCompareTable(); }

    function renderCompareTable() {
      const container = document.getElementById('compare-table-container');
      const items = allLaptops.filter(x => comparedIds.includes(x.id));
      if(items.length === 0) { container.innerHTML = '<div class="text-center py-8 text-gray-400 text-xs">No laptops selected for comparison yet. Click + Compare on laptop cards.</div>'; return; }
      
      container.innerHTML = `
        <table class="w-full text-left text-xs border-collapse">
          <tr class="border-b border-gray-800"><th class="p-3 bg-gray-900 text-gray-400">Name</th>${items.map(i=>`<td class="p-3 font-bold text-white">${i.name}</td>`).join('')}</tr>
          <tr class="border-b border-gray-800"><th class="p-3 bg-gray-900 text-gray-400">🎓 Student Price</th>${items.map(i=>`<td class="p-3 font-black text-purple-300">${i.studentBenefits && i.studentBenefits.studentPrice ? formatRupees(i.studentBenefits.studentPrice) : 'Standard Price'}</td>`).join('')}</tr>
          <tr class="border-b border-gray-800"><th class="p-3 bg-gray-900 text-gray-400">🎓 Free Student Perks</th>${items.map(i=>`<td class="p-3 text-purple-300 font-medium">${i.studentBenefits ? (i.studentBenefits.freeBundledPerks||[]).slice(0,2).join(', ') : 'Standard Bundle'}</td>`).join('')}</tr>
          <tr class="border-b border-gray-800"><th class="p-3 bg-gray-900 text-gray-400">Power Rating (/10)</th>${items.map(i=>`<td class="p-3 font-black text-amber-300">⚡ ${i.powerScore10||9.2} / 10</td>`).join('')}</tr>
          <tr class="border-b border-gray-800"><th class="p-3 bg-gray-900 text-gray-400">Standard Price</th>${items.map(i=>`<td class="p-3 text-emerald-400 font-extrabold">${formatRupees(i.currentBestPrice)}</td>`).join('')}</tr>
          <tr class="border-b border-gray-800"><th class="p-3 bg-gray-900 text-gray-400">Pros</th>${items.map(i=>`<td class="p-3 text-emerald-400">${(i.reviews.pros||[]).slice(0,2).join('<br>')}</td>`).join('')}</tr>
          <tr class="border-b border-gray-800"><th class="p-3 bg-gray-900 text-gray-400">Cons</th>${items.map(i=>`<td class="p-3 text-amber-400">${(i.reviews.cons||[]).slice(0,2).join('<br>')}</td>`).join('')}</tr>
          <tr class="border-b border-gray-800"><th class="p-3 bg-gray-900 text-gray-400">Buy Direct</th>${items.map(i=>`<td class="p-3"><a href="${i.studentBenefits ? i.studentBenefits.studentStoreUrl : i.retailers[0].url}" target="_blank" rel="noopener noreferrer" class="px-3 py-1 bg-purple-500 text-black font-bold rounded text-xs">Student Deal ↗</a></td>`).join('')}</tr>
        </table>
      `;
    }

    function selectWizardUsecase(uc) {
      userPrefs.useCase = uc;
      document.querySelectorAll('.wiz-uc').forEach(b => {
        if(b.dataset.uc === uc) b.className = "wiz-uc p-4 rounded-xl border bg-cyan-500/20 border-cyan-400 text-white font-bold text-sm text-left";
        else b.className = "wiz-uc p-4 rounded-xl border bg-gray-900 border-gray-800 text-gray-400 hover:text-white font-bold text-sm text-left";
      });
    }

    function applyWizard() {
      userPrefs.budget = Number(document.getElementById('wiz-budget').value);
      userPrefs.minRam = Number(document.getElementById('wiz-ram').value);
      userPrefs.minStorage = Number(document.getElementById('wiz-storage').value);
      userPrefs.preferredGpuTier = document.getElementById('wiz-gpu-tier').value;
      userPrefs.minGpuTgpWatts = Number(document.getElementById('wiz-gpu-tgp').value);

      document.getElementById('pill-usecase').innerText = userPrefs.useCase.toUpperCase() + " Workload";
      document.getElementById('pill-budget').innerText = "Max " + formatRupees(userPrefs.budget);
      document.getElementById('pill-gpu').innerText = userPrefs.minGpuTgpWatts > 0 ? ("GPU: " + userPrefs.minGpuTgpWatts + "W+ TGP") : "GPU: Any TGP";
      document.getElementById('pill-ram').innerText = userPrefs.minRam + "GB+ RAM";

      switchTab('recommendations');
      loadData();
    }

    async function sendChatMessage(e) {
      e.preventDefault();
      const input = document.getElementById('chat-input');
      const msg = input.value.trim();
      if(!msg) return;
      const box = document.getElementById('chat-messages');
      box.innerHTML += `<div class="bg-cyan-500 text-black font-semibold p-3 rounded-xl text-xs text-right">${msg}</div>`;
      input.value = '';

      try {
        const res = await fetch('/api/chatbot', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({ message: msg })
        });
        const data = await res.json();
        box.innerHTML += `<div class="bg-gray-900 border border-gray-800 p-3 rounded-xl text-xs text-gray-200">${data.reply.text.replace(/\\n/g, '<br>')}</div>`;
      } catch(err) {
        box.innerHTML += `<div class="bg-gray-900 border border-gray-800 p-3 rounded-xl text-xs text-gray-200">Official Student Discounts & UNiDAYS deals (e.g. Free AirPods Pro, ₹10,000 off, MS Office lifetime) are available for all laptops!</div>`;
      }
      box.scrollTop = box.scrollHeight;
    }

    window.onload = loadData;
  </script>
</body>
</html>"""
    return HTMLResponse(content=html_content)


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
