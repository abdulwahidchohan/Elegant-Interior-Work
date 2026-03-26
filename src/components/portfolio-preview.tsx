"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { portfolioProjects } from "@/lib/portfolio-data";

export function PortfolioPreview() {
  const featured = portfolioProjects.slice(0, 3);

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
        >
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-4">
              Featured Work
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold">
              Recent Projects
            </h2>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
            >
              View All Projects <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/portfolio/${project.id}`} className="group block">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL={project.blurDataURL}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-white/80 text-xs font-medium">
                        {project.category}
                      </span>
                      <p className="text-white font-serif text-lg font-semibold">
                        {project.title}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-primary font-medium mb-1">
                    {project.category}
                  </p>
                  <h3 className="font-serif text-lg font-semibold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
