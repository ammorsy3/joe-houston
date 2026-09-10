import { cn } from "@/app/lib/utils";

/**
 * Deliberately obvious so it can never be mistaken for finished work. Give it
 * an aspect ratio and rounding via `className`; once the real photo exists,
 * swap this for a `next/image` in the same box and delete the placeholder.
 */
export function ImagePlaceholder({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("slot flex items-center justify-center px-6", className)}>
      <p className="max-w-[26ch] border border-hairline bg-paper px-4 py-3 text-center text-[0.8125rem] leading-relaxed text-body">
        <span className="mb-1 block font-semibold text-ink">Image placeholder</span>
        {label}
      </p>
    </div>
  );
}
