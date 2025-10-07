"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Zap, Sparkles, Bookmark, Headphones, Clipboard } from "lucide-react"

/* Polished features grid with subtle motion and token colors */
export function FeaturesModern() {
  const features = [
    {
      icon: Sparkles,
      title: "Smart Search",
      desc: "Fast definitions with examples and parts of speech.",
      color: "text-[var(--primary)]",
    },
    {
      icon: Headphones,
      title: "Pronunciation",
      desc: "Listen to word audio or use text-to-speech as fallback.",
      color: "text-[var(--accent-1)]",
    },
    {
      icon: Clipboard,
      title: "Copy Snippets",
      desc: "Copy key definitions into your notes with one click.",
      color: "text-[var(--accent-2)]",
    },
    {
      icon: Zap,
      title: "Images + Wiki",
      desc: "See related images and encyclopedia summaries instantly.",
      color: "text-[var(--primary)]",
    },
    {
      icon: Shield,
      title: "Privacy-Friendly",
      desc: "Only your query is sent to external APIs for results.",
      color: "text-[var(--accent-1)]",
    },
    {
      icon: Bookmark,
      title: "Study Flow",
      desc: "Clean layout that reduces distractions while learning.",
      color: "text-[var(--accent-2)]",
    },
  ]

  return (
    <section id="features" className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="text-balance text-2xl font-semibold sm:text-3xl"
        >
          Features that help you learn
        </motion.h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="h-full">
                <CardHeader className="flex-row items-center gap-2">
                  <f.icon className={`size-5 ${f.color}`} />
                  <CardTitle className="text-base">{f.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{f.desc}</CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
