export interface ProductVariant {
  id: string;
  label: string; // "250 ml", "500 g" etc.
  price: number;
  mrp: number;
  weightGrams: number; // used for shipping calc / filters
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  text: string;
  verified: boolean;
}

export interface NutritionFacts {
  servingSize: string;
  energy: string;
  protein: string;
  carbs: string;
  fat: string;
  fiber?: string;
  highlights: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: "ghee" | "dry-fruits" | "combos" | "gift-hampers";
  subCategory?: string; // almonds, cashews, pistachios, walnuts, dates, anjeer, raisins, mixed
  tagline: string;
  shortDescription: string;
  description: string;
  ingredients: string;
  howItsMade: string;
  nutrition: NutritionFacts;
  images: string[];
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  badges: string[]; // "Bestseller", "New", "Limited"
  tags: string[];
  dietary: string[]; // "Vegetarian", "Vegan", "Gluten-Free", "No Added Sugar"
  inStock: boolean;
  isBestseller: boolean;
  isNew?: boolean;
  featured?: boolean;
  reviews: Review[];
}

export interface CartLine {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface CartItemResolved {
  product: Product;
  variant: ProductVariant;
  quantity: number;
  lineTotal: number;
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  placedAt: string;
  items: {
    productId: string;
    name: string;
    variantLabel: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  address: {
    fullName: string;
    phone: string;
    line1: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: string;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: "Placed" | "Confirmed" | "Packed" | "Shipped" | "Out for Delivery" | "Delivered";
  estimatedDelivery: string;
}

export interface AppNotification {
  id: string;
  type: "order" | "offer" | "stock" | "wishlist" | "account" | "product";
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
  href?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  category: "Ghee" | "Dry Fruits" | "Recipes" | "Indian Traditions" | "Wellness" | "Behind the Brand";
  excerpt: string;
  content: string[];
  image: string;
  author: string;
  date: string;
  readTime: string;
}
