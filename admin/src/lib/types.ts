export type TabType = 
  | 'dashboard' 
  | 'products' 
  | 'orders' 
  | 'payments' 
  | 'users' 
  | 'quality' 
  | 'analytics' 
  | 'settings';

export type OrderStatus = 'pending' | 'processing' | 'dispatched' | 'delivered' | 'cancelled';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
  weight?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  city: string;
  state: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: 'UPI' | 'Card' | 'Netbanking' | 'COD';
  paymentStatus: 'paid' | 'pending' | 'refunded';
  trackingNumber?: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: 'Desi Cow Ghee' | 'A2 Vedic Bilona' | 'Buffalo Ghee' | 'Dry Fruits' | 'Gift Hampers';
  price: number;
  originalPrice?: number;
  stock: number;
  rating: number;
  salesCount: number;
  image: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  batchNumber: string;
}

export interface Transaction {
  id: string;
  orderId: string;
  customerName: string;
  amount: number;
  fee: number;
  netAmount: number;
  gateway: 'Razorpay' | 'PhonePe' | 'PayTM' | 'Stripe' | 'COD';
  method: 'UPI' | 'Credit Card' | 'Debit Card' | 'Netbanking' | 'Cash';
  status: 'settled' | 'processing' | 'failed' | 'refunded';
  date: string;
}

export interface CustomerUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  tier: 'VIP Platinum' | 'Gold' | 'Silver' | 'Member';
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  city: string;
  state: string;
  status: 'active' | 'inactive';
}

export interface QualityBatch {
  id: string;
  batchNumber: string;
  productType: string;
  manufactureDate: string;
  expiryDate: string;
  purityIndex: number; // e.g. 99.9%
  ffaPercent: number; // Free fatty acid < 0.2%
  moisturePercent: number; // < 0.3%
  reichertValue: number; // 28-32
  aromaGrade: 'Grade A+ (Rich Nutty)' | 'Grade A (Aromatic)' | 'Standard';
  testedBy: string;
  status: 'Certified Pure' | 'Testing In Progress' | 'Flagged';
  totalJarsProduced: number;
}
