import React from "react";
import { Container } from "@/components/ui/container";

export function Footer() {
  return (
    <footer className="py-12 border-t border-charcoal/5 dark:border-warm-white/5 bg-warm-white dark:bg-charcoal text-charcoal/40 dark:text-warm-white/40">
      <Container className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm font-sans">
          &copy; {new Date().getFullYear()} Sanika Gaikwad. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm font-sans">
          <a href="#" className="hover:text-charcoal dark:hover:text-warm-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-charcoal dark:hover:text-warm-white transition-colors">GitHub</a>
          <a href="#" className="hover:text-charcoal dark:hover:text-warm-white transition-colors">LinkedIn</a>
        </div>
      </Container>
    </footer>
  );
}
