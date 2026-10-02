import React, { useState } from 'react';
import { useEconest } from '../context/EconestContext';
import {
  Package,
  Plus,
  Search,
  Filter,
  Trash2,
  Edit,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Layers,
  ArrowUpDown,
  UtensilsCrossed
} from 'lucide-react';
import { PantryItem, StorageLocation } from '../types';

export const SmartPantry: React.FC = () => {
  const {
    pantryItems,
    household,
    setIsAddItemOpen,
    setAddItemInitialTab,
    consumePantryItem,
    deletePantryItem,
    updatePantryItem
  } = useEconest();

  const [activeSection, setActiveSection] = useState<'all' | 'fridge' | 'freezer' | 'dry' | 'low-stock'>('all');
  const [search, setSearch] = useState('');
  const [editingItem, setEditingItem] = useState<PantryItem | null>(null);

  // Filter items
  const filteredItems = pantryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    if (activeSection === 'all') return matchesSearch;
    if (activeSection === 'low-stock') return matchesSearch && (item.notes?.includes('Low stock') || item.quantity <= 1);
    return matchesSearch && item.storageLocation === activeSection;
  });

  const handleQuickAdjustQty = (item: PantryItem, delta: number) => {
    const newQty = Math.max(0, item.quantity + delta);
    if (newQty === 0) {
      consumePantryItem(item.id);
    } else {
      updatePantryItem(item.id, { quantity: Number(newQty.toFixed(1)) });
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    updatePantryItem(editingItem.id, {
      name: editingItem.name,
      quantity: editingItem.quantity,
      unit: editingItem.unit,
      storageLocation: editingItem.storageLocation,
      expiryDate: editingItem.expiryDate,
      cost: editingItem.cost
    });
    setEditingItem(null);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-[#e8e5f2] dark:border-slate-800 shadow-soft">
        <div>
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-emerald-600" />
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Smart Pantry
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time household inventory tracking across Refrigerator, Freezer & Dry Storage.
          </p>
        </div>

        {/* AI Health Score + Add Button */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-extrabold flex items-center justify-center text-xs">
              {household.pantryHealthIndex}
            </div>
            <div>
              <div className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase">
                Pantry Health
              </div>
              <div className="text-xs font-semibold text-emerald-900 dark:text-emerald-200">
                Optimal Sufficiency
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setAddItemInitialTab('food');
              setIsAddItemOpen(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" /> Add Item
          </button>
        </div>
      </div>

      {/* Navigation Pills & Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-[#e8e5f2] dark:border-slate-800 shadow-soft flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto text-xs font-semibold">
          {[
            { id: 'all', label: `All Items (${pantryItems.length})` },
            { id: 'fridge', label: `Refrigerator (${pantryItems.filter(p => p.storageLocation === 'fridge').length})` },
            { id: 'freezer', label: `Freezer (${pantryItems.filter(p => p.storageLocation === 'freezer').length})` },
            { id: 'dry', label: `Dry Storage (${pantryItems.filter(p => p.storageLocation === 'dry').length})` },
            { id: 'low-stock', label: `Low Stock (4)` },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`px-3 py-2 rounded-xl whitespace-nowrap transition-all ${
                activeSection === tab.id
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search pantry items..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
          />
        </div>
      </div>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-soft hover:shadow-card transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase tracking-wider capitalize">
                  {item.storageLocation}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  item.daysRemaining <= 2
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {item.daysRemaining <= 0 ? 'Expired' : `${item.daysRemaining}d shelf life`}
                </span>
              </div>

              <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                {item.name}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Category: <span className="capitalize font-medium text-slate-700 dark:text-slate-300">{item.category}</span> • Cost: ₹{item.cost}
              </p>

              {item.notes && (
                <p className="text-[11px] text-purple-600 dark:text-purple-300 mt-1.5 bg-purple-50/60 dark:bg-purple-950/30 px-2 py-1 rounded-lg">
                  💡 {item.notes}
                </p>
              )}
            </div>

            {/* Quantity Controls & Actions */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              {/* Qty Stepper */}
              <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800 text-xs">
                <button
                  onClick={() => handleQuickAdjustQty(item, -0.5)}
                  className="px-2 py-1 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold"
                  title="Decrease quantity"
                >
                  -
                </button>
                <span className="px-2.5 py-1 font-bold text-slate-800 dark:text-slate-100 whitespace-nowrap">
                  {item.quantity} {item.unit}
                </span>
                <button
                  onClick={() => handleQuickAdjustQty(item, 0.5)}
                  className="px-2 py-1 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold"
                  title="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setEditingItem(item)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  title="Edit item"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => consumePantryItem(item.id)}
                  className="px-2 py-1 rounded-lg text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-bold"
                  title="Mark consumed"
                >
                  Consume
                </button>
                <button
                  onClick={() => deletePantryItem(item.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                  title="Remove"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-3">
              Edit Pantry Item
            </h3>
            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Name</label>
                <input
                  type="text"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Quantity</label>
                  <input
                    type="number"
                    step="any"
                    value={editingItem.quantity}
                    onChange={(e) => setEditingItem({ ...editingItem, quantity: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Storage</label>
                  <select
                    value={editingItem.storageLocation}
                    onChange={(e) => setEditingItem({ ...editingItem, storageLocation: e.target.value as StorageLocation })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  >
                    <option value="fridge">Refrigerator</option>
                    <option value="freezer">Freezer</option>
                    <option value="dry">Dry Storage</option>
                    <option value="counter">Counter</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Expiry Date</label>
                <input
                  type="date"
                  value={editingItem.expiryDate}
                  onChange={(e) => setEditingItem({ ...editingItem, expiryDate: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl text-slate-500 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 text-white font-bold rounded-xl shadow"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
