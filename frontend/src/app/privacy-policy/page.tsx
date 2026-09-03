import type { Metadata } from "next";
import { LegalPage } from "@/components/shared/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How NANDINI GHEE collects, uses, stores and protects your personal information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="12 August 2026"
      intro="This Privacy Policy explains what information NANDINI Foods Pvt. Ltd. (“NANDINI”, “we”, “us”) collects when you use nandinighee.in, why we collect it, and the choices you have. We collect the minimum information required to sell you honest food — nothing more."
      sections={[
        {
          heading: "Information We Collect",
          paragraphs: [
            "We collect information you provide directly and limited technical information collected automatically.",
          ],
          bullets: [
            "Account and contact details: name, email address, mobile number.",
            "Delivery details: shipping address, PIN code, delivery instructions.",
            "Order history and support communications.",
            "Payment confirmation tokens from our payment gateway — we never receive or store your full card number, CVV or UPI PIN.",
            "Technical data: device type, browser, approximate location derived from IP, and pages visited, used to keep the site fast and secure.",
          ],
        },
        {
          heading: "How We Use Your Information",
          paragraphs: ["Your information is used only for the purposes below."],
          bullets: [
            "Processing and delivering your orders, including order updates by email, SMS and WhatsApp.",
            "Providing customer support and handling returns or refunds.",
            "Sending service communications (order confirmations, delivery updates).",
            "Sending marketing emails only where you have opted in; every marketing email contains a one-click unsubscribe.",
            "Detecting fraud, securing the platform, and complying with legal obligations.",
          ],
        },
        {
          heading: "Cookies & Similar Technologies",
          paragraphs: [
            "We use strictly necessary cookies and local storage to keep items in your cart, remember your wishlist and keep you signed in. We also use privacy-respecting analytics to understand aggregate site usage. We do not use cookies to build advertising profiles about you, and we do not sell your personal data to anyone.",
          ],
        },
        {
          heading: "Data Sharing",
          paragraphs: [
            "We share data only with the processors required to run our service: our payment gateway (to process payments securely), our logistics partners (name, address and phone — only what is needed to deliver your parcel), our email/SMS providers (for transactional messages), and our cloud hosting provider. Each processor is bound by contract to use your data only on our instructions.",
          ],
        },
        {
          heading: "Data Retention",
          paragraphs: [
            "Order and transaction records are retained for 8 years to meet Indian tax and accounting requirements. Support communications are retained for 3 years. Marketing consent records are retained until you withdraw consent plus 2 years. You may request deletion of your account data at any time; we will retain only what law requires us to keep.",
          ],
        },
        {
          heading: "Your Rights",
          paragraphs: ["You may exercise the following rights by writing to privacy@nandinighee.in:"],
          bullets: [
            "Access a copy of the personal data we hold about you.",
            "Correct inaccurate data.",
            "Request deletion of your account and associated data, subject to legal retention duties.",
            "Withdraw marketing consent at any time.",
            "Object to any processing you believe is unlawful.",
          ],
        },
        {
          heading: "Security",
          paragraphs: [
            "We protect your data with TLS encryption in transit, encryption at rest for sensitive fields, role-limited staff access, and regular dependency patching. No system is perfectly secure, but our Security page describes our controls in detail.",
          ],
        },
        {
          heading: "Children's Privacy",
          paragraphs: [
            "Our products are enjoyed by families, but our website is not directed at children under 13, and we do not knowingly collect their personal information. If you believe a child has provided us information, contact us and we will delete it.",
          ],
        },
        {
          heading: "Changes to This Policy",
          paragraphs: [
            "If we change this policy materially, we will notify registered users by email at least 7 days before the change takes effect, and the updated date will always appear at the top of this page.",
          ],
        },
      ]}
    />
  );
}
