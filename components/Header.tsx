"use client";

import { useEffect, useState } from "react";
import { cta, nav, site, social } from "@/lib/siteContent";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll(); // a page reloaded mid-scroll should start in the right state
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 h-[var(--header-h)] border-b transition-colors duration-500",
        scrolled ? "border-ink/10 bg-paper text-ink" : "border-transparent bg-transparent text-acid",
      ].join(" ")}
    >
      <nav className="mx-auto grid h-full max-w-[1680px] grid-cols-[1fr_auto_1fr] items-center px-5 md:px-12">
        {/* Left: small uppercase links */}
        <ul className="hidden items-center gap-7 md:flex">
          {nav.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="group relative text-[11px] font-medium uppercase tracking-[0.12em]"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 ease-cinematic group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#works"
          className="text-[11px] font-medium uppercase tracking-[0.12em] md:hidden"
        >
          Menu
        </a>

        {/* Centre: compact stacked wordmark */}
        <a href="#top" aria-label={`${site.name} home`} className="flex flex-col items-start leading-none">
          <span className="text-[26px] font-semibold tracking-tightest md:text-[30px]">
            {site.name}
          </span>
          <span className="mt-0.5 text-[7px] font-medium uppercase tracking-[0.2em] md:text-[8px]">
            {site.descriptor}
          </span>
        </a>

        {/* Right: social + CTA pill */}
        <div className="flex items-center justify-self-end gap-4 md:gap-6">
          {social.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="hidden text-[13px] font-semibold transition-opacity hover:opacity-60 sm:inline"
            >
              {s.short}
            </a>
          ))}
          <a
            href={cta.href}
            className={[
              "group inline-flex items-center gap-2 rounded-pill px-4 py-2 text-[11px] font-medium uppercase tracking-[0.08em] transition-colors duration-500",
              scrolled
                ? "bg-acid text-ink hover:bg-ink hover:text-acid"
                : "bg-acid text-ink hover:bg-paper",
            ].join(" ")}
          >
            {cta.label}
            <span className="text-base leading-none transition-transform duration-500 ease-cinematic group-hover:rotate-90">+</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
