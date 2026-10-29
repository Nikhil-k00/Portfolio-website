import { BookOpen, GraduationCap } from "lucide-react"
import { education } from "@/data/education"

function formatPeriod(start?: string, end?: string) {
  const formatDate = (value: string) => {
    const [year, month] = value.split("-")

    if (!month) return year

    return new Intl.DateTimeFormat("en", {
      month: "short",
      timeZone: "UTC",
    }).format(new Date(Date.UTC(Number(year), Number(month) - 1, 1))) + ` ${year}`
  }

  if (start && end) return `${formatDate(start)} — ${formatDate(end)}`
  return start ? formatDate(start) : end ? formatDate(end) : null
}

export function Education() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {education.map((item, index) => {
        const period = formatPeriod(item.start, item.end)
        const Icon = index === 0 ? GraduationCap : BookOpen

        return (
          <article
            key={item.institution}
            className="min-w-0 rounded-xl border border-border bg-card/80 p-4 sm:p-5"
          >
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/10 text-accent">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                {period && (
                  <p className="font-mono text-xs text-muted-foreground">
                    {period}
                    {item.end && Number(item.end.slice(0, 4)) >= new Date().getFullYear()
                      ? " · recorded end date"
                      : ""}
                  </p>
                )}
                <h3 className="mt-2 break-words font-semibold leading-6 text-foreground sm:text-lg">
                  {item.degree}
                  {item.field ? `, ${item.field}` : ""}
                </h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {item.institution}
                </p>
                {item.location && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.location}
                  </p>
                )}
              </div>
            </div>

            {item.details && item.details.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
                {item.details.map((detail) => (
                  <li
                    key={detail}
                    className="rounded-md border border-border bg-secondary px-2.5 py-1 text-xs leading-5 text-secondary-foreground"
                  >
                    {detail}
                  </li>
                ))}
              </ul>
            )}
          </article>
        )
      })}
    </div>
  )
}
