import React, { useState } from 'react';
import { AIRecommendation } from '../types';
import { Sparkles, Check, ChevronRight, Info, AlertTriangle, AlertCircle, ShoppingBag } from 'lucide-react';

interface RecommendationCardProps {
  recommendation: AIRecommendation;
  onAction: (id: string) => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  onAction
}) => {
  const [showWhy, setShowWhy] = useState(false);

  const getStatusBadge = () => {
    switch (recommendation.statusType) {
      case 'warning':
        return 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'anomaly':
        return 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800';
      case 'duplicate':
        return 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800';
      default:
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  return (
    <div
      className={`relative p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
        recommendation.resolved
          ? 'bg-slate-50/80 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-800 opacity-70'
          : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 shadow-soft hover:shadow-card hover:border-purple-200 dark:hover:border-purple-900/60'
      }`}
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadge()}`}>
            {recommendation.status}
          </span>
          <button
            onClick={() => setShowWhy(!showWhy)}
            className="text-[10px] text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 flex items-center gap-1 font-medium transition-colors"
            title="Click to view AI reasoning"
          >
            <Info className="w-3 h-3" />
            <span>Why?</span>
          </button>
        </div>

        {/* Title */}
        <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-snug">
          {recommendation.title}
        </h4>

        {/* Description */}
        <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          {recommendation.description}
        </p>

        {/* Expandable Why Reasoning */}
        {showWhy && (
          <div className="mt-2.5 p-2.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-800/40 text-[11px] text-purple-900 dark:text-purple-200 animate-in fade-in duration-150">
            <span className="font-bold flex items-center gap-1 mb-0.5 text-purple-700 dark:text-purple-300">
              <Sparkles className="w-3 h-3" /> AI Reasoning:
            </span>
            {recommendation.whyExplanation}
          </div>
        )}
      </div>

      {/* Action CTA */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
        <span className="text-[10px] text-slate-400">
          {recommendation.timestamp}
        </span>

        {recommendation.resolved ? (
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <Check className="w-3.5 h-3.5" /> Resolved
          </span>
        ) : (
          <button
            onClick={() => onAction(recommendation.id)}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs shadow-sm shadow-emerald-600/20 hover:shadow-md transition-all flex items-center gap-1"
          >
            <span>{recommendation.actionLabel}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
