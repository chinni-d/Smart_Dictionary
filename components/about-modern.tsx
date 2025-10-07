"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

/* Simple About with modern layout and token colors */
export function AboutModern() {
  return (
    <section id="about" className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="mx-auto max-w-3xl"
        >
          <Badge className="mb-3 bg-primary/10 text-[var(--primary)]">About</Badge>
          <h2 className="text-pretty text-2xl font-semibold sm:text-3xl">A calmer way to study vocabulary</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            This app focuses on clarity and focus: precise definitions, pronounceable phonetics, and helpful context
            through imagery and short summaries. It uses dictionaryapi.dev for definitions, Pexels for imagery, and
            Wikipedia for summaries.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
