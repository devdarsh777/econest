import React, { useState } from 'react';
import { useEconest } from '../context/EconestContext';
import {
  X,
  Clock,
  Flame,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Award,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CookingModal: React.FC = () => {
  const {
    activeCookingRecipe,
    setActiveCookingRecipe,
    pantryItems,
    setPantryFilter,
    consumePantryItem,
    addToast
  } = useEconest();

  const [currentStep, setCurrentStep] = useState(0);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});

  if (!activeCookingRecipe) return null;

  const toggleIngredient = (idx: number) => {
    setCheckedIngredients(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleFinishCooking = () => {
    // Automatically match and consume expiring pantry ingredients
    activeCookingRecipe.ingredientsUsed.forEach(ing => {
      const match = pantryItems.find(p => p.name.toLowerCase().includes(ing.name.toLowerCase()) || ing.name.toLowerCase().includes(p.name.toLowerCase()));
      if (match) {
        consumePantryItem(match.id, 1);
      }
    });

    addToast(
      `Cooked ${activeCookingRecipe.title}! 🎉`,
      `Saved ₹${activeCookingRecipe.moneySaved} & prevented ${activeCookingRecipe.wastePreventedKg}kg of food waste.`,
      'success'
    );

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    setActiveCookingRecipe(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between bg-gradient-to-r from-emerald-50/70 to-purple-50/70 dark:from-emerald-950/20 dark:to-purple-950/20">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                Interactive Kitchen Mode
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300">
                Pantry Anti-Waste Hero
              </span>
            </div>
            <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white">
              {activeCookingRecipe.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {activeCookingRecipe.description}
            </p>
          </div>
          <button
            onClick={() => setActiveCookingRecipe(null)}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-white dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Recipe Meta Badges */}
        <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800 grid grid-cols-4 gap-2 bg-slate-50/50 dark:bg-slate-800/40 text-center text-xs">
          <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
            <div className="text-[10px] text-slate-400 font-medium">Prep Time</div>
            <div className="font-bold text-slate-800 dark:text-slate-100 flex items-center justify-center gap-1 mt-0.5">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              {activeCookingRecipe.timeMinutes} mins
            </div>
          </div>
          <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
            <div className="text-[10px] text-slate-400 font-medium">Servings</div>
            <div className="font-bold text-slate-800 dark:text-slate-100 mt-0.5">
              {activeCookingRecipe.servings} people
            </div>
          </div>
          <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
            <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium">Spend Saved</div>
            <div className="font-bold text-emerald-700 dark:text-emerald-300 mt-0.5">
              ₹{activeCookingRecipe.moneySaved}
            </div>
          </div>
          <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
            <div className="text-[10px] text-purple-700 dark:text-purple-400 font-medium">Waste Cut</div>
            <div className="font-bold text-purple-700 dark:text-purple-300 mt-0.5">
              {activeCookingRecipe.wastePreventedKg} kg
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Ingredients Checklist */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Pantry Ingredients Required
              </h4>
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                All Available in Kitchen
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeCookingRecipe.ingredientsUsed.map((ing, idx) => {
                const isChecked = !!checkedIngredients[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleIngredient(idx)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all text-xs ${
                      isChecked
                        ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200'
                        : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-emerald-400'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-md flex items-center justify-center border transition-colors ${
                        isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 dark:border-slate-600'
                      }`}>
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <span className="font-semibold">{ing.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{ing.quantity}</span>
                      {ing.expiringSoon && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                          Expiring!
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Cooking Step */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Instruction {currentStep + 1} of {activeCookingRecipe.instructions.length}
              </span>
              <div className="flex items-center gap-1">
                {activeCookingRecipe.instructions.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all ${
                      i === currentStep ? 'w-6 bg-emerald-600' : 'w-2 bg-slate-200 dark:bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="text-sm sm:text-base font-medium text-slate-800 dark:text-slate-100 min-h-[64px] flex items-center">
              {activeCookingRecipe.instructions[currentStep]}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                disabled={currentStep === 0}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold disabled:opacity-40 flex items-center gap-1 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>

              {currentStep < activeCookingRecipe.instructions.length - 1 ? (
                <button
                  onClick={() => setCurrentStep(prev => Math.min(activeCookingRecipe.instructions.length - 1, prev + 1))}
                  className="px-4 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold flex items-center gap-1 hover:bg-slate-800 shadow"
                >
                  Next Step <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  Ready to plate! 🍽️
                </span>
              )}
            </div>
          </div>

          {/* Nutrition Summary */}
          <div className="p-3 rounded-2xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-800/40">
            <h5 className="text-[11px] font-bold uppercase tracking-wider text-purple-800 dark:text-purple-300 mb-2">
              Macro Nutrition (per serving)
            </h5>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div>
                <span className="text-slate-400 text-[10px]">Calories</span>
                <p className="font-bold text-slate-800 dark:text-slate-100">{activeCookingRecipe.nutrition.calories} kcal</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px]">Protein</span>
                <p className="font-bold text-slate-800 dark:text-slate-100">{activeCookingRecipe.nutrition.protein}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px]">Carbs</span>
                <p className="font-bold text-slate-800 dark:text-slate-100">{activeCookingRecipe.nutrition.carbs}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px]">Fat</span>
                <p className="font-bold text-slate-800 dark:text-slate-100">{activeCookingRecipe.nutrition.fat}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex items-center justify-between">
          <button
            onClick={() => setActiveCookingRecipe(null)}
            className="px-4 py-2 rounded-xl text-slate-500 hover:text-slate-700 text-xs font-semibold"
          >
            Cancel
          </button>

          <button
            onClick={handleFinishCooking}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/25 flex items-center gap-2 transition-all hover:scale-105"
          >
            <CheckCircle2 className="w-4 h-4" />
            Finish & Deduct Consumed Ingredients
          </button>
        </div>
      </div>
    </div>
  );
};
