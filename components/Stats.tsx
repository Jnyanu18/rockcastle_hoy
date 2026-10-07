import { stats } from "@/lib/siteContent";
import { MediaReveal, Reveal } from "./motion";
import Placeholder from "./Placeholder";

/* Proof section: large cropped image left, three numbers stacked right. */
export default function Stats() {
  return (
    <section aria-label="Results" className="bg-ink px-5 pb-24 text-acid md:px-12 md:pb-36">
      <div className="mx-auto grid max-w-[1680px] grid-cols-1 items-end gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-20">
        <div className="relative">
          <span className="mb-6 block text-[12px]">{stats.index}</span>
          <MediaReveal>
            <Placeholder label="PLACEHOLDER cropped still" ratio="4 / 5" className="max-w-[560px] rounded-[40px]" />
          </MediaReveal>
          {/* Small outlined plus marker, lower-right of the image */}
          <span
            aria-hidden
            className="absolute -bottom-4 right-8 grid h-10 w-10 place-items-center rounded-full border border-acid text-lg"
          >
            +
          </span>
        </div>

        <div className="md:pb-10">
          <ul className="space-y-10">
            {stats.items.map((item) => (
              <li key={item.label}>
                <Reveal className="flex items-baseline gap-6">
                  <span className="text-[clamp(3.5rem,8vw,8rem)] font-medium leading-[0.9] tracking-[-0.04em]">
                    {item.value}
                  </span>
                  <span className="text-[12px]">{item.label}</span>
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal className="mt-12 max-w-[20rem] text-[12px] leading-[1.6]">
            <p>{stats.body}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
