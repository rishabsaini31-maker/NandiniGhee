"use client";

import { Flame, Leaf, MapPin, ShieldCheck, Package, PackageCheck, Sparkles, HeartHandshake } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";

const FEATURES = [
  { icon: Flame, title: "Traditional Craftsmanship", text: "Wooden bilona churns, wood fires and unhurried hands — methods measured in hours, not minutes." },
  { icon: Leaf, title: "Premium Ingredients", text: "A2 milk from pasture-raised desi cows and current-season dry fruits from the world's finest orchards." },
  { icon: MapPin, title: "Carefully Sourced", text: "Named farms, named valleys, named orchards. We know every hand that touches what you eat." },
  { icon: ShieldCheck, title: "Quality Checked", text: "Every batch passes moisture, purity and adulteration checks at an FSSAI-licensed laboratory." },
  { icon: Package, title: "Freshly Packed", text: "Small batches, made-to-order packing and dated jars. Nothing sits in warehouses growing old." },
  { icon: PackageCheck, title: "Secure Packaging", text: "Tamper-evident seals, shock-absorbing boxes and temperature-conscious dispatch across India." },
  { icon: Sparkles, title: "Authentic Indian Taste", text: "The danedar texture, the nutty aroma, the taste your grandmother would nod at approvingly." },
  { icon: HeartHandshake, title: "Made With Care", text: "Fair pay for partner farms, small batches, and a customer team that answers like family." },
];

export function WhyNandini() {
  return (
    <section className="py-20 md:py-28 bg-forest-950 relative" aria-label="Why choose NANDINI">
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" aria-hidden>
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, #c09a45 0, transparent 30%), radial-gradient(circle at 80% 70%, #c09a45 0, transparent 25%)",
          }}
        />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            tone="light"
            eyebrow="The NANDINI Difference"
            title="Why Choose NANDINI?"
            description="Eight commitments we hold ourselves to — in the farm, the kitchen, the jar and the parcel at your door."
          />
        </Reveal>
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <Reveal key={f.title} delay={(i % 4) * 0.08}>
                <div className="group h-full rounded-lg border border-forest-800 bg-forest-900/50 p-6 transition-all duration-500 hover:border-gold-500/40 hover:bg-forest-900 hover:-translate-y-1">
                  <span className="inline-flex w-11 h-11 rounded-full bg-forest-800 border border-gold-500/25 items-center justify-center text-gold-400 transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-forest-950">
                    <Icon size={19} strokeWidth={1.5} />
                  </span>
                  <h3 className="font-display text-[17px] font-semibold text-ivory mt-4">{f.title}</h3>
                  <p className="text-[12.5px] leading-relaxed text-forest-100/60 mt-2">{f.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
