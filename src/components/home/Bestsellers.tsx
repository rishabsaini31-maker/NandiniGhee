"use client";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { ProductCard } from "@/components/product/ProductCard";
import { getBestsellers } from "@/lib/data/products";

export function Bestsellers() {
  const products = getBestsellers().slice(0, 8);
  return (
    <section className="py-20 md:py-28 bg-cream/60 texture-grain" aria-label="Customer favourites">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Loved Across India"
            title="Customer Favorites"
            description="The jars, packs and hampers Indian households reorder again and again."
          />
        </Reveal>
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
