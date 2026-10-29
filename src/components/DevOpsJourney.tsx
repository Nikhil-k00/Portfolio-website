import { ChevronDown, Container, GitBranch, Server, Workflow } from "lucide-react"

const domains = [
  {
    icon: Container,
    title: "Containers & data services",
    summary:
      "Exploring containerized application setup and service readiness.",
    topics: [
      "Docker and Docker Compose",
      "PostgreSQL container configuration",
      "Container health checks",
    ],
    focus:
      "Understand how services are configured, started, and checked before an application depends on them.",
  },
  {
    icon: Workflow,
    title: "Kubernetes foundations",
    summary:
      "Learning the core resources used to organize and operate workloads.",
    topics: [
      "Namespaces, Secrets, Deployments, and Services",
      "Readiness and liveness probes",
      "Resource limits and persistent storage",
    ],
    focus:
      "Connect workload configuration, service discovery, health probes, and stateful storage concepts.",
  },
  {
    icon: GitBranch,
    title: "CI/CD & image workflows",
    summary:
      "Building familiarity with automated workflows and container image handling.",
    topics: [
      "GitHub Actions and CI/CD workflows",
      "Container image management",
      "Container registry workflows",
    ],
    focus:
      "Follow how source changes can be checked and packaged into images for a deployment workflow.",
  },
  {
    icon: Server,
    title: "Linux & deployment operations",
    summary:
      "Learning the building blocks of serving, validating, and troubleshooting applications.",
    topics: [
      "Linux server administration",
      "Nginx",
      "Application health endpoints",
      "Deployment validation and troubleshooting",
    ],
    focus:
      "Use health signals and deployment checks to reason about application availability and diagnose issues.",
  },
]

export function DevOpsJourney() {
  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 rounded-xl border border-border bg-secondary/50 p-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div>
          <p className="font-semibold text-foreground">
            Infrastructure, learned by doing.
          </p>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
            A practice-focused overview of the DevOps topics I’m working with
            and learning. This is not a claim of production operations
            experience.
          </p>
        </div>
        <span className="inline-flex min-h-8 shrink-0 items-center gap-2 self-start rounded-full border border-accent/30 px-3 text-xs font-medium text-accent sm:self-center">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
          Practice &amp; learning
        </span>
      </div>

      <div className="grid min-w-0 gap-4 md:grid-cols-2">
        {domains.map(({ icon: Icon, title, summary, topics, focus }) => (
          <article
            key={title}
            className="min-w-0 rounded-xl border border-border bg-card/80 p-4 transition-colors hover:border-accent/30 motion-reduce:transition-none sm:p-5"
          >
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/10 text-accent">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold text-foreground">{title}</h3>
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[0.7rem] font-medium text-primary">
                    Learning
                  </span>
                </div>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {summary}
                </p>
              </div>
            </div>

            <ul className="mt-4 flex flex-wrap gap-2">
              {topics.map((topic) => (
                <li
                  key={topic}
                  className="max-w-full break-words rounded-md border border-border bg-secondary px-2.5 py-1 text-xs leading-5 text-secondary-foreground"
                >
                  {topic}
                </li>
              ))}
            </ul>

            <details className="group mt-4 border-t border-border pt-3">
              <summary className="flex min-h-10 cursor-pointer list-none items-center justify-between gap-3 rounded-sm text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                View engineering focus
                <ChevronDown
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180 motion-reduce:transition-none"
                />
              </summary>
              <p className="pb-1 pt-2 text-sm leading-6 text-muted-foreground">
                {focus}
              </p>
            </details>
          </article>
        ))}
      </div>

      <p className="mt-5 text-xs leading-5 text-muted-foreground">
        Specific exercise completion, deployment environments, and outcomes
        aren’t documented in this workspace.
      </p>
    </div>
  )
}
