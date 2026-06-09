"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollSectionWrapper({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Calculate high-end perspective transformations linked to scroll progression
  const opacity = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [0.4, 1, 1, 0.4]);
  const scale = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [0.93, 1, 1, 0.93]);
  const rotateX = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [8, 0, 0, -8]);
  const y = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [60, 0, 0, -60]);
  
  return (
    <motion.div
      ref={containerRef}
      style={{
        opacity,
        scale,
        rotateX,
        y,
        transformStyle: "preserve-3d",
      }}
      className="w-full origin-center"
    >
      {children}
    </motion.div>
  );
}
