import type { Metadata } from "next";
import { LegalPage } from "@/components/shared/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms governing your use of nandinighee.in and purchases from NANDINI GHEE.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="12 August 2026"
      intro="These Terms & Conditions govern your access to and use of nandinighee.in and any purchase you make from NANDINI Foods Pvt. Ltd. (“NANDINI”, “we”, “us”). By using the website or placing an order, you agree to these terms."
      sections={[
        {
          heading: "Eligibility & Accounts",
          paragraphs: [
            "You must be at least 18 years of age to place an order. You are responsible for the accuracy of the information in your account and for keeping your credentials confidential. Notify us immediately of any unauthorised account use.",
          ],
        },
        {
          heading: "Products & Descriptions",
          paragraphs: [
            "We describe our products as accurately as possible, including ingredients, weights and origins. Natural products vary by batch — colour, texture and grain may differ slightly from photographs without such variation being a defect. Product images are representative.",
          ],
        },
        {
          heading: "Pricing & Payment",
          paragraphs: [
            "All prices are in Indian Rupees and inclusive of applicable taxes unless stated otherwise. We may change prices at any time, but changes never apply to orders already placed. Payment is due at the time of order, except for Cash on Delivery orders where payment is due on delivery. We reserve the right to cancel any order in cases of suspected fraud, pricing errors or unavailability, with a full refund for any amount paid.",
          ],
        },
        {
          heading: "Shipping & Delivery",
          paragraphs: [
            "Estimated delivery timelines are good-faith estimates, not guarantees. Risk in the products passes to you on delivery. It is your responsibility to provide an accurate and serviceable address; we are not liable for delays caused by incorrect addresses, weather, or carrier disruptions, but we will always work with you to make it right.",
          ],
        },
        {
          heading: "Returns & Refunds",
          paragraphs: [
            "Because ours are food products, we cannot accept returns of opened items. If an item arrives damaged, leaking, incorrect or below our quality standard, contact us within 48 hours of delivery with photographs. Verified claims receive a replacement or a full refund to the original payment method within 5–7 working days. Our full policy is described on the product shipping & returns section and FAQ page.",
          ],
        },
        {
          heading: "Acceptable Use",
          paragraphs: ["You agree not to:"],
          bullets: [
            "Use the website for any unlawful purpose or to place fraudulent orders.",
            "Scrape, reverse-engineer, or attempt to disrupt the website or its security controls.",
            "Resell our products under the NANDINI name without written authorisation.",
            "Copy our product photography, descriptions or brand assets for commercial use.",
          ],
        },
        {
          heading: "Intellectual Property",
          paragraphs: [
            "The NANDINI name, logo, packaging designs, photography and website content are our intellectual property or licensed to us. You may view and print pages for personal, non-commercial use only.",
          ],
        },
        {
          heading: "Disclaimers",
          paragraphs: [
            "The website and products are provided “as is”. Information on this website — including traditional uses, recipes and blog content — is provided for general information only and is not medical, nutritional or therapeutic advice. Always consult a qualified professional regarding any health condition or allergy. To the maximum extent permitted by law, we disclaim warranties not expressly stated in these terms.",
          ],
        },
        {
          heading: "Limitation of Liability",
          paragraphs: [
            "To the maximum extent permitted by law, NANDINI's total liability for any claim arising from an order is limited to the amount you paid for that order. We are not liable for indirect or consequential losses.",
          ],
        },
        {
          heading: "Governing Law & Jurisdiction",
          paragraphs: [
            "These terms are governed by the laws of India. Courts at Jodhpur, Rajasthan shall have exclusive jurisdiction over any dispute, subject to applicable consumer protection law allowing you to file where you reside.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: [
            "NANDINI Foods Pvt. Ltd., 14th Milestone, Jodhpur, Rajasthan 342001. Email: hello@nandinighee.in.",
          ],
        },
      ]}
    />
  );
}
