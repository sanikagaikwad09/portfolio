import { Variants } from "framer-motion";

/**
 * Premium easing curve inspired by Apple/Linear (ease-out cubic-like)
 */
export const premiumEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Fade-in transition with optional direction
 */
export const fadeIn = (
  direction: "up" | "down" | "left" | "right" | "none" = "none",
  duration = 0.8,
  delay = 0
): Variants => {
  return {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 30 : direction === "down" ? -30 : 0,
      x: direction === "left" ? 30 : direction === "right" ? -30 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration,
        delay,
        ease: premiumEase,
      },
    },
  };
};

/**
 * Text reveal animation (Awwwards mask-style)
 * Needs overflow-hidden parent
 */
export const revealUp = (duration = 0.8, delay = 0): Variants => {
  return {
    hidden: {
      y: "110%",
    },
    visible: {
      y: 0,
      transition: {
        duration,
        delay,
        ease: premiumEase,
      },
    },
  };
};

/**
 * Stagger container to orchestrate staggered child entry animations
 */
export const staggerContainer = (
  staggerChildren = 0.1,
  delayChildren = 0
): Variants => {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
};

/**
 * Scale pop animation (ideal for badges, buttons, cards)
 */
export const scaleIn = (duration = 0.6, delay = 0): Variants => {
  return {
    hidden: {
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: premiumEase,
      },
    },
  };
};

/**
 * Float variants for Framer Motion (can supplement the CSS animate-float class)
 */
export const floatMotion: Variants = {
  animate: {
    y: [0, -10, 0],
    rotate: [0, 1.5, -1, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};
export const floatMotionSlow: Variants = {
  animate: {
    y: [0, -15, 0],
    rotate: [0, 2, -2, 0],
    transition: {
      duration: 9,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};
export const floatMotionFast: Variants = {
  animate: {
    y: [0, -8, 0],
    rotate: [0, 3, -1, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};
