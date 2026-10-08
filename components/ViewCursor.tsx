"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface ViewCursorProps {
  /** Text shown inside the circle badge */
  text?: string;
  /** Custom CSS selector for elements that trigger the cursor badge */
  selector?: string;
}

const DEFAULT_SELECTOR = [
  '[data-cursor="view"]',
  '[data-cursor-view]',
  '[data-project-media]',
  ".rx-plate",
  ".rx-plate__media",
  ".imageWrapper",
  "#works article",
  ".project-card",
].join(", ");

/**
 * ViewCursor: An award-winning cursor follower badge.
 * Floats a smooth circular badge with "VIEW" that trails the cursor with a slight delay
 * when hovering over any project videos, project images, or elements with data-cursor="view".
 */
export default function ViewCursor({
  text = "VIEW",
  selector = DEFAULT_SELECTOR,
}: ViewCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    // Disable on touch devices or reduced motion
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || prefersReducedMotion || !cursorRef.current) return;

    const el = cursorRef.current;

    // Initial hidden state centered on origin
    gsap.set(el, {
      xPercent: -50,
      yPercent: -50,
      scale: 0,
      opacity: 0,
      pointerEvents: "none",
    });

    // Quick lerping / trailing physics with slight organic delay
    const xTo = gsap.quickTo(el, "x", { duration: 0.42, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.42, ease: "power3.out" });

    let lastX = -1;
    let lastY = -1;

    const handleMouseMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      xTo(lastX);
      yTo(lastY);

      const target = (e.target as Element | null)?.closest(selector);
      if (target) {
        if (!isVisibleRef.current) {
          isVisibleRef.current = true;
          gsap.to(el, {
            scale: 1,
            opacity: 1,
            duration: 0.35,
            ease: "back.out(1.8)",
            overwrite: "auto",
          });
        }
      } else if (isVisibleRef.current) {
        isVisibleRef.current = false;
        gsap.to(el, {
          scale: 0,
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
          overwrite: "auto",
        });
      }
    };

    let scrollCheckTimer: NodeJS.Timeout | null = null;
    const handleScroll = () => {
      if (lastX < 0 || lastY < 0) return;
      if (scrollCheckTimer) clearTimeout(scrollCheckTimer);
      scrollCheckTimer = setTimeout(() => {
        if (lastX < 0 || lastY < 0) return;
        const elUnderCursor = document.elementFromPoint(lastX, lastY);
        const target = elUnderCursor?.closest(selector);
        if (target) {
          if (!isVisibleRef.current) {
            isVisibleRef.current = true;
            gsap.to(el, {
              scale: 1,
              opacity: 1,
              duration: 0.35,
              ease: "back.out(1.8)",
              overwrite: "auto",
            });
          }
        } else if (isVisibleRef.current) {
          isVisibleRef.current = false;
          gsap.to(el, {
            scale: 0,
            opacity: 0,
            duration: 0.25,
            ease: "power2.in",
            overwrite: "auto",
          });
        }
      }, 100);
    };

    const handleMouseLeave = () => {
      lastX = -1;
      lastY = -1;
      if (isVisibleRef.current) {
        isVisibleRef.current = false;
        gsap.to(el, {
          scale: 0,
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
          overwrite: "auto",
        });
      }
    };

    const handleMouseDown = () => {
      if (isVisibleRef.current) {
        gsap.to(el, {
          scale: 0.86,
          duration: 0.15,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const handleMouseUp = () => {
      if (isVisibleRef.current) {
        gsap.to(el, {
          scale: 1,
          duration: 0.3,
          ease: "back.out(2)",
          overwrite: "auto",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      if (scrollCheckTimer) clearTimeout(scrollCheckTimer);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [selector]);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[99999] hidden select-none md:block"
      style={{ willChange: "transform, opacity" }}
    >
      <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#f2a65e] text-[#0f1829] shadow-[0_6px_20px_rgba(0,0,0,0.32)] border border-black/10 backdrop-blur-sm">
        <span className="text-[9.5px] font-bold tracking-[0.15em] uppercase select-none leading-none">
          {text}
        </span>
      </div>
    </div>
  );
}
