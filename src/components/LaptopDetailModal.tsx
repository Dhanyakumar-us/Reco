import React from 'react';
import { Laptop } from '../types';
import { X, Star, TrendingDown, CheckCircle2, ExternalLink, ThumbsUp, ThumbsDown, MessageSquareBot } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface LaptopDetailModalProps {
  laptop: Laptop | null;
  onClose: () => void;
  onAskChatbot?: (prompt: string) => void;
}

export const LaptopDetailModal: React.FC<LaptopDetailModalProps> = ({
  laptop,
  onClose,
  onAskChatbot,
}) => {
  if (!laptop) return null;

  const bestRetailer = laptop.retailers.find((r) => r.isBestDeal) || laptop.retailers[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="glass-panel w-full max-w-4xl bg-[#0B0F19] rounded-2xl border border-gray-800 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-900/60 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              {laptop.brand}
            </span>
            <h2 className="text-lg md:text-xl font-bold text-white truncate max-w-lg">{laptop.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1">
          
          {/* Top Hero Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Image Column */}
            <div className="md:col-span-5 relative rounded-xl overflow-hidden bg-gray-900 border border-gray-800 min-h-[220px]">
              <img src={laptop.image} alt={laptop.name} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-cyan-500/40 text-cyan-400 font-bold text-xs">
                {laptop.matchScore || 95}% Workload Match
              </div>
            </div>

            {/* Pricing & Key Summary Column */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1 text-amber-400 font-bold text-sm">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{laptop.reviews.rating}</span>
                  </div>
                  <span className="text-xs text-gray-400">({laptop.reviews.totalReviews} verified reviews)</span>
                </div>

                <h1 className="text-2xl font-black text-white mb-2">{laptop.name}</h1>
                <p className="text-xs text-gray-400">Category: <span className="text-cyan-400 capitalize font-medium">{laptop.category}</span></p>
              </div>

              {/* Price Prediction Alert Box */}
              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <TrendingDown className="w-4 h-4" /> Price Prediction & Forecast
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                    {laptop.prediction.forecastConfidence}% Confidence
                  </span>
                </div>
                <div className="text-sm font-semibold text-white mt-1">
                  Recommendation: <span className="text-emerald-400 font-extrabold">{laptop.prediction.recommendation.replace('_', ' ')}</span>
                </div>
                <ul className="mt-2 space-y-1 text-xs text-gray-300">
                  {laptop.prediction.reasoning.map((r, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Best Deal Action & AI Chatbot Ask */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div>
                  <span className="text-xs text-gray-400 block">Lowest Price Found</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-white">₹{laptop.currentBestPrice.toLocaleString('en-IN')}</span>
                    {laptop.msrp > laptop.currentBestPrice && (
                      <span className="text-sm text-gray-500 line-through">₹{laptop.msrp.toLocaleString('en-IN')}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {onAskChatbot && (
                    <button
                      onClick={() => {
                        onAskChatbot(`Is ${laptop.name} worth buying for ${laptop.category}?`);
                        onClose();
                      }}
                      className="px-4 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-cyan-400 font-bold text-xs border border-gray-700 flex items-center gap-1.5 transition-all"
                    >
                      <MessageSquareBot className="w-4 h-4" />
                      <span>Ask AI Advisor</span>
                    </button>
                  )}

                  <a
                    href={bestRetailer.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-sm shadow-glow-cyan flex items-center gap-2 transition-all transform hover:scale-105"
                  >
                    <span>Buy on {bestRetailer.retailer}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Interactive Recharts Price History Chart */}
          <div className="bg-gray-900/60 p-5 rounded-2xl border border-gray-800">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-cyan-400" />
              Historical Price Trend & 30-Day Predictive Forecast (₹)
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={laptop.priceHistory} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="priceGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
                  <XAxis dataKey="date" stroke="#9CA3AF" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#9CA3AF" tick={{ fontSize: 12 }} domain={['auto', 'auto']} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '0.5rem', color: '#F3F4F6' }}
                    formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Price']}
                  />
                  <Area type="monotone" dataKey="price" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#priceGlow)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Multi-Retailer Price Comparison Table */}
          <div className="bg-gray-900/60 p-5 rounded-2xl border border-gray-800">
            <h3 className="text-sm font-bold text-white mb-3">Live Retailer Price & Stock Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-800/60 text-gray-400 uppercase tracking-wider">
                  <tr>
                    <th className="p-3 rounded-l-lg">Retailer</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Discount</th>
                    <th className="p-3">Stock Status</th>
                    <th className="p-3 text-right rounded-r-lg">Direct Deal Link</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {laptop.retailers.map((r, idx) => (
                    <tr key={idx} className={r.isBestDeal ? 'bg-cyan-500/10' : ''}>
                      <td className="p-3 font-semibold text-white flex items-center gap-2">
                        <span>{r.retailer}</span>
                        {r.isBestDeal && (
                          <span className="text-[10px] bg-cyan-500 text-black font-extrabold px-1.5 py-0.5 rounded">
                            BEST DEAL
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-white font-extrabold text-sm">₹{r.price.toLocaleString('en-IN')}</td>
                      <td className="p-3 text-emerald-400 font-bold">
                        {r.originalPrice > r.price
                          ? `-₹${(r.originalPrice - r.price).toLocaleString('en-IN')} (${Math.round(((r.originalPrice - r.price) / r.originalPrice) * 100)}%)`
                          : 'Standard'}
                      </td>
                      <td className="p-3 font-medium">
                        {r.inStock ? (
                          <span className="text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> In Stock ({r.stockCount ?? 'Available'})
                          </span>
                        ) : (
                          <span className="text-rose-400">Out of Stock</span>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-cyan-400 text-xs font-semibold border border-gray-700 transition-colors"
                        >
                          Visit Store <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Specifications Breakdown */}
          <div className="bg-gray-900/60 p-5 rounded-2xl border border-gray-800">
            <h3 className="text-sm font-bold text-white mb-4">Complete Technical Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-gray-800/40 rounded-xl border border-gray-800 space-y-2">
                <div className="flex justify-between"><span className="text-gray-400">Processor (CPU):</span><span className="font-semibold text-white">{laptop.specs.cpu}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Graphics (GPU):</span><span className="font-semibold text-white">{laptop.specs.gpu}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">RAM:</span><span className="font-semibold text-white">{laptop.specs.ramGB} GB ({laptop.specs.ramType})</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Storage:</span><span className="font-semibold text-white">{laptop.specs.storageGB} GB {laptop.specs.storageType}</span></div>
              </div>
              <div className="p-3 bg-gray-800/40 rounded-xl border border-gray-800 space-y-2">
                <div className="flex justify-between"><span className="text-gray-400">Display:</span><span className="font-semibold text-white">{laptop.specs.displaySize}" {laptop.specs.resolution}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Refresh Rate:</span><span className="font-semibold text-white">{laptop.specs.refreshRate} Hz</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Weight:</span><span className="font-semibold text-white">{laptop.specs.weightKg} kg</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Battery Life:</span><span className="font-semibold text-white">{laptop.specs.batteryHours} Hours</span></div>
              </div>
            </div>
          </div>

          {/* Customer Reviews & Pros/Cons */}
          <div className="bg-gray-900/60 p-5 rounded-2xl border border-gray-800">
            <h3 className="text-sm font-bold text-white mb-4">Aggregated Customer Sentiment & Feedback</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl space-y-2">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ThumbsUp className="w-4 h-4" /> Top Verified Pros
                </h4>
                <ul className="space-y-1.5 text-xs text-gray-200">
                  {laptop.reviews.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl space-y-2">
                <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ThumbsDown className="w-4 h-4" /> Noted Limitations
                </h4>
                <ul className="space-y-1.5 text-xs text-gray-200">
                  {laptop.reviews.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">✕</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
