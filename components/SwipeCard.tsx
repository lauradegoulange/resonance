"use client";
import { useState, useRef, useEffect } from "react";

type Track = {
  id: number;
  title: string;
  artist: string;
  genre: string;
  year: number;
};

const database = [
  { title: "Save Your Tears", artist: "The Weeknd", genre: "Synth-pop", reason: "Même vibe synthétique et mélancolique" },
  { title: "Around The World", artist: "Daft Punk", genre: "French House", reason: "House hypnotique et répétitive" },
  { title: "Teardrop", artist: "Massive Attack", genre: "Trip-hop", reason: "Atmosphère sombre et envoûtante" },
  { title: "Glory Box", artist: "Portishead", genre: "Trip-hop", reason: "Trip-hop émotionnel et puissant" },
  { title: "Nights", artist: "Frank Ocean", genre: "R&B", reason: "R&B introspectif et unique" },
  { title: "Redbone", artist: "Childish Gambino", genre: "Funk Soul", reason: "Funk Soul groovy et hypnotique" },
  { title: "Electric Feel", artist: "MGMT", genre: "Psychedelic Pop", reason: "Pop psychédélique addictive" },
  { title: "The Less I Know The Better", artist: "Tame Impala", genre: "Psychedelic Rock", reason: "Rock psychédélique moderne" },
  { title: "Alright", artist: "Kendrick Lamar", genre: "Hip-hop", reason: "Hip-hop puissant et engagé" },
  { title: "Do I Wanna Know?", artist: "Arctic Monkeys", genre: "Indie Rock", reason: "Indie rock sombre et accrocheur" },
  { title: "Motion Sickness", artist: "Phoebe Bridgers", genre: "Indie Folk", reason: "Indie folk doux et mélancolique" },
  { title: "Retrograde", artist: "James Blake", genre: "Electronic Soul", reason: "Soul électronique minimaliste" },
  { title: "Strings of Life", artist: "Derrick May", genre: "Detroit Techno", reason: "Techno émotionnelle et fondatrice" },
  { title: "Inner City Life", artist: "Goldie", genre: "Drum & Bass", reason: "D&B atmosphérique et unique" },
  { title: "Feeling Good", artist: "Nina Simone", genre: "Jazz Soul", reason: "Une voix et une puissance inégalées" },
  { title: "So What", artist: "Miles Davis", genre: "Jazz", reason: "Jazz modal intemporel" },
  { title: "Water No Get Enemy", artist: "Fela Kuti", genre: "Afrobeat", reason: "Afrobeat groovy et politique" },
  { title: "Gymnopédie No.1", artist: "Erik Satie", genre: "Classique", reason: "Douceur et mélancolie intemporelles" },
  { title: "Re: Stacks", artist: "Bon Iver", genre: "Indie Folk", reason: "Folk intimiste et bouleversant" },
  { title: "Windowlicker", artist: "Aphex Twin", genre: "IDM", reason: "Électronique expérimentale unique" },
];

function TrackCard({ track, style, isTop, dragX, dragging, onMouseDown, onMouseMove, onMouseUp }: {
  track: Track;
  style?: React.CSSProperties;
  isTop: boolean;
  dragX: number;
  dragging: boolean;
  onMouseDown?: (e: React.MouseEvent) => void;
  onMouseMove?: (e: React.MouseEvent) => void;
  onMouseUp?: () => void;
}) {
  const [artwork, setArtwork] = useState<string | null>(null);

  useEffect(() => {
    const query = encodeURIComponent(`${track.title} ${track.artist}`);
    fetch(`/api/artwork?q=${query}`)
      .then(r => r.json())
      .then(data => { if (data.url) setArtwork(data.url); })
      .catch(() => {});
  }, [track.title, track.artist]);

  const likeOpacity = isTop ? Math.max(0, Math.min(1, (dragX - 30) / 60)) : 0;
  const passOpacity = isTop ? Math.max(0, Math.min(1, (-dragX - 30) / 60)) : 0;

  return (
    <div
      onMouseDown={isTop ? onMouseDown : undefined}
      onMouseMove={isTop ? onMouseMove : undefined}
      onMouseUp={isTop ? onMouseUp : undefined}
      onMouseLeave={isTop ? onMouseUp : undefined}
      style={{
        position: "absolute",
        width: "300px",
        height: "420px",
        borderRadius: "24px",
        overflow: "hidden",
        boxShadow: isTop ? "0 20px 60px rgba(0,0,0,0.2)" : "0 4px 20px rgba(0,0,0,0.08)",
        cursor: isTop ? (dragging ? "grabbing" : "grab") : "default",
        background: "#e8e8e8",
        ...style,
      }}
    >
      {artwork ? (
        <img src={artwork} alt={track.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      ) : (
        <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #ede9fe, #dbeafe)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: "40px", opacity: 0.25 }}>♪</div>
        </div>
      )}

      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.8) 100%)" }} />

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "22px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "3px", color: "rgba(255,255,255,0.55)", textTransform: "uppercase", marginBottom: "5px", fontFamily: "monospace" }}>
          {track.genre} · {track.year}
        </div>
        <div style={{ fontSize: "22px", fontWeight: "700", color: "#fff", letterSpacing: "-0.5px", lineHeight: 1.2, marginBottom: "4px" }}>
          {track.title}
        </div>
        <div style={{ fontSize: "15px", color: "rgba(255,255,255,0.65)" }}>{track.artist}</div>
        <div style={{ marginTop: "12px", display: "inline-flex", alignItems: "center", gap: "7px", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "50px", padding: "6px 14px", fontSize: "11px", color: "rgba(255,255,255,0.8)", letterSpacing: "1px", fontFamily: "monospace" }}>
          ▶ preview
        </div>
      </div>

      {isTop && <>
        <div style={{ position: "absolute", top: 22, right: 18, border: "2.5px solid #4ade80", color: "#4ade80", padding: "5px 12px", borderRadius: "8px", fontSize: "13px", fontWeight: "700", letterSpacing: "2px", opacity: likeOpacity, transform: "rotate(12deg)", fontFamily: "monospace" }}>LIKE</div>
        <div style={{ position: "absolute", top: 22, left: 18, border: "2.5px solid #f87171", color: "#f87171", padding: "5px 12px", borderRadius: "8px", fontSize: "13px", fontWeight: "700", letterSpacing: "2px", opacity: passOpacity, transform: "rotate(-12deg)", fontFamily: "monospace" }}>NOPE</div>
      </>}
    </div>
  );
}

export default function SwipeCard() {
  const [cards, setCards] = useState<Track[]>([]);
  const [loadingTracks, setLoadingTracks] = useState(true);
  const [liked, setLiked] = useState<Track[]>([]);
  const [passed, setPassed] = useState<Track[]>([]);
  const [round, setRound] = useState(1);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [phase, setPhase] = useState<"swipe" | "results">("swipe");
  const [animating, setAnimating] = useState<"like" | "pass" | null>(null);
  const [recommendations, setRecommendations] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const dragStart = useRef<number | null>(null);

  const current = cards[cards.length - 1];

  const loadTracks = () => {
    setLoadingTracks(true);
    fetch(`/api/tracks`)
      .then(r => r.json())
      .then(data => {
        setCards([...data.tracks].reverse());
        setLoadingTracks(false);
      })
      .catch(() => setLoadingTracks(false));
  };

  useEffect(() => { loadTracks(); }, []);

  const fetchRecommendations = (likedTracks: Track[], passedTracks: Track[]) => {
    setLoading(true);
    const likedGenres = likedTracks.map(t => t.genre);
    const likedArtists = likedTracks.map(t => t.artist);
    const likedTitles = likedTracks.map(t => t.title);

    const scored = database
      .filter(r => !likedTitles.includes(r.title))
      .map(r => ({
        ...r,
        score: (likedGenres.includes(r.genre) ? 2 : 0) + (likedArtists.includes(r.artist) ? 3 : 0),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    const genres = [...new Set(likedGenres)].join(", ") || "varié";
    const playlistName = likedTracks.length === 0 ? "Explore Everything" : `${likedTracks[0].title} & more`;

    setTimeout(() => {
      setRecommendations({
        analysis: `Tu sembles apprécier la musique ${genres}. Voici une sélection qui devrait te correspondre !`,
        recommendations: scored,
        playlistName,
      });
      setLoading(false);
    }, 1200);
  };

  const handleAction = (action: "like" | "pass") => {
    if (animating || cards.length === 0) return;
    setAnimating(action);
    setTimeout(() => {
      const top = cards[cards.length - 1];
      const newLiked = action === "like" ? [...liked, top] : liked;
      const newPassed = action === "pass" ? [...passed, top] : passed;
      if (action === "like") setLiked(newLiked);
      else setPassed(newPassed);
      const newCards = cards.slice(0, -1);
      setCards(newCards);
      setDragX(0);
      setAnimating(null);
      if (newCards.length === 0) {
        if (newLiked.length === 0 && round < 3) {
          setRound(r => r + 1);
          setPassed(newPassed);
          loadTracks();
        } else {
          setPhase("results");
          fetchRecommendations(newLiked, newPassed);
        }
      }
    }, 320);
  };

  const onMouseDown = (e: React.MouseEvent) => { dragStart.current = e.clientX; setDragging(true); };
  const onMouseMove = (e: React.MouseEvent) => { if (!dragging) return; setDragX(e.clientX - (dragStart.current ?? e.clientX)); };
  const onMouseUp = () => {
    if (!dragging) return;
    setDragging(false);
    if (dragX > 80) handleAction("like");
    else if (dragX < -80) handleAction("pass");
    else setDragX(0);
    dragStart.current = null;
  };

  const rotation = dragging ? dragX * 0.06 : animating === "like" ? 15 : animating === "pass" ? -15 : 0;
  const translateX = animating === "like" ? 500 : animating === "pass" ? -500 : dragging ? dragX : 0;
  const progressPct = cards.length > 0 ? ((10 - cards.length) / 10) * 100 : 100;

  if (loadingTracks) return (
    <div style={{ minHeight: "100vh", background: "#f7f6f3", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif" }}>
      <style>{`@keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-8px)}}`}</style>
      <div style={{ fontSize: "34px", fontWeight: "700", letterSpacing: "-1.5px", marginBottom: "8px" }}>Resonance</div>
      <div style={{ fontSize: "11px", letterSpacing: "4px", color: "#bbb", fontFamily: "monospace", marginBottom: "24px" }}>find your frequency</div>
      <div style={{ display: "flex", gap: "6px" }}>
        {[0,1,2].map(i => <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#a78bfa", animation: "bounce 1.2s infinite", animationDelay: `${i*0.2}s` }} />)}
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f7f6f3", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif", color: "#1a1a1a", padding: "24px 16px", userSelect: "none" }}>
      <style>{`@keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-8px)}}`}</style>

      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <div style={{ fontSize: "11px", letterSpacing: "5px", color: "#bbb", textTransform: "uppercase", marginBottom: "6px", fontFamily: "monospace" }}>find your frequency</div>
        <div style={{ fontSize: "34px", fontWeight: "700", letterSpacing: "-1.5px" }}>Resonance</div>
        {round > 1 && (
          <div style={{ fontSize: "11px", color: "#a78bfa", letterSpacing: "3px", fontFamily: "monospace", marginTop: "6px" }}>
            round {round} / 3
          </div>
        )}
      </div>

      {phase === "swipe" && <>
        <div style={{ width: "300px", height: "2px", background: "#e5e5e5", borderRadius: "99px", marginBottom: "28px", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progressPct}%`, background: "#a78bfa", borderRadius: "99px", transition: "width 0.4s ease" }} />
        </div>

        <div style={{ position: "relative", width: "320px", height: "440px", marginBottom: "28px" }}>
          {cards.slice(0, -1).slice(-2).map((card, i, arr) => (
            <TrackCard key={card.id} track={card} isTop={false} dragX={0} dragging={false}
              style={{ top: (arr.length - 1 - i) * 8, left: (arr.length - 1 - i) * 4, transform: `scale(${0.92 + i * 0.04})`, opacity: 0.5 + i * 0.25, transition: "all 0.3s ease" }}
            />
          ))}
          {current && (
            <TrackCard key={current.id} track={current} isTop={true} dragX={dragX} dragging={dragging}
              onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}
              style={{ transform: `translateX(${translateX}px) rotate(${rotation}deg)`, transition: animating ? "transform 0.32s cubic-bezier(0.4,0,0.2,1)" : dragging ? "none" : "transform 0.18s ease", zIndex: 10 }}
            />
          )}
        </div>

        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <button onClick={() => handleAction("pass")} style={{ width: "58px", height: "58px", borderRadius: "50%", background: "#fff", border: "1.5px solid #fecdd3", color: "#f87171", fontSize: "20px", cursor: "pointer", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", transition: "transform 0.15s" }} onMouseOver={e => (e.currentTarget.style.transform = "scale(1.1)")} onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}>✕</button>
          <div style={{ fontSize: "11px", color: "#ccc", letterSpacing: "3px", fontFamily: "monospace" }}>{cards.length} left</div>
          <button onClick={() => handleAction("like")} style={{ width: "58px", height: "58px", borderRadius: "50%", background: "#fff", border: "1.5px solid #bbf7d0", color: "#4ade80", fontSize: "20px", cursor: "pointer", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", transition: "transform 0.15s" }} onMouseOver={e => (e.currentTarget.style.transform = "scale(1.1)")} onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}>♥</button>
        </div>
        <div style={{ fontSize: "11px", color: "#ccc", letterSpacing: "2px", marginTop: "14px", fontFamily: "monospace" }}>swipe or click</div>
      </>}

      {phase === "results" && (
        <div style={{ maxWidth: "380px", width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: "36px", marginBottom: "12px" }}>🎧</div>
          {loading ? (
            <div>
              <div style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}>Analyse en cours…</div>
              <div style={{ fontSize: "12px", color: "#bbb", fontFamily: "monospace", letterSpacing: "2px", marginBottom: "24px" }}>Resonance écoute vos goûts</div>
              <div style={{ display: "flex", justifyContent: "center", gap: "6px" }}>
                {[0,1,2].map(i => <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#a78bfa", animation: "bounce 1.2s infinite", animationDelay: `${i*0.2}s` }} />)}
              </div>
            </div>
          ) : recommendations && <>
            <div style={{ background: "#f5f0ff", borderRadius: "16px", padding: "18px 22px", marginBottom: "24px", fontSize: "14px", color: "#555", lineHeight: 1.7, border: "1px solid #ede9fe", textAlign: "left" }}>
              {liked.length === 0
                ? "Tu n'as rien liké cette fois ! On te propose quand même quelques découvertes 🎵"
                : recommendations.analysis}
            </div>
            <div style={{ fontSize: "11px", letterSpacing: "4px", color: "#a78bfa", fontFamily: "monospace", marginBottom: "6px" }}>VOTRE PLAYLIST</div>
            <div style={{ fontSize: "20px", fontWeight: "700", marginBottom: "20px", letterSpacing: "-0.5px" }}>{recommendations.playlistName}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px", textAlign: "left" }}>
              {recommendations.recommendations?.map((r: any, i: number) => (
                <div key={i} onClick={() => window.open(`https://open.spotify.com/search/${encodeURIComponent(r.title + " " + r.artist)}`, "_blank")}
                  style={{ background: "#fff", border: "1px solid #f0f0ee", borderRadius: "14px", padding: "14px 18px", display: "flex", gap: "14px", alignItems: "flex-start", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", cursor: "pointer" }}>
                  <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "#f5f0ff", color: "#a78bfa", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700", flexShrink: 0, fontFamily: "monospace" }}>{i+1}</div>
                  <div>
                    <div style={{ fontWeight: "600", fontSize: "14px" }}>{r.title}</div>
                    <div style={{ color: "#888", fontSize: "12px", marginBottom: "4px" }}>{r.artist}</div>
                    <div style={{ color: "#aaa", fontSize: "12px", lineHeight: 1.5 }}>{r.reason}</div>
                  </div>
                </div>
              ))}
            </div>
            {liked.length > 0 ? (
              <div onClick={() => window.open(`https://open.spotify.com/search/${encodeURIComponent(recommendations.playlistName)}`, "_blank")}
                style={{ background: "#1DB954", color: "#fff", borderRadius: "50px", padding: "14px 28px", fontWeight: "700", fontSize: "14px", letterSpacing: "1px", cursor: "pointer", marginBottom: "12px", fontFamily: "monospace" }}>
                ▶ Ouvrir dans Spotify
              </div>
            ) : (
              <div style={{ background: "#ddd", color: "#fff", borderRadius: "50px", padding: "14px 28px", fontWeight: "700", fontSize: "14px", marginBottom: "12px", fontFamily: "monospace" }}>
                Like des titres pour une playlist
              </div>
            )}
            <button onClick={() => { loadTracks(); setLiked([]); setPassed([]); setRound(1); setPhase("swipe"); setRecommendations(null); setDragX(0); }}
              style={{ background: "transparent", border: "1px solid #e5e5e5", color: "#aaa", borderRadius: "50px", padding: "10px 24px", cursor: "pointer", fontSize: "12px", letterSpacing: "2px", fontFamily: "monospace" }}>
              recommencer
            </button>
          </>}
        </div>
      )}
    </div>
  );
}