import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "../lib/site-config";
import { telHref } from "../lib/utils";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.company.name} collects, uses and protects the information you submit through this site.`,
  robots: { index: false, follow: true },
};

/** Slug used for the heading id a section points `aria-labelledby` at. */
function slug(heading: string) {
  return heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const SECTIONS = [
  {
    heading: "Information we collect",
    body: [
      `We collect only what you give us through the offer form on this site: the property address, your name, phone number, email address, the type of property, and a short description of your situation. We also record the date and time of the submission and your agreement to be contacted.`,
      `Our web host records standard technical information such as IP address, browser type and referring page. We do not collect financial account numbers, Social Security numbers or government identification through this website.`,
    ],
  },
  {
    heading: "How we use it",
    body: [
      `We use your information for one purpose: to evaluate your property and contact you about a potential cash offer. That contact may be by phone, text message or email, as described next to the consent checkbox on the form.`,
      `We do not sell your information. We do not share it with third parties for their own marketing.`,
    ],
  },
  {
    heading: "Who we share it with",
    body: [
      `We share information only with the service providers who help us operate — our website host, our customer relationship software, our email and text messaging providers, and the title company handling a closing. Each receives only what it needs to do its job.`,
      `We may also disclose information where the law requires it, or to protect our legal rights.`,
    ],
  },
  {
    heading: "Phone, text and email consent",
    body: [
      `Submitting the form gives us permission to contact you by phone, text message and email about the property you told us about. Consent is not a condition of any sale, purchase or other transaction.`,
      `Message and data rates may apply. Reply STOP to any text to opt out, or ask us to remove you at any time using the contact details below. Opting out of texts does not remove you from email, and vice versa — tell us which you would like to stop and we will handle it.`,
    ],
  },
  {
    heading: "How long we keep it",
    body: [
      `We keep lead records for as long as we may reasonably need them for the transaction and for our own legal recordkeeping, including proof of your consent to be contacted. You may ask us to delete your information, and we will unless we are required to keep it.`,
    ],
  },
  {
    heading: "Your choices",
    body: [
      `You can ask us what information we hold about you, ask us to correct it, or ask us to delete it. Contact us using the details below and we will respond within a reasonable time. Depending on where you live, state law may give you additional rights.`,
    ],
  },
  {
    heading: "Children",
    body: [
      `This site is not directed to anyone under 18 and we do not knowingly collect information from children.`,
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      `We may update this policy from time to time. The revised version takes effect when it is posted on this page.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="bg-paper">
      <div className="mx-auto max-w-3xl px-6 pt-16 pb-24 lg:px-8 lg:pt-24 lg:pb-32">
        <p className="text-[0.6875rem] font-medium tracking-[0.2em] text-gold-deep uppercase">
          Legal
        </p>
        <h1 className="mt-5 display-sm text-[clamp(2.25rem,5vw,3.25rem)] leading-[1.05] tracking-[-0.015em] text-ink">
          Privacy <em className="text-gold-deep italic">Policy</em>
        </h1>
        <p className="mt-6 text-[0.875rem] text-body">Last updated: January 1, 2026</p>

        <div className="mt-8 rounded-card border border-hairline bg-limestone p-6">
          <p className="text-[0.875rem] leading-[1.7] text-body">
            <strong className="font-medium text-ink">Placeholder.</strong> This is
            plain-language starter text, not legal advice. Have counsel review and
            adapt it before launch — particularly the consent, retention and
            state-rights sections, which vary by jurisdiction.
          </p>
        </div>

        <p className="mt-12 text-[1.0625rem] leading-[1.8] text-body">
          This policy explains what {siteConfig.company.name} collects when you use
          this website, why we collect it, and what we do with it.
        </p>

        {SECTIONS.map((section) => (
          <section
            key={section.heading}
            aria-labelledby={slug(section.heading)}
            className="mt-12"
          >
            <h2
              id={slug(section.heading)}
              className="display-sm text-[1.5rem] leading-tight text-ink"
            >
              {section.heading}
            </h2>
            {section.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="mt-4 text-[1rem] leading-[1.8] text-body"
              >
                {paragraph}
              </p>
            ))}
          </section>
        ))}

        <section
          aria-labelledby="contact-us"
          className="mt-12 border-t border-hairline pt-12"
        >
          <h2
            id="contact-us"
            className="display-sm text-[1.5rem] leading-tight text-ink"
          >
            Contact us
          </h2>
          <p className="mt-4 text-[1rem] leading-[1.8] text-body">
            Questions about this policy, or want your information removed?
          </p>
          <ul className="mt-4 space-y-2 text-[1rem]">
            <li>
              <a
                href={telHref(siteConfig.phone.raw)}
                className="text-ink underline decoration-hairline underline-offset-4 transition-colors hover:decoration-gold"
              >
                {siteConfig.phone.display}
              </a>
            </li>
          </ul>
        </section>

        <p className="mt-14">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[0.9375rem] text-body transition-colors hover:text-ink"
          >
            <svg
              viewBox="0 0 20 20"
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 10H4M9 5l-5 5 5 5" />
            </svg>
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
