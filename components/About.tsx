import { about } from "@/lib/siteContent";
import { Reveal } from "./motion";
import Placeholder from "./Placeholder";

/* Dark editorial section: asymmetric columns, large left-aligned statement. */
export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-ink px-5 py-24 text-acid md:px-12 md:py-36"
    >
      <div className="mx-auto max-w-[1680px]">
        {/* Metadata row */}
        <div className="mb-16 grid grid-cols-[auto_1fr_auto] items-start gap-6 text-[12px] md:mb-24 md:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)_minmax(0,1fr)]">
          <span className="hidden md:block">{about.index}</span>
          <h2 id="about-heading" className="font-medium md:col-start-2">
            {about.marker}
          </h2>
          <div className="text-right md:col-start-3">
            <p className="font-medium">{about.side.title}</p>
            <p className="mt-2 max-w-[16rem] text-[12px] leading-[1.5] md:ml-auto">{about.side.body}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)_minmax(0,1fr)] md:gap-10">
          {/* Tall portrait / product frame, left */}
          <Reveal className="md:row-span-2">
            <Placeholder label="PLACEHOLDER portrait or product still" ratio="3 / 4" className="max-w-[360px] rounded-[40px]" />
          </Reveal>

          {/* Large statement, right of centre */}
          <Reveal className="md:col-start-2 md:row-start-1 md:self-start">
            <p className="text-[clamp(1.6rem,2.8vw,2.8rem)] font-medium leading-[1.12] tracking-[-0.02em]">
              {about.statement}
            </p>
          </Reveal>

          {/* Compact numeric facts */}
          <Reveal className="grid grid-cols-2 gap-10 md:col-start-2 md:row-start-2 md:max-w-[28rem] md:self-end">
            {about.stats.map((s) => (
              <div key={s.label}>
                <p className="text-[12px]">{s.label}</p>
                <p className="mt-1 text-[clamp(2.2rem,4vw,3.8rem)] font-medium leading-none">{s.value}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
