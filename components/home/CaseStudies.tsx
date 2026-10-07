"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { caseStudies as cases } from "@/data/projects";
import { caseStudies as copy } from "@/data/home";
import Placeholder from "../Placeholder";

/* Horizontal case-study rail. Vertical scroll drives the sideways move on desktop;
   below md the same cards simply stack, so there is no nested scrollbar on touch. */

const CARD_VW = 44;
const GAP_VW = 6;
const PAD_VW = 12;
// Distance the track has to travel so the last card finishes inside the right margin
const TRAVEL_VW = PAD_VW * 2 + cases.length * CARD_VW + (cases.length - 1) * GAP_VW - 100;

export default function CaseStudies() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Smoothing: the track eases toward the scroll position rather than snapping to it
  const eased = useSpring(scrollYProgress, { stiffness: 90, damping: 30, mass: 0.4 });
  const x = useTransform(eased, [0, 1], ["0vw", `-${TRAVEL_VW}vw`]);

  const horizontal = desktop && !reduce;

  return (
    <section
      ref={ref}
      aria-labelledby="cases-heading"
      className="relative bg-ink text-acid"
      style={{ height: desktop ? `${cases.length * 80 + 100}vh` : undefined }}
    >
      <div className="px-5 pt-24 md:sticky md:top-0 md:flex md:h-screen md:flex-col md:justify-center md:overflow-hidden md:px-0 md:pt-0">
        <div className="mx-auto mb-12 flex w-full max-w-[1680px] flex-col gap-8 md:mb-16 md:flex-row md:items-end md:justify-between md:px-12">
          <div>
            <p className="mb-6 text-[12px]">{copy.index}</p>
            <h2 id="cases-heading" className="text-[clamp(2.4rem,5.6vw,6rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
              {copy.headline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>
          <a
            href={copy.cta.href}
            className="group inline-flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.1em]"
          >
            {copy.cta.label}
            <span aria-hidden className="transition-transform duration-500 ease-cinematic group-hover:translate-x-1">→</span>
          </a>
        </div>

        <motion.ul
          className="flex flex-col gap-16 md:w-max md:flex-row md:items-start md:gap-[6vw] md:pl-[12vw]"
          style={horizontal ? { x } : undefined}
        >
          {cases.map((c, i) => (
            <li
              key={c.id}
              className="w-full md:w-[44vw] md:shrink-0"
              style={{ marginTop: horizontal && i % 2 ? "8vh" : undefined }}
            >
              {/* Image and metadata share one container, so they move together */}
              <article className="px-5 md:px-0">
                <Placeholder label={c.media.alt} ratio={c.media.ratio} className="rounded-media" />
                <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 text-[12px] md:grid-cols-4">
                  <div>
                    <dt className="uppercase tracking-[0.1em] opacity-60">Client</dt>
                    <dd className="mt-1 text-[15px] font-medium">{c.client}</dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-[0.1em] opacity-60">Project</dt>
                    <dd className="mt-1 text-[15px] font-medium">{c.project}</dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-[0.1em] opacity-60">Category</dt>
                    <dd className="mt-1 text-[15px] font-medium">{c.category}</dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-[0.1em] opacity-60">Year</dt>
                    <dd className="mt-1 text-[15px] font-medium">{c.year}</dd>
                  </div>
                </dl>
              </article>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
