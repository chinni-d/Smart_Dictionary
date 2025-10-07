"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, BookOpen, Search, Calendar, Zap, Info, Shield } from "lucide-react"

const links = [
  { href: "#search", label: "Search", icon: Search },
  { href: "#word-of-day", label: "Word of Day", icon: Calendar },
  { href: "#features", label: "Features", icon: Zap },
  { href: "#about", label: "About", icon: Info },
  { href: "/privacy", label: "Privacy", icon: Shield },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [hash, setHash] = useState<string>("")

  useEffect(() => {
    const update = () => setHash(window.location.hash || "")
    update()
    window.addEventListener("hashchange", update)
    return () => window.removeEventListener("hashchange", update)
  }, [])

  return (
    <nav aria-label="Primary" className="flex h-20 items-center justify-between relative">
      {/* Logo Section */}
      <Link href="/" className="flex items-center gap-3 shrink-0 group" aria-label="Home">
        <div className="relative">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <span className="text-[8px] font-bold text-white">W</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-black text-xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            LexiCore
          </span>
          <span className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase">
            Smart Dictionary
          </span>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-2">
        {links.map((l) => {
          const isActive = l.href.startsWith("#") ? hash === l.href : false
          const Icon = l.icon
          return (
            <a
              key={l.href}
              href={l.href}
              aria-current={isActive ? "page" : undefined}
              className={`group relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive 
                  ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400 shadow-sm' 
                  : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-950/30 dark:hover:to-purple-950/30 text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4" />
                <span>{l.label}</span>
              </div>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              )}
            </a>
          )
        })}
        
        {/* CTA Button */}
        <div className="ml-4 flex items-center gap-3">
          <div className="w-px h-6 bg-border"></div>
          <a
            href="#search"
            className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white rounded-2xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Search className="w-4 h-4" />
            <span>Try Now</span>
            <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              aria-label="Open navigation"
              className="w-12 h-12 rounded-2xl border-2 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-950/30 dark:hover:to-purple-950/30 transition-all duration-200"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[60%] bg-background/95 backdrop-blur-xl border-l border-border/50">
            <SheetHeader className="pb-8 pt-4 text-left">
              <SheetTitle className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 flex items-center justify-center shadow-lg">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    LexiCore
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">
                    Smart Dictionary
                  </span>
                </div>
              </SheetTitle>
            </SheetHeader>
            
            <div className="flex flex-col gap-2 mt-4">
              {links.map((l) => {
                const Icon = l.icon
                const isActive = l.href.startsWith("#") ? hash === l.href : false
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive 
                        ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400' 
                        : 'hover:bg-muted/50 text-foreground hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      isActive 
                        ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-sm' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="flex-1">{l.label}</span>
                    {isActive && (
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    )}
                  </a>
                )
              })}
              
              <div className="mt-6 pt-4 border-t border-border/50">
                <div className="flex justify-center">
                  <a
                    href="#search"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    <Search className="w-4 h-4" />
                    Try Now
                  </a>
                </div>
                
                <div className="mt-4 text-center">
                  <p className="text-xs text-muted-foreground">
                    Discover words with AI-powered insights
                  </p>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
