"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

import { cn } from "@/app/lib/utils";

/**
 * Optional pointer enhancement for `.aura` cards.
 *
 * The aura itself is scroll-driven in CSS and needs no JavaScript — that is
 * what phone visitors and anyone scrolling without touching the mouse get.
 * This adds the second driver: while a pointer is inside the group, one
 * listener feeds each card its own local coordinates as `--px`/`--py`, which
 * take priority over the scroll sweep. Removing them on leave hands control
 * back to scroll.
 *
 * Children opt in with `data-aura` and the `aura` class (see globals.css).
 */
export function AuraGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const cards = ref.current?.querySelectorAll<HTMLElement>("[data-aura]");
    if (!cards) return;

    for (const card of cards) {
      const box = card.getBoundingClientRect();
      card.style.setProperty("--px", `${event.clientX - box.left}px`);
      card.style.setProperty("--py", `${event.clientY - box.top}px`);
    }
  }

  function handlePointerLeave() {
    const cards = ref.current?.querySelectorAll<HTMLElement>("[data-aura]");
    if (!cards) return;
    // Drop the override so the scroll sweep drives the light again.
    for (const card of cards) {
      card.style.removeProperty("--px");
      card.style.removeProperty("--py");
    }
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(className)}
    >
      {children}
    </div>
  );
}
