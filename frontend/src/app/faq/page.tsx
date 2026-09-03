import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { FAQAccordionView } from "@/components/shared/FAQAccordion";

export const metadata: Metadata = {
  title: "FAQ — Help & Support",
  description:
    "Answers about orders, shipping, payments, ghee storage, dry fruits, returns and more. How should I store ghee? How long does delivery take? Find out here.",
  alternates: { canonical: "/faq" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How should I store ghee?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Store in a cool, dark cupboard away from the stove, always use a clean dry spoon, and close the lid promptly. Refrigeration is optional. Unopened jars last up to 12 months; opened jars are best finished within 2–3 months.",
      },
    },
    {
      "@type": "Question",
      name: "How long does delivery take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Metro cities: 2–4 working days. Other cities: 3–6 working days. Remote pincodes may take up to 7 days.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer Cash on Delivery?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, COD is available on orders up to ₹5,000 across serviceable pincodes. A ₹49 handling fee applies to COD orders.",
      },
    },
    {
      "@type": "Question",
      name: "How can I track my order?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the Track Order page and enter your order number with the registered email or mobile number to see a live timeline from order placed to delivered.",
      },
    },
  ],
};

export default function FAQPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PageHeader
        eyebrow="Help & Support"
        title="Frequently Asked Questions"
        description="Everything families ask us before and after their first order — organised, honest and jargon-free."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
      />
      <FAQAccordionView />
    </>
  );
}
