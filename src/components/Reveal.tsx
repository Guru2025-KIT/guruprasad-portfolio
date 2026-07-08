"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  direction?: "up" | "left" | "right" | "none";
  once?: boolean;
}

export default function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  direction = "up",
  once = true,
}: RevealProps) {
  const initial: Record<string, number> = { opacity: 0 };
  if (direction === "up") initial.y = y;
  if (direction === "left") initial.x = -y;
  if (direction === "right") initial.x = y;

  const variants: Variants = {
    hidden: initial,
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
