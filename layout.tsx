import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PrimeServe | B2B Facility Supplies & Procurement Platform",
  description:
    "PrimeServe helps hotels, restaurants, hospitals, offices, IT companies, MNCs, and workspaces order facility supplies, cleaning chemicals, pantry items, washroom products, and office essentials from one platform.",
  keywords: [
    "B2B facility supplies",
    "facility procurement platform",
    "housekeeping supplies",
    "cleaning chemicals",
    "washroom supplies",
    "office pantry supplies",
    "facility spend audit",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white antialiased">{children}</body>
    </html>
  );
}
