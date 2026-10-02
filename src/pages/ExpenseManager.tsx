import React, { useState } from 'react';
import { useEconest } from '../context/EconestContext';
import {
  Wallet,
  Plus,
  AlertTriangle,
  TrendingUp,
  Receipt,
  Sparkles,
  CheckCircle2,
  DollarSign,
  ArrowUpRight,
  PieChart as PieIcon,
  CreditCard
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

export const ExpenseManager: React.FC = () => {
  const {
    expenses,
    household,
    setHousehold,
    setIsAddItemOpen,
    setAddItemInitialTab,
    setIsReceiptModalOpen,
    addToast
  } = useEconest();

  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [newBudget, setNewBudget] = useState(household.monthlyBudget.toString());

  // Category aggregations
  const categoryTotals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value
  }));

  const COLORS = ['#10b981', '#f59e0b', '#8b5cf6', '#3b82f6', '#ec4899'];

  const weeklyTrendData = [
    { week: 'Week 1', Groceries: 1200, Delivery: 250, Utilities: 0 },
    { week: 'Week 2', Groceries: 1800, Delivery: 450, Utilities: 1250 },
    { week: 'Week 3', Groceries: 2200, Delivery: 680, Utilities: 0 },
    { week: 'Week 4 (Current)', Groceries: 1420, Delivery: 0, Utilities: 1240 },
  ];

  const remainingBudget = Math.max(0, household.monthlyBudget - household.totalMonthlySpend);
  const percentUsed = Math.round((household.totalMonthlySpend / household.monthlyBudget) * 100);

  const handleSaveBudget = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(newBudget) || 25000;
    setHousehold(prev => ({ ...prev, monthlyBudget: val }));
    setIsEditingBudget(false);
    addToast('Monthly Budget Updated', `Target set to ₹${val.toLocaleString('en-IN')}`, 'success');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-[#e8e5f2] dark:border-slate-800 shadow-soft">
        <div>
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-purple-600" />
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Expense Manager
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Household grocery, food delivery & recurring utilities tracking with AI spend-leak detector.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsReceiptModalOpen(true)}
            className="px-3.5 py-2 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-bold text-xs flex items-center gap-1.5 hover:bg-purple-100 transition-colors"
          >
            <Receipt className="w-4 h-4" /> Scan Receipt
          </button>
          <button
            onClick={() => {
              setAddItemInitialTab('expense');
              setIsAddItemOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" /> Add Expense
          </button>
        </div>
      </div>

      {/* AI Anomaly Alert Box */}
      <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-soft">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xs text-rose-900 dark:text-rose-200 uppercase tracking-wide">
                AI Spend Anomaly Intercepted
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-200 text-rose-800">
                +18% Surge
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Weekend grocery spending is 18% higher than your normal pattern (Blinkit surge fee ₹180 + instant ordering).
            </p>
          </div>
        </div>
        <button
          onClick={() => addToast('Daily Cap Active', 'Discretionary spend capped to ₹400 for next 4 days.', 'success')}
          className="px-4 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs whitespace-nowrap self-start sm:self-center"
        >
          Enact ₹400 Rest-of-Week Cap
        </button>
      </div>

      {/* Top 4 Budget Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-soft">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Total Monthly Spend
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
            ₹{household.totalMonthlySpend.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-emerald-600 font-medium mt-1">
            {percentUsed}% of budget used
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-soft">
          <div className="flex items-center justify-between">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Budget Remaining
            </div>
            <button
              onClick={() => setIsEditingBudget(!isEditingBudget)}
              className="text-[10px] text-purple-600 hover:underline font-bold"
            >
              {isEditingBudget ? 'Close' : 'Adjust'}
            </button>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
            ₹{remainingBudget.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-slate-500 font-medium mt-1">
            Target: ₹{household.monthlyBudget.toLocaleString('en-IN')}
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-soft">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Groceries & Staples
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-700 dark:text-emerald-400 mt-1">
            ₹{(categoryTotals['Groceries'] || 0).toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-slate-500 font-medium mt-1">
            BigBasket & Blinkit
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-soft">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Utilities & Energy
          </div>
          <div className="text-xl sm:text-2xl font-black text-blue-700 dark:text-blue-400 mt-1">
            ₹{(categoryTotals['Utilities'] || 0).toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-slate-500 font-medium mt-1">
            BESCOM & Fiber
          </div>
        </div>
      </div>

      {/* Adjust Budget Drawer */}
      {isEditingBudget && (
        <form onSubmit={handleSaveBudget} className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-2xl border border-purple-200 dark:border-purple-800 flex items-center gap-3 animate-in fade-in">
          <label className="text-xs font-bold text-purple-900 dark:text-purple-200 whitespace-nowrap">
            Monthly Household Budget Cap (₹):
          </label>
          <input
            type="number"
            value={newBudget}
            onChange={(e) => setNewBudget(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl border border-purple-300 dark:border-purple-700 bg-white dark:bg-slate-800 font-bold"
          />
          <button
            type="submit"
            className="px-4 py-1.5 bg-purple-600 text-white rounded-xl text-xs font-bold shadow"
          >
            Save Target
          </button>
        </form>
      )}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Trend Bar Chart */}
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
              Weekly Spend Trajectory
            </h3>
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              Current Month
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyTrendData}>
                <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="Groceries" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Delivery" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Utilities" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown Pie */}
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
              Expense Distribution by Category
            </h3>
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              ₹8,420 Total
            </span>
          </div>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Expense Transactions List */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-soft">
        <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-4">
          Recorded Transactions
        </h3>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {expenses.map(expense => (
            <div
              key={expense.id}
              className="py-3 flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                    {expense.title}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {expense.vendor} • {expense.category} • {expense.paymentMethod} • {expense.date}
                  </div>
                  {expense.anomaly && (
                    <span className="text-[10px] text-rose-600 dark:text-rose-400 font-bold bg-rose-50 dark:bg-rose-950/40 px-1.5 py-0.5 rounded mt-1 inline-block">
                      ⚠️ {expense.anomalyReason}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <div className="font-mono font-bold text-base text-slate-900 dark:text-white">
                  ₹{expense.amount.toLocaleString('en-IN')}
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  expense.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {expense.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
