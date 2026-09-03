import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { ContactForm } from "@/components/forms/ContactForm";
import { Mail, Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";

export const metadata: Metadata = {
  title: "Contact Us — We'd Love to Hear From You",
  description:
    "Questions about orders, products or gifting? Reach the NANDINI GHEE team by email, phone or WhatsApp — or send us a message and we'll reply within one working day.",
  alternates: { canonical: "/contact" },
};

const CHANNELS = [
  { icon: Mail, title: "Email Us", lines: ["hello@nandinighee.in", "Replies within 1 working day"] },
  { icon: Phone, title: "Call Us", lines: ["+91 98200 12345", "Mon–Sat, 9 AM – 7 PM IST"] },
  { icon: MessageCircle, title: "WhatsApp", lines: ["+91 98200 12345", "Fastest response, 7 days a week"] },
  { icon: MapPin, title: "Business Address", lines: ["NANDINI Foods Pvt. Ltd.", "14th Milestone, Jodhpur, Rajasthan 342001"] },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Say Namaste"
        title="We'd Love to Hear From You."
        description="Order questions, gift planning, feedback that stings a little — all of it is welcome. A human replies to every message."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
      />

      <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-20">
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-start">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.12}>
            <div className="space-y-5 lg:sticky lg:top-28">
              {CHANNELS.map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.title} className="flex gap-4 rounded-lg border border-border/70 bg-card p-5">
                    <span className="w-11 h-11 rounded-full bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-700 shrink-0">
                      <Icon size={18} strokeWidth={1.6} />
                    </span>
                    <div>
                      <h3 className="text-[13.5px] font-semibold text-forest-900">{c.title}</h3>
                      {c.lines.map((l, i) => (
                        <p key={l} className={i === 0 ? "text-[13px] text-cocoa-600 mt-1" : "text-[11.5px] text-cocoa-400 mt-0.5"}>
                          {l}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
              <div className="flex gap-4 rounded-lg bg-forest-950 text-ivory p-5">
                <Clock size={18} className="text-gold-400 shrink-0 mt-0.5" />
                <p className="text-[12.5px] leading-relaxed text-forest-100/75">
                  Support hours: Monday to Saturday, 9 AM – 7 PM IST. Festive season may add slight delays — we will always
                  tell you honestly.
                </p>
              </div>
              <p className="text-[11.5px] text-cocoa-400 leading-relaxed px-1">
                A map of our Jodhpur office will appear here once the exact visit address is finalised.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
