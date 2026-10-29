import { ChevronDown, Code2 } from "lucide-react"

const skillGroups = [
  {
    name: "Programming",
    skills: ["Python", "Java", "C", "C++", "JavaScript", "SQL"],
  },
  {
    name: "Frontend",
    skills: ["React", "HTML", "CSS", "TypeScript", "Bootstrap"],
  },
  {
    name: "Backend",
    skills: ["Node.js", "Express.js", "Flask", "FastAPI"],
  },
  {
    name: "Databases",
    skills: ["MySQL", "MongoDB"],
  },
  {
    name: "AI / ML",
    skills: ["OpenCV", "InsightFace", "ONNX", "TensorFlow", "scikit-learn"],
  },
  {
    name: "DevOps & Infrastructure",
    skills: [
      "Docker",
      "Docker Compose",
      "Kubernetes fundamentals",
      "GitHub Actions",
      "CI/CD",
      "Linux",
      "Nginx",
    ],
  },
]

export function About() {
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-[minmax(0,1.3fr)_minmax(14rem,0.7fr)] md:items-start md:gap-10">
        <div>
          <p className="max-w-3xl leading-7 text-muted-foreground">
            I’m Nikhil K, a Computer Science Engineering student interested in
            AI/ML, full-stack development, and DevOps. I enjoy turning ideas
            into practical projects, solving engineering problems, and learning
            through collaborative technical challenges.
          </p>
        </div>
        <aside className="rounded-xl border border-border bg-secondary/60 p-4 sm:p-5">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Code2 aria-hidden="true" className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-semibold text-foreground">How I learn</h3>
              <p className="text-sm text-muted-foreground">
                Build, test, understand, improve.
              </p>
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-10 sm:mt-12">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
          <div>
            <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Technical skills
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Technologies and areas I work with and continue to explore.
            </p>
          </div>
          <span className="text-xs text-muted-foreground">
            Select a category to expand or collapse
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map(({ name, skills }, index) => (
            <details
              key={name}
              open
              className="group min-w-0 rounded-xl border border-border bg-card/80 p-4 transition-colors open:border-accent/30 sm:p-5"
            >
              <summary className="flex min-h-8 cursor-pointer list-none items-center justify-between gap-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                <span className="flex min-w-0 items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={`h-2 w-2 shrink-0 rounded-full ${index % 2 === 0 ? "bg-accent" : "bg-primary"}`}
                  />
                  <span className="font-semibold text-foreground">{name}</span>
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180 motion-reduce:transition-none"
                />
              </summary>
              <ul className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
                {skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-md border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground sm:text-sm"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </div>
    </div>
  )
}
