"use client";

import { useState } from "react";

export default function Hero() {
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText("maxim.brnco@icloud.com");
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  return (
    <section className="relative overflow-hidden rounded-xl bg-[#11151a]">
      <div className="relative z-10 max-w-md px-10 pt-20 pb-5">
        <h2 className="text-5xl font-semibold tracking-tight">Maxim Brna</h2>

        <p className="mt-4 text-xl text-zinc-200">
          Game Development student focused on 3D & Technical Art
        </p>

        <p className="mt-6 text-zinc-400">
          I enjoy working across multiple parts of the pipeline to create
          immersive and functional assets, tools, and systems.
        </p>

        <p className="mt-2 text-zinc-400">Based in Klagenfurt, Austria.</p>

        <a
          href="/cv.pdf"
          className="mt-8 inline-block rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold transition hover:bg-indigo-500"
        >
          Download CV
        </a>

        <div className="mt-5 flex items-center gap-5">
          <a
            href="https://www.artstation.com/maxim_brna"
            target="_blank"
            rel="noopener noreferrer"
            title="Open ArtStation"
            className="flex h-11 w-11 items-center justify-center rounded-lg  bg-[#11151a]/80 transition hover:border-indigo-500/80"
          >
            <img
              src="/icons/artstation.png"
              alt="ArtStation"
              className="h-10 w-10 object-contain"
            />
          </a>

          <button
            type="button"
            onClick={copyEmail}
            title={copied ? "Copied" : "Copy email"}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#11151a]/80 transition hover:border-indigo-500/80"
          >
            <img
              src="/icons/email.png"
              alt="Email"
              className="h-10 w-10 object-contain"
            />
          </button>

          {copied && (
            <span className="text-sm font-medium text-zinc-400">
              Email copied
            </span>
          )}
        </div>
      </div>

      <div className="absolute inset-0">
        <img
          src="/Hero.png"
          alt="Spider mech render"
          className="h-full w-full object-cover object-right opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#11151a] via-[#11151a]/70 to-transparent" />
      </div>
    </section>
  );
}