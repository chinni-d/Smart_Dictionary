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
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
  
  const { data } = useSWR<ApiEntry[]>(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(wotd)}`,
    fetcher,
    { revalidateOnFocus: false },
  )
  const entry = Array.isArray(data) && data.length ? data[0] : null
  const definition =
    entry?.meanings?.[0]?.definitions?.[0]?.definition || "Expand your vocabulary with our daily featured word."

  return (
    <Card className="relative p-8 bg-gradient-to-br from-blue-50 via-indigo-50/80 to-purple-50/60 dark:from-slate-900 dark:via-blue-950/50 dark:to-indigo-950/30 border border-blue-200/60 dark:border-blue-800/40 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] overflow-hidden group">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-3xl transform translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-400 to-blue-400 rounded-full blur-2xl transform -translate-x-12 translate-y-12"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-6 mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              <p className="text-xs uppercase tracking-[0.2em] text-blue-600/80 dark:text-blue-400/80 font-bold">Word of the Day</p>
            </div>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4 lg:mb-5 tracking-tight leading-none group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">{wotd}</h3>
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-7 sm:leading-8 max-w-2xl font-normal">{definition}</p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 bg-white/70 dark:bg-slate-800/70 rounded-2xl border border-blue-200/70 dark:border-blue-700/50 shadow-lg backdrop-blur-sm">
              <CalendarDays className="size-4 sm:size-5 text-blue-600 dark:text-blue-400" />
              <p className="text-xs sm:text-sm font-bold text-blue-900 dark:text-blue-100">{today}</p>
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t border-blue-200/40 dark:border-blue-700/40">
          <div className="flex justify-center lg:justify-start">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group/btn w-full sm:w-auto">
              <a href={`#search`} className="flex items-center justify-center gap-3">
                <span className="font-semibold">Explore More</span>
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover/btn:translate-x-1 transition-transform duration-200">
                  <span className="text-xs">→</span>
                </div>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
