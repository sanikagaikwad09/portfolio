"use client";

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeroImageProps {
  className?: string;
}

const IMAGES = [
  { id: 1, label: "AI Enhanced Photo 1", gradient: "from-indigo-600/20 via-purple-500/25 to-pink-500/20" },
  { id: 2, label: "AI Enhanced Photo 2", gradient: "from-rose-500/20 via-orange-400/25 to-amber-300/20" },
  { id: 3, label: "Ghibli Illustration", gradient: "from-teal-500/20 via-emerald-400/25 to-cyan-500/20" }
];

export function HeroImage({ className }: HeroImageProps) {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for 3D parallax tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for tilt physics
  const springX = useSpring(x, { stiffness: 120, damping: 20 });
  const springY = useSpring(y, { stiffness: 120, damping: 20 });

  // Map coordinates to degrees of tilt rotation
  const rotateX = useTransform(springY, [-180, 180], [8, -8]);
  const rotateY = useTransform(springX, [-180, 180], [-8, 8]);

  const startRotation = () => {
    stopRotation();
    intervalRef.current = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % IMAGES.length);
    }, 4500);
  };

  const stopRotation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    if (!isHovered) {
      startRotation();
    } else {
      stopRotation();
    }
    return () => stopRotation();
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative w-full flex items-center justify-center p-6 select-none">
      <motion.div
        ref={cardRef}
        className={cn(
          "relative w-full max-w-[340px] md:max-w-[380px] aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-charcoal/10 dark:border-warm-white/10 bg-warm-white-muted/20 dark:bg-charcoal-muted/30 shadow-[0_30px_100px_rgba(0,0,0,0.12)] dark:shadow-[0_30px_100px_rgba(0,0,0,0.4)] cursor-pointer flex items-center justify-center",
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        // Float animation
        animate={{
          y: isHovered ? 0 : [0, -10, 0],
        }}
        transition={{
          y: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }
        }}
      >
        {/* Glow behind image card */}
        <div className="absolute inset-0 bg-radial-glow opacity-30 z-0 pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full flex flex-col justify-between p-10 z-10"
            style={{ transform: "translateZ(30px)" }}
          >
            {/* Visual Borders */}
            <div className="absolute inset-6 rounded-[1.8rem] border border-charcoal/5 dark:border-warm-white/5 pointer-events-none" />

            {/* Inner background gradient */}
            <div className={cn("absolute inset-0 bg-gradient-to-tr opacity-100 mix-blend-multiply dark:mix-blend-screen transition-all duration-1000", IMAGES[index].gradient)} />

            {/* Frame Details */}
            <div className="flex justify-between items-center w-full relative z-20">
              <span className="text-[10px] tracking-[0.25em] font-sans font-bold uppercase opacity-30 text-charcoal dark:text-warm-white">
                S.G // PORTFOLIO
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow" />
            </div>

            <div className="flex flex-col gap-2 relative z-20">
              <span className="text-[10px] tracking-[0.2em] font-sans font-bold uppercase opacity-40 text-charcoal dark:text-warm-white">
                0{IMAGES[index].id} / PHOTO SHOWCASE
              </span>
              <span className="text-2xl font-display font-extrabold tracking-tight text-charcoal/90 dark:text-warm-white/90">
                {IMAGES[index].label}
              </span>
              <span className="text-[10px] font-sans opacity-30">
                Hover to tilt and pause.
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
