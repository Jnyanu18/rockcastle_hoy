"use client";

import { useEffect, useRef, useState } from "react";
import Media from "@/components/Media";
import { services } from "@/lib/content";

/* Services: each statement is a full-height step. The step nearest the middle
   of the viewport stays bright; the others drop to a dimmed tone, as in the
   reference. Pure opacity/colour change, no transform choreography. */
export default function Services() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const els = refs.current.filter(Boolean) as HTMLDivElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="relative bg-ink px-4 text-canvas md:px-10">
      {services.map((s, i) => {
        const isActive = i === active;
        return (
          <div
            key={s.index}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-index={i}
            className="flex min-h-[90vh] flex-col items-center justify-center py-24 text-center"
          >
            <h2
              className={`relative flex max-w-5xl flex-wrap items-center justify-center gap-4 text-4xl leading-[1.05] transition-opacity duration-700 md:text-6xl lg:text-[72px] ${
                isActive ? "opacity-100" : "opacity-40"
              }`}
            >
              <span className="mr-2 align-top text-xs font-normal tabular-nums">[ {s.index} ]</span>
              {s.title}
              <span
                aria-hidden
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-canvas text-sm leading-none text-ink md:h-16 md:w-16"
              >
                →
              </span>
            </h2>
            <p className={`mt-8 max-w-lg text-sm leading-relaxed transition-opacity duration-700 ${isActive ? "opacity-100" : "opacity-40"}`}>
              {s.body}
            </p>

            <ul className="mt-12 grid w-full max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
              {s.images.map((src, j) => (
                <li key={j} className="aspect-[3/4] overflow-hidden rounded-xl">
                  <Media src={src} alt={`${s.title} still ${j + 1}`} className="h-full w-full" />
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </section>
  );
}
