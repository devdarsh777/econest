import React, { useState } from 'react';
import { useEconest } from '../context/EconestContext';
import {
  History,
  ChefHat,
  Receipt,
  Leaf,
  ShoppingCart,
  Wallet,
  Clock,
  ArrowUpRight,
  TrendingDown,
  X
} from 'lucide-react';

export const ActivityFeed: React.FC = () => {
  const { activities } = useEconest();
  const [showFullLog, setShowFullLog] = useState(false);

  const getModuleIcon = (module: string) => {
    switch (module) {
      case 'Recipe':
        return <ChefHat className="w-3.5 h-3.5 text-amber-600" />;
      case 'Receipt':
        return <Receipt className="w-3.5 h-3.5 text-purple-600" />;
      case 'Compost':
        return <Leaf className="w-3.5 h-3.5 text-emerald-600" />;
      case 'Cart':
        return <ShoppingCart className="w-3.5 h-3.5 text-blue-600" />;
      case 'Expense':
        return <Wallet className="w-3.5 h-3.5 text-rose-600" />;
      default:
        return <Clock className="w-3.5 h-3.5 text-slate-600" />;
    }
  };

  const displayedActivities = activities.slice(0, 4);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-[#e8e5f2] dark:border-slate-800 p-4 shadow-soft">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-emerald-600" />
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
            Recent Household Activity Feed
          </h3>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
          Live Stream
        </span>
      </div>

      <div className="space-y-3">
        {displayedActivities.map((act) => (
          <div
            key={act.id}
            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-800 text-xs"
          >
            <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
              {getModuleIcon(act.module)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="font-bold text-slate-800 dark:text-slate-200 truncate">
                  {act.title}
                </span>
                <span className="text-[10px] text-slate-400 shrink-0 font-medium">
                  {act.timestamp}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug line-clamp-2">
                {act.description}
              </p>
              {act.savings && (
                <div className="mt-1 flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  <TrendingDown className="w-3 h-3" />
                  <span>Saved ₹{act.savings}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 text-center">
        <button
          onClick={() => setShowFullLog(true)}
          className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 flex items-center justify-center gap-1 w-full"
        >
          <span>View Full Activity Log ({activities.length})</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Full Log Modal */}
      {showFullLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full max-h-[80vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Complete Household Activity History
              </h3>
              <button
                onClick={() => setShowFullLog(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto space-y-3">
              {activities.map((act) => (
                <div key={act.id} className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-xs">
                  <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                    <span>{act.title}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{act.timestamp}</span>
                  </div>
                  <p className="text-slate-500 mt-1">{act.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
