"use client"

import { useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Volume2, Copy, ExternalLink } from "lucide-react"
import useSWR from "swr"

type ApiEntry = {
  word: string
  phonetics?: { text?: string; audio?: string }[]
  origin?: string
  meanings?: {
    partOfSpeech?: string
    definitions: { definition: string; example?: string; synonyms?: string[] }[]
  }[]
}

type ImageItem = { id: number; alt: string; src: string; photographer?: string; link?: string }
type WikiData = { title?: string; extract?: string; url?: string }

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error("Failed to fetch")
  return res.json()
}

export function WordResult({ entry }: { entry: ApiEntry }) {
  const audios = useMemo(
    () => (entry.phonetics || []).map((p) => p.audio).filter(Boolean) as string[],
    [entry.phonetics],
  )
  const phoneticsText = useMemo(
    () => (entry.phonetics || []).map((p) => p.text).filter(Boolean) as string[],
    [entry.phonetics],
  )

  const { data: imagesData } = useSWR<{ images: ImageItem[] }>(
    entry.word ? `/api/images?q=${encodeURIComponent(entry.word)}` : null,
    fetcher,
    { revalidateOnFocus: false },
  )
  const images = imagesData?.images ?? []

  const { data: wikiData } = useSWR<WikiData>(
    entry.word ? `/api/wiki?q=${encodeURIComponent(entry.word)}` : null,
    fetcher,
    { revalidateOnFocus: false },
  )

  const { data: etymologyData } = useSWR<{ etymology: string | null }>(
    entry.word ? `/api/etymology?q=${encodeURIComponent(entry.word)}` : null,
    fetcher,
    { revalidateOnFocus: false },
  )

  const playAudio = (src: string) => {
    const audio = new Audio(src)
    audio.crossOrigin = "anonymous"
    audio.play().catch(() => {})
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // You could add a toast notification here for better UX
      const button = document.activeElement as HTMLButtonElement
      if (button) {
        const originalText = button.innerHTML
        button.innerHTML = '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>'
        setTimeout(() => {
          button.innerHTML = originalText
        }, 2000)
      }
    } catch (error) {
      console.error('Failed to copy text:', error)
    }
  }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-6 border border-border/50">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              {entry.word}
            </h2>
            {phoneticsText.length > 0 && (
              <p className="text-lg text-muted-foreground font-medium tracking-wide">
                {phoneticsText.join(" · ")}
              </p>
            )}
          </div>
          {audios.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {audios.slice(0, 2).map((src, i) => (
                <Button 
                  key={i} 
                  type="button" 
                  variant="outline" 
                  size="lg" 
                  onClick={() => playAudio(src)}
                  className="bg-background/50 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                >
                  <Volume2 className="size-4 mr-2" />
                  Listen {i === 0 ? "1" : "2"}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-4">
        {(entry.meanings || []).map((m, i) => (
          <Card key={i} className="p-4 animate-in fade-in slide-in-from-bottom-2">
            <p className="text-sm uppercase tracking-wide text-muted-foreground mb-2">
              {m.partOfSpeech ?? "Definition"}
            </p>
            <ol className="list-decimal ml-4 space-y-3">
              {m.definitions.map((d, j) => (
                <li key={j} className="space-y-2">
                                    <div className="flex items-start justify-between gap-3">
                    <p className="text-pretty leading-relaxed text-base flex-1">{d.definition}</p>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      aria-label="Copy definition"
                      onClick={() => copyToClipboard(`${entry.word}: ${d.definition}`)}
                      className="hover:bg-primary cursor-pointer hover:text-primary-foreground hover:border-primary transition-all duration-200 shrink-0 shadow-sm"
                    >
                      <Copy className="w-4 h-4" />
                   
                    </Button>
                  </div>
                  {d.example && <p className="text-sm text-muted-foreground">Example: “{d.example}”</p>}
                  {d.synonyms && d.synonyms.length > 0 && (
                    <p className="text-sm text-muted-foreground">Synonyms: {d.synonyms.slice(0, 6).join(", ")}</p>
                  )}
                </li>
              ))}
            </ol>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-8 animate-in fade-in slide-in-from-bottom-2 delay-500 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-950/30 dark:to-cyan-950/30 border-2 border-blue-100/50 dark:border-blue-800/30">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-bold text-xl text-blue-700 dark:text-blue-300">Visual Context</h3>
            </div>
            <div className="text-xs bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded-full text-blue-600 dark:text-blue-400 font-medium">
              {images.length > 0 ? `${Math.min(images.length, 8)} images` : 'Loading...'}
            </div>
          </div>
          {images.length > 0 ? (
            <div className="grid grid-cols-4 gap-4">
              {images.slice(0, 8).map((img) => (
                <a key={img.id} href={img.link || "#"} target="_blank" rel="noreferrer" className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                  <img
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt || `Related to ${entry.word}`}
                    loading="lazy"
                    decoding="async"
                    className="h-28 w-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center">
                      <ExternalLink className="w-3 h-3 text-gray-700" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h32 bg-gradient-to-br from-blue-100/50 to-cyan-100/50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border-2 border-dashed border-blue-200 dark:border-blue-700">
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-blue-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Fetching related images...</p>
            </div>
          )}
        </Card>

        <Card className="p-8 animate-in fade-in slide-in-from-bottom-2 delay-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-950/30 dark:to-cyan-950/30 border-2 border-blue-100/50 dark:border-blue-800/30">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-bold text-xl text-blue-700 dark:text-blue-300">Wikipedia</h3>
            </div>
            {wikiData?.extract && (
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(wikiData.extract || '')}
                className="hover:bg-blue-100 hover:border-blue-300 transition-colors"
              >
                <Copy className="w-4 h-4" />
              </Button>
            )}
          </div>
          {wikiData?.extract ? (
            <div className="bg-gradient-to-br from-blue-100/50 to-cyan-100/50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 border border-blue-200/30 dark:border-blue-700/30">
              <p className="text-sm leading-relaxed line-clamp-8 mb-4 text-gray-700 dark:text-gray-300">{wikiData.extract}</p>
              {wikiData.url && (
                <a
                  href={wikiData.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50"
                >
                  Read full article <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-32 bg-gradient-to-br from-blue-100/50 to-cyan-100/50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border-2 border-dashed border-blue-200 dark:border-blue-700">
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-blue-500 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Fetching Wikipedia summary...</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
