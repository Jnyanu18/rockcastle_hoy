import { works, type Project } from "@/data/content";
import Pill from "@/components/ui/Pill";
import Reveal from "@/components/ui/Reveal";

/** Yellow work section: intro row, three project cards, client strip. */
export default function Works() {
  return (
    <section id="work" className="bg-pale px-[var(--gutter)] pb-[var(--section-y)] text-night">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <Reveal>
          <p className="text-[0.8125rem]">{works.label}</p>
          <p className="mt-6 max-w-[40rem] text-[clamp(18px,1.6vw,26px)] leading-[1.15]">
            {works.body}
          </p>
        </Reveal>
        <div className="flex items-center gap-6 md:justify-end">
          <span className="text-[0.8125rem]">{works.index}</span>
          <Pill href={works.cta.href} variant="solid" marquee className="w-fit">
            {works.cta.label}
          </Pill>
        </div>
      </div>

      <ul className="mt-[clamp(56px,6vw,96px)] grid grid-cols-1 gap-x-5 gap-y-14 md:grid-cols-3">
        {works.projects.map((project, i) => (
          <li key={project.title}>
            <ProjectCard project={project} index={i} />
          </li>
        ))}
      </ul>

      {/* Client strip: placeholder names until logos are supplied */}
      <ul className="mt-[clamp(56px,6vw,96px)] grid grid-cols-2 gap-y-8 text-center text-[0.8125rem] font-semibold uppercase tracking-[0.12em] sm:grid-cols-4 lg:grid-cols-7">
        {works.clients.map((client) => (
          <li
            key={client}
            className="flex h-20 items-center justify-center border-l border-night/25 px-4 [&:nth-child(2n+1)]:border-l-0 sm:[&:nth-child(2n+1)]:border-l sm:[&:nth-child(4n+1)]:border-l-0 lg:[&:nth-child(n)]:border-l lg:[&:nth-child(1)]:border-l-0"
          >
            {client}
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="group">
      <Reveal variant="clip" className="relative">
        <div
          className="relative aspect-[493/453] w-full overflow-hidden rounded-[4px]"
          style={{ background: project.media.tone }}
          role="img"
          aria-label={project.media.alt}
        >
          <div className="media-zoom absolute inset-0" />

          <ul className="absolute left-4 top-4 flex gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-pale px-3 py-1 text-[0.75rem] text-night"
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between bg-night/90 px-5 py-4 text-pale transition-transform duration-500 ease-cinematic group-hover:translate-y-0 group-focus-within:translate-y-0">
            <span aria-hidden className="text-lg">+</span>
            <span className="text-[0.75rem] font-semibold uppercase tracking-[0.12em]">Take a look</span>
            <span aria-hidden className="text-lg">+</span>
          </div>

          <span className="sr-only">Project {index + 1} of {works.projects.length}</span>
        </div>
      </Reveal>

      <h3 className="mt-5 text-[clamp(18px,1.7vw,28px)] leading-tight">{project.title}</h3>
      <p className="mt-1 text-[0.8125rem] opacity-70">{project.meta}</p>

      <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1 border-t border-night pt-3 text-[0.75rem]">
        {project.stats.map((s) => (
          <div key={s.label} className="flex gap-2">
            <dt className="opacity-60">{s.label}</dt>
            <dd>{s.value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
