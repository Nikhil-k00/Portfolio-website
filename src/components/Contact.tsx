import { useState, type FormEvent } from "react"
import { Check, Copy, Github, Linkedin, Mail, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { profile } from "@/data/profile"

type CopyStatus = "idle" | "copied" | "error"
type SubmitStatus = "idle" | "sending" | "success" | "error"
type FormErrors = {
  fullName?: string
  email?: string
  subject?: string
  message?: string
}

const socialIcons = {
  GitHub: Github,
  LinkedIn: Linkedin,
}


export function Contact() {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle")
  const [status, setStatus] = useState<SubmitStatus>("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [errors, setErrors] = useState<FormErrors>({})
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  })

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

  function validateForm() {
    const nextErrors: FormErrors = {}

    if (!form.fullName.trim()) {
      nextErrors.fullName = "Full name is required."
    }
    if (!form.email.trim()) {
      nextErrors.email = "Email address is required."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address."
    }
    if (!form.subject.trim()) {
      nextErrors.subject = "Subject is required."
    }
    if (!form.message.trim()) {
      nextErrors.message = "Message is required."
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === "sending") return

    setStatus("idle")
    setErrorMessage("")

    if (!validateForm()) {
      setStatus("error")
      setErrorMessage("Please correct the highlighted fields.")
      return
    }


    setStatus("sending")

    try {
      const response = await fetch("/api/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_name: form.fullName.trim(),
          user_email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        }),
      })
      if (!response.ok) {
        let serverMessage = ""
        try {
          const result: unknown = await response.json()
          if (
            typeof result === "object" &&
            result !== null &&
            "message" in result &&
            typeof result.message === "string"
          ) {
            serverMessage = result.message
          }
        } catch {
          serverMessage = ""
        }

        throw new Error(
          serverMessage ||
            "Your message could not be sent. Please try again or email me directly.",
        )
      }

      setStatus("success")
      setForm({ fullName: "", email: "", subject: "", message: "" })
      setErrors({})
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

  const socials = profile.socials.filter(
    (social): social is typeof social & { platform: keyof typeof socialIcons } =>
      social.platform in socialIcons,
  )

  return (
    <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
      <div className="min-w-0">
        <p className="text-sm font-medium uppercase tracking-wide text-accent">
          Let's connect
        </p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Have something meaningful to build?
        </h3>
        <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
          Reach out by email or through the form.
        </p>

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
            variant="outline"
            size="sm"
            onClick={copyEmail}
            className="min-h-11"
          >
            {copyStatus === "copied" ? (
              <Check aria-hidden="true" />
            ) : (
              <Copy aria-hidden="true" />
            )}
            {copyStatus === "copied"
              ? "Copied"
              : copyStatus === "error"
                ? "Copy failed"
                : "Copy email"}
          </Button>
        </div>

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
        onSubmit={handleSubmit}
        className="grid min-w-0 gap-4 rounded-xl border border-border bg-card/80 p-4 sm:p-5"
        noValidate
      >
        <div>
          <label
            htmlFor="contact-name"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Full Name
          </label>
          <Input
            id="contact-name"
            name="fullName"
            autoComplete="name"
            value={form.fullName}
            onChange={(event) =>
              setForm((current) => ({ ...current, fullName: event.target.value }))
            }
            disabled={status === "sending"}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "contact-name-error" : undefined}
            required
          />
          {errors.fullName && (
            <p id="contact-name-error" className="mt-1.5 text-sm text-destructive">
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Email Address
          </label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(event) =>
              setForm((current) => ({ ...current, email: event.target.value }))
            }
            disabled={status === "sending"}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            required
          />
          {errors.email && (
            <p id="contact-email-error" className="mt-1.5 text-sm text-destructive">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-subject"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Subject
          </label>
          <Input
            id="contact-subject"
            name="subject"
            value={form.subject}
            onChange={(event) =>
              setForm((current) => ({ ...current, subject: event.target.value }))
            }
            disabled={status === "sending"}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? "contact-subject-error" : undefined}
            required
          />
          {errors.subject && (
            <p id="contact-subject-error" className="mt-1.5 text-sm text-destructive">
              {errors.subject}
            </p>
          )}
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
            rows={5}
            value={form.message}
            onChange={(event) =>
              setForm((current) => ({ ...current, message: event.target.value }))
            }
            disabled={status === "sending"}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            required
          />
          {errors.message && (
            <p id="contact-message-error" className="mt-1.5 text-sm text-destructive">
              {errors.message}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" disabled={status === "sending"} className="min-h-11">
            <Send aria-hidden="true" />
            {status === "sending" ? "Sending..." : "Submit Message"}
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
            {status === "sending" && "Sending your message..."}
            {status === "success" && "Message sent. Thanks for reaching out!"}
            {status === "error" && errorMessage}
          </p>
        </div>
      </form>
    </div>
  )
}
