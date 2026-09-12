"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

export const INTRO_SESSION_KEY = "portfolio_intro_session_done";
export const INTRO_REPLAY_EVENT = "portfolio:replay-intro";

/** Clears the “intro already seen” flag and notifies the home page to remount it. */
export function requestIntroReplay() {
  try {
    sessionStorage.removeItem(INTRO_SESSION_KEY);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(INTRO_REPLAY_EVENT));
}

/** Served from `public/audio/` — Next.js does not serve files from the repo root. */
const INTRO_SFX_SRC = "/audio/light-speed.mp3";

/** Skip the quiet lead-in so playback starts on the build into the jump. */
const AUDIO_TRIM_START_S = 2;

const SETTLE_MS = 350;
const SPOOL_MS = 1650;
const JUMP_MS = 1500;
const FLASH_MS = 350;
const REVEAL_MS = 800;
const INTRO_TOTAL_MS =
  SETTLE_MS + SPOOL_MS + JUMP_MS + FLASH_MS + REVEAL_MS;
const FADE_OUT_MS = REVEAL_MS;

const STAR_COUNT = 420;
const MAX_Z = 36;
const SFX_BASE_VOLUME = 0.9;

type Phase = "settle" | "spool" | "jump" | "flash" | "reveal" | "done";

type Star = {
  x: number;
  y: number;
  z: number;
  pz: number;
  cyan: boolean;
};

function spawnStar(randomizeDepth = true): Star {
  const spread = MAX_Z * 0.75;
  return {
    x: (Math.random() - 0.5) * 2 * spread,
    y: (Math.random() - 0.5) * 2 * spread,
    z: randomizeDepth ? Math.random() * MAX_Z + 2 : MAX_Z,
    pz: randomizeDepth ? Math.random() * MAX_Z + 2 : MAX_Z,
    cyan: Math.random() < 0.32,
  };
}

function speedAt(elapsed: number): number {
  if (elapsed < SETTLE_MS) {
    return 0.28 + (elapsed / SETTLE_MS) * 0.45;
  }
  if (elapsed < SETTLE_MS + SPOOL_MS) {
    const t = (elapsed - SETTLE_MS) / SPOOL_MS;
    return 0.73 + t * t * 7.2;
  }
  if (elapsed < SETTLE_MS + SPOOL_MS + JUMP_MS) {
    const t = (elapsed - SETTLE_MS - SPOOL_MS) / JUMP_MS;
    return 7.9 + t * t * 24;
  }
  return 32;
}

export function CinematicIntro({
  onDone,
  forcePlay = false,
}: {
  onDone: () => void;
  /** Skip sessionStorage short-circuit (used when replaying from the header). */
  forcePlay?: boolean;
}) {
  const doneRef = useRef(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const volumeRafRef = useRef(0);
  const mutedRef = useRef(false);
  const audioUnlockedRef = useRef(false);
  const introStartedAtRef = useRef(0);

  const [musicMuted, setMusicMuted] = useState(false);
  const [awaitingGesture, setAwaitingGesture] = useState(true);
  mutedRef.current = musicMuted;

  const [play, setPlay] = useState(true);
  const [phase, setPhase] = useState<Phase>("settle");

  const stopAudio = useCallback(() => {
    cancelAnimationFrame(volumeRafRef.current);
    const a = audioRef.current;
    if (a) {
      a.pause();
      a.volume = 0;
      a.currentTime = AUDIO_TRIM_START_S;
    }
  }, []);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    stopAudio();
    try {
      sessionStorage.setItem(INTRO_SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
    onDoneRef.current();
  }, [stopAudio]);

  const seekToIntroElapsed = (el: HTMLAudioElement) => {
    const elapsedSec = Math.max(
      0,
      (performance.now() - introStartedAtRef.current) / 1000,
    );
    const startAt = AUDIO_TRIM_START_S + elapsedSec;
    if (Number.isFinite(el.duration) && el.duration > startAt + 0.15) {
      try {
        el.currentTime = startAt;
      } catch {
        /* ignore */
      }
    }
  };

  const unlockAudio = useCallback(() => {
    if (doneRef.current || mutedRef.current || audioUnlockedRef.current) {
      return;
    }
    const el = audioRef.current;
    if (!el) return;

    // Mark unlocked first so a late muted-autoplay reject cannot remute us.
    audioUnlockedRef.current = true;
    setAwaitingGesture(false);

    // iOS: unmuting an already-playing element is not enough — pause, then
    // play() unmuted inside this same user gesture.
    try {
      el.pause();
    } catch {
      /* ignore */
    }
    el.muted = false;
    el.loop = false;
    el.volume = SFX_BASE_VOLUME;
    seekToIntroElapsed(el);
    void el.play().catch(() => {
      if (doneRef.current || mutedRef.current) return;
      audioUnlockedRef.current = false;
      setAwaitingGesture(true);
    });
  }, []);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      finish();
      return;
    }
    try {
      if (!forcePlay && sessionStorage.getItem(INTRO_SESSION_KEY)) {
        finish();
        return;
      }
    } catch {
      /* ignore */
    }
    setPlay(true);
  }, [finish, forcePlay]);

  useEffect(() => {
    if (!play) return;
    const unlock = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("[data-intro-control]")) return;
      unlockAudio();
    };
    // Capture so the first tap wins even if a child stops bubbling.
    // touchstart covers older mobile browsers that delay or skip pointerdown.
    window.addEventListener("pointerdown", unlock, { capture: true });
    window.addEventListener("touchstart", unlock, { capture: true });
    window.addEventListener("keydown", unlock, { capture: true });
    return () => {
      window.removeEventListener("pointerdown", unlock, { capture: true });
      window.removeEventListener("touchstart", unlock, { capture: true });
      window.removeEventListener("keydown", unlock, { capture: true });
    };
  }, [play, unlockAudio]);

  useEffect(() => {
    if (!play) return;

    let cancelled = false;
    const tSpool = window.setTimeout(() => {
      if (!cancelled) setPhase("spool");
    }, SETTLE_MS);
    const tJump = window.setTimeout(() => {
      if (!cancelled) setPhase("jump");
    }, SETTLE_MS + SPOOL_MS);
    const tFlash = window.setTimeout(() => {
      if (!cancelled) setPhase("flash");
    }, SETTLE_MS + SPOOL_MS + JUMP_MS);
    const tReveal = window.setTimeout(() => {
      if (!cancelled) setPhase("reveal");
    }, SETTLE_MS + SPOOL_MS + JUMP_MS + FLASH_MS);
    const tDone = window.setTimeout(() => {
      if (!cancelled) {
        setPhase("done");
        finish();
      }
    }, INTRO_TOTAL_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(tSpool);
      window.clearTimeout(tJump);
      window.clearTimeout(tFlash);
      window.clearTimeout(tReveal);
      window.clearTimeout(tDone);
    };
  }, [play, finish]);

  useEffect(() => {
    if (!play) return;
    introStartedAtRef.current = performance.now();

    const el = audioRef.current;
    if (el) {
      el.loop = false;
      el.muted = true;
      el.volume = SFX_BASE_VOLUME;
      // Buffer muted so the first tap can start audible playback immediately.
      const warm = () => {
        if (!el || doneRef.current || audioUnlockedRef.current) return;
        const trim = AUDIO_TRIM_START_S;
        if (Number.isFinite(el.duration) && el.duration > trim + 0.35) {
          try {
            el.currentTime = trim;
          } catch {
            /* ignore */
          }
        }
        void el.play().catch(() => {});
      };
      if (el.readyState >= 1) {
        warm();
      } else {
        el.addEventListener("loadedmetadata", warm, { once: true });
      }
    }

    const tick = () => {
      if (doneRef.current) return;
      const audio = audioRef.current;
      if (audio) {
        const elapsed = performance.now() - introStartedAtRef.current;
        const fadeStart = INTRO_TOTAL_MS - FADE_OUT_MS;
        const fadeMul =
          elapsed >= fadeStart
            ? Math.max(0, 1 - (elapsed - fadeStart) / FADE_OUT_MS)
            : 1;
        audio.volume = SFX_BASE_VOLUME * fadeMul;
        audio.muted = mutedRef.current || !audioUnlockedRef.current;
      }
      volumeRafRef.current = requestAnimationFrame(tick);
    };
    volumeRafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(volumeRafRef.current);
    };
  }, [play]);

  useEffect(() => {
    if (!play) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const stars = Array.from({ length: STAR_COUNT }, () => spawnStar());
    const t0 = performance.now();
    let last = t0;
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const tick = (now: number) => {
      if (doneRef.current) return;
      const dt = Math.min((now - last) / 16.667, 2.5);
      last = now;
      const elapsed = now - t0;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cx = w / 2;
      const cy = h / 2;
      const fov = Math.min(w, h) * 0.55;
      const speed = speedAt(elapsed);

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, w, h);

      for (const star of stars) {
        star.pz = star.z;
        star.z -= speed * dt * 0.22;

        if (star.z < 0.75) {
          const next = spawnStar(false);
          star.x = next.x;
          star.y = next.y;
          star.z = next.z;
          star.pz = next.z;
          star.cyan = next.cyan;
          continue;
        }

        const sx = (star.x / star.z) * fov + cx;
        const sy = (star.y / star.z) * fov + cy;
        const px = (star.x / star.pz) * fov + cx;
        const py = (star.y / star.pz) * fov + cy;

        if (
          (sx < -40 && px < -40) ||
          (sy < -40 && py < -40) ||
          (sx > w + 40 && px > w + 40) ||
          (sy > h + 40 && py > h + 40)
        ) {
          continue;
        }

        const proximity = 1 - star.z / MAX_Z;
        const alpha = 0.28 + proximity * 0.72;
        ctx.strokeStyle = star.cyan
          ? `rgba(75, 213, 238, ${alpha})`
          : `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 0.7 + proximity * (speed > 8 ? 2.1 : 1.1);
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      }

      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [play]);

  useEffect(() => {
    if (!play || phase === "done") return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        finish();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [play, phase, finish]);

  const toggleMusicMuted = () => {
    const next = !mutedRef.current;
    mutedRef.current = next;
    setMusicMuted(next);
    const el = audioRef.current;
    if (!el) return;
    el.muted = next;
    el.volume = SFX_BASE_VOLUME;
    if (!next) {
      audioUnlockedRef.current = true;
      setAwaitingGesture(false);
      seekToIntroElapsed(el);
      void el.play().catch(() => {});
    } else {
      el.pause();
    }
  };

  if (!play || phase === "done") {
    return null;
  }

  const fading = phase === "reveal";
  const showFlash = phase === "flash" || phase === "reveal";

  return (
    <div
      className={`fixed inset-0 z-[60] flex flex-col bg-black transition-opacity ease-out ${
        fading ? "opacity-0 duration-[800ms]" : "opacity-100 duration-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Intro sequence"
      aria-describedby="intro-caption"
    >
      <audio
        ref={audioRef}
        src={INTRO_SFX_SRC}
        preload="auto"
        playsInline
        aria-hidden
      />

      <div className="absolute inset-0 bg-[var(--bg-deep)]" aria-hidden />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 42%, rgba(0,0,0,0.55) 100%)",
        }}
        aria-hidden
      />

      {showFlash ? (
        <div
          className="pointer-events-none absolute inset-0 motion-safe:animate-warp-flash"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.95) 0%, rgba(75,213,238,0.55) 38%, transparent 74%)",
          }}
          aria-hidden
        />
      ) : null}

      <p
        id="intro-caption"
        className="pointer-events-none absolute inset-x-0 top-[42%] z-10 px-6 text-center font-[family-name:var(--font-mono)] text-sm tracking-[0.2em] text-[var(--crawl-blue)] motion-safe:animate-intro-caption sm:text-base"
        style={{ textShadow: "0 0 14px rgba(75, 213, 238, 0.45)" }}
      >
        Accelerating to Planet Rishi..
      </p>
      {awaitingGesture ? (
        <p className="pointer-events-none absolute inset-x-0 top-[52%] z-10 px-6 text-center font-[family-name:var(--font-mono)] text-xs tracking-wide text-[var(--text-muted)]">
          Tap anywhere for sound
        </p>
      ) : null}

      <div className="relative z-20 mt-auto flex flex-wrap items-end justify-end gap-3 p-4">
        <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-4">
          {!awaitingGesture ? (
            <button
              type="button"
              data-intro-control
              className="min-h-[44px] rounded border border-[var(--card-border)] bg-black/60 px-3 py-2 font-[family-name:var(--font-mono)] text-xs text-[var(--crawl-blue)] backdrop-blur-sm hover:border-[var(--star-yellow)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--star-yellow)] sm:text-sm"
              onClick={(e) => {
                e.stopPropagation();
                toggleMusicMuted();
              }}
              aria-pressed={musicMuted}
              aria-label={musicMuted ? "Unmute intro sound" : "Mute intro sound"}
            >
              {musicMuted ? "Unmute" : "Mute"}
            </button>
          ) : null}
          <button
            type="button"
            data-intro-control
            className="min-h-[44px] min-w-[44px] rounded border border-[var(--card-border)] bg-black/60 px-4 py-2 font-[family-name:var(--font-mono)] text-sm text-[var(--crawl-blue)] backdrop-blur-sm hover:border-[var(--star-yellow)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--star-yellow)]"
            onClick={(e) => {
              e.stopPropagation();
              finish();
            }}
          >
            Skip intro
          </button>
        </div>
      </div>
    </div>
  );
}
