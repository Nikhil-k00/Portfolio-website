import { ArrowUp, Github, Linkedin } from "lucide-react"
import { profile } from "@/data/profile"

const navigation = [
  { href: "#about", label: "About" },
  { href: "#education", label: "Education" },
  { href: "#experience", label: "Experience" },
  { href: "#devops", label: "DevOps" },
  { href: "#events", label: "Events" },
  { href: "#projects", label: "Projects" },
  { href: "#interests", label: "Interests" },
  { href: "#contact", label: "Contact" },
]

const socialIcons = {
  GitHub: Github,
  LinkedIn: Linkedin,
}

export function Footer() {
  const socials = profile.socials.filter(
    (social): social is typeof social & { platform: keyof typeof socialIcons } =>
      social.platform in socialIcons,
  )

  return (
    <footer className="mt-8 border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
        <div className="grid gap-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] sm:items-start">
          <div className="min-w-0">
            <a
              href="#home"
              className="rounded-sm font-semibold tracking-wide text-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {profile.name}
            </a>
            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              Computer Science Engineering student exploring software
              development, AI, and infrastructure.
            </p>
            <nav aria-label="Social profiles" className="mt-4 flex flex-wrap gap-4">
              {socials.map(({ platform, url }) => {
                const Icon = socialIcons[platform]

                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-10 items-center gap-2 rounded-sm text-sm text-muted-foreground hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Icon aria-hidden="true" className="h-4 w-4" />
                    {platform}
                  </a>
                )
              })}
            </nav>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {navigation.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="inline-flex min-h-10 items-center rounded-sm text-sm text-muted-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <a
            href="#home"
            className="inline-flex min-h-10 items-center gap-2 rounded-sm text-sm font-medium hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Back to top
            <ArrowUp aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
