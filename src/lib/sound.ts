/**
 * Generated ambient soundscapes + gentle feedback tones.
 * Everything is synthesized with the Web Audio API, so it works offline.
 */

export type SoundscapeId = "rain" | "ocean" | "woods" | "campfire" | "whitenoise";

let ctx: AudioContext | null = null;
let current: { id: SoundscapeId; stop: () => void } | null = null;

function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  if (!ctx) ctx = new AC();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function noiseBuffer(ac: AudioContext, seconds = 4) {
  const buf = ac.createBuffer(1, ac.sampleRate * seconds, ac.sampleRate);
  const data = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < data.length; i++) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    data[i] = last * 3.5;
  }
  return buf;
}

export function stopSoundscape() {
  current?.stop();
  current = null;
}

export function currentSoundscape(): SoundscapeId | null {
  return current?.id ?? null;
}

export function playSoundscape(id: SoundscapeId, volume = 0.35): boolean {
  const ac = audio();
  if (!ac) return false;
  stopSoundscape();

  const master = ac.createGain();
  master.gain.value = 0;
  master.connect(ac.destination);
  master.gain.linearRampToValueAtTime(volume, ac.currentTime + 1.2);

  const src = ac.createBufferSource();
  src.buffer = noiseBuffer(ac);
  src.loop = true;

  const filter = ac.createBiquadFilter();
  const timers: number[] = [];

  if (id === "rain") {
    filter.type = "highpass";
    filter.frequency.value = 900;
  } else if (id === "ocean") {
    filter.type = "lowpass";
    filter.frequency.value = 500;
    const lfo = ac.createOscillator();
    const lfoGain = ac.createGain();
    lfo.frequency.value = 0.11;
    lfoGain.gain.value = 320;
    lfo.connect(lfoGain).connect(filter.frequency);
    lfo.start();
    timers.push(window.setTimeout(() => lfo.stop(), 3_600_000));
  } else if (id === "woods") {
    filter.type = "bandpass";
    filter.frequency.value = 1400;
    filter.Q.value = 0.6;
    // occasional soft bird chirps
    const chirp = () => {
      const o = ac.createOscillator();
      const g = ac.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(1600 + Math.random() * 900, ac.currentTime);
      o.frequency.linearRampToValueAtTime(2400 + Math.random() * 600, ac.currentTime + 0.12);
      g.gain.setValueAtTime(0, ac.currentTime);
      g.gain.linearRampToValueAtTime(volume * 0.22, ac.currentTime + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.35);
      o.connect(g).connect(master);
      o.start();
      o.stop(ac.currentTime + 0.4);
      timers.push(window.setTimeout(chirp, 2500 + Math.random() * 5000));
    };
    timers.push(window.setTimeout(chirp, 2000));
  } else if (id === "campfire") {
    filter.type = "lowpass";
    filter.frequency.value = 750;
    const crackle = () => {
      const o = ac.createBufferSource();
      o.buffer = noiseBuffer(ac, 0.12);
      const g = ac.createGain();
      const hp = ac.createBiquadFilter();
      hp.type = "highpass";
      hp.frequency.value = 1800;
      g.gain.setValueAtTime(volume * (0.25 + Math.random() * 0.5), ac.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.12);
      o.connect(hp).connect(g).connect(master);
      o.start();
      timers.push(window.setTimeout(crackle, 120 + Math.random() * 700));
    };
    timers.push(window.setTimeout(crackle, 300));
  } else {
    filter.type = "lowpass";
    filter.frequency.value = 3000;
  }

  src.connect(filter).connect(master);
  src.start();

  current = {
    id,
    stop: () => {
      timers.forEach((t) => window.clearTimeout(t));
      try {
        master.gain.cancelScheduledValues(ac.currentTime);
        master.gain.setValueAtTime(master.gain.value, ac.currentTime);
        master.gain.linearRampToValueAtTime(0, ac.currentTime + 0.4);
        window.setTimeout(() => {
          src.stop();
          master.disconnect();
        }, 500);
      } catch {
        /* already stopped */
      }
    },
  };
  return true;
}

/** Short encouraging chime. */
export function chime(kind: "good" | "try" | "tap" = "good", quiet = false) {
  const ac = audio();
  if (!ac) return;
  const notes = kind === "good" ? [523, 659, 784] : kind === "try" ? [392, 349] : [660];
  const vol = (quiet ? 0.05 : 0.12) * 1;
  notes.forEach((f, i) => {
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = "sine";
    o.frequency.value = f;
    const t = ac.currentTime + i * 0.11;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
    o.connect(g).connect(ac.destination);
    o.start(t);
    o.stop(t + 0.45);
  });
}
