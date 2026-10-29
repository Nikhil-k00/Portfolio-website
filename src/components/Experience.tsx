import { BookOpenCheck, BriefcaseBusiness, Code2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { experience } from "@/data/experience"

function formatDate(value: string) {
  if (value === "Present") return value

  const [year, month] = value.split("-")
  if (!month) return year

  const monthName = new Intl.DateTimeFormat("en", {
    month: "short",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(Number(year), Number(month) - 1, 1)))

  return `${monthName} ${year}`
}

function period(start?: string, end?: string) {
  if (start && end) return `${formatDate(start)} — ${formatDate(end)}`
  return start ? formatDate(start) : end ? formatDate(end) : null
}

export function Experience() {
  const cyberdome = experience.find((item) => item.company === "Kerala Police Cyberdome")
  const independentPractice = experience.find(
    (item) => item.company === "Self‑Learning",
  )

  return (
    <div className="space-y-8">
      {cyberdome && (
        <section aria-labelledby="practical-experience-heading">
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <BriefcaseBusiness aria-hidden="true" className="h-4 w-4" />
            </span>
            <div>
              <h3
                id="practical-experience-heading"
                className="font-semibold text-foreground"
              >
                 Cyberdome association
              </h3>
              <p className="text-sm text-muted-foreground">
                 Ongoing association
              </p>
            </div>
          </div>

          <article className="rounded-xl border border-border bg-card/80 p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h4 className="text-lg font-semibold text-foreground">
                  {cyberdome.role}
                </h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  {cyberdome.company}
                  {cyberdome.location ? ` · ${cyberdome.location}` : ""}
                </p>
              </div>
              {period(cyberdome.start, cyberdome.end) && (
                <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
                  {period(cyberdome.start, cyberdome.end)}
                </span>
              )}
            </div>
            {cyberdome.bullets && (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground marker:text-accent">
                {cyberdome.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
            {cyberdome.tech && (
              <div className="mt-4 flex flex-wrap gap-2">
                {cyberdome.tech.map((technology) => (
                  <Badge key={technology} variant="secondary">
                    {technology}
                  </Badge>
                ))}
              </div>
            )}
          </article>
        </section>
      )}

      <section aria-labelledby="training-heading">
        <div className="mb-4 flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <BookOpenCheck aria-hidden="true" className="h-4 w-4" />
          </span>
          <div>
            <h3 id="training-heading" className="font-semibold text-foreground">
              Training
            </h3>
            <p className="text-sm text-muted-foreground">
              Completed project-based learning
            </p>
          </div>
        </div>

        <article className="rounded-xl border border-accent/20 bg-card/80 p-4 sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-accent">
                IBM SkillsBuild · via CSRBOX experience
              </p>
              <h4 className="mt-2 break-words font-semibold leading-6 text-foreground">
                Agentic AI — From Learner to Builder
              </h4>
            </div>
            <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
              Jul–Aug 2025
            </span>
          </div>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Completed project-based learning exploring the design and
            development of AI agents and multi-agent systems.
          </p>
          <p className="mt-3 text-xs leading-5 text-muted-foreground">
            Listed as training; no certificate link or credential details are
            documented.
          </p>
        </article>
      </section>

      {independentPractice && (
        <section aria-labelledby="independent-practice-heading">
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-foreground">
              <Code2 aria-hidden="true" className="h-4 w-4" />
            </span>
            <div>
              <h3
                id="independent-practice-heading"
                className="font-semibold text-foreground"
              >
                Independent technical practice
              </h3>
              <p className="text-sm text-muted-foreground">
                Self-directed learning, separate from employment
              </p>
            </div>
          </div>

          <article className="rounded-xl border border-border bg-card/80 p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h4 className="font-semibold text-foreground">
                  {independentPractice.role}
                </h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  {independentPractice.company}
                </p>
              </div>
              {period(independentPractice.start, independentPractice.end) && (
                <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
                  {period(independentPractice.start, independentPractice.end)}
                </span>
              )}
            </div>
            {independentPractice.bullets && (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground marker:text-accent">
                {independentPractice.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
            {independentPractice.tech && (
              <div className="mt-4 flex flex-wrap gap-2">
                {independentPractice.tech.map((technology) => (
                  <Badge key={technology} variant="secondary">
                    {technology}
                  </Badge>
                ))}
              </div>
            )}
          </article>
        </section>
      )}
    </div>
  )
}
