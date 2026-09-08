import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type LearningMode = "dyslexia" | "autism";
export type ThemeName = "auto" | "dyslexia" | "autism" | "dark";
export type SpecialInterest = "trains" | "animals" | "space" | "dinosaurs" | "ocean" | "music";

export type Profile = {
  username: string;
  avatar: string;
  age: number;
  learningMode: LearningMode;
  specialInterest: SpecialInterest;
  onboarded: boolean;
};

export type Settings = {
  theme: ThemeName;
  reduceMotion: boolean;
  highContrast: boolean;
  quietSounds: boolean;
  speechEnabled: boolean;
  speechRate: number;
};

export type Progress = {
  coins: number;
  streak: number;
  lastActiveDay: string;
  completed: string[];
  achievements: string[];
  checkIns: { day: string; zone: string; emoji: string }[];
  nowNextThen: { now: string; next: string; then: string };
};

const KEY = "echoability.v1";

const defaultProfile: Profile = {
  username: "",
  avatar: "🐨",
  age: 7,
  learningMode: "dyslexia",
  specialInterest: "animals",
  onboarded: false,
};

const defaultSettings: Settings = {
  theme: "auto",
  reduceMotion: false,
  highContrast: false,
  quietSounds: false,
  speechEnabled: true,
  speechRate: 0.85,
};

const defaultProgress: Progress = {
  coins: 0,
  streak: 0,
  lastActiveDay: "",
  completed: [],
  achievements: [],
  checkIns: [],
  nowNextThen: { now: "", next: "", then: "" },
};

type State = { profile: Profile; settings: Settings; progress: Progress };

const defaultState: State = {
  profile: defaultProfile,
  settings: defaultSettings,
  progress: defaultProgress,
};

export function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function load(): State {
  if (typeof window === "undefined") return defaultState;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw) as Partial<State>;
    return {
      profile: { ...defaultProfile, ...parsed.profile },
      settings: { ...defaultSettings, ...parsed.settings },
      progress: { ...defaultProgress, ...parsed.progress },
    };
  } catch {
    return defaultState;
  }
}

export const ACHIEVEMENTS: { id: string; title: string; emoji: string; hint: string; need: number }[] =
  [
    { id: "first-step", title: "First Step", emoji: "👣", hint: "Finish your first activity", need: 1 },
    { id: "explorer", title: "Explorer", emoji: "🧭", hint: "Finish 5 activities", need: 5 },
    { id: "star-learner", title: "Star Learner", emoji: "⭐", hint: "Finish 15 activities", need: 15 },
    { id: "champion", title: "Champion", emoji: "🏆", hint: "Finish 30 activities", need: 30 },
    { id: "coin-collector", title: "Coin Collector", emoji: "🪙", hint: "Earn 100 coins", need: 100 },
    { id: "calm-friend", title: "Calm Friend", emoji: "🫧", hint: "Use the Calm Corner", need: 1 },
    { id: "feelings-buddy", title: "Feelings Buddy", emoji: "💚", hint: "Check in 3 times", need: 3 },
    { id: "streak-3", title: "Three Day Streak", emoji: "🔥", hint: "Play 3 days in a row", need: 3 },
  ];

type Ctx = State & {
  ready: boolean;
  setProfile: (p: Partial<Profile>) => void;
  setSettings: (s: Partial<Settings>) => void;
  complete: (id: string, coins?: number) => void;
  isDone: (id: string) => boolean;
  addCheckIn: (zone: string, emoji: string) => void;
  setNowNextThen: (v: { now: string; next: string; then: string }) => void;
  unlock: (id: string) => void;
  resetAll: () => void;
  activeTheme: Exclude<ThemeName, "auto">;
};

const StoreContext = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(defaultState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const loaded = load();
    // streak roll-up
    const d = today();
    const last = loaded.progress.lastActiveDay;
    if (last !== d) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      loaded.progress = {
        ...loaded.progress,
        streak: last === yesterday ? loaded.progress.streak + 1 : last ? 1 : 1,
        lastActiveDay: d,
      };
    }
    setState(loaded);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable */
    }
  }, [state, ready]);

  const activeTheme: Exclude<ThemeName, "auto"> =
    state.settings.theme === "auto" ? state.profile.learningMode : state.settings.theme;

  useEffect(() => {
    if (typeof document === "undefined") return;
    const cls = [
      `theme-${activeTheme}`,
      state.settings.reduceMotion ? "pref-reduce-motion" : "",
      state.settings.highContrast ? "pref-contrast" : "",
      activeTheme === "dark" ? "dark" : "",
    ].filter(Boolean);
    document.documentElement.className = cls.join(" ");
  }, [activeTheme, state.settings.reduceMotion, state.settings.highContrast]);

  const evaluate = useCallback((p: Progress): Progress => {
    const done = p.completed.length;
    const earned = new Set(p.achievements);
    const check = (id: string, value: number) => {
      const a = ACHIEVEMENTS.find((x) => x.id === id)!;
      if (value >= a.need) earned.add(id);
    };
    check("first-step", done);
    check("explorer", done);
    check("star-learner", done);
    check("champion", done);
    check("coin-collector", p.coins);
    check("feelings-buddy", p.checkIns.length);
    check("streak-3", p.streak);
    return { ...p, achievements: [...earned] };
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      ...state,
      ready,
      activeTheme,
      setProfile: (p) => setState((s) => ({ ...s, profile: { ...s.profile, ...p } })),
      setSettings: (v) => setState((s) => ({ ...s, settings: { ...s.settings, ...v } })),
      complete: (id, coins = 5) =>
        setState((s) => {
          const already = s.progress.completed.includes(id);
          const next: Progress = {
            ...s.progress,
            completed: already ? s.progress.completed : [...s.progress.completed, id],
            coins: s.progress.coins + (already ? 1 : coins),
          };
          return { ...s, progress: evaluate(next) };
        }),
      isDone: (id) => state.progress.completed.includes(id),
      addCheckIn: (zone, emoji) =>
        setState((s) => ({
          ...s,
          progress: evaluate({
            ...s.progress,
            checkIns: [{ day: today(), zone, emoji }, ...s.progress.checkIns].slice(0, 60),
          }),
        })),
      setNowNextThen: (v) => setState((s) => ({ ...s, progress: { ...s.progress, nowNextThen: v } })),
      unlock: (id) =>
        setState((s) =>
          s.progress.achievements.includes(id)
            ? s
            : { ...s, progress: { ...s.progress, achievements: [...s.progress.achievements, id] } },
        ),
      resetAll: () => setState(defaultState),
    }),
    [state, ready, activeTheme, evaluate],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
