import { Button } from "@/components/ui/button"
import { profile } from "@/data/profile"
import { ArrowDown, ArrowUpRight, Download, Github, Linkedin } from "lucide-react"

const socialIcons = {
  GitHub: Github,
  LinkedIn: Linkedin,
}

const focusAreas = [
  "AI / ML exploration",
  "Full-stack development",
  "DevOps engineering",
  "Technical challenges",
]

export function Hero() {
  const socials = profile.socials.filter(
    (social): social is typeof social & { platform: keyof typeof socialIcons } =>
      social.platform in socialIcons,
  )

  return (
    <section
      id="home"
      className="relative isolate scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-36 top-8 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-3xl sm:right-0"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-3 motion-safe:duration-700">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium tracking-wide text-muted-foreground sm:text-sm">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-accent"
            />
            COMPUTER SCIENCE ENGINEERING STUDENT
          </p>
          <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Hi, I’m{" "}
            <span className="text-primary">{profile.name}.</span>
          </h1>
          <p className="mt-5 text-xl font-medium text-foreground sm:text-2xl">
            Developer <span className="text-accent">·</span> DevOps enthusiast
          </p>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            I explore AI and machine learning, build full-stack applications,
            and learn DevOps through hands-on projects and technical challenges.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="neon min-h-11">
              <a href="#projects">
                Explore Projects
                <ArrowDown aria-hidden="true" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="min-h-11 border-border hover:border-primary hover:text-primary"
            >
              <a href="#contact">
                Contact Me
                <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="min-h-11 border-border hover:border-primary hover:text-primary"
            >
              <a href="/resume.pdf" download="Nikhil_K_Resume.pdf">
                Download Resume
                <Download aria-hidden="true" />
              </a>
            </Button>
          </div>

          <nav aria-label="Social profiles" className="mt-8 flex flex-wrap gap-3">
            {socials.map(({ platform, url }) => {
              const Icon = socialIcons[platform]

              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border px-3 text-sm font-medium text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Icon aria-hidden="true" className="h-4 w-4" />
                  {platform}
                  <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                </a>
              )
            })}
          </nav>
        </div>

        <div className="motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-3 motion-safe:duration-700 motion-safe:delay-150">
          <div
            className="surface overflow-hidden rounded-2xl"
          >
            <div className="flex items-center justify-between border-b border-border bg-secondary/70 px-4 py-3 sm:px-5">
              <div className="flex items-center gap-2" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/50" />
                <span className="h-2.5 w-2.5 rounded-full bg-accent" />
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                focus.log
              </span>
            </div>
            <div className="p-5 sm:p-7">
              <p className="font-mono text-xs text-muted-foreground sm:text-sm">
                <span className="text-accent">$</span> cat areas-of-focus
              </p>
              <ul className="mt-6 space-y-4 sm:mt-8 sm:space-y-5">
                {focusAreas.map((area, index) => (
                  <li
                    key={area}
                    className="flex items-center gap-3 font-mono text-sm text-foreground sm:text-base"
                  >
                    <span
                      aria-hidden="true"
                      className="w-6 shrink-0 text-right text-xs text-muted-foreground"
                    >
                      0{index + 1}
                    </span>
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                    />
                    {area}
                  </li>
                ))}
              </ul>
              <div className="mt-7 border-t border-border pt-4 sm:mt-8 sm:pt-5">
                <p className="font-mono text-xs text-muted-foreground sm:text-sm">
                  <span className="text-accent">→</span> Learn by building.
                  Keep improving.
                </p>
              </div>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground sm:text-sm">
            Curious by nature. Focused on what’s next.
          </p>
        </div>
      </div>
    </section>
  )
}
