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
  
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
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
          className="absolute top-[12%] left-[8%] w-[320px] h-[320px] rounded-full bg-accent/4 filter blur-[80px]"
          style={{ y: yBg, opacity: opacityFade }}
        />
        <motion.div 
          className="absolute bottom-[25%] right-[8%] w-[420px] h-[420px] rounded-full bg-accent-light/4 filter blur-[100px]"
          style={{ y: yBg, opacity: opacityFade }}
        />
      </div>

      {/* Reduced top/bottom padding to tighten the overall vertical whitespace */}
      <Container className="relative z-10 w-full pt-20 pb-20 md:pt-24 md:pb-28">
        <motion.div 
          variants={staggerContainer(0.12, 0.15)}
          initial="hidden"
          animate="visible"
          // Adjusted layout columns and tighter gap to bring elements closer together
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full"
          style={{ y: yContent }}
        >
          {/* Left Column: Greeting, name, intro, buttons, badges */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
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
          <div className="lg:col-span-6 flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-[490px] aspect-[4/5] flex items-center justify-center">
              {/* Floating doodles layer */}
              <HeroDoodles />
              
              {/* Image Carousel Showcase */}
              <HeroImageCarousel />
            </div>
          </div>
        </motion.div>
      </Container>

      {/* Cinematic White -> Black Transition Area */}
      <div className="absolute bottom-0 left-0 right-0 h-44 overflow-hidden pointer-events-none z-0">
        {/* Layered Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-charcoal/10 to-charcoal" />
        
        {/* 3D Perspective Grid */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-[300px] origin-bottom [perspective:500px] opacity-40">
          <div 
            className="w-full h-full [transform:rotateX(70deg)] bg-[linear-gradient(to_right,rgba(99,102,241,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.12)_1px,transparent_1px)] bg-[size:45px_45px]" 
            style={{
              maskImage: "linear-gradient(to top, black 25%, transparent 75%)",
              WebkitMaskImage: "linear-gradient(to top, black 25%, transparent 75%)"
            }}
          />
        </div>
        
        {/* Soft bottom glow lighting */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[550px] h-[120px] bg-accent/20 rounded-full filter blur-[70px]" />
      </div>

      {/* Elegant scroll indicator cue */}
      <HeroScrollIndicator />
    </Section>
  );
}
export default Hero;
