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

export default function ProjectGallery({
  media,
  projectTitle,
}: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeMedia = media[activeIndex];
  const hasMultipleItems = media.length > 1;

  function showPrevious() {
    setActiveIndex((current) =>
      current === 0 ? media.length - 1 : current - 1
    );
  }

  function showNext() {
    setActiveIndex((current) =>
      current === media.length - 1 ? 0 : current + 1
    );
  }

  return (
    <div className="bg-black">
      <div className="group relative h-[320px] overflow-hidden sm:h-[420px]">
        {activeMedia.type === "image" ? (
          <img
            src={activeMedia.src}
            alt={activeMedia.alt}
            className="h-full w-full object-cover"
          />
        ) : (
          <video
            key={activeMedia.src}
            src={activeMedia.src}
            poster={activeMedia.poster}
            controls
            muted
            loop
            playsInline
            className="h-full w-full object-cover bg-black"
          />
        )}

        {hasMultipleItems && (
          <>
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Previous gallery item"
              title="Previous"
              className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-2xl text-white opacity-0 backdrop-blur transition hover:border-indigo-400 hover:bg-black/80 group-hover:opacity-100"
            >
              ←
            </button>

            <button
              type="button"
              onClick={showNext}
              aria-label="Next gallery item"
              title="Next"
              className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-2xl text-white opacity-0 backdrop-blur transition hover:border-indigo-400 hover:bg-black/80 group-hover:opacity-100"
            >
              →
            </button>
          </>
        )}

        <div className="absolute left-4 top-4 rounded-md border border-white/10 bg-black/60 px-3 py-1 text-xs text-zinc-300 backdrop-blur">
          {activeIndex + 1} / {media.length}
        </div>
      </div>

      {hasMultipleItems && (
        <div className="flex gap-2 overflow-x-auto border-t border-white/10 bg-[#0b0e12] p-3">
          {media.map((item, index) => {
            const isActive = index === activeIndex;
            const thumbnailSource =
              item.type === "video" ? item.poster : item.src;

            return (
              <button
                key={item.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                title={`Show ${item.alt}`}
                className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-md border transition sm:h-16 sm:w-24 ${
                  isActive
                    ? "border-indigo-400 ring-1 ring-indigo-400"
                    : "border-white/10 hover:border-white/40"
                }`}
              >
                {thumbnailSource ? (
                  <img
                    src={thumbnailSource}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center bg-[#11151a] text-lg text-zinc-300">
                    ▶
                  </span>
                )}

                {item.type === "video" && (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/35 text-lg text-white">
                    ▶
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}