"use client";

import { usePathname, useRouter } from "next/navigation";
import { profile } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  const handleClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();

    if (!isHome) {
      router.push(`/${href}`);
      return;
    }

    const el = document.querySelector(href);
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, o?: object) => void } }).__lenis;
    if (el) {
      if (lenis) lenis.scrollTo(el, { offset: -60 });
      else el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative border-t border-paper/[0.08] pt-16 pb-8 px-6 md:px-10 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.12] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <p className="font-mono text-xs uppercase tracking-wide text-paper/50 max-w-sm leading-relaxed">
            Open to internships &middot; AI Engineer &middot; Full Stack
            Developer &middot; Let&rsquo;s build meaningful technology.
          </p>

          <div className="flex gap-6 font-mono text-xs uppercase tracking-wide text-paper/55">
            <a
              href={isHome ? "#about" : "/#about"}
              onClick={(e) => handleClick(e, "#about")}
              className="hover:text-signal-blue transition-colors"
            >
              About
            </a>
            <a
              href={isHome ? "#projects" : "/#projects"}
              onClick={(e) => handleClick(e, "#projects")}
              className="hover:text-signal-blue transition-colors"
            >
              Projects
            </a>
            <a
              href={isHome ? "#contact" : "/#contact"}
              onClick={(e) => handleClick(e, "#contact")}
              className="hover:text-signal-blue transition-colors"
            >
              Contact
            </a>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-signal-blue transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>

        <h2 className="font-display font-medium text-[14vw] md:text-[8.2vw] leading-[0.85] text-paper/95 select-none tracking-tight">
          {profile.name}
        </h2>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-6 border-t border-paper/[0.08]">
          <p className="font-mono text-[11px] text-paper/40 uppercase tracking-wide">
            Built with care. {year}.
          </p>
          <p className="font-mono text-[11px] text-paper/40 uppercase tracking-wide">
            Next.js &middot; TypeScript &middot; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
