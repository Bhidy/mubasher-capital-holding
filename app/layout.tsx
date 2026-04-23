import type { Metadata } from "next";
import { Sora, Manrope, IBM_Plex_Sans_Arabic, Alexandria } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/smooth-scroll";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["300", "400", "500", "600", "700"],
});

const alexandria = Alexandria({
  subsets: ["arabic"],
  variable: "--font-alexandria",
  weight: ["400", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Mubasher Capital Holding | Ultra-Premium Corporate Excellence",
  description: "Mubasher Capital Holding — a premier global financial holding group delivering world-class investment strategies, institutional advisory, and market intelligence.",
  keywords: "capital holding, investment, corporate finance, global markets, institutional advisory",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sora.variable} ${manrope.variable} ${ibmPlexArabic.variable} ${alexandria.variable} antialiased font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
