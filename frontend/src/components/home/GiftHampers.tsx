"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/shared/Reveal";
import { IMG } from "@/lib/data/images";

export function GiftHampers() {
  return (
    <section className="py-20 md:py-28 bg-background" aria-label="Gift hampers">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-xl">
            <div className="absolute inset-0">
              <Image
                src={IMG.hampers.hamper2}
                alt="Elegant NANDINI gift hamper with dry fruits and ghee"
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-forest-950/85 via-forest-950/55 to-forest-950/20" />
            </div>

            <div className="relative px-6 py-16 md:px-16 md:py-24 max-w-xl">
              <p className="eyebrow text-gold-300 flex items-center gap-3">
                <span className="h-px w-10 bg-gold-400/80" /> The Art of Gifting
              </p>
              <h2 className="font-display text-3xl md:text-[2.9rem] leading-[1.08] font-medium text-ivory mt-4 text-balance">
                Gift the Goodness of India.
              </h2>
              <p className="mt-5 text-[14.5px] leading-relaxed text-ivory/80 max-w-md">
                Keepsake boxes of ghee, almonds, cashews, pistachios and dates — hand-tied with ribbons, sealed with
                wax, and finished with a hand-written note. Gifts that say what greeting cards cannot.
              </p>
              <div className="mt-9 flex flex-col sm:flex-row gap-3.5">
                <Link
                  href="/shop/gift-hampers"
                  className="h-[50px] px-8 inline-flex items-center justify-center bg-gold-500 text-forest-950 hover:bg-gold-400 text-[12px] font-bold tracking-[0.16em] uppercase rounded-sm transition-all duration-300 hover:shadow-[0_14px_36px_-10px_rgba(192,154,69,0.55)]"
                >
                  Shop Gift Hampers
                </Link>
                <Link
                  href="/shop/gift-hampers"
                  className="h-[50px] px-8 inline-flex items-center justify-center border border-ivory/40 text-ivory hover:bg-ivory/10 text-[12px] font-bold tracking-[0.16em] uppercase rounded-sm transition-all duration-300"
                >
                  Build Your Own Hamper
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Mini hamper strip */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { img: IMG.hampers.hamper3, label: "The Royal Hamper", price: "From ₹3,999" },
            { img: IMG.hampers.hamper1, label: "The Classic Hamper", price: "From ₹2,499" },
            { img: IMG.hampers.hamper5, label: "The Festive Grand", price: "From ₹5,499" },
            { img: IMG.hampers.hamper7, label: "The Corporate", price: "Volume pricing" },
          ].map((h, i) => (
            <Reveal key={h.label} delay={i * 0.08}>
              <Link href="/shop/gift-hampers" className="group flex items-center gap-4 p-3 rounded-lg bg-card border border-border/70 hover:border-gold-300/60 transition-all duration-300">
                <span className="relative w-16 h-16 rounded-md overflow-hidden bg-cream shrink-0">
                  <Image src={h.img} alt={h.label} fill sizes="64px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                </span>
                <span>
                  <span className="block text-[13px] font-semibold text-forest-900 font-display">{h.label}</span>
                  <span className="block text-[11.5px] text-gold-700 mt-0.5">{h.price}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
