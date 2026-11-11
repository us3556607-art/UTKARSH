import React from 'react';
import { ADDON_SERVICES } from '../data/packages';
import { Plus, Check, PlusCircle, ArrowRight } from 'lucide-react';

interface AddonsSectionProps {
  selectedAddons: string[];
  onToggleAddon: (addonId: string) => void;
  onOpenOrderWithAddons: () => void;
}

export const AddonsSection: React.FC<AddonsSectionProps> = ({
  selectedAddons,
  onToggleAddon,
  onOpenOrderWithAddons
}) => {
  return (
    <section id="addons" className="py-16 lg:py-24 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-semibold tracking-wider text-blue-600 uppercase">
              Modular Enhancements
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
              Additional Services & Add-Ons
            </h2>
            <p className="text-sm text-neutral-600">
              Need extra posts, photo uploads, or monthly monitoring? Add individual services to any package or request them as standalone boosters.
            </p>
          </div>

          {selectedAddons.length > 0 && (
            <button
              onClick={onOpenOrderWithAddons}
              className="inline-flex items-center gap-2 py-2.5 px-5 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition-all shadow-xs shrink-0 self-start md:self-auto"
            >
              <span>Continue with {selectedAddons.length} Selected Add-on{selectedAddons.length > 1 ? 's' : ''}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Addons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ADDON_SERVICES.map((addon) => {
            const isSelected = selectedAddons.includes(addon.id);
            return (
              <div
                key={addon.id}
                onClick={() => onToggleAddon(addon.id)}
                className={`cursor-pointer rounded-xl p-5 flex flex-col justify-between border transition-all ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/40 ring-1 ring-blue-600/30'
                    : 'border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50/50'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-neutral-900">
                      {addon.title}
                    </span>
                    <button
                      type="button"
                      aria-label={isSelected ? 'Remove addon' : 'Select addon'}
                      className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'border border-neutral-300 text-neutral-400 hover:text-neutral-700'
                      }`}
                    >
                      {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <p className="text-[11px] text-neutral-500 leading-relaxed">
                    {addon.description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-neutral-100 flex items-baseline justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-extrabold text-neutral-900 tabular-nums">
                      ₹{addon.price}
                    </span>
                    {addon.isMonthly && (
                      <span className="text-[10px] text-neutral-500">/month</span>
                    )}
                  </div>
                  <span className={`text-[11px] font-semibold ${isSelected ? 'text-blue-700' : 'text-neutral-500'}`}>
                    {isSelected ? 'Added to Cart' : 'Tap to Add'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
