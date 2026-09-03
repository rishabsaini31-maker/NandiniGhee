"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { IMG } from "@/lib/data/images";

const STEPS = ["Milk", "Curd", "Bilona Churning", "Butter", "Slow Cooking", "Ghee"];

export function GheeStory() {
  return (
    <section className="py-20 md:py-28 bg-forest-950 relative overflow-hidden" aria-label="Our ghee story">
      <div className="mx-auto max-w-7xl px-5 md:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image */}
        <Reveal className="relative">
          <div className="relative aspect-[4/5] max-h-[620px] w-full overflow-hidden rounded-lg">
            <Image
              src={IMG.process.bilona1}
              alt="Traditional bilona churning with a wooden churner"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          {/* Floating detail card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="absolute -bottom-6 -right-3 md:right-8 bg-card rounded-md shadow-xl px-6 py-5 border border-gold-300/40 max-w-[240px]"
          >
            <p className="font-display text-3xl font-semibold text-forest-900">30L</p>
            <p className="text-[11.5px] text-cocoa-500 leading-snug mt-1">
              of fresh A2 milk goes into every single litre of our bilona ghee.
            </p>
          </motion.div>
        </Reveal>

        {/* Text */}
        <div>
          <Reveal>
            <p className="eyebrow text-gold-400 flex items-center gap-3">
              <span className="h-px w-10 bg-gold-500/70" /> The Bilona Method
            </p>
            <h2 className="font-display text-3xl md:text-[2.7rem] leading-[1.1] font-medium text-ivory mt-4 text-balance">
              Made the Traditional Way.
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-forest-100/70">
              No centrifuges. No cream shortcuts. No machinery touching what your family eats. Our ghee begins with
              whole-milk curd set overnight in earthen pots, hand-churned with a wooden bilona until cultured butter
              rises, then simmered slowly until it turns golden, grainy and deeply aromatic.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-forest-100/70">
              It is the slower, costlier, older way — and it is the only way ghee deserves to be made.
            </p>
          </Reveal>

          {/* Journey chips */}
          <Reveal delay={0.15}>
            <ol className="mt-8 flex flex-wrap items-center gap-y-3 gap-x-2">
              {STEPS.map((s, i) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-full border border-gold-500/30 bg-forest-900/60 text-[11px] font-medium tracking-wide text-gold-200">
                    {s}
                  </span>
                  {i < STEPS.length - 1 && <span className="text-gold-500/60 text-xs">→</span>}
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.25}>
            <Link
              href="/process"
              className="group mt-10 inline-flex items-center gap-2.5 text-[12.5px] font-semibold tracking-[0.18em] uppercase text-gold-300 hover:text-gold-200 transition-colors"
            >
              Discover Our Process
              <span className="w-9 h-9 rounded-full border border-gold-500/40 flex items-center justify-center transition-all duration-300 group-hover:bg-gold-500 group-hover:text-forest-950">
                <ArrowRight size={15} />
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
