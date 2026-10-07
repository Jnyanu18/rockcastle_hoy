import { about } from "@/data/home";
import { MediaReveal, Reveal } from "../motion";
import Placeholder from "../Placeholder";

/* Editorial, asymmetric: a tall image left, a large statement set right, a smaller image dropped below. */
export default function AboutSection() {
  const [tall, small] = about.images;

  return (
    <section id="about" aria-labelledby="about-heading" className="bg-acid px-5 py-24 md:px-12 md:py-40">
      <div className="mx-auto grid max-w-[1680px] grid-cols-1 gap-12 md:grid-cols-12 md:gap-x-10">
        <div className="flex items-baseline gap-4 text-[12px] md:col-span-12">
          <span>{about.index}</span>
          <span className="text-ink/70">{about.label}</span>
        </div>

        {/* Tall image, left */}
        <MediaReveal className="md:col-span-4 md:row-span-2 md:mt-10">
          <Placeholder label={tall.alt} ratio={tall.ratio} className="rounded-media" />
        </MediaReveal>

        {/* Statement, right and offset */}
        <div className="md:col-span-7 md:col-start-6">
          <h2 id="about-heading" className="text-[clamp(2.4rem,5.6vw,6rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
            {about.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>

          <Reveal className="mt-10 max-w-[34rem] text-[clamp(1rem,1.3vw,1.2rem)] leading-[1.55]">
            <p>{about.body}</p>
          </Reveal>

          <Reveal className="mt-10">
            <a
              href={about.cta.href}
              className="group inline-flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.1em]"
            >
              {about.cta.label}
              <span aria-hidden className="transition-transform duration-500 ease-cinematic group-hover:translate-x-1">→</span>
            </a>
          </Reveal>
        </div>

        {/* Smaller image, dropped below and to the right for scale contrast */}
        <MediaReveal className="md:col-span-3 md:col-start-10 md:mt-28">
          <Placeholder label={small.alt} ratio={small.ratio} className="rounded-media" />
        </MediaReveal>
      </div>
    </section>
  );
}
