"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import recentExperiences from "@/data/recent-experiences";
import StoryViewer from "@/components/sections/StoryViewer";
import "@/components/sections/RecentExperiences.css";

gsap.registerPlugin(ScrollTrigger);

const filters = [
  { label: "All", match: null },
  { label: "Events", match: "Events" },
  { label: "Activations", match: "Activation" },
  { label: "Exhibitions", match: "Exhibition" },
  { label: "Creative Strategy", match: "Creative Strategy" },
] as const;

/** Horizontal rail of story plates. Opening a plate hands off to the full-screen viewer. */
export default function RecentExperiences() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLUListElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const returnFocusRef = useRef<number | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const [filter, setFilter] = useState<string | null>(null);
  const shown = recentExperiences.filter((s) => !filter || s.category === filter);

  // Plates rise into place every time the section arrives, not just the first.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const ctx = gsap.context(() => {
      const plates = gsap.utils.toArray<HTMLElement>(".rx-plate-card");
      gsap.fromTo(
        ".rx-head-controls-bar > *",
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
      aria-label="Stories we’ve brought to life"
    >
      <div className="rx-intro-block">
        <span className="rcf-eyebrow">FEATURED WORK<i></i></span>
        <p className="rcf-featured__intro">
          Every experience tells our story&mdash;of passion, creativity, and the pursuit of
          excellence. This is Rock Castle Experiences. A showcase of events we&rsquo;ve proudly
          brought to life, together with our clients and partners.
        </p>
      </div>

      <div className="rx-filters rx-head-controls-bar" role="tablist" aria-label="Filter stories">
        {filters.map((f) => (
          <button
            key={f.label}
            type="button"
            role="tab"
            aria-selected={filter === f.match}
            className={filter === f.match ? "is-active" : ""}
            onClick={() => setFilter(f.match)}
          >
            {f.label}
          </button>
        ))}
        <em>[ 02 ]</em>
      </div>

      <ul className="rx-rail" ref={railRef} onScroll={updateEdges} aria-label="Recent experiences">
        {shown.map((story, index) => (
          <li className="rx-rail__item" key={story.id}>
            <button
              type="button"
              className="rx-plate-card"
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              onClick={() => setOpenIndex(index)}
              aria-haspopup="dialog"
              aria-label={`View story: ${story.title}, ${story.frames.length} frames`}
            >
              <span className="rx-plate">
                <span className="rx-plate__media">
                  <img src={story.cover} alt="" loading="lazy" decoding="async" />
                </span>
                {story.category && (
                  <span className="rx-plate__tags" aria-hidden="true">
                    <span className="rx-plate__tag">{story.category} <i>↗</i></span>
                  </span>
                )}

                <span className="rx-plate__view" aria-hidden="true">
                  <span className="rx-plate__view-pill">Experience <i>↗</i></span>
                </span>
              </span>

              {/* Title lives below the photo frame, not overlaid on it */}
              <span className="rx-plate__footer" aria-hidden="true">
                <span className="rx-plate__title">{story.title}</span>
                <span className="rx-plate__stats">Lorem ipsum &nbsp; Lorem ipsum &nbsp; Lorem ipsum</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {openIndex !== null && (
        <StoryViewer
          stories={shown}
          startIndex={openIndex}
          getOriginRect={getOriginRect}
          onClosed={onClosed}
        />
      )}
    </section>
  );
}
