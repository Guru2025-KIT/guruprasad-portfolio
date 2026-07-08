import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import type { ComponentType } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  CheckCircle2,
  Users,
  AlertTriangle,
} from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import { projects, projectBySlug } from "@/lib/projects";
import { getAccentClasses } from "@/lib/accent";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectGallery from "@/components/ProjectGallery";
import ProjectThumb from "@/components/ProjectThumb";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = projectBySlug(params.slug);
  if (!project) return {};
  return {
    title: `${project.name} — Guruprasad Shinde`,
    description: project.tagline,
  };
}

const TIER_LABEL: Record<string, string> = {
  major: "Featured Project",
  minor: "Minor Project",
};

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = projectBySlug(params.slug);
  if (!project) notFound();

  const accent = getAccentClasses(project.accent);
  const d = project.detail;

  return (
    <>
      <Navbar />
      <main className="relative pt-32 md:pt-40 pb-24 px-6 md:px-10 max-w-5xl mx-auto">
        <div className="absolute inset-0 -z-10 bg-grid opacity-[0.12] pointer-events-none" />

        {/* Back link */}
        <Link
          href="/#projects"
          data-cursor-hover
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-paper/55 hover:text-paper transition-colors mb-10"
        >
          <ArrowLeft size={14} />
          All Projects
        </Link>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          <span className={cn("font-mono text-[11px] uppercase tracking-widest2 px-3 py-1 rounded-full border", accent.border, accent.text)}>
            {TIER_LABEL[project.tier]}
          </span>
          {project.badge && (
            <span className="font-mono text-[11px] text-paper/50">{project.badge}</span>
          )}
        </div>

        <h1 className="font-display font-medium text-4xl md:text-6xl text-paper mb-5 text-balance">
          {project.name}
        </h1>
        <p className="text-paper/65 text-lg md:text-xl leading-relaxed max-w-3xl mb-8">
          {project.tagline}
        </p>

        {/* Links + team */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          <ProjectLinkButton
            href={project.live.url}
            isPlaceholder={project.live.isPlaceholder}
            label={project.live.isPlaceholder ? "Live Demo (coming soon)" : "View Live"}
            icon={ExternalLink}
            primary
            accent={accent}
          />
          <ProjectLinkButton
            href={project.github.url}
            isPlaceholder={project.github.isPlaceholder}
            label={project.github.isPlaceholder ? "Source (coming soon)" : "View Source"}
            icon={GithubIcon}
            accent={accent}
          />
          {project.team && project.team.length > 0 && (
            <span className="inline-flex items-center gap-2 font-mono text-xs text-paper/45 ml-1">
              <Users size={13} />
              {project.team.join(" · ")}
            </span>
          )}
        </div>

        {/* Metrics strip */}
        {d.metrics && d.metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px glass-panel rounded-2xl overflow-hidden mb-14">
            {d.metrics.map((m) => (
              <div key={m.label} className="px-5 py-5 border-paper/[0.07] [&:not(:last-child)]:border-r [&:nth-child(odd)]:sm:border-r-0 sm:[&:not(:last-child)]:border-r">
                <div className={cn("font-display text-xl md:text-2xl", accent.text)}>{m.value}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest2 text-paper/50 mt-1">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Screenshots / Gallery */}
        <section className="mb-16">
          <h2 className="font-mono text-[11px] uppercase tracking-widest2 text-paper/45 mb-5">
            Proof of Concept — Screenshots
          </h2>
          {project.hasRealScreenshots ? (
            <ProjectGallery images={project.images} accentText={accent.text} />
          ) : (
            <div className="relative rounded-2xl overflow-hidden border border-paper/10">
              <ProjectThumb project={project} className="relative w-full aspect-[16/8]" />
              <div className="px-5 py-4 bg-ink-900/80 flex items-start gap-2.5">
                <AlertTriangle size={15} className="text-paper/40 mt-0.5 shrink-0" />
                <p className="text-paper/55 text-sm leading-relaxed">
                  Screenshots for {project.name} haven&rsquo;t been added yet. Once deployed,
                  real product screenshots will replace this placeholder.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* In simple words */}
        <section className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl text-paper mb-6">
            What is it, in simple words?
          </h2>
          <div className="space-y-4 max-w-3xl">
            {d.simpleExplanation.map((para, i) => (
              <p key={i} className="text-paper/70 text-base md:text-lg leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* The problem */}
        <section className="mb-16 glass-panel rounded-2xl p-6 md:p-8">
          <h2 className="font-mono text-[11px] uppercase tracking-widest2 text-paper/45 mb-3">
            The Problem
          </h2>
          <p className="text-paper/80 text-base md:text-lg leading-relaxed">{d.problem}</p>
        </section>

        {/* How it works */}
        <section className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl text-paper mb-6">How it works</h2>
          <ol className="space-y-4">
            {d.howItWorks.map((step, i) => (
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
                <p className="text-paper/70 text-sm md:text-base leading-relaxed pt-0.5">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Key features */}
        <section className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl text-paper mb-6">Key features</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {d.keyFeatures.map((f) => (
              <div key={f.title} className="glass-panel rounded-2xl p-5">
                <div className="flex items-start gap-2.5 mb-2">
                  <CheckCircle2 size={16} className={cn("mt-0.5 shrink-0", accent.text)} />
                  <h3 className="font-display text-base text-paper">{f.title}</h3>
                </div>
                <p className="text-paper/60 text-sm leading-relaxed pl-[26px]">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech stack */}
        <section className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl text-paper mb-6">Tech stack</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {d.techStackFull.map((layer) => (
              <div key={layer.layer} className="glass-panel rounded-2xl p-5">
                <h3 className={cn("font-mono text-[11px] uppercase tracking-widest2 mb-3", accent.text)}>
                  {layer.layer}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {layer.items.map((item) => (
                    <span
                      key={item}
                      className="font-mono text-[11px] px-2.5 py-1.5 rounded-full bg-paper/[0.06] text-paper/65 border border-paper/10"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer nav */}
        <div className="flex items-center justify-between pt-8 border-t border-paper/10">
          <Link
            href="/#projects"
            data-cursor-hover
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-paper/55 hover:text-paper transition-colors"
          >
            <ArrowLeft size={14} />
            Back to all projects
          </Link>
          <Link
            href="/#contact"
            data-cursor-hover
            className={cn(
              "inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm text-ink-950",
              accent.bg
            )}
          >
            Let&rsquo;s talk
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </main>
      <Footer />
    </>
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
  icon: ComponentType<{ width?: string | number; height?: string | number; className?: string }>;
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
