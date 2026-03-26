"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Calendar, Tag, Play } from "lucide-react";
import type { PortfolioProject } from "@/lib/portfolio-data";
import { BeforeAfterSlider } from "./before-after-slider";
import { useState } from "react";
import dynamic from "next/dynamic";

const PanoramaViewer = dynamic(
  () => import("./panorama-viewer").then((mod) => mod.PanoramaViewer),
  { 
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-md">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }
);

interface ProjectModalProps {
  project: PortfolioProject;
}

export function ProjectModal({ project }: ProjectModalProps) {
  const router = useRouter();
  const [showPanorama, setShowPanorama] = useState(false);

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && handleClose()}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ 
            duration: 0.6,
            ease: [0.23, 1, 0.32, 1]
          }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-background rounded-3xl"
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/40 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="relative aspect-video w-full">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover rounded-t-3xl"
              placeholder="blur"
              blurDataURL={project.blurDataURL}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent rounded-t-3xl" />
            {project.panoramaImageUrl && !showPanorama && (
              <button
                onClick={() => setShowPanorama(true)}
                className="absolute inset-0 flex items-center justify-center group/btn"
              >
                <div className="flex flex-col items-center gap-3 px-6 py-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/20 group-hover/btn:bg-primary/60 transition-all">
                  <Play className="h-8 w-8 text-white fill-white" />
                  <span className="text-white text-xs font-bold tracking-widest uppercase">Start 360° Experience</span>
                </div>
              </button>
            )}
            {showPanorama && project.panoramaImageUrl && (
              <div className="absolute inset-0 z-20">
                <PanoramaViewer imageUrl={project.panoramaImageUrl} />
                <button 
                  onClick={() => setShowPanorama(false)}
                  className="absolute top-4 left-4 px-3 py-1.5 bg-black/60 backdrop-blur-md text-white rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-black/80 transition-colors"
                >
                  Exit 360°
                </button>
              </div>
            )}
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>

            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">
              {project.title}
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-primary" />
                {project.location}
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-primary" />
                {project.year}
              </div>
              <div className="flex items-center gap-1.5">
                <Tag className="h-4 w-4 text-primary" />
                {project.category}
              </div>
            </div>

            {project.beforeImageUrl && project.afterImageUrl && (
              <div className="mb-6">
                <h3 className="font-serif text-2xl font-bold mb-4">
                  Before &amp; After
                </h3>
                <BeforeAfterSlider
                  beforeImage={project.beforeImageUrl}
                  afterImage={project.afterImageUrl}
                  beforeLabel="Before"
                  afterLabel="After"
                />
              </div>
            )}

            {project.dominantColors && (
              <div>
                <h3 className="font-semibold text-sm mb-3">Color Palette</h3>
                <div className="flex gap-2">
                  {project.dominantColors.map((color) => (
                    <div
                      key={color}
                      className="w-8 h-8 rounded-full border border-border"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
