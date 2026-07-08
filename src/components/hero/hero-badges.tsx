"use client";

import React from "react";
import { motion } from "framer-motion";

interface HeroBadgesProps {
  badges: string[];
}

export function HeroBadges({ badges }: HeroBadgesProps) {
  return (
    <div className="flex flex-wrap gap-3 mt-8 max-w-lg">
      {badges.map((badge, idx) => (
        <motion.span
          key={badge}
          className="px-4 py-2 text-xs font-sans font-medium rounded-full glass-panel border border-charcoal/5 dark:border-warm-white/5 text-charcoal/80 dark:text-warm-white/80 cursor-default select-none shadow-xs"
          whileHover={{ 
            scale: 1.05,
            y: -2,
            borderColor: "rgba(99, 102, 241, 0.4)",
            color: "var(--color-accent)",
            backgroundColor: "rgba(99, 102, 241, 0.03)"
          }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 260, 
            damping: 20,
            delay: 0.5 + idx * 0.1 
          }}
        >
          {badge}
        </motion.span>
      ))}
    </div>
  );
}
