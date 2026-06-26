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
    <section className="relative min-h-[500px] overflow-hidden rounded-xl bg-[#11151a]">
      <div className="relative z-10 flex min-h-[500px] max-w-md flex-col justify-end px-10 pb-8">
        <h2 className="text-5xl font-semibold tracking-tight">Maxim Brna</h2>

        <p className="mt-4 text-xl text-zinc-200">
          Game Development student focused on
        </p>

        <p className="mt-1 text-3xl font-semibold tracking-tight text-indigo-500">
          3D &amp; Technical Art
        </p>

        <p className="mt-4 text-zinc-400">
          Based in Klagenfurt, Austria.
        </p>

        <a
          href="/cv.pdf"
          className="mt-7 inline-block w-fit rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold transition hover:bg-indigo-500"
        >
          Download CV
        </a>

        <div className="mt-5 flex items-center gap-5">
          <a
            href="https://www.artstation.com/maxim_brna"
            target="_blank"
            rel="noopener noreferrer"
            title="Open ArtStation"
            className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#11151a]/80 transition hover:bg-white/5"
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
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#11151a]/80 transition hover:bg-white/5"
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
          alt="Trench environment render"
          className="h-full w-full object-cover object-right opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#11151a] via-[#11151a]/70 to-transparent" />
      </div>
    </section>
  );
}