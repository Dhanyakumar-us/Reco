import React from 'react';
import { MarketTrend, SeasonalEvent, NewsItem } from '../types';
import { TrendingUp, TrendingDown, Calendar, Newspaper, ArrowUpRight, ArrowDownRight, Sparkles, DollarSign } from 'lucide-react';

interface MarketTrendsProps {
  trends: MarketTrend[];
  events: SeasonalEvent[];
  news: NewsItem[];
}

export const MarketTrends: React.FC<MarketTrendsProps> = ({
  trends,
  events,
  news,
}) => {
  return (
    <div className="space-y-8">
      
      {/* Hero Header */}
      <div className="glass-panel p-6 md:p-8 rounded-2xl border border-gray-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-white">Laptop Hardware Market & Price Trends</h2>
              <p className="text-xs md:text-sm text-gray-400">
                Real-time component price indexing, tech news sentiment analysis, and upcoming discount sales events.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Component Price Indexes */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-cyan-400" />
          Component Price Indexes (RAM, GPU, NAND Flash, Displays)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {trends.map((t, idx) => (
            <div key={idx} className="glass-panel p-5 rounded-xl border border-gray-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-300 uppercase">{t.component}</span>
                {t.trend === 'down' ? (
                  <span className="flex items-center gap-1 text-xs font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    <ArrowDownRight className="w-3.5 h-3.5" /> {t.changePercent}%
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs font-black text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                    <ArrowUpRight className="w-3.5 h-3.5" /> +{t.changePercent}%
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">{t.impactDescription}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Sales & Promotional Events */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-amber-400" />
          Seasonal Discount Calendar & Sales Windows
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {events.map((e, idx) => (
            <div key={idx} className="glass-panel p-5 rounded-xl border border-gray-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                  {e.impactLevel} Impact Event
                </span>
                <span className="text-xs font-mono text-gray-400">{e.dateRange}</span>
              </div>
              <h4 className="font-bold text-white text-base">{e.name}</h4>
              <p className="text-xs text-emerald-400 font-semibold">{e.expectedDiscount}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Industry News Feed & Pricing Impact */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Newspaper className="w-5 h-5 text-blue-400" />
          Tech News & Pricing Sentiment Feed
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {news.map((item) => (
            <div key={item.id} className="glass-panel p-5 rounded-xl border border-gray-800 space-y-3">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="font-semibold text-cyan-400">{item.source}</span>
                <span>{item.date}</span>
              </div>
              <h4 className="font-bold text-white text-sm leading-snug">{item.title}</h4>
              <p className="text-xs text-gray-300 leading-relaxed">{item.summary}</p>
              <div className="p-3 bg-gray-900/60 rounded-lg border border-gray-800 text-xs text-emerald-400 font-medium">
                💡 <span className="font-bold">Market Impact:</span> {item.impactOnPricing}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
