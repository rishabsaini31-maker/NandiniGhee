import type { Metadata } from "next";
import { LegalPage } from "@/components/shared/LegalPage";

export const metadata: Metadata = {
  title: "Data Processing Agreement (DPA)",
  description: "The DPA governing NANDINI GHEE's processing of personal data on behalf of business partners and corporate clients.",
  alternates: { canonical: "/dpa" },
};

export default function DPAPage() {
  return (
    <LegalPage
      title="Data Processing Agreement (DPA)"
      updated="12 August 2026"
      intro="This Data Processing Agreement (“DPA”) forms part of the Terms & Conditions or a separate services agreement between NANDINI Foods Pvt. Ltd. (“Processor”) and any business customer, corporate gifting client or partner (“Controller”) under whose instructions NANDINI processes personal data. It applies where NANDINI processes personal data on the Controller's behalf — for example, recipient name lists provided for corporate hamper deliveries."
      sections={[
        {
          heading: "Scope of Processing",
          paragraphs: [
            "The Processor will process personal data only on documented instructions from the Controller, which by default consist of: receiving recipient lists, using them to prepare and ship hampers or orders, and sending transactional delivery notifications. Any additional processing requires a new written instruction.",
          ],
        },
        {
          heading: "Confidentiality",
          paragraphs: [
            "The Processor ensures that all personnel authorised to process personal data are bound by confidentiality obligations, receive appropriate data-handling training, and access such data only on a need-to-know basis.",
          ],
        },
        {
          heading: "Security Measures",
          paragraphs: ["The Processor maintains technical and organisational measures appropriate to the risk, including:"],
          bullets: [
            "Encryption of personal data in transit (TLS 1.2+) and at rest for stored files.",
            "Role-based access control with audit logging of administrative access.",
            "Secure deletion of Controller-provided lists within 90 days of order completion, unless retention is legally required.",
            "Regular review of security controls and dependency patching.",
          ],
        },
        {
          heading: "Sub-processors",
          paragraphs: [
            "The Controller acknowledges the Processor's use of the sub-processors listed in the Privacy Policy (logistics partners, email/SMS providers, cloud hosting). The Processor imposes data protection obligations on sub-processors no less protective than this DPA and remains liable for their performance. Controllers will be given 30 days' notice of new sub-processors and may object on reasonable data-protection grounds.",
          ],
        },
        {
          heading: "Data Subject Requests",
          paragraphs: [
            "Where a data subject contacts the Processor directly regarding data the Processor processes on the Controller's behalf, the Processor will promptly forward the request to the Controller and will not respond except on the Controller's documented instruction.",
          ],
        },
        {
          heading: "Assistance & Audits",
          paragraphs: [
            "The Processor will provide reasonable assistance to the Controller in meeting data protection obligations, including responding to data subject requests and assessing the impact of potential breaches. Controllers may audit Processor compliance once per contract year, on 30 days' notice, during business hours and subject to confidentiality of other customers' information.",
          ],
        },
        {
          heading: "Personal Data Breach",
          paragraphs: [
            "The Processor will notify the Controller without undue delay, and in any case within 48 hours, of becoming aware of a personal data breach affecting Controller data, providing sufficient information for the Controller to meet its own obligations.",
          ],
        },
        {
          heading: "Return & Deletion",
          paragraphs: [
            "On termination of the underlying agreement, the Processor will, at the Controller's choice, return or securely delete all Controller personal data, except to the extent retention is required by Indian law.",
          ],
        },
        {
          heading: "Governing Law",
          paragraphs: [
            "This DPA is governed by the laws of India, and disputes are subject to the jurisdiction stated in the Terms & Conditions.",
          ],
        },
      ]}
    />
  );
}
