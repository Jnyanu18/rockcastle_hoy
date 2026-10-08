"use client";

import { stats } from "@/data/content";
import { useCountUp, useInView } from "@/lib/hooks";
import Reveal from "@/components/ui/Reveal";

/** Dark section: phone frame, count-up figures and a short note on mobile. */
export default function Stats() {
  return (
    <section className="bg-[#1d1d1b] px-[var(--gutter)] pb-[var(--section-y)] pt-[var(--section-y)] text-pale" style={{ backgroundColor: "#1d1d1b" }}>
      <div className="grid grid-cols-1 gap-y-10 md:grid-cols-12 md:gap-x-6">
        <p className="text-[0.8125rem] md:col-span-2">{stats.index}</p>

        <Reveal className="md:col-span-4 md:col-start-3">
          <p className="text-[0.8125rem] font-medium">{stats.label}</p>
          <p className="mt-4 text-[clamp(18px,1.7vw,27px)] leading-[1.15]">{stats.body}</p>
        </Reveal>

        <div className="md:col-span-3 md:col-start-10">
          <div className="flex items-start gap-3">
            <span aria-hidden className="mt-1.5 inline-block h-3 w-3 bg-pale" />
            <div>
              <p className="text-[0.9375rem] font-medium">{stats.aside.title}</p>
              <p className="mt-2 max-w-[17rem] text-[0.8125rem] leading-[1.45]">{stats.aside.body}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[clamp(56px,6vw,96px)] grid grid-cols-1 gap-y-14 md:grid-cols-12 md:gap-x-6">
        <Reveal variant="clip" className="md:col-span-4 md:col-start-3">
          <PhoneFrame />
        </Reveal>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-14 md:col-span-4 md:col-start-8 md:block md:space-y-14">
          {stats.figures.map((figure) => (
            <Figure key={figure.label} label={figure.label} value={figure.value} prefix={figure.prefix} />
          ))}
        </dl>
      </div>
    </section>
  );
}

function Figure({ label, value, prefix }: { label: string; value: number; prefix: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.5);
  const current = useCountUp(value, inView);

  return (
    <div ref={ref}>
      <dt className="text-[0.875rem] font-medium">{label}</dt>
      <dd className="mt-3 text-[length:var(--display-size)] font-medium leading-none tabular-nums">
        {prefix}
        {current.toLocaleString("en-US")}
      </dd>
    </div>
  );
}

/** Outlined rounded phone with a placeholder screen and small reaction icons. */
function PhoneFrame() {
  return (
    <div className="relative mx-auto aspect-[493/800] w-full max-w-[493px] rounded-[clamp(40px,4.2vw,64px)] border border-pale/80 p-[clamp(12px,1.2vw,18px)]">
      <div
        className="relative h-full w-full overflow-hidden rounded-[clamp(28px,3vw,46px)]"
        style={{ background: stats.phone.tone }}
        role="img"
        aria-label={stats.phone.alt}
      >
        <div className="absolute left-1/2 top-4 h-6 w-[34%] -translate-x-1/2 rounded-full bg-night" />
        <ReactionIcon className="absolute left-[12%] top-[36%]" />
        <ReactionIcon className="absolute left-[62%] top-[46%]" filled />
        <ReactionIcon className="absolute left-[30%] top-[62%]" />
        <ReactionIcon className="absolute left-[70%] top-[78%]" filled />
      </div>
    </div>
  );
}

function ReactionIcon({ className = "", filled = false }: { className?: string; filled?: boolean }) {
  return (
    <span
      aria-hidden
      className={`flex h-11 w-11 items-center justify-center rounded-full ${filled ? "bg-pale text-night" : "bg-night/80 text-pale"} ${className}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 21s-7-4.4-9.5-9A5.5 5.5 0 0112 6a5.5 5.5 0 019.5 6c-2.5 4.6-9.5 9-9.5 9z" />
      </svg>
    </span>
  );
}
