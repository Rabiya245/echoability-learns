import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useStore, today, type LearningMode, type SpecialInterest } from "@/lib/store";
import { SPECIAL_INTERESTS, dailySticker, interestOf } from "@/lib/learningData";
import { AppShell } from "@/components/AppShell";
import { Card, SpeakButton, TileLink } from "@/components/kit";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EchoAbility — Learning for Dyslexia & Autism" },
      {
        name: "description",
        content:
          "A calm, child-friendly learning app for children aged 4–12 with dyslexia or autism: letters, numbers, social skills, emotions and a Calm Corner.",
      },
      { property: "og:title", content: "EchoAbility — Learning for Dyslexia & Autism" },
      {
        property: "og:description",
        content: "Letters, numbers, social skills, visual schedules and a Calm Corner for children aged 4–12.",
      },
    ],
  }),
  component: HomePage,
});

const AVATARS = ["🐨", "🦊", "🐼", "🦄", "🐸", "🐙", "🚀", "🦕"];

function Onboarding() {
  const { setProfile } = useStore();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("🐨");
  const [age, setAge] = useState(7);
  const [mode, setMode] = useState<LearningMode>("dyslexia");
  const [interest, setInterest] = useState<SpecialInterest>("animals");

  const next = () => setStep((s) => s + 1);

  return (
    <div className="min-h-screen bg-background px-5 py-10">
      <div className="mx-auto max-w-[420px]">
        <p className="text-center text-5xl anim-float" aria-hidden>
          🦋
        </p>
        <h1 className="mt-2 text-center text-3xl font-bold text-foreground">EchoAbility</h1>
        <p className="mt-1 text-center text-muted-foreground">Learning that fits you.</p>

        <div className="mt-8 space-y-4">
          {step === 0 && (
            <Card className="anim-fade-up">
              <label className="block text-lg font-bold" htmlFor="name">
                What is your name?
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Type your name"
                className="mt-3 w-full rounded-2xl border-2 border-border bg-background p-3 text-lg"
              />
              <p className="mt-4 font-semibold">Pick a buddy face</p>
              <div className="mt-2 grid grid-cols-4 gap-2">
                {AVATARS.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => setAvatar(a)}
                    className={`tap rounded-2xl border-2 p-2 text-3xl ${a === avatar ? "border-primary bg-secondary" : "border-border"}`}
                  >
                    {a}
                  </button>
                ))}
              </div>
              <button
                type="button"
                disabled={!name.trim()}
                onClick={next}
                className="tap mt-5 w-full rounded-2xl bg-primary py-3 text-lg font-bold text-primary-foreground disabled:opacity-40"
              >
                Next →
              </button>
            </Card>
          )}

          {step === 1 && (
            <Card className="anim-fade-up">
              <p className="text-lg font-bold">How old are you?</p>
              <div className="mt-3 grid grid-cols-5 gap-2">
                {[4, 5, 6, 7, 8, 9, 10, 11, 12].map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => setAge(a)}
                    className={`tap rounded-2xl border-2 py-2 text-lg font-bold ${a === age ? "border-primary bg-secondary" : "border-border"}`}
                  >
                    {a}
                  </button>
                ))}
              </div>
              <p className="mt-5 text-lg font-bold">Which way of learning helps most?</p>
              <div className="mt-2 space-y-2">
                {(
                  [
                    { id: "dyslexia", emoji: "📖", label: "Reading & writing help", desc: "Letters, sounds, tracing" },
                    { id: "autism", emoji: "🧩", label: "Calm & routines help", desc: "Feelings, schedules, social" },
                  ] as const
                ).map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => setMode(o.id)}
                    className={`tap flex w-full items-center gap-3 rounded-2xl border-2 p-3 text-left ${mode === o.id ? "border-primary bg-secondary" : "border-border"}`}
                  >
                    <span className="text-3xl">{o.emoji}</span>
                    <span>
                      <span className="block font-bold">{o.label}</span>
                      <span className="block text-sm text-muted-foreground">{o.desc}</span>
                    </span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={next}
                className="tap mt-5 w-full rounded-2xl bg-primary py-3 text-lg font-bold text-primary-foreground"
              >
                Next →
              </button>
            </Card>
          )}

          {step === 2 && (
            <Card className="anim-fade-up">
              <p className="text-lg font-bold">What do you love most?</p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {SPECIAL_INTERESTS.map((i) => (
                  <button
                    key={i.id}
                    type="button"
                    onClick={() => setInterest(i.id)}
                    className={`tap rounded-2xl border-2 p-3 ${interest === i.id ? "border-primary bg-secondary" : "border-border"}`}
                  >
                    <span className="block text-3xl">{i.emoji}</span>
                    <span className="mt-1 block text-sm font-semibold">{i.label}</span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() =>
                  setProfile({
                    username: name.trim() || "Friend",
                    avatar,
                    age,
                    learningMode: mode,
                    specialInterest: interest,
                    onboarded: true,
                  })
                }
                className="tap mt-5 w-full rounded-2xl bg-success py-3 text-lg font-bold text-white"
              >
                Let's start! 🎉
              </button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  const { profile, progress, ready } = useStore();
  if (!ready) return null;
  if (!profile.onboarded) return <Onboarding />;

  const sticker = dailySticker(profile.specialInterest, today());
  const buddy = interestOf(profile.specialInterest);
  const autism = profile.learningMode === "autism";
  const nnt = progress.nowNextThen;

  return (
    <AppShell>
      <h1 className="text-2xl font-bold text-foreground">
        Hello {profile.username} {profile.avatar}
      </h1>
      <p className="text-sm text-muted-foreground">
        {autism ? "Calm & routines mode" : "Reading & writing mode"} · {buddy.buddy} is with you
      </p>

      <Card className="mt-4 anim-pop bg-secondary/50">
        <div className="flex items-start gap-3">
          <span className="text-4xl" aria-hidden>
            {sticker.emoji}
          </span>
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Today's sticker</p>
            <p className="text-lg font-bold text-foreground">{sticker.text}</p>
            <div className="mt-2">
              <SpeakButton text={sticker.text} />
            </div>
          </div>
        </div>
      </Card>

      {(nnt.now || nnt.next || nnt.then) && (
        <Link to="/schedule" className="card-soft tap mt-4 block p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">My plan</p>
          <p className="mt-1 text-base font-semibold">
            Now: {nnt.now || "—"} → Next: {nnt.next || "—"} → Then: {nnt.then || "—"}
          </p>
        </Link>
      )}

      <h2 className="mt-6 text-lg font-bold">{autism ? "My calm skills" : "Let's learn"}</h2>
      <div className="mt-2 grid gap-3">
        {autism ? (
          <>
            <TileLink to="/emotions" emoji="💚" title="Emotions & Zones" desc="Name it and settle it" />
            <TileLink to="/social" emoji="🤝" title="Social Skills" desc="Hello, turns, sharing" />
            <TileLink to="/schedule" emoji="🗓️" title="Visual Schedule" desc="Now, next, then" />
            <TileLink to="/lifeskills" emoji="🧼" title="Life Skills" desc="Everyday steps" />
            <TileLink to="/english" emoji="🔤" title="English" desc="Letters, sounds, sentences" />
            <TileLink to="/maths" emoji="🔢" title="Maths" desc="Numbers and counting" />
          </>
        ) : (
          <>
            <TileLink to="/english" emoji="🔤" title="English" desc="Letters, sounds, sentences" />
            <TileLink to="/maths" emoji="🔢" title="Maths" desc="Numbers and counting" />
            <TileLink to="/fun" emoji="🎨" title="Fun Activities" desc="Colors, shapes, memory" />
            <TileLink to="/emotions" emoji="💚" title="Emotions & Zones" desc="Name it and settle it" />
            <TileLink to="/social" emoji="🤝" title="Social Skills" desc="Hello, turns, sharing" />
          </>
        )}
      </div>

      <Link to="/calm" className="card-soft tap mt-4 flex items-center gap-3 bg-calm/15 p-4">
        <span className="text-4xl">🫧</span>
        <span>
          <span className="block text-lg font-bold">Calm Corner</span>
          <span className="block text-sm text-muted-foreground">Breathing, sounds and quiet tools</span>
        </span>
      </Link>
    </AppShell>
  );
}
