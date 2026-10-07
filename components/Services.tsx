"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { services } from "@/lib/siteContent";
import Placeholder from "./Placeholder";

/* Three stacked service statements. Each heading drifts sideways as it crosses the viewport. */
export default function Services() {
  return (
    <section id="services" aria-label="Services" className="bg-ink text-acid">
      {services.map((s) => (
        <ServiceBlock key={s.title} service={s} />
      ))}
    </section>
  );
}

type Service = (typeof services)[number];

function ServiceBlock({ service }: { service: Service }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Slow, small displacement: the heading moves through the viewport rather than fading
  const x = useTransform(scrollYProgress, [0, 1], ["12vw", "-12vw"]);

  return (
    <div
      ref={ref}
      className="relative flex min-h-[90svh] flex-col justify-center overflow-hidden px-5 py-24 md:px-12 md:py-40"
    >
      <span className="absolute left-5 top-10 text-[12px] md:left-12">{service.index}</span>

      <motion.h2
        style={reduce ? undefined : { x }}
        className="text-center text-[clamp(2.2rem,5.2vw,5.6rem)] font-medium leading-[0.98] tracking-[-0.035em]"
      >
        {service.title}
      </motion.h2>

      <p className="mx-auto mt-8 max-w-[26rem] text-center text-[13px] leading-[1.6] text-acid/85">
        {service.body}
      </p>

      <ul className="mx-auto mt-14 grid w-full max-w-[1000px] grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {service.images.map((label) => (
          <li key={label}>
            <Placeholder label={label} ratio="3 / 4" />
          </li>
        ))}
      </ul>
    </div>
  );
}
