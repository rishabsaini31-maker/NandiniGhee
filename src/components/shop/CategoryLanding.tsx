import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";

interface CategoryLandingProps {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  breadcrumbLabel: string;
  intro?: string;
  children: React.ReactNode;
}

export function CategoryLanding({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  breadcrumbLabel,
  intro,
  children,
}: CategoryLandingProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[420px] md:min-h-[480px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-950/75 via-forest-950/45 to-forest-950/75" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8 w-full pt-28 pb-16">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-[11.5px]">
              <li>
                <Link href="/" className="text-forest-200/70 hover:text-gold-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight size={12} className="text-forest-300/60" />
              </li>
              <li>
                <span className="text-gold-300 font-medium">{breadcrumbLabel}</span>
              </li>
            </ol>
          </nav>
          <Reveal>
            <p className="eyebrow text-gold-300 flex items-center gap-3">
              <span className="h-px w-10 bg-gold-400/80" /> {eyebrow}
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-medium text-ivory mt-4 text-balance">{title}</h1>
            <p className="mt-4 text-[15px] md:text-base text-ivory/80 max-w-xl leading-relaxed">{description}</p>
          </Reveal>
          {intro && (
            <Reveal delay={0.12}>
              <p className="mt-6 text-[13px] leading-relaxed text-ivory/60 max-w-2xl border-l-2 border-gold-500/50 pl-4">
                {intro}
              </p>
            </Reveal>
          )}
        </div>
      </section>
      <div className="gold-hairline" />
      {children}
    </>
  );
}
