"use client";

import { Dot } from "lucide-react";
import { experience } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-28 md:py-36 px-6 md:px-10 max-w-7xl mx-auto"
    >
      <div className="grid md:grid-cols-12 gap-12 md:gap-8">
        <div className="md:col-span-5">
          <SectionHeading
            eyebrow="Experience"
            lines={["Hands-on learning,", "real momentum."]}
          />
          <Reveal delay={0.15}>
            <p className="mt-7 text-paper/65 text-base md:text-lg leading-relaxed max-w-[440px]">
              {experience.title} — turning coursework into shipped projects,
              one model and one interface at a time.
            </p>
          </Reveal>
        </div>

        <div className="md:col-span-7">
          <Reveal direction="right" delay={0.1}>
            <div className="glass-panel rounded-3xl p-7 md:p-9">
              <ul className="grid sm:grid-cols-2 gap-3.5">
                {experience.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-1.5 text-paper/75 text-sm md:text-base"
                  >
                    <Dot className="text-signal-blue shrink-0" size={26} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
