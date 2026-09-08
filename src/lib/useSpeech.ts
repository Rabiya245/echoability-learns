import { useCallback, useEffect, useState } from "react";
import { useStore } from "./store";

/** Text-to-speech built on the browser speech synthesizer. */
export function useSpeech() {
  const { settings } = useStore();
  const [speaking, setSpeaking] = useState(false);

  const supported = typeof window !== "undefined" && "speechSynthesis" in window;

  const stop = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [supported]);

  const speak = useCallback(
    (text: string) => {
      if (!supported || !settings.speechEnabled || !text) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = settings.speechRate;
      u.pitch = 1.05;
      u.volume = settings.quietSounds ? 0.5 : 1;
      u.lang = "en-US";
      u.onend = () => setSpeaking(false);
      u.onerror = () => setSpeaking(false);
      setSpeaking(true);
      window.speechSynthesis.speak(u);
    },
    [supported, settings.speechEnabled, settings.speechRate, settings.quietSounds],
  );

  useEffect(() => () => stop(), [stop]);

  return { speak, stop, speaking, supported };
}
