"use client";

import { useState } from "react";

export type GalleryMedia = {
  src: string;
  type: "image" | "video";
  poster?: string;
  alt: string;
};

type ProjectGalleryProps = {
  media: GalleryMedia[];
  projectTitle: string;
};

export default function ProjectGallery({ media, projectTitle }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  if (media.length === 0) return null;

  const active = media[activeIndex] ?? media[0];
  const multiple = media.length > 1;

  function previous() {
    setActiveIndex((i) => (i + media.length - 1) % media.length);
  }

  function next() {
    setActiveIndex((i) => (i + 1) % media.length);
  }

  return (
    <div aria-label={`${projectTitle} media gallery`} className="bg-black">
      {/* The main hero media itself is always 16:9. */}
      <div className="group relative aspect-video w-full overflow-hidden">
        {active.type === "image" ? (
          <img
            key={active.src}
            src={active.src}
            alt={active.alt}
            className="absolute inset-0 h-full w-full object-contain"
          />
        ) : (
          <video
            key={active.src}
            src={active.src}
            poster={active.poster}
            controls
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full bg-black object-contain"
          />
        )}

        {multiple && (
          <>
            <button
              type="button"
              onClick={previous}
              aria-label="Previous gallery item"
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/65 text-xl text-white opacity-100 backdrop-blur transition hover:border-indigo-400 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next gallery item"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/65 text-xl text-white opacity-100 backdrop-blur transition hover:border-indigo-400 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100"
            >
              ›
            </button>
          </>
        )}

        <span className="absolute right-4 top-4 rounded-md border border-white/10 bg-black/65 px-3 py-1 text-xs text-white backdrop-blur">
          {activeIndex + 1} / {media.length}
        </span>
      </div>

      {multiple && (
        <div className="flex gap-2 overflow-x-auto border-t border-white/10 bg-[#0b0e12] p-3">
          {media.map((item, index) => {
            const selected = index === activeIndex;
            const thumbnail = item.type === "video" ? item.poster : item.src;

            return (
              <button
                key={item.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show gallery item ${index + 1}: ${item.alt}`}
                aria-pressed={selected}
                className={`relative aspect-video w-20 shrink-0 overflow-hidden rounded-md border transition sm:w-24 ${
                  selected
                    ? "border-indigo-400 ring-1 ring-indigo-400"
                    : "border-white/10 hover:border-white/40"
                }`}
              >
                {thumbnail ? (
                  <img src={thumbnail} alt="" className="h-full w-full object-cover" />
                ) : (
                  <span className="flex h-full w-full items-center justify-center bg-[#11151a] text-lg text-white">▶</span>
                )}
                {item.type === "video" && thumbnail && (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/25 text-lg text-white">▶</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
