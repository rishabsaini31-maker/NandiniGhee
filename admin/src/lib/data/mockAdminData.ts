import { Order, Product, Transaction, CustomerUser, QualityBatch } from '../types';

export const mockOrders: Order[] = [
  {
    id: 'ORD-9821',
    customerName: 'Ananya Sharma',
    customerEmail: 'ananya.s@example.com',
    customerPhone: '+91 98450 12345',
    address: 'Flat 402, Royal Palms, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    items: [
      { id: '1', name: 'Nandini Vedic A2 Gir Cow Ghee (1L)', quantity: 2, price: 1450, weight: '1000ml' },
      { id: '4', name: 'Premium Kashmiri Mamra Almonds (500g)', quantity: 1, price: 920, weight: '500g' }
    ],
    totalAmount: 3820,
    status: 'processing',
    paymentMethod: 'UPI',
    paymentStatus: 'paid',
    trackingNumber: 'BLR-EXP-90812',
    createdAt: '2026-09-03 17:42'
  },
  {
    id: 'ORD-9820',
    customerName: 'Vikramaditya Hegde',
    customerEmail: 'vikram.hegde@example.com',
    customerPhone: '+91 99801 88765',
    address: 'Villa 18, Prestige Oasis, Doddaballapur Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    items: [
      { id: '2', name: 'Nandini Pure Desi Cow Ghee (500ml Glass Jar)', quantity: 4, price: 420, weight: '500ml' },
      { id: '6', name: 'Royal Festive Brass Diya & Ghee Hamper', quantity: 1, price: 2850, weight: 'Combo' }
    ],
    totalAmount: 4530,
    status: 'dispatched',
    paymentMethod: 'Card',
    paymentStatus: 'paid',
    trackingNumber: 'IND-POST-44390',
    createdAt: '2026-09-03 15:20'
  },
  {
    id: 'ORD-9819',
    customerName: 'Priya Sundaram',
    customerEmail: 'priya.sundaram@example.com',
    customerPhone: '+91 94432 99011',
    address: '88, TTK Road, Alwarpet',
    city: 'Chennai',
    state: 'Tamil Nadu',
    items: [
      { id: '1', name: 'Nandini Vedic A2 Gir Cow Ghee (1L)', quantity: 1, price: 1450, weight: '1000ml' }
    ],
    totalAmount: 1450,
    status: 'delivered',
    paymentMethod: 'UPI',
    paymentStatus: 'paid',
    trackingNumber: 'DTDC-778210',
    createdAt: '2026-09-03 11:15'
  },
  {
    id: 'ORD-9818',
    customerName: 'Rajesh Mehra',
    customerEmail: 'mehra.rajesh@example.com',
    customerPhone: '+91 98110 54321',
    address: 'B-14, Greater Kailash 1',
    city: 'New Delhi',
    state: 'Delhi NCR',
    items: [
      { id: '3', name: 'Traditional Bilona Buffalo Ghee (1L)', quantity: 2, price: 890, weight: '1000ml' },
      { id: '5', name: 'King Jumbo Cashews & Pistachios Box', quantity: 2, price: 1150, weight: '800g' }
    ],
    totalAmount: 4080,
    status: 'pending',
    paymentMethod: 'COD',
    paymentStatus: 'pending',
    createdAt: '2026-09-03 18:05'
  },
  {
    id: 'ORD-9817',
    customerName: 'Kavitha Ranganathan',
    customerEmail: 'kavitha.r@example.com',
    customerPhone: '+91 97312 34567',
    address: '12th Cross, Malleshwaram',
    city: 'Bengaluru',
    state: 'Karnataka',
    items: [
      { id: '1', name: 'Nandini Vedic A2 Gir Cow Ghee (1L)', quantity: 3, price: 1450, weight: '1000ml' }
    ],
    totalAmount: 4350,
    status: 'delivered',
    paymentMethod: 'UPI',
    paymentStatus: 'paid',
    trackingNumber: 'BLR-EXP-90781',
    createdAt: '2026-09-02 19:30'
  }
];

export const mockProducts: Product[] = [
  {
    id: 'PROD-001',
    name: 'Nandini Vedic A2 Gir Cow Ghee (1L Wooden Churned)',
    sku: 'NG-A2-1000ML',
    category: 'A2 Vedic Bilona',
    price: 1450,
    originalPrice: 1650,
    stock: 142,
    rating: 4.9,
    salesCount: 1840,
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300&auto=format&fit=crop&q=60',
    status: 'in_stock',
    batchNumber: 'NDN-2026-A2-09'
  },
  {
    id: 'PROD-002',
    name: 'Nandini Pure Desi Cow Ghee (500ml Glass Jar)',
    sku: 'NG-COW-500ML',
    category: 'Desi Cow Ghee',
    price: 420,
    originalPrice: 480,
    stock: 280,
    rating: 4.8,
    salesCount: 3420,
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300&auto=format&fit=crop&q=60',
    status: 'in_stock',
    batchNumber: 'NDN-2026-CG-14'
  },
  {
    id: 'PROD-003',
    name: 'Traditional Bilona Buffalo Ghee (1L Clay Fermented)',
    sku: 'NG-BUF-1000ML',
    category: 'Buffalo Ghee',
    price: 890,
    originalPrice: 990,
    stock: 18,
    rating: 4.7,
    salesCount: 890,
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=300&auto=format&fit=crop&q=60',
    status: 'low_stock',
    batchNumber: 'NDN-2026-BG-03'
  },
  {
    id: 'PROD-004',
    name: 'Royal Heritage Kashmiri Mamra Almonds (500g)',
    sku: 'NG-DF-MAMRA-500',
    category: 'Dry Fruits',
    price: 920,
    originalPrice: 1100,
    stock: 65,
    rating: 4.9,
    salesCount: 650,
    image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=300&auto=format&fit=crop&q=60',
    status: 'in_stock',
    batchNumber: 'NDN-2026-DF-08'
  },
  {
    id: 'PROD-005',
    name: 'Royal Festive Brass Diya & Ghee Hamper Gift Box',
    sku: 'NG-GIFT-ROYAL-BOX',
    category: 'Gift Hampers',
    price: 2850,
    originalPrice: 3400,
    stock: 8,
    rating: 5.0,
    salesCount: 310,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=300&auto=format&fit=crop&q=60',
    status: 'low_stock',
    batchNumber: 'NDN-2026-HMP-01'
  },
  {
    id: 'PROD-006',
    name: 'Organic Desi Cow Ghee (15kg Bulk Catering Tin)',
    sku: 'NG-BULK-15KG',
    category: 'Desi Cow Ghee',
    price: 9800,
    originalPrice: 10500,
    stock: 0,
    rating: 4.9,
    salesCount: 95,
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300&auto=format&fit=crop&q=60',
    status: 'out_of_stock',
    batchNumber: 'NDN-2026-BLK-04'
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: 'TXN-77391',
    orderId: 'ORD-9821',
    customerName: 'Ananya Sharma',
    amount: 3820,
    fee: 45.84,
    netAmount: 3774.16,
    gateway: 'Razorpay',
    method: 'UPI',
    status: 'settled',
    date: '2026-09-03 17:43'
  },
  {
    id: 'TXN-77390',
    orderId: 'ORD-9820',
    customerName: 'Vikramaditya Hegde',
    amount: 4530,
    fee: 81.54,
    netAmount: 4448.46,
    gateway: 'Razorpay',
    method: 'Credit Card',
    status: 'settled',
    date: '2026-09-03 15:21'
  },
  {
    id: 'TXN-77389',
    orderId: 'ORD-9819',
    customerName: 'Priya Sundaram',
    amount: 1450,
    fee: 17.40,
    netAmount: 1432.60,
    gateway: 'PhonePe',
    method: 'UPI',
    status: 'settled',
    date: '2026-09-03 11:16'
  },
  {
    id: 'TXN-77388',
    orderId: 'ORD-9818',
    customerName: 'Rajesh Mehra',
    amount: 4080,
    fee: 0,
    netAmount: 4080,
    gateway: 'COD',
    method: 'Cash',
    status: 'processing',
    date: '2026-09-03 18:05'
  },
  {
    id: 'TXN-77387',
    orderId: 'ORD-9815',
    customerName: 'Rohit Kulkarni',
    amount: 2900,
    fee: 34.80,
    netAmount: 2865.20,
    gateway: 'Razorpay',
    method: 'Debit Card',
    status: 'refunded',
    date: '2026-09-02 14:10'
  }
];

export const mockUsers: CustomerUser[] = [
  {
    id: 'USR-101',
    name: 'Ananya Sharma',
    email: 'ananya.s@example.com',
    phone: '+91 98450 12345',
    tier: 'VIP Platinum',
    totalOrders: 14,
    totalSpent: 48900,
    lastOrderDate: '2026-09-03',
    city: 'Bengaluru',
    state: 'Karnataka',
    status: 'active'
  },
  {
    id: 'USR-102',
    name: 'Vikramaditya Hegde',
    email: 'vikram.hegde@example.com',
    phone: '+91 99801 88765',
    tier: 'Gold',
    totalOrders: 8,
    totalSpent: 26400,
    lastOrderDate: '2026-09-03',
    city: 'Bengaluru',
    state: 'Karnataka',
    status: 'active'
  },
  {
    id: 'USR-103',
    name: 'Priya Sundaram',
    email: 'priya.sundaram@example.com',
    phone: '+91 94432 99011',
    tier: 'Silver',
    totalOrders: 4,
    totalSpent: 8750,
    lastOrderDate: '2026-09-03',
    city: 'Chennai',
    state: 'Tamil Nadu',
    status: 'active'
  },
  {
    id: 'USR-104',
    name: 'Rajesh Mehra',
    email: 'mehra.rajesh@example.com',
    phone: '+91 98110 54321',
    tier: 'Member',
    totalOrders: 1,
    totalSpent: 4080,
    lastOrderDate: '2026-09-03',
    city: 'New Delhi',
    state: 'Delhi NCR',
    status: 'active'
  },
  {
    id: 'USR-105',
    name: 'Kavitha Ranganathan',
    email: 'kavitha.r@example.com',
    phone: '+91 97312 34567',
    tier: 'VIP Platinum',
    totalOrders: 21,
    totalSpent: 72100,
    lastOrderDate: '2026-09-02',
    city: 'Bengaluru',
    state: 'Karnataka',
    status: 'active'
  }
];

export const mockBatches: QualityBatch[] = [
  {
    id: 'Q-01',
    batchNumber: 'NDN-2026-A2-09',
    productType: 'A2 Gir Cow Vedic Bilona Ghee',
    manufactureDate: '2026-09-01',
    expiryDate: '2027-08-31',
    purityIndex: 99.92,
    ffaPercent: 0.14,
    moisturePercent: 0.18,
    reichertValue: 30.4,
    aromaGrade: 'Grade A+ (Rich Nutty)',
    testedBy: 'Dr. M. Srinivasan (Senior Dairy QC Lead)',
    status: 'Certified Pure',
    totalJarsProduced: 850
  },
  {
    id: 'Q-02',
    batchNumber: 'NDN-2026-CG-14',
    productType: 'Pure Desi Cow Ghee (Golden Jar)',
    manufactureDate: '2026-08-28',
    expiryDate: '2027-08-27',
    purityIndex: 99.85,
    ffaPercent: 0.18,
    moisturePercent: 0.22,
    reichertValue: 29.2,
    aromaGrade: 'Grade A (Aromatic)',
    testedBy: 'A. Nambiar (Quality Analyst)',
    status: 'Certified Pure',
    totalJarsProduced: 1600
  },
  {
    id: 'Q-03',
    batchNumber: 'NDN-2026-BG-03',
    productType: 'Traditional Bilona Buffalo Ghee',
    manufactureDate: '2026-09-02',
    expiryDate: '2027-09-01',
    purityIndex: 99.78,
    ffaPercent: 0.19,
    moisturePercent: 0.24,
    reichertValue: 31.1,
    aromaGrade: 'Grade A (Aromatic)',
    testedBy: 'Dr. M. Srinivasan (Senior Dairy QC Lead)',
    status: 'Certified Pure',
    totalJarsProduced: 600
  },
  {
    id: 'Q-04',
    batchNumber: 'NDN-2026-A2-10',
    productType: 'A2 Gir Cow Vedic Bilona Ghee',
    manufactureDate: '2026-09-03',
    expiryDate: '2027-09-02',
    purityIndex: 99.90,
    ffaPercent: 0.15,
    moisturePercent: 0.19,
    reichertValue: 30.1,
    aromaGrade: 'Grade A+ (Rich Nutty)',
    testedBy: 'K. Venkatesh (Lab Associate)',
    status: 'Testing In Progress',
    totalJarsProduced: 900
  }
];
