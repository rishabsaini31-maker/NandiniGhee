"use client";

import { useEffect } from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProductCard } from "@/components/product/ProductCard";
import { useRecentlyViewed } from "@/lib/store/user";
import { PRODUCTS } from "@/lib/data/products";
import { Product } from "@/lib/types";
import { useHasMounted } from "@/hooks/use-has-mounted";

export function RecentlyViewed({ excludeId }: { excludeId?: string }) {
  const ids = useRecentlyViewed((s) => s.ids);
  const mounted = useHasMounted();
  if (!mounted) return null;

  const items: Product[] = ids
    .filter((id) => id !== excludeId)
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p))
    .slice(0, 4);

  if (items.length < 2) return null;

  return (
    <section className="py-16 md:py-20 bg-background border-t border-border/60" aria-label="Recently viewed products">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading align="left" eyebrow="Pick Up Where You Left Off" title="Recently Viewed" />
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
