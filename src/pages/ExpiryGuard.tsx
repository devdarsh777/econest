import React, { useState } from 'react';
import { useEconest } from '../context/EconestContext';
import {
  Clock,
  AlertTriangle,
  CheckCircle2,
  Snowflake,
  Refrigerator,
  ChefHat,
  Search,
  Filter,
  Calendar,
  List,
  Sparkles,
  ArrowRight,
  Plus
} from 'lucide-react';
import { PantryItem, StorageLocation, ItemCategory } from '../types';

export const ExpiryGuard: React.FC = () => {
  const {
    pantryItems,
    consumePantryItem,
    updatePantryItem,
    setActiveCookingRecipe,
    recipes,
    setIsAddItemOpen,
    setAddItemInitialTab,
    addToast
  } = useEconest();

  const [search, setSearch] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  // Filter items
  const filteredItems = pantryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesLoc = selectedLocation === 'all' || item.storageLocation === selectedLocation;
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesLoc && matchesCat;
  });

  // Categorize by urgency
  const expiringToday = filteredItems.filter(i => i.daysRemaining <= 0);
  const expiringTomorrow = filteredItems.filter(i => i.daysRemaining === 1);
  const expiringThisWeek = filteredItems.filter(i => i.daysRemaining >= 2 && i.daysRemaining <= 7);
  const freshLater = filteredItems.filter(i => i.daysRemaining > 7);

  const handleUseInRecipe = (item: PantryItem) => {
    const matched = recipes.find(r =>
      r.ingredientsUsed.some(ing => ing.name.toLowerCase().includes(item.name.toLowerCase()) || item.name.toLowerCase().includes(ing.name.toLowerCase()))
    ) || recipes[0];
    setActiveCookingRecipe(matched);
  };

  const handleFreeze = (item: PantryItem) => {
    updatePantryItem(item.id, {
      storageLocation: 'freezer',
      expiryDate: '2026-12-31'
    });
    addToast(`Moved ${item.name} to Freezer ❄️`, 'Expiry extended by 90 days safely.', 'success');
  };

  const handleMoveToFridge = (item: PantryItem) => {
    updatePantryItem(item.id, { storageLocation: 'fridge' });
    addToast(`Moved ${item.name} to Refrigerator ❄️`, 'Temperature stabilized at 3.5°C.', 'info');
  };

  const renderItemCard = (item: PantryItem) => {
    const isUrgent = item.daysRemaining <= 1;
    const isWarning = item.daysRemaining <= 3;

    return (
      <div
        key={item.id}
        className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
          isUrgent
            ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/60 shadow-soft'
            : isWarning
            ? 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/60'
            : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800'
        }`}
      >
        <div>
          {/* Header Tag */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span
              className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                isUrgent
                  ? 'bg-rose-100 text-rose-800 border-rose-200'
                  : isWarning
                  ? 'bg-amber-100 text-amber-800 border-amber-200'
                  : 'bg-emerald-100 text-emerald-800 border-emerald-200'
              }`}
            >
              {item.daysRemaining <= 0
                ? 'Expires Today'
                : item.daysRemaining === 1
                ? 'Expires Tomorrow'
                : `${item.daysRemaining} days remaining`}
            </span>
            <span className="text-[11px] font-mono text-slate-400 capitalize">
              {item.storageLocation}
            </span>
          </div>

          <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-tight">
            {item.name}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Quantity: <span className="font-semibold text-slate-700 dark:text-slate-300">{item.quantity} {item.unit}</span> • Est. Value: ₹{item.cost}
          </p>
          {item.notes && (
            <p className="text-[11px] text-purple-600 dark:text-purple-300 mt-1 bg-purple-50/60 dark:bg-purple-950/40 px-2 py-0.5 rounded-md inline-block">
              📍 {item.notes}
            </p>
          )}
        </div>

        {/* AI Action Toolbar */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => handleUseInRecipe(item)}
            className="px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] shadow-sm flex items-center gap-1 transition-all"
          >
            <ChefHat className="w-3 h-3" /> Use in Recipe
          </button>

          {item.storageLocation !== 'freezer' && (
            <button
              onClick={() => handleFreeze(item)}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-[11px] font-medium flex items-center gap-1"
            >
              <Snowflake className="w-3 h-3 text-cyan-500" /> Freeze
            </button>
          )}

          {item.storageLocation === 'counter' && (
            <button
              onClick={() => handleMoveToFridge(item)}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-[11px] font-medium flex items-center gap-1"
            >
              <Refrigerator className="w-3 h-3 text-blue-500" /> Move to Fridge
            </button>
          )}

          <button
            onClick={() => consumePantryItem(item.id)}
            className="px-2.5 py-1.5 rounded-xl text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-[11px] font-bold flex items-center gap-1 ml-auto"
          >
            <CheckCircle2 className="w-3 h-3" /> Mark Consumed
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-[#e8e5f2] dark:border-slate-800 shadow-soft">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-500" />
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Expiry Guard
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Proactive zero-waste shelf life surveillance & auto-diversion engine.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg flex items-center gap-1 font-semibold ${
                viewMode === 'list' ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-sm' : 'text-slate-500'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>List</span>
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`p-1.5 rounded-lg flex items-center gap-1 font-semibold ${
                viewMode === 'calendar' ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-sm' : 'text-slate-500'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Calendar</span>
            </button>
          </div>

          <button
            onClick={() => {
              setAddItemInitialTab('food');
              setIsAddItemOpen(true);
            }}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add Item
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-[#e8e5f2] dark:border-slate-800 shadow-soft flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search expiring produce, dairy, grains..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto text-xs">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
          >
            <option value="all">All Locations</option>
            <option value="fridge">Refrigerator</option>
            <option value="freezer">Freezer</option>
            <option value="dry">Dry Pantry</option>
            <option value="counter">Countertop</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
          >
            <option value="all">All Categories</option>
            <option value="produce">Produce</option>
            <option value="dairy">Dairy</option>
            <option value="grains">Grains</option>
            <option value="protein">Protein</option>
            <option value="spices">Spices</option>
          </select>
        </div>
      </div>

      {/* Content based on View Mode */}
      {viewMode === 'list' ? (
        <div className="space-y-6">
          {/* Urgent / Tomorrow */}
          {(expiringToday.length > 0 || expiringTomorrow.length > 0) && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                  Critical: Expiring Within 24-48 Hours ({expiringToday.length + expiringTomorrow.length})
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...expiringToday, ...expiringTomorrow].map(renderItemCard)}
              </div>
            </div>
          )}

          {/* This Week */}
          {expiringThisWeek.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                  Attention: Expiring This Week ({expiringThisWeek.length})
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {expiringThisWeek.map(renderItemCard)}
              </div>
            </div>
          )}

          {/* Later */}
          {freshLater.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                  Safe: Stable Shelf Life ({freshLater.length})
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {freshLater.map(renderItemCard)}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Calendar View */
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft">
          <div className="grid grid-cols-7 gap-3 text-center mb-4">
            {['Oct 2 (Today)', 'Oct 3 (Fri)', 'Oct 4 (Sat)', 'Oct 5 (Sun)', 'Oct 6 (Mon)', 'Oct 7 (Tue)', 'Next Week+'].map((day, idx) => (
              <div key={idx} className="font-bold text-xs text-slate-500 dark:text-slate-400 py-1 border-b border-slate-100 dark:border-slate-800">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-7 gap-3 min-h-[300px]">
            {/* Day columns */}
            <div className="p-2 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40 space-y-2">
              <span className="text-[10px] font-bold text-rose-700">0 items expiring</span>
            </div>
            <div className="p-2 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-2">
              <div className="p-2 rounded-lg bg-white dark:bg-slate-800 shadow-xs border border-amber-200 text-left text-xs">
                <div className="font-bold text-slate-800 dark:text-slate-100">Amul Taaza Milk</div>
                <div className="text-[10px] text-amber-600 font-semibold">1L Tetra • Divert</div>
              </div>
              <div className="p-2 rounded-lg bg-white dark:bg-slate-800 shadow-xs border border-amber-200 text-left text-xs">
                <div className="font-bold text-slate-800 dark:text-slate-100">Coriander Bunch</div>
                <div className="text-[10px] text-amber-600 font-semibold">Make Chutney</div>
              </div>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="p-2 rounded-lg bg-white dark:bg-slate-800 shadow-xs border border-slate-200 text-left text-xs">
                <div className="font-bold text-slate-800 dark:text-slate-100">Country Tomatoes</div>
                <div className="text-[10px] text-emerald-600 font-semibold">4 units • Tomato Rice</div>
              </div>
              <div className="p-2 rounded-lg bg-white dark:bg-slate-800 shadow-xs border border-slate-200 text-left text-xs">
                <div className="font-bold text-slate-800 dark:text-slate-100">Malai Paneer</div>
                <div className="text-[10px] text-emerald-600 font-semibold">200g • Bhurji</div>
              </div>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="p-2 rounded-lg bg-white dark:bg-slate-800 shadow-xs border border-slate-200 text-left text-xs">
                <div className="font-bold text-slate-800 dark:text-slate-100">Greek Yogurt</div>
                <div className="text-[10px] text-purple-600 font-semibold">2 cups • Herb Dip</div>
              </div>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="p-2 rounded-lg bg-white dark:bg-slate-800 shadow-xs border border-slate-200 text-left text-xs">
                <div className="font-bold text-slate-800 dark:text-slate-100">Capsicum</div>
                <div className="text-[10px] text-slate-500">2 pcs</div>
              </div>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="p-2 rounded-lg bg-white dark:bg-slate-800 shadow-xs border border-slate-200 text-left text-xs">
                <div className="font-bold text-slate-800 dark:text-slate-100">Farm Eggs</div>
                <div className="text-[10px] text-slate-500">6 eggs</div>
              </div>
            </div>
            <div className="p-2 rounded-xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/50 space-y-2">
              <span className="text-[10px] font-bold text-emerald-700">8 Long-life Pantry Staples</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
