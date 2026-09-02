"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { toast } from "@/hooks/use-toast";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({ title: "Please enter a valid email", variant: "destructive" });
      return;
    }
    setDone(true);
    toast({ title: "Welcome to the family!", description: "Recipes & offers are on their way to your inbox." });
  };

  return (
    <section className="py-20 md:py-28 bg-forest-900 relative overflow-hidden" aria-label="Newsletter">
      {/* Decorative rings */}
      <div className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full border border-gold-500/10 pointer-events-none" aria-hidden />
      <div className="absolute -top-20 -right-20 w-[280px] h-[280px] rounded-full border border-gold-500/15 pointer-events-none" aria-hidden />
      <div className="absolute -bottom-40 -left-24 w-[380px] h-[380px] rounded-full border border-gold-500/10 pointer-events-none" aria-hidden />

      <div className="relative mx-auto max-w-3xl px-5 md:px-8 text-center">
        <Reveal>
          <span className="inline-flex w-14 h-14 rounded-full border border-gold-500/40 items-center justify-center text-gold-400 mx-auto">
            <Mail size={22} strokeWidth={1.5} />
          </span>
          <h2 className="font-display text-3xl md:text-[2.9rem] leading-[1.1] font-medium text-ivory mt-6 text-balance">
            Bring Goodness Home.
          </h2>
          <p className="mt-4 text-[14.5px] leading-relaxed text-forest-100/70 max-w-xl mx-auto">
            Get recipes, product updates, wellness inspiration and exclusive offers — written by our kitchen, not by
            a marketing machine. One thoughtful email a week.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          {done ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-9 inline-flex items-center gap-3 bg-forest-800 border border-gold-500/30 rounded-md px-7 py-4"
            >
              <CheckCircle2 size={19} className="text-gold-400" />
              <p className="text-[13.5px] text-ivory">
                You&apos;re in! Your first letter arrives this Friday.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={submit} className="mt-9 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 h-[52px] px-5 rounded-sm bg-forest-800/80 border border-forest-700 text-ivory placeholder:text-forest-200/40 text-[14px] outline-none focus:border-gold-500/60 transition-colors"
                required
              />
              <button
                type="submit"
                className="group h-[52px] px-8 inline-flex items-center justify-center gap-2 bg-gold-500 text-forest-950 hover:bg-gold-400 text-[12px] font-bold tracking-[0.16em] uppercase rounded-sm transition-all duration-300"
              >
                Subscribe
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>
          )}
          <p className="mt-5 text-[11px] text-forest-200/40">
            No spam, ever. Unsubscribe anytime with one click.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
