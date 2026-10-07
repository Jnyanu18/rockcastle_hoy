import { featuredCategories } from "@/data/projects";
import { featuredWork } from "@/data/home";
import { MediaReveal, Reveal } from "../motion";
import Placeholder from "../Placeholder";

/* Six categories, each a large visual that is itself the link. Asymmetric placement, no card grid. */
const PLACEMENT = [
  "md:col-span-5",
  "md:col-span-4 md:col-start-7 md:mt-24",
  "md:col-span-3 md:mt-10",
  "md:col-span-4 md:col-start-2 md:mt-16",
  "md:col-span-5 md:col-start-7 md:mt-8",
  "md:col-span-3 md:col-start-2 md:mt-20",
];

export default function FeaturedWork() {
  return (
    <section id="work" aria-labelledby="featured-heading" className="bg-acid px-5 pb-28 md:px-12 md:pb-40">
      <div className="mx-auto max-w-[1680px]">
        <div className="mb-14 flex items-baseline justify-between text-[12px] md:mb-20">
          <span>{featuredWork.index}</span>
          <h2 id="featured-heading" className="font-medium uppercase tracking-[0.08em]">
            {featuredWork.label}
          </h2>
          <span className="text-ink/70">{String(featuredCategories.length).padStart(2, "0")} categories</span>
        </div>

        <ul className="grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-12 md:gap-y-24">
          {featuredCategories.map((cat, i) => (
            <li key={cat.slug} className={`group ${PLACEMENT[i % PLACEMENT.length]}`}>
              <MediaReveal>
                <a href="#work" data-category={cat.slug} className="block">
                  <div className="overflow-hidden rounded-media transition-transform duration-700 ease-cinematic group-hover:scale-[0.985]">
                    <div className="transition-transform duration-[1200ms] ease-cinematic group-hover:scale-105">
                      <Placeholder label={cat.media.alt} ratio={cat.media.ratio} className="rounded-none" />
                    </div>
                  </div>
                  <div className="mt-5 flex items-baseline justify-between gap-6">
                    <span className="text-[clamp(1.4rem,2.4vw,2.4rem)] font-semibold leading-none tracking-[-0.03em]">
                      {cat.title}
                    </span>
                    <span
                      aria-hidden
                      className="text-xl transition-transform duration-500 ease-cinematic group-hover:translate-x-2"
                    >
                      →
                    </span>
                  </div>
                </a>
              </MediaReveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-20 flex justify-end">
          <a
            href={featuredWork.cta.href}
            className="group inline-flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.1em]"
          >
            {featuredWork.cta.label}
            <span aria-hidden className="transition-transform duration-500 ease-cinematic group-hover:translate-x-1">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
