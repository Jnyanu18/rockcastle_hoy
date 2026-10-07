import { team } from "@/data/home";
import { MediaReveal, Reveal } from "../motion";
import Placeholder from "../Placeholder";

/* Editorial composition: staggered photographs and captions, no headshot grid. */
export default function Team() {
  const [a, b, c, d] = team.photos;

  return (
    <section id="team" aria-labelledby="team-heading" className="bg-ink px-5 py-24 text-acid md:px-12 md:py-40">
      <div className="mx-auto max-w-[1680px]">
        <div className="mb-14 flex items-baseline justify-between text-[12px] md:mb-20">
          <span>{team.index}</span>
          <span className="opacity-70">Team</span>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-12 md:gap-x-6">
          <h2
            id="team-heading"
            className="col-span-2 mb-6 text-[clamp(2.4rem,6vw,6.6rem)] font-semibold leading-[0.92] tracking-[-0.045em] md:col-span-12 md:mb-10"
          >
            {team.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>

          {/* Portrait, large, left */}
          <MediaReveal className="col-span-2 md:col-span-5">
            <Placeholder label={a.alt} ratio={a.ratio} className="rounded-media" />
          </MediaReveal>

          {/* Candid on-ground, offset and wide */}
          <MediaReveal className="col-span-2 md:col-span-6 md:col-start-7 md:mt-32">
            <Placeholder label={b.alt} ratio={b.ratio} className="rounded-media" />
          </MediaReveal>

          {/* Two smaller candids, staggered */}
          <MediaReveal className="md:col-span-3 md:col-start-2">
            <Placeholder label={c.alt} ratio={c.ratio} className="rounded-media" />
          </MediaReveal>
          <MediaReveal className="md:col-span-3 md:col-start-8 md:mt-20">
            <Placeholder label={d.alt} ratio={d.ratio} className="rounded-media" />
          </MediaReveal>
        </div>

        <Reveal className="mt-16 flex justify-end md:mt-24">
          <a href={team.cta.href} className="group inline-flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.1em]">
            {team.cta.label}
            <span aria-hidden className="transition-transform duration-500 ease-cinematic group-hover:translate-x-1">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
