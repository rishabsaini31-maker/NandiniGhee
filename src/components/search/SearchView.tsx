"use client";

import { useEffect, useState, Suspense } from "react";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { ProductCard } from "@/components/product/ProductCard";
import { searchProducts, PRODUCTS } from "@/lib/data/products";
import { POPULAR_SEARCHES } from "@/lib/data/content";
import { useUser } from "@/lib/store/user";

function SearchInner() {
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const [userQuery, setUserQuery] = useState<string | null>(null);
  const query = userQuery ?? q;
  const recentSearches = useUser((s) => s.recentSearches);
  const pushRecent = useUser((s) => s.pushRecentSearch);

  useEffect(() => {
    if (q) pushRecent(q);
  }, [q, pushRecent]);

  const results = query.trim() ? searchProducts(query) : [];

  return (
    <>
      <PageHeader
        eyebrow="Find Your Favourite"
        title={query ? `Results for “${query}”` : "Search"}
        description={query ? `${results.length} product${results.length === 1 ? "" : "s"} found` : "Search our collection of ghee, dry fruits and hampers."}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Search" }]}
      />
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-14">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-cocoa-400" />
            <input
              value={query}
              onChange={(e) => setUserQuery(e.target.value)}
              placeholder="Try “bilona ghee” or “almonds”…"
              className="w-full h-14 pl-13 pl-12 pr-5 rounded-md border border-border bg-card text-[15px] outline-none focus:border-gold-400 shadow-sm transition-colors"
              aria-label="Search products"
            />
          </div>

          {/* Suggestions */}
          <div className="mt-5 flex flex-wrap items-center gap-2 justify-center">
            <span className="text-[11px] tracking-[0.14em] uppercase text-cocoa-400 mr-1">Popular:</span>
            {POPULAR_SEARCHES.slice(0, 5).map((s) => (
              <button
                key={s}
                onClick={() => setUserQuery(s)}
                className="px-3 py-1.5 rounded-full border border-border text-[12px] text-cocoa-500 hover:border-gold-400 hover:text-forest-800 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>

          {recentSearches.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-2 justify-center">
              <span className="text-[11px] tracking-[0.14em] uppercase text-cocoa-400 mr-1">Recent:</span>
              {recentSearches.slice(0, 4).map((s) => (
                <button
                  key={s}
                  onClick={() => setUserQuery(s)}
                  className="px-3 py-1.5 rounded-full bg-parchment text-[12px] text-cocoa-500 hover:bg-forest-800 hover:text-ivory transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mt-14">
          {query.trim() ? (
            results.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {results.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="font-display text-2xl text-forest-900">No matches for “{query}”</p>
                <p className="text-[13px] text-cocoa-400 mt-2">Try a different spelling, or browse the full shop.</p>
              </div>
            )
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {PRODUCTS.filter((p) => p.isBestseller)
                .slice(0, 4)
                .map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export function SearchView() {
  return (
    <Suspense>
      <SearchInner />
    </Suspense>
  );
}
