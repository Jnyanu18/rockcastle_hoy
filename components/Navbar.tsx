"use client";

import { useEffect, useState } from "react";
import { brand, navigation, social } from "@/lib/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Transparent over the hero media, light bar once the page scrolls
  const tone = scrolled ? "bg-header text-ink" : "bg-transparent text-canvas";

  return (
    <header className={`fixed inset-x-0 top-0 z-50 h-20 transition-colors duration-500 ${tone}`}>
      <nav className="relative mx-auto flex h-full max-w-[1600px] items-center justify-between px-4 md:px-10">
        {/* Left: links (desktop) / menu toggle (mobile) */}
        <ul className="hidden items-center gap-8 text-sm md:flex">
          {navigation.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="text-sm md:hidden"
        >
          Menu
        </button>

        {/* Centre: wordmark (placeholder until the client logo is supplied) */}
        <a
          href="#home"
          aria-label={`${brand.name} home`}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-2xl font-semibold leading-none tracking-tight"
        >
          {brand.shortName}
        </a>

        {/* Right: socials + pill CTA */}
        <div className="flex items-center gap-5">
          <a
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hidden sm:inline-flex"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
            </svg>
          </a>
          <a
            href="#contact"
            className="group inline-flex h-10 items-center gap-3 rounded-full bg-canvas px-5 text-xs font-medium uppercase tracking-wide text-ink transition-transform duration-300 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2"
          >
            Connect
            <span aria-hidden className="text-base leading-none transition-transform duration-500 group-hover:rotate-90">+</span>
          </a>
        </div>
      </nav>

      {open && (
        <ul id="mobile-menu" className="absolute inset-x-0 top-20 flex flex-col gap-4 bg-header px-4 py-6 text-ink md:hidden">
          {navigation.map((link) => (
            <li key={link.label}>
              <a href={link.href} onClick={() => setOpen(false)} className="text-2xl">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
