"use client";

import { motion, useReducedMotion } from "framer-motion";
import { clients } from "@/data/home";

/* Curated client environment: a large heading, a slow horizontal strip, and a static grid for small screens. */
export default function Clients() {
  const reduce = useReducedMotion();
  // Duplicate the list so the marquee loops without a visible seam
  const loop = [...clients.names, ...clients.names];

  return (
    <section aria-labelledby="clients-heading" className="overflow-hidden bg-acid py-24 md:py-36">
      <div className="mx-auto max-w-[1680px] px-5 md:px-12">
        <div className="mb-14 flex items-baseline justify-between text-[12px] md:mb-20">
          <span>{clients.index}</span>
          <span className="text-ink/70">Clients</span>
        </div>

        <h2 id="clients-heading" className="text-[clamp(2.4rem,6vw,6.4rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
          {clients.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
      </div>

      {/* Marquee on screens that have the room; the list is still readable with motion off */}
      <div className="mt-16 border-y border-ink/20 py-8 md:mt-24 md:py-12">
        <motion.ul
          className="flex w-max gap-14 whitespace-nowrap pl-5 md:gap-24 md:pl-12"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={reduce ? undefined : { duration: 40, ease: "linear", repeat: Infinity }}
        >
          {loop.map((name, i) => (
            <li
              key={`${name}-${i}`}
              aria-hidden={i >= clients.names.length || undefined}
              className="text-[clamp(1.4rem,3vw,3rem)] font-semibold uppercase tracking-[-0.02em] text-ink/85 transition-colors duration-500 hover:text-ink"
            >
              {name}
            </li>
          ))}
        </motion.ul>
      </div>

      <div className="mx-auto mt-14 flex max-w-[1680px] justify-end px-5 md:px-12">
        <a href={clients.cta.href} className="group inline-flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.1em]">
          {clients.cta.label}
          <span aria-hidden className="transition-transform duration-500 ease-cinematic group-hover:translate-x-1">→</span>
        </a>
      </div>
    </section>
  );
}
