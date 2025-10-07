import type { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get("q") || ""
  if (!q) {
    return new Response(JSON.stringify({ images: [] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    })
  }

  const key = process.env.PEXELS_API_KEY
  if (!key) {
    return new Response(
      JSON.stringify({ error: "Missing PEXELS_API_KEY. Add it in Project Settings -> Environment Variables." }),
      { status: 500, headers: { "content-type": "application/json" } },
    )
  }

  try {
    const r = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(q)}&per_page=6`, {
      headers: { Authorization: key },
      // cache images daily to reduce calls
      next: { revalidate: 60 * 60 * 24 },
    })
    if (!r.ok) {
      return new Response(JSON.stringify({ images: [] }), {
        status: 200,
        headers: { "content-type": "application/json" },
      })
    }
    const json = (await r.json()) as {
      photos?: Array<{ id: number; alt: string; src: { medium: string }; url?: string; photographer?: string }>
    }
    const images =
      json.photos?.map((p) => ({
        id: p.id,
        alt: p.alt,
        src: p.src.medium,
        link: p.url,
        photographer: p.photographer,
      })) ?? []
    return new Response(JSON.stringify({ images }), {
      status: 200,
      headers: { "content-type": "application/json" },
    })
  } catch {
    return new Response(JSON.stringify({ images: [] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    })
  }
}
