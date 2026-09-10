"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { siteConfig } from "@/app/lib/site-config";
import { cn, telHref } from "@/app/lib/utils";

/**
 * Fixed bottom bar for phones. Stays out of the way until the visitor has
 * scrolled past the hero — up there the real form and call button are already
 * on screen, so the bar would only cover them up.
 */
export function MobileCallBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("hero");
      const threshold = hero
        ? hero.offsetTop + hero.offsetHeight - 140
        : window.innerHeight * 0.8;

      setVisible(window.scrollY > threshold);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 border-t border-hairline bg-paper/95 shadow-[0_-8px_24px_rgba(26,26,26,0.08)] backdrop-blur-md transition-transform duration-300 md:hidden",
        visible ? "translate-y-0" : "pointer-events-none translate-y-full",
      )}
    >
      <div className="flex items-center gap-3 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <a
          href={telHref(siteConfig.phone.raw)}
          tabIndex={visible ? undefined : -1}
          className="gold-gradient inline-flex flex-1 items-center justify-center gap-2 rounded-sm px-5 py-3.5 text-[0.9375rem] font-semibold text-ink"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
          </svg>
          Call Now
        </a>

        <Link
          href={siteConfig.formAnchor}
          tabIndex={visible ? undefined : -1}
          className="inline-flex flex-1 items-center justify-center rounded-sm border border-ink/25 bg-paper px-5 py-3.5 text-[0.9375rem] font-semibold text-ink"
        >
          Get Offer
        </Link>
      </div>
    </div>
  );
}
