import "./home.css";
import { Masthead } from "@/components/home/masthead";
import { Iosp2026 } from "@/components/home/iosp-2026";
import { HowItWorks } from "@/components/home/how-it-works";
import { PullQuote } from "@/components/home/pull-quote";
import { ScienceShouldBe } from "@/components/home/science-should-be";
import { TimeToBuild } from "@/components/home/time-to-build";
import { InfrastructureEmerging } from "@/components/home/infrastructure-emerging";
import { Recap2025 } from "@/components/home/recap-2025";
import { Voices } from "@/components/home/voices";
import { StayConnected } from "@/components/home/stay-connected";
import { SiteFooter } from "@/components/home/site-footer";

export default function HomePage() {
  return (
    <>
      <Masthead />
      <Iosp2026 />
      <HowItWorks />
      <ScienceShouldBe />
      <TimeToBuild />
      <PullQuote />
      <InfrastructureEmerging />
      <Recap2025 />
      <Voices />
      <StayConnected />
      <SiteFooter />
    </>
  );
}
