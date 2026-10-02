import React, { useState } from 'react';
import { useEconest } from '../context/EconestContext';
import {
  X,
  ScanText,
  FileCheck,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  Receipt
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ReceiptScanModal: React.FC = () => {
  const {
    isReceiptModalOpen,
    setIsReceiptModalOpen,
    addPantryItem,
    addExpense,
    addToast
  } = useEconest();

  const [step, setStep] = useState<'upload' | 'scanning' | 'parsed'>('upload');

  if (!isReceiptModalOpen) return null;

  const mockParsedItems = [
    { name: "Amul Pasteurised Butter (500g)", category: "dairy" as const, qty: 1, unit: "block", loc: "fridge" as const, cost: 275, expiry: "2026-11-15" },
    { name: "Fresh Baby Spinach (250g)", category: "produce" as const, qty: 1, unit: "bunch", loc: "fridge" as const, cost: 45, expiry: "2026-10-06" },
    { name: "Milky Mist Plain Dahi (400g)", category: "dairy" as const, qty: 1, unit: "tub", loc: "fridge" as const, cost: 65, expiry: "2026-10-08" },
    { name: "Tata Himalayan Rock Salt (1kg)", category: "spices" as const, qty: 1, unit: "pack", loc: "dry" as const, cost: 95, expiry: "2027-09-01" },
  ];

  const handleSimulateScan = () => {
    setStep('scanning');
    setTimeout(() => {
      setStep('parsed');
    }, 1200);
  };

  const handleConfirmImport = () => {
    // Add all 4 items to pantry
    mockParsedItems.forEach(item => {
      addPantryItem({
        name: item.name,
        category: item.category,
        quantity: item.qty,
        unit: item.unit,
        storageLocation: item.loc,
        purchaseDate: '2026-10-02',
        expiryDate: item.expiry,
        cost: item.cost,
        notes: "Imported from BigBasket digital receipt OCR"
      });
    });

    // Add expense
    addExpense({
      title: "BigBasket Fresh Weekly Essentials (Receipt #BB-9081)",
      category: "Groceries",
      amount: 480,
      date: "2026-10-02",
      paymentMethod: "UPI",
      vendor: "BigBasket",
      status: "Completed"
    });

    addToast(
      "Receipt Auto-Imported!",
      "4 items added to Smart Pantry & ₹480 expense recorded with zero manual typing.",
      "success"
    );

    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch (e) {}

    setIsReceiptModalOpen(false);
    setStep('upload');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold">
              <ScanText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Instant Receipt OCR</h3>
              <p className="text-xs text-slate-400">Auto-sort items into pantry & log expenses</p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsReceiptModalOpen(false);
              setStep('upload');
            }}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {step === 'upload' && (
            <div className="space-y-4 text-center">
              <div
                onClick={handleSimulateScan}
                className="border-2 border-dashed border-purple-300 dark:border-purple-800 rounded-2xl p-8 bg-purple-50/40 dark:bg-purple-950/10 cursor-pointer hover:bg-purple-50 transition-colors flex flex-col items-center justify-center gap-2"
              >
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-600 flex items-center justify-center">
                  <Receipt className="w-6 h-6" />
                </div>
                <div className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                  Click to Scan Sample Receipt
                </div>
                <p className="text-xs text-slate-400 max-w-xs">
                  Supports BigBasket, Blinkit, Zepto, Swiggy Instamart PDF bills or supermarket photo receipts.
                </p>
              </div>

              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" /> AI Expiry Prediction
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" /> Auto Pantry Routing
                </span>
              </div>
            </div>
          )}

          {step === 'scanning' && (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                  AI Reading Receipt OCR...
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Extracting line items, weights, prices, and intelligent expiry windows.
                </p>
              </div>
            </div>
          )}

          {step === 'parsed' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold text-emerald-800 dark:text-emerald-300">BigBasket Order #BB-9081</span>
                    <span className="text-slate-500 block text-[11px]">Total Bill: ₹480.00 • 4 items detected</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                  100% Parsed
                </span>
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto">
                {mockParsedItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-800 dark:text-slate-200">{item.name}</div>
                      <div className="text-[10px] text-slate-400">
                        Route: <span className="font-semibold capitalize text-emerald-600">{item.loc}</span> • Est Expiry: {item.expiry}
                      </div>
                    </div>
                    <span className="font-mono font-bold text-slate-700 dark:text-slate-300">₹{item.cost}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleConfirmImport}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <CheckCircle2 className="w-4 h-4" />
                Import 4 Items to Pantry & Record ₹480 Expense
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
