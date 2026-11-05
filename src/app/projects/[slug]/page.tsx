import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import {
  getAllProjects,
  getProjectBySlug,
  slugify,
} from "../../../lib/projects";

import ProjectGallery, {
  type GalleryMedia,
} from "../../../components/ProjectGallery";
import ProjectImage from "../../../components/ProjectImage";
import ProjectVideo from "../../../components/ProjectVideo";
import { parseProjectBlocks } from "../../../lib/project-blocks";

const toolIcons: Record<string, string> = {
  "Unreal Engine 5": "/skills/unreal.png",
  Blender: "/skills/blender.png",
  "Substance Painter": "/skills/substance.png",
  Python: "/skills/python.png",
  "C++": "/skills/cpp.png",
};

const imageExtensions = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
  ".gif",
]);

const videoExtensions = new Set([
  ".mp4",
  ".webm",
]);

function getProjectGallery(slug: string): GalleryMedia[] {
  const galleryDirectory = path.join(
    process.cwd(),
    "public",
    "projects",
    slug,
    "gallery"
  );

  if (!fs.existsSync(galleryDirectory)) {
    return [];
  }

  const files = fs
    .readdirSync(galleryDirectory)
    .filter((file) => {
      const extension = path.extname(file).toLowerCase();
      const isSupported =
        imageExtensions.has(extension) || videoExtensions.has(extension);

      const isPoster = /-poster\.(jpg|jpeg|png|webp|avif)$/i.test(file);

      return isSupported && !isPoster;
    })
    .sort((a, b) =>
      a.localeCompare(b, undefined, {
        numeric: true,
        sensitivity: "base",
      })
    );

  return files.map((file) => {
    const extension = path.extname(file).toLowerCase();
    const isVideo = videoExtensions.has(extension);
    const fileNameWithoutExtension = path.basename(file, extension);

    let poster: string | undefined;

    if (isVideo) {
      const possiblePosterExtensions = [
        ".webp",
        ".png",
        ".jpg",
        ".jpeg",
        ".avif",
      ];

      const foundPosterExtension = possiblePosterExtensions.find((posterExtension) =>
        fs.existsSync(
          path.join(
            galleryDirectory,
            `${fileNameWithoutExtension}-poster${posterExtension}`
          )
        )
      );

      if (foundPosterExtension) {
        poster = `/projects/${slug}/gallery/${fileNameWithoutExtension}-poster${foundPosterExtension}`;
      }
    }

    return {
      src: `/projects/${slug}/gallery/${file}`,
      type: isVideo ? "video" : "image",
      poster,
      alt: `${slug.replaceAll("-", " ")} gallery item`,
    };
  });
}

// Identify image/video-only columns. They fill the full grid cell, while
// text columns keep their padding and grow naturally without scrollbars.
function isMediaOnly(content: string): boolean {
  const text = content.trim();
  if (!text) return false;

  const withoutMedia = text
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/<video\b[\s\S]*?<\/video\s*>/gi, "")
    .trim();

  return withoutMedia.length === 0;
}

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


  const contentBlocks = parseProjectBlocks(project.content);
  const folderGallery = getProjectGallery(project.slug);

  const galleryMedia: GalleryMedia[] =
    folderGallery.length > 0
      ? folderGallery
      : [
          {
            src: project.heroImage,
            type: "image",
            alt: project.title,
          },
        ];

  return (
    <main className="min-h-screen bg-[#05070a] text-white">
      <div className="mx-auto max-w-[1040px] px-4 pt-4 pb-10 sm:px-6 sm:pt-5 sm:pb-10">
        <a
          href="/"
          className="sticky top-0 z-50 inline-block rounded-md border border-white/10 bg-[#11151a]/90 px-4 py-2 text-sm font-semibold text-indigo-400 backdrop-blur transition hover:border-indigo-500/80 hover:text-indigo-300"
        >
          ← Back to homepage
        </a>

        <article className="mt-4">
          <header className="overflow-hidden rounded-lg border border-white/10 bg-[#11151a]">
            <ProjectGallery
              media={galleryMedia}
              projectTitle={project.title}
            />

            <div className="p-5 sm:p-7">
              <p className="text-sm text-zinc-400">{project.category}</p>

              <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                {project.title}
              </h1>

              <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-300">
                {project.description}
              </p>

              {project.tags?.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-indigo-400/25 bg-indigo-500/10 px-2 py-1 text-xs font-medium text-indigo-300"
                    >
                      {tag.replaceAll("_", " ")}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-3">
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

          {/* Full-width project content: no permanent right sidebar. */}
          <div className="mt-7 min-w-0">
            {contentBlocks.map((block, index) => {
              if (block.type === "markdown") {
                return (
                  <div key={index} className="w-full min-w-0">
                    <ProjectMarkdown content={block.content} />
                  </div>
                );
              }

              const layoutIndex = contentBlocks
                .slice(0, index)
                .filter((item) => item.type !== "markdown").length;
              const tone = layoutIndex % 2 === 0
                ? "bg-[#101419]"
                : "bg-[#171b21]";

              if (block.type === "hero") {
                return (
                  <section
                    key={index}
                    className={`my-4 aspect-video w-full overflow-hidden rounded-lg border border-white/10 ${tone}`}
                  >
                    <div className="h-full min-h-0 w-full">
                      <ProjectMarkdown content={block.content} embedded />
                    </div>
                  </section>
                );
              }

              // Split panels stretch to the height of the longer text column.
              // Crop images only when paired with text; image/image pairs
              // and standalone images keep their original object-contain fit.
              const leftMediaOnly = isMediaOnly(block.left);
              const rightMediaOnly = isMediaOnly(block.right);

              return (
                <section
                  key={index}
                  className={`my-4 grid overflow-hidden rounded-lg border border-white/10 md:grid-cols-2 ${tone}`}
                >
                  <div
                    className={`relative min-w-0 border-b border-white/10 md:border-b-0 md:border-r ${
                      leftMediaOnly
                        ? "overflow-hidden bg-black"
                        : "p-4 md:p-5"
                    }`}
                  >
                    {leftMediaOnly ? (
                      <>
                        {/* The spacer sets the minimum 16:9 size. Grid stretch
                            makes this panel taller when the text needs it. */}
                        <div aria-hidden="true" className="aspect-video w-full" />
                        <div className="absolute inset-0">
                          <ProjectMarkdown content={block.left} embedded cropImages={!rightMediaOnly} />
                        </div>
                      </>
                    ) : (
                      <ProjectMarkdown content={block.left} />
                    )}
                  </div>

                  <div
                    className={`relative min-w-0 ${
                      rightMediaOnly
                        ? "overflow-hidden bg-black"
                        : "p-4 md:p-5"
                    }`}
                  >
                    {rightMediaOnly ? (
                      <>
                        <div aria-hidden="true" className="aspect-video w-full" />
                        <div className="absolute inset-0">
                          <ProjectMarkdown content={block.right} embedded cropImages={!leftMediaOnly} />
                        </div>
                      </>
                    ) : (
                      <ProjectMarkdown content={block.right} />
                    )}
                  </div>
                </section>
              );
            })}
          </div>
        </article>
      </div>
    </main>
  );
}

function ProjectMarkdown({
  content,
  embedded = false,
  cropImages = false,
}: {
  content: string;
  embedded?: boolean;
  cropImages?: boolean;
}) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        h2: ({ children }) => {
          const text = String(children);
          return (
            <h2 id={slugify(text)} className="scroll-mt-24 mt-8 text-2xl font-semibold first:mt-0">
              {children}
            </h2>
          );
        },
        h3: ({ children }) => <h3 className="mt-5 text-lg font-semibold">{children}</h3>,
        p: ({ node, children }) => {
          // Markdown normally wraps images in paragraphs. A div is needed for
          // interactive media components without invalid <p><button> nesting.
          const hasMedia = node?.children?.some(
            (child) => child.type === "element" && (child.tagName === "img" || child.tagName === "video")
          );
          return hasMedia ? (
            <div className={embedded ? "h-full" : "mt-4"}>{children}</div>
          ) : (
            <p className="mt-3 text-base leading-relaxed text-zinc-300 first:mt-0">{children}</p>
          );
        },
        img: ({ src, alt }) => (
          <ProjectImage src={typeof src === "string" ? src : ""} alt={alt ?? ""} embedded={embedded} cover={cropImages} />
        ),
        video: ({ src, title, poster }) =>
          embedded ? (
            // The 16:9 panel is sized by the parent, not by source video metadata.
            <span className="relative block h-full w-full overflow-hidden bg-black">
              <video
                src={typeof src === "string" ? src : ""}
                poster={typeof poster === "string" ? poster : undefined}
                controls
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-contain"
              />
              {typeof title === "string" && title && (
                <span className="pointer-events-none absolute left-3 top-3 rounded bg-black/65 px-3 py-1 text-xs text-white">
                  {title}
                </span>
              )}
            </span>
          ) : (
            <ProjectVideo
              src={typeof src === "string" ? src : ""}
              title={typeof title === "string" ? title : undefined}
              poster={typeof poster === "string" ? poster : undefined}
            />
          ),
        ul: ({ children }) => (
          <ul className="mt-3 list-disc space-y-1 pl-6 text-base leading-relaxed text-zinc-300">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="mt-3 list-decimal space-y-1 pl-6 text-base leading-relaxed text-zinc-300">{children}</ol>
        ),
        strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
