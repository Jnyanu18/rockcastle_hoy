"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { RecentStory } from "@/data/recent-experiences";

const pad = (n: number) => String(n).padStart(2, "0");

type Props = {
  stories: RecentStory[];
  startIndex: number;
  /** Where the plate for a story sits now, or null if it is off screen. */
  getOriginRect: (index: number) => DOMRect | null;
  /** Called once the close animation has finished. */
  onClosed: (index: number) => void;
};

/**
 * Full-screen story viewer. It expands out of the plate it was opened from
 * and collapses back into whichever plate is showing when it closes.
 */
export default function StoryViewer({ stories, startIndex, getOriginRect, onClosed }: Props) {
  const [index, setIndex] = useState(startIndex);
  const [frame, setFrame] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef(false);
  const story = stories[index];

  const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Expand from the originating plate
  useEffect(() => {
    const panel = panelRef.current;
    const origin = getOriginRect(startIndex);
    if (!panel || !origin || reducedMotion()) return;
    gsap.fromTo(
      panel,
      { left: origin.left, top: origin.top, width: origin.width, height: origin.height, borderRadius: 4 },
      { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight, borderRadius: 0, duration: 0.8, ease: "expo.inOut" },
    );
    // getOriginRect and startIndex are fixed for the life of this viewer
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Lock page scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const close = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    const panel = panelRef.current;
    const origin = getOriginRect(index);
    const done = () => onClosed(index);
    if (!panel || !origin || reducedMotion()) {
      done();
      return;
    }
    gsap.to(panel, {
      left: origin.left,
      top: origin.top,
      width: origin.width,
      height: origin.height,
      borderRadius: 4,
      duration: 0.7,
      ease: "expo.inOut",
      onComplete: done,
    });
    // reducedMotion is a plain read of the media query; no need to track it
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, getOriginRect, onClosed]);

  // Move through frames; past the ends, move to the neighbouring story
  const go = useCallback(
    (delta: 1 | -1) => {
      const next = frame + delta;
      if (next >= 0 && next < story.frames.length) {
        setFrame(next);
      } else if (delta > 0 && index < stories.length - 1) {
        setIndex(index + 1);
        setFrame(0);
      } else if (delta < 0 && index > 0) {
        setIndex(index - 1);
        setFrame(0);
      }
    },
    [frame, index, story.frames.length, stories.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, go]);

  const current = story.frames[frame];

  return (
    <div className="rx-viewer" role="dialog" aria-modal="true" aria-label={story.title}>
      <div className="rx-viewer__panel" ref={panelRef} tabIndex={-1}>
        <img className="rx-viewer__image" src={current.src} alt={current.alt} />

        <div className="rx-viewer__bar">
          <span>
            {pad(index + 1)} / {pad(stories.length)}
          </span>
          <button type="button" className="rx-viewer__close" onClick={close}>
            Close
          </button>
        </div>

        <div className="rx-viewer__segments" aria-hidden="true">
          {story.frames.map((f, i) => (
            <i key={f.id} data-on={i <= frame} />
          ))}
        </div>

        <div className="rx-viewer__meta">
          <span>{story.title}</span>
          <span>
            {pad(frame + 1)} / {pad(story.frames.length)}
          </span>
        </div>

        <button
          type="button"
          className="rx-viewer__nav rx-viewer__nav--prev"
          onClick={() => go(-1)}
          aria-label="Previous frame"
        />
        <button
          type="button"
          className="rx-viewer__nav rx-viewer__nav--next"
          onClick={() => go(1)}
          aria-label="Next frame"
        />
      </div>
    </div>
  );
}
