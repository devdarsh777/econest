import React, { useState } from 'react';
import { useEconest } from '../context/EconestContext';
import {
  X,
  Apple,
  Wallet,
  ShoppingCart,
  Clock,
  ScanLine,
  Camera,
  Check,
  Sparkles,
  Barcode
} from 'lucide-react';
import { StorageLocation, ItemCategory } from '../types';

export const AddItemModal: React.FC = () => {
  const {
    isAddItemOpen,
    setIsAddItemOpen,
    addItemInitialTab,
    addPantryItem,
    addExpense,
    addShoppingItem,
    logWasteItem,
    addToast
  } = useEconest();

  const [activeTab, setActiveTab] = useState(addItemInitialTab || 'food');

  // Food / Pantry Form
  const [foodName, setFoodName] = useState('');
  const [category, setCategory] = useState<ItemCategory>('produce');
  const [quantity, setQuantity] = useState('1');
  const [unit, setUnit] = useState('kg');
  const [storageLocation, setStorageLocation] = useState<StorageLocation>('fridge');
  const [expiryDate, setExpiryDate] = useState('2026-10-06');
  const [cost, setCost] = useState('80');
  const [notes, setNotes] = useState('');

  // Expense Form
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseCategory, setExpenseCategory] = useState<'Groceries' | 'Food Delivery' | 'Utilities' | 'Household' | 'Snacks'>('Groceries');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [vendor, setVendor] = useState<'BigBasket' | 'Blinkit' | 'Swiggy' | 'BESCOM' | 'Zepto' | 'Amazon Fresh' | 'Other'>('Blinkit');

  // Shopping Form
  const [shopName, setShopName] = useState('');
  const [shopCategory, setShopCategory] = useState<ItemCategory>('produce');
  const [shopQuantity, setShopQuantity] = useState('1');
  const [shopUnit, setShopUnit] = useState('units');
  const [shopEstPrice, setShopEstPrice] = useState('60');

  // Leftover Form
  const [leftoverDish, setLeftoverDish] = useState('');
  const [servings, setServings] = useState('2');
  const [shelfLifeDays, setShelfLifeDays] = useState('3');

  // Barcode / Scanner simulation
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  if (!isAddItemOpen) return null;

  const handleAddFood = (e: React.FormEvent) => {
    e.preventDefault();
    if (!foodName.trim()) return;

    addPantryItem({
      name: foodName,
      category,
      quantity: parseFloat(quantity) || 1,
      unit,
      storageLocation,
      purchaseDate: '2026-10-02',
      expiryDate,
      cost: parseFloat(cost) || 50,
      notes: notes || undefined
    });

    setIsAddItemOpen(false);
    resetForms();
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expenseTitle.trim() || !expenseAmount) return;

    addExpense({
      title: expenseTitle,
      category: expenseCategory,
      amount: parseFloat(expenseAmount) || 0,
      date: '2026-10-02',
      paymentMethod: 'UPI',
      vendor,
      status: 'Completed'
    });

    setIsAddItemOpen(false);
    resetForms();
  };

  const handleAddShopping = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shopName.trim()) return;

    addShoppingItem({
      name: shopName,
      category: shopCategory,
      quantity: parseFloat(shopQuantity) || 1,
      unit: shopUnit,
      estimatedPrice: parseFloat(shopEstPrice) || 50,
      addedReason: 'custom',
      checked: false
    });

    setIsAddItemOpen(false);
    resetForms();
  };

  const handleAddLeftover = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leftoverDish.trim()) return;

    const days = parseInt(shelfLifeDays) || 3;
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + days);
    const expiryStr = targetDate.toISOString().split('T')[0];

    addPantryItem({
      name: `Leftover: ${leftoverDish}`,
      category: 'packaged',
      quantity: parseFloat(servings) || 1,
      unit: 'servings',
      storageLocation: 'fridge',
      purchaseDate: '2026-10-02',
      expiryDate: expiryStr,
      cost: 150,
      notes: 'Prepared fresh home cooked meal. Air-tight container.'
    });

    setIsAddItemOpen(false);
    resetForms();
  };

  const simulateBarcodeScan = () => {
    setIsScanning(true);
    setScanResult(null);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult("Scanned: Organic Green Zucchini 500g (EAN 890123456789)");
      setFoodName("Organic Green Zucchini");
      setCategory("produce");
      setQuantity("500");
      setUnit("g");
      setCost("65");
      setStorageLocation("fridge");
      setExpiryDate("2026-10-08");
      setActiveTab("food");
      addToast("Barcode Recognized!", "Pre-filled item specs for Organic Green Zucchini.", "success");
    }, 1200);
  };

  const resetForms = () => {
    setFoodName('');
    setExpenseTitle('');
    setExpenseAmount('');
    setShopName('');
    setLeftoverDish('');
    setNotes('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 flex items-center justify-center font-bold">
              +
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Add to Household</h3>
              <p className="text-xs text-slate-400">Pantry inventory, expenses, shopping, or leftovers</p>
            </div>
          </div>
          <button
            onClick={() => setIsAddItemOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Pills */}
        <div className="px-5 pt-3 pb-1 border-b border-slate-100 dark:border-slate-800 flex items-center gap-1 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'food', label: 'Food / Pantry', icon: Apple },
            { id: 'expense', label: 'Expense', icon: Wallet },
            { id: 'shopping', label: 'Shopping', icon: ShoppingCart },
            { id: 'leftover', label: 'Log Leftover', icon: Clock },
            { id: 'barcode', label: 'Scan Barcode', icon: Barcode },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 text-xs sm:text-sm">
          {/* FOOD FORM */}
          {activeTab === 'food' && (
            <form onSubmit={handleAddFood} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Item Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Amul Salted Butter, Spinach bunch, Avocados"
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ItemCategory)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="produce">Produce (Fruits & Veggies)</option>
                    <option value="dairy">Dairy</option>
                    <option value="grains">Grains & Flours</option>
                    <option value="protein">Protein & Eggs</option>
                    <option value="spices">Spices & Seasoning</option>
                    <option value="packaged">Packaged & Sauces</option>
                    <option value="beverages">Beverages</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Storage Location *
                  </label>
                  <select
                    value={storageLocation}
                    onChange={(e) => setStorageLocation(e.target.value as StorageLocation)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="fridge">Refrigerator</option>
                    <option value="freezer">Freezer</option>
                    <option value="dry">Dry Storage / Pantry</option>
                    <option value="counter">Countertop</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Unit
                  </label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="units">units</option>
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="L">Litres</option>
                    <option value="ml">ml</option>
                    <option value="Tetra Pack">Tetra Pack</option>
                    <option value="bunch">bunch</option>
                    <option value="can">can</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Est. Cost (₹)
                  </label>
                  <input
                    type="number"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Expiry Date *
                </label>
                <input
                  type="date"
                  required
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Notes / Shelf location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Crisper box, top dairy shelf"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" /> Save to Smart Pantry
                </button>
              </div>
            </form>
          )}

          {/* EXPENSE FORM */}
          {activeTab === 'expense' && (
            <form onSubmit={handleAddExpense} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Expense Description *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Weekly veggies from Blinkit, Gas cylinder"
                  value={expenseTitle}
                  onChange={(e) => setExpenseTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={expenseCategory}
                    onChange={(e) => setExpenseCategory(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Groceries">Groceries</option>
                    <option value="Food Delivery">Food Delivery</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Household">Household</option>
                    <option value="Snacks">Snacks</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Vendor / Platform
                  </label>
                  <select
                    value={vendor}
                    onChange={(e) => setVendor(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="BigBasket">BigBasket</option>
                    <option value="Blinkit">Blinkit</option>
                    <option value="Zepto">Zepto</option>
                    <option value="Swiggy">Swiggy</option>
                    <option value="BESCOM">BESCOM</option>
                    <option value="Amazon Fresh">Amazon Fresh</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Amount in ₹ *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400">₹</span>
                  <input
                    type="number"
                    required
                    placeholder="0.00"
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                    className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Wallet className="w-4 h-4" /> Record Household Expense
                </button>
              </div>
            </form>
          )}

          {/* SHOPPING FORM */}
          {activeTab === 'shopping' && (
            <form onSubmit={handleAddShopping} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Item to Buy *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Greek yogurt, Olive oil, Almond milk"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Qty
                  </label>
                  <input
                    type="number"
                    value={shopQuantity}
                    onChange={(e) => setShopQuantity(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Unit
                  </label>
                  <input
                    type="text"
                    value={shopUnit}
                    onChange={(e) => setShopUnit(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Est. ₹
                  </label>
                  <input
                    type="number"
                    value={shopEstPrice}
                    onChange={(e) => setShopEstPrice(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-800/40 flex items-center gap-2 text-xs text-purple-700 dark:text-purple-300">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>Econest AI will automatically verify your current pantry to prevent duplicate purchases.</span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" /> Add to Shopping List
                </button>
              </div>
            </form>
          )}

          {/* LEFTOVER FORM */}
          {activeTab === 'leftover' && (
            <form onSubmit={handleAddLeftover} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Cooked Dish Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dal Tadka, Pasta Alfredo, Veg Pulao"
                  value={leftoverDish}
                  onChange={(e) => setLeftoverDish(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Portions / Servings
                  </label>
                  <input
                    type="number"
                    value={servings}
                    onChange={(e) => setServings(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Safe Shelf Life (Days)
                  </label>
                  <select
                    value={shelfLifeDays}
                    onChange={(e) => setShelfLifeDays(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="2">2 Days (Seafood / Dairy)</option>
                    <option value="3">3 Days (Cooked Curries / Rice)</option>
                    <option value="5">5 Days (Dry Roasted / Chutneys)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Clock className="w-4 h-4" /> Track Leftovers in Expiry Guard
                </button>
              </div>
            </form>
          )}

          {/* BARCODE SCANNER */}
          {activeTab === 'barcode' && (
            <div className="space-y-5 text-center py-4">
              <div className="mx-auto w-48 h-48 rounded-2xl border-2 border-dashed border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 flex flex-col items-center justify-center p-4 relative overflow-hidden">
                {isScanning ? (
                  <div className="space-y-3">
                    <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                      Reading barcode data...
                    </p>
                  </div>
                ) : (
                  <>
                    <ScanLine className="w-12 h-12 text-emerald-600 animate-pulse" />
                    <p className="mt-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                      Hold grocery item barcode up to camera
                    </p>
                  </>
                )}
                {/* Visual laser bar */}
                <div className="absolute left-0 right-0 h-0.5 bg-emerald-500 shadow-lg shadow-emerald-500 top-1/2 -translate-y-1/2 animate-bounce" />
              </div>

              <button
                type="button"
                onClick={simulateBarcodeScan}
                disabled={isScanning}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                {isScanning ? 'Scanning...' : 'Simulate Scan (Grocery Item)'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
