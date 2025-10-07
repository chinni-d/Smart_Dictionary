/* New enhanced page with modern UI, animations, images, and wiki */
import { NavPro } from "@/components/nav-pro"
import { SearchExperience } from "@/components/search-experience"
import { FeaturesModern } from "@/components/features-modern"
import { AboutModern } from "@/components/about-modern"

export default function EnhancedPage() {
  return (
    <main className="font-sans bg-background text-foreground">
      <NavPro />
      <SearchExperience />
      <section id="word-of-day" className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-balance text-2xl font-semibold sm:text-3xl">Word of the Day</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Try searching words like: serenity, ephemeral, lucid, benevolent, catalyst.
          </p>
        </div>
      </section>
      <FeaturesModern />
      <AboutModern />
      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Word Sage Clone. Built for study and exploration.
        </div>
      </footer>
    </main>
  )
}
