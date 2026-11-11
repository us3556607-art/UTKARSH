import React from 'react';
import { PACKAGES } from '../data/packages';
import { Check, Sparkles, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

interface PricingSectionProps {
  onSelectPackage: (pkgId: 'basic' | 'standard' | 'advanced') => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPackage }) => {
  return (
    <section id="packages" className="py-16 lg:py-24 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-semibold tracking-wider text-blue-600 uppercase">
            Transparent, One-Time Investment
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900" style={{ textWrap: 'balance' }}>
            Choose The Right Google Maps Optimization Package
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            Affordable packages tailored for local shops, healthcare clinics, beauty parlors, restaurants, and independent service providers. No hidden fees, no subscriptions.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PACKAGES.map((pkg) => {
            const isStandard = pkg.id === 'standard';
            return (
              <div
                key={pkg.id}
                className={`relative rounded-2xl flex flex-col justify-between transition-all duration-200 ${
                  isStandard
                    ? 'border-2 border-blue-600 shadow-xl bg-gradient-to-b from-blue-50/40 via-white to-white ring-1 ring-blue-600/20 lg:-translate-y-2'
                    : 'border border-neutral-200 bg-white hover:border-neutral-300 shadow-xs'
                }`}
              >
                {/* Highlight Ribbon for Standard */}
                {isStandard && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full shadow-xs flex items-center gap-1.5 whitespace-nowrap">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Best Value & Recommended</span>
                  </div>
                )}

                <div className="p-6 sm:p-8 space-y-6">
                  {/* Top metadata */}
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold tracking-wide text-neutral-500 uppercase">
                        {pkg.tier}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-neutral-600 font-medium">
                        <Clock className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{pkg.deliveryDays}</span>
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mt-1">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-blue-700 font-medium mt-1">
                      {pkg.tagline}
                    </p>
                    <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="pt-2 border-t border-neutral-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tabular-nums">
                        ₹{pkg.price}
                      </span>
                      <span className="text-xs text-neutral-500">/ 1 location (one-time)</span>
                    </div>

                    {/* Highlight callout for Standard */}
                    {pkg.highlightDifference && (
                      <div className="mt-3 p-2.5 rounded-lg bg-blue-100/70 border border-blue-200 text-xs text-blue-900 font-medium leading-snug">
                        💡 <strong>Smart Choice:</strong> {pkg.highlightDifference}
                      </div>
                    )}
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 pt-2">
                    <div className="text-xs font-semibold text-neutral-900 uppercase tracking-wider">
                      Included Work:
                    </div>
                    <ul className="space-y-2 text-xs text-neutral-700">
                      {pkg.features.map((feature, idx) => {
                        const isHeader = feature.endsWith('plus:');
                        if (isHeader) {
                          return (
                            <li key={idx} className="pt-1 text-xs font-bold text-blue-700 flex items-center gap-1.5">
                              <span>↳ {feature}</span>
                            </li>
                          );
                        }
                        return (
                          <li key={idx} className="flex items-start gap-2.5">
                            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="leading-tight">{feature}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                {/* Card CTA Footer */}
                <div className="p-6 sm:p-8 pt-0">
                  <button
                    onClick={() => onSelectPackage(pkg.id)}
                    className={`w-full py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 active:scale-98 transition-all shadow-xs ${
                      isStandard
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
                        : 'bg-neutral-900 hover:bg-neutral-800 text-white'
                    }`}
                  >
                    <span>Request {pkg.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <div className="mt-2 text-center text-[11px] text-neutral-400">
                    Delivery in {pkg.deliveryDays}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Rule Strip */}
        <div className="mt-12 p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-600 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-neutral-800">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
            <span>
              <strong>Crucial Transparency:</strong> All three packages cover 1 Google Business location. Primary profile access and ownership remains with you.
            </span>
          </div>
          <a
            href="#comparison"
            className="text-blue-600 font-semibold hover:underline whitespace-nowrap shrink-0"
          >
            Compare All Features Side-by-Side →
          </a>
        </div>
      </div>
    </section>
  );
};
