"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowDown, Volume2 } from "lucide-react";
import { profile } from "@/lib/data";
import Magnetic from "./Magnetic";
import Particles from "./Particles";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoLayerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 40 });
  const [soundUnlocked, setSoundUnlocked] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setGlow({ x, y });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    // Pick whichever video element is visible
    const video = videoRef.current ?? mobileVideoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    let unlocked = false;

    const unlockSound = () => {
      if (unlocked) return;
      unlocked = true;
      setSoundUnlocked(true);

      const unlock = (v: HTMLVideoElement | null) => {
        if (!v) return;
        v.muted = false;
        v.volume = 1;
        v.play().catch(() => { v.muted = true; });
      };

      if (document.visibilityState === "visible") {
        unlock(videoRef.current);
        unlock(mobileVideoRef.current);
      }

      window.removeEventListener("pointerdown", unlockSound);
      window.removeEventListener("touchstart", unlockSound);
      window.removeEventListener("keydown", unlockSound);
      window.removeEventListener("click", unlockSound);
      lenisInstance?.off?.(unlockSound);
    };

    const lenisInstance = (
      window as unknown as {
        __lenis?: { on: (e: string, cb: () => void) => void; off?: (cb: () => void) => void };
      }
    ).__lenis;

    lenisInstance?.on?.("scroll", unlockSound);
    window.addEventListener("pointerdown", unlockSound);
    window.addEventListener("touchstart", unlockSound, { passive: false });
    window.addEventListener("keydown", unlockSound);
    window.addEventListener("click", unlockSound);

    const observer = new IntersectionObserver(
      ([entry]) => {
        const vids = [videoRef.current, mobileVideoRef.current].filter(Boolean) as HTMLVideoElement[];
        if (entry.isIntersecting) {
          vids.forEach(v => {
            v.currentTime = 0;
            if (unlocked) { v.muted = false; v.volume = 1; }
            v.play().catch(() => { v.muted = true; v.play().catch(() => {}); });
          });
        } else {
          vids.forEach(v => v.pause());
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(section);

    return () => {
      window.removeEventListener("pointerdown", unlockSound);
      window.removeEventListener("touchstart", unlockSound);
      window.removeEventListener("keydown", unlockSound);
      window.removeEventListener("click", unlockSound);
      lenisInstance?.off?.(unlockSound);
      observer.disconnect();
    };
  }, []);

  // GSAP parallax — desktop only
  useEffect(() => {
    if (window.innerWidth < 768 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const layer = videoLayerRef.current;
    const section = sectionRef.current;
    if (!layer || !section) return;

    const tween = gsap.to(layer, {
      yPercent: 18,
      scale: 1.08,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const elTarget = document.querySelector("#projects");
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, o?: object) => void } }).__lenis;
    if (elTarget) {
      if (lenis) lenis.scrollTo(elTarget, { offset: -60 });
      else elTarget.scrollIntoView({ behavior: "smooth" });
    }
  };

  const VIDEO_SRC_MP4 = "https://cdn.jsdelivr.net/gh/Guru2025-KIT/guruprasad-portfolio@main/public/video/hero-avatar.mp4";
  const VIDEO_SRC_WEBM = "https://cdn.jsdelivr.net/gh/Guru2025-KIT/guruprasad-portfolio@main/public/video/hero-avatar.webm";
  const VIDEO_POSTER = "https://cdn.jsdelivr.net/gh/Guru2025-KIT/guruprasad-portfolio@main/public/video/hero-poster.jpg";

  return (
    <section id="hero" ref={sectionRef} className="relative w-full overflow-hidden">

      {/* ══════════════════════════════════════════════════
          MOBILE LAYOUT  (hidden on md+)
          Order: header gap → headline → video → subtitle → buttons → stats
          Everything fits in one 100dvh screen
      ══════════════════════════════════════════════════ */}
      <div className="md:hidden flex flex-col min-h-[100dvh] pt-[68px] px-4 pb-3 gap-2.5">

        {/* Name pill + roles */}
        <div className="shrink-0">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-paper/60 mb-1.5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel">
              <span className="w-1.5 h-1.5 rounded-full bg-signal-blue" />
              {profile.name} &middot; {profile.roleTag}
            </span>
          </div>
          <p className="font-mono text-[10px] text-signal-blue tracking-wide mb-1.5">
            {profile.roles.join("  ·  ")}
          </p>
          {/* Headline */}
          <h1 className="font-display font-medium text-[1.9rem] leading-[1.07] text-paper">
            <span className="block">{profile.headlinePrefix}</span>
            <span className="block italic text-gradient-blue">{profile.headlineHighlight}</span>
            <span className="block">{profile.headlineSuffix}</span>
          </h1>
        </div>

        {/* Video card — centrepiece, 16:9 */}
        <div
          className="shrink-0 relative w-full rounded-2xl overflow-hidden border border-paper/10"
          style={{ aspectRatio: "16/9" }}
        >
          <video
            ref={mobileVideoRef}
            autoPlay
            muted
            playsInline
            poster={VIDEO_POSTER}
            className="absolute inset-0 w-full h-full object-cover object-[85%_30%]"
          >
            <source src={VIDEO_SRC_MP4} type="video/mp4" />
            <source src={VIDEO_SRC_WEBM} type="video/webm" />
          </video>
          {/* vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-transparent pointer-events-none" />
          {/* Tap-to-unmute badge */}
          <AnimatePresence>
            {!soundUnlocked && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="px-3 py-2 rounded-xl bg-ink-950/70 backdrop-blur-md border border-paper/10 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-paper/85">
                  <Volume2 size={12} className="text-signal-amber animate-pulse" />
                  Tap to unmute
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Subtitle */}
        <p className="shrink-0 text-paper/70 text-[12.5px] leading-snug">
          {profile.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="shrink-0 flex items-center gap-3">
          <a
            href="#projects"
            onClick={scrollToProjects}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-signal-blue text-ink-950 font-medium text-sm shadow-glow"
          >
            View Projects <ArrowRight size={14} />
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const el = document.querySelector("#contact");
              const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, o?: object) => void } }).__lenis;
              if (el) {
                if (lenis) lenis.scrollTo(el, { offset: -60 });
                else el.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-paper/20 text-paper font-medium text-sm glass-panel"
          >
            Contact Me
          </a>
        </div>

        {/* Stats bar */}
        <div className="shrink-0 grid grid-cols-4 gap-px glass-panel rounded-xl overflow-hidden">
          {profile.stats.map((s) => (
            <div key={s.label} className="px-1.5 py-3 text-center [&:not(:last-child)]:border-r border-paper/[0.07]">
              <div className="font-display text-[1.1rem] text-paper">{s.value}</div>
              <div className="font-mono text-[8px] uppercase tracking-wide text-paper/50 mt-0.5 leading-tight">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          DESKTOP LAYOUT  (hidden below md)
          Full-bleed cinematic background, original layout
      ══════════════════════════════════════════════════ */}
      <div className="hidden md:block relative min-h-[100vh]">

        {/* Full-bleed avatar video */}
        <div ref={videoLayerRef} className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            poster={VIDEO_POSTER}
            className="absolute inset-0 w-full h-full object-cover object-[85%_30%]"
          >
            <source src={VIDEO_SRC_MP4} type="video/mp4" />
            <source src={VIDEO_SRC_WEBM} type="video/webm" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/75 to-ink-950/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/40" />
          <div className="absolute inset-0 bg-ink-950/20 mix-blend-multiply" />
          <div
            className="absolute inset-0 opacity-60"
            style={{ background: "radial-gradient(circle at 78% 65%, transparent 0%, rgba(5,5,5,0.2) 45%, rgba(5,5,5,0.85) 78%)" }}
          />
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div
            className="absolute inset-0 transition-opacity duration-700 pointer-events-none mix-blend-screen opacity-50"
            style={{ background: `radial-gradient(480px circle at ${glow.x}% ${glow.y}%, rgba(59,130,246,0.18), transparent 70%)` }}
          />
        </div>

        <Particles />

        {/* Desktop sound pill */}
        {!soundUnlocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="absolute top-28 right-10 z-10 pointer-events-none"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel font-mono text-[10px] uppercase tracking-widest2 text-paper/55">
              <Volume2 size={12} className="text-signal-blue" />
              Click anywhere for sound
            </span>
          </motion.div>
        )}

        {/* Text content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-10 pb-16 pt-28">
          <div className="max-w-[640px]">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3 mb-6 font-mono text-xs uppercase tracking-widest2 text-paper/60"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel">
                <span className="w-1.5 h-1.5 rounded-full bg-signal-blue" />
                {profile.name} &middot; {profile.roleTag}
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-sm text-signal-blue mb-5 tracking-wide"
            >
              {profile.roles.join("  ·  ")}
            </motion.p>

            <h1 className="font-display font-medium text-[4.2rem] leading-[1.04] text-paper text-balance">
              <motion.span initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }} className="block">
                {profile.headlinePrefix}
              </motion.span>
              <motion.span initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.28, ease: [0.16, 1, 0.3, 1] }} className="block italic text-gradient-blue">
                {profile.headlineHighlight}
              </motion.span>
              <motion.span initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.38, ease: [0.16, 1, 0.3, 1] }} className="block">
                {profile.headlineSuffix}
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-paper/70 text-lg leading-relaxed max-w-[520px]"
            >
              {profile.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Magnetic>
                <a href="#projects" onClick={scrollToProjects} className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-signal-blue text-ink-950 font-medium text-sm overflow-hidden shadow-glow">
                  <span className="relative z-10">View Projects</span>
                  <ArrowRight size={16} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.querySelector("#contact");
                    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, o?: object) => void } }).__lenis;
                    if (el) {
                      if (lenis) lenis.scrollTo(el, { offset: -60 });
                      else el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-paper/20 text-paper font-medium text-sm glass-panel hover:border-signal-blue/60 transition-colors"
                >
                  Contact Me
                </a>
              </Magnetic>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-20 grid grid-cols-4 gap-px max-w-[640px] glass-panel rounded-2xl overflow-hidden"
          >
            {profile.stats.map((s) => (
              <div key={s.label} className="px-5 py-5 border-paper/[0.07] [&:not(:last-child)]:border-r">
                <div className="font-display text-3xl text-paper">{s.value}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest2 text-paper/50 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.button
          onClick={scrollToProjects}
          aria-label="Scroll to projects"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 right-10 z-10 flex flex-col items-center gap-2 text-paper/50 hover:text-signal-blue transition-colors"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest2 [writing-mode:vertical-rl]">Scroll</span>
          <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
            <ArrowDown size={16} />
          </motion.span>
        </motion.button>
      </div>
    </section>
  );
}
