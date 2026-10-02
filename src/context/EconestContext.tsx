import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PantryItem,
  Expense,
  ShoppingItem,
  Recipe,
  WasteRecord,
  AIRecommendation,
  HouseholdActivity,
  NotificationItem,
  HouseholdData
} from '../types';
import {
  initialHousehold,
  initialPantryItems,
  initialAIRecommendations,
  initialExpenses,
  initialShoppingItems,
  initialRecipes,
  initialActivities,
  initialWasteRecords,
  initialNotifications,
  initialSynergies
} from '../data/mockData';
import confetti from 'canvas-confetti';

interface Toast {
  id: string;
  title: string;
  message?: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface EconestContextType {
  household: HouseholdData;
  setHousehold: React.Dispatch<React.SetStateAction<HouseholdData>>;
  pantryItems: PantryItem[];
  expenses: Expense[];
  shoppingItems: ShoppingItem[];
  recipes: Recipe[];
  activities: HouseholdActivity[];
  wasteRecords: WasteRecord[];
  notifications: NotificationItem[];
  aiRecommendations: AIRecommendation[];
  synergies: typeof initialSynergies;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  toasts: Toast[];
  addToast: (title: string, message?: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
  // Actions
  addPantryItem: (item: Omit<PantryItem, 'id' | 'daysRemaining' | 'status'>) => void;
  updatePantryItem: (id: string, updates: Partial<PantryItem>) => void;
  consumePantryItem: (id: string, qtyToConsume?: number) => void;
  deletePantryItem: (id: string) => void;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  addShoppingItem: (item: Omit<ShoppingItem, 'id'>) => void;
  toggleShoppingItem: (id: string) => void;
  removeShoppingItem: (id: string) => void;
  convertShoppingToPantry: (id: string) => void;
  resolveAIRecommendation: (id: string) => void;
  executeAllRecommendations: () => void;
  logWasteItem: (record: Omit<WasteRecord, 'id' | 'date'>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  // Modal states
  isAddItemOpen: boolean;
  setIsAddItemOpen: (open: boolean) => void;
  addItemInitialTab: string;
  setAddItemInitialTab: (tab: string) => void;
  activeCookingRecipe: Recipe | null;
  setActiveCookingRecipe: (recipe: Recipe | null) => void;
  isReceiptModalOpen: boolean;
  setIsReceiptModalOpen: (open: boolean) => void;
  isQuickActionOpen: boolean;
  setIsQuickActionOpen: (open: boolean) => void;
  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  // Filter/Sort
  pantryFilter: string;
  setPantryFilter: (filter: string) => void;
  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const EconestContext = createContext<EconestContextType | undefined>(undefined);

export const EconestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [household, setHousehold] = useState<HouseholdData>(initialHousehold);
  const [pantryItems, setPantryItems] = useState<PantryItem[]>(initialPantryItems);
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>(initialShoppingItems);
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [activities, setActivities] = useState<HouseholdActivity[]>(initialActivities);
  const [wasteRecords, setWasteRecords] = useState<WasteRecord[]>(initialWasteRecords);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation[]>(initialAIRecommendations);
  const [synergies, setSynergies] = useState(initialSynergies);

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [pantryFilter, setPantryFilter] = useState<string>('all');
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Modals
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [addItemInitialTab, setAddItemInitialTab] = useState('food');
  const [activeCookingRecipe, setActiveCookingRecipe] = useState<Recipe | null>(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);

  // Theme
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  const addToast = (title: string, message?: string, type: Toast['type'] = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Helper calculate days remaining
  const calculateDaysRemaining = (expiryDateStr: string) => {
    const today = new Date("2026-10-02");
    const expiry = new Date(expiryDateStr);
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getStatusFromDays = (days: number): PantryItem['status'] => {
    if (days < 0) return 'expired';
    if (days <= 1) return 'expiring';
    if (days <= 3) return 'use-soon';
    return 'fresh';
  };

  const addPantryItem = (itemData: Omit<PantryItem, 'id' | 'daysRemaining' | 'status'>) => {
    const days = calculateDaysRemaining(itemData.expiryDate);
    const newItem: PantryItem = {
      ...itemData,
      id: 'p-' + Date.now(),
      daysRemaining: days,
      status: getStatusFromDays(days)
    };

    setPantryItems(prev => [newItem, ...prev]);

    // Add activity
    const newAct: HouseholdActivity = {
      id: 'act-' + Date.now(),
      title: `${newItem.name} Added to Pantry`,
      description: `Stored in ${newItem.storageLocation}. Expiry logged for ${newItem.expiryDate}.`,
      timestamp: 'Just now',
      module: 'Pantry',
      type: 'info'
    };
    setActivities(prev => [newAct, ...prev]);

    addToast(`Added ${newItem.name}`, `Stored in ${newItem.storageLocation}. Tracked under Expiry Guard.`, 'success');
  };

  const updatePantryItem = (id: string, updates: Partial<PantryItem>) => {
    setPantryItems(prev => prev.map(item => {
      if (item.id === id) {
        const updated = { ...item, ...updates };
        if (updates.expiryDate) {
          const days = calculateDaysRemaining(updates.expiryDate);
          updated.daysRemaining = days;
          updated.status = getStatusFromDays(days);
        }
        return updated;
      }
      return item;
    }));
    addToast('Pantry Item Updated', undefined, 'info');
  };

  const consumePantryItem = (id: string, qtyToConsume?: number) => {
    const item = pantryItems.find(p => p.id === id);
    if (!item) return;

    if (qtyToConsume && item.quantity > qtyToConsume) {
      setPantryItems(prev => prev.map(p => p.id === id ? { ...p, quantity: p.quantity - qtyToConsume } : p));
      addToast(`Consumed ${qtyToConsume} ${item.unit} of ${item.name}`, `Saved from waste. Remaining: ${item.quantity - qtyToConsume} ${item.unit}`, 'success');
    } else {
      setPantryItems(prev => prev.filter(p => p.id !== id));
      addToast(`Fully consumed ${item.name}!`, `Saved ₹${item.cost} from potential food waste.`, 'success');
    }

    setHousehold(prev => ({
      ...prev,
      leakageAvoidedRupees: prev.leakageAvoidedRupees + item.cost,
      carbonSavedKg: Number((prev.carbonSavedKg + 0.45).toFixed(1))
    }));

    // Add activity
    setActivities(prev => [{
      id: 'act-' + Date.now(),
      title: `${item.name} Consumed`,
      description: `Used before expiry. Saved ₹${item.cost} and prevented waste disposal.`,
      timestamp: 'Just now',
      module: 'Pantry',
      type: 'success',
      savings: item.cost
    }, ...prev]);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    } catch (e) {}
  };

  const deletePantryItem = (id: string) => {
    const item = pantryItems.find(p => p.id === id);
    setPantryItems(prev => prev.filter(p => p.id !== id));
    addToast(`Removed ${item?.name || 'item'}`, 'Item cleared from pantry records.', 'info');
  };

  const addExpense = (expenseData: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: 'e-' + Date.now()
    };
    setExpenses(prev => [newExpense, ...prev]);
    setHousehold(prev => ({
      ...prev,
      totalMonthlySpend: prev.totalMonthlySpend + newExpense.amount
    }));

    setActivities(prev => [{
      id: 'act-' + Date.now(),
      title: `${newExpense.vendor} Expense Logged`,
      description: `₹${newExpense.amount} for ${newExpense.title} (${newExpense.category}).`,
      timestamp: 'Just now',
      module: 'Expense',
      type: 'info'
    }, ...prev]);

    addToast(`Expense Logged: ₹${newExpense.amount}`, `${newExpense.title} tracked.`, 'success');
  };

  const addShoppingItem = (itemData: Omit<ShoppingItem, 'id'>) => {
    // Check if already in pantry to generate automatic duplicate warning
    const matchingPantry = pantryItems.find(p => p.name.toLowerCase().includes(itemData.name.toLowerCase()) || itemData.name.toLowerCase().includes(p.name.toLowerCase()));
    const warning = matchingPantry ? `Duplicate Warning: ${matchingPantry.quantity} ${matchingPantry.unit} already in ${matchingPantry.storageLocation}` : undefined;

    const newItem: ShoppingItem = {
      ...itemData,
      id: 's-' + Date.now(),
      duplicateWarning: warning
    };

    setShoppingItems(prev => [newItem, ...prev]);
    addToast(`Added to Shopping List`, newItem.name, 'success');
  };

  const toggleShoppingItem = (id: string) => {
    setShoppingItems(prev => prev.map(item => {
      if (item.id === id) {
        const nextState = !item.checked;
        if (nextState) {
          addToast(`Marked ${item.name} as purchased`, `Click "Move to Pantry" to auto-store.`, 'info');
        }
        return { ...item, checked: nextState };
      }
      return item;
    }));
  };

  const removeShoppingItem = (id: string) => {
    const item = shoppingItems.find(s => s.id === id);
    setShoppingItems(prev => prev.filter(s => s.id !== id));
    if (item?.duplicateWarning) {
      setHousehold(prev => ({
        ...prev,
        leakageAvoidedRupees: prev.leakageAvoidedRupees + item.estimatedPrice
      }));
      addToast(`Duplicate Intercepted!`, `Removed ${item.name} and saved ₹${item.estimatedPrice}.`, 'success');
      try {
        confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
      } catch (e) {}
    } else {
      addToast(`Item removed from list`, item?.name, 'info');
    }
  };

  const convertShoppingToPantry = (id: string) => {
    const item = shoppingItems.find(s => s.id === id);
    if (!item) return;

    // Convert into pantry item
    const newPantryItem: PantryItem = {
      id: 'p-' + Date.now(),
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      unit: item.unit,
      storageLocation: item.category === 'produce' || item.category === 'dairy' ? 'fridge' : 'dry',
      purchaseDate: '2026-10-02',
      expiryDate: '2026-10-12',
      daysRemaining: 10,
      status: 'fresh',
      cost: item.estimatedPrice
    };

    setPantryItems(prev => [newPantryItem, ...prev]);
    setShoppingItems(prev => prev.filter(s => s.id !== id));

    addToast(`Restocked ${item.name} to Pantry!`, `Stored under ${newPantryItem.storageLocation}. Expiry set to 10 days.`, 'success');
  };

  const resolveAIRecommendation = (id: string) => {
    const rec = aiRecommendations.find(r => r.id === id);
    if (!rec) return;

    setAiRecommendations(prev => prev.map(r => r.id === id ? { ...r, resolved: true } : r));

    if (rec.actionType === 'recipe') {
      const matched = recipes.find(r => r.id === rec.actionPayload?.recipeId) || recipes[0];
      setActiveCookingRecipe(matched);
      addToast('Opening Recipe', matched.title, 'info');
    } else if (rec.actionType === 'remove_duplicate') {
      // Remove duplicate tomatoes from shopping list
      setShoppingItems(prev => prev.filter(s => !s.name.toLowerCase().includes('tomato')));
      setHousehold(prev => ({
        ...prev,
        leakageAvoidedRupees: prev.leakageAvoidedRupees + 60
      }));
      addToast('Resolved Duplicate Cart Alert', 'Removed 500g Tomatoes from cart. Saved ₹60!', 'success');
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
      } catch (e) {}
    } else if (rec.actionType === 'budget_cap') {
      addToast('Daily Cap Activated', 'Discretionary spending capped at ₹400 for the remainder of this week.', 'success');
    } else {
      addToast('Recommendation Applied', rec.title, 'success');
    }
  };

  const executeAllRecommendations = () => {
    setAiRecommendations(prev => prev.map(r => ({ ...r, resolved: true })));
    setShoppingItems(prev => prev.filter(s => !s.duplicateWarning));
    setHousehold(prev => ({
      ...prev,
      leakageAvoidedRupees: prev.leakageAvoidedRupees + 140
    }));

    setActivities(prev => [{
      id: 'act-' + Date.now(),
      title: 'AI Econest Sync: 3 Actions Auto-Resolved',
      description: 'Cart duplicates eliminated, quick cap enacted, and expiring milk diverted to recipe plan.',
      timestamp: 'Just now',
      module: 'Receipt',
      type: 'success',
      savings: 140
    }, ...prev]);

    addToast('All 3 AI Recommendations Executed!', 'Pantry status optimized. ₹140 instant leak avoided.', 'success');
    try {
      confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
    } catch (e) {}
  };

  const logWasteItem = (recordData: Omit<WasteRecord, 'id' | 'date'>) => {
    const newRecord: WasteRecord = {
      ...recordData,
      id: 'w-' + Date.now(),
      date: '2026-10-02'
    };

    setWasteRecords(prev => [newRecord, ...prev]);

    if (newRecord.destination === 'compost') {
      setHousehold(prev => ({
        ...prev,
        carbonSavedKg: Number((prev.carbonSavedKg + newRecord.co2SavedKg).toFixed(1))
      }));
      addToast('Compost Logged! 🌿', `+15 Eco Points credited. ${newRecord.co2SavedKg}kg CO₂e avoided.`, 'success');
    } else {
      addToast('Waste Incident Tracked', `Logged to Waste Guard to prevent recurring loss.`, 'warning');
    }

    setActivities(prev => [{
      id: 'act-' + Date.now(),
      title: `${newRecord.itemName} ${newRecord.destination === 'compost' ? 'Composted' : 'Logged'}`,
      description: `${newRecord.quantity} ${newRecord.unit} sent to ${newRecord.destination}.`,
      timestamp: 'Just now',
      module: 'Compost',
      type: newRecord.destination === 'compost' ? 'success' : 'warning'
    }, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    addToast('All notifications marked as read', undefined, 'info');
  };

  return (
    <EconestContext.Provider
      value={{
        household,
        setHousehold,
        pantryItems,
        expenses,
        shoppingItems,
        recipes,
        activities,
        wasteRecords,
        notifications,
        aiRecommendations,
        synergies,
        activeTab,
        setActiveTab,
        toasts,
        addToast,
        removeToast,
        addPantryItem,
        updatePantryItem,
        consumePantryItem,
        deletePantryItem,
        addExpense,
        addShoppingItem,
        toggleShoppingItem,
        removeShoppingItem,
        convertShoppingToPantry,
        resolveAIRecommendation,
        executeAllRecommendations,
        logWasteItem,
        markNotificationRead,
        markAllNotificationsRead,
        isAddItemOpen,
        setIsAddItemOpen,
        addItemInitialTab,
        setAddItemInitialTab,
        activeCookingRecipe,
        setActiveCookingRecipe,
        isReceiptModalOpen,
        setIsReceiptModalOpen,
        isQuickActionOpen,
        setIsQuickActionOpen,
        searchQuery,
        setSearchQuery,
        pantryFilter,
        setPantryFilter,
        isDarkMode,
        toggleDarkMode
      }}
    >
      {children}
    </EconestContext.Provider>
  );
};

export const useEconest = () => {
  const context = useContext(EconestContext);
  if (!context) {
    throw new Error('useEconest must be used within an EconestProvider');
  }
  return context;
};
