"use client";

import { skillGroups } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-28 md:py-36 px-6 md:px-10 max-w-7xl mx-auto"
    >
      <SectionHeading
        eyebrow="Capabilities"
        lines={["A toolkit built for", "AI-driven products."]}
      />

      <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {skillGroups.map((group, i) => (
          <Reveal key={group.label} delay={i * 0.06}>
            <div
              data-cursor-hover
              className="group h-full glass-panel rounded-2xl p-6 hover:border-signal-blue/30 transition-colors duration-500"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display text-lg text-paper">
                  {group.label}
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-widest2 text-signal-blue/70 px-2 py-1 rounded-full border border-signal-blue/20">
                  {group.mono}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs px-3 py-1.5 rounded-full bg-paper/[0.05] text-paper/70 border border-paper/10 group-hover:border-paper/20 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
