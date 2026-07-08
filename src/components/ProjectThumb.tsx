import Image from "next/image";
import { Sparkles } from "lucide-react";
import { Project } from "@/lib/projects";
import { getAccentClasses } from "@/lib/accent";
import { cn } from "@/lib/utils";

interface ProjectThumbProps {
  project: Project;
  className?: string;
  priority?: boolean;
  compact?: boolean;
}

export default function ProjectThumb({ project, className, priority, compact }: ProjectThumbProps) {
  const accent = getAccentClasses(project.accent);

  if (project.hasRealScreenshots && project.images[0]) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image
          src={project.images[0].src}
          alt={project.images[0].alt}
          fill
          priority={priority}
          unoptimized
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
      </div>
    );
  }

  // Clean placeholder — no fake UI, just brand-accent gradient + initial + icon
  return (
    <div
      className={cn(
        "relative overflow-hidden flex items-center justify-center",
        className
      )}
      style={{
        background: `radial-gradient(circle at 30% 20%, rgba(255,255,255,0.06), transparent 60%), linear-gradient(135deg, rgba(255,255,255,0.04), transparent)`,
      }}
    >
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className={cn("absolute inset-0 opacity-20", accent.bg)} style={{ mixBlendMode: "overlay" }} />
      <div className="relative flex flex-col items-center gap-3">
        <span
          className={cn(
            "font-display select-none",
            compact ? "text-2xl" : "text-5xl md:text-6xl",
            accent.text
          )}
        >
          {project.name.charAt(0)}
        </span>
        {!compact && (
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest2 text-paper/35 whitespace-nowrap">
            <Sparkles size={11} className={accent.text} />
            Screenshots coming soon
          </span>
        )}
      </div>
    </div>
  );
}
