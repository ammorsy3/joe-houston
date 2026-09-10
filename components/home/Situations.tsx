import { HouseMotif } from "@/components/ui/HouseMotif";

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
      className="relative overflow-hidden bg-ink"
    >
      {/* The one dark band on the page — a beat of contrast between the
          cream sections, with the gold and terracotta accents at their
          brightest against it. */}
      <div aria-hidden="true" className="gilded absolute inset-x-0 top-0 h-[2px]" />
      <div
        aria-hidden="true"
        className="glow pointer-events-none -top-20 -right-16 h-[30rem] w-[30rem] opacity-40"
      />

      <div className="reveal relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-20">
          <div className="relative">
            <h2
              id="situations-heading"
              className="display text-[clamp(2.25rem,4.6vw,3.5rem)] text-paper"
            >
              Who we buy from
            </h2>
            <p className="mt-5 max-w-[58ch] text-[1.0625rem] leading-[1.7] text-paper/70">
              You do not need every one of these to apply. One is enough to be
              worth a conversation.
            </p>
            <HouseMotif
              className="pointer-events-none absolute -bottom-6 left-0 hidden h-56 w-56 text-gold opacity-[0.1] lg:block"
            />
          </div>

          <ul className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
            {SITUATIONS.map((situation) => (
              <li
                key={situation}
                className="flex items-baseline gap-3 border-b border-white/10 py-3.5 text-[0.9375rem] text-paper/90"
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
