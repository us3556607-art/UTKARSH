import React from 'react';
import { MapPin, Phone, Mail, ShieldAlert } from 'lucide-react';

interface FooterProps {
  onOpenOrder: (pkgId: 'basic' | 'standard' | 'advanced') => void;
  onOpenTracker: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenOrder, onOpenTracker }) => {
  return (
    <footer className="bg-neutral-900 text-neutral-400 text-xs border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" />
              </span>
              <span>MapRank Pro</span>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Dedicated Google Maps & Google Business Profile optimization agency helping Indian local businesses, clinics, and shops attract high-intent local footfall.
            </p>
            <div className="pt-2 text-neutral-500 text-[11px]">
              Independent Optimization Agency. Not affiliated with or endorsed by Google LLC.
            </div>
          </div>

          {/* Col 2: Packages */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Optimization Packages
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onOpenOrder('basic')}
                  className="hover:text-white transition-colors text-left"
                >
                  Basic Optimization (₹399) · 1–2 Days
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenOrder('standard')}
                  className="hover:text-white text-blue-400 font-semibold transition-colors text-left"
                >
                  Standard Optimization (₹599) · Best Value
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenOrder('advanced')}
                  className="hover:text-white transition-colors text-left"
                >
                  Advanced Optimization (₹999) · Full Growth
                </button>
              </li>
              <li>
                <a href="#addons" className="hover:text-white transition-colors">
                  Add-On Boosters (Posts, Photos, SEO)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources & Tools */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Client Tools & Policies
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#audit-quiz" className="hover:text-white transition-colors">
                  Free 60-Sec Profile Health Quiz
                </a>
              </li>
              <li>
                <button onClick={onOpenTracker} className="hover:text-white transition-colors text-left">
                  Track Existing Order
                </button>
              </li>
              <li>
                <a href="#business-rules" className="hover:text-white transition-colors">
                  Manager Role Delegation Guide
                </a>
              </li>
              <li>
                <a href="#business-rules" className="hover:text-white transition-colors">
                  Single Location Service Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Support */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Direct Inquiries
            </div>
            <div className="space-y-2 text-neutral-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="hover:text-white">
                  +91 98765 43210 (WhatsApp Available)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="text-neutral-400">support@maprankpro.in</span>
              </div>
            </div>
            <div className="pt-2 text-[11px] text-neutral-500">
              Operating Hours: Monday – Saturday (9:30 AM to 7:00 PM IST)
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Line */}
        <div className="mt-10 pt-6 border-t border-neutral-800 text-[11px] text-neutral-500 space-y-2">
          <div className="flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Mandatory Compliance Notice:</strong> Google and Google Maps are registered trademarks of Google LLC. MapRank Pro provides independent digital advisory, catalog structuring, and profile optimization services. We do not guarantee specific ranking positions. Profile approvals, verification status, and suspensions are subject to Google's autonomous algorithm and terms of service.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 text-neutral-500 text-[11px] gap-2">
            <div>
              © 2026 MapRank Pro. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span>Single Location Coverage</span>
              <span>·</span>
              <span>Manager Access Protocol</span>
              <span>·</span>
              <span>No Ranking Guarantees</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
