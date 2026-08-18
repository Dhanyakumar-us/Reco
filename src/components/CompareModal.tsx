import React from 'react';
import { Laptop } from '../types';
import { X, Scale, ExternalLink, Trash2 } from 'lucide-react';

interface CompareModalProps {
  comparedLaptops: Laptop[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onClose: () => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  comparedLaptops,
  onRemove,
  onClear,
  onClose,
}) => {
  if (comparedLaptops.length === 0) {
    return (
      <div className="glass-panel p-8 rounded-2xl text-center border border-gray-800 my-8 max-w-xl mx-auto">
        <Scale className="w-12 h-12 text-gray-500 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-white mb-1">No Laptops Selected for Comparison</h3>
        <p className="text-xs text-gray-400 mb-4">
          Click the <span className="text-amber-400 font-semibold">+ Compare</span> icon on any laptop card to add up to 3 laptops for side-by-side evaluation.
        </p>
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-cyan-500 text-black font-bold text-xs"
        >
          Back to Recommendations
        </button>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-2xl border border-gray-800 shadow-2xl p-6 my-6 overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Side-by-Side Comparison Matrix</h2>
            <p className="text-xs text-gray-400">Comparing {comparedLaptops.length} selected laptop models in Indian Rupees (₹)</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onClear}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear All
          </button>
        </div>
      </div>

      {/* Comparison Grid Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr>
              <th className="p-4 bg-gray-900/80 text-gray-400 uppercase tracking-wider w-44">Feature</th>
              {comparedLaptops.map((l) => (
                <th key={l.id} className="p-4 bg-gray-900/80 min-w-[240px]">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-cyan-400">{l.brand}</span>
                      <h4 className="font-bold text-sm text-white line-clamp-1">{l.name}</h4>
                    </div>
                    <button
                      onClick={() => onRemove(l.id)}
                      className="p-1 rounded bg-gray-800 text-gray-400 hover:text-rose-400"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            
            {/* Image & Price */}
            <tr>
              <td className="p-4 font-bold text-gray-300 bg-gray-900/30">Price & Deal</td>
              {comparedLaptops.map((l) => (
                <td key={l.id} className="p-4">
                  <div className="text-xl font-extrabold text-white mb-1">₹{l.currentBestPrice.toLocaleString('en-IN')}</div>
                  <div className="text-[11px] text-gray-400">MSRP: ₹{l.msrp.toLocaleString('en-IN')}</div>
                  {l.maxDiscountPercent > 0 && (
                    <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-400">
                      Save {l.maxDiscountPercent}%
                    </span>
                  )}
                </td>
              ))}
            </tr>

            {/* Match Score */}
            <tr>
              <td className="p-4 font-bold text-gray-300 bg-gray-900/30">Workload Match Score</td>
              {comparedLaptops.map((l) => (
                <td key={l.id} className="p-4">
                  <span className="text-sm font-black text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/30">
                    {l.matchScore || 90}% Match
                  </span>
                </td>
              ))}
            </tr>

            {/* Processor */}
            <tr>
              <td className="p-4 font-bold text-gray-300 bg-gray-900/30">Processor (CPU)</td>
              {comparedLaptops.map((l) => (
                <td key={l.id} className="p-4 font-semibold text-white">{l.specs.cpu}</td>
              ))}
            </tr>

            {/* GPU */}
            <tr>
              <td className="p-4 font-bold text-gray-300 bg-gray-900/30">Graphics (GPU)</td>
              {comparedLaptops.map((l) => (
                <td key={l.id} className="p-4 font-semibold text-white">{l.specs.gpu}</td>
              ))}
            </tr>

            {/* RAM */}
            <tr>
              <td className="p-4 font-bold text-gray-300 bg-gray-900/30">RAM</td>
              {comparedLaptops.map((l) => (
                <td key={l.id} className="p-4 font-semibold text-white">{l.specs.ramGB} GB ({l.specs.ramType})</td>
              ))}
            </tr>

            {/* Storage */}
            <tr>
              <td className="p-4 font-bold text-gray-300 bg-gray-900/30">Storage</td>
              {comparedLaptops.map((l) => (
                <td key={l.id} className="p-4 font-semibold text-white">{l.specs.storageGB} GB SSD</td>
              ))}
            </tr>

            {/* Display */}
            <tr>
              <td className="p-4 font-bold text-gray-300 bg-gray-900/30">Display</td>
              {comparedLaptops.map((l) => (
                <td key={l.id} className="p-4 text-white">{l.specs.displaySize}" {l.specs.resolution} ({l.specs.refreshRate}Hz)</td>
              ))}
            </tr>

            {/* Battery Life */}
            <tr>
              <td className="p-4 font-bold text-gray-300 bg-gray-900/30">Battery Life</td>
              {comparedLaptops.map((l) => (
                <td key={l.id} className="p-4 text-emerald-400 font-bold">{l.specs.batteryHours} Hours</td>
              ))}
            </tr>

            {/* Weight */}
            <tr>
              <td className="p-4 font-bold text-gray-300 bg-gray-900/30">Weight</td>
              {comparedLaptops.map((l) => (
                <td key={l.id} className="p-4 text-gray-200">{l.specs.weightKg} kg</td>
              ))}
            </tr>

            {/* Price Prediction */}
            <tr>
              <td className="p-4 font-bold text-gray-300 bg-gray-900/30">Price Prediction</td>
              {comparedLaptops.map((l) => (
                <td key={l.id} className="p-4">
                  <span className="text-xs font-bold text-cyan-400 block">{l.prediction.recommendation.replace('_', ' ')}</span>
                  <span className="text-[11px] text-gray-400">Target Min: ₹{l.prediction.projectedMinPrice30Days.toLocaleString('en-IN')}</span>
                </td>
              ))}
            </tr>

            {/* Action Buy Links */}
            <tr>
              <td className="p-4 font-bold text-gray-300 bg-gray-900/30">Purchase</td>
              {comparedLaptops.map((l) => {
                const best = l.retailers[0];
                return (
                  <td key={l.id} className="p-4">
                    <a
                      href={best.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 text-black font-bold text-xs shadow-glow-cyan"
                    >
                      Buy on {best.retailer} <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </td>
                );
              })}
            </tr>

          </tbody>
        </table>
      </div>

    </div>
  );
};
