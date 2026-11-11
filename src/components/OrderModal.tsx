import React, { useState, useEffect } from 'react';
import { PACKAGES, ADDON_SERVICES } from '../data/packages';
import { OrderRequest } from '../types';
import { X, Check, ArrowRight, ArrowLeft, ShieldCheck, QrCode, Copy, CheckCheck, MessageSquare, AlertCircle } from 'lucide-react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackageId?: 'basic' | 'standard' | 'advanced';
  initialAddons?: string[];
  onOrderSuccess: (order: OrderRequest) => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  initialPackageId = 'standard',
  initialAddons = [],
  onOrderSuccess
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [selectedPkgId, setSelectedPkgId] = useState<'basic' | 'standard' | 'advanced'>(initialPackageId);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(initialAddons);
  
  const [businessName, setBusinessName] = useState('');
  const [mapsUrlOrAddress, setMapsUrlOrAddress] = useState('');
  const [category, setCategory] = useState('Retail & Local Shop');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [profileState, setProfileState] = useState<'verified' | 'unverified' | 'suspended' | 'unclaimed' | 'unsure'>('verified');
  const [notes, setNotes] = useState('');

  // Compliance acknowledgments
  const [agreeSingleLocation, setAgreeSingleLocation] = useState(false);
  const [agreeAuthenticData, setAgreeAuthenticData] = useState(false);
  const [agreeNoRankGuarantee, setAgreeNoRankGuarantee] = useState(false);
  const [agreeManagerAccess, setAgreeManagerAccess] = useState(false);

  // Payment state
  const [paymentTab, setPaymentTab] = useState<'upi' | 'whatsapp'>('upi');
  const [utrNumber, setUtrNumber] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<OrderRequest | null>(null);

  // Sync state if initial props change
  useEffect(() => {
    if (initialPackageId) setSelectedPkgId(initialPackageId);
  }, [initialPackageId]);

  useEffect(() => {
    if (initialAddons.length > 0) setSelectedAddons(initialAddons);
  }, [initialAddons]);

  if (!isOpen) return null;

  const currentPkg = PACKAGES.find((p) => p.id === selectedPkgId) || PACKAGES[1];

  const addonsTotal = selectedAddons.reduce((sum, addId) => {
    const item = ADDON_SERVICES.find((a) => a.id === addId);
    return sum + (item ? item.price : 0);
  }, 0);

  const grandTotal = currentPkg.price + addonsTotal;

  const handleToggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('pay.maprank@okhdfcbank');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleFinalSubmit = (paymentType: 'upi' | 'whatsapp') => {
    setIsSubmitting(true);
    
    // Generate order ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `GBP-${randomNum}`;

    const newOrder: OrderRequest = {
      id: orderId,
      createdAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      businessName: businessName.trim() || 'My Local Business',
      mapsUrlOrAddress: mapsUrlOrAddress.trim(),
      category,
      contactName: contactName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      packageId: selectedPkgId,
      addons: selectedAddons,
      totalPrice: grandTotal,
      status: 'Received',
      profileState,
      notes: notes.trim(),
      paymentMethod: paymentType,
      paymentConfirmed: paymentType === 'upi' ? !!utrNumber : false
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setCreatedOrder(newOrder);
      onOrderSuccess(newOrder);

      // If WhatsApp order, open whatsapp link
      if (paymentType === 'whatsapp') {
        const text = encodeURIComponent(
          `Hello MapRank Pro! I want to confirm my Google Maps Optimization order:\n` +
          `• Order ID: ${orderId}\n` +
          `• Business: ${newOrder.businessName}\n` +
          `• Package: ${currentPkg.name} (₹${currentPkg.price})\n` +
          `• Total Amount: ₹${grandTotal}\n` +
          `• Phone: ${newOrder.phone}\n` +
          `• Link/Address: ${newOrder.mapsUrlOrAddress}\n` +
          `Please share payment details & manager invite email.`
        );
        window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
      }
    }, 600);
  };

  const isStep2Valid = businessName.trim().length > 1 && contactName.trim().length > 1 && phone.trim().length >= 10;
  const isStep3Valid = agreeSingleLocation && agreeAuthenticData && agreeNoRankGuarantee && agreeManagerAccess;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-6">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/70">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-neutral-900">
              {createdOrder ? 'Order Confirmed!' : 'Request Google Maps Optimization'}
            </h3>
            {!createdOrder && (
              <p className="text-xs text-neutral-500">
                Step {step} of 4: {step === 1 ? 'Select Package & Add-ons' : step === 2 ? 'Business Details' : step === 3 ? 'Rules & Compliance' : 'Checkout & Payment'}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          
          {createdOrder ? (
            /* Success Screen */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-bold text-neutral-900">
                  Optimization Request Received!
                </h4>
                <div className="text-xs text-neutral-600">
                  Tracking ID: <strong className="font-mono text-blue-700 text-sm font-bold">{createdOrder.id}</strong>
                </div>
              </div>

              {/* Order summary receipt */}
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between py-1 border-b border-neutral-200 font-semibold text-neutral-900">
                  <span>Business Name</span>
                  <span>{createdOrder.businessName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-200">
                  <span>Selected Package</span>
                  <span>{currentPkg.name} (₹{currentPkg.price})</span>
                </div>
                {selectedAddons.length > 0 && (
                  <div className="flex justify-between py-1 border-b border-neutral-200 text-neutral-600">
                    <span>Add-ons ({selectedAddons.length})</span>
                    <span>+₹{addonsTotal}</span>
                  </div>
                )}
                <div className="flex justify-between py-1 text-sm font-bold text-neutral-900">
                  <span>Total Amount</span>
                  <span className="tabular-nums">₹{createdOrder.totalPrice}</span>
                </div>
              </div>

              {/* Next Steps Card */}
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="font-bold text-blue-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-700" />
                  <span>Immediate Next Steps</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-neutral-700 text-[11px]">
                  <li>Invite our team email <code className="bg-white px-1.5 py-0.5 rounded text-blue-800 font-mono">team.optimize@maprankpro.in</code> as <strong>Manager</strong> on Google Business Profile.</li>
                  <li>WhatsApp your authentic shop photos or queries to <strong className="text-neutral-900">+91 98765 43210</strong>.</li>
                  <li>Our specialist will begin the health audit and keyword optimization immediately.</li>
                </ol>
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-all shadow-xs"
                >
                  Done & Close
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* STEP 1: Package & Add-ons */}
              {step === 1 && (
                <div className="space-y-6">
                  {/* Package Selector */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                      1. Select Optimization Package:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {PACKAGES.map((pkg) => {
                        const isSelected = selectedPkgId === pkg.id;
                        return (
                          <div
                            key={pkg.id}
                            onClick={() => setSelectedPkgId(pkg.id)}
                            className={`cursor-pointer rounded-xl p-4 border transition-all flex flex-col justify-between ${
                              isSelected
                                ? 'border-2 border-blue-600 bg-blue-50/30 ring-1 ring-blue-600/20'
                                : 'border-neutral-200 hover:border-neutral-300 bg-white'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-neutral-900">{pkg.name}</span>
                                {pkg.isPopular && (
                                  <span className="text-[9px] bg-blue-600 text-white px-1.5 py-0.2 rounded font-bold">Best Value</span>
                                )}
                              </div>
                              <div className="text-lg font-extrabold text-neutral-900 mt-1 tabular-nums">
                                ₹{pkg.price}
                              </div>
                              <div className="text-[10px] text-neutral-500 mt-0.5">
                                Delivery: {pkg.deliveryDays}
                              </div>
                              <p className="text-[11px] text-neutral-600 mt-2 line-clamp-2">
                                {pkg.tagline}
                              </p>
                            </div>
                            <div className="mt-3 pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px]">
                              <span className={isSelected ? 'text-blue-600 font-bold' : 'text-neutral-400'}>
                                {isSelected ? 'Selected' : 'Click to select'}
                              </span>
                              {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Addons Selection */}
                  <div className="space-y-3 pt-3 border-t border-neutral-100">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                        2. Optional Add-On Boosters:
                      </label>
                      <span className="text-[11px] text-neutral-400">Click to toggle</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {ADDON_SERVICES.map((addon) => {
                        const isChecked = selectedAddons.includes(addon.id);
                        return (
                          <div
                            key={addon.id}
                            onClick={() => handleToggleAddon(addon.id)}
                            className={`cursor-pointer p-3 rounded-lg border text-xs flex items-center justify-between transition-colors ${
                              isChecked
                                ? 'border-blue-600 bg-blue-50/40 text-blue-900'
                                : 'border-neutral-200 hover:border-neutral-300 text-neutral-700'
                            }`}
                          >
                            <div className="pr-2">
                              <div className="font-semibold">{addon.title}</div>
                              <div className="text-[10px] text-neutral-500 line-clamp-1">{addon.description}</div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="font-bold text-neutral-900 tabular-nums">₹{addon.price}</span>
                              <div className={`w-4 h-4 rounded flex items-center justify-center border ${isChecked ? 'bg-blue-600 border-blue-600 text-white' : 'border-neutral-300'}`}>
                                {isChecked && <Check className="w-3 h-3" />}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Price Summary Strip */}
                  <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-neutral-500">Package ({currentPkg.name}): </span>
                      <strong className="text-neutral-900">₹{currentPkg.price}</strong>
                      {selectedAddons.length > 0 && (
                        <span className="text-neutral-500"> + {selectedAddons.length} Add-ons (₹{addonsTotal})</span>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-neutral-500 text-[11px] mr-1">Total:</span>
                      <strong className="text-base font-extrabold text-blue-700 tabular-nums">₹{grandTotal}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Business & Contact Info */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="text-xs text-neutral-500">
                    Provide the business location details for which optimization is requested.
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Business Name as on Board / Google Maps *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Royal Dental Clinic & Implant Center"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-xs text-neutral-900 focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Google Maps Link or Full Street Address *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Google Maps share link or Shop No., Road, City"
                        value={mapsUrlOrAddress}
                        onChange={(e) => setMapsUrlOrAddress(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-xs text-neutral-900 focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Primary Business Industry
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-xs text-neutral-900 focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                      >
                        <option value="Restaurant, Cafe & Food">Restaurant, Cafe & Food</option>
                        <option value="Salon, Spa & Beauty Parlor">Salon, Spa & Beauty Parlor</option>
                        <option value="Clinic, Hospital & Healthcare">Clinic, Hospital & Healthcare</option>
                        <option value="Retail & Local Shop">Retail & Local Shop</option>
                        <option value="Automobile, Garage & Spares">Automobile, Garage & Spares</option>
                        <option value="Home & Contractor Service">Home & Contractor Service</option>
                        <option value="Education & Coaching Center">Education & Coaching Center</option>
                        <option value="Other Business Service">Other Business Service</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Contact Person Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Patel"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-xs text-neutral-900 focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        WhatsApp / Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit mobile number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-xs text-neutral-900 focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="ramesh@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-xs text-neutral-900 focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Current Profile Status on Google:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      {[
                        { id: 'verified', label: 'Verified & Active' },
                        { id: 'unverified', label: 'Needs Verification' },
                        { id: 'suspended', label: 'Suspended' },
                        { id: 'unsure', label: 'Not Sure / Need Help' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setProfileState(item.id as any)}
                          className={`p-2 rounded-lg border text-left text-[11px] font-medium transition-colors ${
                            profileState === item.id
                              ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold'
                              : 'border-neutral-200 hover:bg-neutral-50 text-neutral-700'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Target Keywords / Competitors or Special Instructions (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Please analyze competitor ABC nearby. Focus on root canal & teeth whitening."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 text-xs text-neutral-900 focus:outline-hidden focus:border-blue-600"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: Business Rules & Compliance Confirmation */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900">
                    <strong>Mandatory Service Compliance:</strong> Please review and check all 4 confirmations to proceed.
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-start gap-3 p-3 rounded-xl border border-neutral-200 hover:bg-neutral-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreeSingleLocation}
                        onChange={(e) => setAgreeSingleLocation(e.target.checked)}
                        className="mt-0.5 w-4 h-4 text-blue-600 rounded border-neutral-300 focus:ring-blue-500"
                      />
                      <div className="text-xs text-neutral-700">
                        <strong className="text-neutral-900 block">1. Single Location Scope:</strong>
                        I understand this service covers one Google Maps profile location only.
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 rounded-xl border border-neutral-200 hover:bg-neutral-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreeAuthenticData}
                        onChange={(e) => setAgreeAuthenticData(e.target.checked)}
                        className="mt-0.5 w-4 h-4 text-blue-600 rounded border-neutral-300 focus:ring-blue-500"
                      />
                      <div className="text-xs text-neutral-700">
                        <strong className="text-neutral-900 block">2. Authentic Information & Media:</strong>
                        I certify that my business information is genuine and photos provided are authentic pictures of my establishment.
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 rounded-xl border border-neutral-200 hover:bg-neutral-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreeNoRankGuarantee}
                        onChange={(e) => setAgreeNoRankGuarantee(e.target.checked)}
                        className="mt-0.5 w-4 h-4 text-blue-600 rounded border-neutral-300 focus:ring-blue-500"
                      />
                      <div className="text-xs text-neutral-700">
                        <strong className="text-neutral-900 block">3. Algorithmic Ranking Disclaimer:</strong>
                        I acknowledge that specific rank positions cannot be guaranteed because Google's algorithm decides rankings dynamically based on searcher proximity, relevance, and prominence.
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 rounded-xl border border-neutral-200 hover:bg-neutral-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreeManagerAccess}
                        onChange={(e) => setAgreeManagerAccess(e.target.checked)}
                        className="mt-0.5 w-4 h-4 text-blue-600 rounded border-neutral-300 focus:ring-blue-500"
                      />
                      <div className="text-xs text-neutral-700">
                        <strong className="text-neutral-900 block">4. Ownership Protection (Manager Role):</strong>
                        I will retain primary ownership and invite the agency only as a "Manager" through Google Business Profile settings.
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {/* STEP 4: Checkout & Payment Choice */}
              {step === 4 && (
                <div className="space-y-6">
                  {/* Order Summary Strip */}
                  <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2 text-xs">
                    <div className="flex justify-between font-bold text-neutral-900">
                      <span>Order Summary:</span>
                      <span className="text-blue-700">{currentPkg.name}</span>
                    </div>
                    <div className="flex justify-between text-neutral-600">
                      <span>Business Name:</span>
                      <span>{businessName}</span>
                    </div>
                    {selectedAddons.length > 0 && (
                      <div className="flex justify-between text-neutral-600">
                        <span>Selected Add-ons:</span>
                        <span>{selectedAddons.length} included</span>
                      </div>
                    )}
                    <div className="pt-2 border-t border-neutral-200 flex justify-between font-extrabold text-sm text-neutral-900">
                      <span>Total Payable:</span>
                      <span className="text-base text-blue-700 tabular-nums">₹{grandTotal}</span>
                    </div>
                  </div>

                  {/* Payment Tabs */}
                  <div className="space-y-3">
                    <div className="flex rounded-lg p-1 bg-neutral-100 border border-neutral-200">
                      <button
                        type="button"
                        onClick={() => setPaymentTab('upi')}
                        className={`flex-1 py-2 text-xs font-bold rounded-md transition-colors flex items-center justify-center gap-2 ${
                          paymentTab === 'upi' ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-600'
                        }`}
                      >
                        <QrCode className="w-4 h-4 text-blue-600" />
                        <span>Instant UPI QR (GPay / PhonePe / Paytm)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentTab('whatsapp')}
                        className={`flex-1 py-2 text-xs font-bold rounded-md transition-colors flex items-center justify-center gap-2 ${
                          paymentTab === 'whatsapp' ? 'bg-white text-emerald-800 shadow-2xs' : 'text-neutral-600'
                        }`}
                      >
                        <MessageSquare className="w-4 h-4 text-emerald-600" />
                        <span>Order & Pay via WhatsApp</span>
                      </button>
                    </div>

                    {paymentTab === 'upi' ? (
                      <div className="p-4 rounded-xl border border-neutral-200 bg-white space-y-4 text-center">
                        <div className="max-w-[180px] mx-auto p-3 rounded-xl bg-neutral-50 border border-neutral-200 shadow-2xs">
                          {/* Clean SVG simulation of standard UPI QR */}
                          <div className="w-36 h-36 mx-auto bg-neutral-900 rounded-lg p-2 flex flex-col justify-between text-white">
                            <div className="flex justify-between">
                              <div className="w-8 h-8 border-2 border-white rounded-xs p-1"><div className="w-full h-full bg-white" /></div>
                              <div className="w-8 h-8 border-2 border-white rounded-xs p-1"><div className="w-full h-full bg-white" /></div>
                            </div>
                            <div className="text-[10px] font-mono tracking-widest text-center text-blue-300">
                              SCAN & PAY ₹{grandTotal}
                            </div>
                            <div className="flex justify-between">
                              <div className="w-8 h-8 border-2 border-white rounded-xs p-1"><div className="w-full h-full bg-white" /></div>
                              <div className="w-4 h-4 bg-white rounded-xs" />
                            </div>
                          </div>
                          <div className="text-[10px] text-neutral-500 mt-2 font-medium">
                            Scan with any UPI App
                          </div>
                        </div>

                        {/* UPI ID copy */}
                        <div className="flex items-center justify-center gap-2 text-xs">
                          <span className="text-neutral-500">UPI ID:</span>
                          <code className="bg-neutral-100 px-2 py-1 rounded font-mono font-bold text-neutral-900">
                            pay.maprank@okhdfcbank
                          </code>
                          <button
                            type="button"
                            onClick={handleCopyUpi}
                            className="p-1 rounded text-neutral-500 hover:text-blue-600 hover:bg-neutral-100 transition-colors"
                            title="Copy UPI ID"
                          >
                            {copiedUpi ? <CheckCheck className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>

                        <div className="text-left space-y-1 pt-2 border-t border-neutral-100">
                          <label className="block text-xs font-bold text-neutral-700">
                            Enter UPI Transaction / UTR Ref No. (Optional or after payment):
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. 439281928190"
                            value={utrNumber}
                            onChange={(e) => setUtrNumber(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs text-neutral-900"
                          />
                        </div>

                        <button
                          type="button"
                          disabled={isSubmitting}
                          onClick={() => handleFinalSubmit('upi')}
                          className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                        >
                          {isSubmitting ? 'Confirming Order...' : `Confirm & Place Order (₹${grandTotal})`}
                        </button>
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30 space-y-4 text-center">
                        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                          <MessageSquare className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold text-neutral-900">
                            Chat & Order Directly on WhatsApp
                          </h4>
                          <p className="text-xs text-neutral-600 max-w-sm mx-auto">
                            Prefer human assistance? Our local SEO manager will verify your listing link, discuss keywords, and share official bank invoice details on WhatsApp.
                          </p>
                        </div>
                        <button
                          type="button"
                          disabled={isSubmitting}
                          onClick={() => handleFinalSubmit('whatsapp')}
                          className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>Send Details & Order on WhatsApp</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

        </div>

        {/* Modal Controls / Footer */}
        {!createdOrder && (
          <div className="px-6 py-4 bg-neutral-50/90 border-t border-neutral-200 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((step - 1) as any)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 py-2 px-3 rounded-lg hover:bg-neutral-200/60 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div className="text-xs text-neutral-500">
                1-time fee for 1 location
              </div>
            )}

            {step === 1 && (
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs"
              >
                <span>Continue to Business Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {step === 2 && (
              <button
                type="button"
                disabled={!isStep2Valid}
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-bold transition-all shadow-xs"
              >
                <span>Next: Review Rules</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {step === 3 && (
              <button
                type="button"
                disabled={!isStep3Valid}
                onClick={() => setStep(4)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-bold transition-all shadow-xs"
              >
                <span>Proceed to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
