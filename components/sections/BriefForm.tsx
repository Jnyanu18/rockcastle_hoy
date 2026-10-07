"use client";

import { useState } from "react";
import { footer, social } from "@/lib/content";

// Three taps give a producer enough to start: what, how big, when.
const TAP_ROWS = [
  { key: "type", label: "What kind", options: ["Brand film", "Social campaign", "Photography", "3D animation", "Product launch", "Documentary"] },
  { key: "scope", label: "Project size", options: ["Single asset", "Short campaign", "Ongoing retainer", "Full rebrand"] },
  { key: "when", label: "When", options: ["Within 6 weeks", "This quarter", "Next quarter", "Not fixed yet"] },
] as const;

type TapKey = (typeof TAP_ROWS)[number]["key"];
type Taps = Record<TapKey, string>;

const briefLine = (taps: Taps) =>
  taps.type && taps.scope && taps.when ? `${taps.type} · ${taps.scope} · ${taps.when}` : "";

type Status = "idle" | "sending" | "success" | "error";

/**
 * A second, practical way in: a three-tap brief picker that pre-fills the
 * message field, next to a short contact form. Sits on the light canvas to
 * give the run of dark sections above it room to breathe before the footer.
 */
export default function BriefForm() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [taps, setTaps] = useState<Taps>({ type: "", scope: "", when: "" });

  // Picking a chip keeps the brief line at the top of the message in sync,
  // without touching anything the visitor has typed below it.
  const pickTap = (key: TapKey, value: string) => {
    const prevLine = briefLine(taps);
    const next = { ...taps, [key]: taps[key] === value ? "" : value };
    const nextLine = briefLine(next);
    setTaps(next);
    setForm((prev) => {
      const body = prevLine && prev.message.startsWith(prevLine) ? prev.message.slice(prevLine.length).replace(/^\n+/, "") : prev.message;
      return { ...prev, message: nextLine ? `${nextLine}\n\n${body}` : body };
    });
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName.trim()) {
      setStatus("error");
      setErrorMessage("Please enter your first name.");
      return;
    }
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!form.message.trim()) {
      setStatus("error");
      setErrorMessage("Please enter your message.");
      return;
    }

    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setForm({ firstName: "", lastName: "", email: "", message: "" });
      setTaps({ type: "", scope: "", when: "" });
      setTimeout(() => setStatus("idle"), 6000);
    }, 1100);
  };

  return (
    <section id="brief" className="bg-canvas px-4 py-24 md:px-10">
      <div className="mx-auto max-w-[1400px] rounded-[2.5rem] border border-ink/10 bg-header p-6 shadow-[0_24px_60px_rgba(29,29,27,0.08)] md:p-12">
        <div className="grid gap-12 md:grid-cols-[1fr_1.3fr] md:gap-16">
          {/* Left: heading, description, direct details */}
          <div className="flex flex-col gap-8">
            <h2 className="text-4xl leading-[1.05] tracking-tight text-ink md:text-5xl">
              Get in <span className="text-muted">—</span>
              <br />
              touch with us
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-ink/70">
              Whether you&rsquo;ve got an impossible brief, need production at scale, or just want to talk shape — our team is ready.
            </p>

            <div className="flex flex-col gap-6 text-sm">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium uppercase tracking-wide text-ink/50">Office</span>
                {footer.office.lines.map((line) => (
                  <span key={line} className="text-ink/80">{line}</span>
                ))}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium uppercase tracking-wide text-ink/50">Email</span>
                <a href={`mailto:${footer.contact.lines[1]}`} className="text-ink hover:underline underline-offset-4">
                  {footer.contact.lines[1]}
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium uppercase tracking-wide text-ink/50">Phone</span>
                <a href={`tel:${footer.contact.lines[0]}`} className="text-ink hover:underline underline-offset-4">
                  {footer.contact.lines[0]}
                </a>
              </div>
            </div>

            <a
              href={social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-fit items-center gap-3 rounded-full bg-ink px-5 py-3 text-xs font-medium uppercase tracking-wide text-canvas transition-transform duration-300 hover:scale-[1.03]"
            >
              Live chat
              <span aria-hidden className="flex h-6 w-6 items-center justify-center rounded-full bg-canvas text-ink transition-transform duration-500 group-hover:translate-x-0.5">
                →
              </span>
            </a>
          </div>

          {/* Right: three-tap brief picker + form */}
          <div className="flex flex-col gap-8">
            <fieldset className="flex flex-col gap-5 rounded-2xl border border-ink/10 bg-canvas p-5 md:p-6">
              <legend className="flex w-full flex-wrap items-baseline justify-between gap-2 px-1 text-xs font-medium uppercase tracking-wide text-ink">
                <span>Brief us in three taps</span>
                <span className="font-normal normal-case tracking-normal text-ink/50">
                  {briefLine(taps) || `${taps.type || "[Type]"} · ${taps.scope || "[Size]"} · ${taps.when || "[When]"}`}
                </span>
              </legend>
              {TAP_ROWS.map((row, i) => (
                <div key={row.key} role="group" aria-label={row.label} className="flex flex-col gap-2">
                  <span className="text-xs text-ink/60">0{i + 1} — {row.label}</span>
                  <div className="flex flex-wrap gap-2">
                    {row.options.map((option) => {
                      const active = taps[row.key] === option;
                      return (
                        <button
                          type="button"
                          key={option}
                          aria-pressed={active}
                          onClick={() => pickTap(row.key, option)}
                          className={`rounded-full border px-3 py-1.5 text-xs transition-colors duration-300 ${
                            active ? "border-ink bg-ink text-canvas" : "border-ink/20 text-ink/70 hover:border-ink/50"
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
              {briefLine(taps) && (
                <p role="status" className="text-xs text-ink/50">
                  Enough to start — add your details below, or call us.
                </p>
              )}
            </fieldset>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="brief-firstName" className="text-xs font-medium uppercase tracking-wide text-ink/60">First name</label>
                  <input
                    id="brief-firstName"
                    name="firstName"
                    type="text"
                    placeholder="Enter your first name…"
                    value={form.firstName}
                    onChange={handleChange}
                    autoComplete="given-name"
                    required
                    className="rounded-xl border border-ink/15 bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="brief-lastName" className="text-xs font-medium uppercase tracking-wide text-ink/60">Last name</label>
                  <input
                    id="brief-lastName"
                    name="lastName"
                    type="text"
                    placeholder="Enter your last name…"
                    value={form.lastName}
                    onChange={handleChange}
                    autoComplete="family-name"
                    className="rounded-xl border border-ink/15 bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="brief-email" className="text-xs font-medium uppercase tracking-wide text-ink/60">Email</label>
                <input
                  id="brief-email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address…"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  className="rounded-xl border border-ink/15 bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="brief-message" className="text-xs font-medium uppercase tracking-wide text-ink/60">How can we help you?</label>
                <textarea
                  id="brief-message"
                  name="message"
                  rows={5}
                  placeholder="Tell us about your idea or project…"
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="resize-none rounded-xl border border-ink/15 bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink"
                />
              </div>

              {status === "error" && (
                <div role="alert" className="rounded-xl border border-red-900/20 bg-red-900/5 px-4 py-3 text-xs text-red-900">
                  ⚠ {errorMessage}
                </div>
              )}
              {status === "success" && (
                <div role="status" className="rounded-xl border border-ink/15 bg-ink/5 px-4 py-3 text-xs text-ink">
                  ✓ Thank you! Your message has been sent to our team.
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3 text-xs font-medium uppercase tracking-wide text-canvas transition-opacity duration-300 disabled:opacity-60"
                >
                  <span>{status === "sending" ? "Sending…" : "Send message"}</span>
                  <span aria-hidden className="flex h-6 w-6 items-center justify-center rounded-full bg-canvas text-ink">
                    {status === "sending" ? (
                      <span className="h-3 w-3 animate-spin rounded-full border-2 border-ink/30 border-t-ink" />
                    ) : (
                      "→"
                    )}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
