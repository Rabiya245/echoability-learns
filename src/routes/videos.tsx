import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Card, FinishCard, PageTitle, SpeakButton } from "@/components/kit";
import { VIDEOS, VIDEO_CATEGORIES } from "@/lib/learningData";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "Watch — EchoAbility" },
      { name: "description", content: "Short read-aloud story lessons about letters, numbers, social moments, calming down and life skills." },
      { property: "og:title", content: "Watch — EchoAbility" },
      { property: "og:description", content: "Calm, narrated mini-lessons you can listen to line by line." },
    ],
  }),
  component: VideosPage,
});

function VideosPage() {
  const [cat, setCat] = useState<(typeof VIDEO_CATEGORIES)[number] | "All">("All");
  const [openId, setOpenId] = useState<string | null>(null);
  const list = VIDEOS.filter((v) => cat === "All" || v.category === cat);
  const open = VIDEOS.find((v) => v.id === openId);

  if (open) {
    return (
      <AppShell>
        <button
          type="button"
          onClick={() => setOpenId(null)}
          className="tap mb-2 rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-secondary-foreground"
        >
          ← All videos
        </button>
        <PageTitle emoji={open.emoji} title={open.title} subtitle={`${open.category} · ${open.minutes} min`} />
        <SpeakButton text={open.script.join(". ")} label="Play the whole story" />
        <div className="mt-4 space-y-2">
          {open.script.map((line) => (
            <Card key={line} className="flex items-center gap-3">
              <p className="flex-1 text-lg font-semibold">{line}</p>
              <SpeakButton text={line} label="" />
            </Card>
          ))}
        </div>
        <FinishCard id={`video-${open.id}`} label="I watched this" coins={5} />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <PageTitle emoji="🎬" title="Watch" subtitle="Short calm story lessons" />
      <div className="flex flex-wrap gap-2">
        {(["All", ...VIDEO_CATEGORIES] as const).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={`tap rounded-full border-2 px-3 py-1 text-sm font-bold ${c === cat ? "border-primary bg-secondary" : "border-border"}`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-3">
        {list.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setOpenId(v.id)}
            className="card-soft tap flex items-center gap-3 p-4 text-left"
          >
            <span className="text-4xl">{v.emoji}</span>
            <span className="flex-1">
              <span className="block text-lg font-bold">{v.title}</span>
              <span className="block text-sm text-muted-foreground">
                {v.category} · {v.minutes} min
              </span>
            </span>
            <span className="text-2xl">▶️</span>
          </button>
        ))}
      </div>
    </AppShell>
  );
}
