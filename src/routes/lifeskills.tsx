import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Card, FinishCard, PageTitle, SpeakButton } from "@/components/kit";
import { LIFE_SKILLS } from "@/lib/learningData";

export const Route = createFileRoute("/lifeskills")({
  head: () => ({
    meta: [
      { title: "Life Skills — EchoAbility" },
      { name: "description", content: "Everyday skills broken into small picture steps: washing hands, brushing teeth, dressing and more." },
      { property: "og:title", content: "Life Skills — EchoAbility" },
      { property: "og:description", content: "Small, calm steps for everyday independence." },
    ],
  }),
  component: LifeSkillsPage,
});

function LifeSkillsPage() {
  const [id, setId] = useState(LIFE_SKILLS[0]!.id);
  const skill = LIFE_SKILLS.find((s) => s.id === id)!;
  const [step, setStep] = useState(0);
  const current = skill.steps[step]!;

  return (
    <AppShell>
      <PageTitle emoji="🧼" title="Life Skills" subtitle="One step at a time" back={{ to: "/activities" }} />

      <div className="grid grid-cols-2 gap-2">
        {LIFE_SKILLS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => {
              setId(s.id);
              setStep(0);
            }}
            className={`tap rounded-2xl border-2 p-3 text-left text-sm font-bold ${s.id === id ? "border-primary bg-secondary" : "border-border"}`}
          >
            <span className="block text-2xl">{s.emoji}</span>
            {s.title}
          </button>
        ))}
      </div>

      <Card className="mt-4 text-center">
        <p className="text-sm font-semibold text-muted-foreground">
          Step {step + 1} of {skill.steps.length}
        </p>
        <p className="mt-2 text-6xl">{current.emoji}</p>
        <p className="mt-2 text-xl font-bold">{current.text}</p>
        <div className="mt-3 flex justify-center">
          <SpeakButton text={current.text} />
        </div>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className="tap flex-1 rounded-2xl bg-secondary py-3 font-bold text-secondary-foreground"
          >
            ← Back
          </button>
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(skill.steps.length - 1, s + 1))}
            className="tap flex-1 rounded-2xl bg-primary py-3 font-bold text-primary-foreground"
          >
            Next →
          </button>
        </div>
      </Card>

      <FinishCard id={`lifeskill-${skill.id}`} label="I did every step" coins={7} />
    </AppShell>
  );
}
