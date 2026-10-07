"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1] as const;

/* Fade + short upward move when the element enters the viewport. */
export function Reveal({
  delay = 0,
  className,
  children,
  ...rest
}: HTMLMotionProps<"div"> & { delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* Media reveal: the frame opens from the bottom edge, the picture settles from a slight scale. */
export function MediaReveal({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 1.1, ease: EASE }}
    >
      <motion.div
        className="h-full w-full"
        initial={reduce ? false : { scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-5% 0px" }}
        transition={{ duration: 1.6, ease: EASE }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
