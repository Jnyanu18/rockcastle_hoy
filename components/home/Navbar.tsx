"use client";

import { useEffect, useState } from "react";
import { brand, navCta, navigation } from "@/data/site";

/* Minimal sticky nav. Transparent over the showreel; a light bar once the page scrolls. */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 h-[var(--header-h)] transition-[background-color,color,box-shadow] duration-500",
        scrolled ? "bg-paper text-ink shadow-[0_1px_0_rgba(23,23,23,0.08)]" : "bg-transparent text-acid",
      ].join(" ")}
    >
      <nav aria-label="Primary" className="mx-auto flex h-full max-w-[1680px] items-center justify-between px-5 md:px-12">
        <a href="#home" aria-label={`${brand.name} home`} className="flex items-baseline gap-3 leading-none">
          <span className="text-[15px] font-semibold tracking-[0.04em]">{brand.name}</span>
          <span className="hidden text-[11px] uppercase tracking-[0.12em] opacity-70 sm:inline">{brand.tagline}</span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => (
            <li key={item.label}>
              <a href={item.href} className="group relative text-[12px] font-medium uppercase tracking-[0.1em]">
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 ease-cinematic group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href={navCta.href}
          className="group inline-flex items-center gap-2 rounded-pill bg-acid px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-ink transition-colors duration-500 hover:bg-ink hover:text-acid"
        >
          {navCta.label}
          <span aria-hidden className="transition-transform duration-500 ease-cinematic group-hover:translate-x-1">→</span>
        </a>
      </nav>
    </header>
  );
}
