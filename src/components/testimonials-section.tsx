"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Alexandra Chen",
    role: "Homeowner, Manhattan",
    content:
      "Elegant Interior Work transformed our apartment beyond our wildest dreams. The attention to detail and the way they understood our lifestyle was extraordinary.",
    rating: 5,
    avatar: "AC",
  },
  {
    name: "James Morrison",
    role: "CEO, Morrison & Co",
    content:
      "Our new office space has completely changed the way our team works and how clients perceive us. The design is sophisticated, functional, and breathtaking.",
    rating: 5,
    avatar: "JM",
  },
  {
    name: "Sophie Laurent",
    role: "Hotel Director, Le Luxe Paris",
    content:
      "They delivered a lobby design that perfectly captures our brand essence. Guest feedback has been overwhelmingly positive since the renovation.",
    rating: 5,
    avatar: "SL",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium tracking-widest text-primary uppercase mb-4">
            Client Love
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold">
            What Clients Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-card border border-border"
            >
              <Quote className="h-8 w-8 text-primary/30 mb-4" />
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {testimonial.content}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
