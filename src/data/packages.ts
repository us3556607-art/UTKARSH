import { OptimizationPackage, AddonService, ComparisonRow } from '../types';

export const PACKAGES: OptimizationPackage[] = [
  {
    id: 'basic',
    name: 'Basic Optimization',
    tier: '🥉 Tier 1',
    price: 399,
    deliveryDays: '1–2 working days',
    tagline: 'Best for beginners',
    description: 'For small businesses that need essential profile health check and foundational accuracy updates.',
    isPopular: false,
    features: [
      'Business Profile Health Check',
      'Business Name Verification',
      'Business Address Check',
      'Phone Number Verification',
      'Business Hours Optimization',
      'Primary Category Check',
      'Business Description Improvement',
      'Website Link Verification',
      'Basic Profile Accuracy Check'
    ]
  },
  {
    id: 'standard',
    name: 'Standard Optimization',
    tier: '🥈 Tier 2',
    price: 599,
    deliveryDays: '2–3 working days',
    tagline: 'Best value for small businesses',
    description: 'For businesses that want a more professional, keyword-rich Google Maps presence with competitor insights.',
    isPopular: true,
    highlightDifference: 'Only ₹200 more than Basic — unlocks keyword research, category tuning & competitor audit',
    features: [
      'Everything in Basic, plus:',
      'Primary & Secondary Category Optimization',
      'SEO-Friendly Business Description',
      'Local Keyword Research (up to 5 keywords)',
      'Products & Services Optimization',
      'Business Attributes Optimization',
      'Opening Hours and Special Hours Check',
      'WhatsApp Link Setup (if supported)',
      'Photo Upload (up to 5 photos provided by customer)',
      'Competitor Profile Analysis (up to 2 competitors)',
      'Profile Completeness Report'
    ]
  },
  {
    id: 'advanced',
    name: 'Advanced Optimization',
    tier: '🥇 Tier 3',
    price: 999,
    deliveryDays: '3–5 working days',
    tagline: 'Recommended for serious business growth',
    description: 'Comprehensive 360° profile optimization with Google Posts, in-depth competitor strategy and audit report.',
    isPopular: false,
    features: [
      'Everything in Standard, plus:',
      'Advanced Local Keyword Research (up to 10 keywords)',
      'Advanced Business Description Optimization',
      'Complete Products & Services Optimization',
      'Competitor Analysis (up to 5 competitors)',
      'Photo Upload (up to 10 customer-provided photos)',
      'Google Business Profile Q&A Review',
      'Review Management Strategy',
      'Google Business Post Creation (2 posts)',
      'Local SEO Recommendations',
      'Website and Social Link Verification',
      'Complete Profile Audit',
      'Before-and-After Optimization Report'
    ]
  }
];

export const COMPARISON_DATA: ComparisonRow[] = [
  {
    feature: 'Profile Health Check',
    basic: '✓',
    standard: '✓',
    advanced: '✓',
    tooltip: 'Deep audit of profile completeness and flags'
  },
  {
    feature: 'Business Information Check',
    basic: '✓',
    standard: '✓',
    advanced: '✓',
    tooltip: 'Name, address, contact phone & website consistency'
  },
  {
    feature: 'Business Hours & Holidays',
    basic: '✓',
    standard: '✓',
    advanced: '✓',
    tooltip: 'Regular hours and special holiday hours alignment'
  },
  {
    feature: 'Category Optimization',
    basic: 'Basic',
    standard: 'Advanced',
    advanced: 'Advanced',
    tooltip: 'Selection of highest-relevance primary and secondary categories'
  },
  {
    feature: 'Business Description',
    basic: '✓',
    standard: '✓',
    advanced: '✓',
    tooltip: 'Engaging, clean and informative 750-character profile description'
  },
  {
    feature: 'Local Keyword Research',
    basic: '—',
    standard: '5 Keywords',
    advanced: '10 Keywords',
    tooltip: 'Targeted search terms shoppers use locally in your area'
  },
  {
    feature: 'Products & Services Optimization',
    basic: '—',
    standard: '✓',
    advanced: '✓',
    tooltip: 'Item catalog setup with prices, descriptions and CTA buttons'
  },
  {
    feature: 'Business Attributes',
    basic: '—',
    standard: '✓',
    advanced: '✓',
    tooltip: 'Amenities, payment options, accessibility, and service options'
  },
  {
    feature: 'Photo Uploads (Customer Provided)',
    basic: '—',
    standard: '5 Photos',
    advanced: '10 Photos',
    tooltip: 'Geotagged & metadata-optimized imagery uploaded to profile'
  },
  {
    feature: 'Competitor Profile Analysis',
    basic: '—',
    standard: '2 Competitors',
    advanced: '5 Competitors',
    tooltip: 'Benchmark against top local businesses in your category'
  },
  {
    feature: 'Q&A Review & Strategy',
    basic: '—',
    standard: '—',
    advanced: '✓',
    tooltip: 'Audit and seed high-intent customer FAQ questions & answers'
  },
  {
    feature: 'Google Business Posts',
    basic: '—',
    standard: '—',
    advanced: '2 Posts',
    tooltip: 'Creation and scheduling of professional announcement/offer posts'
  },
  {
    feature: 'Review Management Strategy',
    basic: '—',
    standard: '—',
    advanced: '✓',
    tooltip: 'Proven playbook for generating genuine 5-star customer reviews'
  },
  {
    feature: 'Final Deliverable Report',
    basic: 'Basic Summary',
    standard: 'Detailed Report',
    advanced: 'Before & After Audit',
    tooltip: 'Comprehensive PDF breakdown of all improvements executed'
  }
];

export const ADDON_SERVICES: AddonService[] = [
  {
    id: 'addon_post',
    title: 'Extra Google Business Post',
    price: 99,
    description: 'High-converting promotional update with custom graphic text and CTA button.'
  },
  {
    id: 'addon_photos',
    title: '5 Additional Photo Uploads',
    price: 99,
    description: 'Metadata optimization, proper categorization (interior/exterior) and upload.'
  },
  {
    id: 'addon_description',
    title: 'Business Description Writing',
    price: 149,
    description: 'Persuasive, keyword-infused 750-character copy crafted by local SEO copywriters.'
  },
  {
    id: 'addon_review_reply',
    title: 'Review Reply Assistance',
    price: 199,
    description: 'Professional, SEO-conscious replies drafted for your latest 10 customer reviews.'
  },
  {
    id: 'addon_keyword_research',
    title: 'Local Keyword Research',
    price: 199,
    description: 'Dedicated keyword report detailing high-intent regional search volume.'
  },
  {
    id: 'addon_competitor',
    title: 'Competitor Analysis',
    price: 199,
    description: 'In-depth breakdown of top 3 local competitors, categories and strengths.'
  },
  {
    id: 'addon_monthly_monitor',
    title: 'Monthly Profile Monitoring',
    price: 299,
    description: 'Monthly health check, duplicate watch, and algorithmic update monitoring.',
    isMonthly: true
  },
  {
    id: 'addon_location',
    title: 'Additional Location Optimization',
    price: 499,
    description: 'Apply matching standard optimization to a 2nd branch or outlet location.'
  }
];

export const BUSINESS_RULES = [
  {
    title: 'Single Location Coverage',
    rule: 'All package prices cover exactly one Google Business Profile location. Multi-location chains require separate package orders or the location add-on.'
  },
  {
    title: 'Authentic Data & Photos',
    rule: 'Customers must provide genuine business information, legal addresses, and authentic photos taken of their actual establishment.'
  },
  {
    title: 'No Guaranteed #1 Rankings',
    rule: 'We do not guarantee specific Google Maps ranking positions. Google rankings depend on proprietary algorithms factoring distance, relevance, prominence, and searcher intent.'
  },
  {
    title: 'Customer Retains Full Ownership',
    rule: 'Primary profile ownership and Master account access remain 100% with the customer. You invite our agency as a "Manager" — never share your personal Google password.'
  },
  {
    title: 'Google Verification & Policy Discretion',
    rule: 'Google Business verification, postcard delivery, suspensions, reinstatements, and profile approvals are strictly controlled and determined by Google LLC.'
  },
  {
    title: 'One-Time Service Delivery',
    rule: 'Basic, Standard, and Advanced are one-time comprehensive optimization services delivered with full verification reports upon completion.'
  }
];
