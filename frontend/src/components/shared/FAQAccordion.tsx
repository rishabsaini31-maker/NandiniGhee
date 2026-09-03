"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { FAQ_CATEGORIES } from "@/lib/data/content";
import { cn } from "@/lib/utils";

export function FAQAccordionView() {
  const categories = FAQ_CATEGORIES.map((c) => c.name);
  const [activeCat, setActiveCat] = useState<string>("All");
  const [open, setOpen] = useState<string | null>("0-0");

  const filtered = FAQ_CATEGORIES.filter((c) => activeCat === "All" || c.name === activeCat);

  return (
    <div className="mx-auto max-w-3xl px-5 md:px-8 py-14 md:py-16">
      {/* Category chips */}
      <div className="flex flex-wrap gap-2 justify-center mb-12">
        {["All", ...categories].map((c) => (
          <button
            key={c}
            onClick={() => setActiveCat(c)}
            className={cn(
              "px-4 py-2 rounded-full text-[12px] font-semibold tracking-wide transition-all",
              activeCat === c ? "bg-forest-800 text-ivory" : "border border-border text-cocoa-500 hover:border-gold-400 hover:text-forest-800"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-10">
        {filtered.map((cat) => (
          <section key={cat.name} aria-label={`${cat.name} questions`}>
            {activeCat === "All" && (
              <h2 className="eyebrow text-gold-600 mb-4">{cat.name}</h2>
            )}
            <div className="rounded-lg border border-border/70 bg-card divide-y divide-border/60 overflow-hidden">
              {cat.faqs.map((faq, i) => {
                const id = `${cat.name}-${i}`;
                const isOpen = open === id;
                return (
                  <div key={faq.q}>
                    <button
                      onClick={() => setOpen(isOpen ? null : id)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-4 px-5 md:px-6 py-4.5 py-[18px] text-left group"
                    >
                      <span className={cn("text-[14px] font-semibold transition-colors", isOpen ? "text-forest-900" : "text-cocoa-700 group-hover:text-forest-900")}>
                        {faq.q}
                      </span>
                      <span
                        className={cn(
                          "w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300",
                          isOpen ? "bg-forest-800 border-forest-800 text-ivory rotate-45" : "border-border text-cocoa-400 group-hover:border-gold-400"
                        )}
                      >
                        <Plus size={14} />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 md:px-6 pb-5 text-[13.5px] leading-relaxed text-cocoa-500">{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-12 text-center text-[13px] text-cocoa-400">
        Didn&apos;t find your answer? Write to us at{" "}
        <a href="mailto:hello@nandinighee.in" className="text-forest-800 font-medium underline decoration-gold-400 underline-offset-4">
          hello@nandinighee.in
        </a>{" "}
        — a human replies within a working day.
      </p>
    </div>
  );
}
