import React from "react";
import { cn } from "@/lib/utils";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
}

export function Heading({
  children,
  className,
  level = 2,
  size,
  ...props
}: HeadingProps) {
  const Component = `h${level}` as const;
  
  const defaultSizes = {
    1: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight",
    2: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight",
    3: "text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight",
    4: "text-xl sm:text-2xl font-semibold",
    5: "text-lg sm:text-xl font-medium",
    6: "text-base font-medium",
  };

  const overrideSizes = {
    sm: "text-lg md:text-xl font-semibold",
    md: "text-xl md:text-3xl font-semibold tracking-tight",
    lg: "text-3xl md:text-5xl font-bold tracking-tight",
    xl: "text-4xl md:text-6xl font-bold tracking-tight",
    "2xl": "text-5xl md:text-7xl font-extrabold tracking-tight",
    "3xl": "text-6xl md:text-8xl font-extrabold tracking-tight",
    "4xl": "text-7xl md:text-9xl font-extrabold tracking-tight",
  };

  return (
    <Component
      className={cn(
        "font-display text-charcoal dark:text-warm-white leading-[1.1]",
        size ? overrideSizes[size] : defaultSizes[level],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
