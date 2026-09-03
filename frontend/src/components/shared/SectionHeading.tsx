import { SectionHeadingProps } from "@/lib/types-shared";

export function SectionHeading({ eyebrow, title, description, align = "center", tone = "dark" }: SectionHeadingProps) {
  const alignCls = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`flex flex-col gap-3 ${alignCls}`}>
      {eyebrow && (
        <span className={`eyebrow ${tone === "dark" ? "text-gold-600" : "text-gold-400"}`}>{eyebrow}</span>
      )}
      <h2
        className={`font-display text-3xl md:text-[2.6rem] leading-[1.12] font-medium tracking-tight text-balance ${
          tone === "dark" ? "text-forest-900" : "text-ivory"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`max-w-2xl text-[15px] md:text-base leading-relaxed text-balance ${
            tone === "dark" ? "text-cocoa-500" : "text-forest-100/75"
          } ${align === "center" ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
