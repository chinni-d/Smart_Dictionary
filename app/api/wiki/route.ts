import type { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = (searchParams.get("q") || "").trim()
  if (!q) {
    return new Response(JSON.stringify({}), { status: 200, headers: { "content-type": "application/json" } })
  }
  const title = encodeURIComponent(q)
  try {
    const r = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`, {
      // cache daily
      next: { revalidate: 60 * 60 * 24 },
      headers: { accept: "application/json" },
    })
    if (!r.ok) {
      return new Response(JSON.stringify({}), { status: 200, headers: { "content-type": "application/json" } })
    }
    const j = (await r.json()) as { title?: string; extract?: string; content_urls?: { desktop?: { page?: string } } }
    return new Response(
      JSON.stringify({
        title: j.title,
        extract: j.extract,
        url: j.content_urls?.desktop?.page,
      }),
      { status: 200, headers: { "content-type": "application/json" } },
    )
  } catch {
    return new Response(JSON.stringify({}), { status: 200, headers: { "content-type": "application/json" } })
  }
}
