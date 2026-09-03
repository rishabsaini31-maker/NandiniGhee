import { cn } from "@/lib/utils";

/** NANDINI GHEE wordmark — serif brand name with gold rule & tagline */
export function Logo({ dark = false, compact = false, className }: { dark?: boolean; compact?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex flex-col leading-none select-none", className)}>
      <span
        className={cn(
          "font-display font-semibold tracking-[0.08em] transition-all duration-500",
          compact ? "text-[19px]" : "text-[21px] md:text-[24px]",
          dark ? "text-forest-900" : "text-ivory"
        )}
      >
        NANDINI
      </span>
      <span className="flex items-center gap-2 mt-1">
        <span className={cn("h-px w-5 transition-colors duration-500", dark ? "bg-gold-600" : "bg-gold-400")} />
        <span
          className={cn(
            "text-[8.5px] font-sans font-medium tracking-[0.42em] uppercase transition-all duration-500",
            dark ? "text-gold-700" : "text-gold-300"
          )}
        >
          GHEE
        </span>
        <span className={cn("h-px flex-1 transition-colors duration-500", dark ? "bg-gold-600" : "bg-gold-400")} />
      </span>
    </span>
  );
}

/** Compact monogram for footer / favicons */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center w-10 h-10 rounded-full border border-gold-500/60 font-display text-lg font-semibold text-gold-400",
        className
      )}
      aria-hidden
    >
      N
    </span>
  );
}
