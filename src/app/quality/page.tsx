import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { IMG } from "@/lib/data/images";

export const metadata: Metadata = {
  title: "Quality & Purity — Our Standards",
  description:
    "Ingredient sourcing, hygiene, quality checks, packaging standards, storage and traceability. How NANDINI ensures every jar and pack meets its promise.",
  alternates: { canonical: "/quality" },
};

const SECTIONS = [
  {
    title: "Ingredient Sourcing",
    text: "We buy only current-season stock from named farms, valleys and orchards, agreed before the season begins. Milk comes exclusively from indigenous desi cow breeds raised on pasture; dry fruits are graded to published standards (W240 cashews, naturally-split pistachios, jumbo Medjool) and rejected if they fall below spec.",
    points: ["Named farms & origins on every product", "Pre-season price agreements with farmers", "Small-lot purchasing for peak freshness"],
  },
  {
    title: "Hygiene",
    text: "Production areas follow food-grade hygiene protocols: dedicated footwear and clothing, daily sanitation of churns and kadhais, filtered water for all washing steps, and health checks for all handling staff. No outsiders enter the curd or churning rooms during production.",
    points: ["Daily sanitised equipment & surfaces", "Filtered water in all washing steps", "Staff health & hygiene monitoring"],
  },
  {
    title: "Quality Checks",
    text: "Every batch passes moisture, FFA (free fatty acid) and adulteration tests at an FSSAI-licensed third-party laboratory before it is approved for jarring. Dry fruit lots are checked for moisture, foreign matter and aflatoxin compliance. Batches that fail any parameter never leave the building.",
    points: ["FSSAI-licensed lab testing per batch", "Adulteration & purity screening", "Rejected lots destroyed, never discounted"],
  },
  {
    title: "Packaging Standards",
    text: "Ghee is hand-jarred while faintly warm into food-grade glass with tamper-evident seals. Dry fruits are packed in multi-layer, resealable, food-grade pouches with nitrogen flush on select items. Every unit carries a made-on date, best-before date and batch number.",
    points: ["Tamper-evident glass for ghee", "Resealable food-grade pouches", "Batch number & dates on every unit"],
  },
  {
    title: "Storage",
    text: "Warehouse storage is temperature-monitored and pest-controlled with full stock rotation (FIFO). Walnuts and other oil-rich nuts are cold-stored. We produce in small batches precisely so that stock never waits long enough to age.",
    points: ["Temperature-monitored warehousing", "Cold storage for oil-rich nuts", "Strict first-in, first-out rotation"],
  },
  {
    title: "Traceability",
    text: "Every jar and pack can be traced back to its batch, its lab report and — for ghee — the specific churn it came from and the day it was made. If you ever have a question about what you are holding, write to us with the batch number and we will show you its paperwork.",
    points: ["Batch-level traceability", "Lab reports available on request", "Full supply-chain documentation"],
  },
];

export default function QualityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Trust, Documented"
        title="Quality & Purity"
        description="The standards behind every jar and pack — from the farm gate to your doorstep. No claims we cannot evidence."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Quality & Purity" }]}
      />

      <section className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16 md:mb-20">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Our Promise"
              title="Purity is not a feature. It is the whole product."
            />
            <p className="mt-6 text-[14.5px] leading-relaxed text-cocoa-600">
              Premium food brands ask for your trust; we would rather earn it with paperwork. Below are the six pillars of
              our quality system. Each is auditable, each is dated, and each applies to every batch — including the ones we
              could have shipped but chose not to.
            </p>
            <p className="mt-4 text-[14.5px] leading-relaxed text-cocoa-600">
              We make no medical claims anywhere on this website. Our products are traditional foods, and we describe them
              as such — honestly and without exaggeration.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image src={IMG.ghee.jar4} alt="NANDINI ghee jar sealed and dated" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
          </Reveal>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {SECTIONS.map((s, i) => (
            <Reveal key={s.title} delay={Math.min(i * 0.05, 0.2)}>
              <article className="rounded-lg border border-border/70 bg-card p-6 md:p-8">
                <div className="flex items-start gap-5">
                  <span className="font-display text-2xl font-semibold text-gold-500/60 shrink-0 w-10">0{i + 1}</span>
                  <div>
                    <h2 className="font-display text-xl md:text-2xl font-semibold text-forest-900">{s.title}</h2>
                    <p className="text-[14px] leading-relaxed text-cocoa-600 mt-3">{s.text}</p>
                    <ul className="mt-4 space-y-2">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-start gap-2.5 text-[13px] text-forest-800">
                          <CheckCircle2 size={15} className="text-gold-600 mt-0.5 shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 h-12 px-8 rounded-sm bg-forest-800 text-ivory hover:bg-forest-700 text-[12px] font-bold tracking-[0.16em] uppercase transition-all"
          >
            Request a Batch Report <ArrowRight size={14} />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
