"use client"

import useSWR from "swr"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays } from "lucide-react"
import { words } from "@/lib/words"

type ApiEntry = {
  word: string
  meanings?: { partOfSpeech?: string; definitions: { definition: string }[] }[]
}

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error("Failed to fetch")
  return res.json()
}

function pickWordOfTheDay() {
  const dateKey = new Date().toISOString().slice(0, 10)
  let hash = 0
  for (let i = 0; i < dateKey.length; i++) {
    hash = (hash * 31 + dateKey.charCodeAt(i)) % 2147483647
  }
  const idx = hash % words.length
  return words[idx]
}

export function WordOfDay() {
  const wotd = pickWordOfTheDay()
  const { data } = useSWR<ApiEntry[]>(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(wotd)}`,
    fetcher,
    { revalidateOnFocus: false },
  )
  const entry = Array.isArray(data) && data.length ? data[0] : null
  const definition =
    entry?.meanings?.[0]?.definitions?.[0]?.definition || "Expand your vocabulary with our daily featured word."

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-wide text-muted-foreground mb-1">Word of the Day</p>
          <h3 className="text-2xl font-semibold">{wotd}</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-2xl">{definition}</p>
        </div>
        <CalendarDays className="size-6 text-muted-foreground mt-1 hidden sm:block" />
      </div>
      <div className="mt-4">
        <Button asChild variant="outline">
          <a href={`#search`}>Learn more</a>
        </Button>
      </div>
    </Card>
  )
}
