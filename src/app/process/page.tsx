import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/shared/PageHeader";
import { Reveal } from "@/components/shared/Reveal";
import { PROCESS_STEPS } from "@/lib/data/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Our Process — Milk to Ghee, the Ancient Way",
  description:
    "Six unhurried steps: milk, curd, bilona churning, butter, slow cooking, ghee. See exactly how NANDINI's A2 bilona ghee is made — no machines, no shortcuts.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Bilona Method"
        title="Six Steps. Zero Shortcuts."
        description="From first light at the farm to the jar on your table — this is the entire journey of our ghee."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Our Process" }]}
      />

      <div className="mx-auto max-w-6xl px-5 md:px-8 py-16 md:py-24 space-y-20 md:space-y-28">
        {PROCESS_STEPS.map((step, i) => (
          <Reveal key={step.step}>
            <div className={cn("grid lg:grid-cols-2 gap-10 lg:gap-16 items-center")}>
              {/* Image */}
              <div className={cn("relative", i % 2 === 1 && "lg:order-2")}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={step.image}
                    alt={`${step.title} — step ${step.step} of NANDINI's bilona process`}
                    fill
                    loading={i < 2 ? "eager" : "lazy"}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <span className="absolute -top-5 -left-2 md:-left-5 font-display text-7xl font-semibold text-gold-500/30 select-none" aria-hidden>
                  {step.step}
                </span>
              </div>
              {/* Text */}
              <div className={cn(i % 2 === 1 && "lg:order-1")}>
                <p className="eyebrow text-gold-600">Step {step.step}</p>
                <h2 className="font-display text-3xl md:text-4xl font-medium text-forest-900 mt-3">{step.title}</h2>
                <p className="text-[13px] italic font-display text-cocoa-400 mt-1.5">{step.subtitle}</p>
                <p className="text-[14.5px] leading-relaxed text-cocoa-600 mt-5">{step.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Closing */}
      <section className="bg-forest-950 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <Reveal>
            <p className="eyebrow text-gold-400">The Result</p>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-ivory mt-4 text-balance">
              Golden. Grainy. Unmistakably honest.
            </h2>
            <p className="mt-5 text-[14.5px] leading-relaxed text-forest-100/70">
              Roughly 30 litres of milk, one wooden churn, a day of slow fire, and hands that refuse to hurry. That is what
              a jar of NANDINI costs before it ever reaches a shelf.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
