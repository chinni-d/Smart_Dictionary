"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, BookOpen, Search, Calendar, Zap, Info, Globe } from "lucide-react"
import { SiLinkedin, SiGithub } from "react-icons/si"

const links = [
  { href: "#home", label: "Home", icon: BookOpen },
  { href: "#search", label: "Search", icon: Search },
  { href: "#word-of-day", label: "Word of Day", icon: Calendar },
  { href: "#features", label: "Features", icon: Zap },
  { href: "#about", label: "About", icon: Info },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("")

  useEffect(() => {
    const sections = links.map(link => link.href.replace('#', '')).filter(id => id)
    
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the section that is most visible
        let maxRatio = 0
        let activeId = ""
        
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio
            activeId = entry.target.id
          }
        })
        
        if (activeId) {
          setActiveSection(`#${activeId}`)
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px", // Trigger when section is 20% from top
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
      }
    )

    // Observe all sections
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        observer.observe(element)
      }
    })

    // Also listen to hash changes for direct navigation
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash) {
        setActiveSection(hash)
      }
    }
    
    // Set initial active section
    handleHashChange()
    window.addEventListener("hashchange", handleHashChange)

    return () => {
      observer.disconnect()
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])

  return (
    <nav aria-label="Primary" className="flex h-16 items-center justify-between relative">
      {/* Logo Section */}
      <Link href="/" className="flex items-center gap-3 shrink-0 group" aria-label="Home">
        <div className="relative">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <span className="text-[7px] font-bold text-white">W</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-black text-lg bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            LexiCore
          </span>
          <span className="text-[9px] text-muted-foreground font-medium tracking-wider uppercase">
            Smart Dictionary
          </span>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-2">
        {links.map((l) => {
          const isActive = l.href.startsWith("#") ? activeSection === l.href : false
          const Icon = l.icon
          return (
            <a
              key={l.href}
              href={l.href}
              aria-current={isActive ? "page" : undefined}
              className={`group relative px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
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
        
        {/* Social Links */}
        <div className="ml-4 flex items-center gap-3">
          <div className="w-px h-6 bg-gradient-to-b from-transparent via-border to-transparent"></div>
          <div className="flex items-center gap-2">
            <a 
              href="https://www.dmanikanta.site" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group w-10 h-10 rounded-xl bg-transparent hover:bg-muted/50 flex items-center justify-center transition-all duration-200 hover:scale-110" 
              aria-label="Portfolio"
              title="Visit Portfolio"
            >
              <Globe className="w-5 h-5 text-blue-600 group-hover:text-blue-700 transition-colors duration-200" />
            </a>
            <a 
              href="https://www.linkedin.com/in/manikanta-darapureddy-6a1125314/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group w-10 h-10 rounded-xl bg-transparent hover:bg-muted/50 flex items-center justify-center transition-all duration-200 hover:scale-110" 
              aria-label="LinkedIn"
              title="Connect on LinkedIn"
            >
              <SiLinkedin className="w-5 h-5 text-[#0077B5] group-hover:text-[#005885] transition-colors duration-200" />
            </a>
            <a 
              href="https://github.com/chinni-d" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group w-10 h-10 rounded-xl bg-transparent hover:bg-muted/50 flex items-center justify-center transition-all duration-200 hover:scale-110" 
              aria-label="GitHub"
              title="View GitHub Profile"
            >
              <SiGithub className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors duration-200" />
            </a>
          </div>
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
              className="w-10 h-10 rounded-xl border-2 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-950/30 dark:hover:to-purple-950/30 transition-all duration-200"
            >
              <Menu className="w-4 h-4" />
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
                const isActive = l.href.startsWith("#") ? activeSection === l.href : false
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
              
              <div className="mt-6 pt-4 border-t border-gradient-to-r from-transparent via-border to-transparent">
                <div className="text-center mb-4">
                  <h4 className="text-sm font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                    Connect With Me
                  </h4>
                </div>
                <div className="flex justify-center">
                  <div className="flex items-center gap-4">
                    <a 
                      href="https://www.dmanikanta.site" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onClick={() => setOpen(false)}
                      className="group w-14 h-14 rounded-2xl bg-transparent hover:bg-muted/50 flex items-center justify-center transition-all duration-200 hover:scale-110" 
                      aria-label="Portfolio"
                    >
                      <Globe className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors duration-200" />
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/manikanta-darapureddy-6a1125314/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onClick={() => setOpen(false)}
                      className="group w-14 h-14 rounded-2xl bg-transparent hover:bg-muted/50 flex items-center justify-center transition-all duration-200 hover:scale-110" 
                      aria-label="LinkedIn"
                    >
                      <SiLinkedin className="w-6 h-6 text-[#0077B5] group-hover:text-[#005885] transition-colors duration-200" />
                    </a>
                    <a 
                      href="https://github.com/chinni-d" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onClick={() => setOpen(false)}
                      className="group w-14 h-14 rounded-2xl bg-transparent hover:bg-muted/50 flex items-center justify-center transition-all duration-200 hover:scale-110" 
                      aria-label="GitHub"
                    >
                      <SiGithub className="w-6 h-6 text-gray-700 group-hover:text-gray-900 transition-colors duration-200" />
                    </a>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <p className="text-xs text-muted-foreground">
                    Let's connect and build amazing things together
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
