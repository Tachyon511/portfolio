import * as fs from "fs";
import * as path from "path";
import matter from "gray-matter";

const projectsDirectory = path.join(process.cwd(), "src/content/projects");

export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  heroImage: string;
  tools: string[];
  featured: boolean;
  order: number;
  content: string;
  headings: {
    id: string;
    title: string;
  }[];
};

type ProjectFrontmatter = {
  slug?: string;
  title?: string;
  category?: string;
  description?: string;
  thumbnail?: string;
  heroImage?: string;
  tools?: string[];
  featured?: boolean;
  order?: number;
};

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function extractHeadings(content: string): { id: string; title: string }[] {
  const headingRegex = /^##\s+(.+)$/gm;
  const headings: { id: string; title: string }[] = [];

  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(content)) !== null) {
    const title = match[1];

    headings.push({
      id: slugify(title),
      title,
    });
  }

  return headings;
}

export function getAllProjects(): Project[] {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const fileNames: string[] = fs
    .readdirSync(projectsDirectory)
    .filter((fileName: string) => fileName.endsWith(".md"));

  const projects: Project[] = fileNames.map((fileName: string) => {
    const fullPath = path.join(projectsDirectory, fileName);
    const fileContent = fs.readFileSync(fullPath, "utf8");

    const { data, content } = matter(fileContent);
    const frontmatter = data as ProjectFrontmatter;

    return {
      slug: frontmatter.slug ?? fileName.replace(".md", ""),
      title: frontmatter.title ?? "Untitled Project",
      category: frontmatter.category ?? "Project",
      description: frontmatter.description ?? "",
      thumbnail: frontmatter.thumbnail ?? "/project-placeholder.jpg",
      heroImage: frontmatter.heroImage ?? "/project-placeholder.jpg",
      tools: frontmatter.tools ?? [],
      featured: frontmatter.featured ?? false,
      order: frontmatter.order ?? 999,
      content,
      headings: extractHeadings(content),
    };
  });

  return projects.sort((a: Project, b: Project) => a.order - b.order);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((project: Project) => project.slug === slug);
}