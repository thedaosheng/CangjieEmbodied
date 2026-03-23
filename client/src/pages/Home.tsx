/*
 * Design: Industrial Cyberpunk — 仓颉具身AI BP Landing Page
 * 4-Step Narrative Framework: What → Why Now → How → Why Us
 */
import Navbar from "@/components/Navbar";
import StoryNav from "@/components/StoryNav";
import HeroSection from "@/components/HeroSection";
import WhyNowSection from "@/components/WhyNowSection";
import SolutionSection from "@/components/SolutionSection";
import WhyUsSection from "@/components/WhyUsSection";
import FooterSection from "@/components/FooterSection";

function Divider() {
  return (
    <div className="relative h-px">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon/20 to-transparent" />
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white overflow-x-hidden">
      <Navbar />
      <StoryNav sectionIds={["hero", "why-now", "how", "why-us"]} />
      <HeroSection />
      <Divider />
      <WhyNowSection />
      <Divider />
      <SolutionSection />
      <Divider />
      <WhyUsSection />
      <Divider />
      <FooterSection />
    </div>
  );
}
