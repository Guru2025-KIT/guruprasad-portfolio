"use client";

import { motion } from "framer-motion";
import { Sparkles, Code2, Brain } from "lucide-react";
import { about } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section
      id="about"
      className="relative py-28 md:py-36 px-6 md:px-10 max-w-7xl mx-auto"
    >
      <div className="absolute inset-0 bg-grid opacity-[0.15] pointer-events-none" />

      <div className="relative grid md:grid-cols-12 gap-12 md:gap-8">
        <div className="md:col-span-7">
          <SectionHeading eyebrow="About" lines={about.headline} />

          <div className="mt-10 space-y-5 max-w-[560px]">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <p
                  className={
                    i === 0
                      ? "text-paper text-lg md:text-xl leading-relaxed"
                      : "text-paper/65 text-base md:text-lg leading-relaxed"
                  }
                >
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="md:col-span-5 relative">
          <Reveal direction="right" delay={0.15}>
            <div className="relative glass-panel rounded-3xl p-7 md:p-8 overflow-hidden">
              <div
                className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20 blur-3xl"
                style={{ background: "#3B82F6" }}
              />
              <div className="relative space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-signal-blue/15 flex items-center justify-center border border-signal-blue/25">
                    <Brain size={18} className="text-signal-blue" />
                  </div>
                  <div>
                    <p className="text-paper font-medium text-sm">
                      AI &amp; ML Engineering
                    </p>
                    <p className="text-paper/50 text-xs font-mono">
                      Models &middot; Pipelines &middot; Inference
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-signal-amber/15 flex items-center justify-center border border-signal-amber/25">
                    <Code2 size={18} className="text-signal-amber" />
                  </div>
                  <div>
                    <p className="text-paper font-medium text-sm">
                      Full Stack Development
                    </p>
                    <p className="text-paper/50 text-xs font-mono">
                      React &middot; Node &middot; APIs
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-signal-blue/15 flex items-center justify-center border border-signal-blue/25">
                    <Sparkles size={18} className="text-signal-blue" />
                  </div>
                  <div>
                    <p className="text-paper font-medium text-sm">
                      Real-World Problem Solving
                    </p>
                    <p className="text-paper/50 text-xs font-mono">
                      Disaster relief &middot; Health &middot; Finance
                    </p>
                  </div>
                </div>

                <div className="pt-5 border-t border-paper/10">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <p className="font-display text-4xl text-paper">9.76</p>
                      <p className="font-mono text-[10px] uppercase tracking-widest2 text-paper/45 mt-1">
                        CGPA &middot; KIT College of Engineering
                      </p>
                    </div>
                    <motion.span
                      className="font-mono text-[10px] text-signal-blue uppercase tracking-widest2 border border-signal-blue/30 rounded-full px-2.5 py-1 whitespace-nowrap shrink-0"
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 2.4, repeat: Infinity }}
                    >
                      AI &amp; ML
                    </motion.span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
