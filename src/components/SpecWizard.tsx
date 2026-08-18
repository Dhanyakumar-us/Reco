import React, { useState } from 'react';
import { UserPreferences, UseCase } from '../types';
import { Gamepad2, Code, Video, Briefcase, GraduationCap, DollarSign, Cpu, HardDrive, Battery, ArrowRight, RefreshCw, Zap } from 'lucide-react';

interface SpecWizardProps {
  preferences: UserPreferences;
  onApplyPreferences: (newPrefs: UserPreferences) => void;
  onCloseWizard?: () => void;
}

export const SpecWizard: React.FC<SpecWizardProps> = ({
  preferences,
  onApplyPreferences,
  onCloseWizard,
}) => {
  const [form, setForm] = useState<UserPreferences>(preferences);

  const useCases: { id: UseCase; label: string; icon: any; desc: string }[] = [
    { id: 'gaming', label: 'Gaming & VR', icon: Gamepad2, desc: 'High GPU TGP power, fast 144Hz+ displays, intense cooling' },
    { id: 'coding', label: 'Coding & Dev', icon: Code, desc: '32GB RAM, fast multi-core CPU, crisp display, Linux/Win/macOS' },
    { id: 'creator', label: 'Video & 3D Creator', icon: Video, desc: 'Color-accurate OLED/XDR displays, high VRAM, color space' },
    { id: 'business', label: 'Business & Office', icon: Briefcase, desc: 'Premium build, webcam privacy, 2-in-1 touch, long battery' },
    { id: 'student', label: 'Student & Portable', icon: GraduationCap, desc: 'Lightweight (<1.5kg), 12+ hr battery life, budget value' },
    { id: 'budget', label: 'Everyday Budget', icon: DollarSign, desc: 'Sub-₹60,000 laptops with maximum performance per rupee' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyPreferences(form);
    if (onCloseWizard) onCloseWizard();
  };

  const handleReset = () => {
    const defaultPrefs: UserPreferences = {
      useCase: 'gaming',
      budget: 150000,
      minRam: 16,
      minStorage: 512,
      needsDedicatedGpu: true,
      minBatteryHours: 6,
      preferredGpuTier: 'any',
      minGpuTgpWatts: 0,
    };
    setForm(defaultPrefs);
    onApplyPreferences(defaultPrefs);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 md:p-8 border border-gray-800 shadow-2xl relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-800">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Cpu className="w-6 h-6 text-cyan-400" />
              Smart Specification & GPU Matcher
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Customize your workload requirements and GPU Total Graphics Power (TGP Watts) in Indian Rupees (₹).
            </p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Step 1: Select Workload / Use Case */}
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-3">
              1. What is your primary laptop use case?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {useCases.map((uc) => {
                const Icon = uc.icon;
                const isSelected = form.useCase === uc.id;
                return (
                  <div
                    key={uc.id}
                    onClick={() => setForm({ ...form, useCase: uc.id })}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-cyan-500/15 border-cyan-400 shadow-glow-cyan text-white'
                        : 'bg-gray-900/60 border-gray-800 hover:border-gray-700 hover:bg-gray-800/40 text-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-cyan-500 text-black' : 'bg-gray-800 text-cyan-400'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      {isSelected && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />}
                    </div>
                    <div className="font-semibold text-sm">{uc.label}</div>
                    <div className="text-xs text-gray-400 mt-1 line-clamp-2">{uc.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: GPU Information & Power (TGP Watts) */}
          <div className="bg-gray-900/90 p-5 rounded-xl border border-cyan-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-bold text-cyan-400">2. GPU Information & Power Rating (TGP Watts)</span>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">Graphics Power Configuration</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-300 uppercase block mb-1.5">Preferred GPU Tier</label>
                <select
                  value={form.preferredGpuTier || 'any'}
                  onChange={(e) => setForm({ ...form, preferredGpuTier: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="any">Any GPU (Integrated or Discrete)</option>
                  <option value="Mid">Mid-Range (NVIDIA RTX 4060 / 4070 - Recommended)</option>
                  <option value="High">High-End Enthusiast (NVIDIA RTX 4080 / 4090)</option>
                  <option value="Entry">Entry-Level (RTX 3050 / RTX 4050)</option>
                  <option value="Integrated">Integrated / Ultra-Efficient (Intel Arc / Apple M3)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 uppercase block mb-1.5">Min GPU Power (TGP in Watts)</label>
                <select
                  value={form.minGpuTgpWatts || 0}
                  onChange={(e) => setForm({ ...form, minGpuTgpWatts: Number(e.target.value) })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value={0}>Any TGP Wattage</option>
                  <option value={50}>50W+ TGP (Thin & Light Discrete)</option>
                  <option value={100}>100W+ TGP (High Performance Gaming)</option>
                  <option value={140}>140W - 175W TGP (Maximum Unlocked TGP)</option>
                </select>
              </div>
            </div>
            <p className="text-[11px] text-gray-400">
              *TGP (Total Graphics Power) measures maximum GPU wattage. Higher TGP (e.g. 140W vs 60W) delivers significantly higher framerates on RTX GPUs.
            </p>
          </div>

          {/* Step 3: Target Budget Slider */}
          <div className="bg-gray-900/50 p-5 rounded-xl border border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-200 flex items-center gap-2">
                <span className="text-emerald-400 font-extrabold text-lg">₹</span>
                3. Maximum Target Budget (in Indian Rupees)
              </label>
              <span className="text-xl font-extrabold text-emerald-400">
                ₹{form.budget.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min="40000"
              max="350000"
              step="5000"
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })}
              className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2 font-mono">
              <span>₹40,000 (Budget)</span>
              <span>₹1,00,000 (Mid-Range)</span>
              <span>₹2,00,000 (Pro)</span>
              <span>₹3,50,000+ (High-End)</span>
            </div>
          </div>

          {/* Step 4: Hardware Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* RAM Select */}
            <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
              <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                Min RAM Capacity
              </label>
              <select
                value={form.minRam}
                onChange={(e) => setForm({ ...form, minRam: Number(e.target.value) })}
                className="w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
              >
                <option value={8}>8 GB RAM (Basic)</option>
                <option value={16}>16 GB RAM (Standard / Recommended)</option>
                <option value={32}>32 GB RAM (High-Performance)</option>
                <option value={64}>64 GB RAM (Extreme / VMs)</option>
              </select>
            </div>

            {/* Storage Select */}
            <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
              <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-purple-400" />
                Min Storage Space
              </label>
              <select
                value={form.minStorage}
                onChange={(e) => setForm({ ...form, minStorage: Number(e.target.value) })}
                className="w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-400"
              >
                <option value={256}>256 GB SSD</option>
                <option value={512}>512 GB SSD (Standard)</option>
                <option value={1024}>1 TB (1024 GB) SSD (Recommended)</option>
                <option value={2048}>2 TB (2048 GB) SSD (Large Storage)</option>
              </select>
            </div>

            {/* Battery Preference */}
            <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
              <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Battery className="w-4 h-4 text-emerald-400" />
                Min Battery Life
              </label>
              <select
                value={form.minBatteryHours || 0}
                onChange={(e) => setForm({ ...form, minBatteryHours: Number(e.target.value) })}
                className="w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
              >
                <option value={0}>Any Battery Life</option>
                <option value={6}>6+ Hours (Standard Gaming/Work)</option>
                <option value={10}>10+ Hours (All-Day Work)</option>
                <option value={15}>15+ Hours (Ultra Portable)</option>
              </select>
            </div>

          </div>

          {/* Toggle Options */}
          <div className="flex flex-wrap items-center gap-6 pt-2">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={form.needsDedicatedGpu || false}
                onChange={(e) => setForm({ ...form, needsDedicatedGpu: e.target.checked })}
                className="w-4 h-4 rounded bg-gray-800 border-gray-700 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-gray-900"
              />
              <span className="text-sm font-medium text-gray-300">
                Require Discrete GPU (NVIDIA RTX / AMD Radeon)
              </span>
            </label>
          </div>

          {/* Submit CTA */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-800">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-sm shadow-glow-cyan transition-all transform hover:scale-[1.02]"
            >
              <span>Calculate & Match Recommendations</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
