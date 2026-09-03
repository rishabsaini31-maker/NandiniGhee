"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { CATEGORIES } from "@/lib/data/content";
import { IMG } from "@/lib/data/images";

export function FeaturedCategories() {
  return (
    <section className="py-20 md:py-28 bg-background" aria-label="Featured categories">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Curated Collections"
            title="Explore Our Finest"
            description="Three crafts, one promise — everything made and sourced the way tradition demands, never the way shortcuts allow."
          />
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-6 lg:gap-8">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.slug} delay={i * 0.12}>
              <Link
                href={`/shop/${cat.slug}`}
                className="group relative block overflow-hidden rounded-lg aspect-[3/4] md:aspect-[4/5]"
                aria-label={`${cat.name} — ${cat.description}`}
              >
                <Image
                  src={cat.homeCardWide}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                  <p className="eyebrow text-gold-300">0{i + 1}</p>
                  <h3 className="font-display text-2xl md:text-[1.7rem] font-medium text-ivory mt-2">{cat.name}</h3>
                  <p className="text-[13px] text-ivory/75 mt-2 leading-relaxed">{cat.description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[11.5px] font-semibold tracking-[0.16em] uppercase text-gold-300">
                    Shop Now
                    <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
                <span className="absolute inset-0 border border-gold-400/0 rounded-lg transition-all duration-500 group-hover:border-gold-400/40" />
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-10 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.16em] uppercase text-forest-800 hover:text-gold-600 transition-colors border-b border-gold-500/50 pb-1"
          >
            View All Products <ArrowRight size={14} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
