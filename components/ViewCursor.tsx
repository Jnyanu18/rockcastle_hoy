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
  ".imageWrapper",
  "#works article",
  ".project-card",
].join(", ");

/**
 * ViewCursor:
 * - Default state: A small orange squircle box (12px x 12px) that follows the cursor.
 * - On hover over images in ScrollingServices (or data-cursor="view"):
 *   The orange box seamlessly morphs/expands into the "VIEW" circle badge.
 * - On mouse leave: Morphs back into the small orange box.
 */
export default function ViewCursor({
  text = "VIEW",
  selector = DEFAULT_SELECTOR,
}: ViewCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const isExpandedRef = useRef(false);

  useEffect(() => {
    // Disable on touch devices or reduced motion
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || prefersReducedMotion || !cursorRef.current || !badgeRef.current || !textRef.current) return;

    const cursor = cursorRef.current;
    const badge = badgeRef.current;
    const label = textRef.current;

    // Initial state: centered on pointer, hidden until first mousemove
    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
      scale: 0.6,
      pointerEvents: "none",
    });

    // Default: small orange squircle box
    gsap.set(badge, {
      width: 12,
      height: 12,
      borderRadius: "3.5px",
      backgroundColor: "#ea7700",
      borderColor: "transparent",
      boxShadow: "0 2px 8px rgba(234, 119, 0, 0.45)",
    });

    gsap.set(label, {
      opacity: 0,
      scale: 0.4,
    });

    // Fluid physics lerping that stays right with the cursor
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.22, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.22, ease: "power3.out" });

    let isVisible = false;
    let lastX = -1;
    let lastY = -1;

    const expandToCircle = () => {
      if (isExpandedRef.current) return;
      isExpandedRef.current = true;

      gsap.to(badge, {
        width: 52,
        height: 52,
        borderRadius: "50%",
        backgroundColor: "#ea7700",
        borderColor: "rgba(0, 0, 0, 0.1)",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.35)",
        duration: 0.36,
        ease: "back.out(1.8)",
        overwrite: "auto",
      });

      gsap.to(label, {
        opacity: 1,
        scale: 1,
        duration: 0.24,
        delay: 0.06,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const collapseToBox = () => {
      if (!isExpandedRef.current) return;
      isExpandedRef.current = false;

      gsap.to(label, {
        opacity: 0,
        scale: 0.4,
        duration: 0.16,
        ease: "power2.in",
        overwrite: "auto",
      });

      gsap.to(badge, {
        width: 12,
        height: 12,
        borderRadius: "3.5px",
        backgroundColor: "#ea7700",
        borderColor: "transparent",
        boxShadow: "0 2px 8px rgba(234, 119, 0, 0.45)",
        duration: 0.3,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      xTo(lastX);
      yTo(lastY);

      if (!isVisible) {
        isVisible = true;
        gsap.to(cursor, {
          opacity: 1,
          scale: 1,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      const target = (e.target as Element | null)?.closest(selector);
      if (target) {
        expandToCircle();
      } else {
        collapseToBox();
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
          expandToCircle();
        } else {
          collapseToBox();
        }
      }, 50);
    };

    const handleMouseLeave = () => {
      lastX = -1;
      lastY = -1;
      isVisible = false;
      collapseToBox();
      gsap.to(cursor, {
        opacity: 0,
        scale: 0.5,
        duration: 0.2,
        ease: "power2.in",
        overwrite: "auto",
      });
    };

    const handleMouseEnter = () => {
      isVisible = true;
      gsap.to(cursor, {
        opacity: 1,
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handleMouseDown = () => {
      gsap.to(badge, {
        scale: 0.84,
        duration: 0.12,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handleMouseUp = () => {
      gsap.to(badge, {
        scale: 1,
        duration: 0.25,
        ease: "back.out(2)",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      if (scrollCheckTimer) clearTimeout(scrollCheckTimer);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
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
      <div
        ref={badgeRef}
        className="flex items-center justify-center overflow-hidden border backdrop-blur-sm"
        style={{
          width: 12,
          height: 12,
          borderRadius: "3.5px",
          backgroundColor: "#ea7700",
          boxShadow: "0 2px 8px rgba(234, 119, 0, 0.45)",
          willChange: "width, height, border-radius, background-color, transform",
        }}
      >
        <span
          ref={textRef}
          className="text-[9.5px] font-bold tracking-[0.15em] uppercase select-none leading-none text-[#0A192F]"
          style={{ willChange: "transform, opacity" }}
        >
          {text}
        </span>
      </div>
    </div>
  );
}
