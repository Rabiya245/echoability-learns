import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Card, Choices, FinishCard, PageTitle, SpeakButton } from "@/components/kit";
import { SOCIAL_TOPICS } from "@/lib/learningData";

export const Route = createFileRoute("/social")({
  head: () => ({
    meta: [
      { title: "Social Skills — EchoAbility" },
      { name: "description", content: "Step-by-step social stories: saying hello, taking turns, sharing and asking for help." },
      { property: "og:title", content: "Social Skills — EchoAbility" },
      { property: "og:description", content: "Gentle social stories with pictures, steps and practice questions." },
    ],
  }),
  component: SocialPage,
});

function SocialPage() {
  const [id, setId] = useState<string | null>(null);
  const topic = SOCIAL_TOPICS.find((t) => t.id === id);

  if (!topic) {
    return (
      <AppShell>
        <PageTitle emoji="🤝" title="Social Skills" subtitle="One small step at a time" back={{ to: "/activities" }} />
        <div className="grid gap-3">
          {SOCIAL_TOPICS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setId(t.id)}
              className="card-soft tap flex items-center gap-3 p-4 text-left"
            >
              <span className="text-4xl">{t.emoji}</span>
              <span className="flex-1">
                <span className="block text-lg font-bold">{t.title}</span>
                <span className="block text-sm text-muted-foreground">{t.why}</span>
              </span>
            </button>
          ))}
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <button
        type="button"
        onClick={() => setId(null)}
        className="tap mb-2 rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-secondary-foreground"
      >
        ← All topics
      </button>
      <PageTitle emoji={topic.emoji} title={topic.title} subtitle={topic.why} />
      <SpeakButton text={`${topic.title}. ${topic.why}`} />

      <div className="mt-4 space-y-2">
        {topic.steps.map((s, i) => (
          <Card key={s.text} className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              {i + 1}
            </span>
            <span className="text-2xl">{s.emoji}</span>
            <span className="flex-1 font-semibold">{s.text}</span>
          </Card>
        ))}
      </div>

      <h2 className="mt-6 text-lg font-bold">Let's practise</h2>
      <div className="mt-2 space-y-4">
        {topic.quiz.map((q) => (
          <Card key={q.question}>
            <p className="mb-2 font-bold">{q.question}</p>
            <Choices options={q.options} answer={q.answer} feedback={q.feedback} onCorrect={() => {}} />
          </Card>
        ))}
      </div>

      <FinishCard id={`social-${topic.id}`} label="I practised this" coins={8} />
    </AppShell>
  );
}
