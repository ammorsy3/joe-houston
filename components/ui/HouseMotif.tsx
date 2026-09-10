/**
 * A quiet line-drawing of a house — roofline, walls, a door notch — used as a
 * low-opacity watermark, never as an icon or logo. Color and opacity are the
 * caller's job via `className` so the same mark can sit on limestone or gold.
 */
export function HouseMotif({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <path d="M28 108 100 44l72 64" />
      <path d="M44 96v76h112V96" />
      <path d="M92 172v-46h16v46" />
    </svg>
  );
}
