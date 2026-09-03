import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumb: { label: string; href?: string }[];
  align?: "center" | "left";
}

export function PageHeader({ eyebrow, title, description, breadcrumb, align = "center" }: PageHeaderProps) {
  return (
    <div className="bg-forest-950 texture-grain relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" aria-hidden>
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, #c09a45 0, transparent 25%), radial-gradient(circle at 85% 80%, #c09a45 0, transparent 20%)",
          }}
        />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 md:px-8 pt-32 md:pt-40 pb-14 md:pb-16">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 text-[11.5px] tracking-wide">
            {breadcrumb.map((item, i) => (
              <li key={item.label} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight size={12} className="text-forest-300/60" />}
                {item.href ? (
                  <Link href={item.href} className="text-forest-200/70 hover:text-gold-300 transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-gold-300 font-medium">{item.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <SectionHeading
          align={align}
          eyebrow={eyebrow}
          title={title}
          description={description}
          tone="light"
        />
      </div>
      <div className="gold-hairline" />
    </div>
  );
}
