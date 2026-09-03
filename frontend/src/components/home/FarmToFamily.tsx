"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { FARM_TO_FAMILY } from "@/lib/data/content";

export function FarmToFamily() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section ref={ref} className="py-20 md:py-28 bg-background overflow-hidden" aria-label="From our farm to your family">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="The Journey"
            title="From Our Farm to Your Family"
            description="Six unhurried steps stand between our partner farms and your kitchen. Every one of them matters."
          />
        </Reveal>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {FARM_TO_FAMILY.map((step, i) => (
            <Reveal key={step.step} delay={(i % 3) * 0.1}>
              <div className="group">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-cream">
                  <motion.div style={{ y: i % 2 === 0 ? yBg : 0 }} className="absolute inset-0">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-105"
                    />
                  </motion.div>
                  <span className="absolute top-4 left-4 font-display text-[42px] leading-none font-semibold text-ivory/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
                    {step.step}
                  </span>
                </div>
                <div className="mt-5 flex items-start gap-3">
                  <span className="mt-1.5 w-6 h-px bg-gold-500 shrink-0" aria-hidden />
                  <div>
                    <h3 className="font-display text-xl font-semibold text-forest-900">{step.title}</h3>
                    <p className="text-[13px] leading-relaxed text-cocoa-500 mt-1.5">{step.text}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
