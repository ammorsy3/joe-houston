import type { ReactNode } from "react";

import { cn } from "@/app/lib/utils";

type Props = {
  title: string;
  subhead?: ReactNode;
  as?: "h2" | "h3";
  align?: "left" | "center";
  /** Id for the heading, so its section can point `aria-labelledby` at it. */
  id?: string;
  className?: string;
};

/**
 * Section headings carry no eyebrow label and no accent-coloured word — the
 * type scale does that work. Sections that genuinely need a category label
 * render one themselves, where it means something.
 */
export function SectionHeading({
  title,
  subhead,
  as = "h2",
  align = "left",
  id,
  className,
}: Props) {
  const Heading = as;
  const centered = align === "center";

  return (
    <div className={cn(centered && "text-center", className)}>
      <Heading
        id={id}
        className={cn(
          "display text-ink",
          as === "h2"
            ? "text-[clamp(2.25rem,4.6vw,3.5rem)]"
            : "text-[clamp(1.5rem,2.6vw,2rem)]",
        )}
      >
        {title}
      </Heading>

      {subhead ? (
        <p
          className={cn(
            "mt-5 max-w-[58ch] text-[1.0625rem] leading-[1.7] text-body",
            centered && "mx-auto",
          )}
        >
          {subhead}
        </p>
      ) : null}
    </div>
  );
}
