import { statement } from "@/lib/content";

/* Light statement block: small label left, large body set in the right
   column, supporting line and two pills, and an outlined rounded frame.
   Rises over the sticky hero as the user scrolls. */
export default function Statement() {
  return (
    <section
      id="about"
      className="relative z-10 bg-canvas px-4 pb-24 pt-20 md:px-10 md:pt-28 min-h-[100svh] shadow-[0_-25px_60px_rgba(0,0,0,0.35)]"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="flex justify-between text-xs">
          <p className="w-1/4">{statement.label}</p>
          <p className="tabular-nums">[ {statement.index} ]</p>
        </div>

        <div className="mt-12 grid gap-12 md:grid-cols-[27%_1fr]">
          <div aria-hidden className="hidden md:block" />
          <div>
            <p className="text-3xl leading-[1.12] tracking-[-0.01em] md:text-[46px] md:leading-[1.1] lg:text-[52px]">
              {statement.body}
            </p>

            <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="max-w-xs text-lg leading-snug md:text-2xl">
                  {statement.sub}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {statement.ctas.map((cta) => (
                    <a
                      key={cta.label}
                      href={cta.href}
                      className={
                        cta.primary
                          ? "inline-flex h-11 items-center gap-3 rounded-full bg-ink px-6 text-xs font-medium uppercase tracking-wide text-canvas"
                          : "inline-flex h-11 items-center rounded-full border border-ink px-6 text-xs font-medium uppercase tracking-wide"
                      }
                    >
                      {cta.label}
                      {cta.primary && <span aria-hidden>+</span>}
                    </a>
                  ))}
                </div>
              </div>

              {/* Outlined rounded frame with the sparse cross mark */}
              <div
                aria-hidden
                className="relative h-72 w-full max-w-[368px] rounded-[42px] border border-ink md:h-[380px]"
              >
                <span className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 text-2xl leading-none">
                  +
                </span>
                <span className="absolute left-[38%] top-[38%] text-sm leading-none">
                  +
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
