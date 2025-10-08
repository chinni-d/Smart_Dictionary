"use client"

import { Suspense, useState, useEffect } from "react"
import { WordExplorer } from "@/components/word-explorer"
import { WordOfDay } from "@/components/word-of-day"
import { Features } from "@/components/features"
import { About } from "@/components/about"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { SiLinkedin, SiGithub } from "react-icons/si"
import { Globe } from "lucide-react"
import { SparklesText } from "@/components/sparkes-text"
import { Highlighter } from "@/components/highlighter"

export default function Page() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled down more than 300px from top
      setShowBackToTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="min-h-dvh">
      <div className="fixed top-0 left-0 right-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4">
          <Navbar />
        </div>
      </div>

      <header id="home" className="border-b relative overflow-hidden h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-950 dark:via-blue-950/30 dark:to-indigo-950/50"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 25% 25%, #e2e8f0 1px, transparent 1px)', backgroundSize: '60px 60px'}}></div>
        </div>
        <div className="max-w-6xl px-4 relative w-full flex flex-col items-center justify-center text-center">
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-background/80 backdrop-blur-sm mb-8 text-sm font-medium text-muted-foreground">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              AI-Powered Dictionary Experience
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground mb-6 leading-none tracking-tight">
             <SparklesText sparklesCount={25} as={<span />} className="inline-block">Your Calm Study</SparklesText>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Dictionary
              </span>
            </h1>
            <p className="text-muted-foreground max-w-3xl mx-auto text-xl md:text-2xl leading-relaxed mb-8 font-light">
              Discover words in a peaceful, distraction-free environment designed for{" "}
              <Highlighter action="highlight" color="#87CEFA" animationDuration={800} isView={true}>
                <span className="text-foreground font-medium">focused learning</span>
              </Highlighter>{" "}
              and{" "}
              <Highlighter action="underline" color="#FF9800" animationDuration={1000} isView={true}>
                <span className="text-foreground font-medium">deep understanding</span>
              </Highlighter>.
            </p>
            <div className="flex flex-row items-center justify-center gap-4 mb-12">
              <a
                href="#search"
                className="group inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Start Exploring
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="#features"
                className="inline-flex items-center gap-2 px-4 py-2 border-2 border-border hover:border-primary/50 rounded-2xl font-medium text-lg transition-all duration-200 hover:bg-muted/50"
              >
                See Features
              </a>
            </div>
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 12c0-1.01-.188-1.974-.529-2.829a1 1 0 010-1.414l.186-.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Audio Pronunciation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Visual Context</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="search" className="relative overflow-hidden bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30 dark:from-gray-950/50 dark:via-gray-900 dark:to-blue-950/30">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: 'linear-gradient(45deg, #e2e8f0 25%, transparent 25%), linear-gradient(-45deg, #e2e8f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e2e8f0 75%), linear-gradient(-45deg, transparent 75%, #e2e8f0 75%)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'}}></div>
        </div>
        <div className="mx-auto max-w-6xl px-4 py-20 relative">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-background/80 backdrop-blur-sm mb-6 text-sm font-medium text-muted-foreground">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              Interactive Word Search
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Word Explorer
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
              Search for any English word to discover its <span className="text-foreground font-semibold">meaning</span>, 
              <span className="text-foreground font-semibold"> pronunciation</span>, 
              <span className="text-foreground font-semibold"> etymology</span>, and 
              <span className="text-foreground font-semibold"> visual context</span>
            </p>
          </div>
          <div className="animate-in fade-in slide-in-from-bottom-2 delay-300">
            <Suspense>
              <WordExplorer />
            </Suspense>
          </div>
        </div>
      </section>

      <section id="word-of-day" className="border-t bg-gradient-to-br from-purple-50/30 via-pink-50/20 to-rose-50/30 dark:from-purple-950/20 dark:via-pink-950/10 dark:to-rose-950/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 20% 80%, #e879f9 0.5px, transparent 0.5px), radial-gradient(circle at 80% 20%, #f472b6 0.5px, transparent 0.5px), radial-gradient(circle at 40% 40%, #c084fc 0.5px, transparent 0.5px)', backgroundSize: '50px 50px, 80px 80px, 60px 60px'}}></div>
        </div>
        <div className="mx-auto max-w-6xl px-4 py-20 relative">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-200/50 bg-purple-50/80 dark:border-purple-700/50 dark:bg-purple-950/50 backdrop-blur-sm mb-6 text-sm font-medium text-purple-700 dark:text-purple-300">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              Daily Vocabulary
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
              Word of the Day
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
              Expand your vocabulary with our <span className="text-foreground font-semibold">carefully selected</span> daily word, 
              complete with detailed explanations and <span className="text-foreground font-semibold">pronunciation guides</span>
            </p>
          </div>
          <div className="animate-in fade-in slide-in-from-bottom-2 delay-500">
            <WordOfDay />
          </div>
        </div>
      </section>

      <section id="features" className="border-t bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30 dark:from-gray-950/50 dark:via-gray-900 dark:to-blue-950/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: 'linear-gradient(45deg, #e2e8f0 25%, transparent 25%), linear-gradient(-45deg, #e2e8f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e2e8f0 75%), linear-gradient(-45deg, transparent 75%, #e2e8f0 75%)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'}}></div>
        </div>
        <div className="mx-auto max-w-6xl px-4 py-20 relative">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-background/80 backdrop-blur-sm mb-6 text-sm font-medium text-muted-foreground">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              Advanced Capabilities
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
              Everything you need for <span className="text-foreground font-semibold">effective vocabulary building</span> and 
              <span className="text-foreground font-semibold">comprehensive word exploration</span>
            </p>
          </div>
          <div className="animate-in fade-in slide-in-from-bottom-2 delay-300">
            <Features />
          </div>
        </div>
      </section>

      <section id="about" className="border-t bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30 dark:from-gray-950/50 dark:via-gray-900 dark:to-blue-950/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: 'linear-gradient(45deg, #e2e8f0 25%, transparent 25%), linear-gradient(-45deg, #e2e8f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e2e8f0 75%), linear-gradient(-45deg, transparent 75%, #e2e8f0 75%)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'}}></div>
        </div>
        <div className="mx-auto max-w-6xl px-4 py-20 relative">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-background/80 backdrop-blur-sm mb-6 text-sm font-medium text-muted-foreground">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Our Story
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              About LexiCore
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
              Learn more about our <span className="text-foreground font-semibold">mission</span> to make vocabulary learning 
              <span className="text-foreground font-semibold">enjoyable</span> and <span className="text-foreground font-semibold">effective</span> for everyone
            </p>
          </div>
          <div className="animate-in fade-in slide-in-from-bottom-2 delay-500">
            <About />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 mb-8">
            {/* Brand Section */}
            <div className="col-span-2 lg:col-span-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <span className="font-black text-sm sm:text-lg bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  LexiCore
                </span>
              </div>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-4 max-w-xs mx-auto sm:mx-0">
                Making vocabulary learning beautiful and effective with AI-powered insights.
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
                <a href="https://www.dmanikanta.site" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg hover:bg-muted/50 flex items-center justify-center transition-all duration-200 hover:scale-110" aria-label="Portfolio">
                  <Globe className="w-5 h-5 text-blue-600" />
                </a>
                <a href="https://www.linkedin.com/in/manikanta-darapureddy-6a1125314/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg hover:bg-muted/50 flex items-center justify-center transition-all duration-200 hover:scale-110" aria-label="LinkedIn">
                  <SiLinkedin className="w-5 h-5 text-[#0077B5]" />
                </a>
                <a href="https://github.com/chinni-d" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg hover:bg-muted/50 flex items-center justify-center transition-all duration-200 hover:scale-110" aria-label="GitHub">
                  <SiGithub className="w-5 h-5 text-[#181717] dark:text-white" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-center sm:text-left">
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#search" className="text-muted-foreground hover:text-foreground transition-colors">Search Words</a></li>
                <li><a href="#word-of-day" className="text-muted-foreground hover:text-foreground transition-colors">Word of Day</a></li>
                <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="text-center sm:text-left">
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Pronunciation</a></li>
                <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Visual Context</a></li>
                <li><a href="#search" className="text-muted-foreground hover:text-foreground transition-colors">Get Started</a></li>
              </ul>
            </div>

            {/* Connect */}
            <div className="text-center sm:text-left">
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex items-center justify-center sm:justify-start gap-4">
                <a href="https://www.dmanikanta.site" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg hover:bg-muted/50 flex items-center justify-center transition-all duration-200 hover:scale-110" aria-label="Portfolio">
                  <Globe className="w-6 h-6 text-blue-600" />
                </a>
                <a href="https://www.linkedin.com/in/manikanta-darapureddy-6a1125314/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg hover:bg-muted/50 flex items-center justify-center transition-all duration-200 hover:scale-110" aria-label="LinkedIn">
                  <SiLinkedin className="w-6 h-6 text-[#0077B5]" />
                </a>
                <a href="https://github.com/chinni-d" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg hover:bg-muted/50 flex items-center justify-center transition-all duration-200 hover:scale-110" aria-label="GitHub">
                  <SiGithub className="w-6 h-6 text-[#181717] dark:text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} LexiCore. All rights reserved.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span>Built with 💛 using Next.js and AI technologies.</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-6 cursor-pointer right-6 z-50 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          aria-label="Back to top"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </main>
  )
}
