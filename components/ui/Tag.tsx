import type { ReactNode } from "react";

import { cn } from "@/app/lib/utils";

/** A condition or property-type label. Reads as a spec, not a chip. */
export function Tag({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block border-l-2 border-terracotta bg-terracotta-soft/50 py-0.5 pl-2.5 text-[0.8125rem] leading-5 text-body",
        className,
      )}
    >
      {children}
    </span>
  );
}
