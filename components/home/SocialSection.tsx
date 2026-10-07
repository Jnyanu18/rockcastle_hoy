"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { social } from "@/data/home";
import Placeholder from "../Placeholder";

const REEL_RATIO = "9 / 16";
const REEL_COUNT = 5;

/* Animated counter: runs once when the stat scrolls into view. */
function CountUp({ to, active, reduce }: { to: number; active: boolean; reduce: boolean | null }) {
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!active) return undefined;
    if (reduce) {
      setValue(to);
      return undefined;
    }
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [active, to, reduce]);

  return <>{value.toLocaleString("en-US")}</>;
}

/* Social: vertical reel-style tiles, a headline, and four counters that animate in. */
export default function SocialSection() {
  const reduce = useReducedMotion();
  const statsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(statsRef, { once: true, margin: "-15% 0px" });

  return (
    <section aria-labelledby="social-heading" className="overflow-hidden bg-ink px-5 py-24 text-acid md:px-12 md:py-36">
      <div className="mx-auto max-w-[1680px]">
        <div className="mb-14 flex items-baseline justify-between text-[12px] md:mb-20">
          <span>{social.index}</span>
          <span className="opacity-70">Social</span>
        </div>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-10">
          {/* Headline and counters */}
          <div className="md:col-span-5 md:flex md:flex-col md:justify-between">
            <h2 id="social-heading" className="text-[clamp(2.6rem,6vw,6.4rem)] font-semibold leading-[0.9] tracking-[-0.045em]">
              {social.headline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>

            <div ref={statsRef} className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 md:mt-0">
              {social.stats.map((s) => (
                <div key={s.label} className="border-t border-acid/20 pt-4">
                  <p className="text-[clamp(2rem,3.6vw,3.6rem)] font-semibold leading-none tracking-[-0.03em] tabular-nums">
                    <CountUp to={s.value} active={inView} reduce={reduce} />
                  </p>
                  <p className="mt-3 text-[11px] uppercase tracking-[0.12em] opacity-70">{s.label}</p>
                </div>
              ))}
            </div>

            <a
              href={social.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-14 inline-flex items-center gap-3 self-start text-[13px] font-semibold uppercase tracking-[0.1em]"
            >
              {social.cta.label}
              <span aria-hidden className="transition-transform duration-500 ease-cinematic group-hover:translate-x-1">→</span>
            </a>
          </div>

          {/* Reel-style strip: tall vertical tiles, offset heights, not a feed grid */}
          <div className="md:col-span-7">
            <ul className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-5 md:gap-5 md:overflow-visible md:pb-0" style={{ scrollbarWidth: "none" }}>
              {Array.from({ length: REEL_COUNT }).map((_, i) => (
                <li key={i} className={`w-[46vw] shrink-0 md:w-auto ${i % 2 ? "md:mt-16" : ""}`}>
                  <Placeholder label={`PLACEHOLDER social reel ${i + 1}`} ratio={REEL_RATIO} className="rounded-media" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
