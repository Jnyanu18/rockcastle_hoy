type Props = {
  size?: number;
  className?: string;
};

/** The four-point star used as the studio's cross mark. */
export default function Sparkle({ size = 24, className = "" }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 0C12.6 7.4 16.6 11.4 24 12C16.6 12.6 12.6 16.6 12 24C11.4 16.6 7.4 12.6 0 12C7.4 11.4 11.4 7.4 12 0Z" />
    </svg>
  );
}
