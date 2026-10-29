import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

function getInitialTheme(): "dark" | "light" {
  const stored = localStorage.getItem("theme") as "dark" | "light" | null
  if (stored) return stored
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  return prefersDark ? "dark" : "light"
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("light")

  useEffect(() => {
    const t = getInitialTheme()
    setTheme(t)
    document.documentElement.classList.toggle("dark", t === "dark")
  }, [])

  function toggle() {
    const next = theme === "dark" ? "light" : "dark"
    setTheme(next)
    localStorage.setItem("theme", next)
    document.documentElement.classList.toggle("dark", next === "dark")
  }

  return (
    <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={toggle}>
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  )
}


