"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, ArrowRight, Heart, Trash2 } from "lucide-react";
import { useCart, resolveCart, cartTotals, COUPONS } from "@/lib/store/cart";
import { useUI } from "@/lib/store/user";
import { useWishlist } from "@/lib/store/wishlist";
import { PRODUCTS } from "@/lib/data/products";
import { formatINR } from "@/lib/format";
import { FreeShippingProgress } from "@/components/cart/FreeShippingProgress";
import { useEffect } from "react";
import { useHasMounted } from "@/hooks/use-has-mounted";
import { toast } from "@/hooks/use-toast";

export function CartDrawer() {
  const { cartOpen, setCartOpen } = useUI();
  const lines = useCart((s) => s.lines);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeLine = useCart((s) => s.removeLine);
  const couponCode = useCart((s) => s.couponCode);
  const wishlistIds = useWishlist((s) => s.ids);
  const toggleWishlist = useWishlist((s) => s.toggle);

  const mounted = useHasMounted();

  const items = resolveCart(lines, PRODUCTS);
  const coupon = COUPONS.find((c) => c.code === couponCode) ?? null;
  const totals = cartTotals(items, coupon);

  useEffect(() => {
    if (cartOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-forest-950/50 backdrop-blur-[2px]"
            onClick={() => setCartOpen(false)}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className="fixed top-0 right-0 bottom-0 z-[90] w-full max-w-[430px] bg-card shadow-2xl flex flex-col"
            role="dialog"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-[72px] border-b border-border shrink-0">
              <h2 className="font-display text-xl font-semibold text-forest-900 flex items-center gap-2.5">
                <ShoppingBag size={19} strokeWidth={1.7} />
                Your Cart
                {items.length > 0 && (
                  <span className="text-[12px] font-sans font-medium text-cocoa-400 mt-1">({items.length} items)</span>
                )}
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                aria-label="Close cart"
                className="w-9 h-9 rounded-full flex items-center justify-center text-cocoa-600 hover:bg-parchment transition-colors"
              >
                <X size={19} />
              </button>
            </div>

            {items.length === 0 ? (
              <EmptyCart onClose={() => setCartOpen(false)} />
            ) : (
              <>
                <div className="px-6 py-4 border-b border-border shrink-0 bg-parchment/60">
                  <FreeShippingProgress remaining={totals.freeShippingRemaining} threshold={totals.freeShippingThreshold} />
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto scrollbar-thin px-6 py-4 space-y-5">
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.variant.id}`} className="flex gap-4">
                      <Link
                        href={`/product/${item.product.slug}`}
                        onClick={() => setCartOpen(false)}
                        className="relative w-20 h-20 shrink-0 rounded-md overflow-hidden bg-cream"
                      >
                        <Image src={item.product.images[0]} alt={item.product.name} fill sizes="80px" className="object-cover" />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/product/${item.product.slug}`}
                            onClick={() => setCartOpen(false)}
                            className="font-display text-[14.5px] font-semibold text-forest-900 leading-snug hover:text-forest-600"
                          >
                            {item.product.name}
                          </Link>
                          <button
                            onClick={() => removeLine(item.product.id, item.variant.id)}
                            aria-label="Remove item"
                            className="text-cocoa-300 hover:text-terra-500 transition-colors p-1 -m-1"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-[11.5px] text-cocoa-400 mt-0.5">{item.variant.label}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="inline-flex items-center border border-border rounded-sm">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.variant.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-cocoa-600 hover:bg-parchment"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-8 text-center text-[12.5px] font-semibold text-forest-900">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.variant.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-cocoa-600 hover:bg-parchment"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <div className="text-right">
                            <span className="text-[14px] font-semibold text-forest-900">{formatINR(item.lineTotal)}</span>
                            {item.variant.mrp > item.variant.price && (
                              <span className="block text-[10.5px] text-cocoa-300 line-through">
                                {formatINR(item.variant.mrp * item.quantity)}
                              </span>
                            )}
                          </div>
                        </div>
                        {/* Move to wishlist */}
                        <button
                          onClick={() => {
                            toggleWishlist(item.product.id);
                            removeLine(item.product.id, item.variant.id);
                            toast({ title: "Moved to wishlist", description: item.product.name });
                          }}
                          className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-cocoa-400 hover:text-terra-500 transition-colors"
                        >
                          <Heart size={11} /> Move to wishlist
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="border-t border-border px-6 py-5 shrink-0 bg-parchment/60 space-y-4">
                  <div className="space-y-1.5 text-[13px]">
                    <div className="flex justify-between text-cocoa-500">
                      <span>Subtotal</span>
                      <span className="font-medium text-forest-900">{formatINR(totals.subtotal)}</span>
                    </div>
                    {totals.discount > 0 && (
                      <div className="flex justify-between text-forest-600">
                        <span>Discount ({coupon?.code})</span>
                        <span>−{formatINR(totals.discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-cocoa-500">
                      <span>Shipping</span>
                      <span className="font-medium text-forest-900">
                        {totals.shipping === 0 ? "FREE" : formatINR(totals.shipping)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-border text-[15px] font-semibold text-forest-900">
                      <span>Total</span>
                      <span>{formatINR(totals.total)}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/cart"
                      onClick={() => setCartOpen(false)}
                      className="h-11 rounded-sm border border-forest-800 text-forest-800 hover:bg-forest-50 flex items-center justify-center text-[12px] font-semibold tracking-[0.14em] uppercase transition-colors"
                    >
                      View Cart
                    </Link>
                    <Link
                      href="/checkout"
                      onClick={() => setCartOpen(false)}
                      className="h-11 rounded-sm bg-forest-800 text-ivory hover:bg-forest-700 flex items-center justify-center gap-2 text-[12px] font-semibold tracking-[0.14em] uppercase transition-colors"
                    >
                      Checkout <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-5">
      <div className="w-20 h-20 rounded-full bg-parchment flex items-center justify-center">
        <ShoppingBag size={30} className="text-cocoa-300" strokeWidth={1.4} />
      </div>
      <div>
        <h3 className="font-display text-xl font-semibold text-forest-900">Your cart is empty</h3>
        <p className="text-[13px] text-cocoa-400 mt-2 leading-relaxed">
          Fill it with golden ghee, handpicked dry fruits and things worth gifting.
        </p>
      </div>
      <Link
        href="/shop"
        onClick={onClose}
        className="h-11 px-8 rounded-sm bg-forest-800 text-ivory hover:bg-forest-700 inline-flex items-center text-[12px] font-semibold tracking-[0.16em] uppercase transition-colors"
      >
        Start Shopping
      </Link>
    </div>
  );
}
