import Link from "next/link";

import { siteConfig } from "@/app/lib/site-config";
import { telHref } from "@/app/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-paper">
      <div aria-hidden="true" className="gilded h-[2px]" />
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-30 lg:px-8 lg:pt-20 lg:pb-20 md:pb-16">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between md:gap-16">
          <div className="max-w-sm">
            <Link href="/" className="display-sm text-[1.375rem] text-ink">
              {siteConfig.company.wordmark.primary}{" "}
              {siteConfig.company.wordmark.accent}
            </Link>
            <p className="mt-5 text-[0.9375rem] leading-[1.75] text-body">
              {siteConfig.company.description}
            </p>
            <p className="mt-5 text-[0.9375rem] text-body">{siteConfig.market.line}.</p>
          </div>

          <div className="flex flex-col gap-10 sm:flex-row sm:gap-20">
            <div>
              <h2 className="text-[0.8125rem] font-semibold text-ink">
                Contact
              </h2>
              <ul className="mt-5 space-y-3 text-[0.9375rem]">
                <li>
                  <a
                    href={telHref(siteConfig.phone.raw)}
                    className="text-ink transition-colors hover:text-gold-deep"
                  >
                    {siteConfig.phone.display}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-body transition-colors hover:text-ink"
                  >
                    {siteConfig.email}
                  </a>
                </li>
                <li className="text-body">{siteConfig.hours.line}</li>
              </ul>
            </div>

            <div>
              <h2 className="text-[0.8125rem] font-semibold text-ink">
                Quick Links
              </h2>
              <ul className="mt-5 space-y-3 text-[0.9375rem]">
                {siteConfig.nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-body transition-colors hover:text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={siteConfig.formAnchor}
                    className="text-body transition-colors hover:text-ink"
                  >
                    Get a Cash Offer
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-hairline pt-8 text-[0.8125rem] text-body sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; 2026 {siteConfig.company.name}. All rights reserved.
          </p>
          <Link href="/privacy" className="transition-colors hover:text-ink">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
