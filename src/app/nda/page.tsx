import type { Metadata } from "next";
import { LegalPage } from "@/components/shared/LegalPage";

export const metadata: Metadata = {
  title: "Non-Disclosure Agreement (NDA)",
  description: "The mutual non-disclosure terms NANDINI GHEE applies when discussing partnerships, sourcing and corporate arrangements.",
  alternates: { canonical: "/nda" },
};

export default function NDAPage() {
  return (
    <LegalPage
      title="Non-Disclosure Agreement (NDA)"
      updated="12 August 2026"
      intro="This Non-Disclosure Agreement (“NDA”) is entered into between NANDINI Foods Pvt. Ltd. (“Company”) and the counterparty evaluating or executing a business relationship with the Company (“Recipient”), and governs confidential information disclosed by either party (“Discloser”) to the other. It is presented as our standard mutual terms; signed, counterspecific NDAs may supersede it."
      sections={[
        {
          heading: "Definition of Confidential Information",
          paragraphs: [
            "“Confidential Information” means any non-public information disclosed by a Discloser, in any form, that is designated confidential or that a reasonable person would understand to be confidential given its nature and the circumstances of disclosure. It includes, without limitation, sourcing arrangements, farm and supplier terms, formulations, batch processes, pricing structures, unreleased product plans, customer lists, and business metrics.",
          ],
          bullets: [
            "Confidential Information does not include information that is or becomes public without breach of this NDA.",
            "…that was lawfully known to the Recipient before disclosure, as shown by written records.",
            "…that is independently developed by the Recipient without use of the Discloser's information.",
            "…that is rightfully received from a third party without restriction or breach of any obligation of confidentiality.",
          ],
        },
        {
          heading: "Obligations of the Recipient",
          paragraphs: ["The Recipient shall:"],
          bullets: [
            "Use Confidential Information solely for the purpose of evaluating or performing the business relationship (the “Purpose”).",
            "Protect Confidential Information with at least the same degree of care used for its own confidential information, and no less than reasonable care.",
            "Disclose Confidential Information only to employees, advisors or contractors who need it for the Purpose and who are bound by confidentiality obligations no less protective than this NDA.",
            "Promptly notify the Discloser upon discovering any unauthorised use or disclosure.",
          ],
        },
        {
          heading: "Compelled Disclosure",
          paragraphs: [
            "If the Recipient is required by law, regulation or court order to disclose Confidential Information, it may do so provided it gives the Discloser prompt written notice (where legally permitted) and reasonable assistance to seek protective treatment, and discloses only the portion legally required.",
          ],
        },
        {
          heading: "No Licence or Other Rights",
          paragraphs: [
            "All Confidential Information remains the property of the Discloser. This NDA grants no licence, assignment or interest in any intellectual property, and no obligation to proceed with any transaction. All materials (including samples and documents) shared under the Purpose remain the Discloser's property and should be returned or destroyed on written request.",
          ],
        },
        {
          heading: "Term & Duration of Obligations",
          paragraphs: [
            "This NDA applies to disclosures made for 3 (three) years from the date of the underlying business discussions, and confidentiality obligations survive for 5 (five) years from the date of each disclosure, or longer where required by applicable law.",
          ],
        },
        {
          heading: "Remedies",
          paragraphs: [
            "The parties acknowledge that unauthorised disclosure of Confidential Information may cause harm for which monetary damages are inadequate. The Discloser is therefore entitled to seek injunctive or equitable relief, in addition to any other remedies available at law.",
          ],
        },
        {
          heading: "General",
          paragraphs: [
            "This NDA is the entire agreement between the parties on its subject matter and supersedes prior discussions. It may be amended only in writing signed by both parties. If any provision is held unenforceable, the remainder continues in effect. This NDA is governed by the laws of India, with exclusive jurisdiction at courts of Jodhpur, Rajasthan.",
          ],
        },
      ]}
    />
  );
}
