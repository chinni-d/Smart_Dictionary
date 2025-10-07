"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"

/* Modern, sticky, animated navbar with mobile menu */
export function NavPro() {
  const [open, setOpen] = useState(false)
  const items = [
    { href: "#search", label: "Search" },
    { href: "#word-of-day", label: "Word of the Day" },
    { href: "#features", label: "Features" },
    { href: "#about", label: "About" },
  ]

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold tracking-tight text-balance">
          <span className="rounded-md bg-primary/10 px-2 py-1 text-[var(--primary)]">Word</span>
          <span className="ml-1">Sage</span>
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          {items.map((it) => (
            <motion.a
              whileHover={{ y: -2 }}
              key={it.href}
              href={it.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {it.label}
            </motion.a>
          ))}
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Get Started</Button>
        </div>
        <button
          className="inline-flex items-center justify-center rounded-md border p-2 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="border-t md:hidden"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3">
            {items.map((it) => (
              <a
                key={it.href}
                href={it.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 text-sm hover:bg-muted"
              >
                {it.label}
              </a>
            ))}
            <Button className="mt-2 w-full bg-primary text-primary-foreground hover:bg-primary/90">Get Started</Button>
          </div>
        </motion.div>
      )}
    </header>
  )
}
