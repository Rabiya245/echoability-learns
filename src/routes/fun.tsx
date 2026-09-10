import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Card, Choices, FinishCard, PageTitle, SpeakButton } from "@/components/kit";
import { ANIMALS, COLORS, DAYS, EMOTION_FACES, FRUITS, MONTHS, SHAPES, SPECIAL_ACTIVITIES } from "@/lib/learningData";

export const Route = createFileRoute("/fun")({
  head: () => ({
    meta: [
      { title: "Fun Activities — EchoAbility" },
      { name: "description", content: "Colors, shapes, feelings faces, animals, fruits, memory pairs, days and months." },
      { property: "og:title", content: "Fun Activities — EchoAbility" },
      { property: "og:description", content: "Playful matching games and picture words for ages 4 to 12." },
    ],
  }),
  component: FunPage,
});

function MatchGame({ items, prompt }: { items: { name: string; emoji: string }[]; prompt: string }) {
  const [i, setI] = useState(0);
  const target = items[i % items.length]!;
  const others = items.filter((x) => x.name !== target.name).slice(0, 2);
  return (
    <Card>
      <p className="text-lg font-bold">
        {prompt} <span className="text-3xl">{target.emoji}</span>
      </p>
      <div className="mt-3">
        <Choices
          key={target.name}
          options={[{ text: target.name }, ...others.map((o) => ({ text: o.name }))]}
          answer={0}
          feedback={`Yes, that is ${target.name}.`}
          onCorrect={() => setTimeout(() => setI((v) => v + 1), 1200)}
        />
      </div>
    </Card>
  );
}

function Memory() {
  const deck = useMemo(() => {
    const picks = FRUITS.slice(0, 6).map((f) => f.emoji);
    return [...picks, ...picks].map((e, i) => ({ e, i })).sort(() => Math.random() - 0.5);
  }, []);
  const [open, setOpen] = useState<number[]>([]);
  const [found, setFound] = useState<string[]>([]);

  const flip = (idx: number) => {
    if (open.includes(idx) || open.length === 2) return;
    const next = [...open, idx];
    setOpen(next);
    if (next.length === 2) {
      const [a, b] = next as [number, number];
      if (deck[a]!.e === deck[b]!.e) {
        setFound((f) => [...f, deck[a]!.e]);
        setOpen([]);
      } else {
        setTimeout(() => setOpen([]), 800);
      }
    }
  };

  return (
    <Card>
      <p className="text-lg font-bold">Find the matching pairs</p>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {deck.map((c, idx) => {
          const shown = open.includes(idx) || found.includes(c.e);
          return (
            <button
              key={idx}
              type="button"
              onClick={() => flip(idx)}
              className="tap flex h-16 items-center justify-center rounded-2xl border-2 border-border bg-secondary text-3xl"
            >
              {shown ? c.e : "❓"}
            </button>
          );
        })}
      </div>
      {found.length === 6 && <p className="mt-3 font-bold text-success">All pairs found! 🎉</p>}
    </Card>
  );
}

function Ordered({ items }: { items: { name: string; emoji: string }[] }) {
  return (
    <Card>
      <div className="grid gap-2">
        {items.map((d) => (
          <div key={d.name} className="flex items-center gap-3 rounded-2xl bg-secondary/50 p-2">
            <span className="text-2xl">{d.emoji}</span>
            <span className="flex-1 font-semibold">{d.name}</span>
            <SpeakButton text={d.name} label="" />
          </div>
        ))}
      </div>
    </Card>
  );
}

function FunPage() {
  const [tab, setTab] = useState(SPECIAL_ACTIVITIES[0]!.id);

  return (
    <AppShell>
      <PageTitle emoji="🎨" title="Fun Activities" subtitle="Play and learn together" back={{ to: "/activities" }} />
      <div className="grid grid-cols-2 gap-2">
        {SPECIAL_ACTIVITIES.map((a) => (
          <button
            key={a.id}
            type="button"
            onClick={() => setTab(a.id)}
            className={`tap rounded-2xl border-2 p-3 text-left text-sm font-bold ${a.id === tab ? "border-primary bg-secondary" : "border-border"}`}
          >
            <span className="block text-2xl">{a.emoji}</span>
            {a.title}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {tab === "colors" && <MatchGame items={COLORS} prompt="Which color is this?" />}
        {tab === "shapes" && <MatchGame items={SHAPES} prompt="Which shape is this?" />}
        {tab === "emotions" && <MatchGame items={EMOTION_FACES} prompt="How does this face feel?" />}
        {tab === "animals" && <MatchGame items={ANIMALS} prompt="Which animal is this?" />}
        {tab === "fruits" && <MatchGame items={FRUITS} prompt="Which fruit is this?" />}
        {tab === "memory" && <Memory />}
        {tab === "days" && <Ordered items={DAYS} />}
        {tab === "months" && <Ordered items={MONTHS} />}
      </div>

      <FinishCard id={`fun-${tab}`} label="I finished this" coins={6} />
    </AppShell>
  );
}
