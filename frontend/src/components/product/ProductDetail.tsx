"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Minus, Plus, ShoppingBag, Zap, ChevronDown, ShieldCheck, Package, BadgeCheck, Truck } from "lucide-react";
import { Product } from "@/lib/types";
import { ProductGallery } from "@/components/product/ProductGallery";
import { StarRating } from "@/components/shared/StarRating";
import { useCart } from "@/lib/store/cart";
import { useWishlist } from "@/lib/store/wishlist";
import { useRecentlyViewed, useUI } from "@/lib/store/user";
import { formatINR, discountPercent } from "@/lib/format";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const TRUST = [
  { icon: ShieldCheck, label: "Secure Payment" },
  { icon: Package, label: "Freshly Packed" },
  { icon: BadgeCheck, label: "Quality Checked" },
  { icon: Truck, label: "Fast Delivery" },
];

const TABS = ["Description", "Ingredients", "How It's Made", "Nutritional Information", "Shipping", "Returns", "Reviews"] as const;

export function ProductDetail({ product }: { product: Product }) {
  const [variantIdx, setVariantIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<(typeof TABS)[number]>("Description");
  const [heartPop, setHeartPop] = useState(false);

  const variant = product.variants[Math.min(variantIdx, product.variants.length - 1)];
  const discount = discountPercent(variant.mrp, variant.price);

  const addLine = useCart((s) => s.addLine);
  const setCartOpen = useUI((s) => s.setCartOpen);
  const wishlisted = useWishlist((s) => s.ids.includes(product.id));
  const toggleWishlist = useWishlist((s) => s.toggle);
  const pushRecent = useRecentlyViewed((s) => s.push);

  useEffect(() => {
    pushRecent(product.id);
  }, [product.id, pushRecent]);

  const handleAdd = (openCart = false) => {
    addLine(product.id, variant.id, qty);
    toast({ title: "Added to cart", description: `${product.name} · ${variant.label} × ${qty}` });
    if (openCart) {
      setCartOpen(true);
    }
  };

  const handleWishlist = () => {
    toggleWishlist(product.id);
    setHeartPop(true);
    setTimeout(() => setHeartPop(false), 500);
    toast({
      title: wishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: product.name,
    });
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.images,
    brand: { "@type": "Brand", name: "NANDINI GHEE" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: product.variants.map((v) => ({
      "@type": "Offer",
      name: v.label,
      price: v.price,
      priceCurrency: "INR",
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-7xl px-5 md:px-8 py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <div className="lg:sticky lg:top-28 self-start">
            <ProductGallery images={product.images} name={product.name} />
          </div>

          {/* Info */}
          <div>
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {product.badges.map((b) => (
                <span key={b} className="bg-gold-100 text-gold-700 border border-gold-300 text-[10px] font-semibold tracking-[0.14em] uppercase px-2.5 py-1 rounded-sm">
                  {b}
                </span>
              ))}
            </div>

            <h1 className="font-display text-3xl md:text-[2.5rem] leading-[1.12] font-medium text-forest-900 mt-3 text-balance">
              {product.name}
            </h1>
            <p className="text-[13px] text-cocoa-400 italic mt-2 font-display">{product.tagline}</p>

            {/* Rating */}
            <a href="#reviews" className="inline-flex items-center gap-2 mt-4 group">
              <StarRating rating={product.rating} size={15} />
              <span className="text-[12.5px] text-cocoa-500 group-hover:text-forest-800 transition-colors">
                {product.rating} · {product.reviewCount.toLocaleString("en-IN")} Reviews
              </span>
            </a>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-5">
              <span className="text-[32px] font-semibold text-forest-900 tracking-tight">{formatINR(variant.price)}</span>
              {variant.mrp > variant.price && (
                <>
                  <span className="text-[16px] text-cocoa-300 line-through">{formatINR(variant.mrp)}</span>
                  <span className="text-[13px] font-bold text-terra-500 bg-terra-100 rounded-sm px-2 py-0.5">{discount}% OFF</span>
                </>
              )}
            </div>
            <p className="text-[11.5px] text-cocoa-400 mt-1">Inclusive of all taxes</p>

            <p className="text-[14.5px] leading-relaxed text-cocoa-600 mt-5">{product.shortDescription}</p>

            {/* Weight selector */}
            <div className="mt-7">
              <p className="eyebrow text-cocoa-400 mb-3">
                {product.category === "ghee" ? "Volume" : product.category === "gift-hampers" ? "Configuration" : "Weight"}
              </p>
              <div className="flex flex-wrap gap-2.5" role="radiogroup" aria-label="Select variant">
                {product.variants.map((v, i) => (
                  <button
                    key={v.id}
                    role="radio"
                    aria-checked={i === variantIdx}
                    onClick={() => setVariantIdx(i)}
                    className={cn(
                      "min-w-[86px] px-4 py-2.5 rounded-sm border text-center transition-all duration-200",
                      i === variantIdx
                        ? "border-forest-800 bg-forest-800 text-ivory shadow-md"
                        : "border-border bg-card text-cocoa-600 hover:border-gold-400"
                    )}
                  >
                    <span className="block text-[13px] font-semibold">{v.label}</span>
                    <span className={cn("block text-[11px] mt-0.5", i === variantIdx ? "text-gold-300" : "text-cocoa-400")}>
                      {formatINR(v.price)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + actions */}
            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <div className="inline-flex items-center border border-border rounded-sm" aria-label="Quantity">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-11 h-12 flex items-center justify-center text-cocoa-600 hover:bg-parchment transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} />
                </button>
                <span className="w-10 text-center text-[15px] font-semibold text-forest-900" aria-live="polite">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(Math.min(20, qty + 1))}
                  className="w-11 h-12 flex items-center justify-center text-cocoa-600 hover:bg-parchment transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>
              <button
                onClick={() => handleAdd()}
                disabled={!product.inStock}
                className="flex-1 min-w-[180px] h-12 rounded-sm bg-forest-800 text-ivory hover:bg-forest-700 text-[12.5px] font-bold tracking-[0.16em] uppercase inline-flex items-center justify-center gap-2.5 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg"
              >
                <ShoppingBag size={16} strokeWidth={1.8} />
                {product.inStock ? "Add to Cart" : "Sold Out"}
              </button>
              <button
                onClick={() => handleWishlist()}
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                className="w-12 h-12 rounded-sm border border-border flex items-center justify-center hover:border-terra-400 transition-colors"
              >
                <Heart
                  size={18}
                  className={cn(
                    heartPop && "animate-heart-pop",
                    "transition-colors",
                    wishlisted ? "fill-terra-500 text-terra-500" : "text-cocoa-500"
                  )}
                  strokeWidth={1.6}
                />
              </button>
            </div>
            <button
              onClick={() => handleAdd(true)}
              disabled={!product.inStock}
              className="mt-3 w-full h-12 rounded-sm border-2 border-gold-500 text-gold-700 hover:bg-gold-500 hover:text-forest-950 text-[12.5px] font-bold tracking-[0.16em] uppercase inline-flex items-center justify-center gap-2.5 transition-all duration-300 disabled:opacity-40"
            >
              <Zap size={15} /> Buy Now
            </button>
            <button
              onClick={handleWishlist}
              className="mt-3 inline-flex items-center gap-1.5 text-[12px] text-cocoa-400 hover:text-terra-500 transition-colors"
            >
              <Heart size={12} className={wishlisted ? "fill-terra-500 text-terra-500" : ""} /> Add to Wishlist
            </button>

            {/* Trust row */}
            <div className="mt-8 pt-6 border-t border-border/70 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {TRUST.map((t) => {
                const Icon = t.icon;
                return (
                  <div key={t.label} className="flex items-center gap-2 text-[11px] font-medium text-cocoa-500">
                    <Icon size={15} className="text-forest-600 shrink-0" strokeWidth={1.7} />
                    {t.label}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <section className="bg-cream/60 texture-grain border-t border-border/70" aria-label="Product details">
        <div className="mx-auto max-w-4xl px-5 md:px-8 py-14 md:py-16">
          {/* Tab bar — scrollable on mobile */}
          <div className="flex gap-1 overflow-x-auto no-scrollbar border-b border-border">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "relative px-4 md:px-5 py-3.5 text-[12px] md:text-[12.5px] font-semibold tracking-[0.1em] uppercase whitespace-nowrap transition-colors",
                  tab === t ? "text-forest-900" : "text-cocoa-400 hover:text-cocoa-600"
                )}
              >
                {t === "Nutritional Information" ? "Nutrition" : t === "Reviews" ? `Reviews (${product.reviewCount.toLocaleString("en-IN")})` : t}
                {tab === t && <motion.span layoutId="tab-underline" className="absolute bottom-0 left-3 right-3 h-0.5 bg-gold-500" />}
              </button>
            ))}
          </div>

          <div className="py-8 md:py-10 min-h-[220px]">
            {tab === "Description" && (
              <div className="space-y-4 text-[14.5px] leading-relaxed text-cocoa-600">
                <p>{product.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {product.tags.map((t) => (
                    <span key={t} className="text-[11px] font-medium tracking-wide bg-parchment border border-border rounded-full px-3 py-1 text-forest-800">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {tab === "Ingredients" && <p className="text-[14.5px] leading-relaxed text-cocoa-600">{product.ingredients}</p>}
            {tab === "How It's Made" && (
              <div className="text-[14.5px] leading-relaxed text-cocoa-600 space-y-4">
                <p>{product.howItsMade}</p>
                <Link href="/process" className="inline-flex items-center gap-2 text-forest-800 font-semibold text-[12px] tracking-[0.14em] uppercase border-b border-gold-500/50 pb-0.5 hover:text-gold-700 transition-colors">
                  See the full process
                </Link>
              </div>
            )}
            {tab === "Nutritional Information" && (
              <div>
                <div className="rounded-md border border-border bg-card overflow-hidden">
                  <div className="px-5 py-3.5 bg-parchment flex justify-between text-[12.5px] font-semibold text-forest-900">
                    <span>Serving Size</span>
                    <span>{product.nutrition.servingSize}</span>
                  </div>
                  <dl className="divide-y divide-border/60">
                    {[
                      ["Energy", product.nutrition.energy],
                      ["Protein", product.nutrition.protein],
                      ["Carbohydrates", product.nutrition.carbs],
                      ["Total Fat", product.nutrition.fat],
                      ...(product.nutrition.fiber ? [["Dietary Fibre", product.nutrition.fiber]] : []),
                    ].map(([k, v]) => (
                      <div key={k} className="px-5 py-3 flex justify-between text-[13px]">
                        <dt className="text-cocoa-500">{k}</dt>
                        <dd className="font-semibold text-forest-900">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {product.nutrition.highlights.map((h) => (
                    <li key={h} className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-forest-700 bg-forest-50 border border-forest-100 rounded-full px-3 py-1.5">
                      <BadgeCheck size={12} /> {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {tab === "Shipping" && (
              <div className="text-[14.5px] leading-relaxed text-cocoa-600 space-y-3">
                <p>Free shipping on all orders above ₹999. Orders below ₹999 carry a flat ₹99 shipping fee.</p>
                <p>Metro cities receive orders in 2–4 working days; other cities in 3–6 working days. We ship to 27,000+ pincodes across India.</p>
                <p>Ghee orders in summer months include thermal padding, and ghee may partially melt in transit — it resets naturally on cooling without any change in quality.</p>
              </div>
            )}
            {tab === "Returns" && (
              <div className="text-[14.5px] leading-relaxed text-cocoa-600 space-y-3">
                <p>Food products cannot be returned once opened, for safety reasons.</p>
                <p>If an item arrives damaged, leaking or incorrect, contact us within 48 hours with photographs and we will replace it or refund you fully — no return pickup needed for minor damage cases.</p>
                <p>Approved refunds reach your original payment method within 5–7 working days.</p>
              </div>
            )}
            {tab === "Reviews" && <ReviewSection product={product} />}
          </div>
        </div>
      </section>

      {/* Sticky mobile add-to-cart */}
      <MobileStickyBar product={product} onAdd={() => handleAdd(true)} />
    </>
  );
}

function ReviewSection({ product }: { product: Product }) {
  const breakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    pct: star === 5 ? 78 : star === 4 ? 15 : star === 3 ? 5 : star === 2 ? 1 : 1,
  }));
  return (
    <div id="reviews" className="grid md:grid-cols-[240px_1fr] gap-10">
      {/* Summary */}
      <div className="text-center md:text-left">
        <p className="font-display text-6xl font-semibold text-forest-900">{product.rating}</p>
        <StarRating rating={product.rating} size={16} className="mt-2" />
        <p className="text-[12px] text-cocoa-400 mt-2">{product.reviewCount.toLocaleString("en-IN")} verified reviews</p>
        <div className="mt-5 space-y-2">
          {breakdown.map((b) => (
            <div key={b.star} className="flex items-center gap-2 text-[11px] text-cocoa-400">
              <span className="w-3">{b.star}</span>
              <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
                <div className="h-full bg-gold-400 rounded-full" style={{ width: `${b.pct}%` }} />
              </div>
              <span className="w-8 text-right">{b.pct}%</span>
            </div>
          ))}
        </div>
      </div>
      {/* Review cards */}
      <ul className="space-y-5">
        {product.reviews.map((r) => (
          <li key={r.id} className="bg-card border border-border/70 rounded-md p-5">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-forest-800 text-ivory font-display text-[14px] font-semibold flex items-center justify-center">
                  {r.author.charAt(0)}
                </span>
                <div>
                  <p className="text-[13px] font-semibold text-forest-900">{r.author}</p>
                  <p className="text-[10.5px] text-cocoa-400">{r.location} · {r.date}</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-[9.5px] font-semibold tracking-wide uppercase text-forest-600 bg-forest-50 border border-forest-100 rounded-full px-2 py-0.5">
                <BadgeCheck size={10} /> Verified Purchase
              </span>
            </div>
            <StarRating rating={r.rating} size={12} className="mt-3" />
            <p className="text-[13px] font-semibold text-forest-900 mt-2">{r.title}</p>
            <p className="text-[13px] leading-relaxed text-cocoa-500 mt-1">{r.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobileStickyBar({ product, onAdd }: { product: Product; onAdd: () => void }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <motion.div
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-card/95 backdrop-blur-md border-t border-border p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-8px_30px_-12px_rgba(18,33,26,0.25)]"
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-semibold text-forest-900 truncate font-display">{product.name}</p>
          <p className="text-[12px] text-forest-900 font-bold">{formatINR(product.variants[0].price)}</p>
        </div>
        <button
          onClick={onAdd}
          className="h-11 px-6 rounded-sm bg-forest-800 text-ivory text-[11.5px] font-bold tracking-[0.14em] uppercase flex items-center gap-2"
        >
          <ShoppingBag size={14} /> Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
