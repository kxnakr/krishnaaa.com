import { ArrowUpRight } from "lucide-react";
import type { projects } from "@/content/site";

export function ProjectList({ items }: { items: typeof projects }) {
  return (
    <ul className="space-y-7">
      {items.map((project) => (
        <li key={project.name}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <a
              href={project.url}
              className="group inline-flex items-center gap-1 font-medium hover:underline underline-offset-4"
            >
              {project.name}
              <ArrowUpRight
                aria-hidden="true"
                className="size-3.5 text-zinc-500 transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
              />
            </a>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {project.status}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {project.description}
          </p>
        </li>
      ))}
    </ul>
  );
}
