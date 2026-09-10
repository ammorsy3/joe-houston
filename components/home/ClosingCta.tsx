import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/app/lib/site-config";
import { closingDate, telHref } from "@/app/lib/utils";
import { Button } from "@/components/ui/Button";
import { HouseMotif } from "@/components/ui/HouseMotif";

export function ClosingCta() {
  return (
    <section
      aria-labelledby="closing-cta-heading"
      className="grain gold-gradient relative overflow-hidden"
    >
      {/*
        A quiet neighborhood, blended under the gold — z-[-1] keeps it below
        .grain and the content. contrast-[.4] brightness-[1.45] flattens the
        photo's darkest shadow pixels before the luminosity blend touches
        them: unfiltered, this photo's darkest pixel (~rgb(1,3,2)) would pull
        ink-on-gold text contrast well below AA wherever it happened to land
        under object-cover's crop. Filtered + at 12% opacity, and with every
        text run in this section set to solid ink (~6.7:1 on the gold before
        the photo), the same worst-case pixel still clears 4.5:1.
      */}
      <Image
        src="/images/closing-cta-neighborhood.jpg"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none absolute inset-0 z-[-1]! object-cover opacity-[0.12] contrast-[.4] brightness-[1.45] mix-blend-luminosity"
      />

      <HouseMotif
        className="pointer-events-none absolute -right-6 -bottom-10 hidden h-40 w-40 text-ink opacity-[0.07] sm:block"
      />

      <div className="reveal relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <div>
            <h2
              id="closing-cta-heading"
              className="display max-w-[16ch] text-[clamp(2.25rem,5vw,3.75rem)] text-ink"
            >
              Find out what it&rsquo;s worth to us
            </h2>
            <p className="mt-6 max-w-[52ch] text-[1.0625rem] leading-[1.65] text-ink">
              One call. A real number, and a straight answer about whether we are
              the right buyer for this property. If we are not, we will say so.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-4">
            <Button
              href={telHref(siteConfig.phone.raw)}
              size="lg"
              variant="ink"
              className="w-full justify-center sm:w-auto"
            >
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
              Call {siteConfig.phone.display}
            </Button>

            <p className="text-[0.8125rem] text-ink">
              {siteConfig.hours.line} &middot; closings as soon as{" "}
              {closingDate(14)}
            </p>

            <p className="text-[0.9375rem] text-ink">
              Rather not call?{" "}
              <Link
                href={siteConfig.formAnchor}
                className="font-semibold text-ink underline decoration-ink/40 underline-offset-4 hover:decoration-ink"
              >
                Send the address instead
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
