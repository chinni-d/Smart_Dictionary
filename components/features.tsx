import { Card } from "@/components/ui/card"
import { Search, Volume2, Mic, BookOpen, ScrollText, ImageIcon, Share2, Calendar } from "lucide-react"

const items = [
  {
    icon: Search,
    title: "Smart Word Search",
    desc: "Instantly find comprehensive definitions, meanings, and usage examples for any word.",
  },
  {
    icon: Volume2,
    title: "Audio Pronunciation",
    desc: "Listen to correct pronunciation variants for perfect learning.",
  },
  { icon: Mic, title: "Voice Search", desc: "Search hands-free using voice recognition for a seamless experience." },
  { icon: BookOpen, title: "Rich Definitions", desc: "Multiple meanings, parts of speech, and detailed explanations." },
  { icon: ScrollText, title: "Etymology & Origins", desc: "Discover the history and linguistic roots behind words." },
  { icon: ImageIcon, title: "Visual Context", desc: "Related visuals to enhance memory and understanding." },
  { icon: Share2, title: "Easy Sharing", desc: "Copy definitions and examples with one click." },
  { icon: Calendar, title: "Daily Discovery", desc: "A curated Word of the Day keeps learning fresh." },
]

const colorCycle = ["accent-1", "accent-2", "primary"] as const

export function Features() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-balance">Everything You Need to Master Words</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Our comprehensive tools make learning new vocabulary engaging, effective, and enjoyable.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map(({ icon: Icon, title, desc }, idx) => {
          const tone = colorCycle[idx % colorCycle.length]
          return (
            <Card
              key={title}
              className="p-4 transition hover:shadow-md hover:ring-1 hover:ring-primary/40 animate-in fade-in slide-in-from-bottom-2"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`rounded-md p-2 ring-1`}
                  style={{
                    backgroundColor:
                      tone === "primary"
                        ? "var(--color-primary)"
                        : tone === "accent-1"
                          ? "var(--color-accent-1)"
                          : "var(--color-accent-2)",
                    color:
                      tone === "primary"
                        ? "var(--color-primary-foreground)"
                        : tone === "accent-1"
                          ? "var(--color-accent-1-foreground)"
                          : "var(--color-accent-2-foreground)",
                    borderColor:
                      tone === "primary"
                        ? "color-mix(in oklab, var(--color-primary) 40%, var(--color-border))"
                        : "var(--color-border)",
                  }}
                >
                  <Icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-medium">{title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{desc}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
