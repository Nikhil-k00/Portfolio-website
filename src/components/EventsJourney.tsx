import { ArrowUpRight, ChevronDown, Flag, Lightbulb, Orbit, Users, Workflow } from "lucide-react"
import { events } from "@/data/events"

const icons = [Flag, Users, Orbit, Lightbulb, Workflow]

export function EventsJourney() {
  return (
    <div>
      <p className="mb-6 max-w-3xl text-sm leading-6 text-muted-foreground sm:mb-8 sm:text-base">
        Hackathons, innovation challenges, and technical learning. Entries are
        labeled carefully so that an event mention is not mistaken for a
        confirmed result.
      </p>

      <ol className="relative grid min-w-0 gap-4 before:absolute before:bottom-5 before:left-[1.1875rem] before:top-5 before:w-px before:bg-border md:grid-cols-2 md:before:hidden">
        {events.map((event, index) => {
          const Icon = icons[index]
          const isVerifiedTraining = event.status === "Completed training"
const isTeamFinalist = event.status === "Team Finalist"
const isHighlighted = isVerifiedTraining || isTeamFinalist

          return (
            <li
              key={event.name}
              className={`relative min-w-0 pl-10 md:pl-0 ${isTeamFinalist ? "md:col-span-2" : ""}`}
            >
              <span
                aria-hidden="true"
                className={`absolute left-2 top-5 z-10 inline-flex h-6 w-6 items-center justify-center rounded-full border bg-background md:hidden ${
                  isHighlighted
                    ? "border-accent/50 text-accent"
                    : "border-primary/50 text-primary"
                }`}
              >
                <Icon className="h-3 w-3" />
              </span>

              <article className={`h-full min-w-0 rounded-xl border bg-card/80 p-4 transition-colors hover:border-primary/30 motion-reduce:transition-none sm:p-5 ${isTeamFinalist ? "border-accent/40 bg-accent/5" : "border-border"}`}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-mono text-xs tracking-wide text-muted-foreground">
                      {event.period ?? "DATE NOT VERIFIED"}
                    </p>
                    <h3 className="mt-2 break-words text-base font-semibold leading-6 text-foreground sm:text-lg">
                      {event.name}
                    </h3>
                  </div>
                  <span
                    className={`inline-flex min-h-7 shrink-0 items-center rounded-full border px-2.5 text-xs font-medium ${
                      isHighlighted
                        ? "border-accent/30 bg-accent/10 text-accent"
                        : "border-border bg-secondary text-muted-foreground"
                    }`}
                  >
                    {event.status}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-sm bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    {event.type}
                  </span>
                </div>
                {event.image?.kind === "photo" && (
                  <figure className="mt-4 overflow-hidden rounded-xl border border-border bg-black/30">
                    <a href={event.image.src} target="_blank" rel="noreferrer" className="block">
                      <img
                        src={event.image.src}
                        alt={event.image.alt}
                        loading="lazy"
                        decoding="async"
                        className="max-h-44 w-full object-contain sm:max-h-64"
                      />
                    </a>
                    {event.image.caption && (
                      <figcaption className="px-3 py-2 text-xs text-muted-foreground">
                        {event.image.caption}
                      </figcaption>
                    )}
                  </figure>
                )}
                {event.image?.kind === "certificate" && (
                  <figure className="mt-4">
                    <a
                      href={event.image.src}
                      target="_blank"
                      rel="noreferrer"
                      className="block w-full max-w-sm overflow-hidden rounded-xl border border-border bg-secondary/40 transition-colors hover:border-accent/40"
                    >
                      <img
                        src={event.image.src}
                        alt={event.image.alt}
                        loading="lazy"
                        decoding="async"
                        className="h-auto w-full object-contain"
                      />
                    </a>
                    {event.image.caption && (
                      <figcaption className="mt-2 text-xs text-muted-foreground">
                        {event.image.caption} — click to view full certificate
                      </figcaption>
                    )}
                  </figure>
                )}
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {event.summary}
                </p>

                <details className="group mt-3 border-t border-border pt-2">
                  <summary className="flex min-h-10 cursor-pointer list-none items-center justify-between gap-3 rounded-sm text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                    Context and evidence
                    <ChevronDown
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180 motion-reduce:transition-none"
                    />
                  </summary>
                  <p className="pb-1 pt-2 text-sm leading-6 text-muted-foreground">
                    {event.details}
                  </p>
                </details>
                {event.links && event.links.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {event.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex min-h-9 items-center gap-1 rounded-md border border-border px-3 text-xs font-medium text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
                      >
                        {link.label}
                        <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                      </a>
                    ))}
                  </div>
                )}
              </article>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
