"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, X, ArrowUpRight, FileText, ExternalLink } from "lucide-react";
import { achievements } from "@/lib/data";
import { assetPath } from "@/lib/utils";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Achievements() {
  const [selected, setSelected] = useState<typeof achievements[0] | null>(null);

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section
      id="achievements"
      className="relative py-28 md:py-36 px-6 md:px-10 max-w-7xl mx-auto"
    >
      <div className="absolute inset-0 bg-grid opacity-[0.1] pointer-events-none" />

      <SectionHeading
        eyebrow="Recognition"
        lines={["Milestones along", "the way."]}
      />

      <div className="mt-16 grid sm:grid-cols-2 gap-6">
        {achievements.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.06}>
            <button
              onClick={() => setSelected(a)}
              data-cursor-hover
              className="group w-full text-left flex items-start gap-5 glass-panel rounded-3xl p-6 border border-paper/10 hover:border-signal-amber/40 hover:shadow-glow-amber transition-all duration-500 relative overflow-hidden"
            >
              {/* Subtle hover background highlight */}
              <div className="absolute inset-0 bg-gradient-to-br from-signal-amber/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-12 h-12 rounded-2xl bg-signal-amber/10 border border-signal-amber/20 flex items-center justify-center shrink-0 group-hover:bg-signal-amber/20 group-hover:border-signal-amber/30 transition-all duration-500">
                <Trophy size={20} className="text-signal-amber group-hover:scale-110 transition-transform duration-500" />
              </div>

              <div className="flex-1 min-w-0 pr-4">
                <h3 className="font-display text-base md:text-lg text-paper leading-snug group-hover:text-signal-amber transition-colors duration-300">
                  {a.title}
                </h3>
                <p className="font-mono text-[10px] text-paper/40 mt-1 uppercase tracking-widest leading-none">
                  {a.org}
                </p>
                {a.description && (
                  <p className="text-paper/60 text-xs mt-3 leading-relaxed line-clamp-2 group-hover:text-paper/85 transition-colors duration-300">
                    {a.description}
                  </p>
                )}
              </div>

              <div className="absolute top-5 right-5 text-paper/30 group-hover:text-signal-amber group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">
                <ArrowUpRight size={18} />
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-ink-950/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-4xl max-h-[90vh] glass-panel rounded-3xl overflow-hidden border border-paper/15 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-paper/10 bg-ink-950/80">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest2 text-signal-amber">
                    Certificate &amp; Proof
                  </span>
                  <h2 className="font-display text-lg md:text-xl text-paper mt-1">
                    {selected.title}
                  </h2>
                </div>
                <button
                  aria-label="Close modal"
                  onClick={() => setSelected(null)}
                  className="w-9 h-9 rounded-full bg-paper/5 hover:bg-paper/10 text-paper/70 hover:text-paper flex items-center justify-center transition-colors shrink-0"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content Panel */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col lg:flex-row gap-8 bg-ink-900/40">
                {/* Proof Viewer */}
                <div className="flex-1 min-h-[300px] md:min-h-[450px] bg-ink-950/60 border border-paper/5 rounded-2xl overflow-hidden flex items-center justify-center relative">
                  {selected.proof ? (
                    selected.proof.toLowerCase().endsWith(".pdf") ? (
                      <div className="w-full h-full flex flex-col">
                        <iframe
                          src={assetPath(selected.proof)}
                          className="w-full h-full border-0 flex-1 bg-white"
                          title="Certificate PDF Viewer"
                        />
                        <div className="p-3 border-t border-paper/10 bg-ink-950/80 flex justify-between items-center text-xs">
                          <span className="font-mono text-paper/50">PDF Document</span>
                          <a
                            href={assetPath(selected.proof)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-signal-amber hover:underline font-mono uppercase text-[10px] tracking-wide"
                          >
                            Open in New Tab <ExternalLink size={12} />
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full h-full min-h-[350px]">
                        <img
                          src={assetPath(selected.proof)}
                          alt={selected.title}
                          className="absolute inset-0 w-full h-full object-contain p-2"
                        />
                      </div>
                    )
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-paper/40">
                      <FileText size={48} className="stroke-[1.5]" />
                      <p className="font-mono text-xs">Verification document pending</p>
                    </div>
                  )}
                </div>

                {/* Details Side Panel */}
                <div className="lg:w-72 flex flex-col gap-6 shrink-0">
                  <div>
                    <h4 className="font-mono text-[10px] uppercase tracking-widest2 text-paper/40">
                      Issuer &middot; Organization
                    </h4>
                    <p className="text-paper/90 text-sm font-medium mt-1">
                      {selected.org}
                    </p>
                  </div>

                  {selected.description && (
                    <div>
                      <h4 className="font-mono text-[10px] uppercase tracking-widest2 text-paper/40">
                        Details &amp; Context
                      </h4>
                      <p className="text-paper/70 text-sm leading-relaxed mt-2 bg-paper/[0.02] p-4 rounded-xl border border-paper/[0.06]">
                        {selected.description}
                      </p>
                    </div>
                  )}

                  {selected.proof && (
                    <div className="mt-auto pt-6 border-t border-paper/10">
                      <a
                        href={assetPath(selected.proof)}
                        download
                        className="w-full py-3 px-4 rounded-xl bg-signal-amber text-ink-950 font-medium text-xs text-center block hover:bg-signal-amber/90 hover:shadow-glow-amber transition-all duration-300"
                      >
                        Download Document
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
