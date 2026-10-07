import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { brand } from "@/lib/content";

// Geometric sans that matches the reference typography
const sans = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

import SmoothScroll from "@/components/SmoothScroll";
import ViewCursor from "@/components/ViewCursor";
import { GlobalMagnetic } from "@/components/hooks/useMagnetic";

export const metadata: Metadata = {
  title: brand.name,
  description: brand.tagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.variable}>
      <body className="bg-canvas font-sans text-ink antialiased">
        <SmoothScroll />
        <ViewCursor />
        <GlobalMagnetic />
        {children}
      </body>
    </html>
  );
}
