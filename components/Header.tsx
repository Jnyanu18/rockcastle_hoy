"use client";

import { useEffect, useState } from "react";
import { brand, cta, navigation } from "@/data/content";
import Pill from "@/components/ui/Pill";
import { Wordmark } from "@/components/ui/Wordmark";

/**
 * Fixed 80px bar. Transparent over the hero with light type,
 * then a pale grey bar with dark type once the page scrolls.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const tone = scrolled || menuOpen ? "bg-mist text-night" : "bg-transparent text-white";

  return (
    <header className={`fixed inset-x-0 top-0 z-50 h-20 transition-colors duration-500 ${tone}`}>
      <nav
        aria-label="Primary"
        className="grid h-full grid-cols-[1fr_auto_1fr] items-center px-[var(--gutter)]"
      >
        {/* Left: links on desktop, menu toggle on mobile */}
        <ul className="hidden items-center gap-10 text-[0.8125rem] font-medium md:flex">
          {navigation.map((item) => (
            <li key={item.label}>
              <a href={item.href} className="group relative inline-block py-1">
                {item.label}
                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-current transition-transform duration-500 ease-cinematic group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="justify-self-start text-[0.8125rem] font-medium md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>

        <a href="#top" aria-label={`${brand.name} home`} className="justify-self-center">
          <Wordmark />
        </a>

        <div className="flex items-center justify-self-end gap-5">
          <a
            href={brand.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hidden text-[0.95rem] font-semibold transition-opacity hover:opacity-60 sm:inline-block"
          >
            in
          </a>
          <a
            href={brand.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hidden transition-opacity hover:opacity-60 sm:inline-block"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
            </svg>
          </a>
          <div className="hidden sm:block">
            <Pill href={cta.href} variant="light" marquee icon>
              {cta.label}
            </Pill>
          </div>
        </div>
      </nav>

      {menuOpen ? (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-20 border-t border-night/10 bg-mist px-[var(--gutter)] py-8 md:hidden"
        >
          <ul className="flex flex-col gap-5 text-2xl">
            {navigation.map((item) => (
              <li key={item.label}>
                <a href={item.href} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <Pill href={cta.href} variant="solid" icon className="mt-8">
            {cta.label}
          </Pill>
        </div>
      ) : null}
    </header>
  );
}
