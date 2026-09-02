"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { IMG } from "@/lib/data/images";

const ITEMS = [
  { name: "Almonds", image: IMG.dryFruits.almonds1, origin: "California" },
  { name: "Cashews", image: IMG.dryFruits.cashews1, origin: "Tamil Nadu" },
  { name: "Pistachios", image: IMG.dryFruits.pistachios1, origin: "Iran" },
  { name: "Walnuts", image: IMG.dryFruits.walnuts1, origin: "Kashmir" },
  { name: "Dates", image: IMG.dryFruits.dates1, origin: "Medjool Belt" },
  { name: "Anjeer", image: IMG.dryFruits.anjeer1, origin: "Afghanistan" },
];

export function DryFruitsSection() {
  return (
    <section className="py-20 md:py-28 bg-cream/60 texture-grain" aria-label="Premium dry fruits">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Orchards & Valleys"
              title="Nature's Finest"
              description="Handpicked from the world's finest growing regions — graded, inspected and packed while they're still fresh."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/shop/dry-fruits"
              className="group inline-flex items-center gap-2 h-11 px-6 rounded-sm border border-forest-800 text-forest-800 hover:bg-forest-800 hover:text-ivory text-[11.5px] font-semibold tracking-[0.16em] uppercase transition-all duration-300 shrink-0"
            >
              Shop Dry Fruits
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {ITEMS.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.06}>
              <Link
                href={`/shop/dry-fruits?category=${encodeURIComponent(item.name)}`}
                className="group block"
                aria-label={`Shop ${item.name}`}
              >
                <div className="relative aspect-square overflow-hidden rounded-lg bg-cream">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 16vw"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="mt-3 text-center">
                  <h3 className="font-display text-[16px] font-semibold text-forest-900 group-hover:text-forest-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-[10.5px] tracking-[0.14em] uppercase text-cocoa-400 mt-0.5">{item.origin}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
