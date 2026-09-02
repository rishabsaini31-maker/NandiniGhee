import type { Metadata } from "next";
import { CategoryLanding } from "@/components/shop/CategoryLanding";
import { ShopView } from "@/components/shop/ShopView";
import { getProductsByCategory } from "@/lib/data/products";
import { IMG } from "@/lib/data/images";

export const metadata: Metadata = {
  title: "Gift Hampers — Thoughtful Indian Gifting",
  description:
    "Thoughtful gifts inspired by Indian tradition. Keepsake hamper boxes with bilona ghee, premium dry fruits, hand-written notes and wax-stamped seals. Corporate volumes welcome.",
  alternates: { canonical: "/shop/gift-hampers" },
};

export default function GiftHampersPage() {
  const products = getProductsByCategory("gift-hampers");
  return (
    <CategoryLanding
      eyebrow="Hand-Tied · Hand-Written · Keepsake"
      title="Gift Hampers"
      description="Thoughtful gifts inspired by Indian tradition."
      image={IMG.hampers.hamper2}
      imageAlt="Elegant gift hamper with ribbon"
      breadcrumbLabel="Gift Hampers"
      intro="Every hamper is assembled by hand, finished with a hand-written note you personalise at checkout, and packed in boxes designed to be kept — not discarded."
    >
      <ShopView products={products} showCategoryFilter={false} initialCategory="gift-hampers" />
    </CategoryLanding>
  );
}
