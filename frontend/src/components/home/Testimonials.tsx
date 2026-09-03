"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, BadgeCheck, Quote } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { StarRating } from "@/components/shared/StarRating";
import { TESTIMONIALS } from "@/lib/data/content";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const perView = 3;
  const pages = Math.ceil(TESTIMONIALS.length / perView);

  const next = useCallback(() => {
    setDir(1);
    setIndex((i) => (i + 1) % pages);
  }, [pages]);

  const prev = useCallback(() => {
    setDir(-1);
    setIndex((i) => (i - 1 + pages) % pages);
  }, [pages]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next, paused]);

  const visible = TESTIMONIALS.slice(index * perView, index * perView + perView);

  return (
    <section
      className="py-20 md:py-28 bg-cream/60 texture-grain"
      aria-label="Customer reviews"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Testimonials"
            title="Loved by Families Across India"
            description="From Bengaluru to Amritsar — kitchens that have made the switch to honest food."
          />
        </Reveal>

        <div className="mt-14 relative">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={index}
                custom={dir}
                initial={{ opacity: 0, x: dir * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -60 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="grid md:grid-cols-3 gap-5"
              >
                {visible.map((t) => (
                  <figure
                    key={t.name}
                    className="relative flex flex-col h-full bg-card rounded-lg border border-border/70 p-7 shadow-[0_10px_40px_-24px_rgba(18,33,26,0.3)]"
                  >
                    <Quote size={26} className="text-gold-400/50 absolute top-6 right-6" aria-hidden />
                    <StarRating rating={t.rating} size={14} />
                    <blockquote className="mt-4 flex-1 text-[13.5px] leading-relaxed text-cocoa-600">
                      “{t.text}”
                    </blockquote>
                    <figcaption className="mt-6 pt-5 border-t border-border/60 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[13.5px] font-semibold text-forest-900 font-display">{t.name}</p>
                        <p className="text-[11px] text-cocoa-400 mt-0.5">{t.location}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-wide uppercase text-forest-600 bg-forest-50 border border-forest-100 rounded-full px-2.5 py-1">
                        <BadgeCheck size={11} /> Verified
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-9 flex items-center justify-center gap-5">
            <button
              onClick={prev}
              aria-label="Previous reviews"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-cocoa-500 hover:bg-forest-800 hover:text-ivory hover:border-forest-800 transition-all duration-300"
            >
              <ChevronLeft size={17} />
            </button>
            <div className="flex gap-2" role="tablist" aria-label="Review pages">
              {Array.from({ length: pages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDir(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  aria-label={`Go to review page ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-400 ${
                    i === index ? "w-7 bg-gold-500" : "w-1.5 bg-border hover:bg-cocoa-300"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next reviews"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-cocoa-500 hover:bg-forest-800 hover:text-ivory hover:border-forest-800 transition-all duration-300"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
