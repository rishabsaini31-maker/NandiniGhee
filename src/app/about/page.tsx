import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { IMG } from "@/lib/data/images";
import { WHY_NANDINI } from "@/lib/data/content";
import { Flame, Leaf, MapPin, ShieldCheck, Package, PackageCheck, Sparkles, HeartHandshake } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — Rooted in Tradition. Made for Today.",
  description:
    "NANDINI was created to bring authentic Indian food traditions into modern homes. Our story, values, farmers, process and quality — from Rajasthan to your kitchen.",
  alternates: { canonical: "/about" },
};

const ICONS: Record<string, React.ElementType> = {
  flame: Flame, leaf: Leaf, "map-pin": MapPin, "shield-check": ShieldCheck,
  package: Package, "package-check": PackageCheck, sparkles: Sparkles, "heart-handshake": HeartHandshake,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Story"
        title="Rooted in Tradition. Made for Today."
        description="NANDINI was created to bring authentic Indian food traditions into modern homes — without shortcuts, dilution or apologies."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      />

      {/* Hero image */}
      <section className="relative h-[46vh] md:h-[60vh] overflow-hidden">
        <Image src={IMG.hero.rajasthan} alt="Golden hues over Rajasthan at dusk" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-forest-950/30" />
      </section>

      {/* Our Story */}
      <section className="py-20 md:py-28" aria-label="Our story">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Chapter One"
              title="It started with a missing taste."
            />
            <div className="mt-6 space-y-4 text-[14.5px] leading-relaxed text-cocoa-600">
              <p>
                Our grandmother&apos;s ghee came from a neighbour&apos;s cow in a small town outside Jodhpur — made twice a month,
                gone in a week, impossible to reproduce. When we moved to the city and tried every &quot;premium&quot; jar on
                the shelf, we found technically-correct ghee that tasted like nothing at all. The soul had been engineered out.
              </p>
              <p>
                So in 2021 we did something unfashionable: we found a family dairy still willing to make ghee the slow way,
                asked them to teach us, and started selling batches to friends. Word travelled the way good food always does.
                Five years later, NANDINI partners with farms around Jodhpur and Pushkar, ships to 27,000+ pincodes, and
                still makes every jar the way batch number one was made.
              </p>
              <p>
                We named the brand after the family cow who supplied three generations of our ghee — a reminder that this is
                a promise between a kitchen and a home, not a transaction between a factory and a shelf.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
              <Image src={IMG.farm.cow1} alt="Desi cows grazing at a partner farm" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-4 bg-card rounded-md shadow-xl px-6 py-5 border border-gold-300/40">
              <p className="font-display text-3xl font-semibold text-forest-900">5 yrs</p>
              <p className="text-[11.5px] text-cocoa-500 mt-1 leading-snug">of unhurried, small-batch craft — and counting.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 md:py-28 bg-cream/60 texture-grain" aria-label="Our values">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="What We Stand For"
              title="Our Values"
              description="Four non-negotiables that decide every ingredient we buy, every batch we make and every parcel we ship."
            />
          </Reveal>
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: "Craft over speed", text: "If a method saves time but costs character, we don't use it. Our ghee takes 30 litres of milk per litre — and a full day." },
              { title: "Radical sourcing honesty", text: "We name our farms, valleys and orchards. If we can't tell you where it came from, we don't sell it." },
              { title: "Clean labels only", text: "No preservatives, no artificial anything, no health claims we can't support. Ingredients you can count on one hand." },
              { title: "Respect for the source", text: "Fair pay for partner farms, calves fed before milking, and packaging designed to be kept — not discarded." },
            ].map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="h-full bg-card rounded-lg border border-border/70 p-6">
                  <span className="font-display text-3xl font-semibold text-gold-500/70">0{i + 1}</span>
                  <h3 className="font-display text-lg font-semibold text-forest-900 mt-3">{v.title}</h3>
                  <p className="text-[13px] leading-relaxed text-cocoa-500 mt-2">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Farmers */}
      <section className="py-20 md:py-28" aria-label="Our farmers">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal className="order-2 lg:order-1">
            <SectionHeading
              align="left"
              eyebrow="The People"
              title="Our Farmers"
            />
            <div className="mt-6 space-y-4 text-[14.5px] leading-relaxed text-cocoa-600">
              <p>
                Our dairy partners are families who have kept indigenous cows for generations — the Raika pastoralists of
                Marwar, the Gurjar dairy families of the Aravalli foothills. We pay above-market rates for milk, agree prices
                before the season starts, and visit every farm quarterly. Calves are always fed first; cows are never pushed
                beyond their natural yield.
              </p>
              <p>
                For dry fruits, we work directly with grading houses in Panruti (cashews), Anantnag (walnuts) and Kandahar
                (anjeer), buying current-season stock in small lots so nothing sits in storage losing its character.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                <Image src={IMG.farm.cow2} alt="A desi cow at the farm" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
              </div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg mt-8">
                <Image src={IMG.farm.cow3} alt="Cows in pasture" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 md:py-24 bg-forest-950" aria-label="Our process summary">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <p className="eyebrow text-gold-400">The Craft</p>
            <h2 className="font-display text-3xl md:text-[2.6rem] leading-[1.12] font-medium text-ivory mt-4">
              Our Process hasn&apos;t changed in 3,000 years. We intend to keep it that way.
            </h2>
            <p className="mt-5 text-[14.5px] leading-relaxed text-forest-100/70">
              Milk to curd, curd to butter, butter to ghee — through the wooden bilona and the slow fire. Six steps, zero
              machines, endless patience. Read the full journey on our process page.
            </p>
            <Link href="/process" className="mt-8 inline-flex h-12 px-8 items-center rounded-sm bg-gold-500 text-forest-950 hover:bg-gold-400 text-[12px] font-bold tracking-[0.16em] uppercase transition-all">
              Explore Our Process
            </Link>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative aspect-[16/11] overflow-hidden rounded-lg">
              <Image src={IMG.process.bilona2} alt="Traditional wooden bilona churn" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Our Quality */}
      <section className="py-20 md:py-28" aria-label="Our quality commitments">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="The Standard"
              title="Our Quality"
              description="Every batch is checked, dated and sealed — and stands behind our commitments listed here."
            />
          </Reveal>
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_NANDINI.slice(0, 8).map((f, i) => {
              const Icon = ICONS[f.icon];
              return (
                <Reveal key={f.title} delay={(i % 4) * 0.07}>
                  <div className="h-full rounded-lg border border-border/70 bg-card p-6">
                    <Icon size={20} strokeWidth={1.5} className="text-gold-600" />
                    <h3 className="font-display text-[16px] font-semibold text-forest-900 mt-3.5">{f.title}</h3>
                    <p className="text-[12.5px] leading-relaxed text-cocoa-500 mt-1.5">{f.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={0.2} className="mt-12 text-center">
            <Link href="/quality" className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.16em] uppercase text-forest-800 hover:text-gold-600 transition-colors border-b border-gold-500/50 pb-1">
              Read Our Quality &amp; Purity Standards
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
