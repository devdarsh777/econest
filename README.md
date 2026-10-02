# Econest — Smarter Homes. Happier Lives. 🏡✨

> **AI-Powered Personal Household Management Platform**  
> Built with React 18, TypeScript, Tailwind CSS, Lucide Icons, and Recharts.

Econest is an AI-powered personal household management platform that unifies pantry inventory tracking, proactive food waste prevention, expense leak interception, recipe generation from existing ingredients, and grocery cart synergy.

---

## 🌟 Key Features

- **AI Econest Briefing (Live Sync)**: Proactively surfaces high-priority household recommendations (e.g. divert expiring Amul Milk into a 15-min Paneer recipe, intercept duplicate tomato purchases in grocery carts, enforce discretionary budget caps).
- **Expiry Guard**: Shelf-life surveillance with List & Calendar views, filterable by storage location (Refrigerator, Freezer, Dry Storage, Countertop), and instant AI diversion actions (Use in Recipe, Freeze, Move to Fridge, Mark Consumed).
- **Smart Pantry**: Complete inventory management with real-time stock levels, live quantity steppers, and an autonomous AI Pantry Health Index score (**94/100**).
- **Expense Manager**: Track grocery, food delivery, and recurring utility bills in Indian Rupees (**₹**). Features weekly spend trajectory charts, category distribution pies, and spend anomaly detection.
- **Waste Guard**: Track food waste, balcony composting, and environmental impact (**14.2 kg CO₂e avoided**). Highlights historically vulnerable ingredients to prevent recurring loss.
- **Smart Shopping**: Pantry-aware cart that intercepts duplicate purchases to avoid food waste and save money. Supports simulated Blinkit quick-commerce sync and one-click move-to-pantry.
- **AI Recipe Engine & Interactive Cooking Mode**: Synthesizes zero-waste recipes using ingredients already sitting in your kitchen. Includes interactive step-by-step cooking mode with automatic pantry deduction upon completion.
- **AI Econest Assistant**: Conversational household assistant with pre-built prompt chips and executable action cards.
- **Instant Receipt OCR**: Simulates scanning grocery invoices (BigBasket, Blinkit, Zepto) and auto-populates pantry inventory and expenses.
- **Reports & Analytics**: Month-over-month comparison metrics and cumulative leakage prevention area graphs.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Data Visualizations**: Recharts
- **Celebration Effects**: Canvas Confetti
- **Build Tool**: Vite

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or v20+)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd econest
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 📁 Directory Structure

```text
econest/
├── public/
│   └── econest-logo.png
├── src/
│   ├── components/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── MetricCard.tsx
│   │   ├── RecommendationCard.tsx
│   │   ├── QuickActions.tsx
│   │   ├── ActivityFeed.tsx
│   │   ├── AddItemModal.tsx
│   │   ├── CookingModal.tsx
│   │   ├── ReceiptScanModal.tsx
│   │   └── ToastContainer.tsx
│   ├── context/
│   │   └── EconestContext.tsx
│   ├── data/
│   │   └── mockData.ts
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── ExpiryGuard.tsx
│   │   ├── SmartPantry.tsx
│   │   ├── ExpenseManager.tsx
│   │   ├── WasteGuard.tsx
│   │   ├── SmartShopping.tsx
│   │   ├── AIAssistant.tsx
│   │   ├── Reports.tsx
│   │   ├── Notifications.tsx
│   │   └── Settings.tsx
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## 📄 License

MIT License. Designed with ❤️ for modern sustainable homes.
