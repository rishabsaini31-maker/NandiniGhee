import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { Bestsellers } from "@/components/home/Bestsellers";
import { GheeStory } from "@/components/home/GheeStory";
import { FarmToFamily } from "@/components/home/FarmToFamily";
import { DryFruitsSection } from "@/components/home/DryFruitsSection";
import { WhyNandini } from "@/components/home/WhyNandini";
import { GiftHampers } from "@/components/home/GiftHampers";
import { Testimonials } from "@/components/home/Testimonials";
import { SocialGrid } from "@/components/home/SocialGrid";
import { Newsletter } from "@/components/home/Newsletter";
import { RecentlyViewed } from "@/components/product/RecentlyViewed";

export const metadata: Metadata = {
  title: "NANDINI GHEE — Pure by Tradition | Authentic A2 Bilona Ghee & Premium Dry Fruits",
  description:
    "Authentic Desi Cow A2 Bilona Ghee and handpicked premium dry fruits, inspired by the timeless traditions of Rajasthan. Traditional craftsmanship, quality checked, delivered fresh across India.",
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NANDINI GHEE",
  slogan: "Pure by Tradition.",
  description:
    "Premium Indian food brand offering authentic Desi Cow A2 Bilona Ghee, premium dry fruits and gift hampers.",
  url: "https://nandinighee.in",
  sameAs: ["https://www.instagram.com", "https://www.facebook.com", "https://www.linkedin.com"],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <TrustBar />
      <FeaturedCategories />
      <Bestsellers />
      <GheeStory />
      <FarmToFamily />
      <DryFruitsSection />
      <WhyNandini />
      <GiftHampers />
      <Testimonials />
      <SocialGrid />
      <RecentlyViewed />
      <Newsletter />
    </>
  );
}
