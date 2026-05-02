/**
 * Dummy Data for GreenMark
 * Mock data for development and testing
 */

export const DUMMY_USER = {
  id: 'user_123',
  name: 'Rajesh Kumar',
  email: 'rajesh@greenmark.io',
  businessName: 'Happy Café',
  businessType: 'café',
  city: 'Bangalore',
  employees: 5,
  revenueRange: '10-50L',
  totalEmissions: 8.4,
  totalOffset: 2.1,
  createdAt: '2026-01-15',
};

export const BUSINESS_TYPES = [
  { id: 'cafe', label: 'Café', icon: '☕' },
  { id: 'restaurant', label: 'Restaurant', icon: '🍽️' },
  { id: 'bakery', label: 'Bakery', icon: '🍪' },
  { id: 'cloud_kitchen', label: 'Cloud Kitchen', icon: '🔥' },
  { id: 'other', label: 'Other', icon: '📦' },
];

export const CITIES = [
  'Bangalore',
  'Mumbai',
  'Delhi',
  'Hyderabad',
  'Pune',
  'Kolkata',
  'Chennai',
  'Jaipur',
  'Ahmedabad',
  'Lucknow',
];

export const DUMMY_EMISSIONS = {
  electricity: {
    monthly: 400,
    unit: 'kWh',
    co2: 3.2,
  },
  lpg: {
    monthly: 25,
    unit: 'cylinders',
    co2: 2.1,
  },
  waste: {
    category: '5-15 kg',
    co2: 1.5,
  },
  transport: {
    deliveryApps: ['zomato', 'swiggy'],
    co2: 1.6,
  },
  total: 8.4,
};

export const DUMMY_OFFSET_PROJECTS = [
  {
    id: 'project_1',
    name: 'Amazon Forest Restoration',
    location: 'Brazil',
    image: '🌳',
    type: 'Forest',
    co2Offset: 5000,
    price: 2500,
    families: 150,
    yearsRunning: 8,
    verified: true,
    description: 'Restore and protect Amazon rainforest for carbon sequestration and biodiversity.',
  },
  {
    id: 'project_2',
    name: 'Solar Energy Initiative',
    location: 'Gujarat, India',
    image: '☀️',
    type: 'Solar',
    co2Offset: 3000,
    price: 1500,
    families: 200,
    yearsRunning: 5,
    verified: true,
    description: 'Install solar panels in rural villages to provide clean energy.',
  },
  {
    id: 'project_3',
    name: 'Biogas Production',
    location: 'West Bengal, India',
    image: '💨',
    type: 'Biogas',
    co2Offset: 2000,
    price: 1000,
    families: 100,
    yearsRunning: 3,
    verified: true,
    description: 'Convert agricultural waste into biogas for cooking and electricity.',
  },
  {
    id: 'project_4',
    name: 'Wind Farm Development',
    location: 'Tamil Nadu, India',
    image: '💨',
    type: 'Wind',
    co2Offset: 4500,
    price: 2200,
    families: 180,
    yearsRunning: 6,
    verified: true,
    description: 'Generate renewable energy through modern wind turbines.',
  },
  {
    id: 'project_5',
    name: 'Mangrove Forest Protection',
    location: 'Sundarbans, India',
    image: '🌿',
    type: 'Forest',
    co2Offset: 3500,
    price: 1800,
    families: 120,
    yearsRunning: 4,
    verified: true,
    description: 'Protect and expand mangrove ecosystems for carbon storage.',
  },
];

export const DUMMY_CERTIFICATES = [
  {
    id: 'cert_001',
    businessName: 'Happy Café',
    co2Offset: 2.1,
    projectName: 'Amazon Forest Restoration',
    issueDate: '2026-04-15',
    expiryDate: '2027-04-15',
    verifiedBy: 'Verra',
    certificateNumber: 'CERT-2026-001',
  },
  {
    id: 'cert_002',
    businessName: 'Happy Café',
    co2Offset: 1.5,
    projectName: 'Solar Energy Initiative',
    issueDate: '2026-03-10',
    expiryDate: '2027-03-10',
    verifiedBy: 'Verra',
    certificateNumber: 'CERT-2026-002',
  },
];

export const DUMMY_ARTICLES = [
  {
    id: 'article_1',
    category: 'Basics',
    title: 'What is a Carbon Footprint?',
    excerpt: 'Learn the basics of carbon emissions and how it impacts our environment.',
    content: 'A carbon footprint is the total amount of greenhouse gases produced directly and indirectly by human actions. It is usually measured in tons of carbon dioxide equivalent (CO₂e).',
    readTime: 5,
  },
  {
    id: 'article_2',
    category: 'Carbon Credits',
    title: 'How Carbon Credits Work',
    excerpt: 'Understanding carbon credit systems and offsetting.',
    content: 'Carbon credits are permits that allow the holder to emit one ton of carbon dioxide. They are used by businesses to offset their emissions.',
    readTime: 7,
  },
  {
    id: 'article_3',
    category: 'Policy',
    title: 'India\'s Net Zero 2070 Plan',
    excerpt: 'India\'s commitment to achieving net-zero emissions by 2070.',
    content: 'India has committed to achieving net-zero carbon emissions by 2070. This involves transitioning to renewable energy and implementing sustainable practices.',
    readTime: 8,
  },
  {
    id: 'article_4',
    category: 'Basics',
    title: 'Small Business Carbon Impact',
    excerpt: 'How small businesses contribute to global emissions.',
    content: 'Small and medium enterprises contribute significantly to global carbon emissions through energy use, waste, and logistics.',
    readTime: 6,
  },
];

export const DUMMY_PAYMENT_METHODS = [
  { id: 'upi', name: 'UPI', icon: '🔷', default: true },
  { id: 'gpay', name: 'Google Pay', icon: '🔵' },
  { id: 'phonepe', name: 'PhonePe', icon: '🟣' },
  { id: 'paytm', name: 'Paytm', icon: '🟦' },
];

export const DUMMY_TRANSACTIONS = [
  {
    id: 'txn_001',
    type: 'purchase',
    projectName: 'Amazon Forest Restoration',
    amount: 2500,
    credits: 5,
    date: '2026-04-15',
    status: 'completed',
  },
  {
    id: 'txn_002',
    type: 'purchase',
    projectName: 'Solar Energy Initiative',
    amount: 1500,
    credits: 3,
    date: '2026-03-10',
    status: 'completed',
  },
  {
    id: 'txn_003',
    type: 'calculator',
    businessName: 'Happy Café',
    emissions: 8.4,
    date: '2026-02-01',
    status: 'completed',
  },
];

export const DUMMY_DASHBOARD_STATS = {
  totalEmissions: 8.4,
  totalOffset: 2.1,
  treesEquivalent: 125,
  energySaved: 450, // kWh
  familiesHelped: 80,
  certificatesEarned: 2,
};

export default {
  DUMMY_USER,
  BUSINESS_TYPES,
  CITIES,
  DUMMY_EMISSIONS,
  DUMMY_OFFSET_PROJECTS,
  DUMMY_CERTIFICATES,
  DUMMY_ARTICLES,
  DUMMY_PAYMENT_METHODS,
  DUMMY_TRANSACTIONS,
  DUMMY_DASHBOARD_STATS,
};
