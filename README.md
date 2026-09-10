# Joe Houston — Cash Offer Site

A single-page marketing site for a real estate investor who buys distressed
single-family homes and small multifamily properties with cash, directly from
owners. Every element on the page pushes toward one action: submitting a
property address.

Built with Next.js (App Router), TypeScript, Tailwind CSS v4 and Turbopack.
No database, no auth, no component library — static-first.

---

## Setup

```bash
npm install
```

```bash
npm run dev
```

The site runs at http://localhost:3000.

| Script          | What it does                              |
| --------------- | ----------------------------------------- |
| `npm run dev`   | Dev server with Turbopack                 |
| `npm run build` | Production build with Turbopack           |
| `npm start`     | Serve the production build                |
| `npm run lint`  | ESLint                                    |

There are no environment variables in this build. `NEXT_PUBLIC_SITE_URL` is
read for Open Graph absolute URLs and falls back to `http://localhost:3000`;
set it to the real domain before deploying.

---

## All client details live in `app/lib/site-config.ts`

**This is the only file you edit to rebrand the site.** Nothing about the
company is hardcoded in JSX — the company name, wordmark, phone number, email,
market, business hours and nav items all come from one typed object that every
component reads.

```ts
export const siteConfig: SiteConfig = {
  company: {
    name: "Joe Houston",
    // Rendered as two parts so the second word sits in gold.
    wordmark: { primary: "Joe", accent: "Houston" },
    description: "…",
  },
  phone: {
    raw: "5126960761",        // digits only — builds every tel: link
    display: "(512) 696-0761", // what visitors see
  },
  email: "jhouston@foresitecre.com",
  market: { line: "Buying throughout Austin and …", short: "Austin, TX" },
  hours: { line: "Monday – Saturday, 8am – 8pm" },
  nav: [ … ],
  formAnchor: "/#offer",
};
```

Keep `phone.display` in sync with `phone.raw` — `formatPhone(raw)` from
`app/lib/utils.ts` produces exactly the display shape.

### Still to fill in

- **Photographs.** `WhatWeBuy` renders hatched `Image placeholder` blocks at
  16:10. Drop real photos in and delete the `ImageSlot` component.
- `components/home/Testimonials.tsx` contains **invented placeholder quotes**
  marked `REPLACE WITH REAL TESTIMONIALS`. Publishing fabricated testimonials
  is a deceptive practice under the FTC's endorsement rules. Swap in real,
  permissioned seller quotes or delete the section from `app/page.tsx`.
- `app/privacy/page.tsx` is plain-language starter text, not legal advice.
  Have counsel review it — especially consent, retention and state rights.

---

## Structure

```
app/
├── layout.tsx            next/font wiring, metadata, Navbar + Footer
├── page.tsx              composes the home sections in order
├── globals.css           design tokens (@theme) + reveal animation
├── privacy/page.tsx
├── api/lead/route.ts     POST handler — validates, logs, TODOs for delivery
├── lib/
│   ├── site-config.ts    ← every client detail
│   ├── validation.ts     zod lead schema, shared by form and API
│   └── utils.ts          cn(), formatPhone(), telHref()
└── supabase/             typed no-op stubs for a future integration
components/
├── layout/               Navbar, Footer, MobileCallBar
├── home/                 Hero, LeadForm, Comparison, WhatWeBuy, HowItWorks,
│                         Situations, Testimonials, Faq, ClosingCta
└── ui/                   Button, SectionHeading, Tag
```

Only three components are client components — `Navbar` (mobile menu),
`LeadForm` (form state) and `MobileCallBar` (scroll listener). Everything else
is a server component.

SVG illustrations and icons are written inline in the component that uses
them. There is no icons folder and no stock photography.

---

## Design system

Tokens live once in `app/globals.css` via Tailwind v4's `@theme`, so components
use utilities (`text-ink`, `bg-limestone`, `border-hairline`) and no hex values
appear in JSX.

| Token                | Value     | Used for                                        |
| -------------------- | --------- | ----------------------------------------------- |
| `--color-paper`      | `#FFFFFF` | Page background, cards                          |
| `--color-limestone`  | `#EDEAE4` | Section bands                                   |
| `--color-ink`        | `#1A1A1A` | Headings, dark buttons, focus ring               |
| `--color-body`       | `#5F5F5F` | Body copy                                        |
| `--color-gold`       | `#D4A537` | **Solid mass** — the CTA block, buttons, a table column |
| `--color-gold-deep`  | `#7A5C18` | Gold that carries text                           |
| `--color-gold-soft`  | `#F7EEDA` | Tinted panels behind text                        |
| `--color-hairline`   | `#DDD8CE` | 1px borders                                      |

**Why limestone and not another near-white.** The old `#FAFAF8` band sat at
1.045 against a white card — no visible separation, so nothing on the page read
as layered. Limestone is at 1.20, which is what lets a white card lift.

**Why two golds.** `#D4A537` is bright enough to carry ink text at 7.7:1, which
is what makes a full gold CTA block and a gold table column possible. It is far
too light to *be* text on white, so gold text uses `--color-gold-deep`
(6.2:1 on paper, 5.2:1 on limestone).

Type is **Fraunces** for display, set heavy and tight — the scale does the work,
so headings carry no eyebrow label and no accent-coloured word. **Public Sans**
handles body and forms. Both load via `next/font`; no `<link>` tags.

### Aura, grain and gilding

Three effects give the flat surfaces some life. All are CSS; the only JS is a
single pointer listener.

**Aura** (`.aura` in globals.css, `components/ui/Aura.tsx`) moves a light
source over the edge of each card. It has two drivers, and **scroll is the
primary one** — most visitors to this site are on a phone, and plenty of desktop
visitors scroll without ever moving the mouse, so a pointer-only effect would be
invisible to nearly everyone.

1. **Scroll (everyone).** `--sweep` is animated down the card by its own
   `animation-timeline: view()`, so the light passes over each card as it
   crosses the viewport. No JavaScript.
2. **Pointer (when there is one).** `AuraGroup` puts a single listener on the
   group and writes each card its own local `--px`/`--py`, which take priority
   through the `var()` fallback chain. Removing them on leave hands control back
   to scroll.

The two drivers use **different variables on purpose**: a custom property being
animated cannot be overridden by inline style, so they are resolved in
`--ax`/`--ay` rather than left to fight in the cascade.

An element has exactly two pseudo-elements, so the effect uses exactly two:
`::before` is masked down to the 1px ring, `::after` is the blurred bloom. Do
not add a third `::before` rule for the same element — an earlier pass did, and
it silently replaced the ring.

On a light card the hotspot gets *richer* toward the light, not paler
(`gold-deep → gold → transparent`): a pale gold edge on white has almost no
luminance contrast and vanishes.

Where scroll-driven animation or `@property` is unsupported, or the visitor asked
for reduced motion, `--sweep` stays at its `50%` initial value and the card keeps
a soft centred glow. There is no code path that produces a dead card.

**Grain** (`.grain`) lays a near-invisible SVG turbulence over the large flat
fills — the gold CTA band and the limestone sections — so they read as printed
rather than as a swatch.

**Gilding** (`.gilded`) is a gold gradient with a bright band running through
it, used on the form's top rule and the closing-date panel's edge so the gold
looks like metal catching light rather than a flat fill.

### Motion

One orchestrated moment: the hero rises on load, staggered by
`--rise-delay`. Nothing else animates uninvited — no per-section scroll reveals
and no hover-lift on cards. The FAQ disclosure animates because it answers a
click. All of it sits behind `prefers-reduced-motion: no-preference`.

### Dates are live

The hero and the timeline print real dates counted from today in Central time
(`closingDate()` in `app/lib/utils.ts`), so the page promises a specific day
rather than "fast". `app/page.tsx` sets `revalidate = 3600` so those dates stay
current instead of freezing at deploy time.

## The lead flow

`app/lib/validation.ts` holds one zod schema. The form validates against it in
the browser for inline field errors, and `app/api/lead/route.ts` validates
against the same schema again on the server — client-side validation is a
convenience, never a trust boundary.

The form has four states: idle, submitting (disabled button with a spinner),
success (the card is replaced by a confirmation panel), and error (a retry
message with the phone number as a fallback).

A visually hidden honeypot field named `website` is included. The schema
deliberately does *not* reject a filled value — that would return a field
error naming the trap — so the route handler checks it and returns a bare
failure instead.

### Wiring up delivery

**Right now the route only `console.log`s the lead.** A lead in a server log is
a lead nobody calls. `app/api/lead/route.ts` carries a marked TODO block with
drop-in shapes for the four integrations that should be in place before the
site takes real traffic:

1. **Supabase insert** — see the stubs in `app/supabase/`
2. **CRM webhook** — Podio, Follow Up Boss, REsimpli, Zapier, …
3. **Email notification** — Resend, Postmark, SendGrid
4. **Instant SMS trigger** — speed to lead decides who buys the house

Store `consent`, `submittedAt` and the visitor's IP alongside every lead. That
record is the proof of consent if a TCPA complaint ever surfaces.

---

## Accessibility

Verified at 375px, 768px and 1440px with no horizontal overflow at any width.

- Semantic landmarks, one `<h1>`, no heading-level skips, every `<section>`
  named via `aria-labelledby`
- Every form control labelled; errors wired with `aria-invalid` and
  `aria-describedby`, and focus moves to the first invalid field on submit
- Decorative SVGs are `aria-hidden`
- A visible 2px near-black focus ring on everything focusable, plus a skip link
- Body and heading text meet WCAG AA; see the two-gold note above
