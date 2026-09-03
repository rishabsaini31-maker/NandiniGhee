"use client";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProductCard } from "@/components/product/ProductCard";
import { getRelated, Product } from "@/lib/data/products";

export function RelatedProducts({ product }: { product: Product }) {
  const related = getRelated(product, 4);
  return (
    <section className="py-16 md:py-20 bg-cream/60 texture-grain border-t border-border/60" aria-label="Related products">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading align="left" eyebrow="Complete the Ritual" title="You May Also Like" />
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {related.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
