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
  title: "Rock Castle — Experiences Un-Ltd.",
  description: "Premier 360-degree experiential marketing, brand activations, spatial design and event management in India.",
  icons: {
    icon: "/rockcastle-logo.jpg",
    shortcut: "/rockcastle-logo.jpg",
    apple: "/rockcastle-logo.jpg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.variable}>
      <head>
        <link rel="icon" href="/rockcastle-logo.jpg" />
        <link rel="shortcut icon" href="/rockcastle-logo.jpg" />
        <link rel="apple-touch-icon" href="/rockcastle-logo.jpg" />
      </head>
      <body className="bg-canvas font-sans text-ink antialiased">
        <SmoothScroll />
        <ViewCursor />
        <GlobalMagnetic />
        {children}
      </body>
    </html>
  );
}
