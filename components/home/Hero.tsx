import Image from "next/image";
import type { CSSProperties } from "react";

import { siteConfig } from "@/app/lib/site-config";
import { closingDate, telHref } from "@/app/lib/utils";
import { Button } from "@/components/ui/Button";

/** Our fastest close, and the date it lands on if someone calls today. */
const FASTEST_CLOSE_DAYS = 14;

const STATS = [
  { value: "24 hrs", label: "To a written offer" },
  { value: "14 days", label: "Fastest close" },
  { value: "As-is", label: "No repairs, no cleanout" },
  { value: "$0", label: "Commission and fees" },
];

export function Hero() {
  const closesOn = closingDate(FASTEST_CLOSE_DAYS);

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-paper"
    >
      {/* Ambient corner warmth — a placeholder blob today, a masked photo later. */}
      <div
        aria-hidden="true"
        className="glow pointer-events-none -top-32 -right-24 h-[32rem] w-[32rem]"
      />

      <div className="mx-auto max-w-6xl px-6 pt-14 pb-14 lg:px-8 lg:pt-20 lg:pb-16">
        <div className="grid gap-14 lg:grid-cols-[1fr_minmax(0,26rem)] lg:gap-16">
          <div className="lg:pt-4">
            <h1
              id="hero-heading"
              className="rise display text-[clamp(3rem,7.5vw,5.5rem)] text-ink"
            >
              Selling Made Simple
            </h1>

            <p
              className="rise mt-8 max-w-[46ch] text-[1.125rem] leading-[1.65] text-body"
              style={{ "--rise-delay": "80ms" } as CSSProperties}
            >
              We buy houses and small multifamily properties in any condition,
              with cash and on your timeline &mdash; no repairs, no agents, no
              fees.
            </p>

            {/*
              The most reassuring thing this business can say is a specific
              date, so the page works one out rather than claiming "fast".
            */}
            <div
              className="rise relative mt-10 overflow-hidden bg-[linear-gradient(135deg,var(--color-gold-soft),var(--color-paper)_120%)] py-5 pr-6 pl-7"
              style={{ "--rise-delay": "160ms" } as CSSProperties}
            >
              <span
                aria-hidden="true"
                className="gilded absolute inset-y-0 left-0 w-1.5"
              />
              <p className="text-[0.9375rem] leading-relaxed text-body">
                Call today and you could be closed by
              </p>
              <p className="display-sm mt-1 text-[clamp(1.375rem,2.6vw,1.75rem)] text-ink">
                {closesOn}
              </p>
            </div>

            <div
              className="rise mt-9 flex flex-col gap-5 sm:flex-row sm:items-center"
              style={{ "--rise-delay": "240ms" } as CSSProperties}
            >
              <Button href={telHref(siteConfig.phone.raw)} size="lg" variant="ink">
                <PhoneIcon />
                Call {siteConfig.phone.display}
              </Button>
              <p className="text-[0.875rem] leading-[1.6] text-body">
                {siteConfig.market.line}.
                <br />
                {siteConfig.hours.line}.
              </p>
            </div>
          </div>

          <div
            className="rise relative"
            style={{ "--rise-delay": "120ms" } as CSSProperties}
          >
            <div
              aria-hidden="true"
              className="glow pointer-events-none -top-20 -right-20 -z-10 h-[36rem] w-[36rem] opacity-70"
            />
            {/*
              The gold aura — a light source that rides the card's edge,
              swept along by scroll as the section crosses the viewport. It
              has to sit on a wrapper OUTSIDE the overflow-hidden frame
              below, or its ring and bloom get clipped.
            */}
            <div
              className="aura rounded-card"
              style={{ "--aura-size": "30rem" } as CSSProperties}
            >
              {/*
                overflow-hidden on this frame is what makes .hero-media's
                scroll-linked zoom (see globals.css) read as the photo
                growing inside a fixed window rather than the whole card
                resizing.
              */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-card border border-hairline shadow-panel">
                <div
                  aria-hidden="true"
                  className="gilded absolute inset-x-0 top-0 z-10 h-[3px]"
                />
                <Image
                  src="/images/hero-house.jpg"
                  alt="A Central Texas home with a limestone facade and a welcoming front porch, shaded by live oak trees"
                  fill
                  priority
                  sizes="(min-width: 1024px) 26rem, 100vw"
                  className="hero-media object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stat rail — the four numbers a seller is actually weighing. */}
      <div className="relative overflow-hidden border-y border-hairline bg-limestone">
        <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-60" />
        <dl className="relative mx-auto grid max-w-6xl grid-cols-2 divide-x divide-y divide-hairline sm:grid-cols-4 sm:divide-y-0">
          {STATS.map((stat) => (
            <div key={stat.label} className="px-6 py-7 lg:px-8 lg:py-8">
              <dd className="display-sm tnum text-[1.75rem] text-ink lg:text-[2rem]">
                {stat.value}
              </dd>
              <dt className="mt-1.5 text-[0.8125rem] leading-snug text-body">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

