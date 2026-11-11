import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PricingSection } from './components/PricingSection';
import { ComparisonTable } from './components/ComparisonTable';
import { AddonsSection } from './components/AddonsSection';
import { ProfileAuditQuiz } from './components/ProfileAuditQuiz';
import { BeforeAfterShowcase } from './components/BeforeAfterShowcase';
import { RulesAndCompliance } from './components/RulesAndCompliance';
import { Footer } from './components/Footer';
import { OrderModal } from './components/OrderModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { AdminOrdersDrawer } from './components/AdminOrdersDrawer';
import { OrderRequest } from './types';
import { MessageCircle, Shield, ArrowUpRight } from 'lucide-react';

const INITIAL_DEMO_ORDERS: OrderRequest[] = [
  {
    id: 'GBP-7842',
    createdAt: '10 Nov 2026, 04:30 PM',
    businessName: 'Royal Dental Clinic & Implant Center',
    mapsUrlOrAddress: '12th Main, 100ft Road, Indiranagar, Bengaluru',
    category: 'Clinic, Hospital & Healthcare',
    contactName: 'Dr. Ramesh Patel',
    phone: '9876543210',
    email: 'dr.ramesh@royaldental.in',
    packageId: 'standard',
    addons: ['addon_photos', 'addon_review_reply'],
    totalPrice: 897,
    status: 'In Optimization',
    profileState: 'verified',
    notes: 'Focus on emergency root canal and Invisalign keywords.',
    paymentMethod: 'upi',
    paymentConfirmed: true
  },
  {
    id: 'GBP-5219',
    createdAt: '09 Nov 2026, 01:15 PM',
    businessName: 'The Harvest & Grain Artisan Bakery',
    mapsUrlOrAddress: 'Bandra West, Mumbai',
    category: 'Restaurant, Cafe & Food',
    contactName: 'Ananya Sharma',
    phone: '9819283746',
    email: 'ananya@harvestgrain.in',
    packageId: 'advanced',
    addons: ['addon_post', 'addon_monthly_monitor'],
    totalPrice: 1397,
    status: 'Report Generated',
    profileState: 'verified',
    notes: 'Uploaded 10 sourdough bread & cafe interior pictures.',
    paymentMethod: 'upi',
    paymentConfirmed: true
  }
];

export default function App() {
  const [orders, setOrders] = useState<OrderRequest[]>(() => {
    try {
      const stored = localStorage.getItem('maprank_orders');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_DEMO_ORDERS;
  });

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [modalPkgId, setModalPkgId] = useState<'basic' | 'standard' | 'advanced'>('standard');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  
  const [isTrackerModalOpen, setIsTrackerModalOpen] = useState(false);
  const [isAdminDrawerOpen, setIsAdminDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('maprank_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const handleOpenOrder = (pkgId: 'basic' | 'standard' | 'advanced' = 'standard') => {
    setModalPkgId(pkgId);
    setIsOrderModalOpen(true);
  };

  const handleToggleAddon = (addonId: string) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter((id) => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  const handleOpenOrderWithAddons = () => {
    setIsOrderModalOpen(true);
  };

  const handleOrderSuccess = (newOrder: OrderRequest) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  const handleUpdateStatus = (orderId: string, newStatus: OrderRequest['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  const handleResetDemoData = () => {
    setOrders(INITIAL_DEMO_ORDERS);
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col selection:bg-blue-100 selection:text-blue-900">
      
      {/* Top Banner Notice: 100% Customer Ownership Guarantee */}
      <div className="bg-neutral-900 text-white text-[11px] py-1.5 px-4 text-center font-medium border-b border-neutral-800 flex items-center justify-center gap-2">
        <Shield className="w-3.5 h-3.5 text-blue-400 shrink-0" />
        <span>
          Customer Protection: You keep full Master ownership. Access granted safely via Google Business Manager.
        </span>
        <a href="#business-rules" className="underline hover:text-blue-300 ml-1 hidden sm:inline">
          Read Policy
        </a>
      </div>

      {/* Top Bar Contract Navigation */}
      <Navbar
        onOpenOrder={handleOpenOrder}
        onOpenTracker={() => setIsTrackerModalOpen(true)}
        onOpenAdmin={() => setIsAdminDrawerOpen(true)}
        orderCount={orders.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onSelectPackage={handleOpenOrder}
          onOpenAudit={() => {
            const auditEl = document.getElementById('audit-quiz');
            if (auditEl) {
              auditEl.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />

        {/* Pricing Section (Basic ₹399, Standard ₹599 Highlighted, Advanced ₹999) */}
        <PricingSection onSelectPackage={handleOpenOrder} />

        {/* Feature Comparison Table */}
        <ComparisonTable onSelectPackage={handleOpenOrder} />

        {/* Addon Services */}
        <AddonsSection
          selectedAddons={selectedAddons}
          onToggleAddon={handleToggleAddon}
          onOpenOrderWithAddons={handleOpenOrderWithAddons}
        />

        {/* 60-Sec Interactive Profile Health Score Quiz */}
        <ProfileAuditQuiz onSelectPackage={handleOpenOrder} />

        {/* Visual Proof / Before & After Showcase */}
        <BeforeAfterShowcase onSelectPackage={handleOpenOrder} />

        {/* Business Rules & Mandatory Disclaimer */}
        <RulesAndCompliance />

        {/* Pre-Footer Action Block */}
        <section className="py-14 bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to Enhance Your Local Google Maps Presence?
            </h2>
            <p className="text-sm text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Join local cafes, salons, clinics, and businesses that have completed profile optimization. Get started with Basic (₹399) or our most popular Standard package (₹599) today.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => handleOpenOrder('standard')}
                className="px-6 py-3.5 rounded-xl bg-white text-blue-900 text-xs sm:text-sm font-bold hover:bg-neutral-100 active:scale-98 transition-all shadow-md flex items-center gap-2"
              >
                <span>Request Standard Optimization (₹599)</span>
                <ArrowUpRight className="w-4 h-4 text-blue-700" />
              </button>
              <button
                onClick={() => handleOpenOrder('basic')}
                className="px-6 py-3.5 rounded-xl bg-blue-900/60 border border-blue-400/40 text-white text-xs sm:text-sm font-semibold hover:bg-blue-900 transition-all"
              >
                Start with Basic (₹399)
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Footer */}
      <Footer
        onOpenOrder={handleOpenOrder}
        onOpenTracker={() => setIsTrackerModalOpen(true)}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <aside aria-label="Support chat" className="fixed bottom-5 right-5 z-40">
        <a
          href="https://wa.me/919876543210?text=Hello%20MapRank%20Pro!%20I%20have%20a%20question%20about%20Google%20Maps%20optimization%20for%20my%20business."
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95 group text-xs font-semibold"
          title="Chat with Local SEO Consultant on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 text-white" />
          <span className="hidden sm:inline">Questions? Chat on WhatsApp</span>
        </a>
      </aside>

      {/* Order / Checkout Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        initialPackageId={modalPkgId}
        initialAddons={selectedAddons}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Order Tracking Modal */}
      <OrderTrackerModal
        isOpen={isTrackerModalOpen}
        onClose={() => setIsTrackerModalOpen(false)}
        orders={orders}
      />

      {/* Agency Admin Drawer */}
      <AdminOrdersDrawer
        isOpen={isAdminDrawerOpen}
        onClose={() => setIsAdminDrawerOpen(false)}
        orders={orders}
        onUpdateStatus={handleUpdateStatus}
        onDeleteOrder={handleDeleteOrder}
        onResetDemoData={handleResetDemoData}
      />

    </div>
  );
}
