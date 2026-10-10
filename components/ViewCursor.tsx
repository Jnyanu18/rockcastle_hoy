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
  ".imageWrapper img",
  ".servicesBlock .imageWrapper img",
].join(", ");

/**
 * Checks whether an element is inside a dark (blue/navy) or light (white) background.
 */
function checkIsDarkBackground(el: Element | null): boolean {
  if (!el) return true;

  // 1. Direct section container check for maximum performance
  // Footer and light sections have white/light backgrounds -> square is blue (#0A192F)
  const lightSection = el.closest(
    "#footer, .footer, footer, #stats, .stats, #process, .process, #leadership, .leadership, #clients, .clients"
  );
  if (lightSection) return false;

  const darkSection = el.closest(
    "#home, #about, #recent-experiences, .recent-experiences, #services, .servicesBlock, #contact, .contact"
  );
  if (darkSection) return true;

  // 2. Computed style background color check up the DOM tree
  let cur: Element | null = el;
  while (cur && cur !== document.documentElement && cur !== document.body) {
    const bg = window.getComputedStyle(cur).backgroundColor;
    if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)") {
      const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (match) {
        const r = parseInt(match[1], 10);
        const g = parseInt(match[2], 10);
        const b = parseInt(match[3], 10);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness < 150;
      }
    }
    cur = cur.parentElement;
  }

  return true; // Default site theme is dark navy (#0A192F)
}

/**
 * ViewCursor:
 * - On blue/dark bg: white square (#f4f6f9).
 * - On white/light bg: blue square (#0A192F).
 * - On hero section: white circle center (#f4f6f9).
 * - On media hover: smoothly expands into 80px white circle (#f4f6f9) with blue text (#0A192F).
 * - Real-time scroll awareness: automatically transitions even when scrolling without moving the mouse.
 */
export default function ViewCursor({
  text = "VIEW",
  selector = DEFAULT_SELECTOR,
}: ViewCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Disable on touch devices or reduced motion
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || prefersReducedMotion || !cursorRef.current || !badgeRef.current || !textRef.current) return;

    const cursor = cursorRef.current;
    const badge = badgeRef.current;
    const label = textRef.current;

    // Initial state: centered on pointer, hidden until first interaction
    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
      scale: 0.6,
      pointerEvents: "none",
    });

    // Default: white squircle box for dark ground
    gsap.set(badge, {
      width: 12,
      height: 12,
      borderRadius: "3.5px",
      backgroundColor: "#f4f6f9",
      borderColor: "transparent",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.45)",
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
    let prevScrollY = window.scrollY;

    type Mode = "hero" | "view" | "square-white" | "square-blue";
    let currentMode: Mode = "square-white";

    const setMode = (mode: Mode) => {
      if (currentMode === mode) return;
      currentMode = mode;

      if (mode === "hero") {
        // Hero section: smooth white circle center
        gsap.to(label, {
          opacity: 0,
          scale: 0.4,
          duration: 0.16,
          ease: "power2.in",
          overwrite: "auto",
        });
        gsap.to(badge, {
          width: 16,
          height: 16,
          borderRadius: "50%",
          backgroundColor: "#f4f6f9",
          borderColor: "transparent",
          boxShadow: "none",
          duration: 0.28,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else if (mode === "view") {
        // Image hover: expands to 80px white circle with bold blue text
        gsap.to(badge, {
          width: 80,
          height: 80,
          borderRadius: "50%",
          backgroundColor: "#f4f6f9",
          borderColor: "rgba(10, 25, 47, 0.12)",
          boxShadow: "0 12px 30px rgba(0, 0, 0, 0.32)",
          duration: 0.36,
          ease: "back.out(1.7)",
          overwrite: "auto",
        });
        gsap.to(label, {
          opacity: 1,
          scale: 1,
          duration: 0.24,
          delay: 0.05,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else if (mode === "square-blue") {
        // White background: blue square
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
          backgroundColor: "#0A192F",
          borderColor: "transparent",
          boxShadow: "0 2px 8px rgba(10, 25, 47, 0.3)",
          duration: 0.28,
          ease: "power3.out",
          overwrite: "auto",
        });
      } else {
        // Blue background: white square
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
          backgroundColor: "#f4f6f9",
          borderColor: "transparent",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.45)",
          duration: 0.28,
          ease: "power3.out",
          overwrite: "auto",
        });
      }
    };

    const updateForElement = (el: Element | null) => {
      if (!el) return;

      if (el.closest("#home")) {
        setMode("hero");
      } else if (el.closest(selector)) {
        setMode("view");
      } else {
        const isDark = checkIsDarkBackground(el);
        setMode(isDark ? "square-white" : "square-blue");
      }
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

      updateForElement(e.target as Element | null);
    };

    // Immediate check whenever scroll occurs without mouse moving
    const evaluateUnderCursor = () => {
      if (lastX < 0 || lastY < 0) return;
      const el = document.elementFromPoint(lastX, lastY);
      if (el) {
        updateForElement(el);
      }
    };

    // Ticker frame listener: guarantees transition on EVERY frame of smooth-scrolling or trackpad
    const tick = () => {
      const curScrollY = window.scrollY;
      if (curScrollY !== prevScrollY) {
        prevScrollY = curScrollY;
        evaluateUnderCursor();
      }
    };
    gsap.ticker.add(tick);

    const handleMouseLeave = () => {
      lastX = -1;
      lastY = -1;
      isVisible = false;
      setMode("square-white");
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
    window.addEventListener("scroll", evaluateUnderCursor, { passive: true });
    window.addEventListener("wheel", evaluateUnderCursor, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", evaluateUnderCursor);
      window.removeEventListener("wheel", evaluateUnderCursor);
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
          backgroundColor: "#f4f6f9",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.45)",
          willChange: "width, height, border-radius, background-color, transform",
        }}
      >
        <span
          ref={textRef}
          className="text-[11px] font-bold tracking-[0.2em] uppercase select-none leading-none text-[#0A192F]"
          style={{ willChange: "transform, opacity" }}
        >
          {text}
        </span>
      </div>
    </div>
  );
}
