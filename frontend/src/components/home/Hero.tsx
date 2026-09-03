"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { IMG } from "@/lib/data/images";

export function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center overflow-hidden" aria-label="Hero">
      {/* Background */}
      <div className="absolute inset-0">
        <motion.div
          initial={reduce ? {} : { scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={IMG.hero.gheeJar}
            alt="Traditional earthen ghee jars set on a wooden tray in warm light"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/70 via-forest-950/40 to-forest-950/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8 w-full pt-36 pb-24 lg:pt-40">
        <div className="max-w-2xl">
          <motion.p
            initial={reduce ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="eyebrow text-gold-300 flex items-center gap-3"
          >
            <span className="h-px w-10 bg-gold-400/80" />
            From the heart of Rajasthan
          </motion.p>

          <motion.h1
            initial={reduce ? {} : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45 }}
            className="font-display text-[2.9rem] leading-[1.04] md:text-7xl lg:text-[5.4rem] font-medium text-ivory mt-5 text-balance"
          >
            Pure by Tradition.
          </motion.h1>

          <motion.p
            initial={reduce ? {} : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="mt-6 text-[16px] md:text-lg leading-relaxed text-ivory/85 max-w-xl"
          >
            Authentic Desi Cow Ghee &amp; Premium Dry Fruits, inspired by the timeless traditions of Rajasthan.
          </motion.p>

          <motion.div
            initial={reduce ? {} : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/shop/ghee"
              className="group h-[52px] px-8 inline-flex items-center justify-center gap-2.5 bg-gold-500 text-forest-950 hover:bg-gold-400 text-[12.5px] font-bold tracking-[0.16em] uppercase rounded-sm transition-all duration-300 hover:shadow-[0_14px_36px_-10px_rgba(192,154,69,0.55)]"
            >
              Shop Ghee
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/shop/dry-fruits"
              className="h-[52px] px-8 inline-flex items-center justify-center border border-ivory/40 text-ivory hover:bg-ivory/10 hover:border-ivory/70 text-[12.5px] font-bold tracking-[0.16em] uppercase rounded-sm backdrop-blur-sm transition-all duration-300"
            >
              Explore Dry Fruits
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-ivory/60"
        aria-hidden
      >
        <span className="text-[9.5px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.span
          animate={reduce ? {} : { y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-gold-400/90 to-transparent"
        />
      </motion.div>
    </section>
  );
}
