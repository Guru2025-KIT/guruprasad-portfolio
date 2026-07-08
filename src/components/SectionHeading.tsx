import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  lines: string[];
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  lines,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <Reveal>
        <div
          className={cn(
            "flex items-center gap-3 mb-5",
            align === "center" && "justify-center"
          )}
        >
          <span className="h-px w-8 bg-signal-blue" />
          <span className="font-mono text-[11px] uppercase tracking-widest2 text-signal-blue">
            {eyebrow}
          </span>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="font-display font-medium text-3xl sm:text-4xl md:text-5xl leading-[1.12] text-paper text-balance">
          {lines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h2>
      </Reveal>
    </div>
  );
}
