"use client";

import { motion, useReducedMotion } from "framer-motion";
import { hero } from "@/data/home";

const EASE = [0.76, 0, 0.24, 1] as const;

/* Full-viewport showreel. The visual carries the impact; copy stays minimal. */
export default function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 40 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.1, ease: EASE, delay },
        };

  return (
    <section id="home" className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-[#1b1d14] text-acid">
      {/* PLACEHOLDER showreel: swap for <video autoPlay muted loop playsInline src={hero.showreelSrc} poster={hero.showreelPoster}> */}
      <div aria-hidden className="absolute inset-0 bg-[#1b1d14]" />

      <div className="absolute inset-x-5 bottom-10 z-10 md:inset-x-12 md:bottom-14">
        <motion.h1
          className="max-w-[16ch] text-[clamp(3rem,9vw,9.5rem)] font-semibold leading-[0.9] tracking-[-0.045em]"
          {...rise(0.15)}
        >
          {hero.title}
        </motion.h1>

        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <motion.p className="text-[clamp(1rem,1.6vw,1.4rem)] font-medium" {...rise(0.35)}>
            {hero.subtitle}
          </motion.p>

          <motion.a
            href={hero.cta.href}
            className="group inline-flex items-center gap-3 self-start text-[13px] font-semibold uppercase tracking-[0.12em] md:self-auto"
            {...rise(0.5)}
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-acid text-ink transition-transform duration-500 ease-cinematic group-hover:scale-105">
              ▶
            </span>
            <span className="underline-offset-[6px] group-hover:underline">{hero.cta.label} →</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
