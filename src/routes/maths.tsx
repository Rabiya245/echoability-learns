import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Card, Choices, FinishCard, PageTitle, SpeakButton, TracePad } from "@/components/kit";
import { COUNTING_SETS, MATHS_MODULES, OPERATIONS, numberRange } from "@/lib/learningData";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/maths")({
  head: () => ({
    meta: [
      { title: "Maths — EchoAbility" },
      { name: "description", content: "Numbers 0 to 100, counting with pictures and simple adding and taking away." },
      { property: "og:title", content: "Maths — EchoAbility" },
      { property: "og:description", content: "Trace numbers, count pictures and try gentle sums." },
    ],
  }),
  component: MathsPage,
});

function NumberBoard({ from, to }: { from: number; to: number }) {
  const { complete } = useStore();
  const [picked, setPicked] = useState(from);
  return (
    <>
      <div className="grid grid-cols-6 gap-2">
        {numberRange(from, to).map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setPicked(n)}
            className={`tap rounded-xl border-2 py-2 font-bold ${n === picked ? "border-primary bg-secondary" : "border-border"}`}
          >
            {n}
          </button>
        ))}
      </div>
      <Card className="mt-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">Trace {picked}</p>
          <SpeakButton text={`${picked}`} />
        </div>
        <div className="mt-3">
          <TracePad character={String(picked)} onComplete={() => complete(`number-${picked}`, 2)} />
        </div>
      </Card>
    </>
  );
}

function Counting() {
  const [i, setI] = useState(0);
  const set = COUNTING_SETS[i % COUNTING_SETS.length]!;
  const options = [set.count, set.count + 1, Math.max(1, set.count - 1)].map((n) => ({ text: String(n) }));
  return (
    <Card>
      <p className="text-lg font-bold">How many do you see?</p>
      <p className="my-3 text-3xl leading-relaxed">{set.emoji.repeat(set.count)}</p>
      <Choices
        key={i}
        options={options}
        answer={0}
        feedback={`There are ${set.count}.`}
        onCorrect={() => setTimeout(() => setI((v) => v + 1), 1200)}
      />
    </Card>
  );
}

function Sums() {
  const [i, setI] = useState(0);
  const op = OPERATIONS[i % OPERATIONS.length]!;
  const result = op.op === "+" ? op.a + op.b : op.a - op.b;
  const options = [result, result + 1, Math.max(0, result - 2)].map((n) => ({ text: String(n) }));
  return (
    <Card>
      <p className="text-2xl font-bold">
        {op.a} {op.op} {op.b} = ?
      </p>
      <p className="my-2 text-2xl">
        {"🟠".repeat(op.a)} {op.op} {"🔵".repeat(op.b)}
      </p>
      <Choices
        key={i}
        options={options}
        answer={0}
        feedback={`${op.a} ${op.op} ${op.b} makes ${result}.`}
        onCorrect={() => setTimeout(() => setI((v) => v + 1), 1200)}
      />
    </Card>
  );
}

function MathsPage() {
  const [tab, setTab] = useState(MATHS_MODULES[0]!.id);

  return (
    <AppShell>
      <PageTitle emoji="🔢" title="Maths" subtitle="Numbers, counting and sums" back={{ to: "/activities" }} />

      <div className="grid grid-cols-2 gap-2">
        {MATHS_MODULES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setTab(m.id)}
            className={`tap rounded-2xl border-2 p-3 text-left text-sm font-bold ${m.id === tab ? "border-primary bg-secondary" : "border-border"}`}
          >
            <span className="block text-2xl">{m.emoji}</span>
            {m.title}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {tab === "numbers-0-50" && <NumberBoard from={0} to={50} />}
        {tab === "numbers-51-100" && <NumberBoard from={51} to={100} />}
        {tab === "counting" && <Counting />}
        {tab === "operations" && <Sums />}
      </div>

      <FinishCard id={`maths-${tab}`} label="I finished this" coins={8} />
    </AppShell>
  );
}
