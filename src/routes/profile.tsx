import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Card, PageTitle } from "@/components/kit";
import { PARENT_TIPS, SPECIAL_INTERESTS } from "@/lib/learningData";
import { ACHIEVEMENTS, useStore, type LearningMode, type SpecialInterest, type ThemeName } from "@/lib/store";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Me — EchoAbility" },
      { name: "description", content: "Your buddy, coins, streak and badges, plus sensory settings and tips for grown-ups." },
      { property: "og:title", content: "Me — EchoAbility" },
      { property: "og:description", content: "Progress, badges and calm settings for each child." },
    ],
  }),
  component: ProfilePage,
});

function Toggle({ label, on, onChange }: { label: string; on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className="tap flex w-full items-center justify-between rounded-2xl border-2 border-border p-3 text-left font-semibold"
    >
      {label}
      <span className={`rounded-full px-3 py-1 text-sm ${on ? "bg-success text-white" : "bg-secondary text-secondary-foreground"}`}>
        {on ? "On" : "Off"}
      </span>
    </button>
  );
}

function ProfilePage() {
  const { profile, settings, progress, setProfile, setSettings, resetAll, ready } = useStore();
  if (!ready) return null;

  const themes: { id: ThemeName; label: string }[] = [
    { id: "auto", label: "Auto" },
    { id: "dyslexia", label: "Warm" },
    { id: "autism", label: "Calm" },
    { id: "dark", label: "Dark" },
  ];

  return (
    <AppShell>
      <PageTitle emoji="🧒" title="Me" subtitle="Your progress and your settings" />

      <Card className="flex items-center gap-4">
        <span className="text-5xl">{profile.avatar}</span>
        <div className="flex-1">
          <p className="text-xl font-bold">{profile.username || "Friend"}</p>
          <p className="text-sm text-muted-foreground">
            Age {profile.age} · 🪙 {progress.coins} · 🔥 {progress.streak} day streak
          </p>
          <p className="text-sm text-muted-foreground">{progress.completed.length} activities finished</p>
        </div>
      </Card>

      <h2 className="mt-6 text-lg font-bold">My badges</h2>
      <div className="mt-2 grid grid-cols-4 gap-2">
        {ACHIEVEMENTS.map((a) => {
          const got = progress.achievements.includes(a.id);
          return (
            <div
              key={a.id}
              title={a.hint}
              className={`rounded-2xl border-2 p-2 text-center ${got ? "border-success bg-success/10" : "border-border opacity-50"}`}
            >
              <span className="block text-3xl">{a.emoji}</span>
              <span className="text-[11px] font-semibold leading-tight">{a.title}</span>
            </div>
          );
        })}
      </div>

      <h2 className="mt-6 text-lg font-bold">Learning style</h2>
      <div className="mt-2 flex gap-2">
        {(
          [
            { id: "dyslexia", label: "📖 Reading help" },
            { id: "autism", label: "🧩 Calm & routines" },
          ] as { id: LearningMode; label: string }[]
        ).map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setProfile({ learningMode: m.id })}
            className={`tap flex-1 rounded-2xl border-2 p-3 text-sm font-bold ${profile.learningMode === m.id ? "border-primary bg-secondary" : "border-border"}`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <h2 className="mt-6 text-lg font-bold">Favourite topic</h2>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {SPECIAL_INTERESTS.map((i) => (
          <button
            key={i.id}
            type="button"
            onClick={() => setProfile({ specialInterest: i.id as SpecialInterest })}
            className={`tap rounded-2xl border-2 p-3 ${profile.specialInterest === i.id ? "border-primary bg-secondary" : "border-border"}`}
          >
            <span className="block text-3xl">{i.emoji}</span>
            <span className="text-xs font-semibold">{i.label}</span>
          </button>
        ))}
      </div>

      <h2 className="mt-6 text-lg font-bold">Look & feel</h2>
      <div className="mt-2 grid grid-cols-4 gap-2">
        {themes.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setSettings({ theme: t.id })}
            className={`tap rounded-2xl border-2 p-2 text-sm font-bold ${settings.theme === t.id ? "border-primary bg-secondary" : "border-border"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-3 space-y-2">
        <Toggle label="Less movement" on={settings.reduceMotion} onChange={(v) => setSettings({ reduceMotion: v })} />
        <Toggle label="Stronger contrast" on={settings.highContrast} onChange={(v) => setSettings({ highContrast: v })} />
        <Toggle label="Quieter sounds" on={settings.quietSounds} onChange={(v) => setSettings({ quietSounds: v })} />
        <Toggle label="Read out loud" on={settings.speechEnabled} onChange={(v) => setSettings({ speechEnabled: v })} />
        <Card>
          <label className="block font-semibold" htmlFor="rate">
            Talking speed
          </label>
          <input
            id="rate"
            type="range"
            min={0.5}
            max={1.2}
            step={0.05}
            value={settings.speechRate}
            onChange={(e) => setSettings({ speechRate: Number(e.target.value) })}
            className="mt-2 w-full"
          />
        </Card>
      </div>

      <h2 className="mt-6 text-lg font-bold">For grown-ups</h2>
      <div className="mt-2 space-y-2">
        {PARENT_TIPS.map((t) => (
          <Card key={t.title}>
            <p className="font-bold">
              {t.emoji} {t.title}
            </p>
            <p className="text-sm text-muted-foreground">{t.body}</p>
          </Card>
        ))}
      </div>

      <button
        type="button"
        onClick={() => {
          if (confirm("Start again? This clears the name, coins and badges on this device.")) resetAll();
        }}
        className="tap mt-6 w-full rounded-2xl border-2 border-destructive py-3 font-bold text-destructive"
      >
        Start again
      </button>
    </AppShell>
  );
}
