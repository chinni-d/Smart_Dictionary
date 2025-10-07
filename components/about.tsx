export function About() {
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="text-2xl font-semibold">About Word Study</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          We believe learning new words should be calm and focused—supporting deep understanding without distractions.
          From the gentle palette to smooth interactions, everything is crafted to help your curiosity thrive.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border p-4 bg-secondary transition hover:ring-1 hover:ring-primary">
          <h3 className="font-medium">Focused Learning</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Designed for students and language lovers who value distraction-free study sessions.
          </p>
        </div>
        <div className="rounded-lg border p-4 bg-secondary transition hover:ring-1 hover:ring-primary">
          <h3 className="font-medium">Calm Experience</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Peaceful interactions reduce cognitive load and help maximize retention.
          </p>
        </div>
        <div className="rounded-lg border p-4 bg-secondary transition hover:ring-1 hover:ring-primary">
          <h3 className="font-medium">For Everyone</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Whether student, professional, or lifelong learner—tools adapt to your style.
          </p>
        </div>
        <div className="rounded-lg border p-4 bg-secondary transition hover:ring-1 hover:ring-primary">
          <h3 className="font-medium">Instant Access</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Lightning-fast search with comprehensive, useful results for true understanding.
          </p>
        </div>
      </div>
    </div>
  )
}
