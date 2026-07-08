"use client";

import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Project } from "@/lib/projects";
import { getAccentClasses } from "@/lib/accent";
import { cn } from "@/lib/utils";
import ProjectThumb from "./ProjectThumb";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export default function ProjectCard({ project, priority }: ProjectCardProps) {
  const accent = getAccentClasses(project.accent);

  if (project.tier === "major") {
    return (
      <Link
        href={`/projects/${project.slug}`}
        data-cursor-hover
        className={cn(
          "group relative flex flex-col glass-panel rounded-3xl overflow-hidden transition-all duration-500",
          accent.borderHover
        )}
      >
        <ProjectThumb project={project} priority={priority} className="relative w-full aspect-[16/10]" />

        <div className="flex-1 flex flex-col p-6 md:p-8">
          <div className="flex items-center justify-between mb-2">
            <span className={cn("font-mono text-[10px] uppercase tracking-widest2", accent.text)}>
              Featured Project
            </span>
            <ArrowUpRight
              size={18}
              className="text-paper/30 group-hover:text-paper group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
            />
          </div>
          <h3 className="font-display text-2xl md:text-3xl text-paper mb-2">{project.name}</h3>
          <p className="text-paper/60 text-sm md:text-base leading-relaxed mb-4">
            {project.oneLiner}
          </p>

          {project.badge && (
            <span
              className={cn(
                "inline-flex w-fit items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide px-3 py-1.5 rounded-full border mb-4",
                accent.border,
                accent.text
              )}
            >
              {project.badge}
            </span>
          )}

          <ul className="space-y-1.5 mb-5">
            {project.highlights.slice(0, 3).map((h) => (
              <li key={h} className="flex items-start gap-2 text-paper/70 text-sm">
                <CheckCircle2 size={14} className={cn("mt-0.5 shrink-0", accent.text)} />
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap gap-2">
            {project.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className="font-mono text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-full bg-paper/[0.06] text-paper/55 border border-paper/10"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Link>
    );
  }

  // minor
  return (
    <Link
      href={`/projects/${project.slug}`}
      data-cursor-hover
      className={cn(
        "group relative flex items-center gap-4 glass-panel rounded-2xl p-4 transition-all duration-500",
        accent.borderHover
      )}
    >
      <ProjectThumb project={project} compact className="relative w-20 h-20 rounded-xl shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-display text-base text-paper truncate">{project.name}</h3>
          <ArrowUpRight
            size={14}
            className="text-paper/30 group-hover:text-paper transition-all shrink-0"
          />
        </div>
        <p className="text-paper/55 text-xs leading-relaxed mt-1 line-clamp-2">
          {project.oneLiner}
        </p>
      </div>
    </Link>
  );
}
