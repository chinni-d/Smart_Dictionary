"use client"

import type React from "react"
import { useCallback, useMemo, useRef, useState } from "react"
import useSWR from "swr"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Images, Volume2, Mic, Copy, Globe } from "lucide-react"

type DictEntry = {
  word: string
  phonetics?: { text?: string; audio?: string }[]
  meanings?: { partOfSpeech: string; definitions: { definition: string; example?: string }[] }[]
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

/* Animated hero + search + results (dictionary + images + wiki) */
export function SearchExperience() {
  const [query, setQuery] = useState("")
  const [active, setActive] = useState<string>("")
  const recogRef = useRef<any>(null)

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      setActive(query.trim())
    },
    [query],
  )

  const { data: dict, isLoading: dictLoading } = useSWR<DictEntry[]>(
    active ? `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(active)}` : null,
    fetcher,
  )

  const { data: images } = useSWR<{
    images?: { id: string | number; src: string; alt: string; link?: string; photographer?: string }[]
    error?: string
  }>(active ? `/api/images?q=${encodeURIComponent(active)}&per_page=12` : null, fetcher)

  const { data: wiki } = useSWR<{ title?: string; extract?: string; url?: string; error?: string }>(
    active ? `/api/wiki?q=${encodeURIComponent(active)}` : null,
    fetcher,
  )

  const entry = (dict && Array.isArray(dict) && dict[0]) || null

  const phoneticText = useMemo(() => entry?.phonetics?.find((p) => p.text)?.text || "", [entry])
  const audioSrc = useMemo(() => entry?.phonetics?.find((p) => p.audio)?.audio || "", [entry])

  const handlePlay = useCallback(() => {
    if (audioSrc) {
      const audio = new Audio(audioSrc)
      audio.play().catch(() => {})
      return
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window && active) {
      const utter = new SpeechSynthesisUtterance(active)
      speechSynthesis.speak(utter)
    }
  }, [audioSrc, active])

  const handleCopy = useCallback(() => {
    const text = entry?.meanings?.flatMap((m) => m.definitions?.map((d) => `- ${d.definition}`))?.join("\n") || ""
    if (text) navigator.clipboard.writeText(text).catch(() => {})
  }, [entry])

  const handleVoice = useCallback(() => {
    try {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      if (!SpeechRecognition) return
      const recognition = new SpeechRecognition()
      recogRef.current = recognition
      recognition.lang = "en-US"
      recognition.interimResults = false
      recognition.maxAlternatives = 1
      recognition.onresult = (e: any) => {
        const transcript = e.results?.[0]?.[0]?.transcript || ""
        if (transcript) {
          setQuery(transcript)
          setActive(transcript)
        }
      }
      recognition.start()
    } catch {}
  }, [])

  const imageCards = useMemo(() => {
    const list = images?.images || []
    // Ensure at least 6 items by padding with placeholders if needed
    const needed = Math.max(0, 6 - list.length)
    const placeholders = Array.from({ length: needed }).map((_, i) => ({
      id: `ph-${i}`,
      src: `/placeholder.svg?height=300&width=400&query=placeholder related image`,
      alt: "Placeholder image",
      link: "#",
    }))
    return [...list.slice(0, 12), ...placeholders]
  }, [images])

  return (
    <section id="search" className="bg-hero">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto mb-8 max-w-3xl text-center"
        >
          <Badge className="mb-3 bg-primary/10 text-[var(--primary)]">Calm Study Dictionary</Badge>
          <h1 className="text-pretty text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Understand words with clarity and context
          </h1>
          <p className="mt-3 text-muted-foreground">
            Definitions, examples, and related media—enhanced with images and Wikipedia summaries.
          </p>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.35 }}
          className="mx-auto flex max-w-2xl items-center gap-3"
        >
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search an English word..."
            className="h-11"
            aria-label="Search word"
          />
          <Button type="submit" className="h-11 bg-primary text-primary-foreground hover:bg-primary/90">
            Search
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-11 bg-transparent"
            onClick={handleVoice}
            aria-label="Voice search"
            title="Voice search"
          >
            <Mic className="mr-2 size-4 text-[var(--accent-1)]" />
            Speak
          </Button>
        </motion.form>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="size-5 text-[var(--accent-1)]" />
                  Definition
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {dictLoading && <p className="text-sm text-muted-foreground">Loading definitions…</p>}
                {!entry && !dictLoading && (
                  <p className="text-sm text-muted-foreground">Try searching for a word like serenity.</p>
                )}

                {entry && (
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-semibold">{entry.word}</h2>
                      {phoneticText ? <Badge variant="secondary">{phoneticText}</Badge> : null}
                      <div className="ml-auto flex gap-2">
                        <Button size="sm" variant="outline" onClick={handlePlay}>
                          <Volume2 className="mr-2 size-4 text-[var(--primary)]" />
                          Listen
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleCopy}>
                          <Copy className="mr-2 size-4 text-[var(--accent-2)]" />
                          Copy
                        </Button>
                      </div>
                    </div>

                    {entry.meanings?.map((m, i) => (
                      <div key={i} className="rounded-lg border p-3">
                        <div className="mb-2 text-sm font-medium text-muted-foreground">{m.partOfSpeech}</div>
                        <ul className="list-disc space-y-2 pl-5">
                          {m.definitions?.slice(0, 5).map((d, j) => (
                            <li key={j}>
                              <span>{d.definition}</span>
                              {d.example && <div className="text-sm text-muted-foreground">e.g., {d.example}</div>}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="size-5 text-[var(--accent-2)]" />
                  Wikipedia
                </CardTitle>
              </CardHeader>
              <CardContent>
                {active ? (
                  wiki?.extract ? (
                    <div>
                      <p className="text-sm leading-relaxed text-muted-foreground">{wiki.extract}</p>
                      {wiki?.url && (
                        <a
                          href={wiki.url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-block text-sm text-[var(--primary)] underline underline-offset-4"
                        >
                          Read more on Wikipedia
                        </a>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {wiki?.error ? "No summary found." : "Fetching summary…"}
                    </p>
                  )
                ) : (
                  <p className="text-sm text-muted-foreground">Search a word to see its summary.</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          id="images"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Images className="size-5 text-[var(--primary)]" />
                Related Images
              </CardTitle>
            </CardHeader>
            <CardContent>
              {active ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {imageCards.map((p) => (
                    <a
                      key={p.id}
                      href={(p as any).link || "#"}
                      target={(p as any).link ? "_blank" : undefined}
                      rel="noreferrer"
                      className="group overflow-hidden rounded-lg border"
                    >
                      <img
                        src={(p as any).src || "/placeholder.svg"}
                        alt={(p as any).alt || "Related image"}
                        className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Search a word to load images.</p>
              )}
              {images?.error && (
                <p className="mt-3 text-xs text-muted-foreground">
                  Tip: Add PEXELS_API_KEY in Project Settings to enable real images.
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
