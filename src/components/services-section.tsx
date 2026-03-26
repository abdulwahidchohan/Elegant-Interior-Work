"use client";

import { motion } from "framer-motion";
import {
  Sofa,
  Building2,
  Hotel,
  Paintbrush,
  Ruler,
  Lightbulb,
} from "lucide-react";

const services = [
  {
    icon: Sofa,
    title: "Residential Design",
    description:
      "Transform your home into a personalized sanctuary with our bespoke residential design services.",
  },
  {
    icon: Building2,
    title: "Commercial Spaces",
    description:
      "Create inspiring workplaces that boost productivity and reflect your brand identity.",
  },
  {
    icon: Hotel,
    title: "Hospitality Design",
    description:
      "Craft memorable experiences for guests with carefully curated hospitality environments.",
  },
  {
    icon: Paintbrush,
    title: "Color Consulting",
    description:
      "Master the art of color to create the perfect ambiance for every space.",
  },
  {
    icon: Ruler,
    title: "Space Planning",
    description:
      "Optimize every square foot with intelligent space planning and flow design.",
  },
  {
    icon: Lightbulb,
    title: "Lighting Design",
    description:
      "Illuminate your space with expertly designed layered lighting schemes.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.8,
            ease: [0.23, 1, 0.32, 1]
          }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium tracking-widest text-primary uppercase mb-4">
            What We Offer
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Our Services
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive interior design solutions tailored to your unique vision
            and lifestyle.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.05,
                ease: [0.23, 1, 0.32, 1]
              }}
              className="group p-8 rounded-3xl bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:shadow-2xl hover:shadow-primary/5"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors duration-500">
                <service.icon className="h-7 w-7 text-primary group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
