import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Card, FinishCard, PageTitle, SpeakButton } from "@/components/kit";
import { ROUTINES } from "@/lib/learningData";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "Visual Schedule — EchoAbility" },
      { name: "description", content: "A Now, Next, Then board and picture routines that make the day predictable." },
      { property: "og:title", content: "Visual Schedule — EchoAbility" },
      { property: "og:description", content: "Now–Next–Then planning and step-by-step picture routines." },
    ],
  }),
  component: SchedulePage,
});

function SchedulePage() {
  const { progress, setNowNextThen } = useStore();
  const [draft, setDraft] = useState(progress.nowNextThen);
  const [routineId, setRoutineId] = useState(ROUTINES[0]!.id);
  const routine = ROUTINES.find((r) => r.id === routineId)!;
  const [ticked, setTicked] = useState<string[]>([]);

  const fields = [
    { key: "now" as const, label: "Now", emoji: "▶️" },
    { key: "next" as const, label: "Next", emoji: "⏭️" },
    { key: "then" as const, label: "Then", emoji: "🔚" },
  ];

  return (
    <AppShell>
      <PageTitle emoji="🗓️" title="Visual Schedule" subtitle="Know what is coming next" back={{ to: "/activities" }} />

      <Card>
        <p className="text-lg font-bold">Now · Next · Then</p>
        <div className="mt-3 space-y-2">
          {fields.map((f) => (
            <label key={f.key} className="block">
              <span className="text-sm font-semibold">
                {f.emoji} {f.label}
              </span>
              <input
                value={draft[f.key]}
                onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
                placeholder={`What happens ${f.label.toLowerCase()}?`}
                className="mt-1 w-full rounded-2xl border-2 border-border bg-background p-3"
              />
            </label>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setNowNextThen(draft)}
          className="tap mt-3 w-full rounded-2xl bg-primary py-3 font-bold text-primary-foreground"
        >
          Save my plan
        </button>
      </Card>

      <h2 className="mt-6 text-lg font-bold">Picture routines</h2>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {ROUTINES.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => {
              setRoutineId(r.id);
              setTicked([]);
            }}
            className={`tap rounded-2xl border-2 p-3 text-left text-sm font-bold ${r.id === routineId ? "border-primary bg-secondary" : "border-border"}`}
          >
            <span className="block text-2xl">{r.emoji}</span>
            {r.title}
          </button>
        ))}
      </div>

      <Card className="mt-3">
        <div className="flex items-center gap-2">
          <p className="flex-1 text-lg font-bold">
            {routine.emoji} {routine.title}
          </p>
          <SpeakButton text={routine.steps.map((s) => s.text).join(". ")} label="" />
        </div>
        <p className="text-sm text-muted-foreground">{routine.desc}</p>
        <div className="mt-3 space-y-2">
          {routine.steps.map((s, i) => {
            const key = `${routine.id}-${i}`;
            const on = ticked.includes(key);
            return (
              <button
                key={key}
                type="button"
                onClick={() => setTicked((t) => (on ? t.filter((x) => x !== key) : [...t, key]))}
                className={`tap flex w-full items-center gap-3 rounded-2xl border-2 p-3 text-left ${on ? "border-success bg-success/10" : "border-border"}`}
              >
                <span className="text-2xl">{s.emoji}</span>
                <span className="flex-1 font-semibold">{s.text}</span>
                <span className="text-xl">{on ? "✅" : "⬜"}</span>
              </button>
            );
          })}
        </div>
      </Card>

      <FinishCard id={`routine-${routine.id}`} label="I finished my routine" coins={7} />
    </AppShell>
  );
}
