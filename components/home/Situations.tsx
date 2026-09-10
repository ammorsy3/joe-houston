import { HouseMotif } from "@/components/ui/HouseMotif";
import { SectionHeading } from "@/components/ui/SectionHeading";

const SITUATIONS = [
  "Facing foreclosure",
  "Behind on payments",
  "Inherited a property",
  "Tax liens",
  "Tired of being a landlord",
  "Divorce or life change",
  "Relocating for work",
  "Major repairs needed",
  "Fire or flood damage",
  "Vacant property",
  "Estate or probate sale",
  "Code violations",
];

export function Situations() {
  return (
    <section
      id="situations"
      aria-labelledby="situations-heading"
      className="grain relative overflow-hidden border-t border-hairline bg-gold-soft"
    >
      <div aria-hidden="true" className="gilded absolute inset-x-0 top-0 h-[2px]" />
      <div
        aria-hidden="true"
        className="glow pointer-events-none -top-20 -right-16 h-[28rem] w-[28rem] opacity-30"
      />

      <div className="reveal relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-20">
          <div className="relative">
            <SectionHeading
              id="situations-heading"
              title="Who we buy from"
              subhead="You do not need every one of these to apply. One is enough to be worth a conversation."
            />
            <HouseMotif
              className="pointer-events-none absolute -bottom-6 left-0 hidden h-56 w-56 text-gold-deep opacity-[0.08] lg:block"
            />
          </div>

          <ul className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
            {SITUATIONS.map((situation) => (
              <li
                key={situation}
                className="flex items-baseline gap-3 border-b border-hairline py-3.5 text-[0.9375rem] text-ink"
              >
                <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-gold" />
                {situation}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
