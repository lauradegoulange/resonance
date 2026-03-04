import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q");
  if (!q) return NextResponse.json({ url: null });

  try {
    const res = await fetch(`https://itunes.apple.com/search?term=${q}&media=music&limit=1`);
    const data = await res.json();
    const artwork = data.results?.[0]?.artworkUrl100?.replace("100x100bb", "400x400bb") ?? null;
    return NextResponse.json({ url: artwork });
  } catch {
    return NextResponse.json({ url: null });
  }
}