import type { ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"

type Props = {
  id: string
  title: string
  description?: string
  children: ReactNode
}

export function Section({ id, title, description, children }: Props) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id={id} className="scroll-mt-24 py-16">
      <div className="surface mx-auto max-w-6xl px-4 py-8">
        <motion.h2
          className="text-3xl font-bold tracking-tight"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
        >
          {title}
        </motion.h2>
        {description ? (
          <motion.p
            className="mt-2 text-muted-foreground"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.35,
              delay: shouldReduceMotion ? 0 : 0.05,
            }}
          >
            {description}
          </motion.p>
        ) : null}
        <motion.div
          className="mt-6"
          initial={
            shouldReduceMotion || id === "events" ? false : { opacity: 0, y: 12 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={
            id === "events"
              ? { once: true, amount: 0.05 }
              : { once: true, amount: 0.3 }
          }
          transition={{
            duration: shouldReduceMotion ? 0 : 0.45,
            delay: shouldReduceMotion ? 0 : 0.05,
          }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}

