import { Card } from "@/components/ui/card"
import { Focus, Heart, Users, Zap } from "lucide-react"

const aboutItems = [
  {
    icon: Focus,
    title: "Focused Learning",
    desc: "Designed for students and language lovers who value distraction-free study sessions.",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
  },
  {
    icon: Heart,
    title: "Calm Experience",
    desc: "Peaceful interactions reduce cognitive load and help maximize retention.",
    color: "text-rose-600 dark:text-rose-400",
    bgColor: "bg-rose-50 dark:bg-rose-950/20",
  },
  {
    icon: Users,
    title: "For Everyone",
    desc: "Whether student, professional, or lifelong learner—tools adapt to your style.",
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
  },
  {
    icon: Zap,
    title: "Instant Access",
    desc: "Lightning-fast search with comprehensive, useful results for true understanding.",
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-50 dark:bg-amber-950/20",
  },
]

export function About() {
  return (
    <div className="flex flex-col gap-6">
      
      
      <div className="grid gap-4 sm:grid-cols-2">
        {aboutItems.map(({ icon: Icon, title, desc, color, bgColor }, idx) => (
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
