import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // These accent color classes are composed dynamically inside src/lib/accent.ts
  // (as object-literal string values, not literal JSX class text), so Tailwind's
  // content scanner can miss them. Safelisting guarantees they're always generated.
  safelist: [
    "text-violet-400", "border-violet-400/30", "hover:border-violet-400/50", "bg-violet-500", "bg-violet-500/15",
    "text-emerald-400", "border-emerald-400/30", "hover:border-emerald-400/50", "bg-emerald-500", "bg-emerald-500/15",
    "text-rose-400", "border-rose-400/30", "hover:border-rose-400/50", "bg-rose-500", "bg-rose-500/15",
    "text-cyan-400", "border-cyan-400/30", "hover:border-cyan-400/50", "bg-cyan-500", "bg-cyan-500/15",
    "text-signal-blue", "border-signal-blue/30", "hover:border-signal-blue/50", "bg-signal-blue", "bg-signal-blue/15",
    "text-signal-amber", "border-signal-amber/30", "hover:border-signal-amber/50", "bg-signal-amber", "bg-signal-amber/15",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#050505",
          900: "#0A0A0B",
          800: "#121214",
          700: "#1A1A1D",
          600: "#26262B",
          500: "#34343B",
          400: "#52525B",
        },
        paper: {
          DEFAULT: "#F8F8F2",
          dim: "#C9C9C2",
          faint: "#8A8A84",
        },
        signal: {
          blue: "#3B82F6",
          bluedim: "#1E40AF",
          amber: "#F59E0B",
          amberdim: "#92400E",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-jbmono)", "var(--font-geist-mono)", "monospace"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(248,248,242,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(248,248,242,0.04) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "44px 44px",
      },
      boxShadow: {
        glow: "0 0 60px -10px rgba(59,130,246,0.45)",
        "glow-amber": "0 0 60px -10px rgba(245,158,11,0.35)",
        glass: "0 8px 32px rgba(0,0,0,0.45)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      letterSpacing: {
        widest2: "0.25em",
      },
    },
  },
  plugins: [],
};
export default config;
