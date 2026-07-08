"use client";

import { Trophy } from "lucide-react";
import { achievements } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="relative py-28 md:py-36 px-6 md:px-10 max-w-7xl mx-auto"
    >
      <SectionHeading
        eyebrow="Recognition"
        lines={["Milestones along", "the way."]}
      />

      <div className="mt-16 grid sm:grid-cols-2 gap-5">
        {achievements.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.06}>
            <div
              data-cursor-hover
              className="group flex items-start gap-4 glass-panel rounded-2xl p-6 hover:border-signal-amber/30 transition-colors duration-500"
            >
              <div className="w-11 h-11 rounded-xl bg-signal-amber/15 border border-signal-amber/25 flex items-center justify-center shrink-0">
                <Trophy size={19} className="text-signal-amber" />
              </div>
              <div>
                <h3 className="font-display text-base md:text-lg text-paper leading-snug">
                  {a.title}
                </h3>
                <p className="font-mono text-xs text-paper/45 mt-1.5 uppercase tracking-wide">
                  {a.org}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
