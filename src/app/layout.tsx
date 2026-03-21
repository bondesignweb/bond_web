import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Bond Design Company",
  description:
    "Bond Design Company is a full-service, boutique interior design firm based in Park City, Utah. Creating moments of joy through beautiful spaces.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Outfit:wght@100;200;300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="noise-overlay">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
