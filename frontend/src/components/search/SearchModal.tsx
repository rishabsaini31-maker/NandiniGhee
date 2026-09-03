"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Clock, TrendingUp, ArrowRight } from "lucide-react";
import { PRODUCTS, searchProducts } from "@/lib/data/products";
import { CATEGORIES, POPULAR_SEARCHES } from "@/lib/data/content";
import { useUI, useUser } from "@/lib/store/user";
import { useCart } from "@/lib/store/cart";
import { formatINR } from "@/lib/format";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function SearchModal() {
  const { searchOpen, setSearchOpen } = useUI();

  useEffect(() => {
    if (searchOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSearchOpen]);

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-forest-950/60 backdrop-blur-sm"
          onClick={() => setSearchOpen(false)}
        >
          <SearchDialog onClose={() => setSearchOpen(false)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Lives inside AnimatePresence — unmounts on close, so its state resets naturally. */
function SearchDialog({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const recentSearches = useUser((s) => s.recentSearches);
  const pushRecentSearch = useUser((s) => s.pushRecentSearch);
  const clearRecent = useUser((s) => s.clearRecentSearches);
  const addLine = useCart((s) => s.addLine);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 120);
    return () => clearTimeout(t);
  }, []);

  const results = useMemo(() => (query.trim() ? searchProducts(query).slice(0, 6) : []), [query]);
  const categoryMatches = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return CATEGORIES.filter((c) => c.name.toLowerCase().includes(q) || c.slug.includes(q));
  }, [query]);

  const commitSearch = (q: string) => {
    if (q.trim()) pushRecentSearch(q.trim());
  };

  return (
    <motion.div
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          className="mx-auto mt-[8vh] w-[92%] max-w-2xl bg-card rounded-lg shadow-2xl overflow-hidden"
          role="dialog"
          aria-label="Search"
        >
            {/* Input */}
            <div className="flex items-center gap-3 px-5 h-[64px] border-b border-border">
              <Search size={19} className="text-cocoa-400 shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && query.trim()) {
                    commitSearch(query);
                    onClose();
                    window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
                  }
                }}
                placeholder="Search ghee, almonds, hampers…"
                className="flex-1 bg-transparent outline-none text-[15px] text-forest-900 placeholder:text-cocoa-300"
                aria-label="Search products"
              />
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-cocoa-400 hover:bg-parchment transition-colors"
                aria-label="Close search"
              >
                <X size={17} />
              </button>
            </div>

            <div className="max-h-[62vh] overflow-y-auto scrollbar-thin">
              {/* Results */}
              {query.trim() ? (
                <div className="p-4">
                  {categoryMatches.length > 0 && (
                    <div className="mb-3">
                      <p className="eyebrow text-gold-600 px-2 mb-2">Categories</p>
                      {categoryMatches.map((c) => (
                        <Link
                          key={c.slug}
                          href={`/shop/${c.slug}`}
                          onClick={onClose}
                          className="flex items-center justify-between px-3 py-2.5 rounded-sm hover:bg-parchment transition-colors group"
                        >
                          <span className="text-[13.5px] font-medium text-forest-900">{c.name}</span>
                          <ArrowRight size={14} className="text-cocoa-300 group-hover:text-gold-600 group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      ))}
                    </div>
                  )}
                  {results.length > 0 ? (
                    <div>
                      <p className="eyebrow text-gold-600 px-2 mb-2">Products</p>
                      {results.map((p) => (
                        <div key={p.id} className="flex items-center gap-3 px-3 py-2.5 rounded-sm hover:bg-parchment transition-colors group">
                          <Link
                            href={`/product/${p.slug}`}
                            onClick={() => {
                              commitSearch(query);
                              onClose();
                            }}
                            className="flex items-center gap-3 flex-1 min-w-0"
                          >
                            <span className="relative w-12 h-12 rounded-sm overflow-hidden bg-cream shrink-0">
                              <Image src={p.images[0]} alt={p.name} fill sizes="48px" className="object-cover" />
                            </span>
                            <span className="min-w-0">
                              <span className="block text-[13.5px] font-semibold text-forest-900 truncate">{p.name}</span>
                              <span className="block text-[12px] text-cocoa-400">
                                {formatINR(p.variants[0].price)} · {p.variants[0].label}
                              </span>
                            </span>
                          </Link>
                          <button
                            onClick={() => {
                              addLine(p.id, p.variants[0].id);
                              toast({ title: "Added to cart", description: p.name });
                            }}
                            className="text-[10.5px] font-semibold tracking-wider uppercase border border-border rounded-sm px-2.5 py-1.5 text-forest-800 hover:bg-forest-800 hover:text-ivory hover:border-forest-800 transition-all shrink-0"
                          >
                            Add
                          </button>
                        </div>
                      ))}
                      <Link
                        href={`/search?q=${encodeURIComponent(query.trim())}`}
                        onClick={onClose}
                        className="mt-3 flex items-center justify-center gap-2 h-10 rounded-sm border border-forest-800 text-forest-800 hover:bg-forest-800 hover:text-ivory text-[11.5px] font-semibold tracking-[0.14em] uppercase transition-all"
                      >
                        View all results <ArrowRight size={13} />
                      </Link>
                    </div>
                  ) : (
                    categoryMatches.length === 0 && (
                      <div className="py-10 text-center">
                        <p className="text-[14px] text-cocoa-500">No matches for “{query}”</p>
                        <p className="text-[12.5px] text-cocoa-300 mt-1.5">Try “ghee”, “almonds” or “hamper”</p>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div className="p-5 grid md:grid-cols-2 gap-6">
                  {/* Recent */}
                  <div>
                    <p className="eyebrow text-cocoa-400 mb-3 flex items-center gap-1.5">
                      <Clock size={12} /> Recent Searches
                    </p>
                    {recentSearches.length > 0 ? (
                      <>
                        <div className="flex flex-wrap gap-2">
                          {recentSearches.map((q) => (
                            <button
                              key={q}
                              onClick={() => {
                                setQuery(q);
                                commitSearch(q);
                              }}
                              className="px-3 py-1.5 rounded-full border border-border text-[12.5px] text-cocoa-600 hover:border-gold-400 hover:text-forest-800 transition-colors"
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={clearRecent}
                          className="mt-3 text-[11.5px] text-cocoa-300 hover:text-terra-500 transition-colors"
                        >
                          Clear recent searches
                        </button>
                      </>
                    ) : (
                      <p className="text-[12.5px] text-cocoa-300">Your recent searches will appear here.</p>
                    )}

                    <p className="eyebrow text-cocoa-400 mt-7 mb-3 flex items-center gap-1.5">
                      <TrendingUp size={12} /> Popular Searches
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {POPULAR_SEARCHES.map((q) => (
                        <button
                          key={q}
                          onClick={() => {
                            setQuery(q);
                            commitSearch(q);
                          }}
                          className="px-3 py-1.5 rounded-full bg-parchment text-[12.5px] text-cocoa-600 hover:bg-forest-800 hover:text-ivory transition-colors"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Suggested */}
                  <div>
                    <p className="eyebrow text-cocoa-400 mb-3">Suggested For You</p>
                    <div className="space-y-2.5">
                      {PRODUCTS.filter((p) => p.isBestseller)
                        .slice(0, 3)
                        .map((p) => (
                          <Link
                            key={p.id}
                            href={`/product/${p.slug}`}
                            onClick={onClose}
                            className="flex items-center gap-3 p-2 rounded-sm hover:bg-parchment transition-colors"
                          >
                            <span className="relative w-11 h-11 rounded-sm overflow-hidden bg-cream shrink-0">
                              <Image src={p.images[0]} alt={p.name} fill sizes="44px" className="object-cover" />
                            </span>
                            <span className="min-w-0">
                              <span className="block text-[12.5px] font-semibold text-forest-900 truncate">{p.name}</span>
                              <span className="block text-[11.5px] text-cocoa-400">{formatINR(p.variants[0].price)}</span>
                            </span>
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
              )}
        </div>
    </motion.div>
  );
}
