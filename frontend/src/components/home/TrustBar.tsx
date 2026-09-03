"use client";

import { Leaf, Flame, ShieldCheck, Package, Truck } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";

const ITEMS = [
  { icon: Leaf, title: "100% Natural", text: "Carefully sourced ingredients" },
  { icon: Flame, title: "Traditional Bilona", text: "Inspired by traditional craftsmanship" },
  { icon: ShieldCheck, title: "Quality Checked", text: "Carefully inspected products" },
  { icon: Package, title: "Freshly Packed", text: "Packed with care" },
  { icon: Truck, title: "Secure Delivery", text: "Safe packaging across India" },
];

export function TrustBar() {
  return (
    <section className="bg-ivory border-b border-border/70" aria-label="Why trust NANDINI">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 divide-x divide-border/50">
          {ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={i * 0.06} y={12}>
                <li className="flex flex-col items-center text-center gap-1.5 py-6 md:py-7 px-3 md:px-5 h-full justify-start">
                  <Icon size={22} strokeWidth={1.4} className="text-gold-600" />
                  <p className="text-[12px] md:text-[12.5px] font-semibold tracking-wide text-forest-900 mt-1">{item.title}</p>
                  <p className="text-[10.5px] md:text-[11px] leading-snug text-cocoa-400">{item.text}</p>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
