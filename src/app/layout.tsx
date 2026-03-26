import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "KamilStore - Multi-Vendor E-Commerce Marketplace",
  description: "Shop from thousands of verified vendors. Find the best deals on electronics, fashion, home goods, and more.",
  keywords: "e-commerce, multi-vendor, marketplace, online shopping, deals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <div id="header-spacer" className="h-[160px]" />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
