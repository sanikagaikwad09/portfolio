"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { fadeIn } from "@/lib/animations";

export function HeroButtons() {
  return (
    <motion.div 
      variants={fadeIn("up", 0.8)}
      className="flex flex-wrap gap-4 items-center mb-2"
    >
      <Button variant="primary" size="md" href="#projects">
        View Projects
      </Button>
      <Button variant="outline" size="md" href="#connect">
        Let's Connect
      </Button>
    </motion.div>
  );
}
