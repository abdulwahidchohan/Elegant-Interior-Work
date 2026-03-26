"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const stats = [
  { label: "Completed Projects", value: 150, suffix: "+" },
  { label: "Design Awards", value: 24, suffix: "" },
  { label: "Team Experts", value: 45, suffix: "+" },
  { label: "Years Experience", value: 12, suffix: "" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  const springValue = useSpring(0, {
    stiffness: 60,
    damping: 25,
    restDelta: 0.001
  });

  const displayValue = useTransform(springValue, (latest) => Math.floor(latest));
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  useEffect(() => {
    return displayValue.on("change", (latest) => {
      setCurrent(latest);
    });
  }, [displayValue]);

  return (
    <motion.span ref={ref}>
      {current}
      {suffix}
    </motion.span>
  );
}

export function StatsSection() {
  return (
    <section className="py-24 bg-background border-y border-border/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.23, 1, 0.32, 1]
              }}
              className="text-center"
            >
              <div className="font-serif text-4xl md:text-5xl font-bold text-primary mb-2">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-xs font-semibold tracking-[0.3em] text-muted-foreground uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
