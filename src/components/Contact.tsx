export default function Contact() {
  return (
    <section className="mt-10">
      <div className="grid gap-5 rounded-lg border border-white/10 bg-[#11151a] p-8 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-semibold">About me</h2>

          <p className="mt-5 max-w-md text-zinc-300">
            I&apos;m a Game Development student focused on 3D and Technical Art. I enjoy working across multiple parts of the pipeline to create immersive and functional assets, tools, and systems.
          </p>

          <p className="mt-5 max-w-md text-zinc-300">
            <span className="font-semibold">MsC. Game Studies and Engineering </span>
          </p>
          <p className="mt-0 max-w-md text-zinc-300">
            AAU Klagenfurt, Austria 2025 - present
          </p>
          <p className="mt-5 max-w-md text-zinc-300">
            <span className="font-semibold">Bc. Theory of Digital Games </span>
          </p>
          <p className="mt-0 max-w-md text-zinc-300">
            UCM Trnava, Slovakia 2022 - 2025
          </p>

          <a
            href="/cv.pdf"
            className="mt-8 inline-block rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold transition hover:bg-indigo-500"
          >
            Download CV
          </a>
        </div>

        <div>
          <h2 className="text-3xl font-semibold">Contact</h2>

          <div className="mt-5 space-y-4 text-zinc-300">
            <p>
              <span className="font-semibold text-white">Email: </span>
              maxim.brnco@icloud.com
            </p>

            <p>
              <span className="font-semibold text-white">ArtStation: </span>
              artstation.com/maxim_brna
            </p>
          </div>
        </div>
      </div>

      <footer className="py-8 text-sm text-zinc-500">
        © 2025 Maxim Brna. All rights reserved.
      </footer>
    </section>
  );
}