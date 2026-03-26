import { Suspense } from "react";
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import { PortfolioSkeleton } from "@/components/portfolio/portfolio-skeleton";
import { portfolioProjects } from "@/lib/portfolio-data";

export const metadata = {
  title: "Portfolio | Elegant Interior Work",
  description: "Explore our curated collection of luxury interior design projects.",
};

export default function PortfolioPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-4">
            Our Work
          </p>
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6">
            Portfolio
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every project is a unique story of transformation, crafted with precision
            and passion for exceptional living spaces.
          </p>
        </div>
        <Suspense fallback={<PortfolioSkeleton />}>
          <PortfolioGrid projects={portfolioProjects} />
        </Suspense>
      </div>
    </div>
  );
}
