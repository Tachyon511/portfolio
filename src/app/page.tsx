import Hero from "../components/Hero";
import FeaturedProjects from "../components/FeaturedProjects";
import Experience from "../components/Experience";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import { getAllProjects } from "../lib/projects";

export default function Home() {
  const projects = getAllProjects();

  return (
    <main className="min-h-screen bg-[#05070a] text-white">
      <div className="mx-auto max-w-6xl px-6 pt-10 pb-10">
        <Hero />
        <FeaturedProjects projects={projects} />
        <Experience />
        <Skills />
        <Contact />
      </div>
    </main>
  );
}