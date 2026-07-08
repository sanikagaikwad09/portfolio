import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  theme?: "light" | "dark";
  fullHeight?: boolean;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      children,
      className,
      as: Component = "section",
      theme = "light",
      fullHeight = false,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "relative py-20 md:py-28 overflow-hidden transition-colors duration-700",
          theme === "dark" 
            ? "theme-dark bg-charcoal text-warm-white" 
            : "theme-light bg-warm-white text-charcoal",
          fullHeight && "min-h-screen flex items-center",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Section.displayName = "Section";

