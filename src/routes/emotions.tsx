import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Card, Choices, FinishCard, PageTitle, SpeakButton } from "@/components/kit";
import { COPING_TOOLS, EMOTION_FACES, EMOTION_SCENARIOS, ZONES } from "@/lib/learningData";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/emotions")({
  head: () => ({
    meta: [
      { title: "Emotions & Zones — EchoAbility" },
      { name: "description", content: "Name feelings, check in with the four colour zones and pick a calming tool that helps." },
      { property: "og:title", content: "Emotions & Zones — EchoAbility" },
      { property: "og:description", content: "Feelings faces, zone check-ins and coping tools for children." },
    ],
  }),
  component: EmotionsPage;
});

function EmotionsPage() {
  const { addCheckIn, progress } = useStore();
  const [i, setI] = useState(0);
  const scene = EMOTION_SCENARIOS[i % EMOTION_SCENARIOS.length]!;
  const zoneOptions = ZONES.map((z) => ({ emoji: z.emoji, text: z.name }));
  const answer = ZONES.findIndex((z) => z.id === scene.zone);

  return (
    <AppShell>
      <PageTitle emoji="💚" title="Emotions & Zones" subtitle="Name it, then settle it" back={{ to: "/activities" }} />

      <h2 className="text-lg font-bold">How am I feeling right now?</h2>
      <div className="mt-2 grid grid-cols-4 gap-2">
        {EMOTION_FACES.map((f) => (
          <button
            key={f.name}
            type="button"
            onClick={() => addCheckIn(f.zone, f.emoji)}
            className="tap rounded-2xl border-2 border-border p-2 text-center"
          >
            <span className="block text-3xl">{f.emoji}</span>
            <span className="text-xs font-semibold">{f.name}</span>
          </button>
        ))}
      </div>
      {progress.checkIns[0] && (
        <p className="mt-2 text-sm text-muted-foreground">
          Last check-in: {progress.checkIns[0].emoji} ({progress.checkIns[0].zone})
        </p>
      )}

      <h2 className="mt-6 text-lg font-bold">The four zones</h2>
      <div className="mt-2 grid gap-2">
        {ZONES.map((z) => (
          <Card key={z.id}>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{z.emoji}</span>
              <p className="flex-1 text-lg font-bold">{z.name}</p>
              <SpeakButton text={`${z.name}. ${z.feelings}. ${z.help}`} label="" />
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{z.feelings}</p>
            <p className="text-sm">{z.help}</p>
          </Card>
        ))}
      </div>

      <h2 className="mt-6 text-lg font-bold">Which zone is this?</h2>
      <Card className="mt-2">
        <p className="text-lg font-semibold">
          {scene.emoji} {scene.text}
        </p>
        <div className="mt-3">
          <Choices
            key={scene.text}
            options={zoneOptions}
            answer={answer}
            feedback="Good noticing. Now pick a tool that helps."
            onCorrect={() => setTimeout(() => setI((v) => v + 1), 1400)}
          />
        </div>
      </Card>

      <h2 className="mt-6 text-lg font-bold">My calming tools</h2>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {COPING_TOOLS.map((t) => (
          <Card key={t.id}>
            <p className="text-2xl">{t.emoji}</p>
            <p className="font-bold">{t.title}</p>
            <p className="text-sm text-muted-foreground">{t.desc}</p>
          </Card>
        ))}
      </div>

      <FinishCard id="emotions-session" label="I did my feelings check" coins={6} />
    </AppShell>
  );
}
