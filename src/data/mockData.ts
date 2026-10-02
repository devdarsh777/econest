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

export const initialHousehold: HouseholdData = {
  name: "Bangalore Home",
  city: "Bangalore, Karnataka",
  adminName: "Alex",
  adminRole: "Household Admin",
  carbonSavedKg: 14.2,
  leakageAvoidedRupees: 1420,
  pantryHealthIndex: 94,
  monthlyBudget: 25000,
  totalMonthlySpend: 8420
};

export const initialPantryItems: PantryItem[] = [
  {
    id: "p1",
    name: "Amul Taaza Homogenised Milk (1L)",
    category: "dairy",
    quantity: 1,
    unit: "Tetra Pack",
    storageLocation: "fridge",
    purchaseDate: "2026-09-30",
    expiryDate: "2026-10-03",
    daysRemaining: 1,
    status: "expiring",
    cost: 72,
    notes: "Top shelf of refrigerator"
  },
  {
    id: "p2",
    name: "Fresh Country Tomatoes",
    category: "produce",
    quantity: 4,
    unit: "units (~450g)",
    storageLocation: "fridge",
    purchaseDate: "2026-09-28",
    expiryDate: "2026-10-04",
    daysRemaining: 2,
    status: "use-soon",
    cost: 60,
    notes: "Vegetable crisper drawer"
  },
  {
    id: "p3",
    name: "Daawat Basmati Rice",
    category: "grains",
    quantity: 3.5,
    unit: "kg",
    storageLocation: "dry",
    purchaseDate: "2026-09-15",
    expiryDate: "2027-03-15",
    daysRemaining: 165,
    status: "fresh",
    cost: 420,
    notes: "Airtight pantry container #2"
  },
  {
    id: "p4",
    name: "Fresh Malai Paneer",
    category: "dairy",
    quantity: 200,
    unit: "g",
    storageLocation: "fridge",
    purchaseDate: "2026-09-29",
    expiryDate: "2026-10-04",
    daysRemaining: 2,
    status: "use-soon",
    cost: 110,
    notes: "Dairy shelf"
  },
  {
    id: "p5",
    name: "Farm Fresh Brown Eggs",
    category: "protein",
    quantity: 6,
    unit: "eggs",
    storageLocation: "fridge",
    purchaseDate: "2026-09-26",
    expiryDate: "2026-10-07",
    daysRemaining: 5,
    status: "fresh",
    cost: 75,
    notes: "Door egg tray"
  },
  {
    id: "p6",
    name: "Epigamia Greek Yogurt (Blueberry)",
    category: "dairy",
    quantity: 2,
    unit: "cups (100g each)",
    storageLocation: "fridge",
    purchaseDate: "2026-09-27",
    expiryDate: "2026-10-05",
    daysRemaining: 3,
    status: "use-soon",
    cost: 130
  },
  {
    id: "p7",
    name: "Barilla Penne Rigate Pasta",
    category: "grains",
    quantity: 500,
    unit: "g",
    storageLocation: "dry",
    purchaseDate: "2026-09-10",
    expiryDate: "2027-01-10",
    daysRemaining: 100,
    status: "fresh",
    cost: 210
  },
  {
    id: "p8",
    name: "Barilla Basilico Pasta Marinara Sauce",
    category: "packaged",
    quantity: 1,
    unit: "jar (400g)",
    storageLocation: "dry",
    purchaseDate: "2026-09-10",
    expiryDate: "2026-12-10",
    daysRemaining: 70,
    status: "fresh",
    cost: 295
  },
  {
    id: "p9",
    name: "Organic Black Mustard Seeds (Rai)",
    category: "spices",
    quantity: 150,
    unit: "g",
    storageLocation: "dry",
    purchaseDate: "2026-08-15",
    expiryDate: "2027-08-15",
    daysRemaining: 315,
    status: "fresh",
    cost: 45
  },
  {
    id: "p10",
    name: "Aashirvaad Shudh Chakki Atta",
    category: "grains",
    quantity: 0.8,
    unit: "kg",
    storageLocation: "dry",
    purchaseDate: "2026-09-05",
    expiryDate: "2026-11-05",
    daysRemaining: 34,
    status: "use-soon",
    cost: 280,
    notes: "Refill needed soon! (Low stock)"
  },
  {
    id: "p11",
    name: "Tata Salt Lite",
    category: "spices",
    quantity: 0.3,
    unit: "kg",
    storageLocation: "dry",
    purchaseDate: "2026-08-20",
    expiryDate: "2027-08-20",
    daysRemaining: 320,
    status: "fresh",
    cost: 50,
    notes: "Low stock alert"
  },
  {
    id: "p12",
    name: "Saffola Gold Cooking Oil",
    category: "packaged",
    quantity: 2,
    unit: "litres",
    storageLocation: "dry",
    purchaseDate: "2026-09-18",
    expiryDate: "2027-03-18",
    daysRemaining: 167,
    status: "fresh",
    cost: 380
  },
  {
    id: "p13",
    name: "Shimla Green Capsicum",
    category: "produce",
    quantity: 2,
    unit: "pieces (~200g)",
    storageLocation: "fridge",
    purchaseDate: "2026-09-29",
    expiryDate: "2026-10-06",
    daysRemaining: 4,
    status: "fresh",
    cost: 40
  },
  {
    id: "p14",
    name: "Fresh Coriander & Mint bunch",
    category: "produce",
    quantity: 1,
    unit: "bunch",
    storageLocation: "fridge",
    purchaseDate: "2026-09-29",
    expiryDate: "2026-10-03",
    daysRemaining: 1,
    status: "expiring",
    cost: 20
  }
];

export const initialAIRecommendations: AIRecommendation[] = [
  {
    id: "rec-1",
    type: "expiry",
    title: "Milk (1L Amul Taaza)",
    status: "Expires Tomorrow",
    statusType: "warning",
    description: "Stored correctly; divert to evening Masala Chai or quick Paneer recipe before 9 PM.",
    actionLabel: "15-min Paneer Recipe",
    actionType: "recipe",
    actionPayload: { recipeId: "r-paneer" },
    resolved: false,
    whyExplanation: "Tetra pack was opened 2 days ago and hits pasteurization shelf-limit in 18 hours. Immediate recipe diversion eliminates ₹72 food waste.",
    timestamp: "10 mins ago"
  },
  {
    id: "rec-2",
    type: "budget",
    title: "Weekend Spend Detected",
    status: "+18% Anomaly",
    statusType: "anomaly",
    description: "Grocery expense spiked by ₹1,420 from instant delivery apps.",
    actionLabel: "Set ₹400 Cap for Rest of Week",
    actionType: "budget_cap",
    actionPayload: { capAmount: 400 },
    resolved: false,
    whyExplanation: "3 quick-commerce 10-minute orders on Zepto & Blinkit added ₹180 in convenience surge fees. Capping daily discretionary spends recovers budget equilibrium.",
    timestamp: "45 mins ago"
  },
  {
    id: "rec-3",
    type: "duplicate",
    title: "4 Tomatoes in Crisper",
    status: "Duplicate Alert",
    statusType: "duplicate",
    description: "Blinkit cart currently holds 500g Hybrid Tomatoes. Prevent duplicate purchase.",
    actionLabel: "Remove from Cart (Save ₹60)",
    actionType: "remove_duplicate",
    actionPayload: { itemName: "Hybrid Tomatoes", savings: 60 },
    resolved: false,
    whyExplanation: "Pantry vision confirmed 4 fresh country tomatoes currently chilling in vegetable crisper with 2 days shelf life. Re-ordering creates automatic spoilage risk.",
    timestamp: "1 hour ago"
  }
];

export const initialSynergies = [
  {
    id: "syn-1",
    title: "Tomato & Egg Rice Synergy",
    tag: "Pantry Match: 95%",
    description: "Cook today using your ripening tomatoes and brown eggs before they hit critical shelf limit.",
    actionLabel: "Start Cooking",
    savings: 85,
    recipeId: "r-tomato-egg-rice",
    time: "15 min"
  },
  {
    id: "syn-2",
    title: "Skip Tomatoes on Delivery List",
    tag: "Duplicate Prevention",
    description: "4 firm tomatoes are waiting in your vegetable crisper.",
    savingsDisplay: "Immediate savings: ₹60",
    actionLabel: "Remove & Save ₹60",
    savings: 60,
    cartItemId: "cart-tomatoes"
  },
  {
    id: "syn-3",
    title: "Save ₹420 this week",
    tag: "Delivery Substitution",
    description: "Swap 2 Swiggy food delivery orders with quick 15-min pantry dinners utilizing ready pasta & marinara.",
    actionLabel: "View Breakdown",
    savings: 420,
    breakdown: "2 Swiggy orders (avg ₹540) vs Home cooked Pasta + Veggies (avg ₹120) saves ₹420 net with zero waste."
  }
];

export const initialExpenses: Expense[] = [
  {
    id: "e-1",
    title: "BESCOM Electricity Bill",
    category: "Utilities",
    amount: 1240,
    date: "2026-10-05",
    paymentMethod: "UPI Auto-pay",
    vendor: "BESCOM",
    status: "Scheduled"
  },
  {
    id: "e-2",
    title: "Blinkit Instant Groceries (Emergency veggies & snacks)",
    category: "Groceries",
    amount: 1420,
    date: "2026-09-29",
    paymentMethod: "HDFC Credit Card",
    vendor: "Blinkit",
    status: "Completed",
    anomaly: true,
    anomalyReason: "+18% over typical weekend grocery run. Included surge pricing."
  },
  {
    id: "e-3",
    title: "BigBasket Monthly Pantry Staples",
    category: "Groceries",
    amount: 3450,
    date: "2026-09-18",
    paymentMethod: "UPI",
    vendor: "BigBasket",
    status: "Completed"
  },
  {
    id: "e-4",
    title: "Swiggy Dinner Delivery (Paneer Butter Masala & Naan)",
    category: "Food Delivery",
    amount: 680,
    date: "2026-09-26",
    paymentMethod: "Apple Pay / UPI",
    vendor: "Swiggy",
    status: "Completed"
  },
  {
    id: "e-5",
    title: "Zepto Quick Dairy & Bread replenishment",
    category: "Groceries",
    amount: 380,
    date: "2026-09-28",
    paymentMethod: "GPay",
    vendor: "Zepto",
    status: "Completed"
  },
  {
    id: "e-6",
    title: "Airtel Xstream Fiber Broadband",
    category: "Utilities",
    amount: 1250,
    date: "2026-09-20",
    paymentMethod: "Credit Card",
    vendor: "Other",
    status: "Completed"
  }
];

export const initialShoppingItems: ShoppingItem[] = [
  {
    id: "s-1",
    name: "Hybrid Salad Tomatoes (500g)",
    category: "produce",
    quantity: 1,
    unit: "pack",
    estimatedPrice: 60,
    addedReason: "ai-suggestion",
    duplicateWarning: "Duplicate Alert: 4 country tomatoes already in crisper",
    storeSuggestion: "Blinkit",
    checked: false
  },
  {
    id: "s-2",
    name: "Aashirvaad Chakki Atta (5kg)",
    category: "grains",
    quantity: 1,
    unit: "bag",
    estimatedPrice: 285,
    addedReason: "low-stock",
    storeSuggestion: "BigBasket",
    checked: false
  },
  {
    id: "s-3",
    name: "Tata Salt Lite (1kg)",
    category: "spices",
    quantity: 1,
    unit: "pack",
    estimatedPrice: 48,
    addedReason: "low-stock",
    storeSuggestion: "BigBasket",
    checked: false
  },
  {
    id: "s-4",
    name: "Amul Butter Salted (500g)",
    category: "dairy",
    quantity: 1,
    unit: "block",
    estimatedPrice: 275,
    addedReason: "custom",
    storeSuggestion: "Zepto",
    checked: true
  },
  {
    id: "s-5",
    name: "Organic Ginger & Green Chillies",
    category: "produce",
    quantity: 200,
    unit: "g",
    estimatedPrice: 40,
    addedReason: "recipe",
    storeSuggestion: "Blinkit",
    checked: false
  }
];

export const initialRecipes: Recipe[] = [
  {
    id: "r-tomato-egg-rice",
    title: "15-Min Tomato & Mustard Egg Rice",
    timeMinutes: 15,
    servings: 2,
    difficulty: "Quick",
    description: "A fragrant, comforting one-pan spiced rice utilizing your ripe country tomatoes, farm brown eggs, and pantry basmati rice before expiry.",
    moneySaved: 85,
    wastePreventedKg: 0.45,
    tags: ["High Protein", "Anti-Waste", "15 Mins", "Pantry Hero"],
    ingredientsUsed: [
      { name: "Fresh Country Tomatoes", quantity: "3 medium, chopped", inPantry: true, expiringSoon: true },
      { name: "Farm Fresh Brown Eggs", quantity: "3 eggs, lightly beaten", inPantry: true, expiringSoon: false },
      { name: "Daawat Basmati Rice", quantity: "1.5 cups (cooked/leftover)", inPantry: true },
      { name: "Organic Black Mustard Seeds", quantity: "1 tsp", inPantry: true },
      { name: "Cooking Oil & Salt", quantity: "1 tbsp", inPantry: true }
    ],
    missingIngredients: [],
    instructions: [
      "Heat 1 tbsp cooking oil in a wok. Add 1 tsp mustard seeds and let them splutter with green chillies if available.",
      "Add the chopped ripe tomatoes with a pinch of salt and turmeric. Cook on high for 3-4 minutes until saucy and caramelized.",
      "Push tomatoes to one side of the wok, pour beaten eggs into the empty side, and softly scramble until 80% set.",
      "Fold the cooked Basmati rice into the mixture on high heat for 2 minutes until glossy and steam rises.",
      "Garnish with fresh coriander from the fridge and serve piping hot!"
    ],
    nutrition: {
      calories: 420,
      protein: "16g",
      carbs: "54g",
      fat: "14g"
    }
  },
  {
    id: "r-paneer",
    title: "Instant 15-Min Kadai Paneer Bhurji",
    timeMinutes: 15,
    servings: 2,
    difficulty: "Easy",
    description: "Rescue expiring fresh milk or malai paneer with sauteed tomatoes and crisp capsicum for an aromatic curry dinner.",
    moneySaved: 110,
    wastePreventedKg: 0.35,
    tags: ["Vegetarian", "Zero-Waste", "Keto-friendly"],
    ingredientsUsed: [
      { name: "Fresh Malai Paneer (or curdled Amul Milk)", quantity: "200g crumbled", inPantry: true, expiringSoon: true },
      { name: "Fresh Country Tomatoes", quantity: "1 large, diced", inPantry: true, expiringSoon: true },
      { name: "Shimla Green Capsicum", quantity: "1 small, diced", inPantry: true },
      { name: "Mustard Seeds & Spices", quantity: "1/2 tsp each", inPantry: true }
    ],
    missingIngredients: [],
    instructions: [
      "Heat oil in a pan, toss in cumin or mustard seeds until crackling.",
      "Add diced tomatoes and capsicum, saute for 3 minutes until softened.",
      "Crumble fresh paneer straight into the pan, season with salt, chilli powder, and garam masala.",
      "Toss for 3-4 minutes on medium heat. Finish with a squeeze of lemon and serve with hot roti or bread."
    ],
    nutrition: {
      calories: 380,
      protein: "19g",
      carbs: "12g",
      fat: "28g"
    }
  },
  {
    id: "r-pasta",
    title: "Quick Garlic Herb Penne Marinara",
    timeMinutes: 18,
    servings: 2,
    difficulty: "Easy",
    description: "Ditch expensive Italian food delivery with ready Barilla Penne, Basilico Marinara, and ripe blistered tomatoes.",
    moneySaved: 420,
    wastePreventedKg: 0.25,
    tags: ["Italian", "Swiggy-Swap", "Comfort Food"],
    ingredientsUsed: [
      { name: "Barilla Penne Rigate Pasta", quantity: "200g", inPantry: true },
      { name: "Barilla Basilico Marinara Sauce", quantity: "4 tbsp", inPantry: true },
      { name: "Fresh Country Tomatoes", quantity: "1 diced", inPantry: true, expiringSoon: true },
      { name: "Cooking Oil & Salt", quantity: "To taste", inPantry: true }
    ],
    missingIngredients: [],
    instructions: [
      "Boil salted water in a pot and cook penne for 9 minutes until al dente.",
      "In a separate skillet, blister diced tomatoes in 1 tbsp hot oil for 2 minutes.",
      "Stir in Barilla Basilico sauce and 3 tablespoons of starchy pasta cooking water.",
      "Drain pasta, toss directly into simmering sauce for 1 minute, and serve!"
    ],
    nutrition: {
      calories: 460,
      protein: "14g",
      carbs: "78g",
      fat: "8g"
    }
  },
  {
    id: "r-yogurt-dip",
    title: "Protein Greek Yogurt Mint & Herb Dip",
    timeMinutes: 8,
    servings: 2,
    difficulty: "Quick",
    description: "Cleverly utilize nearing-date Greek yogurt and fresh mint bunch for a refreshing probiotic snack.",
    moneySaved: 70,
    wastePreventedKg: 0.20,
    tags: ["High Protein", "Snack", "No Cook"],
    ingredientsUsed: [
      { name: "Epigamia Greek Yogurt", quantity: "1 cup (100g)", inPantry: true, expiringSoon: true },
      { name: "Fresh Coriander & Mint bunch", quantity: "Handful, finely chopped", inPantry: true, expiringSoon: true },
      { name: "Tata Salt Lite", quantity: "Pinch", inPantry: true }
    ],
    missingIngredients: [],
    instructions: [
      "Whisk Greek yogurt in a small ceramic bowl until creamy.",
      "Fold in finely minced mint, coriander, pinch of salt and roasted cumin.",
      "Serve as a cooling dip with sliced veggies or warm paratha."
    ],
    nutrition: {
      calories: 120,
      protein: "9g",
      carbs: "6g",
      fat: "4g"
    }
  }
];

export const initialActivities: HouseholdActivity[] = [
  {
    id: "act-1",
    title: "Tomatoes added to recipe",
    description: "Auto-resolve expiry alert for 2 tomatoes. Shifted status from Expiring to Consumed. Saved ₹45 from waste disposal.",
    timestamp: "12 mins ago",
    module: "Recipe",
    type: "success",
    savings: 45
  },
  {
    id: "act-2",
    title: "BigBasket Receipt Parsed",
    description: "11 items automatically sorted into Smart Pantry with batch expiry dates logged.",
    timestamp: "2 hours ago",
    module: "Receipt",
    type: "info"
  },
  {
    id: "act-3",
    title: "Wet Waste Compost Logged",
    description: "Kitchen scraps transferred to smart balcony composter. +15 Eco Points credited.",
    timestamp: "Yesterday, 8:40 PM",
    module: "Compost",
    type: "success",
    savings: 20
  },
  {
    id: "act-4",
    title: "Duplicate Prevented on Blinkit",
    description: "Econest prevented re-buying 500g Tomatoes while 4 were still fresh in crisper.",
    timestamp: "Yesterday, 3:15 PM",
    module: "Cart",
    type: "success",
    savings: 60
  },
  {
    id: "act-5",
    title: "BESCOM Bill Scheduled",
    description: "₹1,240 auto-debit scheduled for Oct 5. Budget projection updated.",
    timestamp: "Sep 30, 11:00 AM",
    module: "Expense",
    type: "info"
  }
];

export const initialWasteRecords: WasteRecord[] = [
  {
    id: "w-1",
    itemName: "Overripe Bananas (2 units)",
    category: "produce",
    quantity: 2,
    unit: "pieces",
    reason: "spoiled",
    destination: "compost",
    moneyLost: 16,
    date: "2026-09-28",
    co2SavedKg: 0.35
  },
  {
    id: "w-2",
    itemName: "Cauliflower Stems & Carrot Peels",
    category: "produce",
    quantity: 350,
    unit: "g",
    reason: "kitchen-scraps",
    destination: "compost",
    moneyLost: 0,
    date: "2026-09-29",
    co2SavedKg: 0.62
  },
  {
    id: "w-3",
    itemName: "Sour Curd / Dahi scrap",
    category: "dairy",
    quantity: 100,
    unit: "g",
    reason: "expired",
    destination: "compost",
    moneyLost: 15,
    date: "2026-09-25",
    co2SavedKg: 0.28
  },
  {
    id: "w-4",
    itemName: "Leftover Khichdi",
    category: "grains",
    quantity: 200,
    unit: "g",
    reason: "leftovers",
    destination: "feed-animals",
    moneyLost: 25,
    date: "2026-09-24",
    co2SavedKg: 0.45
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    type: "expiry",
    title: "Milk expires in ~18 hours",
    message: "Amul Taaza (1L) will expire tomorrow. 2 recipes available.",
    time: "20m ago",
    read: false,
    actionLabel: "View Recipes",
    actionRoute: "recipes"
  },
  {
    id: "notif-2",
    type: "spending",
    title: "Weekend Spend Anomaly (+18%)",
    message: "Instant grocery delivery spend exceeded weekly average by ₹1,420.",
    time: "1h ago",
    read: false,
    actionLabel: "View Expenses",
    actionRoute: "expenses"
  },
  {
    id: "notif-3",
    type: "shopping",
    title: "Duplicate cart item intercepted",
    message: "Blinkit cart holds Hybrid Tomatoes. You already have 4 tomatoes in crisper.",
    time: "3h ago",
    read: false,
    actionLabel: "Check Shopping List",
    actionRoute: "shopping"
  },
  {
    id: "notif-4",
    type: "pantry",
    title: "Low stock alert: Atta & Salt",
    message: "Chakki Atta is down to 800g. Added to Smart Shopping list.",
    time: "Yesterday",
    read: true,
    actionLabel: "Check Pantry",
    actionRoute: "pantry"
  },
  {
    id: "notif-5",
    type: "waste",
    title: "Balcony Compost Goal Reached! 🌿",
    message: "You composted 2.4 kg kitchen organic waste this month. Zero methane generated.",
    time: "2 days ago",
    read: true,
    actionLabel: "View Waste Guard",
    actionRoute: "waste"
  }
];
