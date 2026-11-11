import React from 'react';
import { MapPin, Menu, X, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenOrder: (pkgId?: 'basic' | 'standard' | 'advanced') => void;
  onOpenTracker: () => void;
  onOpenAdmin: () => void;
  orderCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenOrder,
  onOpenTracker,
  onOpenAdmin,
  orderCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { label: 'Packages', href: '#packages' },
    { label: 'Comparison', href: '#comparison' },
    { label: 'Add-Ons', href: '#addons' },
    { label: 'Health Quiz', href: '#audit-quiz' },
    { label: 'Business Rules', href: '#business-rules' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <a href="#" className="flex items-center gap-2 text-lg font-bold tracking-tight text-neutral-900 whitespace-nowrap shrink-0">
            <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <MapPin className="w-5 h-5 text-white" />
            </span>
            <span>MapRank Pro</span>
          </a>

          {/* Zone 2: 4-5 clean single-line nav links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={onOpenTracker}
              className="text-neutral-600 hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 text-sm font-medium"
            >
              Track Order
            </button>
            <button
              onClick={onOpenAdmin}
              className="text-neutral-500 hover:text-neutral-800 transition-colors whitespace-nowrap shrink-0 text-xs flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
              <span>Agency View ({orderCount})</span>
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenOrder('standard')}
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:scale-95 transition-all shadow-xs whitespace-nowrap shrink-0"
            >
              Order Optimization
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => onOpenOrder('standard')}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-md whitespace-nowrap"
            >
              Order
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-600 hover:text-neutral-900 focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white px-4 pt-3 pb-5 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-neutral-700 hover:text-blue-600 py-1"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-neutral-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTracker();
              }}
              className="w-full text-left py-1 text-sm font-medium text-neutral-700 hover:text-blue-600"
            >
              Track Existing Order
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full text-left py-1 text-xs text-neutral-500 hover:text-neutral-800"
            >
              Agency Dashboard ({orderCount} orders)
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrder('standard');
              }}
              className="w-full mt-2 py-2.5 text-sm font-semibold text-center text-white bg-blue-600 rounded-lg shadow-xs"
            >
              Order Optimization (From ₹399)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
