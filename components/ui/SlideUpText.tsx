"use client";

import { motion } from "framer-motion";
import { useInView } from "@/lib/hooks";

type Props = {
  children: string;
  /** Unit each span animates as. Characters for short tags, words for copy. */
  split?: "characters" | "words";
  /** Gate the reveal behind scroll visibility; false renders plain text. */
  inView?: boolean;
  /** Unused: reveals always replay on every scroll into view. Kept for call-site compatibility. */
  once?: boolean;
  /** Seconds between each unit's start. */
  stagger?: number;
  /** Seconds before the first unit starts. */
  delay?: number;
  className?: string;
  threshold?: number;
};

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const REVEALED = { y: "0%", opacity: 1 };
const HIDDEN = { y: "110%", opacity: 0 };

/**
 * Masks each word (or character) behind `overflow: hidden` and slides it up
 * into place on scroll-into-view, staggered unit by unit. Characters are
 * grouped by word so a word never breaks mid-reveal across a line wrap.
 *
 * Visibility is driven by a single IntersectionObserver on the outer wrapper
 * (lib/hooks' useInView) rather than per-unit whileInView: with 50+ masked
 * spans in a paragraph, per-unit scroll observers were unreliable here.
 */
export default function SlideUpText({
  children,
  split = "words",
  inView: gate = true,
  stagger = 0.02,
  delay = 0,
  className = "",
  threshold = 0.15,
}: Props) {
  const { ref, inView } = useInView<HTMLSpanElement>(threshold);
  const revealed = gate && inView;

  if (!gate) return <span className={className}>{children}</span>;

  const words = children.trim().split(/\s+/).filter(Boolean);
  let unitIndex = 0;

  const unit = (content: string, i: number) => {
    const index = unitIndex++;
    return (
      <span key={i} className="slide-up-text__mask" aria-hidden="true">
        <motion.span
          className="slide-up-text__unit"
          initial={HIDDEN}
          animate={revealed ? REVEALED : HIDDEN}
          transition={{ duration: 0.65, delay: delay + index * stagger, ease: EASE_OUT_EXPO }}
        >
          {content}
        </motion.span>
      </span>
    );
  };

  // The space between words is a plain sibling text node here, outside any
  // `white-space: nowrap` box. Nested inside one (as trailing content of a
  // word's own span) it gets silently trimmed, since CSS collapses
  // whitespace at the end of a nowrap line.
  return (
    <span className={`slide-up-text ${className}`} ref={ref}>
      <span className="sr-only">{children}</span>
      {words.flatMap((word, wi) => {
        const wordNode = (
          <span className="slide-up-text__word" key={`w-${wi}`} aria-hidden="true">
            {split === "characters" ? word.split("").map((char, ci) => unit(char, wi * 1000 + ci)) : unit(word, wi)}
          </span>
        );
        return wi < words.length - 1 ? [wordNode, " "] : [wordNode];
      })}
    </span>
  );
}
