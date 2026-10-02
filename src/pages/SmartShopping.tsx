import React, { useState } from 'react';
import { useEconest } from '../context/EconestContext';
import {
  ShoppingCart,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  AlertTriangle,
  ExternalLink,
  Store,
  ArrowRight,
  TrendingDown,
  ShoppingBag
} from 'lucide-react';
import { ShoppingItem } from '../types';

export const SmartShopping: React.FC = () => {
  const {
    shoppingItems,
    toggleShoppingItem,
    removeShoppingItem,
    convertShoppingToPantry,
    setIsAddItemOpen,
    setAddItemInitialTab,
    addToast
  } = useEconest();

  const [activeStoreFilter, setActiveStoreFilter] = useState<string>('all');

  const unpurchasedItems = shoppingItems.filter(s => !s.checked);
  const purchasedItems = shoppingItems.filter(s => s.checked);

  const totalEstCost = unpurchasedItems.reduce((acc, curr) => acc + curr.estimatedPrice, 0);

  const handleSimulateSyncBlinkit = () => {
    addToast(
      'Blinkit Cart Synced! ⚡',
      `Forwarded ${unpurchasedItems.length} items to your Blinkit checkout. Duplicates were automatically skipped.`,
      'success'
    );
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-[#e8e5f2] dark:border-slate-800 shadow-soft">
        <div>
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-indigo-600" />
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Smart Shopping
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Pantry-aware cart intelligence, automatic duplicate blocker, and instant quick-commerce sync.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleSimulateSyncBlinkit}
            className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all"
          >
            <Store className="w-4 h-4" /> Sync with Blinkit
          </button>
          <button
            onClick={() => {
              setAddItemInitialTab('shopping');
              setIsAddItemOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" /> Add Item
          </button>
        </div>
      </div>

      {/* Duplicate Warning Callout */}
      {shoppingItems.some(s => s.duplicateWarning) && (
        <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 flex items-start gap-3 shadow-soft">
          <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xs text-purple-900 dark:text-purple-200 uppercase tracking-wide">
                Duplicate Cart Intercepted
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-200 text-purple-800">
                Pantry Match
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Don't buy tomatoes: You currently have 4 fresh country tomatoes in your vegetable crisper. Removing this item saves ₹60 and eliminates food waste.
            </p>
          </div>
        </div>
      )}

      {/* Cart Summary Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">
          <span>Active Cart: {unpurchasedItems.length} items</span>
          <span className="text-slate-400">•</span>
          <span className="text-emerald-600 font-extrabold">Est. Total: ₹{totalEstCost}</span>
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-3">
        {unpurchasedItems.map(item => (
          <div
            key={item.id}
            className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              item.duplicateWarning
                ? 'bg-purple-50/50 dark:bg-purple-950/20 border-purple-300 dark:border-purple-800 shadow-sm'
                : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800'
            }`}
          >
            <div className="flex items-start gap-3">
              <button
                onClick={() => toggleShoppingItem(item.id)}
                className="w-5 h-5 rounded-lg border-2 border-slate-300 dark:border-slate-600 hover:border-emerald-500 mt-0.5 shrink-0 transition-colors"
                title="Mark as purchased"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                    {item.name}
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {item.quantity} {item.unit}
                  </span>
                  {item.storeSuggestion && (
                    <span className="text-[10px] font-semibold text-slate-400">
                      via {item.storeSuggestion}
                    </span>
                  )}
                </div>

                {item.duplicateWarning ? (
                  <p className="text-xs font-bold text-purple-700 dark:text-purple-300 mt-1 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {item.duplicateWarning}
                  </p>
                ) : (
                  <p className="text-xs text-slate-400 mt-0.5">
                    Added due to: <span className="font-semibold capitalize text-slate-600 dark:text-slate-300">{item.addedReason}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
              <span className="font-mono font-bold text-sm text-slate-800 dark:text-slate-200">
                ₹{item.estimatedPrice}
              </span>

              {item.duplicateWarning ? (
                <button
                  onClick={() => removeShoppingItem(item.id)}
                  className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-xs shadow-sm flex items-center gap-1"
                >
                  <TrendingDown className="w-3.5 h-3.5" /> Remove & Save ₹{item.estimatedPrice}
                </button>
              ) : (
                <button
                  onClick={() => removeShoppingItem(item.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Completed / Purchased Section */}
      {purchasedItems.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="font-extrabold text-sm text-slate-500 uppercase tracking-wider">
            Purchased ({purchasedItems.length})
          </h3>
          <div className="space-y-2">
            {purchasedItems.map(item => (
              <div
                key={item.id}
                className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2 text-slate-500 line-through">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="font-semibold">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => convertShoppingToPantry(item.id)}
                    className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px] shadow-sm flex items-center gap-1"
                  >
                    <ShoppingBag className="w-3 h-3" /> Move to Smart Pantry
                  </button>
                  <button
                    onClick={() => removeShoppingItem(item.id)}
                    className="p-1 text-slate-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
