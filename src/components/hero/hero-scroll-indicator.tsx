"use client";

import React from "react";
import { motion } from "framer-motion";

export function HeroScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10">
      <span className="text-[10px] font-sans tracking-[0.2em] uppercase opacity-40 text-charcoal dark:text-warm-white">
        Scroll
      </span>
      <div className="w-[22px] h-[36px] rounded-full border border-charcoal/20 dark:border-warm-white/20 flex justify-center p-1">
        <motion.div
          className="w-1 bg-accent rounded-full"
          style={{ height: 6 }}
          animate={{
            y: [0, 12, 0],
            opacity: [1, 0.4, 1],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
}
