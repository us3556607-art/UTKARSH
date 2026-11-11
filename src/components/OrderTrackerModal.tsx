import React, { useState } from 'react';
import { OrderRequest } from '../types';
import { X, Search, CheckCircle2, Clock, FileText, Download, Building, ShieldCheck } from 'lucide-react';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderRequest[];
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  orders
}) => {
  const [query, setQuery] = useState('');
  const [activeOrder, setActiveOrder] = useState<OrderRequest | null>(null);

  if (!isOpen) return null;

  // If no order selected and orders exist, default to the latest order or demo order
  const currentOrder = activeOrder || (orders.length > 0 ? orders[0] : {
    id: 'GBP-7842',
    createdAt: '10 Nov 2026, 04:30 PM',
    businessName: 'Royal Dental Clinic & Implant Center',
    mapsUrlOrAddress: 'MG Road, Indiranagar, Bengaluru',
    category: 'Clinic, Hospital & Healthcare',
    contactName: 'Dr. Ramesh Patel',
    phone: '9876543210',
    email: 'dr.ramesh@royaldental.in',
    packageId: 'standard',
    addons: ['addon_photos', 'addon_review_reply'],
    totalPrice: 897,
    status: 'In Optimization',
    profileState: 'verified',
    paymentMethod: 'upi',
    paymentConfirmed: true
  } as OrderRequest);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = orders.find(
      (o) => o.id.toLowerCase() === query.trim().toLowerCase() ||
             o.phone.includes(query.trim()) ||
             o.businessName.toLowerCase().includes(query.trim().toLowerCase())
    );
    if (found) {
      setActiveOrder(found);
    } else {
      alert(`No order found matching "${query}". Please check the ID or phone number.`);
    }
  };

  const stages = [
    { name: 'Order Received & Verified', completed: true, time: 'Day 1' },
    { name: 'Google Profile Manager Access Established', completed: true, time: 'Day 1' },
    { name: 'Local Keyword Research & Category Setup', completed: currentOrder.status !== 'Received', time: 'Day 2' },
    { name: 'Profile Content, Media & Attributes Optimization', completed: currentOrder.status === 'Report Generated' || currentOrder.status === 'Delivered', time: 'Day 2–3' },
    { name: 'Before-and-After Deliverable Report Sent', completed: currentOrder.status === 'Delivered', time: 'Day 3' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-6">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/80">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-base font-bold text-neutral-900">
                Google Business Profile Order Status
              </h3>
              <p className="text-xs text-neutral-500">
                Track progress, deliverables, and estimated completion
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Enter Order ID (e.g. GBP-7842) or Phone Number"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-300 text-xs text-neutral-900 focus:outline-hidden focus:border-blue-600"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl transition-colors"
            >
              Lookup
            </button>
          </form>

          {/* Quick chip selector for existing orders */}
          {orders.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="text-neutral-500 text-[11px]">Your Orders:</span>
              {orders.map((o) => (
                <button
                  key={o.id}
                  onClick={() => setActiveOrder(o)}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono font-medium transition-colors ${
                    currentOrder?.id === o.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {o.id} ({o.businessName})
                </button>
              ))}
            </div>
          )}

          {/* Active Order Card */}
          {currentOrder && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-bold text-sm text-neutral-900 flex items-center gap-2">
                    <Building className="w-4 h-4 text-blue-600" />
                    <span>{currentOrder.businessName}</span>
                  </div>
                  <div className="text-neutral-500 mt-0.5">
                    Order ID: <span className="font-mono font-bold text-neutral-800">{currentOrder.id}</span> · Package: <span className="font-semibold text-blue-700 uppercase">{currentOrder.packageId}</span>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                    {currentOrder.status}
                  </span>
                  <div className="text-[10px] text-neutral-400 mt-1">
                    Booked on {currentOrder.createdAt}
                  </div>
                </div>
              </div>

              {/* Progress Milestones */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                  Optimization Workflow Milestones
                </div>

                <div className="space-y-2">
                  {stages.map((stage, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                        stage.completed
                          ? 'border-emerald-200 bg-emerald-50/40 text-emerald-950'
                          : 'border-neutral-200 bg-white text-neutral-500'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                          stage.completed ? 'bg-emerald-600 text-white' : 'bg-neutral-100 text-neutral-400'
                        }`}>
                          {stage.completed ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-3.5 h-3.5" />}
                        </div>
                        <span className={`font-medium ${stage.completed ? 'text-neutral-900 font-semibold' : 'text-neutral-500'}`}>
                          {stage.name}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-neutral-400">
                        {stage.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverable Mock Document Card */}
              <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white border border-blue-200 flex items-center justify-center text-blue-600">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-neutral-900">Optimization Audit & Delivery Report</div>
                    <div className="text-[11px] text-neutral-500">PDF breakdown of secondary categories, local keywords, and attributes.</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => alert(`Deliverable Report for ${currentOrder.businessName} (${currentOrder.id}) will be sent to WhatsApp & Email upon final review!`)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-800 rounded-lg text-xs font-semibold whitespace-nowrap shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5 text-blue-600" />
                  <span>Report Summary</span>
                </button>
              </div>

              {/* Assistance */}
              <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-600 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Assigned Specialist: <strong>Pooja M. (Senior Local SEO Lead)</strong></span>
                </div>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  WhatsApp Support →
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-neutral-50 border-t border-neutral-200 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Close Tracker
          </button>
        </div>

      </div>
    </div>
  );
};
