"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Global Smooth Scrolling Engine powered by Lenis + GSAP.
 * Dampens forceful mousewheel flicks to prevent sudden jumps down the page,
 * synchronizes all ScrollTrigger animations frame-by-frame, and manages route transitions.
 */
export default function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check if user prefers reduced motion for accessibility
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    // Initialize Lenis with optimized momentum damping
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.85, // Dampens aggressive wheel acceleration
      touchMultiplier: 1.5,
      infinite: false,
      autoRaf: false, // Driven synchronously by gsap.ticker below
      virtualScroll: (data) => {
        // Cap excessive mousewheel momentum spikes so forceful scrolls glide gracefully
        // instead of throwing the user 80% down the page
        const maxDelta = 110;
        if (Math.abs(data.deltaY) > maxDelta) {
          data.deltaY = Math.sign(data.deltaY) * maxDelta;
        }
        return true;
      },
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    // Connect Lenis scroll events to GSAP ScrollTrigger
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // Synchronize Lenis execution with GSAP's central RAF ticker
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Initial ScrollTrigger refresh after DOM layout settles
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);

    return () => {
      clearTimeout(refreshTimer);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
      delete window.__lenis;
    };
  }, []);

  // Handle route changes smoothly
  useEffect(() => {
    if (!lenisRef.current) return;

    const hash = window.location.hash;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        setTimeout(() => {
          lenisRef.current?.scrollTo(target as HTMLElement, {
            offset: -20,
            duration: 1.2,
          });
        }, 150);
        return;
      }
    }

    lenisRef.current.scrollTo(0, { immediate: true });
    ScrollTrigger.refresh();
  }, [pathname]);

  return null;
}
