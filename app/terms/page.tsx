import type { Metadata } from "next";
import LegalPage from "../legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms and Conditions | Mubasher Capital Holding",
  description:
    "The terms and conditions governing access to and use of the Mubasher Capital Holding website, governed by the laws of the Arab Republic of Egypt.",
};

export default function TermsPage() {
  return <LegalPage slug="terms" />;
}
