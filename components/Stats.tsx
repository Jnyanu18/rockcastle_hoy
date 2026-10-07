import Media from "@/components/Media";
import { stats } from "@/lib/content";

/* Dark block: label and large yellow copy left, a phone-frame media card with
   a mobile note on the right, and the stat figures beside the phone. */
export default function Stats() {
  return (
    <section className="bg-ink px-4 py-24 text-canvas md:px-10 md:py-32">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex justify-between text-xs">
          <p className="pl-[18%]">{stats.label}</p>
          <p className="tabular-nums">[ {stats.index} ]</p>
        </div>

        <div className="mt-6 grid gap-10 md:grid-cols-[18%_1fr_1fr]">
          <div aria-hidden className="hidden md:block" />
          <p className="max-w-xl text-2xl leading-snug md:text-[30px]">{stats.heading}</p>
          <div className="max-w-xs text-sm leading-relaxed">
            <p className="mb-2 flex items-center gap-3 text-base">
              <span aria-hidden className="inline-block h-2.5 w-2.5 bg-canvas" />
              {stats.mobile.label}
            </p>
            <p>{stats.mobile.body}</p>
          </div>
        </div>

        <div className="mt-20 grid gap-12 md:grid-cols-[18%_1fr_1fr] md:items-start">
          <div className="relative mx-auto w-full max-w-[500px] md:col-start-2">
            {/* Phone frame: outlined rounded shell around a media card */}
            <div className="rounded-[56px] border border-canvas/70 p-4">
              <div className="relative aspect-[9/16] overflow-hidden rounded-[44px] bg-[#44463f]">
                <Media src="" alt="Placeholder mobile content still" className="h-full w-full" />
                <div className="absolute left-1/2 top-4 h-6 w-28 -translate-x-1/2 rounded-full bg-ink" aria-hidden />
              </div>
            </div>
          </div>

          <div className="grid gap-x-10 gap-y-10 md:col-start-3 md:grid-cols-1">
            {stats.figures.map((group, gi) => (
              <div key={gi} className="flex flex-col gap-8">
                {group.map((f) => (
                  <div key={f.label}>
                    <p className="text-sm text-canvas">{f.label}</p>
                    <p className="mt-1 text-4xl tabular-nums md:text-6xl">{f.value}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
