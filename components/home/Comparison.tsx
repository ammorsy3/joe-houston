import { siteConfig } from "@/app/lib/site-config";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * The two paths a seller is actually choosing between. This is a real
 * comparison, so it is a real table — one row per thing they are weighing.
 */
const ROWS: { label: string; agent: string; us: string }[] = [
  {
    label: "Time to close",
    agent: "60–90 days, once a buyer and their lender line up",
    us: "14 days, or whatever date you name",
  },
  {
    label: "Repairs",
    agent: "The inspection produces a repair list you pay for",
    us: "None. We buy the property as it stands",
  },
  {
    label: "Cleanout",
    agent: "Empty and broom-clean before closing",
    us: "Take what you want, leave the rest",
  },
  {
    label: "Showings",
    agent: "Strangers walking the house on their schedule",
    us: "One walkthrough, at a time you pick",
  },
  {
    label: "Commission",
    agent: "Roughly 6% of the sale price",
    us: "$0 — you are selling to the buyer, not through a broker",
  },
  {
    label: "Closing costs",
    agent: "Customarily taken out of your proceeds",
    us: "We cover the ordinary ones",
  },
  {
    label: "Certainty",
    agent: "Financing, appraisal and inspection can each end it late",
    us: "Cash. No lender, no appraisal, no contingency",
  },
];

export function Comparison() {
  return (
    <section
      id="why-us"
      aria-labelledby="comparison-heading"
      className="relative overflow-hidden bg-paper"
    >
      <div aria-hidden="true" className="dot-grid pointer-events-none top-1/2 left-0 h-[28rem] w-full -translate-y-1/2 opacity-40" />

      <div className="reveal relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <SectionHeading
          id="comparison-heading"
          title="The same house, two ways to sell it"
          subhead={`We are not the right answer for everyone. If the house is in good shape and you can wait out a listing, an agent will net you more — and we will tell you so on the call. This is what you are choosing between.`}
        />

        {/*
          The aura sits on this outer wrapper, not the frame below — the
          frame keeps overflow-hidden to clip the table's own corners, which
          would also clip the aura's ring and bloom.
        */}
        <div className="aura mt-14 rounded-card">
        <div className="overflow-hidden rounded-card border border-gold bg-paper shadow-panel">
          {/* Desktop: a real table. */}
          <table className="hidden w-full border-collapse text-left md:table">
            <caption className="sr-only">
              Listing with an agent compared with selling to {siteConfig.company.name}
            </caption>
            <thead>
              <tr>
                <th scope="col" className="w-[22%] pt-7 pb-4" />
                <th
                  scope="col"
                  className="w-[39%] border-b border-hairline px-6 pt-7 pb-4 align-bottom text-[0.9375rem] font-semibold text-body"
                >
                  Listing with an agent
                </th>
                <th
                  scope="col"
                  className="w-[39%] border-b-2 border-gold bg-gold-soft px-6 pt-7 pb-4 align-bottom text-[0.9375rem] font-semibold text-ink"
                >
                  Selling to {siteConfig.company.name}
                </th>
              </tr>
            </thead>
            <tbody className="[&>tr:last-child>*]:border-b-0">
              {ROWS.map((row) => (
                <tr key={row.label} className="transition-colors hover:bg-limestone/40">
                  <th
                    scope="row"
                    className="border-b border-hairline py-5 pr-6 pl-6 align-top text-[0.9375rem] font-semibold text-ink lg:pl-8"
                  >
                    {row.label}
                  </th>
                  <td className="border-b border-hairline px-6 py-5 align-top text-[0.9375rem] leading-[1.6] text-body">
                    {row.agent}
                  </td>
                  <td className="border-b border-hairline bg-[linear-gradient(180deg,var(--color-gold-soft),var(--color-paper)_140%)] px-6 py-5 align-top text-[0.9375rem] leading-[1.6] text-ink lg:pr-8">
                    {row.us}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile: the table stacked, one comparison at a time. */}
          <div className="px-6 md:hidden">
            {ROWS.map((row) => (
              <div key={row.label} className="border-t border-hairline py-6 first:border-t-0">
                <h3 className="text-[0.9375rem] font-semibold text-ink">{row.label}</h3>
                <p className="mt-3 text-[0.875rem] leading-[1.6] text-body">
                  <span className="mb-0.5 block text-[0.75rem] font-semibold text-body">
                    With an agent
                  </span>
                  {row.agent}
                </p>
                <p className="mt-3 rounded-r-card border-l-4 border-gold bg-gold-soft py-3 pr-3 pl-4 text-[0.875rem] leading-[1.6] text-ink">
                  <span className="mb-0.5 block text-[0.75rem] font-semibold">
                    With {siteConfig.company.name}
                  </span>
                  {row.us}
                </p>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
