import type { Metadata } from "next";
import Image from "next/image";
import { BadgeCheck, Quote } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StarRating } from "@/components/shared/StarRating";
import { TESTIMONIALS } from "@/lib/data/content";
import { IMG } from "@/lib/data/images";

export const metadata: Metadata = {
  title: "Success Stories — Stories From Our Customers",
  description:
    "Real stories from NANDINI families across India — the switch to honest ghee, corporate Diwali gifting wins, and kitchens that taste like home again.",
  alternates: { canonical: "/success-stories" },
};

const FEATURED = [
  {
    name: "The Malhotra Family",
    location: "Jaipur",
    image: IMG.lifestyle.kitchen2,
    story:
      "Three generations under one roof means three generations of opinions about ghee. When the eldest — our dadi — approved NANDINI's bilona without a single note, we knew we had found our jar. Every festival since, the first halwa of the season is made with nothing else.",
    metric: "14 orders in 12 months",
  },
  {
    name: "Aster Healthcare",
    location: "Bengaluru · Corporate",
    image: IMG.hampers.hamper3,
    story:
      "We gift 300+ clients every Diwali, and for years the hampers were forgettable. NANDINI's corporate team coordinated everything over WhatsApp — custom notes, GST invoicing, staggered delivery to five cities. Clients actually called to ask where the hampers were from.",
    metric: "300 hampers · 5 cities",
  },
  {
    name: "Fatima S.",
    location: "Mumbai",
    image: IMG.dryFruits.dates2,
    story:
      "Ramadan evenings run on dates and dry fruits in our home. NANDINI's Medjool dates taste like toffee — my children now refuse the supermarket kind. The pistachios crackle exactly the way fresh ones should. My iftar table has never looked better.",
    metric: "Weekly subscriber since 2024",
  },
];

export default function SuccessStoriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Customer Stories"
        title="Stories From Our Customers"
        description="Behind every reorder is a kitchen, a festival, a family. Here are some of their stories — shared with permission, told without embellishment."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Success Stories" }]}
      />

      {/* Featured stories */}
      <section className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-20 space-y-16">
        {FEATURED.map((s, i) => (
          <Reveal key={s.name}>
            <article className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center`}>
              <div className={`relative ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image src={s.image} alt={`${s.name} story`} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                </div>
                <span className="absolute bottom-4 left-4 bg-forest-950/75 backdrop-blur-sm text-gold-300 text-[11px] font-semibold tracking-wide rounded-full px-4 py-2">
                  {s.metric}
                </span>
              </div>
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <Quote size={30} className="text-gold-400/50" aria-hidden />
                <p className="text-[15.5px] leading-[1.85] text-cocoa-600 mt-4">{s.story}</p>
                <div className="mt-6 flex items-center gap-4">
                  <span className="w-12 h-12 rounded-full bg-forest-800 text-gold-300 font-display text-lg font-semibold flex items-center justify-center">
                    {s.name.charAt(0)}
                  </span>
                  <div>
                    <p className="font-display text-[16px] font-semibold text-forest-900">{s.name}</p>
                    <p className="text-[12px] text-cocoa-400">{s.location}</p>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      {/* Review wall */}
      <section className="bg-cream/60 texture-grain border-t border-border/60 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="In Their Words"
              title="More From Verified Families"
              description="Every review below comes from a verified purchase. We publish the four-star ones too — trust needs honesty."
            />
          </Reveal>
          <div className="mt-14 columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={(i % 3) * 0.06} className="break-inside-avoid">
                <figure className="bg-card rounded-lg border border-border/70 p-6">
                  <div className="flex items-center justify-between">
                    <StarRating rating={t.rating} size={13} />
                    <span className="inline-flex items-center gap-1 text-[9.5px] font-semibold tracking-wide uppercase text-forest-600 bg-forest-50 border border-forest-100 rounded-full px-2.5 py-1">
                      <BadgeCheck size={10} /> Verified
                    </span>
                  </div>
                  <blockquote className="mt-4 text-[13px] leading-relaxed text-cocoa-600">“{t.text}”</blockquote>
                  <figcaption className="mt-5 pt-4 border-t border-border/60">
                    <p className="text-[13px] font-semibold text-forest-900 font-display">{t.name}</p>
                    <p className="text-[11px] text-cocoa-400 mt-0.5">{t.location}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
