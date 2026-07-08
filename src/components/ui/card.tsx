import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glass?: boolean;
}

export function Card({
  children,
  className,
  hoverEffect = true,
  glass = false,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6 transition-all duration-500 border border-charcoal/5 bg-warm-white/50 dark:border-warm-white/5 dark:bg-charcoal-muted/20",
        glass && "glass-panel",
        hoverEffect && "hover:shadow-2xl hover:border-charcoal/15 dark:hover:border-warm-white/15 hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
