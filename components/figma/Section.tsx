"use client";

import type { ElementType, ReactNode } from "react";
import { useInView } from "@/lib/hooks";

/** Section wrapper: adds `is-in` once visible so line drawings animate. */
export default function Section({
  as: Tag = "section",
  className = "",
  id,
  threshold = 0.15,
  children,
}: {
  as?: ElementType;
  className?: string;
  id?: string;
  threshold?: number;
  children: ReactNode;
}) {
  const { ref, inView } = useInView<HTMLElement>(threshold);
  return (
    <Tag ref={ref} id={id} className={`${className} ${inView ? "is-in" : ""}`}>
      {children}
    </Tag>
  );
}
