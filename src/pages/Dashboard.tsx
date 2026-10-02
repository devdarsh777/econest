import React from 'react';
import { useEconest } from '../context/EconestContext';
import { RecommendationCard } from '../components/RecommendationCard';
import { MetricCard } from '../components/MetricCard';
import { QuickActions } from '../components/QuickActions';
import { ActivityFeed } from '../components/ActivityFeed';
import {
  Sparkles,
  Zap,
  Clock,
  Package,
  Wallet,
  Recycle,
  ShoppingCart,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChefHat,
  TrendingDown,
  ShieldCheck,
  Flame,
  Leaf,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const {
    household,
    aiRecommendations,
    resolveAIRecommendation,
    executeAllRecommendations,
    setActiveTab,
    pantryItems,
    expenses,
    shoppingItems,
    synergies,
    setActiveCookingRecipe,
    recipes,
    removeShoppingItem,
    addToast
  } = useEconest();

  // Calculation for Ecosystem cards
  const trackedExpiry = pantryItems.length;
  const expiringPantry = pantryItems.filter(p => p.status === 'expiring' || p.status === 'use-soon').length;
  const lowStockCount = 4;
  const activeCartCount = shoppingItems.length;

  const handleStartSynergyCooking = (recipeId: string) => {
    const matched = recipes.find(r => r.id === recipeId) || recipes[0];
    setActiveCookingRecipe(matched);
  };

  const handleRemoveDuplicateSynergy = () => {
    // Remove duplicate tomatoes
    const duplicate = shoppingItems.find(s => s.duplicateWarning);
    if (duplicate) {
      removeShoppingItem(duplicate.id);
    } else {
      addToast('Cart already optimized!', 'No duplicate tomatoes found.', 'info');
    }
  };

  const handleViewBreakdown = () => {
    setActiveTab('expenses');
    addToast('Dining Swap Analysis', 'Home cooked Pasta saves ₹420 vs 2 Swiggy restaurant deliveries.', 'info');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* 1. TOP GREETING & HOUSEHOLD HEALTH METRICS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-[#e8e5f2] dark:border-slate-800 shadow-soft">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Good morning, {household.adminName} 👋
            </h1>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              Optimal Sync
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Here's what needs your attention today across your household.
          </p>
        </div>

        {/* Small Household Health Metrics */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/40">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center">
              <Leaf className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-300">
                Carbon Saved
              </div>
              <div className="text-sm font-extrabold text-emerald-900 dark:text-emerald-200">
                {household.carbonSavedKg} kg CO₂e
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800/40">
            <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center">
              <TrendingDown className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-purple-800 dark:text-purple-300">
                Leakage Avoided
              </div>
              <div className="text-sm font-extrabold text-purple-900 dark:text-purple-200">
                ₹{household.leakageAvoidedRupees.toLocaleString('en-IN')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. AI ECONEST BRIEFING (Large Premium Card) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-[#faf9ff] to-[#f4f1ff] dark:from-slate-900 dark:via-slate-900/95 dark:to-purple-950/30 border border-purple-200/80 dark:border-purple-900/50 p-6 shadow-card">
        {/* Glowing background aura */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-purple-300/20 dark:bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-300/20 dark:bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-purple-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-extrabold tracking-wider uppercase text-purple-700 dark:text-purple-300">
              AI ECONEST SYNC: LIVE
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('ai-assistant')}
              className="px-3.5 py-1.5 rounded-xl border border-purple-200 dark:border-purple-800 bg-white/80 dark:bg-slate-800 text-xs font-semibold text-purple-700 dark:text-purple-300 hover:bg-purple-50 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI Assistant</span>
            </button>
            <button
              onClick={executeAllRecommendations}
              className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5 hover:scale-105 active:scale-95"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Execute Recommendations (Auto-resolve)</span>
            </button>
          </div>
        </div>

        {/* Title & Context */}
        <div className="relative mt-4 mb-5">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Your AI Econest Briefing
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
            3 priority items need your proactive decision before evening sync.
          </p>
        </div>

        {/* 3 AI Recommendation Cards */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiRecommendations.map((rec) => (
            <RecommendationCard
              key={rec.id}
              recommendation={rec}
              onAction={resolveAIRecommendation}
            />
          ))}
        </div>

        {/* Bottom AI Explanation Footnote */}
        <div className="relative mt-5 pt-4 border-t border-purple-100/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Econest AI scans pantry vision, connected grocery receipts, and utility schedules in real-time.
            </span>
          </div>
          <span className="text-[11px] font-mono text-purple-600 dark:text-purple-400 font-semibold">
            Next autonomous sync in 42 mins
          </span>
        </div>
      </div>

      {/* 3. ECOSYSTEM OVERVIEW (Horizontal Responsive Metric Cards) */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
            Household Ecosystem Overview
          </h3>
          <span className="text-xs text-slate-400">Updated 2m ago</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
          <MetricCard
            title="Expiry Guard"
            metric={`${trackedExpiry} tracked`}
            subtext={`${expiringPantry} expiring soon`}
            icon={Clock}
            iconColor="bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
            badgeText="Attention"
            badgeColor="bg-amber-50 text-amber-800 border-amber-200"
            onClick={() => setActiveTab('expiry')}
          />

          <MetricCard
            title="Smart Pantry"
            metric={`${pantryItems.length} items`}
            subtext={`${lowStockCount} items low`}
            icon={Package}
            iconColor="bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
            badgeText="94% Health"
            badgeColor="bg-emerald-50 text-emerald-700 border-emerald-200"
            onClick={() => setActiveTab('pantry')}
          />

          <MetricCard
            title="Monthly Spend"
            metric={`₹${household.totalMonthlySpend.toLocaleString('en-IN')}`}
            subtext="66% budget left"
            icon={Wallet}
            iconColor="bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300"
            badgeText="On Track"
            badgeColor="bg-purple-50 text-purple-700 border-purple-200"
            onClick={() => setActiveTab('expenses')}
          />

          <MetricCard
            title="Waste Saved"
            metric="2.4 kg"
            subtext="₹1,240 saved"
            icon={Recycle}
            iconColor="bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
            badgeText="Eco Hero"
            badgeColor="bg-emerald-50 text-emerald-700 border-emerald-200"
            onClick={() => setActiveTab('waste')}
          />

          <MetricCard
            title="Active Cart"
            metric={`${activeCartCount} items`}
            subtext="₹180 leak fix"
            icon={ShoppingCart}
            iconColor="bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300"
            badgeText="Blinkit Sync"
            badgeColor="bg-indigo-50 text-indigo-700 border-indigo-200"
            onClick={() => setActiveTab('shopping')}
          />
        </div>
      </div>

      {/* 4. TWO-COLUMN SPLIT: NEEDS IMMEDIATE ACTION (Left) vs SYNERGIES & QUICK ACTIONS (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN (2 Cols): NEEDS IMMEDIATE ACTION */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Needs Immediate Action
              </h3>
            </div>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              5 Actionable Events
            </span>
          </div>

          <div className="space-y-3">
            {/* Action Item 1: Milk */}
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-soft hover:shadow-card transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold text-sm shrink-0">
                  🥛
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      Amul Taaza Milk (1 Litre Tetra)
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                      Use Soon
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Expires in ~18 hours • Top shelf of refrigerator
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  const r = recipes.find(rec => rec.id === 'r-paneer') || recipes[0];
                  setActiveCookingRecipe(r);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all whitespace-nowrap self-start sm:self-center flex items-center gap-1"
              >
                <ChefHat className="w-3.5 h-3.5" /> Find 3 recipes
              </button>
            </div>

            {/* Action Item 2: Fresh Country Tomatoes */}
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-soft hover:shadow-card transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 flex items-center justify-center font-bold text-sm shrink-0">
                  🍅
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      Fresh Country Tomatoes (4 units)
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      2 days left
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Pantry synergy: Basmati rice & mustard seeds available in pantry
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleStartSynergyCooking('r-tomato-egg-rice')}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all whitespace-nowrap self-start sm:self-center flex items-center gap-1"
              >
                <ChefHat className="w-3.5 h-3.5" /> Cook Tomato Rice
              </button>
            </div>

            {/* Action Item 3: BESCOM Electricity Bill */}
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-soft hover:shadow-card transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-sm shrink-0">
                  ⚡
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      BESCOM Electricity Bill
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      Auto-debit
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    ₹1,240 projected • Due in 3 days (Oct 5)
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-center">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
                  Scheduled
                </span>
              </div>
            </div>

            {/* Action Item 4: Grocery Target Advisory */}
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-soft hover:shadow-card transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold text-sm shrink-0">
                  🎯
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      Grocery Target Advisory
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                      78% used
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Only ₹620 safe allocation remains till Sunday
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('expenses')}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-xs transition-all whitespace-nowrap self-start sm:self-center"
              >
                Adjust Target
              </button>
            </div>

            {/* Action Item 5: Smart Pantry Health Index */}
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-soft hover:shadow-card transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-extrabold text-sm shrink-0">
                  94
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      Smart Pantry Health Index: 94/100
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Optimal Score
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    94% pantry sufficiency. Only 2 dry essentials (Atta & Salt) need refill.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('pantry')}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-xs transition-all whitespace-nowrap self-start sm:self-center"
              >
                View Pantry
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (1 Col): CROSS-MODULE AI SYNERGIES & QUICK ACTIONS */}
        <div className="space-y-6">
          {/* CROSS-MODULE AI SYNERGIES */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-[#e8e5f2] dark:border-slate-800 p-5 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Cross-Module Synergies
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300">
                Pantry + Cart + Budget
              </span>
            </div>

            <div className="space-y-3.5">
              {/* Synergy 1 */}
              <div className="p-3.5 rounded-xl border border-purple-100 dark:border-purple-900/40 bg-purple-50/40 dark:bg-purple-950/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-800 dark:text-slate-100">
                    Tomato & Egg Rice Synergy
                  </span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-purple-200/70 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    15 min
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Cook today using your ripening tomatoes and brown eggs before they hit critical shelf limit.
                </p>
                <div className="pt-1">
                  <button
                    onClick={() => handleStartSynergyCooking('r-tomato-egg-rice')}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
                  >
                    <ChefHat className="w-3.5 h-3.5" /> Start Cooking
                  </button>
                </div>
              </div>

              {/* Synergy 2 */}
              <div className="p-3.5 rounded-xl border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-800 dark:text-slate-100">
                    Skip Tomatoes on Delivery List
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                    Save ₹60
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  4 firm tomatoes are waiting in your vegetable crisper. Immediate savings: ₹60.
                </p>
                <div className="pt-1">
                  <button
                    onClick={handleRemoveDuplicateSynergy}
                    className="w-full py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Remove & Save ₹60
                  </button>
                </div>
              </div>

              {/* Synergy 3 */}
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-800 dark:text-slate-100">
                    Save ₹420 this week
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600">
                    Swiggy Swap
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Swap 2 Swiggy food delivery orders with quick 15-min pantry dinners utilizing ready pasta & marinara.
                </p>
                <div className="pt-1">
                  <button
                    onClick={handleViewBreakdown}
                    className="w-full py-2 border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 font-bold text-xs text-slate-700 dark:text-slate-300 rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    View Breakdown <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Household Actions */}
          <QuickActions />

          {/* Activity Feed */}
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
};
