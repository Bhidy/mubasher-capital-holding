import type { Metadata } from "next";
import LegalPage from "../legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Mubasher Capital Holding",
  description:
    "How Mubasher Holding for Financial Investments collects and processes personal data, and the rights guaranteed to you under Egypt's Personal Data Protection Law No. 151 of 2020.",
};

export default function PrivacyPage() {
  return <LegalPage slug="privacy" />;
}
