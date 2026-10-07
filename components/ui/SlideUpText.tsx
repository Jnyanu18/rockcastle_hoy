"use client";

import { motion } from "framer-motion";

type Props = {
  children: string;
  /** Unit each span animates as. Characters for short tags, words for copy. */
  split?: "characters" | "words";
  /** Gate the reveal behind scroll visibility; false renders plain text. */
  inView?: boolean;
  /** Replay every time it scrolls into view, or only the first time. */
  once?: boolean;
  /** Seconds between each unit's start. */
  stagger?: number;
  /** Seconds before the first unit starts. */
  delay?: number;
  className?: string;
};

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/**
 * Masks each word (or character) behind `overflow: hidden` and slides it up
 * into place on scroll-into-view, staggered unit by unit. Characters are
 * grouped by word so a word never breaks mid-reveal across a line wrap.
 */
export default function SlideUpText({
  children,
  split = "words",
  inView = true,
  once = true,
  stagger = 0.02,
  delay = 0,
  className = "",
}: Props) {
  if (!inView) return <span className={className}>{children}</span>;

  const words = children.split(" ");
  let unitIndex = 0;

  const unit = (content: string, i: number, extraClass = "") => {
    const index = unitIndex++;
    return (
      <span key={i} className={`slide-up-text__mask ${extraClass}`} aria-hidden="true">
        <motion.span
          className="slide-up-text__unit"
          initial={{ y: "110%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
          viewport={{ once, amount: 0.6 }}
          transition={{ duration: 0.65, delay: delay + index * stagger, ease: EASE_OUT_EXPO }}
        >
          {content}
        </motion.span>
      </span>
    );
  };

  return (
    <span className={`slide-up-text ${className}`}>
      <span className="sr-only">{children}</span>
      {split === "characters"
        ? words.map((word, wi) => (
            <span className="slide-up-text__word" key={wi} aria-hidden="true">
              {word.split("").map((char, ci) => unit(char, wi * 1000 + ci))}
              {wi < words.length - 1 && unit(" ", wi * 1000 + 999)}
            </span>
          ))
        : words.map((word, wi) => (
            <span className="slide-up-text__word" key={wi} aria-hidden="true">
              {unit(word, wi)}
              {wi < words.length - 1 && " "}
            </span>
          ))}
    </span>
  );
}
