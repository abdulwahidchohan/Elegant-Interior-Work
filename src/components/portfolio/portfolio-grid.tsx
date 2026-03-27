"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Search, SlidersHorizontal } from "lucide-react";
import type { PortfolioProject } from "@/lib/portfolio-data";

interface PortfolioGridProps {
  projects: PortfolioProject[];
}

type SortMode = "newest" | "oldest" | "az";

export function PortfolioGrid({ projects }: PortfolioGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("newest");

  const categories = useMemo(() => {
    const countMap = new Map<string, number>();
    projects.forEach((project) => {
      countMap.set(project.category, (countMap.get(project.category) ?? 0) + 1);
    });

    return [
      { label: "All", count: projects.length },
      ...Array.from(countMap.entries())
        .map(([label, count]) => ({ label, count }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    ];
  }, [projects]);

  const filtered = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    let next =
      activeCategory === "All"
        ? [...projects]
        : projects.filter((project) => project.category === activeCategory);

    if (query) {
      next = next.filter((project) => {
        return (
          project.title.toLowerCase().includes(query) ||
          project.location.toLowerCase().includes(query) ||
          project.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      });
    }

    if (sortMode === "newest") {
      next.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
    } else if (sortMode === "oldest") {
      next.sort((a, b) => a.year - b.year || a.title.localeCompare(b.title));
    } else {
      next.sort((a, b) => a.title.localeCompare(b.title));
    }

    return next;
  }, [activeCategory, projects, searchTerm, sortMode]);

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-border/70 bg-secondary/25 p-4 md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by title, city, or style tag"
              className="h-11 w-full rounded-full border border-border/70 bg-background pl-11 pr-4 text-sm outline-none transition-colors focus:border-primary"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-4 py-2 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Sort
            </div>
            <select
              value={sortMode}
              onChange={(event) => setSortMode(event.target.value as SortMode)}
              title="Sort projects"
              className="h-11 rounded-full border border-border/70 bg-background px-4 text-sm outline-none transition-colors focus:border-primary"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="az">Alphabetical</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(cat.label)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-[0.12em] uppercase transition-all ${
                activeCategory === cat.label
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat.label}
              <span className="rounded-full bg-black/10 px-2 py-0.5 text-[10px] leading-none">
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border/80 p-12 text-center">
          <p className="font-serif text-2xl font-bold mb-2">No matching projects</p>
          <p className="text-muted-foreground mb-5">
            Try another category or adjust your search keywords.
          </p>
          <button
            onClick={() => {
              setActiveCategory("All");
              setSearchTerm("");
            }}
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="masonry-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.035,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="masonry-item"
              >
                <Link href={`/portfolio/${project.id}`} className="group block">
                  <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-black shadow-xl shadow-black/10 transition-transform duration-700 group-hover:-translate-y-1">
                    <div
                      className="relative"
                      style={{
                        paddingBottom: index % 3 === 0 ? "130%" : "76%",
                      }}
                    >
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105"
                        placeholder="blur"
                        blurDataURL={project.blurDataURL}
                      />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/5" />

                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                      <p className="mb-2 text-[10px] font-semibold tracking-[0.2em] text-primary uppercase">
                        {project.category}
                      </p>
                      <h3 className="font-serif text-xl font-bold text-white sm:text-2xl">
                        {project.title}
                      </h3>
                      <p className="mt-1 text-xs text-white/70 sm:text-sm">
                        {project.location} · {project.year}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 2).map((tag) => (
                          <span
                            key={`${project.id}-${tag}`}
                            className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-white/90"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white/90 transition-all group-hover:gap-3">
                        View Case Study
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
