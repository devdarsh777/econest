import React, { useState } from 'react';
import { useEconest } from '../context/EconestContext';
import {
  LayoutDashboard,
  Clock,
  Package,
  Wallet,
  Recycle,
  ShoppingCart,
  Bot,
  Bell,
  BarChart3,
  Settings,
  ChevronDown,
  Building2,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  X
} from 'lucide-react';

interface SidebarProps {
  isMobileOpen?: boolean;
  setIsMobileOpen?: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen = false, setIsMobileOpen }) => {
  const {
    activeTab,
    setActiveTab,
    pantryItems,
    notifications,
    shoppingItems,
    household
  } = useEconest();

  const [householdDropdown, setHouseholdDropdown] = useState(false);

  const expiringCount = pantryItems.filter(p => p.status === 'expiring' || p.status === 'use-soon').length;
  const unreadNotifs = notifications.filter(n => !n.read).length;
  const activeShoppingCount = shoppingItems.filter(s => !s.checked).length;

  const navItems = [
    {
      group: 'OVERVIEW',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }
      ]
    },
    {
      group: 'MANAGE',
      items: [
        { id: 'expiry', label: 'Expiry Guard', icon: Clock, badge: expiringCount > 0 ? `${expiringCount}` : undefined, badgeColor: 'bg-amber-100 text-amber-800 border-amber-200' },
        { id: 'pantry', label: 'Smart Pantry', icon: Package, badge: `${pantryItems.length}`, badgeColor: 'bg-slate-100 text-slate-700' },
        { id: 'expenses', label: 'Expense Manager', icon: Wallet },
        { id: 'waste', label: 'Waste Guard', icon: Recycle, badge: 'Eco', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
        { id: 'shopping', label: 'Smart Shopping', icon: ShoppingCart, badge: activeShoppingCount > 0 ? `${activeShoppingCount}` : undefined, badgeColor: 'bg-purple-100 text-purple-700' }
      ]
    },
    {
      group: 'AI ENGINE',
      items: [
        { id: 'ai-assistant', label: 'AI Econest Assistant', icon: Bot, isSpecial: true }
      ]
    },
    {
      group: 'OTHER',
      items: [
        { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadNotifs > 0 ? `${unreadNotifs}` : undefined, badgeColor: 'bg-rose-100 text-rose-700' },
        { id: 'reports', label: 'Reports & Insights', icon: BarChart3 },
        { id: 'settings', label: 'Settings', icon: Settings }
      ]
    }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    if (setIsMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-[#e8e5f2] dark:border-slate-800 select-none">
      {/* Brand Header */}
      <div className="p-5 pb-4 border-b border-[#f0edf7] dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('dashboard')}>
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-emerald-50 dark:bg-emerald-950/40 p-1 flex items-center justify-center shadow-sm border border-emerald-100 dark:border-emerald-800/40">
              <img src="/econest-logo.png" alt="Econest Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">Econest</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                  AI 2.0
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                Smarter Homes. Happier Lives.
              </p>
            </div>
          </div>
          {setIsMobileOpen && (
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Household Selector */}
        <div className="mt-4 relative">
          <button
            onClick={() => setHouseholdDropdown(!householdDropdown)}
            className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-purple-50/50 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 transition-colors"
          >
            <div className="flex items-center gap-2 text-left truncate">
              <Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div className="truncate">
                <div className="font-semibold text-slate-800 dark:text-slate-200 truncate">{household.name}</div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500">{household.city}</div>
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>

          {householdDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 z-30 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-1.5 text-xs">
              <div className="px-3 py-1 font-semibold text-[10px] uppercase tracking-wider text-slate-400">
                Switch Household
              </div>
              <button
                onClick={() => setHouseholdDropdown(false)}
                className="w-full px-3 py-1.5 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700 text-emerald-700 dark:text-emerald-400 font-medium"
              >
                <span>{household.name}</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  setHouseholdDropdown(false);
                  alert('Additional secondary households can be connected in Settings > Household.');
                }}
                className="w-full px-3 py-1.5 text-left text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 text-[11px]"
              >
                + Add Vacation / Parent Home
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navItems.map((section, idx) => (
          <div key={idx}>
            <div className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {section.group}
            </div>
            <div className="space-y-1">
              {section.items.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-500/20'
                        : item.isSpecial
                        ? 'bg-purple-50/70 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 hover:bg-purple-100/70 border border-purple-200/50 dark:border-purple-800/30'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                          isActive
                            ? 'text-white'
                            : item.isSpecial
                            ? 'text-purple-600 dark:text-purple-400'
                            : 'text-slate-500 dark:text-slate-400'
                        }`}
                      />
                      <span className="font-semibold">{item.label}</span>
                    </div>

                    {item.isSpecial ? (
                      <span className={`flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        isActive ? 'bg-emerald-700 text-emerald-100' : 'bg-purple-200/80 dark:bg-purple-800 text-purple-800 dark:text-purple-200'
                      }`}>
                        <Sparkles className="w-2.5 h-2.5" />
                        AI
                      </span>
                    ) : item.badge ? (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          isActive
                            ? 'bg-emerald-700 text-white border-emerald-500'
                            : item.badgeColor || 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar Footer: User Profile */}
      <div className="p-3 border-t border-[#f0edf7] dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60">
        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-white font-bold flex items-center justify-center text-xs shadow-sm">
                AL
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                  {household.adminName}
                </span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight">
                {household.adminRole}
              </p>
            </div>
          </div>
          <button
            onClick={() => handleNavClick('settings')}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 shrink-0 z-20">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-full bg-white dark:bg-slate-900 shadow-2xl z-50">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
