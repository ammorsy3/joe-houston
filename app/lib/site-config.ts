/**
 * Single source of truth for every client-specific detail on this site.
 *
 * Nothing about the company is hardcoded in JSX — components read from here.
 * To launch for a real client, replace the bracketed placeholders below and
 * you are done. No other file needs to change.
 */

export type NavItem = {
  label: string;
  /** Root-relative so links keep working from /privacy, e.g. "/#how-it-works". */
  href: string;
};

export type SiteConfig = {
  company: {
    /** Full legal-ish name used in metadata, footer copyright and body copy. */
    name: string;
    /**
     * The wordmark is rendered as two parts so the second sits in gold.
     * Together they should read as `company.name`.
     */
    wordmark: { primary: string; accent: string };
    /** One line under the footer wordmark. */
    description: string;
  };
  phone: {
    /** Digits only — used to build `tel:` links. */
    raw: string;
    /** What visitors actually see. `formatPhone(phone.raw)` produces this shape. */
    display: string;
  };
  email: string;
  market: {
    /** Full coverage sentence, e.g. "Buying throughout Greater Austin". */
    line: string;
    /** Short market name used inline in body copy. */
    short: string;
  };
  hours: {
    /** Single line shown next to the call buttons. */
    line: string;
  };
  nav: NavItem[];
  /** Link target for the lead form — every CTA on the site points here. */
  formAnchor: string;
};

export const siteConfig: SiteConfig = {
  company: {
    name: "Joe Houston",
    wordmark: { primary: "Joe", accent: "Houston" },
    description:
      "A private real estate investor buying homes and small multifamily properties directly from owners, for cash.",
  },
  phone: {
    raw: "5126960761",
    display: "(512) 696-0761",
  },
  email: "jhouston@foresitecre.com",
  market: {
    line: "Buying throughout Austin and the surrounding Central Texas counties",
    short: "Austin, TX",
  },
  hours: {
    line: "Monday – Saturday, 8am – 8pm",
  },
  nav: [
    { label: "Compare", href: "/#why-us" },
    { label: "What we buy", href: "/#what-we-buy" },
    { label: "How it works", href: "/#how-it-works" },
    { label: "Questions", href: "/#faq" },
  ],
  formAnchor: "/#offer",
};
