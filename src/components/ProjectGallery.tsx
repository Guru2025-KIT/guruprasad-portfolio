"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { ProjectImage } from "@/lib/projects";
import { cn } from "@/lib/utils";

interface ProjectGalleryProps {
  images: ProjectImage[];
  accentText: string;
}

export default function ProjectGallery({ images, accentText }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const next = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length]
  );
  const prev = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex, close, next, prev]);

  if (images.length === 0) return null;

  return (
    <>
      <div className="grid sm:grid-cols-2 gap-4">
        {images.map((img, i) => (
          <button
            key={img.src}
            data-cursor-hover
            onClick={() => setActiveIndex(i)}
            className={cn(
              "group relative text-left rounded-2xl overflow-hidden border border-paper/10 hover:border-paper/25 transition-colors",
              i === 0 && "sm:col-span-2"
            )}
          >
            <div className={cn("relative w-full", i === 0 ? "aspect-[16/9]" : "aspect-[4/3]")}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                unoptimized
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-ink-950/0 group-hover:bg-ink-950/30 transition-colors flex items-center justify-center">
                <ZoomIn
                  size={22}
                  className="text-paper opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
            <div className="px-4 py-3 bg-ink-900/80">
              <p className="text-paper/70 text-xs leading-relaxed">{img.caption}</p>
            </div>
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[200] bg-ink-950/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
          onClick={close}
        >
          <button
            aria-label="Close"
            onClick={close}
            className="absolute top-5 right-5 md:top-8 md:right-8 text-paper/70 hover:text-paper transition-colors z-10"
          >
            <X size={28} />
          </button>

          {images.length > 1 && (
            <>
              <button
                aria-label="Previous image"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 text-paper/50 hover:text-paper transition-colors z-10 p-2"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                aria-label="Next image"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 text-paper/50 hover:text-paper transition-colors z-10 p-2"
              >
                <ChevronRight size={32} />
              </button>
            </>
          )}

          <div
            className="relative w-full max-w-5xl max-h-[80vh] flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[65vh]">
              <Image
                src={images[activeIndex].src}
                alt={images[activeIndex].alt}
                fill
                unoptimized
                className="object-contain"
                sizes="100vw"
              />
            </div>
            <p className="text-paper/70 text-sm text-center max-w-2xl">
              {images[activeIndex].caption}
            </p>
            {images.length > 1 && (
              <span className={cn("font-mono text-[11px] uppercase tracking-widest2", accentText)}>
                {activeIndex + 1} / {images.length}
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
}
