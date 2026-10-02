export type StorageLocation = 'fridge' | 'freezer' | 'dry' | 'counter';
export type ItemCategory = 'produce' | 'dairy' | 'grains' | 'spices' | 'bakery' | 'beverages' | 'packaged' | 'protein' | 'household';

export interface PantryItem {
  id: string;
  name: string;
  category: ItemCategory;
  quantity: number;
  unit: string;
  storageLocation: StorageLocation;
  purchaseDate: string;
  expiryDate: string;
  daysRemaining: number;
  status: 'fresh' | 'use-soon' | 'expiring' | 'expired';
  cost: number;
  notes?: string;
  image?: string;
}

export interface Expense {
  id: string;
  title: string;
  category: 'Groceries' | 'Food Delivery' | 'Utilities' | 'Household' | 'Snacks';
  amount: number;
  date: string;
  paymentMethod: string;
  vendor: 'BigBasket' | 'Blinkit' | 'Swiggy' | 'BESCOM' | 'Zepto' | 'Amazon Fresh' | 'Other';
  status: 'Completed' | 'Scheduled' | 'Pending';
  anomaly?: boolean;
  anomalyReason?: string;
}

export interface ShoppingItem {
  id: string;
  name: string;
  category: ItemCategory;
  quantity: number;
  unit: string;
  estimatedPrice: number;
  addedReason: 'low-stock' | 'recipe' | 'custom' | 'ai-suggestion';
  duplicateWarning?: string;
  storeSuggestion?: 'Blinkit' | 'BigBasket' | 'Zepto' | 'Instamart';
  checked: boolean;
}

export interface RecipeIngredient {
  name: string;
  quantity: string;
  inPantry: boolean;
  expiringSoon?: boolean;
}

export interface Recipe {
  id: string;
  title: string;
  timeMinutes: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Quick';
  ingredientsUsed: RecipeIngredient[];
  missingIngredients: string[];
  instructions: string[];
  nutrition: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
  moneySaved: number;
  wastePreventedKg: number;
  image?: string;
  description: string;
  tags: string[];
}

export interface WasteRecord {
  id: string;
  itemName: string;
  category: ItemCategory;
  quantity: number;
  unit: string;
  reason: 'expired' | 'spoiled' | 'leftovers' | 'kitchen-scraps';
  destination: 'compost' | 'landfill' | 'feed-animals';
  moneyLost: number;
  date: string;
  co2SavedKg: number;
}

export interface AIRecommendation {
  id: string;
  type: 'expiry' | 'budget' | 'duplicate' | 'synergy' | 'pantry';
  title: string;
  status: string;
  statusType: 'warning' | 'anomaly' | 'duplicate' | 'success' | 'info';
  description: string;
  actionLabel: string;
  actionType: 'recipe' | 'budget_cap' | 'remove_duplicate' | 'pantry_restock' | 'view_breakdown' | 'custom';
  actionPayload?: any;
  resolved: boolean;
  whyExplanation: string;
  timestamp: string;
}

export interface HouseholdActivity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  module: 'Pantry' | 'Receipt' | 'Compost' | 'Expense' | 'Recipe' | 'Cart';
  type: 'success' | 'warning' | 'info';
  savings?: number;
}

export interface NotificationItem {
  id: string;
  type: 'expiry' | 'spending' | 'pantry' | 'shopping' | 'ai' | 'waste' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionLabel?: string;
  actionRoute?: string;
}

export interface HouseholdData {
  name: string;
  city: string;
  adminName: string;
  adminRole: string;
  carbonSavedKg: number;
  leakageAvoidedRupees: number;
  pantryHealthIndex: number;
  monthlyBudget: number;
  totalMonthlySpend: number;
}
