"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { PortfolioProject } from "@/lib/portfolio-data";

interface PortfolioGridProps {
  projects: PortfolioProject[];
}

const categories = ["All", "Residential", "Commercial", "Hospitality"];

export function PortfolioGrid({ projects }: PortfolioGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-10 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="masonry-grid">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ 
                duration: 0.6,
                delay: index * 0.05,
                ease: [0.23, 1, 0.32, 1]
              }}
              className="masonry-item"
            >
              <Link href={`/portfolio/${project.id}`} className="group block">
                <div className="relative rounded-2xl overflow-hidden">
                  <div
                    className="relative"
                    style={{
                      paddingBottom: index % 3 === 0 ? "133%" : "75%",
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="text-white/70 text-xs font-medium mb-1">
                        {project.category}
                      </p>
                      <h3 className="text-white font-serif text-lg font-bold">
                        {project.title}
                      </h3>
                      <p className="text-white/60 text-xs mt-1">
                        {project.location} · {project.year}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
