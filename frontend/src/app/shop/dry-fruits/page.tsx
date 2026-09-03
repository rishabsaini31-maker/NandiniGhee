import type { Metadata } from "next";
import { CategoryLanding } from "@/components/shop/CategoryLanding";
import { ShopView } from "@/components/shop/ShopView";
import { getProductsByCategory } from "@/lib/data/products";
import { IMG } from "@/lib/data/images";

export const metadata: Metadata = {
  title: "Premium Dry Fruits — Handpicked & Fresh",
  description:
    "Handpicked. Fresh. Naturally rich. Premium California almonds, W240 cashews, Iranian pistachios, Kashmiri walnuts, Medjool dates, Afghani anjeer and more.",
  alternates: { canonical: "/shop/dry-fruits" },
};

export default function DryFruitsCategoryPage() {
  const products = getProductsByCategory("dry-fruits");
  return (
    <CategoryLanding
      eyebrow="Orchards & Valleys"
      title="Premium Dry Fruits"
      description="Handpicked. Fresh. Naturally rich."
      image={IMG.dryFruits.mixed1}
      imageAlt="Premium mixed dry fruits in a bowl"
      breadcrumbLabel="Dry Fruits"
      intro="Current-season crops only — almonds from California, cashews from Panruti, pistachios from Rafsanjan, walnuts from Kashmir, dates from the Medjool belt, anjeer from Kandahar."
    >
      <ShopView
        products={products}
        showCategoryFilter={false}
        initialCategory="dry-fruits"
        subCategories={["Almonds", "Cashews", "Pistachios", "Walnuts", "Dates", "Anjeer", "Raisins", "Mixed Dry Fruits"]}
      />
    </CategoryLanding>
  );
}
