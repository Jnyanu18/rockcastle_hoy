"use client";

import type { ElementType, ReactNode } from "react";
import { useInView } from "@/lib/hooks";

type Props = {
  children: ReactNode;
  as?: ElementType;
  /** "rise" fades and lifts; "clip" wipes open, for media. */
  variant?: "rise" | "clip";
  delay?: number;
  className?: string;
};

/**
 * Plays a one-off entry animation the first time the block scrolls into view.
 * The observer watches an outer wrapper: a fully clipped element is not
 * reported as intersecting, so the animated inner box cannot be the target.
 * Motion is defined in globals.css and disabled under reduced motion.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  variant = "rise",
  delay = 0,
  className = "",
}: Props) {
  const { ref, inView } = useInView<HTMLElement>(0.15);
  const base = variant === "clip" ? "clip-reveal" : "reveal";

  return (
    <Tag ref={ref} className={className}>
      <div
        className={`${base} ${inView ? "is-in" : ""}`}
        style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      >
        {children}
      </div>
    </Tag>
  );
}
