import type { Metadata } from "next";
import { CategoryLanding } from "@/components/shop/CategoryLanding";
import { ShopView } from "@/components/shop/ShopView";
import { getProductsByCategory } from "@/lib/data/products";
import { IMG } from "@/lib/data/images";

export const metadata: Metadata = {
  title: "Combos — Curated Everyday Value",
  description:
    "Curated dry fruit and ghee combos at kinder prices — the Daily Nutrition trio, Winter Warmth set, Morning Ritual pairing and our roasted Royal Trail Mix.",
  alternates: { canonical: "/shop/combos" },
};

export default function CombosPage() {
  const products = getProductsByCategory("combos");
  return (
    <CategoryLanding
      eyebrow="Curated · Value · Everyday"
      title="Combos"
      description="The pairings our nutritionist friends recommend most — bundled with care and kinder pricing."
      image={IMG.dryFruits.mixed2}
      imageAlt="Curated combo packs of dry fruits"
      breadcrumbLabel="Combos"
    >
      <ShopView products={products} showCategoryFilter={false} initialCategory="combos" />
    </CategoryLanding>
  );
}
