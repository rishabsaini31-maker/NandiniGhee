import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-forest-950 texture-grain relative px-5">
      <div className="text-center max-w-md">
        <p className="eyebrow text-gold-400">404</p>
        <h1 className="font-display text-4xl md:text-5xl font-medium text-ivory mt-4 text-balance">
          This shelf is empty.
        </h1>
        <p className="text-[14px] leading-relaxed text-forest-100/70 mt-5">
          The page you&apos;re looking for has wandered off — perhaps to churn some butter. Let&apos;s get you back to the good stuff.
        </p>
        <div className="mt-9 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="h-12 px-8 inline-flex items-center justify-center bg-gold-500 text-forest-950 hover:bg-gold-400 text-[12px] font-bold tracking-[0.16em] uppercase rounded-sm transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/shop"
            className="h-12 px-8 inline-flex items-center justify-center border border-ivory/40 text-ivory hover:bg-ivory/10 text-[12px] font-bold tracking-[0.16em] uppercase rounded-sm transition-colors"
          >
            Browse the Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
