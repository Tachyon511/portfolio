export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "trench-environment",
    title: "3D Trench Environment",
    category: "3D Environment Art",
    description:
      "World War 1 trench scene with dynamic VFX and cinematic effects implemented in Unreal Engine 5 as part of a vertical slice for my Bachelor thesis...",
    image: "/project-trench.jpg",
    featured: true,
  },
  {
    slug: "spider-mech",
    title: "Spider Mech",
    category: "Technical Art",
    description:
      "Procedural spider mech prototype focused on movement, animation logic and technical art systems...",
    image: "/project-trench.jpg",
    featured: true,
  },
  {
    slug: "camelot",
    title: "Camelot Prototype",
    category: "Environment Art",
    description:
      "Arthurian environment prototype focused on spatial reveal, level composition and environmental storytelling...",
    image: "/project-trench.jpg",
    featured: true,
  },
  {
    slug: "shader-experiments",
    title: "Shader Experiments",
    category: "Technical Art",
    description:
      "Collection of shader and material experiments focused on stylized real-time rendering...",
    image: "/project-trench.jpg",
    featured: true,
  },
  {
    slug: "extra-project",
    title: "Extra Project",
    category: "University Project",
    description:
      "Additional university or personal project that can be revealed through the View all projects button...",
    image: "/project-trench.jpg",
    featured: false,
  },
];