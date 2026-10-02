import React from 'react';
import { useEconest } from '../context/EconestContext';
import {
  BarChart3,
  TrendingDown,
  Leaf,
  Calendar,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Award
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid
} from 'recharts';

export const Reports: React.FC = () => {
  const { household } = useEconest();

  const monthlyComparisonData = [
    { metric: 'Food Waste Avoided (kg)', lastMonth: 1.6, thisMonth: 2.4 },
    { metric: 'Duplicate Spends Prevented (₹)', lastMonth: 450, thisMonth: 820 },
    { metric: 'Pantry Sufficiency (%)', lastMonth: 82, thisMonth: 94 },
    { metric: 'Carbon Abated (kg CO₂e)', lastMonth: 9.8, thisMonth: 14.2 },
  ];

  const sixMonthSavingsTrend = [
    { month: 'May', SavingsRupees: 650, WasteCutKg: 1.1 },
    { month: 'Jun', SavingsRupees: 890, WasteCutKg: 1.4 },
    { month: 'Jul', SavingsRupees: 1050, WasteCutKg: 1.8 },
    { month: 'Aug', SavingsRupees: 1180, WasteCutKg: 2.0 },
    { month: 'Sep', SavingsRupees: 1340, WasteCutKg: 2.2 },
    { month: 'Oct (Est)', SavingsRupees: 1420, WasteCutKg: 2.4 },
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-[#e8e5f2] dark:border-slate-800 shadow-soft">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-600" />
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Reports & Insights
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Household efficiency analytics, financial leak prevention, and sustainability trends.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-800 dark:text-emerald-300">
          <Award className="w-4 h-4 text-emerald-600" />
          <span>Top 5% Eco-Efficient Bangalore Household</span>
        </div>
      </div>

      {/* This Month vs Last Month Callouts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {monthlyComparisonData.map((item, idx) => {
          const diff = Math.round(((item.thisMonth - item.lastMonth) / item.lastMonth) * 100);
          return (
            <div
              key={idx}
              className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-soft"
            >
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {item.metric}
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                {item.thisMonth}
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+{diff}% vs Last Month ({item.lastMonth})</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cumulative Financial Savings Chart */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Cumulative Leakage Avoided (₹)
            </h3>
            <p className="text-xs text-slate-400">
              Direct monetary savings via duplicate prevention, recipe diversion & proactive expiry rescue
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-xl">
            Total Saved to Date: ₹6,530
          </span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sixMonthSavingsTrend}>
              <defs>
                <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Area type="monotone" dataKey="SavingsRupees" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorSavings)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key AI Takeaways */}
      <div className="p-5 bg-gradient-to-r from-purple-50 to-emerald-50 dark:from-slate-900 dark:to-purple-950/30 rounded-3xl border border-purple-200/60 dark:border-slate-800 shadow-soft space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
            Econest Autonomous Optimization Report
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-600 dark:text-slate-300">
          <div className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">Pantry Utilization: 94%</span>
            Average ingredient turnover is 6.2 days. Long grain basmati & pantry spices have zero spoilage risk.
          </div>
          <div className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">Quick Commerce Optimization</span>
            Duplicate item prevention in Blinkit/Zepto baskets saved ₹820 this month alone.
          </div>
          <div className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">Carbon Footprint</span>
            Kitchen compost diversion averted 14.2 kg CO₂e from city landfills, equivalent to 42 km of EV driving.
          </div>
        </div>
      </div>
    </div>
  );
};
