"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * PlayCursorBadge
 * Renders the House of Yellow signature pale-yellow squircle badge.
 * The text "Play" (vertical) and "Video" (horizontal) are aligned in a "+" shape,
 * continuously gliding towards the centre, passing through, and appearing from the other side.
 */
function InwardSpoke({
  angle,
  word,
  slotWidth,
  animClass,
}: {
  angle: number;
  word: string;
  slotWidth: number;
  animClass: string;
}) {
  return (
    <div
      className="absolute h-[18px] w-[50px] overflow-hidden pointer-events-none select-none z-[1]"
      style={{
        left: "50%",
        top: "calc(50% - 9px)",
        transformOrigin: "0px 9px",
        transform: `rotate(${angle}deg)`,
      }}
    >
      <div className={`flex items-center will-change-transform ${animClass}`}>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            style={{ width: `${slotWidth}px` }}
            className="shrink-0 flex items-center justify-center h-[18px]"
          >
            <span className="text-[11px] font-semibold text-[#ea7700] tracking-[0.03em] font-sans select-none whitespace-nowrap">
              {word}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * PlayCursorBadge
 * Renders the House of Yellow signature pale-yellow squircle badge.
 * The text "Play" (left & right) and "Video" (top & bottom) streams inwards along a "+" shape,
 * disappearing behind a small yellow circle hub at the centre, while the entire "+" assembly
 * rotates slowly clockwise.
 */
export function PlayCursorBadge({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative flex h-[88px] w-[88px] items-center justify-center rounded-[26px] bg-[#f4f6f9] text-[#0A192F] shadow-[0_10px_32px_rgba(0, 0, 0,0.38),inset_0_1px_1px_rgba(255, 255, 255,0.6)] border border-black/10 select-none overflow-hidden ${className}`}
    >
      {/* Slowly clockwise rotating "+" assembly */}
      <div
        className="absolute inset-0 flex items-center justify-center anim-plus-rotate pointer-events-none select-none"
        aria-hidden="true"
      >
        {/* Horizontal Line: "Play" streaming inwards from left and right towards center */}
        <InwardSpoke angle={0} word="Play" slotWidth={38} animClass="anim-spoke-play" />
        <InwardSpoke angle={180} word="Play" slotWidth={38} animClass="anim-spoke-play" />

        {/* Vertical Line: "Video" streaming inwards from top and bottom towards center */}
        <InwardSpoke angle={-90} word="Video" slotWidth={44} animClass="anim-spoke-video" />
        <InwardSpoke angle={90} word="Video" slotWidth={44} animClass="anim-spoke-video" />

        {/* Center Yellow Circle Hub: borderless, reduced size, text disappears behind it */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[16px] h-[16px] rounded-full bg-[#f4f6f9] z-10 pointer-events-none select-none"
          aria-hidden="true"
        />
      </div>
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

    let lastX = -1;
    let lastY = -1;
    let prevScrollY = window.scrollY;

    const showCursor = () => {
      if (isVisibleRef.current) return;
      isVisibleRef.current = true;
      gsap.to(cursor, {
        scale: 1,
        opacity: 1,
        duration: 0.35,
        ease: "back.out(1.8)",
        overwrite: "auto",
      });
    };

    const hideCursor = (immediate = false) => {
      if (!isVisibleRef.current) return;
      isVisibleRef.current = false;
      gsap.to(cursor, {
        scale: 0,
        opacity: 0,
        duration: immediate ? 0.15 : 0.25,
        ease: "power2.in",
        overwrite: "auto",
      });
    };

    const checkPosition = (x: number, y: number) => {
      if (x < 0 || y < 0) {
        hideCursor();
        return;
      }

      // Check if container is in viewport
      const rect = container.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) {
        hideCursor();
        return;
      }

      // Check if coordinates are within container's visible bounds
      if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
        hideCursor();
        return;
      }

      // Check top element at cursor point: ensure Hero isn't covered by curtain/overlay (e.g. WhoWeAre)
      const topEl = document.elementFromPoint(x, y);
      if (!topEl || (!container.contains(topEl) && topEl !== container)) {
        hideCursor();
        return;
      }

      showCursor();
    };

    const handleMouseMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      xTo(lastX);
      yTo(lastY);
      checkPosition(lastX, lastY);
    };

    const evaluateOnScroll = () => {
      if (lastX >= 0 && lastY >= 0) {
        checkPosition(lastX, lastY);
      }
    };

    const tick = () => {
      const curScrollY = window.scrollY;
      if (curScrollY !== prevScrollY) {
        prevScrollY = curScrollY;
        evaluateOnScroll();
      }
    };
    gsap.ticker.add(tick);

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
      lastX = -1;
      lastY = -1;
      hideCursor(true);
    };

    const handleBlur = () => {
      lastX = -1;
      lastY = -1;
      hideCursor(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", evaluateOnScroll, { passive: true });
    window.addEventListener("wheel", evaluateOnScroll, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("blur", handleBlur);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", evaluateOnScroll);
      window.removeEventListener("wheel", evaluateOnScroll);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("blur", handleBlur);
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
