"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Instagram } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { IMG } from "@/lib/data/images";

const TILES = [
  { img: IMG.ghee.spoon, alt: "Golden ghee on a spoon" },
  { img: IMG.dryFruits.mixed1, alt: "Mixed dry fruits in a bowl" },
  { img: IMG.lifestyle.roti1, alt: "Hot rotis with ghee" },
  { img: IMG.farm.cow1, alt: "Desi cows at the farm" },
  { img: IMG.lifestyle.kitchen1, alt: "Indian kitchen breakfast" },
  { img: IMG.hampers.hamper4, alt: "Gift packaging" },
];

export function SocialGrid() {
  return (
    <section className="py-20 md:py-28 bg-background" aria-label="Social gallery">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="@nandinighee"
            title="From Our Kitchen to Yours"
            description="Tag us with #PureByTradition — we feature our favourite kitchens every week."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {TILES.map((tile, i) => (
            <Reveal key={tile.img} delay={i * 0.05}>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-lg bg-cream"
                aria-label={`Instagram post: ${tile.alt}`}
              >
                <Image
                  src={tile.img}
                  alt={tile.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 16vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-forest-950/0 group-hover:bg-forest-950/45 transition-all duration-500 flex items-center justify-center">
                  <Instagram size={22} className="text-ivory opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-400" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-10 text-center">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.16em] uppercase text-forest-800 hover:text-gold-600 transition-colors border-b border-gold-500/50 pb-1"
          >
            Follow Our Journey <ArrowUpRight size={14} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
