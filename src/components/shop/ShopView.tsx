"use client";

import { useMemo, useState } from "react";
import { useSyncExternalStore } from "react";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { Product } from "@/lib/types";
import { ProductCard } from "@/components/product/ProductCard";
import { cn } from "@/lib/utils";

export type SortKey = "featured" | "bestselling" | "newest" | "price-asc" | "price-desc";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "bestselling", label: "Best Selling" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

const CATEGORY_LABELS: Record<string, string> = {
  "ghee": "Ghee",
  "dry-fruits": "Dry Fruits",
  "combos": "Combos",
  "gift-hampers": "Gift Hampers",
};

interface ShopViewProps {
  products: Product[];
  showCategoryFilter?: boolean;
  initialCategory?: string;
  subCategories?: string[];
  initialSort?: SortKey;
}

const DIETARY_OPTIONS = ["Vegetarian", "Vegan", "Gluten-Free", "No Added Sugar", "Lactose-Free"];
const RATING_OPTIONS = [4.5, 4.0, 3.5];

const emptySubscribe = () => () => {};

function readSearch(): string {
  return typeof window !== "undefined" ? window.location.search : "";
}

const MAX_PRICE = 7000;

export function ShopView({
  products,
  showCategoryFilter = true,
  initialCategory,
  subCategories,
  initialSort = "featured",
}: ShopViewProps) {
  // URL is external state — read via useSyncExternalStore (no setState-in-effect, no hydration mismatch)
  const search = useSyncExternalStore(emptySubscribe, readSearch, () => "");
  const urlParams = useMemo(() => new URLSearchParams(search), [search]);

  const [categories, setCategories] = useState<string[]>(initialCategory ? [initialCategory] : []);
  const [userSubs, setUserSubs] = useState<string[] | null>(null);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(MAX_PRICE);
  const [weights, setWeights] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [dietary, setDietary] = useState<string[]>([]);
  const [userSort, setUserSort] = useState<SortKey | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 12;

  // URL-driven initial values (sort / tag=new / category sub-filter), overridable by the user
  const urlSortRaw = urlParams.get("sort") as SortKey | null;
  const urlSort: SortKey | null =
    urlSortRaw && SORT_OPTIONS.some((o) => o.value === urlSortRaw) ? urlSortRaw : urlParams.get("tag") === "new" ? "newest" : null;
  const urlCategory = urlParams.get("category");
  const sort = userSort ?? urlSort ?? initialSort;
  const subs = userSubs ?? (urlCategory ? [urlCategory] : []);

  const setSubs = (v: string[]) => setUserSubs(v);

  const allWeights = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.variants.forEach((v) => set.add(v.label)));
    return Array.from(set).sort((a, b) => {
      const na = parseInt(a) || 0;
      const nb = parseInt(b) || 0;
      return na - nb;
    });
  }, [products]);

  const toggle = (list: string[], value: string, setter: (v: string[]) => void) => {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
    setPage(1);
  };

  const filtered = useMemo(() => {
    let list = [...products];
    if (categories.length) list = list.filter((p) => categories.includes(p.category));
    if (subs.length) list = list.filter((p) => subs.includes(p.subCategory ?? ""));
    list = list.filter((p) => {
      const minVariant = Math.min(...p.variants.map((v) => v.price));
      return minVariant >= priceMin && minVariant <= priceMax;
    });
    if (weights.length) list = list.filter((p) => p.variants.some((v) => weights.includes(v.label)));
    if (minRating) list = list.filter((p) => p.rating >= minRating);
    if (inStockOnly) list = list.filter((p) => p.inStock);
    if (dietary.length) list = list.filter((p) => dietary.every((d) => p.dietary.includes(d)));
    const sorted = [...list];
    switch (sort) {
      case "bestselling":
        sorted.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "newest":
        sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "price-asc":
        sorted.sort((a, b) => Math.min(...a.variants.map((v) => v.price)) - Math.min(...b.variants.map((v) => v.price)));
        break;
      case "price-desc":
        sorted.sort((a, b) => Math.max(...b.variants.map((v) => v.price)) - Math.max(...a.variants.map((v) => v.price)));
        break;
      default:
        sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return sorted;
  }, [products, categories, subs, priceMin, priceMax, weights, minRating, inStockOnly, dietary, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  const activeCount =
    categories.length + subs.length + weights.length + dietary.length + (minRating ? 1 : 0) + (inStockOnly ? 1 : 0) + (priceMax < MAX_PRICE || priceMin > 0 ? 1 : 0);

  const resetAll = () => {
    setCategories(initialCategory ? [initialCategory] : []);
    setSubs([]);
    setPriceMin(0);
    setPriceMax(MAX_PRICE);
    setWeights([]);
    setMinRating(0);
    setInStockOnly(false);
    setDietary([]);
    setPage(1);
  };

  const filtersUI = (
    <div className="space-y-7">
      {/* Category */}
      {showCategoryFilter && (
        <FilterGroup title="Category">
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <CheckRow
              key={key}
              label={label}
              count={products.filter((p) => p.category === key).length}
              checked={categories.includes(key)}
              onChange={() => toggle(categories, key, setCategories)}
            />
          ))}
        </FilterGroup>
      )}

      {/* Sub-category */}
      {subCategories && subCategories.length > 0 && (
        <FilterGroup title="Type">
          {subCategories.map((s) => (
            <CheckRow
              key={s}
              label={s}
              count={products.filter((p) => p.subCategory === s).length}
              checked={subs.includes(s)}
              onChange={() => toggle(subs, s, setSubs)}
            />
          ))}
        </FilterGroup>
      )}

      {/* Price */}
      <FilterGroup title="Price">
        <input
          type="range"
          min={0}
          max={MAX_PRICE}
          step={100}
          value={priceMax}
          onChange={(e) => {
            setPriceMax(Number(e.target.value));
            setPage(1);
          }}
          className="w-full accent-forest-700"
          aria-label="Maximum price"
        />
        <div className="flex justify-between text-[11.5px] text-cocoa-400 mt-1.5">
          <span>₹0</span>
          <span className="font-semibold text-forest-900">Up to ₹{priceMax.toLocaleString("en-IN")}</span>
        </div>
      </FilterGroup>

      {/* Weight */}
      <FilterGroup title="Weight / Size">
        <div className="flex flex-wrap gap-2">
          {allWeights.map((w) => (
            <button
              key={w}
              onClick={() => toggle(weights, w, setWeights)}
              className={cn(
                "px-2.5 py-1 text-[11px] font-medium rounded-full border transition-all",
                weights.includes(w)
                  ? "border-forest-700 bg-forest-800 text-ivory"
                  : "border-border text-cocoa-500 hover:border-gold-400"
              )}
            >
              {w}
            </button>
          ))}
        </div>
      </FilterGroup>

      {/* Rating */}
      <FilterGroup title="Rating">
        {RATING_OPTIONS.map((r) => (
          <CheckRow
            key={r}
            label={`${r}★ & above`}
            checked={minRating === r}
            onChange={() => {
              setMinRating(minRating === r ? 0 : r);
              setPage(1);
            }}
          />
        ))}
      </FilterGroup>

      {/* Availability */}
      <FilterGroup title="Availability">
        <CheckRow label="In Stock Only" checked={inStockOnly} onChange={() => { setInStockOnly(!inStockOnly); setPage(1); }} />
      </FilterGroup>

      {/* Dietary */}
      <FilterGroup title="Dietary Preferences">
        {DIETARY_OPTIONS.map((d) => (
          <CheckRow key={d} label={d} checked={dietary.includes(d)} onChange={() => toggle(dietary, d, setDietary)} />
        ))}
      </FilterGroup>

      {activeCount > 0 && (
        <button
          onClick={resetAll}
          className="w-full h-10 rounded-sm border border-terra-500/40 text-terra-600 hover:bg-terra-500 hover:text-white text-[11.5px] font-semibold tracking-[0.12em] uppercase transition-all"
        >
          Clear All Filters ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8 pb-20">
      <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-10">
        {/* Sidebar — desktop */}
        <aside className="hidden lg:block py-10" aria-label="Product filters">
          <div className="sticky top-28 max-h-[calc(100vh-140px)] overflow-y-auto scrollbar-thin pr-2">{filtersUI}</div>
        </aside>

        {/* Main */}
        <div className="py-8 lg:py-10">
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-4 pb-6 border-b border-border/70">
            <p className="text-[13px] text-cocoa-500">
              <span className="font-semibold text-forest-900">{filtered.length}</span> products
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 h-10 px-4 rounded-sm border border-border text-[12px] font-semibold text-forest-900"
              >
                <SlidersHorizontal size={14} /> Filters {activeCount > 0 && `(${activeCount})`}
              </button>
              <label className="inline-flex items-center gap-2 text-[12px] text-cocoa-500">
                <span className="hidden sm:inline">Sort by</span>
                <span className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortKey)}
                    className="appearance-none h-10 pl-3.5 pr-9 rounded-sm border border-border bg-card text-[12.5px] font-medium text-forest-900 outline-none focus:border-gold-400 cursor-pointer"
                    aria-label="Sort products"
                  >
                    {SORT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-cocoa-400 pointer-events-none" />
                </span>
              </label>
            </div>
          </div>

          {/* Grid */}
          {pageItems.length > 0 ? (
            <div className="mt-8 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {pageItems.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          ) : (
            <div className="mt-16 text-center py-16">
              <p className="font-display text-2xl text-forest-900">Nothing matches those filters</p>
              <p className="text-[13px] text-cocoa-400 mt-2">Try widening your price range or clearing a few filters.</p>
              <button
                onClick={resetAll}
                className="mt-6 h-11 px-8 rounded-sm bg-forest-800 text-ivory text-[12px] font-semibold tracking-[0.14em] uppercase hover:bg-forest-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Pagination">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="h-10 px-4 rounded-sm border border-border text-[12px] font-medium text-cocoa-500 disabled:opacity-40 hover:border-gold-400 transition-colors"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  aria-current={page === i + 1 ? "page" : undefined}
                  className={cn(
                    "w-10 h-10 rounded-sm border text-[12.5px] font-semibold transition-all",
                    page === i + 1
                      ? "bg-forest-800 border-forest-800 text-ivory"
                      : "border-border text-cocoa-500 hover:border-gold-400"
                  )}
                >
                  {i + 1}
                </button>
              ))}
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="h-10 px-4 rounded-sm border border-border text-[12px] font-medium text-cocoa-500 disabled:opacity-40 hover:border-gold-400 transition-colors"
              >
                Next
              </button>
            </nav>
          )}
        </div>
      </div>

      {/* Mobile filters drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[90] lg:hidden" role="dialog" aria-label="Filters">
          <div className="absolute inset-0 bg-forest-950/50 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute bottom-0 inset-x-0 max-h-[82vh] bg-card rounded-t-2xl flex flex-col">
            <div className="flex items-center justify-between px-6 h-16 border-b border-border">
              <h2 className="font-display text-lg font-semibold text-forest-900">Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters" className="w-9 h-9 rounded-full hover:bg-parchment flex items-center justify-center">
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto scrollbar-thin px-6 py-6">{filtersUI}</div>
            <div className="p-4 border-t border-border">
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full h-12 rounded-sm bg-forest-800 text-ivory text-[12.5px] font-semibold tracking-[0.14em] uppercase"
              >
                Show {filtered.length} Products
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="eyebrow text-cocoa-400 mb-3.5">{title}</h3>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

function CheckRow({ label, count, checked, onChange }: { label: string; count?: number; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <span
        className={cn(
          "w-4.5 h-4.5 w-[18px] h-[18px] rounded-[3px] border flex items-center justify-center transition-all shrink-0",
          checked ? "bg-forest-800 border-forest-800" : "border-cocoa-300 bg-white group-hover:border-gold-400"
        )}
        aria-hidden
      >
        {checked && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1.5 5.5L4 8L8.5 2" stroke="#faf6ed" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className="text-[13px] text-cocoa-600 group-hover:text-forest-900 transition-colors flex-1">{label}</span>
      {count !== undefined && <span className="text-[11px] text-cocoa-300">{count}</span>}
    </label>
  );
}
