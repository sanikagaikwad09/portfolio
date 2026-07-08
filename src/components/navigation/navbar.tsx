"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: "Home", href: "#" },
    { label: "About", href: "#" },
    { label: "Projects", href: "#" },
    { label: "Contact", href: "#" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-charcoal/5 dark:border-warm-white/5 py-4 transition-all duration-300">
      <Container className="flex items-center justify-between">
        <a 
          href="#" 
          className="font-display font-extrabold text-xl tracking-tight text-charcoal dark:text-warm-white hover:opacity-80 transition-opacity"
        >
          S.G
        </a>
        
        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-sans font-medium text-charcoal/60 dark:text-warm-white/60 hover:text-charcoal dark:hover:text-warm-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-charcoal dark:text-warm-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Container>

      {/* Mobile Links Dropdown */}
      {isOpen && (
        <nav className="absolute top-full left-0 right-0 glass-panel border-b border-charcoal/5 dark:border-warm-white/5 py-6 flex flex-col items-center gap-4 md:hidden animate-fade-in">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-base font-sans font-medium text-charcoal/70 dark:text-warm-white/70 hover:text-charcoal dark:hover:text-warm-white transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
