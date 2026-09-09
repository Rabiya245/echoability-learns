import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useStore } from "@/lib/store";

const TABS = [
  { to: "/", label: "Home", emoji: "🏠" },
  { to: "/activities", label: "Learn", emoji: "🎯" },
  { to: "/videos", label: "Watch", emoji: "🎬" },
  { to: "/profile", label: "Me", emoji: "🧒" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const { progress } = useStore();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onCalm = pathname === "/calm";

  return (
    <div className="min-h-screen bg-muted/40 flex justify-center">
      <div className="relative w-full max-w-[460px] bg-background min-h-screen shadow-xl flex flex-col">
        <header className="sticky top-0 z-20 flex items-center justify-between gap-2 border-b border-border bg-background/95 px-4 py-3 backdrop-blur">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden>
              🦋
            </span>
            <span className="font-display text-lg font-bold text-foreground">EchoAbility</span>
          </Link>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground">
              🪙 {progress.coins}
            </span>
            <span className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground">
              🔥 {progress.streak}
            </span>
          </div>
        </header>

        <main className="flex-1 px-4 pb-32 pt-4">{children}</main>

        {!onCalm && (
          <Link
            to="/calm"
            aria-label="Open the Calm Corner"
            className="tap anim-float fixed bottom-24 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-calm text-2xl text-calm-foreground shadow-lg"
            style={{ right: "max(1rem, calc(50vw - 230px + 1rem))" }}
          >
            🫧
          </Link>
        )}

        <nav className="fixed bottom-0 z-30 w-full max-w-[460px] border-t border-border bg-background px-2 pb-2 pt-1">
          <ul className="grid grid-cols-4">
            {TABS.map((t) => (
              <li key={t.to}>
                <Link
                  to={t.to}
                  activeOptions={{ exact: t.to === "/" }}
                  activeProps={{ className: "text-primary bg-secondary" }}
                  inactiveProps={{ className: "text-muted-foreground" }}
                  className="tap flex flex-col items-center gap-0.5 rounded-2xl py-2 text-xs font-semibold"
                >
                  <span className="text-2xl" aria-hidden>
                    {t.emoji}
                  </span>
                  {t.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
