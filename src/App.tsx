import React, { useState, useEffect, useMemo } from 'react';
import { Laptop, UserPreferences, UseCase, MarketTrend, SeasonalEvent, NewsItem, ChatMessage } from './types';
import { Header } from './components/Header';
import { SpecWizard } from './components/SpecWizard';
import { LaptopCard } from './components/LaptopCard';
import { LaptopDetailModal } from './components/LaptopDetailModal';
import { CompareModal } from './components/CompareModal';
import { MarketTrends } from './components/MarketTrends';
import { ChatbotDrawer } from './components/ChatbotDrawer';
import { Search, Sparkles, AlertCircle, ArrowUpDown } from 'lucide-react';

import { MOCK_LAPTOPS_DATA, MOCK_TRENDS_DATA, MOCK_EVENTS_DATA, MOCK_NEWS_DATA } from './fallbackData';

export function App() {
  const [activeTab, setActiveTab] = useState<'recommendations' | 'wizard' | 'trends' | 'compare'>('recommendations');
  
  // User Matching Preferences (in INR - ₹)
  const [preferences, setPreferences] = useState<UserPreferences>({
    useCase: 'gaming',
    budget: 150000,
    minRam: 16,
    minStorage: 512,
    needsDedicatedGpu: true,
  });

  const [laptops, setLaptops] = useState<Laptop[]>(MOCK_LAPTOPS_DATA);
  const [marketTrends, setMarketTrends] = useState<MarketTrend[]>(MOCK_TRENDS_DATA);
  const [seasonalEvents, setSeasonalEvents] = useState<SeasonalEvent[]>(MOCK_EVENTS_DATA);
  const [newsItems, setNewsItems] = useState<NewsItem[]>(MOCK_NEWS_DATA);

  // Filters & Sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<UseCase | 'all'>('all');
  const [sortBy, setSortBy] = useState<'match' | 'price_low' | 'price_high' | 'rating' | 'discount'>('match');

  // Modals & Side Panels
  const [selectedDetailLaptop, setSelectedDetailLaptop] = useState<Laptop | null>(null);
  const [comparedLaptopIds, setComparedLaptopIds] = useState<string[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Chatbot Messages State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Namaste! I am your AI Laptop Advisor. Ask me anything about RAM, GPUs, CPUs, price predictions in ₹, or laptop comparisons!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickReplies: ['Best gaming laptop under ₹1,20,000', 'RTX 4060 vs 4070?', 'How much RAM do I need?'],
    },
  ]);

  // Fetch API data or apply recommendations
  const fetchRecommendations = async (prefs: UserPreferences) => {
    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prefs),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.recommendations) {
          setLaptops(data.recommendations);
          return;
        }
      }
    } catch (e) {
      console.warn('Backend API offline or unreachable, using client-side recommendation engine');
    }
    
    // Client-side fallback scoring logic in INR
    const scored = MOCK_LAPTOPS_DATA.map((laptop) => {
      let score = 95.0;
      const reasons: string[] = [];
      
      if (laptop.currentBestPrice <= prefs.budget) {
        reasons.push(`Within budget (₹${laptop.currentBestPrice.toLocaleString('en-IN')})`);
      } else {
        score -= 25.0;
        reasons.push(`Over budget by ₹${(laptop.currentBestPrice - prefs.budget).toLocaleString('en-IN')}`);
      }

      if (laptop.specs.ramGB >= prefs.minRam) {
        reasons.push(`Meets ${prefs.minRam}GB RAM requirement`);
      } else {
        score -= 20.0;
      }

      if (laptop.category === prefs.useCase) {
        score += 5.0;
        reasons.push(`Optimized for ${prefs.useCase}`);
      }

      return {
        ...laptop,
        matchScore: Math.max(10, Math.min(99, Math.round(score))),
        matchReasons: reasons.slice(0, 3),
      };
    }).sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));

    setLaptops(scored);
  };

  useEffect(() => {
    fetchRecommendations(preferences);
  }, [preferences]);

  // Filtered & Sorted Laptops
  const filteredLaptops = useMemo(() => {
    return laptops.filter((laptop) => {
      const matchesSearch =
        searchQuery === '' ||
        laptop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        laptop.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        laptop.specs.cpu.toLowerCase().includes(searchQuery.toLowerCase()) ||
        laptop.specs.gpu.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || laptop.category === selectedCategory;

      return matchesSearch && matchesCategory;
    }).sort((a, b) => {
      if (sortBy === 'match') return (b.matchScore || 0) - (a.matchScore || 0);
      if (sortBy === 'price_low') return a.currentBestPrice - b.currentBestPrice;
      if (sortBy === 'price_high') return b.currentBestPrice - a.currentBestPrice;
      if (sortBy === 'rating') return b.reviews.rating - a.reviews.rating;
      if (sortBy === 'discount') return b.maxDiscountPercent - a.maxDiscountPercent;
      return 0;
    });
  }, [laptops, searchQuery, selectedCategory, sortBy]);

  // Toggle Laptop Comparison
  const handleToggleCompare = (laptop: Laptop) => {
    if (comparedLaptopIds.includes(laptop.id)) {
      setComparedLaptopIds(comparedLaptopIds.filter((id) => id !== laptop.id));
    } else {
      if (comparedLaptopIds.length >= 3) {
        alert('You can compare up to 3 laptops side-by-side.');
        return;
      }
      setComparedLaptopIds([...comparedLaptopIds, laptop.id]);
    }
  };

  const comparedLaptops = useMemo(() => {
    return laptops.filter((l) => comparedLaptopIds.includes(l.id));
  }, [laptops, comparedLaptopIds]);

  // Handle Chatbot user messages
  const handleSendMessage = async (text: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.reply) {
          const botMsg: ChatMessage = {
            id: (Date.now() + 1).toString(),
            sender: 'bot',
            text: data.reply.text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            quickReplies: data.reply.quickReplies,
          };
          setChatMessages((prev) => [...prev, botMsg]);
          return;
        }
      }
    } catch (e) {}

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      sender: 'bot',
      text: "16GB RAM and RTX 4060 is currently the best performance sweet spot for gaming and coding in India under ₹1,20,000!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickReplies: ["Best gaming laptop under ₹1,20,000", "Show top deals"],
    };
    setChatMessages((prev) => [...prev, botMsg]);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-100 flex flex-col font-sans">
      
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        compareCount={comparedLaptopIds.length}
        toggleChatbot={() => setIsChatOpen(!isChatOpen)}
        isChatOpen={isChatOpen}
      />

      {/* Main Body Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-8 space-y-8">
        
        {/* Tab 1: Spec Matcher Wizard */}
        {activeTab === 'wizard' && (
          <SpecWizard
            preferences={preferences}
            onApplyPreferences={(newPrefs) => {
              setPreferences(newPrefs);
              setActiveTab('recommendations');
            }}
          />
        )}

        {/* Tab 2: Market Trends & Forecasts */}
        {activeTab === 'trends' && (
          <MarketTrends
            trends={marketTrends}
            events={seasonalEvents}
            news={newsItems}
          />
        )}

        {/* Tab 3: Side-by-Side Compare */}
        {activeTab === 'compare' && (
          <CompareModal
            comparedLaptops={comparedLaptops}
            onRemove={(id) => setComparedLaptopIds(comparedLaptopIds.filter((i) => i !== id))}
            onClear={() => setComparedLaptopIds([])}
            onClose={() => setActiveTab('recommendations')}
          />
        )}

        {/* Tab 4: Main Recommendations Dashboard */}
        {activeTab === 'recommendations' && (
          <div className="space-y-8">
            
            {/* Hero Banner */}
            <div className="glass-panel rounded-3xl p-6 md:p-10 border border-gray-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold mb-4">
                  <Sparkles className="w-3.5 h-3.5" /> AI Spec Matcher Active
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                  Find Your Ideal Laptop at the <span className="gradient-text">Lowest Price (₹)</span>
                </h1>
                <p className="text-sm md:text-base text-gray-300 mt-3 leading-relaxed">
                  Real-time specification matching, live pricing from Amazon India, Flipkart & Croma, price drop forecasts, and AI advisor support.
                </p>

                {/* Quick Preferences Pill Bar */}
                <div className="flex flex-wrap items-center gap-2 mt-6">
                  <span className="text-xs text-gray-400">Current Match:</span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-gray-800 text-cyan-400 border border-gray-700 capitalize">
                    {preferences.useCase} Workload
                  </span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-gray-800 text-emerald-400 border border-gray-700">
                    Max ₹{preferences.budget.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-gray-800 text-purple-400 border border-gray-700">
                    {preferences.minRam}GB+ RAM
                  </span>
                  <button
                    onClick={() => setActiveTab('wizard')}
                    className="text-xs font-bold px-3 py-1 rounded-lg bg-cyan-500 text-black shadow-glow-cyan hover:bg-cyan-400 transition-colors"
                  >
                    Tune Criteria
                  </button>
                </div>

              </div>
            </div>

            {/* Filter Controls Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-gray-800">
              
              {/* Search Box */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search laptops by name, GPU, CPU, or brand..."
                  className="w-full bg-gray-900 text-white placeholder-gray-500 text-xs rounded-xl pl-10 pr-4 py-2.5 border border-gray-800 focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs">
                {(['all', 'gaming', 'coding', 'creator', 'business', 'student', 'budget'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg capitalize font-semibold transition-all ${
                      selectedCategory === cat
                        ? 'bg-cyan-500 text-black font-bold shadow-glow-cyan'
                        : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="bg-gray-900 border border-gray-800 text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-400"
                >
                  <option value="match">Sort: Highest Match Score</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Highest Customer Rating</option>
                  <option value="discount">Biggest Discount %</option>
                </select>
              </div>

            </div>

            {/* Laptop Cards Grid */}
            {filteredLaptops.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLaptops.map((laptop) => (
                  <LaptopCard
                    key={laptop.id}
                    laptop={laptop}
                    onSelectDetail={(l) => setSelectedDetailLaptop(l)}
                    onToggleCompare={handleToggleCompare}
                    isCompared={comparedLaptopIds.includes(laptop.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="glass-panel p-12 rounded-2xl text-center border border-gray-800 my-8">
                <AlertCircle className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-1">No Laptops Found</h3>
                <p className="text-xs text-gray-400 mb-4">
                  No laptop matches your search criteria or category filter. Try clearing filters or raising your budget.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="px-4 py-2 rounded-xl bg-cyan-500 text-black font-bold text-xs"
                >
                  Reset Filters
                </button>
              </div>
            )}

          </div>
        )}

      </main>

      {/* Laptop Detail Modal */}
      <LaptopDetailModal
        laptop={selectedDetailLaptop}
        onClose={() => setSelectedDetailLaptop(null)}
      />

      {/* Chatbot Side Drawer */}
      <ChatbotDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        messages={chatMessages}
        onSendMessage={handleSendMessage}
      />

    </div>
  );
}

export default App;
