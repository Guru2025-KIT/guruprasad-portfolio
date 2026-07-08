"use client";

import { projects } from "@/lib/projects";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const major = projects.filter((p) => p.tier === "major").sort((a, b) => a.order - b.order);
  const minor = projects.filter((p) => p.tier === "minor").sort((a, b) => a.order - b.order);

  return (
    <section
      id="projects"
      className="relative py-28 md:py-36 px-6 md:px-10 max-w-7xl mx-auto"
    >
      <SectionHeading
        eyebrow="Featured Projects"
        lines={["Projects that solve", "real problems."]}
      />

      {/* Major projects — all shown at equal size/prominence */}
      <div className="mt-16 grid md:grid-cols-2 gap-6">
        {major.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.06}>
            <ProjectCard project={project} priority={i === 0} />
          </Reveal>
        ))}
      </div>

      {/* Minor projects */}
      <Reveal delay={0.1}>
        <div className="mt-20 mb-6 flex items-center gap-3">
          <span className="font-mono text-[11px] uppercase tracking-widest2 text-paper/45">
            Minor Projects
          </span>
          <span className="h-px flex-1 bg-paper/10" />
        </div>
      </Reveal>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {minor.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.06}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
