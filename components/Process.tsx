import { process } from "@/lib/content";

/* Dark process block: label, large statement at a fixed column, a small
   supporting paragraph in yellow, and a floating pill that anchors to Services. */
export default function Process() {
  return (
    <section id="process" className="relative bg-ink px-4 pb-24 text-canvas md:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex justify-between text-xs">
          <p>{process.label}</p>
          <p className="tabular-nums">[ {process.index} ]</p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-[27%_1fr]">
          <div aria-hidden className="hidden md:block" />
          <div>
            <p className="max-w-3xl text-2xl leading-snug md:text-[30px]">{process.body}</p>
            <p className="mt-8 max-w-md text-sm font-medium leading-relaxed">{process.sub}</p>
          </div>
        </div>
      </div>

      <a
        href="#services"
        className="fixed bottom-6 right-20 z-40 inline-flex h-11 items-center rounded-full bg-canvas px-5 text-xs font-medium uppercase tracking-wide text-ink md:right-24"
      >
        {process.cta}
      </a>
    </section>
  );
}
