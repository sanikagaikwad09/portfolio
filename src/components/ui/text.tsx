import React from "react";
import { cn } from "@/lib/utils";

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: "body" | "lead" | "muted" | "small";
}

export function Text({
  children,
  className,
  variant = "body",
  ...props
}: TextProps) {
  const styles = {
    body: "text-base md:text-lg text-charcoal/70 dark:text-warm-white/70 leading-relaxed font-sans",
    lead: "text-lg md:text-xl text-charcoal/80 dark:text-warm-white/80 leading-relaxed font-sans font-light",
    muted: "text-sm md:text-base text-charcoal/50 dark:text-warm-white/50 font-sans",
    small: "text-xs md:text-sm text-charcoal/65 dark:text-warm-white/65 font-sans",
  };

  return (
    <p className={cn(styles[variant], className)} {...props}>
      {children}
    </p>
  );
}
