"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * When a user clicks a nav/footer link while on a /projects/[slug] page,
 * we navigate them to e.g. "/#skills". Next's router.push doesn't scroll to
 * URL hashes the way a normal browser navigation does, so this component
 * picks up window.location.hash once the homepage has mounted and scrolls
 * to it — via Lenis if available, otherwise a native smooth scroll.
 *
 * Sections further down the page (Skills, Achievements, Contact) sit below
 * image-heavy areas (Projects) whose layout can still be shifting slightly
 * as images finish loading, which would throw off a single fixed-delay
 * scroll attempt. To stay reliable regardless of where the target section
 * is, this re-targets the scroll a few times over ~1.2s rather than firing
 * once and hoping the layout has already settled.
 */
export default function ScrollToHashOnLoad() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    const hash = window.location.hash;
    if (!hash) return;

    const lenis = () =>
      (
        window as unknown as {
          __lenis?: { scrollTo: (t: Element, o?: object) => void };
        }
      ).__lenis;

    const scrollToHash = () => {
      const el = document.querySelector(hash);
      if (!el) return;
      const instance = lenis();
      if (instance) {
        instance.scrollTo(el, { offset: -90 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    };

    // Re-attempt the scroll a few times as images/layout settle, rather than
    // a single fixed-delay guess — each attempt re-measures the target
    // element's current position, so later attempts self-correct earlier ones.
    // If the user manually scrolls or interacts during this window, stop
    // re-targeting immediately so we never yank them away from where they
    // chose to look.
    let cancelled = false;
    const cancel = () => {
      cancelled = true;
    };
    window.addEventListener("wheel", cancel, { once: true, passive: true });
    window.addEventListener("touchstart", cancel, { once: true, passive: true });

    const delays = [100, 400, 900, 1500];
    const timeouts = delays.map((d) =>
      setTimeout(() => {
        if (!cancelled) scrollToHash();
      }, d)
    );

    return () => {
      timeouts.forEach(clearTimeout);
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
    };
  }, [pathname]);

  return null;
}
