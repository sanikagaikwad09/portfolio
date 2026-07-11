"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function HeroDoodles() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for tracking
  const springX = useSpring(mouseX, { stiffness: 100, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Scale coordinates relative to viewport center
      const x = (e.clientX - window.innerWidth / 2) / 40;
      const y = (e.clientY - window.innerHeight / 2) / 40;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Transform coordinates for parallax depth layering
  const doodleX1 = useTransform(springX, (val) => val * 0.8);
  const doodleY1 = useTransform(springY, (val) => val * 0.8);
  
  const doodleX2 = useTransform(springX, (val) => val * -0.5);
  const doodleY2 = useTransform(springY, (val) => val * -0.5);

  const doodleX3 = useTransform(springX, (val) => val * 1.3);
  const doodleY3 = useTransform(springY, (val) => val * 1.3);

  // Wobbly wiggling and breathing (scale/opacity) loop presets
  const floatAnim = (delay: number, duration: number) => ({
    y: [0, -10, 0],
    rotate: [0, 3, -3, 0],
    scale: [1, 1.03, 1],
    opacity: [0.45, 0.6, 0.45],
    transition: {
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  });

  return (
    <div className="absolute inset-0 pointer-events-none z-10 select-none">
      {/* Doodle 1: Sparkle - top right */}
      <motion.div
        className="absolute top-[8%] right-[-3%] text-accent w-8 h-8"
        style={{ x: doodleX1, y: doodleY1 }}
        animate={floatAnim(0.2, 7.2)}
      >
        <svg width="100%" height="100%" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 0C17 9.38889 24.6111 17 34 17C24.6111 17 17 24.6111 17 34C17 24.6111 9.38889 17 0 17C9.38889 17 17 9.38889 17 0Z" fill="currentColor"/>
        </svg>
      </motion.div>

      {/* Doodle 2: Star - top left */}
      <motion.div
        className="absolute top-[12%] left-[-3%] text-charcoal/15 dark:text-warm-white/15 w-7 h-7"
        style={{ x: doodleX2, y: doodleY2 }}
        animate={floatAnim(0.8, 8.5)}
      >
        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L14.8 8.6L22 9.2L16.5 13.8L18.2 21L12 17.2L5.8 21L7.5 13.8L2 9.2L9.2 8.6L12 2Z" />
        </svg>
      </motion.div>

      {/* Doodle 3: Arrow - bottom left pointing to carousel */}
      <motion.div
        className="absolute bottom-[14%] left-[-7%] text-accent w-12 h-10 -rotate-12"
        style={{ x: doodleX3, y: doodleY3 }}
        animate={floatAnim(0.5, 6.2)}
      >
        <svg width="100%" height="100%" viewBox="0 0 56 48" fill="none" stroke="currentColor" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 34C14 30 28 22 40 30M40 30L32 24M40 30L36 38" />
        </svg>
      </motion.div>

      {/* Doodle 4: Speech Bubble - bottom right */}
      <motion.div
        className="absolute bottom-[22%] right-[-5%] text-charcoal/15 dark:text-warm-white/15 w-7 h-7"
        style={{ x: doodleX2, y: doodleY2 }}
        animate={floatAnim(1.2, 9)}
      >
        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <circle cx="9" cy="10" r="0.8" fill="currentColor"/>
          <circle cx="12" cy="10" r="0.8" fill="currentColor"/>
          <circle cx="15" cy="10" r="0.8" fill="currentColor"/>
        </svg>
      </motion.div>

      {/* Doodle 5: Dash Circle loop - bottom right corner */}
      <motion.div
        className="absolute bottom-[2%] right-[3%] text-charcoal/10 dark:text-warm-white/10 w-12 h-12"
        style={{ x: doodleX1, y: doodleY1 }}
        animate={floatAnim(1.6, 7.8)}
      >
        <svg width="100%" height="100%" viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6">
          <circle cx="30" cy="30" r="26" />
        </svg>
      </motion.div>
    </div>
  );
}
