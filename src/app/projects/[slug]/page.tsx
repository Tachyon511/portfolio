import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {
  getAllProjects,
  getProjectBySlug,
  slugify,
} from "../../../lib/projects";

const toolIcons: Record<string, string> = {
  "Unreal Engine 5": "/skills/unreal.png",
  Blender: "/skills/blender.png",
  "Substance Painter": "/skills/substance.png",
  Python: "/skills/python.png",
  "C++": "/skills/cpp.png",
};

export function generateStaticParams() {
  return getAllProjects().map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#05070a] text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <a
          href="/"
          className="sticky top-0 z-50 inline-block rounded-md border border-white/10 bg-[#11151a]/90 px-4 py-2 text-sm font-semibold text-indigo-400 backdrop-blur transition hover:border-indigo-500/80 hover:text-indigo-300"
        >
          ← Back to homepage
        </a>

        <article className="mt-8">
          <header className="overflow-hidden rounded-lg border border-white/10 bg-[#11151a]">
            <img
              src={project.heroImage}
              alt={project.title}
              className="h-[280px] w-full object-cover"
            />

            <div className="p-8">
              <p className="text-sm text-zinc-400">{project.category}</p>

              <h1 className="mt-2 text-5xl font-semibold tracking-tight">
                {project.title}
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-zinc-300">
                {project.description}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                {project.tools.map((tool) => {
                  const icon = toolIcons[tool];

                  if (!icon) return null;

                  return (
                    <div
                      key={tool}
                      className="flex h-20 w-12 items-center justify-center rounded-lg"
                      title={tool}
                    >
                      <img
                        src={icon}
                        alt={tool}
                        className="h-12 w-12 object-contain"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </header>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_240px]">
            <div className="max-w-3xl">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  h2: ({ children }) => {
                    const text = String(children);
                    const id = slugify(text);

                    return (
                      <h2
                        id={id}
                        className="scroll-mt-24 mt-12 text-3xl font-semibold first:mt-0"
                      >
                        {children}
                      </h2>
                    );
                  },

                  p: ({ children }) => (
                    <p className="mt-4 text-lg leading-relaxed text-zinc-300">
                      {children}
                    </p>
                  ),

                  img: ({ src, alt, title }) => (
                    <figure className="my-8 overflow-hidden rounded-lg border border-white/10 bg-[#11151a]">
                      <img
                        src={src ?? ""}
                        alt={alt ?? ""}
                        className="h-auto w-full object-cover"
                      />

                      {(alt || title) && (
                        <figcaption className="border-t border-white/10 px-4 py-3 text-sm text-zinc-400">
                          {title || alt}
                        </figcaption>
                      )}
                    </figure>
                  ),

                  video: ({ children, ...props }) => (
                    <video
                      {...props}
                      controls
                      muted
                      loop
                      playsInline
                      className="my-8 w-full rounded-lg border border-white/10 bg-black"
                    >
                      {children}
                    </video>
                  ),

                  ul: ({ children }) => (
                    <ul className="mt-4 list-disc space-y-2 pl-6 text-lg leading-relaxed text-zinc-300">
                      {children}
                    </ul>
                  ),

                  strong: ({ children }) => (
                    <strong className="font-semibold text-white">
                      {children}
                    </strong>
                  ),
                }}
              >
                {project.content}
              </ReactMarkdown>
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-10 rounded-lg border border-white/10 bg-[#11151a]/90 p-5 backdrop-blur">
                <p className="font-semibold">Outline</p>

                <nav className="mt-4 space-y-3">
                  {project.headings.map((heading) => (
                    <a
                      key={heading.id}
                      href={`#${heading.id}`}
                      className="block text-sm text-zinc-400 transition hover:text-indigo-400"
                    >
                      {heading.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          </div>
        </article>
      </div>
    </main>
  );
}