import { Project } from "./projects";

type AccentClasses = {
  text: string;
  border: string;
  borderHover: string;
  bg: string;
  bgSoft: string;
  glow: string;
  dot: string;
};

// NOTE: every class string below must appear literally (not interpolated)
// somewhere in this file, or Tailwind's JIT compiler won't generate it.
const ACCENTS: Record<Project["accent"], AccentClasses> = {
  blue: {
    text: "text-signal-blue",
    border: "border-signal-blue/30",
    borderHover: "hover:border-signal-blue/50",
    bg: "bg-signal-blue",
    bgSoft: "bg-signal-blue/15",
    glow: "shadow-glow",
    dot: "bg-signal-blue",
  },
  amber: {
    text: "text-signal-amber",
    border: "border-signal-amber/30",
    borderHover: "hover:border-signal-amber/50",
    bg: "bg-signal-amber",
    bgSoft: "bg-signal-amber/15",
    glow: "shadow-glow-amber",
    dot: "bg-signal-amber",
  },
  violet: {
    text: "text-violet-400",
    border: "border-violet-400/30",
    borderHover: "hover:border-violet-400/50",
    bg: "bg-violet-500",
    bgSoft: "bg-violet-500/15",
    glow: "shadow-[0_0_60px_-10px_rgba(167,139,250,0.45)]",
    dot: "bg-violet-400",
  },
  green: {
    text: "text-emerald-400",
    border: "border-emerald-400/30",
    borderHover: "hover:border-emerald-400/50",
    bg: "bg-emerald-500",
    bgSoft: "bg-emerald-500/15",
    glow: "shadow-[0_0_60px_-10px_rgba(52,211,153,0.45)]",
    dot: "bg-emerald-400",
  },
  rose: {
    text: "text-rose-400",
    border: "border-rose-400/30",
    borderHover: "hover:border-rose-400/50",
    bg: "bg-rose-500",
    bgSoft: "bg-rose-500/15",
    glow: "shadow-[0_0_60px_-10px_rgba(251,113,133,0.45)]",
    dot: "bg-rose-400",
  },
  cyan: {
    text: "text-cyan-400",
    border: "border-cyan-400/30",
    borderHover: "hover:border-cyan-400/50",
    bg: "bg-cyan-500",
    bgSoft: "bg-cyan-500/15",
    glow: "shadow-[0_0_60px_-10px_rgba(34,211,238,0.45)]",
    dot: "bg-cyan-400",
  },
};

export function getAccentClasses(accent: Project["accent"]): AccentClasses {
  return ACCENTS[accent];
}
