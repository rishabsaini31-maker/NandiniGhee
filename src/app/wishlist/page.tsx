"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { ProductCard } from "@/components/product/ProductCard";
import { useWishlist } from "@/lib/store/wishlist";
import { PRODUCTS } from "@/lib/data/products";
import { Product } from "@/lib/types";
import { useHasMounted } from "@/hooks/use-has-mounted";

export default function WishlistPage() {
  const ids = useWishlist((s) => s.ids);
  const mounted = useHasMounted();

  const items: Product[] = ids.map((id) => PRODUCTS.find((p) => p.id === id)).filter((p): p is Product => Boolean(p));

  return (
    <>
      <PageHeader
        eyebrow="Saved With Love"
        title="My Wishlist"
        description="Everything you've hearted, gathered in one place. Add to cart whenever the moment is right."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Wishlist" }]}
      />
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-14">
        {!mounted ? null : items.length === 0 ? (
          <div className="text-center py-20">
            <span className="inline-flex w-20 h-20 rounded-full bg-parchment items-center justify-center">
              <Heart size={32} className="text-cocoa-300" strokeWidth={1.4} />
            </span>
            <p className="font-display text-2xl text-forest-900 mt-6">Your wishlist is empty</p>
            <p className="text-[13.5px] text-cocoa-400 mt-2 max-w-sm mx-auto leading-relaxed">
              Tap the heart on any product to keep it here — your list persists even after you close the browser.
            </p>
            <Link
              href="/shop"
              className="mt-8 inline-flex h-12 px-10 items-center rounded-sm bg-forest-800 text-ivory text-[12px] font-semibold tracking-[0.16em] uppercase hover:bg-forest-700 transition-colors"
            >
              Discover Products
            </Link>
          </div>
        ) : (
          <>
            <p className="text-[13px] text-cocoa-500 mb-8">
              <span className="font-semibold text-forest-900">{items.length}</span> saved item{items.length > 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {items.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
