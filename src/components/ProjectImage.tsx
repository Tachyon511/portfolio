"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

type ProjectImageProps = {
  src: string;
  alt: string;
  embedded?: boolean;
  cover?: boolean;
};

export default function ProjectImage({
  src,
  alt,
  embedded = false,
  cover = false,
}: ProjectImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const canOptimize = src.startsWith("/") && !src.startsWith("//") && !/\.(gif|svg)(?:[?#]|$)/i.test(src);
  const imageSizes = embedded
    ? "(max-width: 767px) 100vw, 850px"
    : "(max-width: 1100px) 100vw, 1400px";

  // Close the full-screen preview with Escape.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const modal =
    isOpen && typeof document !== "undefined"
      ? createPortal(
          <div
            className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`Expanded image: ${alt || "project image"}`}
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-md border border-white/20 bg-[#11151a] text-2xl text-white transition hover:border-indigo-400"
              aria-label="Close expanded image"
              title="Close"
            >
              ×
            </button>

            <img
              src={src}
              alt={alt}
              className="max-h-[90vh] max-w-[95vw] cursor-default rounded-md object-contain shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            />
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={`Enlarge image: ${alt || "project image"}`}
        title="Click to enlarge"
        className={
          embedded
            ? "group relative block h-full w-full cursor-zoom-in overflow-hidden bg-black text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400"
            : "group my-6 block w-full cursor-zoom-in overflow-hidden rounded-lg border border-white/10 bg-black text-left transition hover:border-indigo-500/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400"
        }
      >
        {/* Standalone images preserve 16:9 + contain; split text/image can fill. */}
        <span
          className={
            embedded
              ? "relative block h-full w-full"
              : "relative block aspect-video w-full"
          }
        >
          {canOptimize ? (
            <>
              {/* Request a sharper optimized rendition for on-page display. */}
              {/* Browser selects a responsive resolution. Original is loaded only in fullscreen. */}
              <Image
                src={src}
                alt={alt}
                fill
                sizes={imageSizes}
                loading="lazy"
                className={cover ? "object-cover object-center" : "object-contain"}
              />
            </>
          ) : (
            <img
              src={src}
              alt={alt}
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 h-full w-full ${
                cover ? "object-cover object-center" : "object-contain"
              }`}
            />
          )}

          {/* Only the overlay fades in: the image never changes size. */}
          <span className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/25 group-hover:opacity-100 group-focus-visible:bg-black/25 group-focus-visible:opacity-100">
            <span className="inline-flex items-center gap-2 rounded-md border border-white/25 bg-[#11151a]/85 px-3 py-2 text-xs font-medium text-white shadow-lg backdrop-blur-sm sm:text-sm">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35M11 8v6M8 11h6" />
              </svg>
              Click to enlarge
            </span>
          </span>

          {/* Embedded captions stay inside the 16:9 media frame. */}
          {embedded && alt && (
            <span className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-black/70 px-3 py-2 text-xs text-zinc-200">
              {alt}
            </span>
          )}
        </span>

        {!embedded && alt && (
          <span className="block border-t border-white/10 bg-[#11151a] px-4 py-3 text-sm text-zinc-400">
            {alt}
          </span>
        )}
      </button>
      {modal}
    </>
  );
}
