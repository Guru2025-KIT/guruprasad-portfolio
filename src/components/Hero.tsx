"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowDown, Volume2 } from "lucide-react";
import { profile } from "@/lib/data";
import { assetPath } from "@/lib/utils";
import Magnetic from "./Magnetic";
import Particles from "./Particles";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoLayerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
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

  // Video behavior:
  // 1. On page load, the video autoplays muted (every browser blocks
  //    autoplay-with-sound until a real user gesture has happened — this is
  //    a platform-level restriction, not something a website can opt out of).
  // 2. The very first click/tap/keypress ANYWHERE on the page (not just a
  //    scroll) immediately unlocks and starts sound — this is the earliest
  //    moment any browser will allow audio, short of the user clicking a
  //    dedicated "enable sound" button.
  // 3. An IntersectionObserver watches the hero section itself: whenever the
  //    hero scrolls OUT of view the video pauses, and whenever it scrolls
  //    back INTO view the video restarts from 0:00 and plays again (with
  //    sound, once unlocked).
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    let unlocked = false;

    const unlockSound = () => {
      if (unlocked) return;
      unlocked = true;
      setSoundUnlocked(true);

      if (document.visibilityState === "visible") {
        video.muted = false;
        video.volume = 1;
        video.play().catch(() => {
          video.muted = true;
        });
      }

      window.removeEventListener("pointerdown", unlockSound);
      window.removeEventListener("touchstart", unlockSound);
      window.removeEventListener("keydown", unlockSound);
      window.removeEventListener("wheel", unlockSound);
      window.removeEventListener("scroll", unlockSound);
      lenisInstance?.off?.("scroll", unlockSound);
    };

    // Lenis (smooth scroll) intercepts native scroll, so listen to it
    // directly too — alongside the broadest set of native gesture events
    // (pointerdown covers mouse clicks AND touch taps in modern browsers;
    // touchstart/keydown/wheel/scroll are kept as extra fallbacks).
    const lenisInstance = (
      window as unknown as {
        __lenis?: { on: (e: string, cb: () => void) => void; off?: (e: string, cb: () => void) => void };
      }
    ).__lenis;

    lenisInstance?.on?.("scroll", unlockSound);
    window.addEventListener("pointerdown", unlockSound);
    window.addEventListener("touchstart", unlockSound, { passive: true });
    window.addEventListener("keydown", unlockSound);
    window.addEventListener("wheel", unlockSound, { passive: true });
    window.addEventListener("scroll", unlockSound, { passive: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Hero is back on screen — restart from the beginning every time.
          video.currentTime = 0;
          if (unlocked) {
            video.muted = false;
            video.volume = 1;
          }
          video.play().catch(() => {
            // If playing with sound gets blocked, fall back to muted so the
            // visual loop still runs instead of sitting frozen on the poster.
            video.muted = true;
            video.play().catch(() => {});
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(section);

    return () => {
      window.removeEventListener("pointerdown", unlockSound);
      window.removeEventListener("touchstart", unlockSound);
      window.removeEventListener("keydown", unlockSound);
      window.removeEventListener("wheel", unlockSound);
      window.removeEventListener("scroll", unlockSound);
      lenisInstance?.off?.("scroll", unlockSound);
      observer.disconnect();
    };
  }, []);

  // GSAP ScrollTrigger — subtle cinematic parallax on the hero background
  // as the user scrolls past it (the video layer drifts slower than the page).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[100vh] w-full overflow-hidden flex items-end md:items-center"
    >
      {/* Full-bleed avatar video as environment */}
      <div ref={videoLayerRef} className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          poster={assetPath("/video/hero-poster.jpg")}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "82% 30%" }}
        >
          <source src={assetPath("/video/hero-avatar.webm")} type="video/webm" />
          <source src="https://raw.githubusercontent.com/Guru2025-KIT/guruprasad-portfolio/main/public/video/hero-avatar.webm" type="video/webm" />
          <source src={assetPath("/video/hero-avatar.mp4")} type="video/mp4" />
          <source src="https://raw.githubusercontent.com/Guru2025-KIT/guruprasad-portfolio/main/public/video/hero-avatar.mp4" type="video/mp4" />
        </video>

        {/* Cinematic color grade + grid + vignette layers */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/75 to-ink-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/40" />
        <div className="absolute inset-0 bg-ink-950/20 mix-blend-multiply" />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(circle at 78% 65%, transparent 0%, rgba(5,5,5,0.2) 45%, rgba(5,5,5,0.85) 78%)",
          }}
        />
        <div className="absolute inset-0 bg-grid opacity-40" />

        {/* mouse-reactive ambient glow */}
        <div
          className="absolute inset-0 transition-opacity duration-700 pointer-events-none mix-blend-screen opacity-50 hidden md:block"
          style={{
            background: `radial-gradient(480px circle at ${glow.x}% ${glow.y}%, rgba(59,130,246,0.18), transparent 70%)`,
          }}
        />
      </div>

      <Particles />

      {/* Subtle hint that sound is one click away — disappears the instant
          the user interacts with the page at all (click, tap, key, scroll). */}
      {!soundUnlocked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="absolute top-24 md:top-28 right-6 md:right-10 z-10 pointer-events-none"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel font-mono text-[10px] uppercase tracking-widest2 text-paper/55">
            <Volume2 size={12} className="text-signal-blue" />
            Click anywhere for sound
          </span>
        </motion.div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pb-16 md:pb-16 pt-32 md:pt-28">
        <div className="max-w-[640px]">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-3 mb-6 font-mono text-[11px] md:text-xs uppercase tracking-widest2 text-paper/60"
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
            className="font-mono text-[12px] md:text-sm text-signal-blue mb-5 tracking-wide"
          >
            {profile.roles.join("  ·  ")}
          </motion.p>

          <h1 className="font-display font-medium text-[2.6rem] leading-[1.06] sm:text-6xl md:text-[4.2rem] md:leading-[1.04] text-paper text-balance">
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              {profile.headlinePrefix}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="block italic text-gradient-blue"
            >
              {profile.headlineHighlight}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              {profile.headlineSuffix}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-paper/70 text-base md:text-lg leading-relaxed max-w-[520px]"
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
              <a
                href="#projects"
                onClick={scrollToProjects}
                className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-signal-blue text-ink-950 font-medium text-sm overflow-hidden shadow-glow"
              >
                <span className="relative z-10">View Projects</span>
                <ArrowRight
                  size={16}
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                />
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

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 md:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-px max-w-[640px] glass-panel rounded-2xl overflow-hidden"
        >
          {profile.stats.map((s) => (
            <div
              key={s.label}
              className="px-5 py-5 border-paper/[0.07] [&:not(:last-child)]:border-r [&:nth-child(odd)]:sm:border-r-0 sm:[&:not(:last-child)]:border-r"
            >
              <div className="font-display text-2xl md:text-3xl text-paper">
                {s.value}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest2 text-paper/50 mt-1">
                {s.label}
              </div>
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
        className="hidden md:flex absolute bottom-8 right-10 z-10 flex-col items-center gap-2 text-paper/50 hover:text-signal-blue transition-colors"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest2 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.button>
    </section>
  );
}
