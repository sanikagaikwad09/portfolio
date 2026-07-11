"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
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
  
  // Parallax page scroll effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const gridY = useTransform(scrollYProgress, [0, 1], ["0px", "40px"]);

  // Mouse-mousemove tracking for background parallax glows
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Map coordinates relative to center of screen
      const x = (e.clientX - window.innerWidth / 2) / 45; // Very subtle shift
      const y = (e.clientY - window.innerHeight / 2) / 45;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Translate vectors for background shifts
  const bgX = useTransform(springX, (val) => val * 0.4);
  const bgY = useTransform(springY, (val) => val * 0.4);

  return (
    <Section 
      ref={containerRef}
      theme="light" 
      fullHeight 
      className="relative flex items-center justify-center overflow-hidden bg-grain-overlay bg-grid-pattern min-h-screen"
    >
      {/* Background radial soft glows & blurred circles - subtly shifts on mousemove */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        style={{ x: bgX, y: bgY }}
      >
        <motion.div 
          className="absolute top-[12%] left-[8%] w-[320px] h-[320px] rounded-full bg-accent/4 filter blur-[80px]"
          style={{ y: yBg, opacity: opacityFade }}
        />
        <motion.div 
          className="absolute bottom-[25%] right-[8%] w-[420px] h-[420px] rounded-full bg-accent-light/4 filter blur-[100px]"
          style={{ y: yBg, opacity: opacityFade }}
        />
      </motion.div>

      {/* Reduced padding to tighten whitespace and draw content closer together */}
      <Container className="relative z-10 w-full pt-16 pb-16 md:pt-20 md:pb-24">
        <motion.div 
          variants={staggerContainer(0.12, 0.15)}
          initial="hidden"
          animate="visible"
          // Equal 6-6 column split and a smaller gap to visually bind the text and illustration
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center w-full"
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
          <div className="lg:col-span-6 flex justify-center lg:justify-center relative">
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
      <div className="absolute bottom-0 left-0 right-0 h-64 overflow-hidden pointer-events-none z-0">
        {/* Layered Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-charcoal/5 via-charcoal/30 to-charcoal" />
        
        {/* 3D Perspective Grid with Parallax scroll depth */}
        <motion.div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[180%] h-[350px] origin-bottom [perspective:600px] opacity-45"
          style={{ y: gridY }}
        >
          <div 
            className="w-full h-full [transform:rotateX(75deg)] bg-[linear-gradient(to_right,rgba(99,102,241,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.14)_1px,transparent_1px)] bg-[size:50px_50px]" 
            style={{
              maskImage: "linear-gradient(to top, black 25%, transparent 75%)",
              WebkitMaskImage: "linear-gradient(to top, black 25%, transparent 75%)"
            }}
          />
        </motion.div>
        
        {/* Cinematic Soft Ambient glow lighting */}
        <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 w-[600px] h-[100px] bg-accent/20 rounded-full filter blur-[80px]" />
      </div>

      {/* Elegant scroll indicator cue */}
      <HeroScrollIndicator />
    </Section>
  );
}
export default Hero;
