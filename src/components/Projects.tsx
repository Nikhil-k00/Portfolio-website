import { useState } from "react"
import { ArrowDown, ArrowUpRight, ChevronDown, Github } from "lucide-react"
import { projects } from "@/data/projects"

const categories = ["All", ...new Set(projects.flatMap((project) => project.category))]

export function Projects() {
  const [activeCategory, setActiveCategory] = useState("All")
  const visibleProjects = projects.filter(
    (project) =>
      activeCategory === "All" || project.category.includes(activeCategory),
  )

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm leading-6 text-muted-foreground sm:text-base">
            A selection of project briefs across AI, full-stack development,
            and engineering workflows.
          </p>
        </div>
        <div
          aria-label="Filter projects by category"
          className="flex flex-wrap gap-2"
        >
          {categories.map((category) => {
            const isActive = activeCategory === category

            return (
              <button
                key={category}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveCategory(category)}
                className={`min-h-10 rounded-full border px-3.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none ${
                  isActive
                    ? "border-primary/50 bg-primary/10 text-primary"
                    : "border-border bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
              </button>
            )
          })}
        </div>
      </div>

      <div aria-live="polite" className="sr-only">
        Showing {visibleProjects.length}{" "}
        {visibleProjects.length === 1 ? "project" : "projects"}
        {activeCategory === "All" ? "" : ` in ${activeCategory}`}
      </div>

      <div className="grid min-w-0 gap-4 md:grid-cols-2">
        {visibleProjects.map((project, index) => (
          <article
            key={project.name}
            className={`group min-w-0 overflow-hidden rounded-xl border border-border bg-card/80 transition-colors hover:border-primary/35 motion-reduce:transition-none ${
              index === 0 && activeCategory === "All" ? "md:col-span-2" : ""
            }`}
          >
            <div className="p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-xs tracking-wider text-muted-foreground">
                  PROJECT / {String(projects.indexOf(project) + 1).padStart(2, "0")}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-accent"
                  />
                  {project.status}
                </span>
              </div>

              <div
                className={`mt-5 ${
                  index === 0 && activeCategory === "All"
                    ? "md:grid md:grid-cols-[minmax(0,1.1fr)_minmax(15rem,0.9fr)] md:gap-8"
                    : ""
                }`}
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap gap-2">
                    {project.category.map((category) => (
                      <span
                        key={category}
                        className="rounded-sm bg-accent/10 px-2 py-1 text-xs font-medium text-accent"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-3 break-words text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    {project.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
                    {project.summary}
                  </p>

                  {project.tech.length > 0 && (
                    <ul
                      aria-label={`${project.name} technologies`}
                      className="mt-4 flex flex-wrap gap-2"
                    >
                      {project.tech.map((technology) => (
                        <li
                          key={technology}
                          className="rounded-md border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                        >
                          {technology}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-5 min-w-0 md:mt-0">
                  <details className="group/details rounded-lg border border-border bg-background/60">
                    <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                      Project details
                      <ChevronDown
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open/details:rotate-180 motion-reduce:transition-none"
                      />
                    </summary>
                    <div className="border-t border-border px-4 pb-4 pt-3">
                      <div className="space-y-3 text-sm leading-6">
                        <div>
                          <h4 className="font-medium text-foreground">
                            Problem
                          </h4>
                          <p className="mt-1 text-muted-foreground">
                            {project.problem}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">
                            Approach
                          </h4>
                          <p className="mt-1 text-muted-foreground">
                            {project.solution}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">
                            Described scope
                          </h4>
                          <ul className="mt-1 list-inside list-disc space-y-1 text-muted-foreground">
                            {project.features.map((feature) => (
                              <li key={feature}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                        <p className="border-t border-border pt-3 text-xs leading-5 text-muted-foreground">
                          {project.statusNote}
                        </p>
                      </div>
                    </div>
                  </details>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex min-h-10 items-center gap-2 rounded-md border border-border px-3 text-sm font-medium text-foreground transition-colors hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
                      >
                        <Github aria-hidden="true" className="h-4 w-4" />
                        Code
                        <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex min-h-10 items-center gap-2 rounded-md border border-border px-3 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
                      >
                        Live demo
                        <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-5 flex items-start gap-2 text-xs leading-5 text-muted-foreground">
        <ArrowDown
          aria-hidden="true"
          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent"
        />
        Project details reflect the available briefs; implementation status and
        external links are shown only when verified.
      </p>
    </div>
  )
}
