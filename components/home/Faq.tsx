import type { CSSProperties } from "react";

import { siteConfig } from "@/app/lib/site-config";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Objection handling. Someone selling into foreclosure has been called by a
 * dozen wholesalers this month — these are the questions that decide whether
 * they pick up the phone, so the answers are direct, including the one that
 * says we might be the wrong buyer.
 */
const FAQS = [
  {
    q: "How do you decide what to offer?",
    a: "We work out what the property is worth once it is fixed up, using sales of comparable houses nearby, then subtract what it needs and what it costs us to carry and resell it. What is left is the offer. We will walk you through that arithmetic on the call — if a number does not make sense to you, ask.",
  },
  {
    q: "Is this going to be a lowball offer?",
    a: "Our offer is below what a fixed-up house fetches on the open market. That difference is what pays for speed, certainty and taking the property as-is. If your house is in good shape and you can wait out a listing, an agent will net you more, and we will tell you that rather than waste your time.",
  },
  {
    q: "What does it cost me?",
    a: "Nothing. No commission, no listing fees, no repair credits, and we cover the ordinary closing costs. The number we agree on is the number that shows up on your settlement statement.",
  },
  {
    q: "Do I have to clean the place out?",
    a: "No. Take what matters to you and leave the rest — furniture, belongings, whatever is in the garage. Clearing it is our problem after closing.",
  },
  {
    q: "I am behind on payments. Is it too late?",
    a: "Usually not, but timing matters, so call as early as you can. We work directly with your lender's payoff figures and, if a foreclosure date is already set, with the trustee's timeline. The closer that date gets, the fewer options there are.",
  },
  {
    q: "It is in probate, or there are other people on the deed. Can you still buy it?",
    a: "Yes, this is common. The title company handles the search and we coordinate with the executor or the other owners. It can add time, which is why we ask about it up front rather than at the closing table.",
  },
  {
    q: "Are you an agent?",
    a: "No. We are the buyer, purchasing with our own funds. Nobody is representing you in the transaction, so you are welcome to have your own attorney or agent look at anything we send you — several sellers do.",
  },
];

export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="border-t border-hairline bg-paper"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
          <div className="reveal">
            <SectionHeading
              id="faq-heading"
              title="Frequently Asked Questions"
              subhead="The questions sellers actually ask, answered the way we would answer them on the phone."
            />
            <p className="mt-7 text-[0.9375rem] leading-[1.7] text-body">
              Still unsure?{" "}
              <a
                href={`tel:+1${siteConfig.phone.raw}`}
                className="font-semibold text-ink underline decoration-gold decoration-2 underline-offset-4"
              >
                Call {siteConfig.phone.display}
              </a>{" "}
              and ask. No script, no pressure.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {FAQS.map((item, index) => (
              <details
                key={item.q}
                style={{ "--reveal-delay": `${index * 60}ms` } as CSSProperties}
                className="group lift reveal rounded-card border border-hairline bg-paper shadow-card [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 px-6 py-5 text-[1.0625rem] font-semibold text-ink transition-colors hover:bg-limestone/50 lg:px-7">
                  {item.q}
                  <span
                    aria-hidden="true"
                    className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center"
                  >
                    <svg
      aria-hidden="true"
                      viewBox="0 0 20 20"
                      className="h-4 w-4 text-gold-deep transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    >
                      <path d="M10 4v12M4 10h12" />
                    </svg>
                  </span>
                </summary>
                <p className="max-w-[68ch] px-6 pb-6 text-[0.9375rem] leading-[1.75] text-body lg:px-7">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
