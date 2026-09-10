import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { PageTitle, TileLink } from "@/components/kit";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/activities")({
  head: () => ({
    meta: [
      { title: "Learn — EchoAbility" },
      { name: "description", content: "All EchoAbility learning modules: English, maths, fun activities, social skills, emotions, schedules and life skills." },
      { property: "og:title", content: "Learn — EchoAbility" },
      { property: "og:description", content: "Pick a module: letters, numbers, feelings, routines and everyday skills." },
    ],
  }),
  component: ActivitiesPage,
});

function ActivitiesPage() {
  const { profile } = useStore();
  const autism = profile.learningMode === "autism";

  const core = [
    { to: "/english", emoji: "🔤", title: "English", desc: "Letters, sounds and sentences" },
    { to: "/maths", emoji: "🔢", title: "Maths", desc: "Numbers, counting and sums" },
    { to: "/fun", emoji: "🎨", title: "Fun Activities", desc: "Colors, shapes, animals, memory" },
  ];
  const calmSkills = [
    { to: "/emotions", emoji: "💚", title: "Emotions & Zones", desc: "Name it and settle it" },
    { to: "/social", emoji: "🤝", title: "Social Skills", desc: "Hello, turns and sharing" },
    { to: "/schedule", emoji: "🗓️", title: "Visual Schedule", desc: "Now, next, then" },
    { to: "/lifeskills", emoji: "🧼", title: "Life Skills", desc: "Everyday steps" },
  ];
  const groups = autism ? [calmSkills, core] : [core, calmSkills];

  return (
    <AppShell>
      <PageTitle emoji="🎯" title="Learn" subtitle="Pick something to try today" />
      <div className="grid gap-3">
        {groups.flat().map((t) => (
          <TileLink key={t.to} to={t.to} emoji={t.emoji} title={t.title} desc={t.desc} />
        ))}
      </div>
    </AppShell>
  );
}
