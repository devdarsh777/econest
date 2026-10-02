import React, { useState } from 'react';
import { useEconest } from '../context/EconestContext';
import {
  Bot,
  Send,
  Sparkles,
  ChefHat,
  TrendingDown,
  Trash2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Package,
  Clock
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actionCard?: {
    type: 'recipe' | 'duplicate' | 'budget';
    title: string;
    details: string;
    buttonText: string;
    actionPayload?: any;
  };
}

export const AIAssistant: React.FC = () => {
  const {
    pantryItems,
    expenses,
    household,
    recipes,
    setActiveCookingRecipe,
    removeShoppingItem,
    shoppingItems,
    addToast
  } = useEconest();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'assistant',
      text: `Hello Alex! I am your AI Econest Assistant. I'm actively monitoring your Bangalore Home pantry, expiry schedules, Blinkit/BigBasket orders, and household utility spend. How can I assist you right now?`,
      timestamp: '10:00 AM'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const suggestedPrompts = [
    "What is expiring this week?",
    "What can I cook tonight?",
    "Why is my grocery spending high?",
    "What should I buy today?",
    "Remove duplicate items from my shopping list",
    "How much food did I save this month?"
  ];

  const handleSend = (userText: string) => {
    if (!userText.trim()) return;

    const userMsg: ChatMessage = {
      id: 'm-' + Date.now(),
      sender: 'user',
      text: userText,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // AI Logic Simulation
    setTimeout(() => {
      let replyText = "";
      let card: ChatMessage['actionCard'] = undefined;
      const lower = userText.toLowerCase();

      if (lower.includes('expir')) {
        const expiring = pantryItems.filter(p => p.daysRemaining <= 2);
        replyText = `You have ${expiring.length} priority items nearing their shelf limit: Amul Taaza Milk (expires tomorrow) and Fresh Country Tomatoes (2 days left). I recommend diverting them into an evening recipe plan before 9 PM.`;
        card = {
          type: 'recipe',
          title: 'Tomato & Egg Rice (15 min)',
          details: 'Uses 4 country tomatoes and 3 farm brown eggs currently in your crisper.',
          buttonText: 'Cook Tomato Rice',
          actionPayload: 'r-tomato-egg-rice'
        };
      } else if (lower.includes('cook') || lower.includes('recipe') || lower.includes('tomato')) {
        replyText = `Based on your pantry ingredients (Basmati rice, eggs, and ripe country tomatoes), I generated a zero-waste recipe that saves ₹85 and cooks in 15 minutes!`;
        card = {
          type: 'recipe',
          title: '15-Min Tomato & Mustard Egg Rice',
          details: 'Pantry match: 95%. No missing ingredients needed.',
          buttonText: 'Start Cooking Mode',
          actionPayload: 'r-tomato-egg-rice'
        };
      } else if (lower.includes('spend') || lower.includes('high') || lower.includes('grocer')) {
        replyText = `Your grocery spending reached ₹5,250 this month with a recent +18% weekend anomaly on Blinkit (₹1,420). Quick-commerce delivery surcharges accounted for ₹180 in avoidable leak. Setting a ₹400 daily discretionary cap will keep you within your ₹25,000 budget!`;
        card = {
          type: 'budget',
          title: 'Enact Rest-of-Week Spending Cap',
          details: 'Limit quick-commerce orders to ₹400/day for the next 4 days.',
          buttonText: 'Activate ₹400 Cap'
        };
      } else if (lower.includes('duplicate') || lower.includes('remove') || lower.includes('cart')) {
        const hasDup = shoppingItems.some(s => s.duplicateWarning);
        if (hasDup) {
          replyText = `I identified 500g Hybrid Tomatoes in your cart while you already have 4 fresh country tomatoes in your refrigerator crisper. Removing this duplicate prevents automatic spoilage and saves ₹60.`;
          card = {
            type: 'duplicate',
            title: 'Remove Duplicate Tomatoes',
            details: 'Save ₹60 and prevent double purchase.',
            buttonText: 'Remove & Save ₹60'
          };
        } else {
          replyText = `Your active shopping cart is clean! All duplicates have already been intercepted and removed.`;
        }
      } else if (lower.includes('save') || lower.includes('month') || lower.includes('waste')) {
        replyText = `This month you have saved ₹${household.leakageAvoidedRupees.toLocaleString('en-IN')} in avoided food waste and duplicate orders, while abating ${household.carbonSavedKg} kg of CO₂e emissions through zero-waste cooking and balcony composting! 🌿`;
      } else if (lower.includes('buy')) {
        replyText = `Checking low pantry stock: You are currently low on Aashirvaad Chakki Atta (800g left) and Tata Salt Lite (300g left). Both have been scheduled on your Smart Shopping list for BigBasket monthly delivery.`;
      } else {
        replyText = `I analyzed your household data for "${userText}". Everything is synchronized. Your pantry health is currently at 94/100 and no other urgent anomalies were detected.`;
      }

      setMessages(prev => [
        ...prev,
        {
          id: 'm-' + Date.now(),
          sender: 'assistant',
          text: replyText,
          timestamp: 'Just now',
          actionCard: card
        }
      ]);
      setIsTyping(false);
    }, 700);
  };

  const handleCardAction = (card: NonNullable<ChatMessage['actionCard']>) => {
    if (card.type === 'recipe') {
      const r = recipes.find(rec => rec.id === card.actionPayload) || recipes[0];
      setActiveCookingRecipe(r);
    } else if (card.type === 'duplicate') {
      const dup = shoppingItems.find(s => s.duplicateWarning);
      if (dup) removeShoppingItem(dup.id);
      addToast('Duplicate Cleared', 'Removed tomatoes from cart. ₹60 retained.', 'success');
    } else if (card.type === 'budget') {
      addToast('Daily Cap Activated', 'Discretionary spend limit set to ₹400/day.', 'success');
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col bg-white dark:bg-slate-900 rounded-3xl border border-[#e8e5f2] dark:border-slate-800 shadow-soft overflow-hidden animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-4 px-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-purple-50/50 via-white to-emerald-50/50 dark:from-purple-950/20 dark:via-slate-900 dark:to-emerald-950/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-600/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-base text-slate-900 dark:text-white">
                AI Econest Assistant
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Household Brain
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Synchronized with pantry vision, smart plugs, and quick delivery carts
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Local Context Aware</span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300'
              }`}
            >
              {msg.sender === 'user' ? 'AL' : <Sparkles className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-emerald-600 text-white font-medium rounded-tr-none'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200/70 dark:border-slate-700/70'
              }`}
            >
              <p>{msg.text}</p>

              {/* Embedded Interactive Action Card */}
              {msg.actionCard && (
                <div className="mt-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-purple-200/80 dark:border-purple-800 shadow-sm space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">
                      {msg.actionCard.title}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase">
                      Action Ready
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {msg.actionCard.details}
                  </p>
                  <button
                    onClick={() => handleCardAction(msg.actionCard!)}
                    className="mt-2 w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>{msg.actionCard.buttonText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <span className={`text-[10px] block mt-1 ${
                msg.sender === 'user' ? 'text-emerald-100 text-right' : 'text-slate-400'
              }`}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-400 italic p-2">
            <Sparkles className="w-4 h-4 animate-spin text-purple-600" />
            <span>AI Econest is reviewing pantry and expense records...</span>
          </div>
        )}
      </div>

      {/* Suggested Quick Prompts */}
      <div className="p-3 px-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/50 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-[10px] font-bold uppercase text-slate-400 shrink-0">
          Try Asking:
        </span>
        {suggestedPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-purple-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 whitespace-nowrap text-[11px] transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <div className="p-4 px-6 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Econest (e.g. 'What can I cook with milk and tomatoes?', 'Why is spending high?')"
            className="flex-1 px-4 py-3 text-xs sm:text-sm rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
          />
          <button
            type="submit"
            className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Ask AI</span>
          </button>
        </form>
      </div>
    </div>
  );
};
