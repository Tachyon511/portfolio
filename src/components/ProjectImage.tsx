"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

type ProjectImageProps = {
  src: string;
  alt: string;
};

export default function ProjectImage({ src, alt }: ProjectImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  const modal =
    isOpen && typeof document !== "undefined"
      ? createPortal(
          <div
            className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`Expanded image: ${alt}`}
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
        className="my-8 block w-full cursor-zoom-in overflow-hidden rounded-lg border border-white/10 text-left transition hover:border-indigo-500/80"
        title="Click to expand image"
      >
        <img
          src={src}
          alt={alt}
          className="h-auto w-full object-cover"
        />

        {alt && (
          <span className="block border-t border-white/10 bg-[#11151a] px-4 py-3 text-sm text-zinc-400">
            {alt}
          </span>
        )}
      </button>

      {modal}
    </>
  );
}