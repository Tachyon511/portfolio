import Link from "next/link";

export default function Experience() {
  return (
    <section className="mt-10">
      <h2 className="mb-6 text-3xl font-semibold">Experience</h2>

      <article className="overflow-hidden rounded-lg border border-white/10 bg-[#11151a]">
        <div className="grid md:grid-cols-[1.4fr_1fr]">
          <div className="p-8">
            <h3 className="text-2xl font-semibold">
              3D / Technical Artist
            </h3>

            <p className="mt-1 text-lg text-zinc-300">
              Incidental Minds, Slovakia
            </p>

            <p className="text-lg text-zinc-500">2025</p>

            <ul className="mt-8 list-disc space-y-2 pl-6 text-zinc-300">
              <li>Created 3D environment assets</li>
              <li>
                Collaborated with 3D artists and developers on implementation
                and optimization of assets within the Unreal Engine pipeline
              </li>
              <li>
                Created shaders and procedural tools for level designers
              </li>
            </ul>
          </div>

          <Link
            href="/projects/incidental-minds-report"
            className="group relative block min-h-64 overflow-hidden border-t border-white/10 md:border-l md:border-t-0"
          >
            <img
              src="/projects/we-resist/render02.png"
              alt="Incidental Minds report preview"
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition duration-300 group-hover:bg-black/50 group-hover:opacity-100">
              <span className="rounded-md border border-indigo-400 px-5 py-2 text-sm font-semibold text-white">
                View Report
              </span>
            </div>
          </Link>
        </div>
      </article>
    </section>
  );
}