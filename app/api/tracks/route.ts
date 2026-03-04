import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const tag = req.nextUrl.searchParams.get("tag") || "pop";
  
  try {
    const res = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${tag}&api_key=${process.env.LASTFM_API_KEY}&format=json&limit=50`
    );
    const data = await res.json();
    const tracks = data.tracks?.track?.map((t: any, i: number) => ({
      id: i + 1,
      title: t.name,
      artist: t.artist.name,
      genre: tag,
      year: 2020,
    })) ?? [];

    // Mélange aléatoire
    const shuffled = tracks.sort(() => Math.random() - 0.5).slice(0, 10);
    return NextResponse.json({ tracks: shuffled });
  } catch {
    return NextResponse.json({ tracks: [] });
  }
}