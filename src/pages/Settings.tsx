import React, { useState } from 'react';
import { useEconest } from '../context/EconestContext';
import {
  Settings as SettingsIcon,
  User,
  Building2,
  Bell,
  Sparkles,
  Link,
  Shield,
  Palette,
  Check,
  Moon,
  Sun,
  Smartphone,
  Save
} from 'lucide-react';

export const Settings: React.FC = () => {
  const {
    household,
    setHousehold,
    isDarkMode,
    toggleDarkMode,
    addToast
  } = useEconest();

  const [activeTab, setActiveTab] = useState<'profile' | 'household' | 'ai' | 'connected' | 'appearance'>('profile');

  // Local form state
  const [adminName, setAdminName] = useState(household.adminName);
  const [householdName, setHouseholdName] = useState(household.name);
  const [city, setCity] = useState(household.city);
  const [budget, setBudget] = useState(household.monthlyBudget.toString());

  // Connected apps
  const [connectedServices, setConnectedServices] = useState({
    blinkit: true,
    bigbasket: true,
    zepto: true,
    bescom: true,
    swiggy: true
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setHousehold(prev => ({
      ...prev,
      adminName,
      name: householdName,
      city,
      monthlyBudget: parseFloat(budget) || 25000
    }));
    addToast('Settings Saved', 'Household profile preferences updated successfully.', 'success');
  };

  const toggleService = (key: keyof typeof connectedServices) => {
    setConnectedServices(prev => {
      const next = !prev[key];
      addToast(
        next ? `Connected to ${key.toUpperCase()}` : `Disconnected from ${key.toUpperCase()}`,
        undefined,
        'info'
      );
      return { ...prev, [key]: next };
    });
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-5 rounded-2xl border border-[#e8e5f2] dark:border-slate-800 shadow-soft">
        <div>
          <div className="flex items-center gap-2">
            <SettingsIcon className="w-5 h-5 text-slate-700 dark:text-slate-200" />
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Settings & Preferences
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Household profile, connected grocery delivery integrations, and AI sync automation.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="space-y-1">
          {[
            { id: 'profile', label: 'Profile & Household', icon: User },
            { id: 'ai', label: 'AI Sync Preferences', icon: Sparkles },
            { id: 'connected', label: 'Connected Services', icon: Link },
            { id: 'appearance', label: 'Appearance & Theme', icon: Palette }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Settings Content Area */}
        <div className="md:col-span-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-soft">
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-5 text-xs sm:text-sm">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
                Household Identity
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Admin Full Name
                  </label>
                  <input
                    type="text"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Household Name
                  </label>
                  <input
                    type="text"
                    value={householdName}
                    onChange={(e) => setHouseholdName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    City & Region
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Monthly Spending Budget (₹)
                  </label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" /> Save Preferences
                </button>
              </div>
            </form>
          )}

          {activeTab === 'ai' && (
            <div className="space-y-4 text-xs sm:text-sm">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
                AI Econest Autonomous Rules
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <div>
                    <div className="font-bold text-slate-800 dark:text-slate-200">
                      Auto-Intercept Duplicate Cart Items
                    </div>
                    <div className="text-xs text-slate-500">
                      Warn or remove items from delivery baskets when fresh stock exists in pantry.
                    </div>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600 rounded" />
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <div>
                    <div className="font-bold text-slate-800 dark:text-slate-200">
                      Proactive 24h Expiry Recipe Diversion
                    </div>
                    <div className="text-xs text-slate-500">
                      Synthesize zero-waste meals from expiring ingredients before 9 PM daily.
                    </div>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600 rounded" />
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <div>
                    <div className="font-bold text-slate-800 dark:text-slate-200">
                      Instant Delivery Spend Anomaly Alerts
                    </div>
                    <div className="text-xs text-slate-500">
                      Flag quick-commerce orders exceeding weekly norm by &gt;15%.
                    </div>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600 rounded" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'connected' && (
            <div className="space-y-4 text-xs sm:text-sm">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
                Integrated Household Services
              </h3>
              <p className="text-xs text-slate-500">
                Connected accounts automatically stream receipts, order history, and utility billing cycles into Econest.
              </p>

              <div className="space-y-3">
                {[
                  { key: 'blinkit', name: 'Blinkit Instant Commerce', desc: 'Syncs active cart & item stock in real time' },
                  { key: 'bigbasket', name: 'BigBasket Staples & Fruits', desc: 'Auto-parses monthly delivery invoices' },
                  { key: 'zepto', name: 'Zepto 10-Min Delivery', desc: 'Detects emergency dairy and snack orders' },
                  { key: 'bescom', name: 'BESCOM Electricity Board', desc: 'Monitors smart billing & scheduled auto-debits' },
                  { key: 'swiggy', name: 'Swiggy / Instamart', desc: 'Analyzes restaurant delivery vs home cooking swaps' },
                ].map((s) => {
                  const isConn = (connectedServices as any)[s.key];
                  return (
                    <div
                      key={s.key}
                      className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-slate-800 dark:text-slate-200">{s.name}</div>
                        <div className="text-xs text-slate-500">{s.desc}</div>
                      </div>
                      <button
                        onClick={() => toggleService(s.key as any)}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors ${
                          isConn
                            ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {isConn ? 'Connected' : 'Connect'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-4 text-xs sm:text-sm">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
                Appearance & Theme
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div
                  onClick={() => { if (isDarkMode) toggleDarkMode(); }}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    !isDarkMode ? 'border-emerald-600 bg-emerald-50/30' : 'border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <Sun className="w-6 h-6 text-amber-500 mb-2" />
                  <div className="font-bold text-slate-900 dark:text-white">Light Mode (Default)</div>
                  <div className="text-xs text-slate-400 mt-1">Soft lavender background with crisp white cards</div>
                </div>

                <div
                  onClick={() => { if (!isDarkMode) toggleDarkMode(); }}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isDarkMode ? 'border-emerald-600 bg-slate-800' : 'border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <Moon className="w-6 h-6 text-purple-400 mb-2" />
                  <div className="font-bold text-slate-900 dark:text-white">Dark Mode</div>
                  <div className="text-xs text-slate-400 mt-1">Deep navy & slate palette for evening usage</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
