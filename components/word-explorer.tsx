"use client"

import type React from "react"
import { useState, useMemo, useRef, useEffect } from "react"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { WordResult } from "@/components/word-result"
import { Mic, SearchIcon } from "lucide-react"
// Web Speech API types
interface SpeechRecognitionEvent extends Event {
  resultIndex: number
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionResultList {
  length: number
  item(index: number): SpeechRecognitionResult
  [index: number]: SpeechRecognitionResult
}

interface SpeechRecognitionResult {
  length: number
  item(index: number): SpeechRecognitionAlternative
  [index: number]: SpeechRecognitionAlternative
  isFinal: boolean
}

interface SpeechRecognitionAlternative {
  transcript: string
  confidence: number
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  maxAlternatives: number
  start(): void
  stop(): void
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: Event) => void) | null
  onend: (() => void) | null
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognition
    webkitSpeechRecognition?: new () => SpeechRecognition
  }
}
import { words as sampleWords } from "@/lib/words"

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error("Failed to fetch")
  return res.json()
}

export function WordExplorer() {
  const [query, setQuery] = useState("")
  const [word, setWord] = useState("")
  const micRef = useRef<SpeechRecognition | null>(null)

  const { data, error, isLoading } = useSWR<any[]>(
    word ? `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}` : null,
    fetcher,
    { revalidateOnFocus: false },
  )

  // Dynamic title update based on search state
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (word && isLoading) {
        document.title = `Searching "${word}"... | LexiCore`
      } else if (word && data && data.length > 0) {
        const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1)
        document.title = `${capitalizedWord} - Definition | LexiCore`
      } else if (word && error) {
        document.title = `"${word}" not found | LexiCore`
      } else {
        document.title = 'Smart Dictionary - LexiCore'
      }
    }
  }, [word, data, error, isLoading])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setWord(query.trim())
  }

  const startVoice = () => {
    const SR: typeof window.SpeechRecognition | typeof window.webkitSpeechRecognition | undefined =
      typeof window !== "undefined" ? window.SpeechRecognition || window.webkitSpeechRecognition : undefined
    if (!SR) return
    const recognition = new SR()
    micRef.current = recognition as SpeechRecognition
    recognition.lang = "en-US"
    recognition.interimResults = false
    recognition.maxAlternatives = 1
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const rawText = event.results?.[0]?.[0]?.transcript ?? ""
      // Remove trailing punctuation (period, comma, question mark, exclamation mark)
      const cleanText = rawText.replace(/[.,!?]+$/, "").trim()
      setQuery(cleanText)
      setWord(cleanText)
    }
    recognition.start()
  }

  const entry = useMemo(() => (Array.isArray(data) && data.length > 0 ? data[0] : null), [data])

  const quickWords = sampleWords.filter((w) => w !== word).slice(0, 6)

  return (
    <div className="flex flex-col gap-8">
      <div className="relative">
        <form onSubmit={onSubmit} className="flex cursor-pointer items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-700">
          <label htmlFor="word" className="sr-only">
            Search word
          </label>
          <div className="relative flex-1">
            <Input
              id="word"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search any English word..."
              className="h-14 pl-6 pr-4 text-lg border-2 border-border/50 focus:border-primary transition-all duration-200 rounded-2xl bg-background/50 backdrop-blur"
              autoComplete="off"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl blur-xl"></div>
          </div>
          <Button 
            type="submit" 
            size="lg"
            className="h-14 px-6 cursor-pointer rounded-2xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <SearchIcon className="size-5 mr-2" />
            Search
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            size="lg"
            onClick={startVoice} 
            aria-label="Voice search" 
            className="h-14 px-4 cursor-pointer rounded-2xl border-2 hover:bg-secondary/20 transition-all duration-200"
          >
            <Mic className="size-5" />
          </Button>
        </form>
      </div>

      <div className="flex flex-wrap gap-3 justify-center animate-in fade-in slide-in-from-bottom-2 delay-300">
        <p className="w-full text-center text-sm text-muted-foreground mb-2 font-medium">Try these popular words:</p>
        {quickWords.map((w, i) => (
          <button
            key={w + i}
            className={`
              relative px-4 py-2 text-sm font-medium rounded-full border-2 transition-all duration-300
              hover:scale-105 hover:shadow-lg active:scale-95
              ${i % 3 === 0 ? 'border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 text-purple-700 dark:from-purple-950/30 dark:to-pink-950/30 dark:border-purple-700 dark:text-purple-300' : ''}
              ${i % 3 === 1 ? 'border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 text-blue-700 dark:from-blue-950/30 dark:to-cyan-950/30 dark:border-blue-700 dark:text-blue-300' : ''}
              ${i % 3 === 2 ? 'border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 text-orange-700 dark:from-orange-950/30 dark:to-red-950/30 dark:border-orange-700 dark:text-orange-300' : ''}
            `}
            onClick={() => {
              setQuery(w)
              setWord(w)
            }}
          >
            {w}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12 animate-in fade-in slide-in-from-bottom-2">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
          <p className="text-base text-muted-foreground font-medium">Searching for your word...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-12 animate-in fade-in slide-in-from-bottom-2">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
            <span className="text-2xl">🔍</span>
          </div>
          <p className="text-base text-destructive font-medium mb-2">No results found</p>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            Try checking the spelling or search for a different word. Some suggestions: "serendipity", "ephemeral", or "lucid".
          </p>
        </div>
      ) : entry ? (
        <WordResult entry={entry} />
      ) : (
        <div className="text-center py-12 animate-in fade-in slide-in-from-bottom-2">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-4 mx-auto">
            <span className="text-2xl">📚</span>
          </div>
          <p className="text-lg font-medium text-muted-foreground mb-2">Ready to explore words?</p>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Try searching for words like <strong>"serendipity"</strong>, <strong>"ephemeral"</strong>, or <strong>"lucid"</strong> to get started.
          </p>
        </div>
      )}
    </div>
  )
}
