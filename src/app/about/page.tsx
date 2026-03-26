"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const PREMIUM_EASE = [0.23, 1, 0.32, 1];

const team = [
  {
    name: "Alexander Vance",
    role: "Principal Architect",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&q=80",
  },
  {
    name: "Elena Rossi",
    role: "Lead Interior Designer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&q=80",
  },
  {
    name: "Marcus Thorne",
    role: "Technical Director",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&q=80",
  },
  {
    name: "Sarah Jenkins",
    role: "Project Coordinator",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&q=80",
  },
];

const philosophy = [
  {
    title: "Craftsmanship",
    desc: "We believe in the power of the hand-crafted, where every detail is a testament to quality.",
  },
  {
    title: "Innovation",
    desc: "Blending timeless design principles with cutting-edge technology and materials.",
  },
  {
    title: "Luxury",
    desc: "Luxury is not a price point, but an experience tailored to the individual story of our clients.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-background pt-32 pb-24 overflow-hidden">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-24">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: PREMIUM_EASE as any }}
            className="text-xs font-semibold tracking-[0.4em] text-primary uppercase mb-6"
          >
            OUR STORY
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: PREMIUM_EASE as any }}
            className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-8"
          >
            Redefining <span className="italic text-muted-foreground/50 text-4xl md:text-6xl">the</span> <br />
            Architectural Experience
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100px" }}
            transition={{ duration: 1.2, delay: 0.3, ease: PREMIUM_EASE as any }}
            className="h-1 bg-primary mb-12"
          />
        </div>
      </section>

      {/* Narrative Section */}
      <section className="container mx-auto px-4 py-24 border-t border-border/50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: PREMIUM_EASE as any }}
            className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000&h=1200&fit=crop&q=90"
              alt="Studio Interior"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: PREMIUM_EASE as any }}
            className="space-y-8"
          >
            <h2 className="font-serif text-4xl font-bold">A Legacy of Design Excellence</h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Founded in 2012, Elegant Interior Work was born from a singular vision: to bridge the gap between architectural precision and interior soul. We believe that a space is more than four walls—it is a sanctuary, a statement, and a story.
              </p>
              <p>
                Our studio operates at the intersection of tradition and technology. By combining time-honored craftsmanship with advanced digital visualization, we allow our clients to inhabit their future spaces before the first stone is laid.
              </p>
            </div>
            <ul className="space-y-4">
              {["Award-winning Global Portfolio", "Sustainability-first Approach", "Bespoke Material Sourcing"].map((point) => (
                <li key={point} className="flex items-center gap-3 text-sm font-medium">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-secondary/30 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.3em] text-muted-foreground uppercase mb-4">OUR DNA</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold">Core Philosophy</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {philosophy.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: PREMIUM_EASE as any }}
                className="p-12 bg-background border border-border/50 rounded-3xl group hover:border-primary/50 transition-colors duration-500"
              >
                <div className="w-12 h-1 bg-primary/20 mb-8 group-hover:w-full transition-all duration-700" />
                <h3 className="font-serif text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-[0.3em] text-muted-foreground uppercase mb-4">THE STUDIO</p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold">Our Masterminds</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: PREMIUM_EASE as any }}
              className="group relative overflow-hidden rounded-3xl"
            >
              <div className="aspect-[4/5] relative">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-xs font-bold tracking-[0.3em] uppercase text-primary mb-1">
                    {member.role}
                  </p>
                  <p className="font-serif text-xl font-bold">{member.name}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24 border-t border-border/50">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary p-12 md:p-24 rounded-[3rem] text-center text-primary-foreground relative overflow-hidden group"
        >
          <div className="relative z-10">
            <h2 className="font-serif text-4xl md:text-6xl font-bold mb-8">Ready to tell your story?</h2>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-4 px-12 py-5 bg-background text-foreground rounded-full text-sm font-bold tracking-widest uppercase hover:px-16 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
            >
              Start a Conversation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-1000" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-32 -mb-32 group-hover:scale-150 transition-transform duration-1000" />
        </motion.div>
      </section>
    </main>
  );
}
