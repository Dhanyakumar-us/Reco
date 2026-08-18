import React from 'react';
import { Laptop, Sparkles, Scale, TrendingUp, SlidersHorizontal, MessageSquareBot } from 'lucide-react';

interface HeaderProps {
  activeTab: 'recommendations' | 'wizard' | 'trends' | 'compare';
  setActiveTab: (tab: 'recommendations' | 'wizard' | 'trends' | 'compare') => void;
  compareCount: number;
  toggleChatbot: () => void;
  isChatOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  compareCount,
  toggleChatbot,
  isChatOpen,
}) => {
  return (
    <header className="sticky top-0 z-30 glass-panel border-b border-gray-800/80 px-4 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setActiveTab('recommendations')}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-0.5 shadow-glow-cyan transition-transform group-hover:scale-105">
            <div className="w-full h-full bg-[#0B0F19] rounded-[10px] flex items-center justify-center">
              <Laptop className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-white">Apex<span className="gradient-text">Find</span></span>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">AI Engine</span>
            </div>
            <p className="text-xs text-gray-400 hidden sm:block">Smart Laptop Recommendations & Price Predictions</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-gray-900/80 p-1 rounded-xl border border-gray-800">
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
              activeTab === 'recommendations'
                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-sm'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Recommendations</span>
          </button>

          <button
            onClick={() => setActiveTab('wizard')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
              activeTab === 'wizard'
                ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30 shadow-sm'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Spec Matcher</span>
          </button>

          <button
            onClick={() => setActiveTab('trends')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
              activeTab === 'trends'
                ? 'bg-purple-500/15 text-purple-400 border border-purple-500/30 shadow-sm'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span className="hidden sm:inline">Market</span> Trends
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Compare Button */}
          <button
            onClick={() => setActiveTab('compare')}
            className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs md:text-sm font-medium transition-all border ${
              compareCount > 0
                ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
                : 'bg-gray-900 text-gray-400 border-gray-800 hover:text-gray-200'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span className="hidden md:inline">Compare</span>
            {compareCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-500 text-black text-xs font-bold flex items-center justify-center">
                {compareCount}
              </span>
            )}
          </button>

          {/* AI Advisor Button */}
          <button
            onClick={toggleChatbot}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all shadow-glow-cyan border ${
              isChatOpen
                ? 'bg-cyan-500 text-black border-cyan-400'
                : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500 border-cyan-400/30'
            }`}
          >
            <MessageSquareBot className="w-4 h-4" />
            <span className="hidden sm:inline">AI Advisor</span>
          </button>
        </div>

      </div>
    </header>
  );
};
