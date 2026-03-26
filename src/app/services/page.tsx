"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Paintbrush, 
  Ruler, 
  Settings, 
  Package, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Clock
} from "lucide-react";

const PREMIUM_EASE = [0.23, 1, 0.32, 1];

const services = [
  {
    title: "Architectural Planning",
    icon: Ruler,
    desc: "Rigorous spatical analysis and structural conceptualization to maximize potential and flow.",
    features: ["Space Optimization", "3D Visualization", "Structural Audits"],
    image: "https://images.unsplash.com/photo-1503387762-592dea58fe21?w=800&q=80",
  },
  {
    title: "Interior Design",
    icon: Paintbrush,
    desc: "Curating bespoke environments through material selection, lighting, and custom millwork.",
    features: ["Bespoke Furniture", "Lighting Design", "Color Theory"],
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
  },
  {
    title: "Project Management",
    icon: Settings,
    desc: "Seamless execution from first sketch to final walkthrough, managing every artisan and timeline.",
    features: ["Vendor Relations", "Timeline Tracking", "Quality Control"],
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?w=800&q=80",
  },
  {
    title: "Material Sourcing",
    icon: Package,
    desc: "Global access to rare textiles, stone, and finishes that define the character of our spaces.",
    features: ["Sustainabile Sourcing", "Rare Textiles", "Stone Selection"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
  },
];

const process = [
  { step: "01", title: "Discovery", desc: "Immersion into your lifestyle, goals, and aesthetic aspirations." },
  { step: "02", title: "Visioning", desc: "Translating concepts into technical blueprints and 3D sensory rooms." },
  { step: "03", title: "Curation", desc: "Meticulous selection of materials, artisans, and finishing touches." },
  { step: "04", title: "Execution", desc: "Rigorous oversight of the physical transformation to exact standards." },
];

export default function ServicesPage() {
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
            OUR EXPERTISE
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: PREMIUM_EASE as any }}
            className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-8"
          >
            World-Class <span className="italic text-muted-foreground/50 text-4xl md:text-6xl">Solutions</span> <br />
            for Exceptional Spaces
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100px" }}
            transition={{ duration: 1.2, delay: 0.3, ease: PREMIUM_EASE as any }}
            className="h-1 bg-primary mb-12"
          />
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 py-24 border-t border-border/50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.1, ease: PREMIUM_EASE as any }}
              className="group relative bg-secondary/20 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row h-full border border-transparent hover:border-primary/20 hover:bg-secondary/40 transition-all duration-700"
            >
              <div className="w-full md:w-1/2 relative min-h-[300px]">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                />
              </div>
              <div className="w-full md:w-1/2 p-10 flex flex-col justify-between">
                <div>
                  <service.icon className="w-10 h-10 text-primary mb-6" />
                  <h2 className="font-serif text-2xl font-bold mb-4">{service.title}</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {service.desc}
                  </p>
                  <ul className="space-y-2 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-xs font-semibold text-zinc-500">
                        <div className="w-1 h-1 rounded-full bg-primary" />
                        {feature.toUpperCase()}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-primary hover:gap-4 transition-all duration-500"
                >
                  Inquire Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-zinc-950 text-white py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-24">
            <p className="text-xs font-bold tracking-[0.4em] text-primary uppercase mb-4">METHODOLOGY</p>
            <h2 className="font-serif text-4xl md:text-6xl font-bold">The Elegant Path</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: PREMIUM_EASE as any }}
                className="relative p-8 border border-white/5 rounded-3xl hover:bg-white/5 transition-colors group"
              >
                <span className="font-serif text-6xl font-bold text-white/5 absolute top-4 right-4 group-hover:text-primary/10 transition-colors">
                  {item.step}
                </span>
                <h3 className="text-xl font-bold mb-4 relative z-10">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed relative z-10">
                  {item.desc}
                </p>
                <div className="mt-8 w-8 h-px bg-primary/30 group-hover:w-full transition-all duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent)]" />
      </section>

      {/* Trust Markers */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: ShieldCheck, title: "Secured Quality", desc: "Rigorous QA checks at every phase of construction." },
            { icon: Zap, title: "Modern Design", desc: "Utilizing 360 viewer rooms and AI-driven spatial planning." },
            { icon: Clock, title: "Timely Delivery", desc: "Respecting your timeline with surgical precision." },
          ].map((item, index) => (
            <div key={item.title} className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h4 className="font-bold">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ / Final CTA */}
      <section className="container mx-auto px-4 py-24 border-t border-border/50 text-center">
        <div className="max-w-2xl mx-auto space-y-12">
          <h2 className="font-serif text-4xl font-bold">Have a specific requirement?</h2>
          <p className="text-muted-foreground leading-relaxed">
            Every architectural challenge is unique. We specialize in tailoring our services to the precise needs of our luxury clientele.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-4 px-12 py-5 bg-primary text-primary-foreground rounded-full text-sm font-bold tracking-widest uppercase hover:px-16 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
            >
              Get a Bespoke Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-4 px-12 py-5 bg-secondary text-foreground rounded-full text-sm font-bold tracking-widest uppercase hover:bg-secondary/80 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
            >
              View Work
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
