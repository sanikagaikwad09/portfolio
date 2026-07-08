"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  href,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/50 tracking-wide font-sans select-none";
  
  const variants = {
    primary: "bg-charcoal text-warm-white border border-charcoal/10 hover:shadow-lg dark:bg-warm-white dark:text-charcoal transition-shadow duration-300",
    secondary: "bg-charcoal/5 text-charcoal hover:bg-charcoal/10 dark:bg-warm-white/5 dark:text-warm-white dark:hover:bg-warm-white/10 transition-colors duration-300",
    outline: "border border-charcoal/20 text-charcoal hover:bg-charcoal hover:text-warm-white dark:border-warm-white/20 dark:text-warm-white dark:hover:bg-warm-white dark:hover:text-charcoal transition-all duration-300",
  };
  
  const sizes = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-7 py-3.5 text-base",
    lg: "px-9 py-4.5 text-lg",
  };

  const motionProps = {
    whileHover: { y: -2, scale: 1.01 },
    whileTap: { y: 0, scale: 0.98 },
    transition: { type: "spring" as const, stiffness: 400, damping: 15 }
  };

  if (href) {
    return (
      <motion.a 
        href={href} 
        className={cn(baseStyles, variants[variant], sizes[size], "no-underline", className)}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={props.type || "button"}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...motionProps}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
}
