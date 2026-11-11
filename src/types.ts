export interface OptimizationPackage {
  id: 'basic' | 'standard' | 'advanced';
  name: string;
  tier: string;
  price: number;
  deliveryDays: string;
  tagline: string;
  description: string;
  isPopular?: boolean;
  highlightDifference?: string;
  features: string[];
}

export interface AddonService {
  id: string;
  title: string;
  price: number;
  description: string;
  isMonthly?: boolean;
}

export interface ComparisonRow {
  feature: string;
  basic: string;
  standard: string;
  advanced: string;
  tooltip?: string;
}

export interface OrderRequest {
  id: string;
  createdAt: string;
  businessName: string;
  mapsUrlOrAddress: string;
  category: string;
  contactName: string;
  phone: string;
  email: string;
  packageId: 'basic' | 'standard' | 'advanced';
  addons: string[];
  totalPrice: number;
  status: 'Received' | 'Manager Access Pending' | 'In Optimization' | 'Report Generated' | 'Delivered';
  profileState: 'verified' | 'unverified' | 'suspended' | 'unclaimed' | 'unsure';
  notes?: string;
  paymentMethod: 'upi' | 'whatsapp' | 'card_netbanking';
  paymentConfirmed: boolean;
}
