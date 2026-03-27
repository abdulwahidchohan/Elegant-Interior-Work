"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageCircle, 
  Send, 
  ArrowRight,
  Sparkles,
  Clock
} from "lucide-react";
import { pushToast } from "@/components/ui/toaster";

const PREMIUM_EASE = [0.23, 1, 0.32, 1];

const initialFormState = {
  name: "",
  email: "",
  projectType: "residential-overhaul",
  budgetRange: "10k-50k",
  vision: "",
};

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    value: "hello@elegantinterior.work",
    href: "mailto:hello@elegantinterior.work",
    desc: "For general inquiries and project briefs.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+1 (555) 123-4567",
    href: "https://wa.me/15551234567",
    desc: "Instant communication with our concierge.",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
    desc: "Direct line for urgent structural discussions.",
  },
];

export default function ContactPage() {
  const [formState, setFormState] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        name: formState.name,
        email: formState.email,
        service: formState.projectType,
        message: `Budget range: ${formState.budgetRange}\n\nVision:\n${formState.vision}`,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Contact form submission failed");
      }

      setFormState(initialFormState);
      pushToast({
        variant: "success",
        title: "Brief received",
        description: "We will contact you within one business day.",
      });
    } catch (error) {
      console.error(error);
      pushToast({
        variant: "error",
        title: "Could not submit request",
        description: "Please try again in a few moments.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            GET IN TOUCH
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: PREMIUM_EASE as any }}
            className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-8"
          >
            Start Your <span className="italic text-muted-foreground/50 text-4xl md:text-6xl">Architectural</span> <br />
            Transformation
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100px" }}
            transition={{ duration: 1.2, delay: 0.3, ease: PREMIUM_EASE as any }}
            className="h-1 bg-primary mb-12"
          />
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="container mx-auto px-4 py-24 border-t border-border/50">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left: Contact Info */}
          <div className="lg:col-span-4 space-y-12">
            <div className="space-y-6">
              <h2 className="font-serif text-3xl font-bold">Studio Enquiries</h2>
              <p className="text-muted-foreground leading-relaxed">
                Whether you're planning a full structural renovation or a bespoke interior curation, our team is ready to inhabit your vision.
              </p>
            </div>

            <div className="space-y-8">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.title}
                  href={method.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: PREMIUM_EASE as any }}
                  className="flex gap-6 p-6 rounded-3xl bg-secondary/20 border border-transparent hover:border-primary/20 hover:bg-secondary/40 transition-all duration-700 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white border border-border/50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                    <method.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1">{method.title}</h4>
                    <p className="font-medium text-foreground mb-1">{method.value}</p>
                    <p className="text-xs text-muted-foreground">{method.desc}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="p-8 bg-zinc-950 text-white rounded-3xl space-y-4">
              <div className="flex items-center gap-3 text-primary mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-[10px] font-bold tracking-widest uppercase">Studio Hours</span>
              </div>
              <p className="text-zinc-500 text-sm">Mon — Fri: 09:00 — 18:00</p>
              <p className="text-zinc-500 text-sm">Sat: By appointment only</p>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: PREMIUM_EASE as any }}
              className="bg-background border border-border/50 rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-primary/5"
            >
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground ml-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="Jane Cooper"
                      value={formState.name}
                      onChange={(event) =>
                        setFormState((current) => ({
                          ...current,
                          name: event.target.value,
                        }))
                      }
                      required
                      className="w-full bg-secondary/30 border-none rounded-2xl px-6 py-4 focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground ml-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="jane@example.com"
                      value={formState.email}
                      onChange={(event) =>
                        setFormState((current) => ({
                          ...current,
                          email: event.target.value,
                        }))
                      }
                      required
                      className="w-full bg-secondary/30 border-none rounded-2xl px-6 py-4 focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground ml-1">Project Type</label>
                    <select 
                      id="project-type"
                      title="Select Project Type"
                      value={formState.projectType}
                      onChange={(event) =>
                        setFormState((current) => ({
                          ...current,
                          projectType: event.target.value,
                        }))
                      }
                      className="w-full bg-secondary/30 border-none rounded-2xl px-6 py-4 focus:ring-1 focus:ring-primary outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="residential-overhaul">Residential Overhaul</option>
                      <option value="commercial-space">Commercial Space</option>
                      <option value="interior-curation">Interior Curation</option>
                      <option value="other-enquiry">Other Enquiry</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground ml-1">Budget Range</label>
                    <select 
                      id="budget-range"
                      title="Select Budget Range"
                      value={formState.budgetRange}
                      onChange={(event) =>
                        setFormState((current) => ({
                          ...current,
                          budgetRange: event.target.value,
                        }))
                      }
                      className="w-full bg-secondary/30 border-none rounded-2xl px-6 py-4 focus:ring-1 focus:ring-primary outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="10k-50k">$10k - $50k</option>
                      <option value="50k-200k">$50k - $200k</option>
                      <option value="200k-plus">$200k+</option>
                      <option value="confidential">Confidential</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground ml-1">Your Vision</label>
                  <textarea
                    rows={6}
                    placeholder="Tell us about your space..."
                    value={formState.vision}
                    onChange={(event) =>
                      setFormState((current) => ({
                        ...current,
                        vision: event.target.value,
                      }))
                    }
                    required
                    className="w-full bg-secondary/30 border-none rounded-[2rem] px-6 py-6 focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-4 py-5 bg-primary text-primary-foreground rounded-full font-bold tracking-widest uppercase hover:px-12 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group"
                >
                  {isSubmitting ? "Dispatching..." : "Dispatch Narrative"}
                  <Send className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Concierge Banner */}
      <section className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-zinc-950 rounded-[3rem] p-12 md:p-24 overflow-hidden text-center group"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,190,0,0.05),transparent)]" />
          <div className="relative z-10 space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary">
              <Sparkles className="w-4 h-4" />
              <span className="text-[10px] font-bold tracking-widest uppercase">Instant Estimator</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white">Need an immediate cost brief?</h2>
            <p className="text-zinc-500 max-w-xl mx-auto leading-relaxed">
              Our AI Concierge can provide instant material and architectural cost estimations based on your project volume.
            </p>
            <button className="inline-flex items-center gap-4 px-12 py-5 bg-primary text-primary-foreground rounded-full text-sm font-bold tracking-widest uppercase hover:gap-8 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]">
              Launch AI Concierge <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          {/* Animated light rays or shapes */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-primary/5 rounded-full blur-[100px] animate-pulse delay-700" />
        </motion.div>
      </section>

      {/* Global Presence list */}
      <section className="container mx-auto px-4 py-24 border-t border-border/50">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { city: "New York", address: "123 Architectural Way, NY" },
            { city: "London", address: "45 Design Square, UK" },
            { city: "Milan", address: "8 Rossi Corso, IT" },
            { city: "Dubai", address: "99 Skyline Tower, UAE" },
          ].map((loc) => (
            <div key={loc.city} className="space-y-2">
              <h4 className="font-serif text-xl font-bold">{loc.city}</h4>
              <p className="text-muted-foreground text-sm flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                {loc.address}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
