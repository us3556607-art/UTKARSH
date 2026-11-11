import React, { useState } from 'react';
import { Check, X, ArrowRight } from 'lucide-react';

interface BeforeAfterShowcaseProps {
  onSelectPackage: (pkgId: 'basic' | 'standard' | 'advanced') => void;
}

export const BeforeAfterShowcase: React.FC<BeforeAfterShowcaseProps> = ({ onSelectPackage }) => {
  const [activeTab, setActiveTab] = useState<'salon' | 'florist'>('salon');

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="text-xs font-semibold tracking-wider text-blue-600 uppercase">
            Visual Proof of Impact
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
            Before vs. After Optimization
          </h2>
          <p className="text-sm text-neutral-600">
            See the exact difference between a default, incomplete Google Maps listing and a professional, optimized profile that turns impressions into customer walk-ins.
          </p>

          {/* Interactive Toggle for Business Type */}
          <div className="inline-flex p-1 rounded-xl bg-neutral-100 border border-neutral-200 mt-2">
            <button
              onClick={() => setActiveTab('salon')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'salon'
                  ? 'bg-white text-neutral-900 shadow-2xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Salon & Wellness Clinic
            </button>
            <button
              onClick={() => setActiveTab('florist')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'florist'
                  ? 'bg-white text-neutral-900 shadow-2xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Boutique Florist & Retail
            </button>
          </div>
        </div>

        {/* 2-Column Split: Before vs After */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Before (Incomplete / Default) */}
          <div className="rounded-2xl border border-red-200 bg-red-50/20 p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-red-700">
                  Typical Unoptimized Listing
                </span>
                <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                  Profile Completeness: 35%
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white border border-red-100 shadow-2xs space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-neutral-200 flex items-center justify-center text-neutral-400 font-bold text-base">
                    {activeTab === 'salon' ? 'A' : 'B'}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-neutral-900">
                      {activeTab === 'salon' ? 'Aurora Hair Studio' : 'Bloom & Gather'}
                    </div>
                    <div className="text-xs text-neutral-500">
                      Category: {activeTab === 'salon' ? 'Hairdresser (Generic)' : 'Shop (Default)'}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-neutral-600 pt-2 border-t border-neutral-100">
                  <div className="flex items-center gap-2 text-red-700">
                    <X className="w-4 h-4 shrink-0" />
                    <span>No secondary categories selected (hair spa, skin clinic, bridal missed)</span>
                  </div>
                  <div className="flex items-center gap-2 text-red-700">
                    <X className="w-4 h-4 shrink-0" />
                    <span>Business description blank or only "Best shop in city"</span>
                  </div>
                  <div className="flex items-center gap-2 text-red-700">
                    <X className="w-4 h-4 shrink-0" />
                    <span>No product catalog or services price card attached</span>
                  </div>
                  <div className="flex items-center gap-2 text-red-700">
                    <X className="w-4 h-4 shrink-0" />
                    <span>Special festive hours unverified (flags "Hours might differ")</span>
                  </div>
                  <div className="flex items-center gap-2 text-red-700">
                    <X className="w-4 h-4 shrink-0" />
                    <span>Only 2 blurry photos uploaded 3 years ago</span>
                  </div>
                  <div className="flex items-center gap-2 text-red-700">
                    <X className="w-4 h-4 shrink-0" />
                    <span>Customer inquiries left unanswered for months</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-neutral-500 italic">
                Result: Potential customers search "hair spa near me" or "same-day bouquet delivery" and click competitors who showcase clear pricing and verified hours.
              </p>
            </div>

            <div className="pt-6 mt-4 border-t border-red-200/60 text-xs text-red-800 font-medium">
              ⚠️ Leaves up to 60% of local customer search discovery on the table.
            </div>
          </div>

          {/* Card 2: After (Fully Optimized with MapRank Pro) */}
          <div className="rounded-2xl border-2 border-emerald-500 bg-emerald-50/20 p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  After MapRank Pro Optimization
                </span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  Profile Completeness: 100%
                </span>
              </div>

              <div className="rounded-xl overflow-hidden border border-emerald-200 bg-white shadow-2xs">
                {/* Photo showcase */}
                <div className="h-36 w-full relative overflow-hidden bg-neutral-100">
                  <img
                    src={activeTab === 'salon' ? '/src/assets/images/modern_clinic_salon_1794375238207.jpg' : '/src/assets/images/local_service_business_1794375238479.jpg'}
                    alt="Optimized business photography"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 right-2 bg-neutral-900/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
                    10+ Curated Photos
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-neutral-900">
                        {activeTab === 'salon' ? 'Aurora Wellness & Hair Studio' : 'Bloom & Gather Floral Design'}
                      </div>
                      <div className="text-xs text-emerald-700 font-medium">
                        Primary: {activeTab === 'salon' ? 'Hair Salon · Secondary: Facial Spa, Bridal' : 'Florist · Secondary: Gift Shop, Event Floral'}
                      </div>
                    </div>
                    <span className="text-xs font-bold text-neutral-900 tabular-nums bg-amber-50 border border-amber-200 px-2 py-0.5 rounded text-amber-900">
                      ★ 4.9 Verified
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-neutral-700 pt-2 border-t border-neutral-100">
                    <div className="flex items-center gap-2 text-emerald-700">
                      <Check className="w-4 h-4 shrink-0 text-emerald-600 font-bold" />
                      <span>750-character SEO description with target neighborhood keywords</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-700">
                      <Check className="w-4 h-4 shrink-0 text-emerald-600 font-bold" />
                      <span>Organized products & services catalog with pricing & direct booking</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-700">
                      <Check className="w-4 h-4 shrink-0 text-emerald-600 font-bold" />
                      <span>All attributes checked: Wheelchair access, Wi-Fi, Card/UPI payments</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-700">
                      <Check className="w-4 h-4 shrink-0 text-emerald-600 font-bold" />
                      <span>Holiday and festive operating hours fully synced</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-700">
                      <Check className="w-4 h-4 shrink-0 text-emerald-600 font-bold" />
                      <span>Direct WhatsApp business link integrated for 1-tap inquiries</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-neutral-600 font-medium">
                Shoppers see verified hours, clear menus/pricing, and prompt responses — driving calls, website visits, and physical walk-ins.
              </p>
            </div>

            <div className="pt-6 mt-4 border-t border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs font-bold text-emerald-900">
                Get your profile optimized in 2–3 days
              </span>
              <button
                onClick={() => onSelectPackage('standard')}
                className="w-full sm:w-auto py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                <span>Choose Standard (₹599)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
