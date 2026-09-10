import type { CSSProperties } from "react";

import { closingDate } from "@/app/lib/utils";
import { AuraGroup } from "@/components/ui/Aura";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function HowItWorks() {
  // Real dates, counted from today, so the timeline is a schedule and not a claim.
  const steps = [
    {
      when: "Today",
      title: "Tell us about the property",
      body: "The address is enough to start. If you can tell us the condition and what is driving the sale, we can skip the back-and-forth.",
    },
    {
      when: `By ${closingDate(1)}`,
      title: "Get a cash offer",
      body: "We look at recent sales nearby, what the property needs, and what it will rent or resell for. Then we call and walk you through how we got there.",
    },
    {
      when: `As soon as ${closingDate(14)}`,
      title: "Close and get paid",
      body: "We close at a local title company with our own funds. Need ninety days instead to find your next place? Name the date and we will hold it.",
    },
  ];

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="relative overflow-hidden border-t border-hairline bg-paper"
    >
      <div
        aria-hidden="true"
        className="glow pointer-events-none top-1/2 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 opacity-25"
      />
      <div aria-hidden="true" className="dot-grid pointer-events-none top-0 left-0 h-full w-full opacity-30 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" />

      <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <SectionHeading
          className="reveal"
          id="how-it-works-heading"
          title="Three steps, start to close"
          subhead="No listing, no showings, no strangers walking through the house on a Sunday afternoon."
        />

        <AuraGroup className="mt-14">
          <ol className="grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.title}
              data-aura
              style={{ "--reveal-delay": `${index * 100}ms` } as CSSProperties}
              className="aura lift reveal rounded-card border border-hairline bg-paper p-7 shadow-card lg:p-9"
            >
              {/* A real sequence, so the numbers mean something. */}
              <div className="flex items-baseline gap-3">
                <span aria-hidden="true" className="relative inline-flex">
                  <span className="absolute -inset-2 -z-[1] rounded-full bg-terracotta-soft" />
                  <span className="tnum display-sm text-[2.5rem] leading-none text-terracotta">
                    {index + 1}
                  </span>
                </span>
                <span className="text-[0.8125rem] font-semibold text-gold-deep">
                  {step.when}
                </span>
              </div>

              <h3 className="display-sm mt-5 text-[1.3125rem] text-ink">{step.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-[1.7] text-body">{step.body}</p>
            </li>
            ))}
          </ol>
        </AuraGroup>
      </div>
    </section>
  );
}
