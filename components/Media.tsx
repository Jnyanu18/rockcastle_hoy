/* Image slot. Renders the client's image when a src is supplied, otherwise a
   flat placeholder. The fixed aspect ratio keeps layout stable (no CLS). */
type MediaProps = {
  src?: string;
  alt: string;
  className?: string;
  tone?: "light" | "dark";
};

export default function Media({ src, alt, className = "", tone = "dark" }: MediaProps) {
  const base = tone === "dark" ? "bg-[#3a3a36]" : "bg-[#d9dba0]";
  if (!src) {
    return <div role="img" aria-label={alt} className={`${base} ${className}`} />;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} loading="lazy" decoding="async" className={`object-cover ${className}`} />
  );
}
