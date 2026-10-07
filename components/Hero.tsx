"use client";

import { motion, useReducedMotion } from "framer-motion";
import { hero } from "@/lib/siteContent";

const EASE = [0.76, 0, 0.24, 1] as const;

/* Tile positions in % of the hero box, matching the stepped cluster in the reference. */
const TILE_POS = [
  { left: "52%", top: "36%" },
  { left: "50%", top: "50%" },
  { left: "54%", top: "64%" },
];

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
    <section
      id="top"
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-[#22262f] text-acid"
    >
      {/* PLACEHOLDER background: swap for the client's <video autoPlay muted loop playsInline> */}
      <div aria-hidden className="absolute inset-0 bg-[#22262f]" />

      {/* Letter-tile cluster */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-[260px] w-[260px] md:h-[360px] md:w-[360px]">
          {hero.mark.map((letter, i) => (
            <motion.div
              key={`${letter}-${i}`}
              className="absolute grid h-[30%] w-[30%] place-items-center rounded-[18%] bg-acid font-semibold text-ink"
              style={{
                left: `${TILE_POS[i].left}`,
                top: `${TILE_POS[i].top}`,
                translate: "-50% -50%",
                fontSize: "clamp(28px, 4vw, 52px)",
              }}
              {...rise(0.25 + i * 0.12)}
            >
              {letter}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Top-left marker */}
      <motion.p
        className="absolute left-5 top-[calc(var(--header-h)+24px)] z-10 text-[11px] font-medium uppercase tracking-[0.12em] md:left-12"
        {...rise(0.1)}
      >
        Welcome!
      </motion.p>

      {/* Bottom-left and bottom-right copy */}
      <motion.p
        className="absolute bottom-10 left-5 z-10 max-w-[18rem] text-[17px] font-medium leading-[1.25] md:left-12 md:text-[20px]"
        {...rise(0.45)}
      >
        {hero.leftCopy}
      </motion.p>
      <motion.p
        className="absolute bottom-10 right-5 z-10 max-w-[15rem] text-right text-[12px] leading-[1.45] md:right-12"
        {...rise(0.55)}
      >
        {hero.rightCopy}
      </motion.p>
    </section>
  );
}
