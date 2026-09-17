import type { CSSProperties } from "react";

import { SectionHeading } from "@/components/ui/SectionHeading";

/*
 * ⚠️  REPLACE WITH REAL TESTIMONIALS BEFORE LAUNCH.
 *
 * Everything below is invented placeholder copy written to show the layout.
 * These are not real people and these deals never happened. Publishing
 * fabricated testimonials is a deceptive practice under the FTC's endorsement
 * rules — swap in real, permissioned seller quotes, or delete this section
 * from app/page.tsx until you have some.
 */
const TESTIMONIALS = [
  {
    quote:
      "The auction date was five weeks out and my lender had stopped returning calls. They walked the house on a Tuesday, had a number to me Wednesday, and we closed before the sale date.",
    name: "Marcus T.",
    context: "Pre-foreclosure · closed in 19 days",
  },
  {
    quote:
      "My mother’s house had forty years of belongings in it and I live three states away. I did not have to clear out a single room. They took it exactly as it was.",
    name: "Denise R.",
    context: "Inherited · closed in 26 days",
  },
  {
    quote:
      "Two of the four units were vacant and I was done being a landlord. No agent, no repair list, no buyer’s lender killing it at the last minute. The number they opened with was the number we closed at.",
    name: "Ray P.",
    context: "Fourplex · closed in 14 days",
  },
];

export function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="border-t border-hairline bg-paper"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <SectionHeading
          className="reveal"
          id="testimonials-heading"
          title="People we bought from"
          subhead="Most of the owners we work with were not planning to sell this way. They needed it done, and done predictably."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {TESTIMONIALS.map((item, index) => (
            <figure
              key={item.name}
              style={{ "--reveal-delay": `${index * 100}ms` } as CSSProperties}
              className="aura lift reveal flex flex-col rounded-card border border-gold bg-paper p-7 shadow-card lg:p-9"
            >
              <blockquote className="grow">
                <p className="display-sm text-[1.125rem] leading-[1.55] text-ink">
                  {item.quote}
                </p>
              </blockquote>

              <figcaption className="mt-7 flex items-center gap-3.5">
                <span
                  aria-hidden="true"
                  className="gold-gradient ring-1 ring-inset ring-white/40 flex h-10 w-10 shrink-0 items-center justify-center text-[0.9375rem] font-semibold text-ink"
                >
                  {item.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-[0.9375rem] font-semibold text-ink">
                    {item.name}
                  </span>
                  <span className="block text-[0.8125rem] text-body">{item.context}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
