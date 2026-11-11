import React from 'react';
import { CheckCircle2, Shield, Clock, ArrowRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onSelectPackage: (pkgId: 'basic' | 'standard' | 'advanced') => void;
  onOpenAudit: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectPackage,
  onOpenAudit
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-neutral-50 pt-10 pb-16 lg:pt-14 lg:pb-24 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Quiet metadata line without pills */}
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-500">
              <span className="text-blue-700 font-semibold">Google Maps & Business Profile Optimization</span>
              <span aria-hidden="true">·</span>
              <span>For Indian Small Businesses</span>
              <span aria-hidden="true">·</span>
              <span>1–3 Day Delivery</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 leading-[1.15]" style={{ textWrap: 'balance' }}>
              Turn Nearby Google Searches Into Real Customers At Your Doorstep
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl">
              Professional Google Business Profile audit and optimization designed for restaurants, salons, clinics, retail shops, and local service providers. Affordable one-time packages starting at just <strong className="text-neutral-900 font-semibold">₹399</strong>.
            </p>

            {/* Quick pricing preview strip */}
            <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-xs space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-medium text-neutral-500">
                <span className="text-neutral-900 font-semibold">One-time Service Packages:</span>
                <span className="text-emerald-700 font-semibold">No Monthly Lock-in</span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                <button
                  onClick={() => onSelectPackage('basic')}
                  className="p-2.5 rounded-lg border border-neutral-200 hover:border-blue-400 hover:bg-blue-50/40 text-left transition-colors"
                >
                  <div className="text-xs text-neutral-500 font-medium">Basic</div>
                  <div className="text-base font-bold text-neutral-900 tabular-nums">₹399</div>
                  <div className="text-[11px] text-neutral-500">1–2 days</div>
                </button>
                <button
                  onClick={() => onSelectPackage('standard')}
                  className="p-2.5 rounded-lg border-2 border-blue-600 bg-blue-50/30 text-left transition-colors relative"
                >
                  <div className="text-xs text-blue-700 font-semibold flex items-center justify-between">
                    Standard
                    <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.2 rounded font-bold">Best Value</span>
                  </div>
                  <div className="text-base font-bold text-neutral-900 tabular-nums">₹599</div>
                  <div className="text-[11px] text-neutral-600">2–3 days</div>
                </button>
                <button
                  onClick={() => onSelectPackage('advanced')}
                  className="p-2.5 rounded-lg border border-neutral-200 hover:border-blue-400 hover:bg-blue-50/40 text-left transition-colors"
                >
                  <div className="text-xs text-neutral-500 font-medium">Advanced</div>
                  <div className="text-base font-bold text-neutral-900 tabular-nums">₹999</div>
                  <div className="text-[11px] text-neutral-500">3–5 days</div>
                </button>
              </div>
            </div>

            {/* CTA action buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href="#packages"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:scale-98 transition-all shadow-sm"
              >
                <span>View All Packages</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={onOpenAudit}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-neutral-800 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 hover:border-neutral-400 active:scale-98 transition-all"
              >
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Free 60-Sec Profile Health Quiz</span>
              </button>
            </div>

            {/* Adjacency Trust signals */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-neutral-200 text-xs text-neutral-600">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-600 shrink-0" />
                <span>100% You Retain Primary Ownership</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Fast 1–3 Business Day Turnaround</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Transparent Delivery Report Included</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Frame */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-200 bg-white shadow-lg">
              <div className="aspect-16/10 sm:aspect-16/11 w-full relative">
                <img
                  src="/src/assets/images/hero_local_storefront_1794375237083.jpg"
                  alt="Artisanal local bakery storefront on a vibrant sunny street"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent" />
                
                {/* Floating summary info at bottom of image */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs font-semibold text-amber-300">Local Visibility Matters</div>
                  <div className="text-sm font-bold text-white mt-0.5">84% of consumers search Google Maps before visiting a local shop</div>
                  <div className="text-[11px] text-neutral-300 mt-1 flex items-center gap-2">
                    <span>Accurate Categories</span>
                    <span>·</span>
                    <span>Local Keywords</span>
                    <span>·</span>
                    <span>Verified Hours</span>
                  </div>
                </div>
              </div>

              {/* Card foot summary */}
              <div className="p-4 bg-white border-t border-neutral-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-neutral-900">Tailored For Small Businesses</div>
                  <div className="text-neutral-500">Salons, Cafes, Dentists, Boutiques & Home Services</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-blue-600 tabular-nums">From ₹399</div>
                  <div className="text-neutral-400 text-[10px]">One-time fee</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
