import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

export function Container({
  children,
  className,
  as: Component = "div",
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn("mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-16", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
