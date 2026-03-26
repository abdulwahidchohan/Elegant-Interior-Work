"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Camera, MessageCircle, Briefcase } from "lucide-react";

export function ContactSidebar() {
  const container = {
    hidden: { opacity: 0, x: -20 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.1,
        ease: [0.23, 1, 0.32, 1] as any,
        duration: 0.8
      }
    }
  } as const;

  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { 
      opacity: 1, 
      scale: 1,
      transition: { ease: [0.23, 1, 0.32, 1] as any, duration: 0.6 }
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="fixed left-0 top-0 bottom-0 w-16 bg-background border-r border-border/40 z-[100] flex flex-col items-center justify-between py-12 hidden lg:flex"
    >
      <div className="flex flex-col gap-8 mt-20">
        {[
          { icon: Camera, href: "https://instagram.com", label: "Instagram" },
          { icon: MessageCircle, href: "https://wa.me/15551234567", label: "WhatsApp" },
          { icon: Briefcase, href: "https://linkedin.com", label: "LinkedIn" },
        ].map(({ icon: Icon, href, label }) => (
          <motion.a
            key={label}
            href={href}
            variants={item}
            whileHover={{ scale: 1.2, color: "hsl(var(--primary))" }}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Icon className="h-5 w-5" />
          </motion.a>
        ))}
      </div>

      <div className="flex flex-col items-center gap-12 rotate-180 [writing-mode:vertical-lr]">
        <a
          href="mailto:hello@elegantinterior.work"
          className="text-[10px] font-semibold tracking-[0.3em] text-muted-foreground hover:text-primary transition-colors py-2 flex items-center gap-2"
        >
          <Mail className="h-4 w-4 rotate-90" />
          HELLO@ELEGANTINTERIOR.WORK
        </a>
        <div className="w-px h-12 bg-border/50" />
        <a
          href="tel:+15551234567"
          className="text-[10px] font-semibold tracking-[0.3em] text-muted-foreground hover:text-primary transition-colors py-2 flex items-center gap-2"
        >
          <Phone className="h-4 w-4 rotate-90" />
          +1 (555) 123-4567
        </a>
      </div>

      <div className="mt-8">
        <div className="w-1 h-1 rounded-full bg-primary" />
      </div>
    </motion.div>
  );
}
