"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const partners = [
  { name: "Luxury Living", logo: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=200&h=100&fit=crop&q=80" },
  { name: "Urban Build", logo: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=200&h=100&fit=crop&q=80" },
  { name: "Modern Home", logo: "https://images.unsplash.com/photo-1614853316476-de00d14cb1fc?w=200&h=100&fit=crop&q=80" },
  { name: "Design Plus", logo: "https://images.unsplash.com/photo-1614850523459-c2f4c699052e?w=200&h=100&fit=crop&q=80" },
  { name: "Elite Interiors", logo: "https://images.unsplash.com/photo-1614850523537-831804b4070a?w=200&h=100&fit=crop&q=80" },
  { name: "Prime Arch", logo: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=200&h=100&fit=crop&q=80" },
];

export function PartnersSection() {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.3em] text-muted-foreground uppercase mb-4">
            Trusted Partners
          </p>
          <div className="w-12 h-0.5 bg-primary/30 mx-auto" />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12 items-center justify-items-center">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6,
                delay: index * 0.05,
                ease: [0.23, 1, 0.32, 1]
              }}
              className="partner-logo w-full max-w-[120px] aspect-[2/1] relative grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100px, 120px"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
