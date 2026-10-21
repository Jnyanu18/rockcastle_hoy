"use client";

import type { MouseEvent } from "react";

/** Reel card: the whole card lifts toward the viewer and tilts slightly with the cursor. */
export default function ReelCard({ kind, title, img }: { kind: string; title: string; img: string }) {
  const onMove = (e: MouseEvent<HTMLLIElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.setProperty("--ry", `${x * 10}deg`);
    e.currentTarget.style.setProperty("--rx", `${-y * 10}deg`);
  };
  const onLeave = (e: MouseEvent<HTMLLIElement>) => {
    e.currentTarget.style.removeProperty("--rx");
    e.currentTarget.style.removeProperty("--ry");
  };
  return (
    <li className="rcf-reel" onMouseMove={onMove} onMouseLeave={onLeave}>
      <img src={img} alt="" decoding="async" />
      <span className="rcf-reel__play" aria-hidden><svg viewBox="0 0 24 24"><path d="M5 2.5v19L21 12z" /></svg></span>
      <span className="rcf-reel__meta"><b>{kind}</b>{title}</span>
    </li>
  );
}
