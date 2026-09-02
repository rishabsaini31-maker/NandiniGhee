"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Minus, Plus, Trash2, Heart, ArrowRight, Tag, X, ShieldCheck } from "lucide-react";
import { useCart, resolveCart, cartTotals, COUPONS } from "@/lib/store/cart";
import { useWishlist } from "@/lib/store/wishlist";
import { PRODUCTS } from "@/lib/data/products";
import { formatINR } from "@/lib/format";
import { FreeShippingProgress } from "@/components/cart/FreeShippingProgress";
import { ProductCard } from "@/components/product/ProductCard";
import { toast } from "@/hooks/use-toast";
import { useHasMounted } from "@/hooks/use-has-mounted";

export default function CartPage() {
  const lines = useCart((s) => s.lines);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeLine = useCart((s) => s.removeLine);
  const couponCode = useCart((s) => s.couponCode);
  const setCoupon = useCart((s) => s.setCoupon);
  const wishlistIds = useWishlist((s) => s.ids);
  const toggleWishlist = useWishlist((s) => s.toggle);

  const mounted = useHasMounted();
  const [couponInput, setCouponInput] = useState("");
  const [showCoupons, setShowCoupons] = useState(false);

  if (!mounted) return <CartSkeleton />;

  const items = resolveCart(lines, PRODUCTS);
  const coupon = COUPONS.find((c) => c.code === couponCode) ?? null;
  const totals = cartTotals(items, coupon);

  const applyCoupon = (code?: string) => {
    const c = code ?? couponInput.trim().toUpperCase();
    const found = COUPONS.find((x) => x.code === c);
    if (!found) {
      toast({ title: "Invalid coupon", description: `"${c}" is not a valid code.`, variant: "destructive" });
      return;
    }
    if (totals.subtotal < found.minOrder) {
      toast({
        title: "Order too small for this coupon",
        description: `${found.code} needs a minimum order of ${formatINR(found.minOrder)}.`,
        variant: "destructive",
      });
      return;
    }
    setCoupon(found.code);
    toast({ title: "Coupon applied!", description: found.label });
    setShowCoupons(false);
  };

  const recommended = PRODUCTS.filter((p) => p.isBestseller && !lines.some((l) => l.productId === p.id)).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8 pt-28 md:pt-36 pb-20">
      <nav aria-label="Breadcrumb" className="mb-6 text-[11.5px]">
        <ol className="flex items-center gap-1.5">
          <li><Link href="/" className="text-cocoa-400 hover:text-forest-800">Home</Link></li>
          <li className="text-cocoa-300">/</li>
          <li><span className="text-forest-900 font-medium">Shopping Cart</span></li>
        </ol>
      </nav>
      <h1 className="font-display text-3xl md:text-4xl font-medium text-forest-900">Shopping Cart</h1>
      <p className="text-[13px] text-cocoa-400 mt-2">
        {items.length > 0 ? `${items.length} item${items.length > 1 ? "s" : ""} in your cart` : "Your cart awaits its first treasure"}
      </p>

      {items.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-display text-2xl text-forest-900">Nothing here yet.</p>
          <p className="text-[13.5px] text-cocoa-400 mt-2">Golden ghee, crunchy almonds and keepsake hampers are a click away.</p>
          <Link href="/shop" className="mt-8 inline-flex h-12 px-10 items-center rounded-sm bg-forest-800 text-ivory text-[12px] font-semibold tracking-[0.16em] uppercase hover:bg-forest-700 transition-colors">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid lg:grid-cols-[1fr_380px] gap-10 items-start">
          {/* Items */}
          <div>
            <div className="bg-parchment/70 rounded-md p-4 mb-6">
              <FreeShippingProgress remaining={totals.freeShippingRemaining} threshold={totals.freeShippingThreshold} />
            </div>

            <ul className="divide-y divide-border/70">
              {items.map((item) => (
                <li key={`${item.product.id}-${item.variant.id}`} className="py-6 flex gap-5">
                  <Link href={`/product/${item.product.slug}`} className="relative w-24 h-24 md:w-28 md:h-28 shrink-0 rounded-md overflow-hidden bg-cream">
                    <Image src={item.product.images[0]} alt={item.product.name} fill sizes="112px" className="object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Link href={`/product/${item.product.slug}`} className="font-display text-[16px] font-semibold text-forest-900 hover:text-forest-600 transition-colors">
                          {item.product.name}
                        </Link>
                        <p className="text-[12px] text-cocoa-400 mt-1">Variant: {item.variant.label}</p>
                        <p className="text-[11.5px] text-forest-600 mt-1">In stock · ships in 24h</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[16px] font-semibold text-forest-900">{formatINR(item.lineTotal)}</p>
                        {item.variant.mrp > item.variant.price && (
                          <p className="text-[11.5px] text-cocoa-300 line-through">{formatINR(item.variant.mrp * item.quantity)}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
                      <div className="inline-flex items-center border border-border rounded-sm">
                        <button onClick={() => updateQuantity(item.product.id, item.variant.id, item.quantity - 1)} className="w-9 h-9 flex items-center justify-center text-cocoa-600 hover:bg-parchment" aria-label="Decrease quantity">
                          <Minus size={13} />
                        </button>
                        <span className="w-9 text-center text-[13px] font-semibold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.variant.id, item.quantity + 1)} className="w-9 h-9 flex items-center justify-center text-cocoa-600 hover:bg-parchment" aria-label="Increase quantity">
                          <Plus size={13} />
                        </button>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => {
                            toggleWishlist(item.product.id);
                            removeLine(item.product.id, item.variant.id);
                            toast({ title: "Moved to wishlist", description: item.product.name });
                          }}
                          className="inline-flex items-center gap-1.5 text-[11.5px] text-cocoa-400 hover:text-terra-500 transition-colors"
                        >
                          <Heart size={13} /> Move to Wishlist
                        </button>
                        <button
                          onClick={() => {
                            removeLine(item.product.id, item.variant.id);
                            toast({ title: "Removed from cart", description: item.product.name });
                          }}
                          className="inline-flex items-center gap-1.5 text-[11.5px] text-cocoa-400 hover:text-terra-500 transition-colors"
                        >
                          <Trash2 size={13} /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <Link href="/shop" className="mt-8 inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] uppercase text-forest-800 hover:text-gold-600 transition-colors">
              <ArrowRight size={14} className="rotate-180" /> Continue Shopping
            </Link>
          </div>

          {/* Summary */}
          <aside className="lg:sticky lg:top-28 bg-card border border-border rounded-lg p-6 md:p-7 shadow-[0_16px_50px_-24px_rgba(18,33,26,0.3)]">
            <h2 className="font-display text-xl font-semibold text-forest-900">Order Summary</h2>

            {/* Coupon */}
            <div className="mt-5">
              {coupon ? (
                <div className="flex items-center justify-between bg-forest-50 border border-forest-100 rounded-sm px-4 py-3">
                  <span className="inline-flex items-center gap-2 text-[12.5px] font-semibold text-forest-700">
                    <Tag size={13} /> {coupon.code} applied
                  </span>
                  <button onClick={() => setCoupon(null)} aria-label="Remove coupon" className="text-cocoa-400 hover:text-terra-500">
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex gap-2">
                    <input
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Coupon code"
                      className="flex-1 h-10 px-3.5 rounded-sm border border-border bg-parchment/60 text-[12.5px] uppercase outline-none focus:border-gold-400 placeholder:normal-case"
                      aria-label="Coupon code"
                    />
                    <button onClick={() => applyCoupon()} className="h-10 px-5 rounded-sm border border-forest-800 text-forest-800 hover:bg-forest-800 hover:text-ivory text-[11px] font-bold tracking-[0.12em] uppercase transition-all">
                      Apply
                    </button>
                  </div>
                  <button onClick={() => setShowCoupons(!showCoupons)} className="mt-2 text-[11.5px] text-gold-700 hover:text-forest-800 font-medium">
                    {showCoupons ? "Hide available offers" : "View available offers"}
                  </button>
                  {showCoupons && (
                    <ul className="mt-2 space-y-2">
                      {COUPONS.map((c) => (
                        <li key={c.code}>
                          <button
                            onClick={() => applyCoupon(c.code)}
                            className="w-full text-left px-3.5 py-2.5 rounded-sm border border-dashed border-gold-400/70 bg-gold-50/60 hover:bg-gold-100/70 transition-colors"
                          >
                            <span className="text-[11.5px] font-bold tracking-wider text-forest-900">{c.code}</span>
                            <span className="block text-[11px] text-cocoa-500 mt-0.5">{c.label}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </div>

            <dl className="mt-6 space-y-2.5 text-[13px]">
              <div className="flex justify-between">
                <dt className="text-cocoa-500">Subtotal</dt>
                <dd className="font-medium text-forest-900">{formatINR(totals.subtotal)}</dd>
              </div>
              {totals.mrpTotal > totals.subtotal && (
                <div className="flex justify-between">
                  <dt className="text-cocoa-500">Product savings</dt>
                  <dd className="font-medium text-forest-600">−{formatINR(totals.mrpTotal - totals.subtotal)}</dd>
                </div>
              )}
              {totals.discount > 0 && (
                <div className="flex justify-between">
                  <dt className="text-cocoa-500">Coupon discount</dt>
                  <dd className="font-medium text-forest-600">−{formatINR(totals.discount)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-cocoa-500">Shipping</dt>
                <dd className="font-medium text-forest-900">{totals.shipping === 0 ? "FREE" : formatINR(totals.shipping)}</dd>
              </div>
              <div className="flex justify-between pt-3 border-t border-border text-[16px] font-semibold">
                <dt className="text-forest-900">Total</dt>
                <dd className="text-forest-900">{formatINR(totals.total)}</dd>
              </div>
            </dl>

            <Link
              href="/checkout"
              className="mt-6 w-full h-12 rounded-sm bg-forest-800 text-ivory hover:bg-forest-700 flex items-center justify-center gap-2 text-[12.5px] font-bold tracking-[0.16em] uppercase transition-all hover:shadow-lg"
            >
              Proceed to Checkout <ArrowRight size={15} />
            </Link>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-[10.5px] text-cocoa-400">
              <ShieldCheck size={12} className="text-forest-600" /> Secure 256-bit encrypted checkout
            </p>
          </aside>
        </div>
      )}

      {/* Recommendations */}
      {recommended.length > 0 && (
        <section className="mt-20 pt-14 border-t border-border/70" aria-label="Recommended products">
          <h2 className="font-display text-2xl md:text-[1.8rem] font-medium text-forest-900">You May Also Like</h2>
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {recommended.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function CartSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8 pt-28 md:pt-36 pb-20">
      <div className="h-8 w-40 bg-parchment rounded animate-pulse" />
      <div className="mt-10 h-64 bg-parchment/60 rounded-md animate-pulse" />
    </div>
  );
}
