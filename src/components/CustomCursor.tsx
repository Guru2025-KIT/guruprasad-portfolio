"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let firstMove = true;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
      document.documentElement.style.setProperty("--cursor-x", `${mouseX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${mouseY}px`);
      if (firstMove) {
        firstMove = false;
        ringX = mouseX;
        ringY = mouseY;
        setVisible(true);
      }
    };

    let rafId: number;
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`;
      rafId = requestAnimationFrame(animateRing);
    };
    rafId = requestAnimationFrame(animateRing);

    const onEnterInteractive = () => {
      ring.style.width = "64px";
      ring.style.height = "64px";
      ring.style.borderColor = "rgba(59,130,246,0.7)";
      dot.style.width = "8px";
      dot.style.height = "8px";
    };
    const onLeaveInteractive = () => {
      ring.style.width = "40px";
      ring.style.height = "40px";
      ring.style.borderColor = "rgba(248,248,242,0.4)";
      dot.style.width = "18px";
      dot.style.height = "18px";
    };

    window.addEventListener("mousemove", onMove);

    const interactiveEls = () =>
      document.querySelectorAll("a, button, [data-cursor-hover]");

    const attach = () => {
      interactiveEls().forEach((el) => {
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
    };
    attach();

    const observer = new MutationObserver(() => attach());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor hidden md:block"
        style={{ opacity: visible ? 1 : 0 }}
      />
      <div
        ref={ringRef}
        className="custom-cursor-ring hidden md:block"
        style={{ opacity: visible ? 1 : 0 }}
      />
    </>
  );
}
