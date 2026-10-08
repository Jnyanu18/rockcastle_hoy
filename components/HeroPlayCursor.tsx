"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * PlayCursorBadge
 * Renders the House of Yellow signature pale-yellow squircle badge.
 * The text "Play" (vertical) and "Video" (horizontal) are aligned in a "+" shape,
 * continuously gliding towards the centre, passing through, and appearing from the other side.
 */
export function PlayCursorBadge({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative flex h-[88px] w-[88px] items-center justify-center rounded-[26px] bg-[#f0f3a6] text-[#0b0b0b] shadow-[0_10px_32px_rgba(0,0,0,0.38),inset_0_1px_1px_rgba(255,255,255,0.6)] border border-black/10 select-none overflow-hidden ${className}`}
    >
      {/* Vertical Track: "Play" streaming downwards towards center & appearing on bottom arm */}
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 w-7 h-full overflow-hidden flex justify-center pointer-events-none select-none z-[2]"
        aria-hidden="true"
      >
        <div className="flex flex-col h-max will-change-transform anim-play-v">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-[44px] w-7 flex items-center justify-center shrink-0"
            >
              <span className="inline-block transform -rotate-90 text-[11.5px] font-semibold text-[#0b0b0b] tracking-[0.03em] font-sans select-none whitespace-nowrap">
                Play
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal Track: "Video" streaming leftwards towards center & appearing on left arm */}
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-7 overflow-hidden flex items-center pointer-events-none select-none z-[1]"
        aria-hidden="true"
      >
        <div className="flex w-max will-change-transform anim-video-h">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-[44px] h-7 flex items-center justify-center shrink-0"
            >
              <span className="inline-block text-[11.5px] font-semibold text-[#0b0b0b] tracking-[0.03em] font-sans select-none whitespace-nowrap">
                Video
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Center Intersection Cross Anchor: Delicate "+" symbol in the middle */}
      <span
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] font-bold text-[#0b0b0b]/30 pointer-events-none select-none z-[3]"
        aria-hidden="true"
      >
        +
      </span>
    </div>
  );
}

interface HeroPlayCursorProps {
  /** Target container element where this cursor follower is active */
  containerRef: React.RefObject<HTMLElement | null>;
  /** Callback fired when user clicks */
  onOpen: () => void;
}

export default function HeroPlayCursor({ containerRef, onOpen }: HeroPlayCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    // Disable on touch devices or reduced motion
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || prefersReducedMotion || !cursorRef.current) return;

    const cursor = cursorRef.current;
    const container = containerRef.current;
    if (!container) return;

    // Initial state: hidden, centered
    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      scale: 0,
      opacity: 0,
      pointerEvents: "none",
    });

    // Smooth physics lerping for fluid cursor following
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);

      const target = e.target as Node | null;
      const isInside = container.contains(target);

      if (isInside) {
        if (!isVisibleRef.current) {
          isVisibleRef.current = true;
          gsap.to(cursor, {
            scale: 1,
            opacity: 1,
            duration: 0.35,
            ease: "back.out(1.8)",
            overwrite: "auto",
          });
        }
      } else if (isVisibleRef.current) {
        isVisibleRef.current = false;
        gsap.to(cursor, {
          scale: 0,
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
          overwrite: "auto",
        });
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (isVisibleRef.current && container.contains(e.target as Node | null)) {
        gsap.to(cursor, {
          scale: 0.88,
          duration: 0.15,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (isVisibleRef.current && container.contains(e.target as Node | null)) {
        gsap.to(cursor, {
          scale: 1,
          duration: 0.3,
          ease: "back.out(2)",
          overwrite: "auto",
        });
      }
    };

    const handleMouseLeave = () => {
      if (isVisibleRef.current) {
        isVisibleRef.current = false;
        gsap.to(cursor, {
          scale: 0,
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
          overwrite: "auto",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [containerRef]);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[99999] hidden select-none md:block"
      style={{ willChange: "transform, opacity" }}
    >
      <PlayCursorBadge />
    </div>
  );
}
