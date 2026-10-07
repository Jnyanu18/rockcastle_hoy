import { works } from "@/lib/siteContent";
import { MediaReveal, Reveal } from "./motion";
import Placeholder from "./Placeholder";

/* Selected work: a quiet row of three equal cards and a client strip. */
export default function Work() {
  return (
    <section id="works" aria-labelledby="works-heading" className="bg-acid px-5 pb-24 md:px-12 md:pb-36">
      <div className="mx-auto max-w-[1680px]">
        {/* Metadata row */}
        <div className="mb-10 flex items-baseline justify-between text-[12px] md:mb-14">
          <span className="text-ink/70">{works.index}</span>
          <h2 id="works-heading" className="font-medium">{works.marker}</h2>
          <span className="text-ink/70">{`${works.projects.length} projects`}</span>
        </div>

        <Reveal className="mb-14 max-w-[40rem] text-[clamp(1.25rem,1.9vw,1.9rem)] leading-[1.2] tracking-[-0.01em] md:mb-20">
          <p>{works.intro}</p>
        </Reveal>

        <ul className="grid grid-cols-1 gap-x-5 gap-y-14 md:grid-cols-3">
          {works.projects.map((p) => (
            <li key={p.title} className="group">
              <MediaReveal className="relative">
                <div className="relative">
                  <Placeholder label={p.image.alt} ratio={p.image.ratio} />
                  {/* Category pills sit on the image's top edge */}
                  <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-pill bg-acid px-3 py-1 text-[11px] text-ink"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </MediaReveal>

              <div className="mt-5 flex items-baseline justify-between gap-6">
                <h3 className="text-[clamp(1.2rem,1.6vw,1.6rem)] font-medium">{p.title}</h3>
                <span className="shrink-0 text-[11px] uppercase tracking-[0.1em]">{p.client}</span>
              </div>
              <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-1 border-b border-ink pb-3 text-[11px]">
                {p.metrics.map((m) => (
                  <div key={m.label} className="flex gap-2">
                    <dt className="text-ink/60">{m.label}</dt>
                    <dd>{m.value}</dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>

        {/* Client strip: text placeholders until logos are supplied */}
        <ul
          aria-label="Clients"
          className="mt-20 flex flex-wrap items-center justify-between gap-x-8 gap-y-6 border-t border-ink/20 pt-10 md:mt-28"
        >
          {works.clients.map((c) => (
            <li key={c} className="text-[13px] font-semibold uppercase tracking-[0.08em] text-ink/80">
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
