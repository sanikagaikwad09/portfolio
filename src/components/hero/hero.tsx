"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { HeroImageCarousel } from "./HeroImageCarousel";
import { HeroBadges } from "./HeroBadges";
import { HeroDoodles } from "./HeroDoodles";
import { HeroButtons } from "./HeroButtons";
import { HeroScrollIndicator } from "./HeroScrollIndicator";
import { fadeIn, staggerContainer } from "@/lib/animations";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  
  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <Section 
      ref={containerRef}
      theme="light" 
      fullHeight 
      className="relative flex items-center justify-center overflow-hidden bg-grain-overlay bg-grid-pattern min-h-screen"
    >
      {/* Background radial soft glows & blurred circles */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-[15%] left-[5%] w-[320px] h-[320px] rounded-full bg-accent/5 filter blur-[90px]"
          style={{ y: yBg, opacity: opacityFade }}
        />
        <motion.div 
          className="absolute bottom-[20%] right-[5%] w-[420px] h-[420px] rounded-full bg-accent-light/5 filter blur-[110px]"
          style={{ y: yBg, opacity: opacityFade }}
        />
      </div>

      <Container className="relative z-10 w-full pt-28 pb-16 md:pt-32 md:pb-24">
        <motion.div 
          variants={staggerContainer(0.12, 0.15)}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full"
          style={{ y: yContent }}
        >
          {/* Left Column: Greeting, name, intro, buttons, badges */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <motion.div variants={fadeIn("up", 0.8)} className="mb-4">
              <span className="text-xs font-sans tracking-[0.25em] font-bold uppercase text-accent">
                Hello, I'm
              </span>
            </motion.div>
            
            <motion.div variants={fadeIn("up", 0.8)}>
              <Heading level={1} size="xl" className="mb-4">
                Sanika Gaikwad
              </Heading>
            </motion.div>

            <motion.div variants={fadeIn("up", 0.8)}>
              <Heading level={2} size="sm" className="mb-6 font-normal text-charcoal/60 dark:text-warm-white/60">
                Crafting interfaces that bridge technology and human expression.
              </Heading>
            </motion.div>

            <motion.div variants={fadeIn("up", 0.8)}>
              <Text variant="lead" className="mb-8 max-w-xl text-charcoal/70 dark:text-warm-white/70">
                I am a designer-developer hybrid specializing in high-performance web products, interactive visuals, and premium digital storytelling.
              </Text>
            </motion.div>

            {/* CTA Buttons */}
            <HeroButtons />

            {/* Personality Badges */}
            <HeroBadges />
          </div>

          {/* Right Column: Rotating images & SVG Doodles */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-[420px] aspect-[4/5] flex items-center justify-center">
              {/* Floating doodles layer */}
              <HeroDoodles />
              
              {/* Image Carousel Showcase */}
              <HeroImageCarousel />
            </div>
          </div>
        </motion.div>
      </Container>

      {/* Elegant scroll indicator cue */}
      <HeroScrollIndicator />
    </Section>
  );
}
export default Hero;
