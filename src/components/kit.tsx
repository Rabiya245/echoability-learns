import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useSpeech } from "@/lib/useSpeech";
import { chime } from "@/lib/sound";
import { useStore } from "@/lib/store";

export function PageTitle({
  emoji,
  title,
  subtitle,
  back,
}: {
  emoji: string;
  title: string;
  subtitle?: string;
  back?: { to: string; params?: Record<string, string> };
}) {
  return (
    <div className="mb-4">
      {back && (
        <Link
          to={back.to as never}
          params={back.params as never}
          className="tap mb-2 inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-secondary-foreground"
        >
          ← Back
        </Link>
      )}
      <h1 className="flex items-center gap-2 text-2xl font-bold text-foreground">
        <span aria-hidden>{emoji}</span>
        {title}
      </h1>
      {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

export function SpeakButton({ text, label = "Listen" }: { text: string; label?: string }) {
  const { speak, supported } = useSpeech();
  if (!supported) return null;
  return (
    <button
      type="button"
      onClick={() => speak(text)}
      className="tap inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
    >
      🔊 {label}
    </button>
  );
}

export function TileLink({
  to,
  params,
  emoji,
  title,
  desc,
  done,
}: {
  to: string;
  params?: Record<string, string>;
  emoji: string;
  title: string;
  desc?: string;
  done?: boolean;
}) {
  return (
    <Link
      to={to as never}
      params={params as never}
      className="card-soft tap anim-fade-up flex items-center gap-3 p-4"
    >
      <span className="text-4xl" aria-hidden>
        {emoji}
      </span>
      <span className="flex-1">
        <span className="block text-lg font-bold text-foreground">{title}</span>
        {desc && <span className="block text-sm text-muted-foreground">{desc}</span>}
      </span>
      {done && <span className="text-xl">✅</span>}
    </Link>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`card-soft p-4 ${className}`}>{children}</div>;
}

export function Confetti({ show }: { show: boolean }) {
  const { settings } = useStore();
  if (!show || settings.reduceMotion) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {Array.from({ length: 24 }).map((_, i) => (
        <span
          key={i}
          className="absolute text-2xl"
          style={{
            left: `${(i * 37) % 100}%`,
            top: "-5%",
            animation: `confetti-fall ${1.4 + (i % 5) * 0.25}s ease-in ${(i % 7) * 0.08}s forwards`,
          }}
        >
          {["⭐", "🎉", "🪙", "💫", "🎈"][i % 5]}
        </span>
      ))}
    </div>
  );
}

/** Reward banner shown after finishing an activity. */
export function FinishCard({ id, coins = 5, label }: { id: string; coins?: number; label: string }) {
  const { complete, settings } = useStore();
  const [done, setDone] = useState(false);
  const { speak } = useSpeech();

  return (
    <div className="mt-6">
      <Confetti show={done} />
      {done ? (
        <Card className="anim-pop text-center">
          <p className="text-4xl" aria-hidden>
            🎉
          </p>
          <p className="mt-2 text-lg font-bold text-foreground">Great job! +{coins} coins</p>
        </Card>
      ) : (
        <button
          type="button"
          onClick={() => {
            complete(id, coins);
            chime("good", settings.quietSounds);
            speak("Great job!");
            setDone(true);
          }}
          className="tap w-full rounded-2xl bg-success px-4 py-4 text-lg font-bold text-white"
        >
          ✅ {label}
        </button>
      )}
    </div>
  );
}

/** Multiple-choice question with gentle feedback. */
export function Choices({
  options,
  answer,
  onCorrect,
  feedback,
}: {
  options: { emoji?: string; text: string }[];
  answer: number;
  onCorrect: () => void;
  feedback?: string;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const { speak } = useSpeech();
  const { settings } = useStore();

  return (
    <div className="space-y-2">
      {options.map((o, i) => {
        const state = picked === null ? "" : i === answer ? "border-success" : picked === i ? "border-destructive" : "";
        return (
          <button
            key={o.text}
            type="button"
            onClick={() => {
              if (picked !== null) return;
              setPicked(i);
              if (i === answer) {
                chime("good", settings.quietSounds);
                speak(feedback ?? "That is right!");
                onCorrect();
              } else {
                chime("try", settings.quietSounds);
                speak("Good try. Have another look.");
                setTimeout(() => setPicked(null), 900);
              }
            }}
            className={`card-soft tap flex w-full items-center gap-3 p-3 text-left text-lg font-semibold ${state}`}
          >
            {o.emoji && <span className="text-2xl">{o.emoji}</span>}
            <span className="flex-1">{o.text}</span>
          </button>
        );
      })}
      {picked === answer && feedback && (
        <p className="anim-fade-up rounded-2xl bg-success/15 p-3 text-sm font-semibold text-foreground">
          💚 {feedback}
        </p>
      )}
    </div>
  );
}

/** Trace a big character with a finger or mouse; scores real coverage of the glyph. */
export function TracePad({ character, onComplete }: { character: string; onComplete?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const guideRef = useRef<Uint8Array | null>(null);
  const drawing = useRef(false);
  const [percent, setPercent] = useState(0);
  const [finished, setFinished] = useState(false);
  const size = 280;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, size, size);

    // Build a mask of the glyph pixels off-screen so we can score coverage.
    const off = document.createElement("canvas");
    off.width = size;
    off.height = size;
    const octx = off.getContext("2d");
    if (!octx) return;
    octx.font = `bold ${size * 0.72}px Lexend, system-ui, sans-serif`;
    octx.textAlign = "center";
    octx.textBaseline = "middle";
    octx.fillText(character, size / 2, size / 2);
    const data = octx.getImageData(0, 0, size, size).data;
    const mask = new Uint8Array(size * size);
    for (let i = 0; i < mask.length; i++) mask[i] = data[i * 4 + 3]! > 40 ? 1 : 0;
    guideRef.current = mask;
    setPercent(0);
    setFinished(false);
  }, [character]);

  const score = () => {
    const canvas = canvasRef.current;
    const mask = guideRef.current;
    if (!canvas || !mask) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const data = ctx.getImageData(0, 0, size, size).data;
    let total = 0;
    let hit = 0;
    for (let i = 0; i < mask.length; i++) {
      if (!mask[i]) continue;
      total++;
      if (data[i * 4 + 3]! > 30) hit++;
    }
    const pct = total ? Math.round((hit / total) * 100) : 0;
    setPercent(pct);
    if (pct >= 60 && !finished) {
      setFinished(true);
      onComplete?.();
    }
  };

  const pos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * size,
      y: ((e.clientY - rect.top) / rect.height) * size,
    };
  };

  const paint = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = pos(e);
    ctx.fillStyle = "rgba(240,120,60,0.95)";
    ctx.beginPath();
    ctx.arc(x, y, 14, 0, Math.PI * 2);
    ctx.fill();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size, maxWidth: "100%" }}>
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center font-display text-muted-foreground/40"
          style={{ fontSize: size * 0.72, lineHeight: 1 }}
        >
          {character}
        </div>
        <canvas
          ref={canvasRef}
          className="card-soft absolute inset-0 h-full w-full touch-none bg-transparent"
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            drawing.current = true;
            paint(e);
          }}
          onPointerMove={(e) => {
            if (drawing.current) paint(e);
          }}
          onPointerUp={() => {
            drawing.current = false;
            score();
          }}
          onPointerLeave={() => {
            if (drawing.current) {
              drawing.current = false;
              score();
            }
          }}
        />
      </div>
      <div className="mt-3 flex items-center gap-3">
        <div className="h-3 w-40 overflow-hidden rounded-full bg-muted">
          <div className="h-full bg-success transition-all" style={{ width: `${Math.min(percent, 100)}%` }} />
        </div>
        <span className="text-sm font-semibold text-muted-foreground">{percent}%</span>
        <button
          type="button"
          onClick={() => {
            const ctx = canvasRef.current?.getContext("2d");
            ctx?.clearRect(0, 0, size, size);
            setPercent(0);
            setFinished(false);
          }}
          className="tap rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-secondary-foreground"
        >
          ↺ Clear
        </button>
      </div>
      {finished && <p className="anim-pop mt-2 text-lg font-bold text-success">Beautiful tracing! ⭐</p>}
    </div>
  );
}
