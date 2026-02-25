import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PrimeServe — B2B Facility & Office Supplies Marketplace",
  description:
    "India's trusted B2B marketplace for housekeeping materials, cleaning chemicals, office stationery, and pantry items. Bulk pricing, 45-day credit, and Pro plan discounts.",
  keywords: [
    "B2B supplies",
    "facility management",
    "office supplies",
    "housekeeping materials",
    "cleaning chemicals",
    "bulk pricing",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
