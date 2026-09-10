import { MobileCallBar } from "@/components/layout/MobileCallBar";
import { BenefitsMarquee } from "@/components/home/BenefitsMarquee";
import { ClosingCta } from "@/components/home/ClosingCta";
import { Comparison } from "@/components/home/Comparison";
import { Faq } from "@/components/home/Faq";
import { GetOffer } from "@/components/home/GetOffer";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Situations } from "@/components/home/Situations";
import { Testimonials } from "@/components/home/Testimonials";
import { WhatWeBuy } from "@/components/home/WhatWeBuy";

/**
 * The hero and timeline show dates counted from today, so the page is rebuilt
 * hourly rather than frozen at deploy time.
 */
export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      <Hero />
      <BenefitsMarquee />
      <Comparison />
      <WhatWeBuy />
      <HowItWorks />
      <Situations />
      <Testimonials />
      <GetOffer />
      <Faq />
      <ClosingCta />
      <MobileCallBar />
    </>
  );
}
