"use client";

import React from "react";
import { motion } from "framer-motion";

export function HeroDoodles() {
  // Playful float/wiggle motion config
  const floatAnimation = (delay: number, duration: number) => ({
    y: [0, -12, 0],
    rotate: [0, 6, -6, 0],
    transition: {
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  });

  return (
    <div className="absolute inset-0 pointer-events-none z-10 select-none">
      {/* Star doodle - top center */}
      <motion.svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-[-4%] left-[30%] text-charcoal/15 dark:text-warm-white/15 w-7 h-7"
        animate={floatAnimation(0.2, 7.5)}
      >
        <path
          d="M12 2L14.8 8.6L22 9.2L16.5 13.8L18.2 21L12 17.2L5.8 21L7.5 13.8L2 9.2L9.2 8.6L12 2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>

      {/* Sparkle doodle - top right */}
      <motion.svg
        width="32"
        height="32"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-[8%] right-[-4%] text-accent opacity-50 w-8 h-8"
        animate={floatAnimation(0.8, 6)}
      >
        <path
          d="M17 0C17 9.38889 24.6111 17 34 17C24.6111 17 17 24.6111 17 34C17 24.6111 9.38889 17 0 17C9.38889 17 17 9.38889 17 0Z"
          fill="currentColor"
        />
      </motion.svg>

      {/* Cloud doodle - top left */}
      <motion.svg
        width="48"
        height="32"
        viewBox="0 0 48 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-[18%] left-[-8%] text-charcoal/10 dark:text-warm-white/10 w-11 h-7"
        animate={floatAnimation(1.4, 9)}
      >
        <path
          d="M12 12C12 5.37258 17.3726 0 24 0C29.4792 0 34.072 3.67069 35.5398 8.70832C36.3263 8.24949 37.2323 8 38.2 8C41.348 8 44.0322 10.054 44.974 12.8756C46.7214 13.626 48 15.3621 48 17.4C48 20.4928 45.4928 23 42.4 23H8C3.58172 23 0 19.4183 0 15C0 10.7412 3.3274 7.25997 7.52554 7.01416C8.84715 9.94825 11.8315 12 15.3 12H12Z"
          fill="currentColor"
        />
      </motion.svg>

      {/* Arrow doodle - bottom left */}
      <motion.svg
        width="50"
        height="42"
        viewBox="0 0 56 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-[10%] left-[-6%] text-accent opacity-45 w-12 h-10 -rotate-[15deg]"
        animate={floatAnimation(0.5, 8.2)}
      >
        <path
          d="M6 34C14 30 28 22 40 30M40 30L32 24M40 30L36 38"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>

      {/* Circle loop doodle - bottom right */}
      <motion.svg
        width="54"
        height="54"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-[6%] right-[10%] text-charcoal/10 dark:text-warm-white/10 w-13 h-13"
        animate={floatAnimation(1.8, 10)}
      >
        <circle
          cx="30"
          cy="30"
          r="26"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="6 6"
        />
      </motion.svg>
    </div>
  );
}
