import React, { useState } from 'react';
import { BUSINESS_RULES } from '../data/packages';
import { ShieldCheck, AlertTriangle, KeyRound, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const RulesAndCompliance: React.FC = () => {
  const [managerGuideOpen, setManagerGuideOpen] = useState(false);

  return (
    <section id="business-rules" className="py-16 lg:py-24 bg-neutral-50/80 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="text-xs font-semibold tracking-wider text-blue-600 uppercase">
            Fair Policies & Protection
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
            Important Business Rules & Service Terms
          </h2>
          <p className="text-sm text-neutral-600">
            We adhere strictly to Google Business Profile guidelines to protect your listing and maintain 100% customer account safety.
          </p>
        </div>

        {/* 6 Core Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BUSINESS_RULES.map((rule, idx) => (
            <div
              key={rule.title}
              className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-2 hover:border-neutral-300 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <h3 className="text-sm font-bold text-neutral-900">
                  {rule.title}
                </h3>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed pl-8">
                {rule.rule}
              </p>
            </div>
          ))}
        </div>

        {/* Mandatory Legal & Algorithm Disclaimer Box */}
        <div className="mt-8 p-6 rounded-2xl bg-amber-50/70 border border-amber-200 text-neutral-800 space-y-3">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                Mandatory Google Ranking Disclaimer & Algorithmic Notice
              </h4>
              <p className="text-xs text-neutral-700 leading-relaxed">
                Specific rank positions on Google Search or Google Maps (e.g. "Rank #1 Guaranteed") cannot be guaranteed by any agency. Google's autonomous algorithm ranks businesses dynamically based on distance, geographical relevance, prominence, customer review sentiment, and user search intent. Our optimization aligns your profile with 100% of Google's best practices to maximize impression relevance, phone inquiries, and footfall.
              </p>
            </div>
          </div>
        </div>

        {/* How Access Handover Works - Accordion Guide */}
        <div className="mt-8 rounded-2xl border border-neutral-200 bg-white shadow-2xs overflow-hidden">
          <button
            onClick={() => setManagerGuideOpen(!managerGuideOpen)}
            className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-neutral-50/70 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-neutral-900">
                  How Do We Work on Your Profile Without Passwords?
                </h4>
                <p className="text-xs text-neutral-500">
                  Step-by-step guide to adding our agency as a "Manager" role in Google Business Profile.
                </p>
              </div>
            </div>
            {managerGuideOpen ? (
              <ChevronUp className="w-5 h-5 text-neutral-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-neutral-400" />
            )}
          </button>

          {managerGuideOpen && (
            <div className="p-5 sm:p-6 pt-0 border-t border-neutral-100 bg-neutral-50/40 space-y-4">
              <p className="text-xs text-neutral-600">
                You never have to share your personal Google Account password. Google provides a secure role delegation system:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-white border border-neutral-200 space-y-1">
                  <span className="font-bold text-blue-600">Step 1: Open Google</span>
                  <p className="text-neutral-600 text-[11px]">
                    Go to Google and search for your business name or visit <strong>google.com/business</strong> while logged into your owner account.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-neutral-200 space-y-1">
                  <span className="font-bold text-blue-600">Step 2: Profile Settings</span>
                  <p className="text-neutral-600 text-[11px]">
                    Click the 3 dots (Menu) on the Google Business search widget → select <strong>Business Profile Settings</strong>.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-neutral-200 space-y-1">
                  <span className="font-bold text-blue-600">Step 3: Managers</span>
                  <p className="text-neutral-600 text-[11px]">
                    Click <strong>People and Access</strong> → Click <strong>Add</strong> and paste our agency optimization email ID provided after order placement.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-neutral-200 space-y-1">
                  <span className="font-bold text-blue-600">Step 4: Role Assignment</span>
                  <p className="text-neutral-600 text-[11px]">
                    Select the <strong>Manager</strong> role (not Primary Owner). We complete optimization, send your report, and you can remove us anytime!
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>You maintain absolute ownership and control of your business profile at all times.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
