"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const partners = [
  { name: "Aria Architects", logo: "https://images.unsplash.com/photo-1599305090598-fe179d501c27?w=300&h=150&fit=crop&q=80" }, // Minimal vector-style
  { name: "Zenith Studio", logo: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?w=300&h=150&fit=crop&q=80" },
  { name: "Nova Interior", logo: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=300&h=150&fit=crop&q=80" },
  { name: "Luxe Materials", logo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=150&fit=crop&q=80" },
  { name: "Stark Structures", logo: "https://images.unsplash.com/photo-1503387762-592dea58fe21?w=300&h=150&fit=crop&q=80" },
  { name: "Aether Design", logo: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=300&h=150&fit=crop&q=80" },
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
