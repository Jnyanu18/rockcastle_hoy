import Media from "@/components/Media";
import { works } from "@/lib/content";

/* Three equal project cards in one row, each with a tag row over the image
   and a metadata line beneath. The image crops are fixed-ratio. */
export default function Works() {
  return (
    <section id="works" className="bg-canvas px-4 pb-24 md:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex justify-between text-xs">
          <p>{works.label}</p>
          <p className="tabular-nums">[ {works.index} ]</p>
        </div>

        <div className="mt-8 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <p className="max-w-xl text-2xl leading-snug md:text-[28px]">{works.body}</p>
          <a
            href="#works"
            className="inline-flex h-11 shrink-0 items-center rounded-full bg-ink px-6 text-xs font-medium uppercase tracking-wide text-canvas"
          >
            {works.cta} +
          </a>
        </div>

        <ul className="mt-16 grid gap-6 md:grid-cols-3">
          {works.projects.map((p) => (
            <li key={p.title} className="group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl" data-cursor="view">
                <Media
                  src={p.image}
                  alt={p.alt}
                  className="h-full w-full transition-transform duration-700 ease-cinematic group-hover:scale-[1.03] motion-reduce:transform-none"
                />
                <div className="absolute left-4 top-4 flex gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full bg-canvas px-3 py-1 text-[11px] text-ink">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-full bg-ink/80 px-5 py-2.5 text-[11px] uppercase tracking-wide text-canvas opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100">
                  <span>+</span>
                  <span>Take a look</span>
                  <span>+</span>
                </div>
              </div>
              <h3 className="mt-5 text-2xl leading-tight">{p.title}</h3>
              <div className="mt-4 flex flex-col gap-1 border-b border-ink/40 pb-3 text-xs text-muted sm:flex-row sm:justify-between">
                <span>Views {p.views}</span>
                <span>Delivery time {p.delivery}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
