import { Card } from "@/components/ui/card"
import { Search, Volume2, Mic, BookOpen, ScrollText, ImageIcon, Share2, Calendar } from "lucide-react"

const items = [
  {
    icon: Search,
    title: "Smart Word Search",
    desc: "Instantly find comprehensive definitions, meanings, and usage examples for any word.",
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
  },
  {
    icon: Volume2,
    title: "Audio Pronunciation",
    desc: "Listen to correct pronunciation variants for perfect learning.",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
  },
  {
    icon: Mic,
    title: "Voice Search",
    desc: "Search hands-free using voice recognition for a seamless experience.",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
  },
  {
    icon: BookOpen,
    title: "Rich Definitions",
    desc: "Multiple meanings, parts of speech, and detailed explanations.",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
  },
  {
    icon: ScrollText,
    title: "Etymology & Origins",
    desc: "Discover the history and linguistic roots behind words.",
    color: "text-rose-600 dark:text-rose-400",
    bgColor: "bg-rose-50 dark:bg-rose-950/20",
  },
  {
    icon: ImageIcon,
    title: "Visual Context",
    desc: "Related visuals to enhance memory and understanding.",
    color: "text-cyan-600 dark:text-cyan-400",
    bgColor: "bg-cyan-50 dark:bg-cyan-950/20",
  },
  {
    icon: Share2,
    title: "Easy Sharing",
    desc: "Copy definitions and examples with one click.",
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-950/20",
  },
  {
    icon: Calendar,
    title: "Daily Discovery",
    desc: "A curated Word of the Day keeps learning fresh.",
    color: "text-violet-600 dark:text-violet-400",
    bgColor: "bg-violet-50 dark:bg-violet-950/20",
  },
]

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
        {items.map(({ icon: Icon, title, desc, color, bgColor }, idx) => (
          <Card
            key={title}
            className="group p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 border-0 shadow-sm"
            style={{
              animationDelay: `${idx * 100}ms`,
            }}
          >
            <div className="flex items-start gap-4">
              <div className={`rounded-lg p-2.5 ${bgColor} transition-transform duration-300 group-hover:scale-105`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base mb-2 text-foreground">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
