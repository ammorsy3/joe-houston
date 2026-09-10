import Image from "next/image";
import type { CSSProperties } from "react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";

const CARDS = [
  {
    kind: "Houses",
    title: "Distressed single-family",
    body: "Houses that need more than the owner has time, money or appetite for. We buy them as they stand — no cleanout, no contractor bids, no inspection objections.",
    tags: [
      "Any condition",
      "Pre-foreclosure",
      "Inherited",
      "Fire or flood damage",
      "Tax delinquent",
    ],
    image: {
      src: "/images/what-we-buy-single-family.jpg",
      alt: "A single-family house with peeling paint and an overgrown yard",
    },
  },
  {
    kind: "Multifamily",
    title: "Duplex through small apartment",
    body: "Small multifamily where the numbers have stopped working — deferred maintenance, problem tenants, rents years below market. We underwrite the real rent roll, not the pro forma.",
    tags: ["Duplex / Triplex", "Fourplex", "5+ units", "Tired landlord", "Value-add"],
    image: {
      src: "/images/what-we-buy-multifamily.jpg",
      alt: "A small duplex property with two front doors",
    },
  },
];

export function WhatWeBuy() {
  return (
    <section
      id="what-we-buy"
      aria-labelledby="what-we-buy-heading"
      className="grain gold-gradient relative overflow-hidden border-t border-hairline"
    >
      <div aria-hidden="true" className="gilded absolute inset-x-0 top-0 h-[2px]" />
      <div
        aria-hidden="true"
        className="glow pointer-events-none top-1/2 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 opacity-30"
      />

      <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <SectionHeading
          className="reveal"
          id="what-we-buy-heading"
          title="What we buy"
          subhead="We are not a listing service and we are not agents. We are the buyer, using our own funds, which is why the condition of the property is genuinely not a problem."
          subheadClassName="text-ink/85"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-8">
          {CARDS.map((card, index) => (
            <article
              key={card.title}
              style={{ "--reveal-delay": `${index * 100}ms` } as CSSProperties}
              className="aura lift reveal flex flex-col rounded-card border border-gold bg-paper shadow-card"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-t-card border-b border-hairline">
                <Image
                  src={card.image.src}
                  alt={card.image.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col p-7 lg:p-9">
                <p className="text-[0.8125rem] font-semibold text-gold-deep">
                  {card.kind}
                </p>
                <h3 className="display-sm mt-2 text-[1.5rem] text-ink">{card.title}</h3>
                <p className="mt-4 text-[0.9375rem] leading-[1.7] text-body">
                  {card.body}
                </p>

                <ul className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6">
                  {card.tags.map((tag) => (
                    <li key={tag}>
                      <Tag>{tag}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
