"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { caseStudies as cases } from "@/data/projects";
import { caseStudies as copy } from "@/data/home";

/* Horizontal case-study rail. Vertical scroll drives the sideways move on desktop;
   below md the same cards simply stack, so there is no nested scrollbar on touch.
   The card height is capped to the viewport (not the width), so the heading row
   and the cards both fit inside the sticky stage with nothing clipped. */

export default function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();
  const [desktop, setDesktop] = useState(false);
  const [travel, setTravel] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Measure the real track width rather than assuming it from vw arithmetic
  useLayoutEffect(() => {
    if (!desktop) {
      setTravel(0);
      return undefined;
    }
    const el = trackRef.current;
    if (!el) return undefined;
    const measure = () => setTravel(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [desktop]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  // Smoothing: the track eases toward the scroll position rather than snapping to it
  const eased = useSpring(scrollYProgress, { stiffness: 90, damping: 30, mass: 0.4 });
  const x = useTransform(eased, [0, 1], [0, -travel]);

  const horizontal = desktop && !reduce;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="cases-heading"
      className="relative bg-ink text-acid"
      style={{ height: desktop ? `${cases.length * 70 + 100}vh` : undefined }}
    >
      <div className="px-5 pt-24 pb-10 md:sticky md:top-0 md:flex md:h-screen md:flex-col md:px-0 md:pt-20 md:pb-12">
        <div className="mx-auto mb-12 flex w-full max-w-[1680px] shrink-0 flex-col gap-8 md:mb-10 md:flex-row md:items-end md:justify-between md:px-12">
          <div>
            <p className="mb-6 text-[12px]">{copy.index}</p>
            <h2 id="cases-heading" className="text-[clamp(2.4rem,4.6vw,4.8rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
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

        {/* Track area: fills the remaining sticky height, clipped only here (never the heading) */}
        <div className="min-h-0 flex-1 md:overflow-hidden">
          <motion.ul
            ref={trackRef}
            className="flex h-full flex-col gap-16 md:w-max md:flex-row md:items-center md:gap-10 md:pl-12 md:pr-12"
            style={horizontal ? { x } : undefined}
          >
            {cases.map((c, i) => (
              <li
                key={c.id}
                className="flex w-full shrink-0 flex-col gap-5 md:h-full md:w-auto md:flex-row md:items-center md:gap-8"
                style={{ marginTop: horizontal && i % 2 ? "4vh" : undefined }}
              >
                {/* Image and metadata share one list item, so they move together */}
                <div
                  role="img"
                  aria-label={c.media.alt}
                  className="w-full rounded-media bg-[#2b2e27] md:h-[62%] md:w-auto"
                  style={{ aspectRatio: c.media.ratio }}
                />
                <dl className="grid shrink-0 grid-cols-2 gap-x-6 gap-y-4 text-[12px] md:grid-cols-1 md:gap-y-5">
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
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
