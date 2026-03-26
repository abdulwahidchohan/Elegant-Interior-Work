import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { PortfolioPreview } from "@/components/portfolio-preview";
import { StatsSection } from "@/components/stats-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { PartnersSection } from "@/components/partners-section";
import { ContactSection } from "@/components/contact-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <PortfolioPreview />
      <StatsSection />
      <TestimonialsSection />
      <PartnersSection />
      <ContactSection />
    </>
  );
}
