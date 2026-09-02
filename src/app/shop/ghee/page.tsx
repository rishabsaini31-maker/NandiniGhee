import type { Metadata } from "next";
import { CategoryLanding } from "@/components/shop/CategoryLanding";
import { ShopView } from "@/components/shop/ShopView";
import { getProductsByCategory } from "@/lib/data/products";
import { IMG } from "@/lib/data/images";

export const metadata: Metadata = {
  title: "Desi Cow Ghee — Traditional Bilona A2",
  description:
    "Traditional richness, carefully crafted. Shop authentic bilona A2 desi cow ghee — cultured, hand-churned and slow-cooked in small batches. 250 ml to 1 L jars.",
  alternates: { canonical: "/shop/ghee" },
};

export default function GheeCategoryPage() {
  const products = getProductsByCategory("ghee");
  return (
    <CategoryLanding
      eyebrow="Small-Batch · Cultured · Bilona"
      title="Desi Cow Ghee"
      description="Traditional richness, carefully crafted."
      image={IMG.ghee.spoon}
      imageAlt="Golden ghee in a wooden spoon"
      breadcrumbLabel="Ghee"
      intro="Every jar is cultured overnight, churned with a wooden bilona and simmered slowly — the 3,000-year-old method, dated by batch and jarred by hand."
    >
      <ShopView products={products} showCategoryFilter={false} initialCategory="ghee" />
    </CategoryLanding>
  );
}
