import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Desire Creatives | Engineering Digital Dominance",
  description: "Desire Creatives is a high-end digital agency. We build sophisticated machines, not templates.",
};

import { Analytics } from "@vercel/analytics/next";
import { SmoothScroll } from "@/components/animations/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface-container-lowest text-on-surface selection:bg-primary/30">
        {/* Pure SVG Noise Overlay */}
        <div className="fixed inset-0 pointer-events-none z-[9999] mix-blend-overlay opacity-[0.03]">
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>
        
        <SmoothScroll>
          <Navbar />
          <main className="flex-grow pt-16">{children}</main>
          <Footer />
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
