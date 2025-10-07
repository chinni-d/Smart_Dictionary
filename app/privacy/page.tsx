export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Privacy Policy</h1>
      <p className="text-muted-foreground mt-2">
        Your privacy matters. This app uses a third-party dictionary API for definitions and does not store personal
        data.
      </p>
      <div className="prose prose-sm mt-6 dark:prose-invert">
        <h2>Data</h2>
        <p>
          Search queries are sent directly to the dictionary API to retrieve results. No user accounts are required and
          no personally identifiable information is collected by this app.
        </p>
        <h2>Audio</h2>
        <p>Pronunciation audio is streamed from provider URLs. We do not host or record audio from your device.</p>
        <h2>Voice Search</h2>
        <p>
          If you use voice search, recognition occurs on your device via your browser&apos;s Web Speech API when
          available. We do not transmit your microphone audio to our servers.
        </p>
      </div>
    </main>
  )
}
