import type { Metadata } from "next";
import { ProjectList } from "@/components/project-list";
import { projects } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "Software projects and experiments by Krishna Kumar.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <main id="main" className="page-enter space-y-12">
      <header className="space-y-3">
        <h1 className="text-xl font-semibold">projects</h1>
        <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
          Things I’ve built and things I’m still figuring out.
        </p>
      </header>
      <ProjectList
        items={projects.filter((project) => project.group === "project")}
      />
      <section
        id="experiments"
        aria-labelledby="experiments-heading"
        className="scroll-mt-8 space-y-6"
      >
        <h2 id="experiments-heading" className="font-semibold">
          experiments
        </h2>
        <ProjectList
          items={projects.filter((project) => project.group === "experiment")}
        />
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          I also spend time on local models, 3D tools, and desktop apps. I’ll
          write more as those take shape.
        </p>
      </section>
    </main>
  );
}
