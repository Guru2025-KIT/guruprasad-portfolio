"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  CheckCircle2,
  Users,
  AlertTriangle,
} from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import { projects, Project } from "@/lib/projects";
import { getAccentClasses } from "@/lib/accent";
import { cn } from "@/lib/utils";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import ProjectCard from "./ProjectCard";
import ProjectGallery from "./ProjectGallery";
import ProjectThumb from "./ProjectThumb";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const major = projects.filter((p) => p.tier === "major").sort((a, b) => a.order - b.order);
  const minor = projects.filter((p) => p.tier === "minor").sort((a, b) => a.order - b.order);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  const accent = selectedProject ? getAccentClasses(selectedProject.accent) : null;

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
            <ProjectCard
              project={project}
              priority={i === 0}
              onOpenDetails={(p) => setSelectedProject(p)}
            />
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
            <ProjectCard
              project={project}
              onOpenDetails={(p) => setSelectedProject(p)}
            />
          </Reveal>
        ))}
      </div>

      {/* Project details overlay modal */}
      <AnimatePresence>
        {selectedProject && accent && (
          <div
            className="fixed inset-0 z-[200] bg-ink-950/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-5xl max-h-[90vh] glass-panel rounded-3xl overflow-hidden border border-paper/15 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-paper/10 bg-ink-950/80">
                <div>
                  <span className={cn("font-mono text-[10px] uppercase tracking-widest2", accent.text)}>
                    {selectedProject.tier === "major" ? "Featured Project" : "Minor Project"} {selectedProject.badge ? `· ${selectedProject.badge}` : ""}
                  </span>
                  <h2 className="font-display text-lg md:text-2xl text-paper mt-1">
                    {selectedProject.name}
                  </h2>
                </div>
                <button
                  aria-label="Close modal"
                  onClick={() => setSelectedProject(null)}
                  className="w-9 h-9 rounded-full bg-paper/5 hover:bg-paper/10 text-paper/70 hover:text-paper flex items-center justify-center transition-colors shrink-0"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content Panel */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-10 bg-ink-900/40">
                {/* One liner tagline */}
                <div>
                  <p className="text-paper/75 text-base md:text-lg leading-relaxed max-w-3xl">
                    {selectedProject.tagline}
                  </p>
                </div>

                {/* Links + team */}
                <div className="flex flex-wrap items-center gap-3">
                  <ProjectLinkButton
                    href={selectedProject.live.url}
                    isPlaceholder={selectedProject.live.isPlaceholder}
                    label={selectedProject.live.isPlaceholder ? "Live Demo (coming soon)" : "View Live"}
                    icon={ExternalLink}
                    primary
                    accent={accent}
                  />
                  <ProjectLinkButton
                    href={selectedProject.github.url}
                    isPlaceholder={selectedProject.github.isPlaceholder}
                    label={selectedProject.github.isPlaceholder ? "Source (coming soon)" : "View Source"}
                    icon={GithubIcon}
                    accent={accent}
                  />
                  {selectedProject.team && selectedProject.team.length > 0 && (
                    <span className="inline-flex items-center gap-2 font-mono text-xs text-paper/45 ml-1">
                      <Users size={13} />
                      {selectedProject.team.join(" · ")}
                    </span>
                  )}
                </div>

                {/* Metrics strip */}
                {selectedProject.detail.metrics && selectedProject.detail.metrics.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-px glass-panel rounded-2xl overflow-hidden">
                    {selectedProject.detail.metrics.map((m) => (
                      <div key={m.label} className="px-5 py-4 border-paper/[0.07] [&:not(:last-child)]:border-r [&:nth-child(odd)]:sm:border-r-0 sm:[&:not(:last-child)]:border-r">
                        <div className={cn("font-display text-xl md:text-2xl", accent.text)}>{m.value}</div>
                        <div className="font-mono text-[10px] uppercase tracking-widest2 text-paper/50 mt-1">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Screenshots / Gallery */}
                <section>
                  <h3 className="font-mono text-[11px] uppercase tracking-widest2 text-paper/45 mb-4">
                    Proof of Concept — Screenshots
                  </h3>
                  {selectedProject.hasRealScreenshots ? (
                    <ProjectGallery images={selectedProject.images} accentText={accent.text} />
                  ) : (
                    <div className="relative rounded-2xl overflow-hidden border border-paper/10">
                      <ProjectThumb project={selectedProject} className="relative w-full aspect-[16/8]" />
                      <div className="px-5 py-4 bg-ink-900/80 flex items-start gap-2.5">
                        <AlertTriangle size={15} className="text-paper/40 mt-0.5 shrink-0" />
                        <p className="text-paper/55 text-sm leading-relaxed">
                          Screenshots for {selectedProject.name} haven&rsquo;t been added yet. Once deployed,
                          real product screenshots will replace this placeholder.
                        </p>
                      </div>
                    </div>
                  )}
                </section>

                {/* In simple words */}
                <section>
                  <h3 className="font-display text-xl md:text-2xl text-paper mb-4">
                    What is it, in simple words?
                  </h3>
                  <div className="space-y-4 max-w-3xl">
                    {selectedProject.detail.simpleExplanation.map((para, i) => (
                      <p key={i} className="text-paper/70 text-sm md:text-base leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                </section>

                {/* The problem */}
                <section className="glass-panel rounded-2xl p-6">
                  <h3 className="font-mono text-[10px] uppercase tracking-widest2 text-paper/40 mb-2">
                    The Problem
                  </h3>
                  <p className="text-paper/80 text-sm md:text-base leading-relaxed">{selectedProject.detail.problem}</p>
                </section>

                {/* How it works */}
                <section>
                  <h3 className="font-display text-xl md:text-2xl text-paper mb-4">How it works</h3>
                  <ol className="space-y-4">
                    {selectedProject.detail.howItWorks.map((step, i) => (
                      <li key={i} className="flex gap-4">
                        <span
                          className={cn(
                            "shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs",
                            accent.bgSoft,
                            accent.text
                          )}
                        >
                          {i + 1}
                        </span>
                        <p className="text-paper/70 text-sm leading-relaxed pt-0.5">{step}</p>
                      </li>
                    ))}
                  </ol>
                </section>

                {/* Key features */}
                <section>
                  <h3 className="font-display text-xl md:text-2xl text-paper mb-4">Key features</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {selectedProject.detail.keyFeatures.map((f) => (
                      <div key={f.title} className="glass-panel rounded-2xl p-5">
                        <div className="flex items-start gap-2.5 mb-2">
                          <CheckCircle2 size={16} className={cn("mt-0.5 shrink-0", accent.text)} />
                          <h4 className="font-display text-sm md:text-base text-paper">{f.title}</h4>
                        </div>
                        <p className="text-paper/60 text-xs md:text-sm leading-relaxed pl-[26px]">
                          {f.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Tech stack */}
                <section>
                  <h3 className="font-display text-xl md:text-2xl text-paper mb-4">Tech stack</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {selectedProject.detail.techStackFull.map((layer) => (
                      <div key={layer.layer} className="glass-panel rounded-2xl p-5">
                        <h4 className={cn("font-mono text-[10px] uppercase tracking-widest2 mb-3", accent.text)}>
                          {layer.layer}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {layer.items.map((item) => (
                            <span
                              key={item}
                              className="font-mono text-[10px] px-2.5 py-1.5 rounded-full bg-paper/[0.06] text-paper/65 border border-paper/10"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectLinkButton({
  href,
  isPlaceholder,
  label,
  icon: Icon,
  primary,
  accent,
}: {
  href: string;
  isPlaceholder: boolean;
  label: string;
  icon: React.ComponentType<{ width?: string | number; height?: string | number; className?: string }>;
  primary?: boolean;
  accent: ReturnType<typeof getAccentClasses>;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor-hover
      className={cn(
        "inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-colors",
        primary
          ? cn(accent.bg, "text-ink-950")
          : "border border-paper/20 text-paper glass-panel hover:border-paper/40"
      )}
      title={isPlaceholder ? "Link will be updated once deployed" : undefined}
    >
      <Icon width={15} height={15} />
      {label}
      {isPlaceholder && <span className="opacity-60">·</span>}
    </a>
  );
}
