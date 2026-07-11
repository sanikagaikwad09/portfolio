"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const IMAGES = [
  { id: 1, src: "/assets/hero-1.jpg", alt: "Sanika Gaikwad - Portrait 1" },
  { id: 2, src: "/assets/hero-2.jpg", alt: "Sanika Gaikwad - Portrait 2" },
  { id: 3, src: "/assets/hero-3.jpg", alt: "Sanika Gaikwad - Portrait 3" },
  { id: 4, src: "/assets/hero-4.jpg", alt: "Sanika Gaikwad - Portrait 4" },
  { id: 5, src: "/assets/hero-5.jpg", alt: "Sanika Gaikwad - Ghibli Illustration" }
];

// Boomerang sequence path: 1 -> 2 -> 3 -> 4 -> Ghibli (5) -> 4 -> 3 -> 2 -> repeat
const SEQUENCE = [0, 1, 2, 3, 4, 3, 2, 1];

export function HeroImageCarousel() {
  const [step, setStep] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax tilt tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const tiltX = useSpring(mouseY, { stiffness: 100, damping: 22 });
  const tiltY = useSpring(mouseX, { stiffness: 100, damping: 22 });

  // Rotate coordinates slightly for 3D tilt
  const rotateX = useTransform(tiltX, [-150, 150], [6, -6]);
  const rotateY = useTransform(tiltY, [-150, 150], [-6, 6]);

  const startCarousel = () => {
    stopCarousel();
    intervalRef.current = setInterval(() => {
      setStep((prevStep) => (prevStep + 1) % SEQUENCE.length);
    }, 3800);
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
    const el = containerRef.current;
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

  const currentImage = IMAGES[SEQUENCE[step]];

  return (
    <div className="relative w-full flex items-center justify-center p-2 select-none overflow-visible">
      {/* Soft rounded ambient shadow & glow behind portrait (no enclosing box) */}
      <motion.div 
        className="absolute w-[60%] h-[75%] bg-charcoal/5 dark:bg-accent/15 rounded-full filter blur-[50px] pointer-events-none z-0" 
        style={{ transform: "translateZ(-15px)" }}
        animate={{
          scale: isHovered ? 1.05 : [1, 1.06, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        ref={containerRef}
        // Scaled bounds: Increased width by 25% for a larger, more balanced visual weight. Removed all enclosing box parameters.
        className={cn(
          "relative w-full max-w-[390px] sm:max-w-[430px] md:max-w-[480px] aspect-[4/5] cursor-pointer flex items-center justify-center z-10 overflow-visible"
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
          y: isHovered ? -6 : [0, -12, 0],
          scale: isHovered ? 1.04 : 1,
          rotate: isHovered ? 0 : [0, 1, -1, 0],
        }}
        transition={{
          y: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          },
          rotate: {
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          },
          scale: {
            type: "spring",
            stiffness: 220,
            damping: 18,
          }
        }}
      >
        {/* Concurrent crossfade: AnimatePresence does not use mode="wait" so images crossfade without blinking */}
        <AnimatePresence>
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.03, y: -8 }}
            transition={{ 
              type: "spring",
              stiffness: 85,
              damping: 24,
              opacity: { duration: 0.7, ease: "easeInOut" }
            }}
            className="absolute inset-0 w-full h-full"
            style={{ transform: "translateZ(25px)" }}
          >
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 480px"
              // mix-blend-multiply renders white pixels transparent to reveal the grid background.
              // dark mode inverts illustration layers and applies mix-blend-screen so black background blends transparently.
              className="object-contain object-center pointer-events-none transition-transform duration-700 hover:scale-[1.02] mix-blend-multiply dark:mix-blend-screen dark:invert dark:hue-rotate-180"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
