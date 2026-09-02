import type { Metadata } from "next";
import { LegalPage } from "@/components/shared/LegalPage";

export const metadata: Metadata = {
  title: "Security",
  description: "The security practices NANDINI GHEE uses to protect your data and payments.",
  alternates: { canonical: "/security" },
};

export default function SecurityPage() {
  return (
    <LegalPage
      title="Security"
      updated="12 August 2026"
      intro="Earning your trust includes keeping your data and payments safe. This page explains, in plain language, how we protect nandinighee.in, your account and your money."
      sections={[
        {
          heading: "Payments",
          paragraphs: [
            "Card and UPI payments are processed by a PCI-DSS Level 1 certified payment gateway. Your card number, CVV and UPI credentials go directly to the gateway over encrypted channels and never touch our servers. We receive only a payment confirmation and a masked reference (e.g. the last four digits) for receipts.",
          ],
          bullets: [
            "PCI-DSS Level 1 certified gateway infrastructure",
            "3-D Secure / OTP verification on supported transactions",
            "No card data stored by NANDINI, ever",
            "Cash on Delivery available for customers who prefer it",
          ],
        },
        {
          heading: "Encryption",
          paragraphs: [
            "All traffic to nandinighee.in is served over TLS 1.2+ (HTTPS) with HSTS enabled. Sensitive fields at rest — such as account credentials — are stored hashed or encrypted, never in plain text.",
          ],
        },
        {
          heading: "Account Security",
          paragraphs: [
            "Passwords are hashed with modern, salted algorithms and never visible to staff. Logins from new devices trigger email alerts. Support staff will never ask you for your password, full card number, CVV or OTP — please report any such request to security@nandinighee.in.",
          ],
        },
        {
          heading: "Operational Controls",
          paragraphs: ["Our platform follows baseline hardening and operational discipline:"],
          bullets: [
            "Least-privilege access: staff see only the data their role requires.",
            "Automatic dependency updates and patching cadence.",
            "Encrypted, tested backups of essential business data.",
            "Logging and monitoring of administrative access.",
          ],
        },
        {
          heading: "Data Breach Response",
          paragraphs: [
            "If a security incident ever affects your personal data, we will inform affected users and applicable authorities within the timelines required by law, describe what happened, and explain what we are doing about it. Speed and honesty come first.",
          ],
        },
        {
          heading: "Reporting a Vulnerability",
          paragraphs: [
            "If you believe you have found a security vulnerability in our website, please write to security@nandinighee.in with enough detail to reproduce it. We commit to acknowledging reports within 2 working days. We ask you to give us reasonable time to fix issues before public disclosure, and we will credit reporters who wish to be named.",
          ],
        },
        {
          heading: "Your Part",
          paragraphs: [
            "Security is shared: use a unique password for your account, keep your devices updated, and double-check that you are on nandinighee.in before entering payment details. When in doubt about a message claiming to be from NANDINI, contact us directly before clicking anything.",
          ],
        },
      ]}
    />
  );
}
