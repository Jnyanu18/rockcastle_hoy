"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import recentExperiences from "@/data/recent-experiences";
import StoryViewer from "@/components/sections/StoryViewer";
import "@/components/sections/RecentExperiences.css";

gsap.registerPlugin(ScrollTrigger);

const pad = (n: number) => String(n).padStart(2, "0");

/** Horizontal rail of story plates. Opening a plate hands off to the full-screen viewer. */
export default function RecentExperiences() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLUListElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const returnFocusRef = useRef<number | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  // Plates rise into place every time the section arrives, not just the first.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const ctx = gsap.context(() => {
      const plates = gsap.utils.toArray<HTMLElement>(".rx-plate");
      gsap.fromTo(
        ".rx-head > *",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "restart none restart none" },
        },
      );
      gsap.fromTo(
        plates,
        { y: 70, opacity: 0, clipPath: "inset(12% 0% 0% 0%)" },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.1,
          stagger: 0.09,
          ease: "expo.out",
          clearProps: "clipPath",
          scrollTrigger: { trigger: railRef.current, start: "top 85%", toggleActions: "restart none restart none" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const updateEdges = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const start = rail.scrollLeft < 8;
    const end = rail.scrollLeft + rail.clientWidth > rail.scrollWidth - 8;
    setEdges((e) => (e.start === start && e.end === end ? e : { start, end }));
  }, []);

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, [updateEdges]);

  const scrollRail = (dir: -1 | 1) => {
    const rail = railRef.current;
    const plate = cardRefs.current[0];
    if (!rail || !plate) return;
    const gap = parseFloat(getComputedStyle(rail).columnGap || "0");
    const step = plate.getBoundingClientRect().width + gap;
    rail.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  // The viewer asks where a story's plate is so it can expand from / collapse
  // into it. If the visitor moved to another story inside the viewer, bring
  // that plate into the rail first so the close resolves onto the right card.
  const getOriginRect = useCallback((index: number) => {
    const card = cardRefs.current[index];
    const rail = railRef.current;
    if (!card) return null;
    const media = (card.querySelector(".rx-plate__media") as HTMLElement | null) ?? card;
    let rect = media.getBoundingClientRect();
    if (rail && (rect.left < 0 || rect.right > window.innerWidth)) {
      rail.scrollLeft += rect.left - (window.innerWidth - rect.width) / 2;
      rect = media.getBoundingClientRect();
    }
    const visible = rect.bottom > 0 && rect.top < window.innerHeight && rect.width > 0;
    return visible ? rect : null;
  }, []);

  const onClosed = useCallback((index: number) => {
    returnFocusRef.current = index;
    setOpenIndex(null);
  }, []);

  // Focus returns to the plate of the story that was showing on close.
  useEffect(() => {
    if (openIndex !== null || returnFocusRef.current === null) return;
    cardRefs.current[returnFocusRef.current]?.focus({ preventScroll: true });
    returnFocusRef.current = null;
  }, [openIndex]);

  if (!recentExperiences.length) return null;

  return (
    <section
      className="recent-experiences"
      id="recent-experiences"
      ref={sectionRef}
      aria-labelledby="rx-title"
    >
      <header className="rx-head">
        <span className="rx-head__eyebrow">[&nbsp;RECENT EXPERIENCES&nbsp;]</span>
        <h2 className="rx-head__title" id="rx-title">
          Recently <em>created.</em>
        </h2>
        <div className="rx-head__controls">
          <span className="rx-head__count">{pad(recentExperiences.length)} stories</span>
          <button
            type="button"
            className="rx-head__arrow"
            data-magnetic
            onClick={() => scrollRail(-1)}
            disabled={edges.start}
            aria-label="Scroll stories left"
          >
            ←
          </button>
          <button
            type="button"
            className="rx-head__arrow"
            data-magnetic
            onClick={() => scrollRail(1)}
            disabled={edges.end}
            aria-label="Scroll stories right"
          >
            →
          </button>
        </div>
      </header>

      <ul className="rx-rail" ref={railRef} onScroll={updateEdges} aria-label="Recent experiences">
        {recentExperiences.map((story, index) => (
          <li className="rx-rail__item" key={story.id}>
            <button
              type="button"
              className="rx-plate"
              data-cursor="view"
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              onClick={() => setOpenIndex(index)}
              aria-haspopup="dialog"
              aria-label={`View story: ${story.title}, ${story.frames.length} frames`}
            >
              <span className="rx-plate__media">
                <img src={story.cover} alt="" loading="lazy" decoding="async" />
              </span>
              <span className="rx-plate__scrim" aria-hidden="true" />

              {/* Sequence indicator: one hairline per frame */}
              <span className="rx-plate__segments" aria-hidden="true">
                {story.frames.map((f) => (
                  <i key={f.id} />
                ))}
              </span>

              <span className="rx-plate__top" aria-hidden="true">
                <span className="rx-plate__index">{pad(index + 1)}</span>
                <span className="rx-plate__frames">{pad(story.frames.length)} frames</span>
              </span>

              <span className="rx-plate__body" aria-hidden="true">
                <span className="rx-plate__meta">
                  {[story.date, story.city, story.category]
                    .filter(Boolean)
                    .map((m) => (
                      <span key={m}>{m}</span>
                    ))}
                </span>
                <span className="rx-plate__title">{story.title}</span>
                <span className="rx-plate__cta">
                  View story <span className="rx-plate__arrow">→</span>
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {openIndex !== null && (
        <StoryViewer
          stories={recentExperiences}
          startIndex={openIndex}
          getOriginRect={getOriginRect}
          onClosed={onClosed}
        />
      )}
    </section>
  );
}
