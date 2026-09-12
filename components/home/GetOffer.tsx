import { siteConfig } from "@/app/lib/site-config";
import { telHref } from "@/app/lib/utils";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeadForm } from "./LeadForm";

export function GetOffer() {
  return (
    <section
      id="offer"
      aria-labelledby="get-offer-heading"
      className="grain gold-gradient relative scroll-mt-24 overflow-hidden border-t border-hairline"
    >
      <div aria-hidden="true" className="gilded absolute inset-x-0 top-0 h-[2px]" />
      <div
        aria-hidden="true"
        className="glow pointer-events-none top-1/2 -left-24 h-[30rem] w-[30rem] -translate-y-1/2 opacity-25"
      />

      <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        {/* Heading sits centred above both columns. */}
        <div className="reveal mx-auto max-w-2xl text-center">
          <SectionHeading
            id="get-offer-heading"
            align="center"
            title="Ready to see what we'd offer?"
            subhead="Send the address and we'll call with a real, no-obligation number within 24 hours. Rather talk it through first? Call us directly."
            subheadClassName="text-ink/85"
          />

          <div className="mt-8 flex justify-center">
            <Button href={telHref(siteConfig.phone.raw)} size="lg" variant="ink">
              <PhoneIcon />
              Call {siteConfig.phone.display}
            </Button>
          </div>
        </div>

        <div className="reveal mx-auto mt-14 max-w-2xl lg:mt-16">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}

function PhoneIcon() {
  return (
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
  );
}
