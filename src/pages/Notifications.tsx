import React, { useState } from 'react';
import { useEconest } from '../context/EconestContext';
import {
  Bell,
  Check,
  Clock,
  Wallet,
  Package,
  ShoppingCart,
  Sparkles,
  Recycle,
  Trash2,
  ArrowRight
} from 'lucide-react';
import { NotificationItem } from '../types';

export const Notifications: React.FC = () => {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    setActiveTab
  } = useEconest();

  const [filterType, setFilterType] = useState<string>('all');

  const filteredNotifs = notifications.filter(n => {
    if (filterType === 'all') return true;
    return n.type === filterType;
  });

  const getNotifIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'expiry':
        return <Clock className="w-4 h-4 text-amber-500" />;
      case 'spending':
        return <Wallet className="w-4 h-4 text-rose-500" />;
      case 'pantry':
        return <Package className="w-4 h-4 text-emerald-500" />;
      case 'shopping':
        return <ShoppingCart className="w-4 h-4 text-blue-500" />;
      case 'ai':
        return <Sparkles className="w-4 h-4 text-purple-500" />;
      case 'waste':
        return <Recycle className="w-4 h-4 text-emerald-600" />;
      default:
        return <Bell className="w-4 h-4 text-slate-500" />;
    }
  };

  const handleActionClick = (notif: NotificationItem) => {
    markNotificationRead(notif.id);
    if (notif.actionRoute) {
      setActiveTab(notif.actionRoute);
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-[#e8e5f2] dark:border-slate-800 shadow-soft">
        <div>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-purple-600" />
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Notification Center
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Proactive household signals, expiry deadlines & spend alerts.
          </p>
        </div>

        <button
          onClick={markAllNotificationsRead}
          className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-colors"
        >
          <Check className="w-4 h-4" /> Mark All as Read
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold">
        {['all', 'expiry', 'spending', 'shopping', 'pantry', 'waste'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilterType(tab)}
            className={`px-3.5 py-1.5 rounded-xl capitalize transition-all whitespace-nowrap ${
              filterType === tab
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {filteredNotifs.map((notif) => (
          <div
            key={notif.id}
            className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              !notif.read
                ? 'bg-purple-50/40 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900/60 shadow-soft'
                : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                {getNotifIcon(notif.type)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {notif.title}
                  </h4>
                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-purple-600" />
                  )}
                  <span className="text-[10px] text-slate-400 font-mono">
                    {notif.time}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                  {notif.message}
                </p>
              </div>
            </div>

            {notif.actionLabel && (
              <div className="flex items-center gap-2 self-start sm:self-center">
                <button
                  onClick={() => handleActionClick(notif)}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-1 transition-all"
                >
                  <span>{notif.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
