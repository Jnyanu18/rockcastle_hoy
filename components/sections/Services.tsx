"use client";

import { useCallback, useRef } from "react";
import { type Service, services } from "@/data/content";
import { useScrollProgress } from "@/lib/hooks";
import Reveal from "@/components/ui/Reveal";
import Sparkle from "@/components/ui/Sparkle";

// Horizontal travel of each heading, in px, at full offset.
// Odd headings travel the other way, so the three read as a rhythm.
const TRAVEL = 120;
const DIRECTIONS = [1, -1, 1] as const;

/** Three large service statements, each with a scroll-linked horizontal shift. */
export default function Services() {
  return (
    <section id="services" className="overflow-x-clip bg-night px-[var(--gutter)] pb-[var(--section-y)] text-pale">
      {services.map((service, i) => (
        <ServiceBlock key={service.index} service={service} direction={DIRECTIONS[i % DIRECTIONS.length]} />
      ))}
    </section>
  );
}

function ServiceBlock({ service, direction }: { service: Service; direction: 1 | -1 }) {
  const blockRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const sparkLeft = useRef<HTMLSpanElement>(null);
  const sparkRight = useRef<HTMLSpanElement>(null);

  const apply = useCallback(
    (p: number) => {
      const head = headRef.current;
      if (!head) return;
      const offset = (p - 0.5) * 2; // -1 .. 1, centred at 0
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Narrow screens keep headings in place: the shift would push them out of frame
      const narrow = window.innerWidth < 768;
      head.style.transform =
        reduced || narrow ? "" : `translate3d(${(offset * TRAVEL * direction).toFixed(1)}px, 0, 0)`;
      // Brightest when centred, dimmer toward the edges of the viewport
      head.style.opacity = String(0.38 + 0.62 * (1 - Math.min(1, Math.abs(offset))));

      const turn = `rotate(${(offset * 45).toFixed(1)}deg)`;
      if (sparkLeft.current) sparkLeft.current.style.transform = reduced ? "" : turn;
      if (sparkRight.current) sparkRight.current.style.transform = reduced ? "" : turn;
    },
    [direction],
  );

  useScrollProgress(blockRef, apply);

  return (
    <div ref={blockRef} className="relative py-[calc(var(--section-y)*0.5)]">
      <span
        ref={sparkLeft}
        aria-hidden
        className="absolute left-0 top-[calc(var(--section-y)*0.5)] inline-block will-change-transform"
      >
        <Sparkle size={30} />
      </span>
      <span
        ref={sparkRight}
        aria-hidden
        className="absolute right-0 top-[calc(var(--section-y)*0.5)] inline-block will-change-transform"
      >
        <Sparkle size={30} />
      </span>

      <div ref={headRef} className="will-change-transform text-center">
        <p className="flex items-center justify-center gap-4 text-[0.8125rem]">
          <span>{service.index}</span>
        </p>
        <h3 className="mx-auto mt-6 max-w-[52rem] text-[length:var(--title-size)] font-medium leading-[1.02] tracking-[-0.02em]">
          {service.title}{" "}
          <span
            aria-hidden
            className="ml-2 inline-flex h-[0.8em] w-[0.8em] items-center justify-center rounded-full bg-white align-middle text-[0.34em] leading-none text-night"
          >
            →
          </span>
        </h3>
        <p className="mx-auto mt-8 max-w-[24rem] text-[clamp(13px,1vw,16px)] leading-[1.35]">
          {service.body}
        </p>
      </div>

      <div className="mx-auto mt-[clamp(48px,5vw,80px)] flex max-w-[1000px] justify-center gap-[clamp(12px,2.5vw,40px)]">
        {service.media.map((item, i) => (
          <Reveal key={item.alt} variant="clip" delay={i * 90} className="w-[clamp(96px,12.6vw,200px)] shrink-0">
            <div
              className="media-zoom aspect-[4/5] w-full rounded-[10px]"
              style={{ background: item.tone }}
              role="img"
              aria-label={item.alt}
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
