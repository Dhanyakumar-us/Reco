import React from 'react';
import { Laptop } from '../types';
import { Sparkles, Star, TrendingDown, CheckCircle2, AlertTriangle, ExternalLink, PlusCircle, Check, Eye } from 'lucide-react';

interface LaptopCardProps {
  laptop: Laptop;
  onSelectDetail: (laptop: Laptop) => void;
  onToggleCompare: (laptop: Laptop) => void;
  isCompared: boolean;
}

export const LaptopCard: React.FC<LaptopCardProps> = ({
  laptop,
  onSelectDetail,
  onToggleCompare,
  isCompared,
}) => {
  const bestRetailer = laptop.retailers.find((r) => r.isBestDeal) || laptop.retailers[0];
  const matchScore = laptop.matchScore ?? 92;
  const tgpWatts = laptop.specs.tgpWatts || 30;

  const getPredictionBadge = () => {
    const rec = laptop.prediction?.recommendation;
    if (rec === 'HISTORICAL_LOW') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          <TrendingDown className="w-3 h-3" /> Historical Low Price
        </span>
      );
    }
    if (rec === 'BUY_NOW') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
          <CheckCircle2 className="w-3 h-3" /> Great Time to Buy
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
        <AlertTriangle className="w-3 h-3" /> Price Drop Expected Soon
      </span>
    );
  };

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl overflow-hidden border border-gray-800 flex flex-col justify-between group">
      
      {/* Top Media Header */}
      <div className="relative h-48 bg-gray-900 overflow-hidden">
        <img
          src={laptop.image}
          alt={laptop.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-black/40" />

        {/* Match Score Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-cyan-500/40 shadow-glow-cyan">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-xs font-black text-cyan-400">{matchScore}% Match</span>
        </div>

        {/* GPU TGP Badge */}
        <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-extrabold uppercase tracking-wider border border-amber-500/30 backdrop-blur-md">
          ⚡ {tgpWatts}W TGP
        </div>

        {/* Price Prediction Tag */}
        <div className="absolute bottom-3 left-3">
          {getPredictionBadge()}
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Name */}
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span className="font-semibold uppercase tracking-wider text-cyan-400">{laptop.brand}</span>
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{laptop.reviews.rating}</span>
              <span className="text-gray-400 text-[11px]">({laptop.reviews.totalReviews})</span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1 mb-3">
            {laptop.name}
          </h3>

          {/* Key Specs Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-300 mb-4 bg-gray-900/60 p-3 rounded-xl border border-gray-800">
            <div>
              <span className="text-gray-400 block text-[10px] uppercase">Processor</span>
              <span className="font-medium truncate block">{laptop.specs.cpu}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px] uppercase">GPU & Power</span>
              <span className="font-semibold text-amber-300 truncate block">{laptop.specs.gpu} ({tgpWatts}W TGP)</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px] uppercase">RAM & Storage</span>
              <span className="font-medium">{laptop.specs.ramGB}GB / {laptop.specs.storageGB >= 1024 ? `${laptop.specs.storageGB / 1024}TB` : `${laptop.specs.storageGB}GB`}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px] uppercase">Display</span>
              <span className="font-medium truncate block">{laptop.specs.resolution.split(' ')[0]}</span>
            </div>
          </div>

          {/* Match Reasons */}
          {laptop.matchReasons && laptop.matchReasons.length > 0 && (
            <div className="mb-4 space-y-1">
              {laptop.matchReasons.slice(0, 2).map((reason, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 text-emerald-400" />
                  <span className="truncate">{reason}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & Retailer Comparison (INR ₹) */}
        <div>
          <div className="pt-3 border-t border-gray-800 flex items-baseline justify-between mb-3">
            <div>
              <div className="text-xs text-gray-400">Best Deal at {bestRetailer.retailer}</div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-white">
                  ₹{laptop.currentBestPrice.toLocaleString('en-IN')}
                </span>
                {laptop.msrp > laptop.currentBestPrice && (
                  <span className="text-xs text-gray-500 line-through">
                    ₹{laptop.msrp.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
            </div>

            {laptop.maxDiscountPercent > 0 && (
              <span className="text-xs font-bold px-2 py-1 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                Save {laptop.maxDiscountPercent}%
              </span>
            )}
          </div>

          {/* Multi-retailer availability tags */}
          <div className="flex items-center gap-2 mb-4 text-[11px] text-gray-400 overflow-x-auto pb-1">
            <span className="text-gray-400 font-medium">Retailers:</span>
            {laptop.retailers.map((r, i) => (
              <span
                key={i}
                className={`px-2 py-0.5 rounded border font-mono ${
                  r.isBestDeal
                    ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30 font-bold'
                    : 'bg-gray-800 text-gray-300 border-gray-700'
                }`}
              >
                {r.retailer}: ₹{r.price.toLocaleString('en-IN')}
              </span>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectDetail(laptop)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-semibold text-xs transition-colors border border-gray-700"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Full Details</span>
            </button>

            <button
              onClick={() => onToggleCompare(laptop)}
              className={`p-2.5 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center ${
                isCompared
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                  : 'bg-gray-900 text-gray-400 border-gray-800 hover:text-white hover:border-gray-700'
              }`}
              title={isCompared ? 'Remove from compare' : 'Add to side-by-side compare'}
            >
              {isCompared ? <Check className="w-4 h-4 text-amber-400" /> : <PlusCircle className="w-4 h-4" />}
            </button>

            <a
              href={bestRetailer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs shadow-glow-cyan flex items-center gap-1 transition-all"
            >
              <span>Buy</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>

    </div>
  );
};
