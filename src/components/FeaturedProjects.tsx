"use client";

import { useState } from "react";
import Link from "next/link";
import type { Project } from "../lib/projects";

const toolIcons: Record<string, string> = {
  "Unreal Engine 5": "/skills/unreal.png",
  Blender: "/skills/blender.png",
  "Substance Painter": "/skills/substance.png",
  Python: "/skills/python.png",
  "C++": "/skills/cpp.png",
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="block h-full">
      <article className="group h-full overflow-hidden rounded-lg border-2 border-white/10 bg-[#11151a] transition hover:border-indigo-500/80">
        <div className="relative overflow-hidden rounded-sm">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="h-40 w-full object-cover transition duration-300 group-hover:scale-105"
          />

          <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition duration-300 group-hover:bg-black/50 group-hover:opacity-100">
            <span className="rounded-md border border-indigo-400 px-5 py-2 text-sm font-semibold text-white">
              View Project
            </span>
          </div>
        </div>

        <div className="px-4 pb-4">
          <p className="mt-3 text-sm text-zinc-500">{project.category}</p>

          <h3 className="mt-2 text-xl font-semibold">{project.title}</h3>

          <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-400">
            {project.description}
          </p>

          {project.tools.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {project.tools.map((tool) => {
                const icon = toolIcons[tool];

                if (!icon) return null;

                return (
                  <div
                    key={tool}
                    title={tool}
                    className="flex h-8 w-10 items-center justify-center rounded-md"
                  >
                    <img
                      src={icon}
                      alt={tool}
                      className="h-8 w-8 object-contain"
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}

export default function FeaturedProjects({
  projects,
}: {
  projects: Project[];
}) {
  const [showAll, setShowAll] = useState(false);

  const sortedProjects = [...projects].sort((a, b) => a.order - b.order);

  const featuredProjects = sortedProjects.slice(0, 4);
  const additionalProjects = sortedProjects.slice(4);

  return (
    <section className="mt-10">
      <h2 className="mb-6 text-3xl font-semibold">Projects</h2>

      <div className="grid gap-5 md:grid-cols-2">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {showAll && (
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {additionalProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}

      {additionalProjects.length > 0 && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setShowAll((current) => !current)}
            className="rounded-md border border-white/10 bg-[#11151a] px-6 py-3 text-sm font-semibold text-indigo-400 transition hover:border-indigo-500/80 hover:text-indigo-300"
          >
            {showAll ? "Hide projects ↑" : "View all projects ↓"}
          </button>
        </div>
      )}
    </section>
  );
}