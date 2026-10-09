"use client";

import { useEffect, useState } from "react";

/**
 * Thin progress bar fixed to the very top of the viewport. Eases toward 85%
 * while the page is loading, then snaps to 100% and fades out once the
 * window "load" event fires (or immediately if the document is already
 * complete, e.g. on client-side route changes).
 */
export default function PageLoadingBar() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
      return;
    }

    let raf = 0;
    let done = false;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const next = 85 * (1 - Math.exp(-elapsed / 500));
      setProgress(next);
      if (next < 84.5) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const finish = () => {
      if (done) return;
      done = true;
      cancelAnimationFrame(raf);
      setProgress(100);
      window.setTimeout(() => setVisible(false), 400);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish);
    }

    // Safety net: some assets (e.g. the hero video) can keep the window
    // "load" event from ever firing, which would otherwise strand the bar
    // at 85% forever. Always complete within a couple seconds regardless.
    const fallback = window.setTimeout(finish, 2200);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(fallback);
      window.removeEventListener("load", finish);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[100000] h-[3px] pointer-events-none"
    >
      <div
        className="h-full bg-accent"
        style={{
          width: `${progress}%`,
          opacity: progress >= 100 ? 0 : 1,
          boxShadow: "0 0 8px rgba(234, 119, 0, 0.6)",
          transition: progress >= 100 ? "opacity 400ms ease" : "width 200ms ease-out",
        }}
      />
    </div>
  );
}
