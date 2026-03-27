"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Camera, Briefcase, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { pushToast } from "@/components/ui/toaster";

const footerLinks = [
  { name: "Portfolio", href: "/portfolio" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  { icon: Camera, href: "#", label: "Instagram" },
  { icon: Briefcase, href: "#", label: "LinkedIn" },
  { icon: MessageCircle, href: "#", label: "WhatsApp" },
];

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false);

  const handleNewsletterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newsletterEmail.trim()) {
      pushToast({
        variant: "error",
        title: "Email required",
        description: "Please enter a valid email address.",
      });
      return;
    }

    setIsSubmittingNewsletter(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: newsletterEmail.trim() }),
      });

      if (!response.ok) {
        throw new Error("Newsletter signup failed");
      }

      const result = (await response.json()) as { alreadySubscribed?: boolean };

      setNewsletterEmail("");
      pushToast({
        variant: "success",
        title: result.alreadySubscribed ? "Already subscribed" : "Subscription confirmed",
        description: result.alreadySubscribed
          ? "You are already on our newsletter list."
          : "You will receive design insights and project updates.",
      });
    } catch (error) {
      console.error(error);
      pushToast({
        variant: "error",
        title: "Subscription failed",
        description: "Please try again shortly.",
      });
    } finally {
      setIsSubmittingNewsletter(false);
    }
  };

  return (
    <footer className="bg-zinc-950 text-white py-24 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-8">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl font-bold tracking-tight">
                ELEGANT<span className="text-primary italic">.</span>
              </span>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
              Crafting bespoke architectural environments that blend timeless luxury with modern functionality.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ y: -3, color: "hsl(var(--primary))" }}
                  className="text-zinc-600 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xs font-bold tracking-[0.3em] uppercase text-zinc-400">
              Explorer
            </h4>
            <ul className="space-y-4">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-500 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <h4 className="text-xs font-bold tracking-[0.3em] uppercase text-zinc-400">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-zinc-500">
                <Mail className="w-4 h-4 text-primary" />
                <span>hello@elegantinterior.work</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-500">
                <Phone className="w-4 h-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-500">
                <MapPin className="w-4 h-4 text-primary mt-1" />
                <span>123 Architectural Way,<br />Suite 100, New York, NY</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div className="space-y-6">
            <h4 className="text-xs font-bold tracking-[0.3em] uppercase text-zinc-400">
              Newsletter
            </h4>
            <p className="text-sm text-zinc-500">
              Subscribe for design insights and project updates.
            </p>
            <form className="flex" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="email@example.com"
                value={newsletterEmail}
                onChange={(event) => setNewsletterEmail(event.target.value)}
                required
                className="bg-zinc-900 border-none px-4 py-2 text-sm w-full focus:ring-1 focus:ring-primary transition-all outline-none"
              />
              <button
                type="submit"
                disabled={isSubmittingNewsletter}
                className="bg-primary px-4 py-2 text-xs font-bold tracking-widest uppercase hover:bg-primary/90 transition-colors disabled:opacity-60"
              >
                {isSubmittingNewsletter ? "..." : "Join"}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-700">
            © 2026 Elegant Interior Work. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] text-zinc-700">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
