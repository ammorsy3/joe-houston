/**
 * The same facts as the hero's stat rail and the comparison table, repeated
 * as a drifting strip — a moment of motion right under the fold, not a new
 * set of claims.
 */
const BENEFITS = [
  "24-hour written offers",
  "14-day closings",
  "Any condition, no repairs",
  "$0 commissions or fees",
  "Cash — no financing contingency",
];

function BenefitItem({ text }: { text: string }) {
  return (
    <span className="flex shrink-0 items-center gap-8 pr-8 text-[0.9375rem] font-semibold whitespace-nowrap text-paper">
      {text}
      <span aria-hidden="true" className="text-gold">
        &bull;
      </span>
    </span>
  );
}

export function BenefitsMarquee() {
  return (
    <div className="relative overflow-hidden bg-ink">
      <div aria-hidden="true" className="gilded absolute inset-x-0 top-0 h-[2px]" />

      {/* One clean pass for assistive tech — the looping, duplicated track below is decorative. */}
      <span className="sr-only">{BENEFITS.join(". ")}.</span>

      <div aria-hidden="true" className="marquee-track flex w-max py-3.5 lg:py-4">
        <div className="flex shrink-0 pl-8">
          {BENEFITS.map((text) => (
            <BenefitItem key={text} text={text} />
          ))}
        </div>
        <div className="flex shrink-0 pl-8 motion-reduce:hidden">
          {BENEFITS.map((text) => (
            <BenefitItem key={`repeat-${text}`} text={text} />
          ))}
        </div>
      </div>
    </div>
  );
}
