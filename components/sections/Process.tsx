import { process } from "@/data/content";
import Reveal from "@/components/ui/Reveal";

/** Dark process statement: label, long statement, bold summary. */
export default function Process() {
  return (
    <section id="process" className="bg-[#1d1d1b] px-[var(--gutter)] pb-[var(--section-y)] text-pale" style={{ backgroundColor: "#1d1d1b" }}>
      <div className="grid grid-cols-1 gap-y-8 md:grid-cols-[26%_1fr]">
        <Reveal>
          <p className="text-[0.8125rem]">{process.label}</p>
        </Reveal>
        <div className="relative">
          <Reveal delay={80}>
            <p className="max-w-[40rem] text-[clamp(20px,1.75vw,30px)] leading-[1.15]">
              {process.statement}
            </p>
            <p className="mt-10 max-w-[24rem] text-[clamp(14px,1.15vw,18px)] font-semibold leading-[1.3]">
              {process.sub}
            </p>
          </Reveal>
          <p className="absolute right-0 top-0 text-[0.8125rem]">{process.index}</p>
        </div>
      </div>
    </section>
  );
}
