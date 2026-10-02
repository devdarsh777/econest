import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  metric: string;
  subtext: string;
  icon: LucideIcon;
  iconColor: string;
  badgeText?: string;
  badgeColor?: string;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  metric,
  subtext,
  icon: Icon,
  iconColor,
  badgeText,
  badgeColor = 'bg-slate-100 text-slate-700',
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={`group p-4 bg-white dark:bg-slate-900 rounded-2xl border border-[#e8e5f2] dark:border-slate-800 shadow-soft hover:shadow-card hover:-translate-y-0.5 transition-all duration-200 ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${iconColor} transition-transform group-hover:scale-110`}>
          <Icon className="w-5 h-5" />
        </div>
        {badgeText && (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeColor}`}>
            {badgeText}
          </span>
        )}
      </div>

      <div className="space-y-0.5">
        <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          {title}
        </div>
        <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          {metric}
        </div>
        <div className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
          {subtext}
        </div>
      </div>
    </div>
  );
};
