import React, { useState } from 'react';
import { useEconest } from '../context/EconestContext';
import {
  Recycle,
  Leaf,
  TrendingDown,
  AlertTriangle,
  Plus,
  Sparkles,
  Award,
  CheckCircle2,
  Trash2,
  TreePine
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const WasteGuard: React.FC = () => {
  const {
    wasteRecords,
    logWasteItem,
    household,
    addToast
  } = useEconest();

  const [isLogOpen, setIsLogOpen] = useState(false);
  const [wasteName, setWasteName] = useState('');
  const [wasteQty, setWasteQty] = useState('250');
  const [wasteUnit, setWasteUnit] = useState('g');
  const [wasteDest, setWasteDest] = useState<'compost' | 'landfill'>('compost');
  const [wasteReason, setWasteReason] = useState<'kitchen-scraps' | 'expired' | 'leftovers'>('kitchen-scraps');
  const [moneyLost, setMoneyLost] = useState('0');

  const topWastedIngredients = [
    { name: 'Country Tomatoes', wastedCount: 6, loss: 90 },
    { name: 'Coriander / Mint', wastedCount: 4, loss: 60 },
    { name: 'Bananas', wastedCount: 3, loss: 35 },
    { name: 'Milk / Curd scraps', wastedCount: 2, loss: 40 },
  ];

  const wasteAvoidedTrend = [
    { week: 'Week 1', CompostedKg: 0.6, AvoidedKg: 1.2 },
    { week: 'Week 2', CompostedKg: 0.8, AvoidedKg: 1.8 },
    { week: 'Week 3', CompostedKg: 1.1, AvoidedKg: 2.1 },
    { week: 'Week 4', CompostedKg: 1.4, AvoidedKg: 2.4 },
  ];

  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wasteName.trim()) return;

    logWasteItem({
      itemName: wasteName,
      category: 'produce',
      quantity: parseFloat(wasteQty) || 200,
      unit: wasteUnit,
      reason: wasteReason,
      destination: wasteDest,
      moneyLost: parseFloat(moneyLost) || 0,
      co2SavedKg: wasteDest === 'compost' ? 0.45 : 0
    });

    setIsLogOpen(false);
    setWasteName('');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-[#e8e5f2] dark:border-slate-800 shadow-soft">
        <div>
          <div className="flex items-center gap-2">
            <Recycle className="w-5 h-5 text-emerald-600" />
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Waste Guard
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Zero-waste household dashboard tracking diverted organic waste, composting & environmental impact.
          </p>
        </div>

        <button
          onClick={() => setIsLogOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all self-start md:self-auto"
        >
          <Plus className="w-4 h-4" /> Log Compost / Scrap
        </button>
      </div>

      {/* AI Waste Insight Banner */}
      <div className="p-4 rounded-2xl bg-purple-50/80 dark:bg-purple-950/30 border border-purple-200/80 dark:border-purple-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-soft">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xs text-purple-900 dark:text-purple-200 uppercase tracking-wide">
                AI Waste Pattern Detection
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-purple-200 text-purple-800">
                Actionable
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Tomatoes are your most frequently wasted ingredient. Econest now auto-triggers 15-minute Tomato Egg Rice or Pasta synergy before 48-hour shelf boundary.
            </p>
          </div>
        </div>
      </div>

      {/* Top 4 Eco Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-soft">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Waste Saved</span>
            <Leaf className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
            2.4 kg
          </div>
          <div className="text-xs text-emerald-600 font-medium mt-1">
            +35% vs last month
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-soft">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Money Retained</span>
            <TrendingDown className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-700 dark:text-emerald-400 mt-1">
            ₹{household.leakageAvoidedRupees.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-slate-500 font-medium mt-1">
            Prevented spoilage value
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-soft">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Composted Scraps</span>
            <Recycle className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-purple-700 dark:text-purple-400 mt-1">
            1.85 kg
          </div>
          <div className="text-xs text-purple-600 font-medium mt-1">
            Smart Balcony Composter
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-soft">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">CO₂e Abatement</span>
            <TreePine className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
            {household.carbonSavedKg} kg
          </div>
          <div className="text-xs text-emerald-600 font-medium mt-1">
            Zero methane landfill output
          </div>
        </div>
      </div>

      {/* Log Modal */}
      {isLogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-3">
              Log Waste or Composter Load
            </h3>
            <form onSubmit={handleLogSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Item / Waste</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Potato skins, Melon rinds, Expired yogurt"
                  value={wasteName}
                  onChange={(e) => setWasteName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Weight / Qty</label>
                  <input
                    type="number"
                    value={wasteQty}
                    onChange={(e) => setWasteQty(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Destination</label>
                  <select
                    value={wasteDest}
                    onChange={(e) => setWasteDest(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
                  >
                    <option value="compost">🌿 Smart Composter</option>
                    <option value="landfill">🗑️ Discarded / Landfill</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsLogOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-500 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 text-white font-bold rounded-xl shadow"
                >
                  Save to Waste Guard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Visual Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Bar Chart */}
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-soft">
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mb-4">
            Weekly Waste Avoidance & Composting (Kg)
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wasteAvoidedTrend}>
                <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="AvoidedKg" fill="#10b981" name="Food Waste Prevented (Kg)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="CompostedKg" fill="#8b5cf6" name="Composted (Kg)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Wasted Ingredients */}
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-soft">
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mb-4">
            Top Vulnerable Ingredients (Historical)
          </h3>
          <div className="space-y-3">
            {topWastedIngredients.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">{item.name}</div>
                  <div className="text-[11px] text-slate-400">
                    Incidents: {item.wastedCount} times in last 90 days
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-rose-600 block">₹{item.loss} lost</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">Protected by AI</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
