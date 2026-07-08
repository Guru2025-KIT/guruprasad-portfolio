"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setOpen(false);

    // Not on the homepage (e.g. on a /projects/[slug] case-study page) —
    // these anchors don't exist here, so navigate to the homepage + anchor.
    if (!isHome) {
      router.push(`/${href}`);
      return;
    }

    const el = document.querySelector(href);
    if (!el) return;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, o?: object) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(el, { offset: -90 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled ? "glass-nav border-b border-paper/[0.06]" : "bg-transparent"
      )}
    >
      <nav className="mx-auto max-w-7xl px-6 md:px-10 h-[78px] flex items-center justify-between">
        <a
          href={isHome ? "#hero" : "/"}
          onClick={(e) => handleClick(e, "#hero")}
          className="font-mono text-xs tracking-widest2 uppercase text-paper/90 hover:text-signal-blue transition-colors"
        >
          GS<span className="text-signal-blue">.</span>dev
        </a>

        <ul className="hidden md:flex items-center gap-9">
          {links.map((link, i) => (
            <li key={link.href}>
              <a
                href={isHome ? link.href : `/${link.href}`}
                onClick={(e) => handleClick(e, link.href)}
                className="relative font-mono text-[12px] tracking-wide uppercase text-paper/65 hover:text-paper transition-colors group"
              >
                <span className="text-signal-blue/60 mr-1.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {link.label}
                <span className="absolute -bottom-1.5 left-0 w-0 h-px bg-signal-blue transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href={isHome ? "#contact" : "/#contact"}
          onClick={(e) => handleClick(e, "#contact")}
          className="hidden md:inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-wide px-4 py-2 border border-paper/15 rounded-full text-paper/90 hover:border-signal-blue hover:text-signal-blue transition-colors"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-signal-blue animate-pulse-slow" />
          Available
        </a>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden text-paper p-2"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-ink-950 border-t border-paper/[0.06] overflow-hidden"
          >
            <ul className="flex flex-col px-6 py-4 gap-1">
              {links.map((link, i) => (
                <li key={link.href}>
                  <a
                    href={isHome ? link.href : `/${link.href}`}
                    onClick={(e) => handleClick(e, link.href)}
                    className="flex items-center py-3 font-mono text-sm uppercase tracking-wide text-paper/75 border-b border-paper/[0.06] last:border-0"
                  >
                    <span className="text-signal-blue/60 mr-2.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
