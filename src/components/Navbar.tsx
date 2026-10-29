import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { useActiveSection } from "@/lib/useActiveSection"

const links = [
  { href: "#about", label: "About" },
  { href: "#education", label: "Education" },
  { href: "#experience", label: "Experience" },
  { href: "#devops", label: "DevOps" },
  { href: "#events", label: "Events" },
  { href: "#projects", label: "Projects" },
  { href: "#interests", label: "Interests" },
  { href: "#contact", label: "Contact" },
]

const sectionIds = links.map(({ href }) => href.slice(1))

export function Navbar() {
  const activeId = useActiveSection(sectionIds)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <a
          href="#home"
          className="shrink-0 rounded-sm font-semibold tracking-wide text-foreground transition-colors hover:text-primary"
        >
          Portfolio
        </a>
        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {links.map(({ href, label }) => {
            const isActive = activeId === href.slice(1)

            return (
              <a
                key={href}
                href={href}
                aria-current={isActive ? "location" : undefined}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {label}
              </a>
            )
          })}
          {/* theme toggle removed from header */}
        </nav>
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label="Open navigation menu"
                className="border-border bg-surface hover:border-primary hover:bg-secondary"
              >
                <Menu aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[min(20rem,85vw)] border-border bg-surface p-6"
            >
              <SheetTitle className="sr-only">Main navigation</SheetTitle>
              <SheetDescription className="sr-only">
                Choose a section to navigate to.
              </SheetDescription>
              <nav aria-label="Mobile navigation" className="pt-8">
                <div className="grid gap-2">
                  {links.map(({ href, label }) => {
                    const isActive = activeId === href.slice(1)

                    return (
                      <SheetClose asChild key={href}>
                        <a
                          href={href}
                          aria-current={isActive ? "location" : undefined}
                          className={`min-h-12 rounded-md px-4 py-3 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                            isActive
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                          }`}
                        >
                          {label}
                        </a>
                      </SheetClose>
                    )
                  })}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
