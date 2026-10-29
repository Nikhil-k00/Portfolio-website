import { useRef, useState, type FormEvent } from "react"
import { Check, Copy, Github, Linkedin, Mail, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { profile } from "@/data/profile"

type SubmitStatus = "idle" | "sending" | "success" | "error"
type CopyStatus = "idle" | "copied" | "error"

const socialIcons = {
  GitHub: Github,
  LinkedIn: Linkedin,
}

export function Contact() {
  const formRef = useRef<HTMLFormElement | null>(null)
  const [status, setStatus] = useState<SubmitStatus>("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("sending")
    setErrorMessage("")

    try {
      if (!formRef.current) {
        throw new Error("The contact form is unavailable. Please email me directly.")
      }

      const formData = new FormData(formRef.current)
      const response = await fetch("/api/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_name: formData.get("user_name"),
          user_email: formData.get("user_email"),
          message: formData.get("message"),
        }),
      })

      if (!response.ok) {
        let serverMessage = ""
        try {
          const result: unknown = await response.json()
          if (
            typeof result === "object" &&
            result !== null &&
            "error" in result &&
            typeof result.error === "string"
          ) {
            serverMessage = result.error
          }
        } catch {
          serverMessage = ""
        }

        throw new Error(
          serverMessage === "Mail server not configured"
            ? "The contact form is not configured on this host. Please email me directly."
            : "Your message could not be sent. Please try again or email me directly.",
        )
      }

      setStatus("success")
      formRef.current.reset()
    } catch (error) {
      console.error("Contact form submission failed", error)
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Your message could not be sent. Please email me directly.",
      )
      setStatus("error")
    }
  }

  async function copyEmail() {
    if (!profile.email) return

    try {
      await navigator.clipboard.writeText(profile.email)
      setCopyStatus("copied")
    } catch (error) {
      console.error("Could not copy email address", error)
      setCopyStatus("error")
    }
  }

  const socials = profile.socials.filter(
    (social): social is typeof social & { platform: keyof typeof socialIcons } =>
      social.platform in socialIcons,
  )

  return (
    <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
      <div className="min-w-0">
        <p className="text-sm font-medium uppercase tracking-wide text-accent">
          Let’s connect
        </p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Have something meaningful to build?
        </h3>
        <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
          I’m open to internship opportunities, technical collaboration, and
          thoughtful engineering projects across development, AI, and
          infrastructure.
        </p>

        {profile.email && (
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex min-h-11 min-w-0 items-center gap-2 break-all rounded-md text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Mail aria-hidden="true" className="h-4 w-4 shrink-0" />
              {profile.email}
            </a>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={copyEmail}
              aria-label="Copy email address"
            >
              {copyStatus === "copied" ? (
                <Check aria-hidden="true" />
              ) : (
                <Copy aria-hidden="true" />
              )}
              {copyStatus === "copied" ? "Copied" : "Copy email"}
            </Button>
          </div>
        )}
        <p className="mt-2 min-h-5 text-xs text-muted-foreground" aria-live="polite">
          {copyStatus === "error" &&
            "Could not copy the address. Select the email link to copy it manually."}
        </p>

        <nav aria-label="Contact social profiles" className="mt-4 flex flex-wrap gap-3">
          {socials.map(({ platform, url }) => {
            const Icon = socialIcons[platform]

            return (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border px-3 text-sm font-medium text-muted-foreground transition-colors hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
              >
                <Icon aria-hidden="true" className="h-4 w-4" />
                {platform}
              </a>
            )
          })}
        </nav>
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="grid min-w-0 gap-4 rounded-xl border border-border bg-card/80 p-4 sm:p-5"
      >
        <div>
          <label
            htmlFor="contact-name"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Your name
          </label>
          <Input
            id="contact-name"
            name="user_name"
            autoComplete="name"
            placeholder="Name"
            required
            maxLength={120}
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Email address
          </label>
          <Input
            id="contact-email"
            name="user_email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            maxLength={254}
          />
        </div>
        <div>
          <label
            htmlFor="contact-message"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Message
          </label>
          <Textarea
            id="contact-message"
            name="message"
            placeholder="Tell me a little about what you have in mind."
            rows={5}
            required
            maxLength={5000}
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" disabled={status === "sending"} className="min-h-11">
            <Send aria-hidden="true" />
            {status === "sending" ? "Sending…" : "Send message"}
          </Button>
          <p
            role={status === "error" ? "alert" : "status"}
            aria-live="polite"
            className={`min-w-0 text-sm leading-5 ${
              status === "success"
                ? "text-accent"
                : status === "error"
                  ? "text-destructive"
                  : "text-muted-foreground"
            }`}
          >
            {status === "sending" && "Sending your message…"}
            {status === "success" && "Message sent. Thanks for reaching out!"}
            {status === "error" && errorMessage}
          </p>
        </div>
        <p className="text-xs leading-5 text-muted-foreground">
          Form delivery depends on the host’s mail configuration. If it isn’t
          available, contact me directly using the email link.
        </p>
      </form>
    </div>
  )
}
