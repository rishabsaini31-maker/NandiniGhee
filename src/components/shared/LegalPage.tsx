import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <div className="bg-ivory">
      {/* Header */}
      <div className="bg-forest-950 texture-grain">
        <div className="mx-auto max-w-4xl px-5 md:px-8 pt-32 md:pt-40 pb-12">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-[11.5px]">
              <li><Link href="/" className="text-forest-200/70 hover:text-gold-300 transition-colors">Home</Link></li>
              <li><ChevronRight size={12} className="text-forest-300/60" /></li>
              <li><span className="text-gold-300 font-medium">{title}</span></li>
            </ol>
          </nav>
          <p className="eyebrow text-gold-400">Legal Document</p>
          <h1 className="font-display text-3xl md:text-5xl font-medium text-ivory mt-3 text-balance">{title}</h1>
          <p className="text-[12px] text-forest-200/60 mt-4 uppercase tracking-wider">Last updated: {updated}</p>
        </div>
      </div>
      <div className="gold-hairline" />

      {/* Body */}
      <div className="mx-auto max-w-4xl px-5 md:px-8 py-14 md:py-16">
        <p className="font-display text-[17px] leading-relaxed text-forest-900 border-l-2 border-gold-500 pl-5">{intro}</p>

        <div className="mt-10 space-y-10">
          {sections.map((s, i) => (
            <section key={s.heading} aria-label={s.heading}>
              <h2 className="font-display text-[22px] font-semibold text-forest-900 flex items-baseline gap-3">
                <span className="text-gold-600 text-[15px] font-sans font-bold">{String(i + 1).padStart(2, "0")}</span>
                {s.heading}
              </h2>
              {s.paragraphs?.map((p, j) => (
                <p key={j} className="mt-3.5 text-[14.5px] leading-[1.8] text-cocoa-600">
                  {p}
                </p>
              ))}
              {s.bullets && (
                <ul className="mt-4 space-y-2.5">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-[14px] leading-relaxed text-cocoa-600">
                      <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0" aria-hidden />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-border">
          <p className="text-[12.5px] text-cocoa-400 leading-relaxed">
            Questions about this document? Write to{" "}
            <a href="mailto:legal@nandinighee.in" className="text-forest-800 font-medium underline decoration-gold-400 underline-offset-4">
              legal@nandinighee.in
            </a>{" "}
            or post to NANDINI Foods Pvt. Ltd., 14th Milestone, Jodhpur, Rajasthan 342001, India.
          </p>
        </div>
      </div>
    </div>
  );
}
