"use client";

import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { profile } from "@/lib/data";
import Magnetic from "./Magnetic";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const channels = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
  {
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, "")}`,
    icon: Phone,
  },
  {
    label: "GitHub",
    value: profile.github,
    href: profile.githubUrl,
    icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    value: profile.linkedin,
    href: profile.linkedinUrl,
    icon: LinkedinIcon,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-28 md:py-40 px-6 md:px-10 max-w-7xl mx-auto"
    >
      <div className="absolute inset-0 bg-grid opacity-[0.15] pointer-events-none" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.12] blur-3xl pointer-events-none"
        style={{ background: "#3B82F6" }}
      />

      <div className="relative text-center max-w-3xl mx-auto">
        <SectionHeading
          align="center"
          eyebrow="Get in touch"
          lines={["Let's build something", "meaningful."]}
        />

        <Reveal delay={0.15}>
          <div className="mt-7 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel">
            <span className="w-2 h-2 rounded-full bg-signal-blue animate-pulse-slow" />
            <span className="font-mono text-xs uppercase tracking-wide text-paper/75">
              Open for internships and collaborations
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.22}>
          <div className="mt-10">
            <Magnetic>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-signal-blue text-ink-950 font-medium text-base shadow-glow"
              >
                View Resume
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </div>

      <div className="relative mt-16 grid sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {channels.map((c, i) => {
          const Icon = c.icon;
          return (
            <Reveal key={c.label} delay={0.05 * i}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                data-cursor-hover
                className="group flex flex-col gap-3 glass-panel rounded-2xl p-5 hover:border-signal-blue/30 transition-colors duration-500"
              >
                <div className="w-9 h-9 rounded-lg bg-signal-blue/15 border border-signal-blue/25 flex items-center justify-center">
                  <Icon width={16} height={16} className="text-signal-blue" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest2 text-paper/45">
                    {c.label}
                  </p>
                  <p className="text-paper/85 text-sm mt-1 truncate group-hover:text-signal-blue transition-colors">
                    {c.value}
                  </p>
                </div>
              </a>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
