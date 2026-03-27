import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import { PortfolioSkeleton } from "@/components/portfolio/portfolio-skeleton";
import { portfolioProjects } from "@/lib/portfolio-data";

export const metadata = {
  title: "Portfolio | Elegant Interior Work",
  description: "Explore our curated collection of luxury interior design projects.",
};

export default function PortfolioPage() {
  const categoryCount = new Set(portfolioProjects.map((project) => project.category)).size;
  const newestYear = Math.max(...portfolioProjects.map((project) => project.year));

  return (
    <div className="min-h-screen pt-20 pb-14">
      <div className="container mx-auto px-4 py-12 space-y-14">
        <section className="relative overflow-hidden rounded-[2.25rem] border border-border/60 bg-gradient-to-br from-background via-background to-secondary/25 px-6 py-12 md:px-10 md:py-14 lg:px-14">
          <div className="absolute -right-16 -top-14 h-52 w-52 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -left-20 bottom-0 h-44 w-44 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1.35fr_0.9fr] lg:items-end">
            <div>
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-[11px] font-semibold tracking-[0.24em] text-primary uppercase">
                <Sparkles className="h-4 w-4" />
                Signature Work
              </p>
              <h1 className="font-serif text-4xl font-bold leading-tight md:text-6xl xl:text-7xl">
                Portfolio <span className="text-primary italic">that feels lived in.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Browse transformations that blend architectural clarity, material richness,
                and tailored storytelling for homes, workplaces, and hospitality spaces.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-500 hover:gap-3 hover:bg-primary/90"
                >
                  Start Your Project
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="text-sm text-muted-foreground">
                  Curated for private residences and premium commercial interiors.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="rounded-2xl border border-border/70 bg-background/80 p-4 sm:p-5">
                <p className="text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                  Projects
                </p>
                <p className="mt-2 font-serif text-3xl font-bold">{portfolioProjects.length}</p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/80 p-4 sm:p-5">
                <p className="text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                  Categories
                </p>
                <p className="mt-2 font-serif text-3xl font-bold">{categoryCount}</p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/80 p-4 sm:p-5 col-span-2">
                <p className="text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                  Latest Showcase Year
                </p>
                <p className="mt-2 font-serif text-3xl font-bold">{newestYear}</p>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-3">
            Explore Collection
          </p>
          <p className="text-muted-foreground text-base md:text-lg">
            Filter by category, search by title or location, and dive into each story for
            before-and-after and immersive panoramic views.
          </p>
        </div>

        <Suspense fallback={<PortfolioSkeleton />}>
          <PortfolioGrid projects={portfolioProjects} />
        </Suspense>
      </div>
    </div>
  );
}
