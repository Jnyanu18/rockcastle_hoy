"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { brand, navCta, navigation } from "@/data/site";

/* Minimal sticky nav. Transparent over the showreel; a light bar once the page scrolls.
   Below `lg` the link list collapses behind a small toggle instead of disappearing. */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on Escape, and keep the page from scrolling behind the open panel
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflowY;
    document.body.style.overflowY = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflowY = prevOverflow;
    };
  }, [open]);

  const dark = scrolled || open;

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 h-[var(--header-h)] transition-[background-color,color,box-shadow] duration-500",
        dark ? "bg-paper text-ink shadow-[0_1px_0_rgba(23,23,23,0.08)]" : "bg-transparent text-acid",
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

        <div className="flex items-center gap-3">
          <a
            href={navCta.href}
            className="group inline-flex items-center gap-2 rounded-pill bg-acid px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-ink transition-colors duration-500 hover:bg-ink hover:text-acid"
          >
            {navCta.label}
            <span aria-hidden className="transition-transform duration-500 ease-cinematic group-hover:translate-x-1">→</span>
          </a>

          {/* Mobile/tablet toggle: the link list lives in the panel below instead of disappearing */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav-panel"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-9 w-9 place-items-center rounded-full border border-current lg:hidden"
          >
            <span className="relative block h-3 w-4" aria-hidden>
              <span
                className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-300 ${open ? "translate-y-[5px] rotate-45" : ""}`}
              />
              <span
                className={`absolute left-0 bottom-0 h-px w-full bg-current transition-transform duration-300 ${open ? "-translate-y-[5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="border-t border-ink/10 bg-paper px-5 py-6 text-ink lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navigation.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-[15px] font-medium uppercase tracking-[0.08em]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
