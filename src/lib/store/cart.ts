import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartLine, CartItemResolved, ProductVariant, Product } from "@/lib/types";

const FREE_SHIPPING_THRESHOLD = 999;

interface CartState {
  lines: CartLine[];
  couponCode: string | null;
  addLine: (productId: string, variantId: string, quantity?: number) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  removeLine: (productId: string, variantId: string) => void;
  clear: () => void;
  setCoupon: (code: string | null) => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      couponCode: null,
      addLine: (productId, variantId, quantity = 1) =>
        set((state) => {
          const existing = state.lines.find(
            (l) => l.productId === productId && l.variantId === variantId
          );
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l.productId === productId && l.variantId === variantId
                  ? { ...l, quantity: Math.min(l.quantity + quantity, 20) }
                  : l
              ),
            };
          }
          return { lines: [...state.lines, { productId, variantId, quantity }] };
        }),
      updateQuantity: (productId, variantId, quantity) =>
        set((state) => ({
          lines:
            quantity <= 0
              ? state.lines.filter(
                  (l) => !(l.productId === productId && l.variantId === variantId)
                )
              : state.lines.map((l) =>
                  l.productId === productId && l.variantId === variantId
                    ? { ...l, quantity: Math.min(quantity, 20) }
                    : l
                ),
        })),
      removeLine: (productId, variantId) =>
        set((state) => ({
          lines: state.lines.filter(
            (l) => !(l.productId === productId && l.variantId === variantId)
          ),
        })),
      clear: () => set({ lines: [], couponCode: null }),
      setCoupon: (code) => set({ couponCode: code }),
    }),
    { name: "nandini-cart-v1" }
  )
);

export interface Coupon {
  code: string;
  label: string;
  type: "percent" | "flat";
  value: number;
  minOrder: number;
}

export const COUPONS: Coupon[] = [
  { code: "PURE10", label: "10% off on orders above ₹1,499", type: "percent", value: 10, minOrder: 1499 },
  { code: "WELCOME200", label: "₹200 off on your first order above ₹1,299", type: "flat", value: 200, minOrder: 1299 },
  { code: "FESTIVE500", label: "₹500 off on orders above ₹4,999", type: "flat", value: 500, minOrder: 4999 },
];

export function resolveCart(lines: CartLine[], allProducts: Product[]): CartItemResolved[] {
  const resolved: CartItemResolved[] = [];
  for (const line of lines) {
    const product = allProducts.find((p) => p.id === line.productId);
    if (!product) continue;
    const variant = product.variants.find((v) => v.id === line.variantId) ?? product.variants[0];
    resolved.push({ product, variant, quantity: line.quantity, lineTotal: variant.price * line.quantity });
  }
  return resolved;
}

export function cartTotals(items: CartItemResolved[], coupon: Coupon | null) {
  const subtotal = items.reduce((s, i) => s + i.lineTotal, 0);
  let discount = 0;
  if (coupon && subtotal >= coupon.minOrder) {
    discount = coupon.type === "percent" ? Math.round((subtotal * coupon.value) / 100) : coupon.value;
  }
  const shipping = subtotal === 0 ? 0 : subtotal - discount >= FREE_SHIPPING_THRESHOLD ? 0 : 99;
  const total = subtotal - discount + shipping;
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - (subtotal - discount));
  const mrpTotal = items.reduce((s, i) => s + i.variant.mrp * i.quantity, 0);
  return { subtotal, discount, shipping, total, freeShippingRemaining, mrpTotal, freeShippingThreshold: FREE_SHIPPING_THRESHOLD };
}
