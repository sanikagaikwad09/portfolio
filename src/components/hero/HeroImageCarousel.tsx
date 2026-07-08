"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const IMAGES = [
  { id: 1, src: "/assets/hero-1.jpg", alt: "Sanika Gaikwad - AI Portrait 1" },
  { id: 2, src: "/assets/hero-2.jpg", alt: "Sanika Gaikwad - AI Portrait 2" },
  { id: 3, src: "/assets/hero-3.jpg", alt: "Sanika Gaikwad - Ghibli Illustration" }
];

export function HeroImageCarousel() {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Parallax tilt tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const tiltX = useSpring(mouseY, { stiffness: 120, damping: 20 });
  const tiltY = useSpring(mouseX, { stiffness: 120, damping: 20 });

  const rotateX = useTransform(tiltX, [-150, 150], [7, -7]);
  const rotateY = useTransform(tiltY, [-150, 150], [-7, 7]);

  const startCarousel = () => {
    stopCarousel();
    intervalRef.current = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % IMAGES.length);
    }, 3800); // Cycles every 3.8s
  };

  const stopCarousel = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    if (!isHovered) {
      startCarousel();
    } else {
      stopCarousel();
    }
    return () => stopCarousel();
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="relative w-full flex items-center justify-center p-4 select-none">
      <motion.div
        ref={cardRef}
        className={cn(
          "relative w-full max-w-[330px] sm:max-w-[360px] md:max-w-[390px] aspect-[4/5] rounded-[2.2rem] overflow-hidden border border-charcoal/10 dark:border-warm-white/10 bg-warm-white-muted/20 dark:bg-charcoal-muted/30 shadow-[0_25px_80px_rgba(0,0,0,0.12)] dark:shadow-[0_25px_80px_rgba(0,0,0,0.45)] cursor-pointer flex items-center justify-center z-10"
        )}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          y: isHovered ? 0 : [0, -8, 0],
        }}
        transition={{
          y: {
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
          }
        }}
      >
        {/* Soft color backdrop matching active image theme */}
        <div className="absolute inset-0 bg-radial-glow opacity-30 z-0 pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
            style={{ transform: "translateZ(20px)" }}
          >
            <Image
              src={IMAGES[index].src}
              alt={IMAGES[index].alt}
              fill
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover object-center pointer-events-none transition-transform duration-700 hover:scale-[1.07]"
            />
          </motion.div>
        </AnimatePresence>

        {/* Premium subtle inner glass frame details */}
        <div className="absolute inset-5 rounded-[1.8rem] border border-white/10 dark:border-white/5 pointer-events-none z-20" />
        
        {/* Active Index Indicator */}
        <div className="absolute bottom-6 right-8 bg-charcoal/40 dark:bg-warm-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full z-20 text-[10px] tracking-widest font-mono text-warm-white flex items-center gap-1.5 border border-white/10">
          <span>0{IMAGES[index].id}</span>
          <span className="opacity-40">/</span>
          <span className="opacity-40">0{IMAGES.length}</span>
        </div>
      </motion.div>
    </div>
  );
}
