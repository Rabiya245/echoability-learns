import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Card, PageTitle, SpeakButton } from "@/components/kit";
import { COPING_TOOLS } from "@/lib/learningData";
import { playSoundscape, stopSoundscape, type SoundscapeId } from "@/lib/sound";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/calm")({
  head: () => ({
    meta: [
      { title: "Calm Corner — EchoAbility" },
      { name: "description", content: "A quiet space with breathing, gentle soundscapes and calming tools for when things feel too much." },
      { property: "og:title", content: "Calm Corner — EchoAbility" },
      { property: "og:description", content: "Breathing circle, soundscapes and coping tools in one quiet place." },
    ],
  }),
  component: CalmPage,
});

const SOUNDS: { id: SoundscapeId; label: string; emoji: string }[] = [
  { id: "rain", label: "Rain", emoji: "🌧️" },
  { id: "ocean", label: "Ocean", emoji: "🌊" },
  { id: "woods", label: "Woods", emoji: "🌲" },
  { id: "campfire", label: "Campfire", emoji: "🔥" },
  { id: "whitenoise", label: "Soft hum", emoji: "🌫️" },
];

function Breathing() {
  const { settings } = useStore();
  const [phase, setPhase] = useState("Breathe in");
  const [running, setRunning] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) return;
    const order = ["Breathe in", "Hold", "Breathe out", "Hold"];
    let i = 0;
    setPhase(order[0]!);
    timer.current = setInterval(() => {
      i = (i + 1) % order.length;
      setPhase(order[i]!);
    }, 4000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [running]);

  return (
    <Card className="text-center">
      <p className="text-lg font-bold">Square breathing</p>
      <div
        className="mx-auto mt-4 flex h-40 w-40 items-center justify-center rounded-full bg-calm/40 text-lg font-bold text-foreground"
        style={
          running && !settings.reduceMotion
            ? { animation: "breathe 16s ease-in-out infinite" }
            : undefined
        }
      >
        {running ? phase : "Ready"}
      </div>
      <button
        type="button"
        onClick={() => setRunning((r) => !r)}
        className="tap mt-4 w-full rounded-2xl bg-primary py-3 font-bold text-primary-foreground"
      >
        {running ? "Stop" : "Start breathing"}
      </button>
    </Card>
  );
}

function CalmPage() {
  const { unlock } = useStore();
  const [active, setActive] = useState<SoundscapeId | null>(null);

  useEffect(() => {
    unlock("calm-friend");
    return () => stopSoundscape();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = (id: SoundscapeId) => {
    if (active === id) {
      stopSoundscape();
      setActive(null);
    } else if (playSoundscape(id)) {
      setActive(id);
    }
  };

  return (
    <AppShell>
      <PageTitle emoji="🫧" title="Calm Corner" subtitle="You can stay here as long as you need" />
      <SpeakButton text="You are safe. Let's breathe slowly together." />

      <div className="mt-4">
        <Breathing />
      </div>

      <h2 className="mt-6 text-lg font-bold">Gentle sounds</h2>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {SOUNDS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => toggle(s.id)}
            className={`tap rounded-2xl border-2 p-3 text-center ${active === s.id ? "border-primary bg-secondary" : "border-border"}`}
          >
            <span className="block text-3xl">{s.emoji}</span>
            <span className="text-xs font-semibold">{s.label}</span>
          </button>
        ))}
      </div>

      <h2 className="mt-6 text-lg font-bold">Things that help</h2>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {COPING_TOOLS.map((t) => (
          <Card key={t.id}>
            <p className="text-2xl">{t.emoji}</p>
            <p className="font-bold">{t.title}</p>
            <p className="text-sm text-muted-foreground">{t.desc}</p>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
