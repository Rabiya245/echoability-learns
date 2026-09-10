import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Card, Choices, FinishCard, PageTitle, SpeakButton, TracePad } from "@/components/kit";
import { ENGLISH_LEVELS, SENTENCES, type LetterItem } from "@/lib/learningData";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/english")({
  head: () => ({
    meta: [
      { title: "English — EchoAbility" },
      { name: "description", content: "Learn letters A to Z with sounds, picture words, finger tracing and gentle quizzes." },
      { property: "og:title", content: "English — EchoAbility" },
      { property: "og:description", content: "Letters, sounds, tracing and simple sentences for young readers." },
    ],
  }),
  component: EnglishPage,
});

function LetterCard({ item }: { item: LetterItem }) {
  const { complete } = useStore();
  return (
    <Card className="anim-fade-up">
      <div className="flex items-center gap-4">
        <span className="font-display text-5xl font-bold text-primary">{item.letter}</span>
        <div className="flex-1">
          <p className="text-lg font-bold">
            {item.emoji} {item.word}
          </p>
          <p className="text-sm text-muted-foreground">{item.sound}</p>
        </div>
        <SpeakButton text={`${item.letter}. ${item.sound}. ${item.word}`} />
      </div>
      <div className="mt-4">
        <TracePad character={item.letter} onComplete={() => complete(`letter-${item.letter}`, 3)} />
      </div>
    </Card>
  );
}

function EnglishPage() {
  const [levelId, setLevelId] = useState(ENGLISH_LEVELS[0]!.id);
  const level = ENGLISH_LEVELS.find((l) => l.id === levelId)!;
  const [index, setIndex] = useState(0);
  const item = level.letters[index]!;
  const [quizIndex, setQuizIndex] = useState(0);

  const quizItem = level.letters[quizIndex % level.letters.length]!;
  const distractors = level.letters.filter((l) => l.letter !== quizItem.letter).slice(0, 2);
  const options = [{ emoji: quizItem.emoji, text: quizItem.word }, ...distractors.map((d) => ({ emoji: d.emoji, text: d.word }))];

  return (
    <AppShell>
      <PageTitle emoji="🔤" title="English" subtitle="Letters, sounds and sentences" back={{ to: "/activities" }} />

      <div className="flex gap-2">
        {ENGLISH_LEVELS.map((l) => (
          <button
            key={l.id}
            type="button"
            onClick={() => {
              setLevelId(l.id);
              setIndex(0);
            }}
            className={`tap flex-1 rounded-2xl border-2 p-3 text-sm font-bold ${l.id === levelId ? "border-primary bg-secondary" : "border-border"}`}
          >
            {l.emoji} {l.title}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <LetterCard item={item} />
        <div className="mt-3 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            className="tap rounded-2xl bg-secondary px-4 py-2 font-bold text-secondary-foreground"
          >
            ← Back
          </button>
          <span className="text-sm font-semibold text-muted-foreground">
            {index + 1} / {level.letters.length}
          </span>
          <button
            type="button"
            onClick={() => setIndex((i) => Math.min(level.letters.length - 1, i + 1))}
            className="tap rounded-2xl bg-primary px-4 py-2 font-bold text-primary-foreground"
          >
            Next →
          </button>
        </div>
      </div>

      <h2 className="mt-8 text-lg font-bold">Which word starts with {quizItem.letter}?</h2>
      <div className="mt-2">
        <Choices
          key={quizItem.letter}
          options={options}
          answer={0}
          feedback={`Yes! ${quizItem.word} starts with ${quizItem.letter}.`}
          onCorrect={() => setTimeout(() => setQuizIndex((q) => q + 1), 1200)}
        />
      </div>

      <h2 className="mt-8 text-lg font-bold">Read with me</h2>
      <div className="mt-2 space-y-2">
        {SENTENCES.map((s) => (
          <Card key={s.text} className="flex items-center gap-3">
            <span className="text-3xl">{s.emoji}</span>
            <p className="flex-1 text-lg font-semibold">{s.text}</p>
            <SpeakButton text={s.text} label="" />
          </Card>
        ))}
      </div>

      <FinishCard id={`english-${level.id}`} label="I finished this level" coins={8} />
    </AppShell>
  );
}
