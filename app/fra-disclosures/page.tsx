import type { Metadata } from "next";
import LegalPage from "../legal/LegalPage";

export const metadata: Metadata = {
  title: "FRA Disclosures | Mubasher Capital Holding",
  description:
    "Mubasher Holding is licensed and supervised by the Egyptian Financial Regulatory Authority (FRA) — company record, license No. 768, and licensed activities.",
};

export default function FraDisclosuresPage() {
  return <LegalPage slug="fra" />;
}
