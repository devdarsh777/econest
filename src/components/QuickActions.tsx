import React from 'react';
import { useEconest } from '../context/EconestContext';
import {
  ScanLine,
  ShoppingCart,
  Clock,
  Zap,
  ChevronRight
} from 'lucide-react';

export const QuickActions: React.FC = () => {
  const {
    setIsReceiptModalOpen,
    setIsAddItemOpen,
    setAddItemInitialTab,
    addToast
  } = useEconest();

  const handleEnergyCheck = () => {
    addToast(
      "Energy Monitor: All Clear ⚡",
      "Refrigerator running at optimal 3.8°C. Kitchen smart plugs drawing normal 240W.",
      "info"
    );
  };

  const actions = [
    {
      title: "Scan Receipt",
      subtitle: "Instant OCR parse",
      icon: ScanLine,
      color: "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300",
      action: () => setIsReceiptModalOpen(true)
    },
    {
      title: "Add Cart Item",
      subtitle: "Auto sync Blinkit",
      icon: ShoppingCart,
      color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300",
      action: () => {
        setAddItemInitialTab('shopping');
        setIsAddItemOpen(true);
      }
    },
    {
      title: "Log Leftovers",
      subtitle: "Calculate shelf life",
      icon: Clock,
      color: "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
      action: () => {
        setAddItemInitialTab('leftover');
        setIsAddItemOpen(true);
      }
    },
    {
      title: "Energy Check",
      subtitle: "Smart plug monitor",
      icon: Zap,
      color: "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300",
      action: handleEnergyCheck
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-[#e8e5f2] dark:border-slate-800 p-4 shadow-soft">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
          Quick Household Actions
        </h3>
        <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
          Instant Triggers
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {actions.map((act, idx) => {
          const Icon = act.icon;
          return (
            <button
              key={idx}
              onClick={act.action}
              className="p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-emerald-50/30 dark:hover:bg-slate-800/60 transition-all text-left group flex items-start gap-2.5"
            >
              <div className={`p-2 rounded-lg ${act.color} transition-transform group-hover:scale-110 shrink-0`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="font-bold text-xs text-slate-800 dark:text-slate-200 truncate group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                  {act.title}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {act.subtitle}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
