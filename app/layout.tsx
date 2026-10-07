import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { brand } from "@/data/site";
import "./globals.css";

const sans = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${brand.name} | ${brand.tagline}`,
  description: "Rock Castle is a production team for events, shows and brand experiences.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.variable}>
      <body className="bg-acid font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
