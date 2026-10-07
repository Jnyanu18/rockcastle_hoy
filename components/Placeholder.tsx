/* Reserved media slot. Swap for <Image> once client media is supplied. */
export default function Placeholder({
  label,
  ratio = "4 / 5",
  className = "",
}: {
  label: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative w-full overflow-hidden rounded-media bg-[#2b2e27] ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.12em] text-acid/50">
        {label}
      </span>
    </div>
  );
}
