"use client";

import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import {
  CinematicIntro,
  INTRO_REPLAY_EVENT,
  INTRO_SESSION_KEY,
} from "@/components/cinematic-intro";

export function HomePageClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [introDone, setIntroDone] = useState(false);
  const [introKey, setIntroKey] = useState(0);
  const [forcePlay, setForcePlay] = useState(false);

  const handleDone = useCallback(() => {
    setIntroDone(true);
    setForcePlay(false);
  }, []);

  const replayIntro = useCallback(() => {
    setForcePlay(true);
    setIntroDone(false);
    setIntroKey((k) => k + 1);
  }, []);

  useLayoutEffect(() => {
    const replayQuery =
      new URLSearchParams(window.location.search).get("replayIntro") === "1";
    if (replayQuery) {
      window.history.replaceState({}, "", "/");
      setForcePlay(true);
      setIntroDone(false);
      return;
    }

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem(INTRO_SESSION_KEY) === "1";
    } catch {
      /* ignore */
    }
    if (reduced || seen) {
      setIntroDone(true);
    }
  }, []);

  useEffect(() => {
    const onReplay = () => replayIntro();
    window.addEventListener(INTRO_REPLAY_EVENT, onReplay);
    return () => window.removeEventListener(INTRO_REPLAY_EVENT, onReplay);
  }, [replayIntro]);

  useLayoutEffect(() => {
    if (introDone) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [introDone]);

  useEffect(() => {
    if (introDone) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const link = target?.closest?.('a[href="#main-content"]');
      if (link) {
        e.preventDefault();
        handleDone();
        window.requestAnimationFrame(() => {
          document.getElementById("main-content")?.focus();
        });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [introDone, handleDone]);

  return (
    <>
      {!introDone ? (
        <>
          <style>{`header, footer { visibility: hidden !important; }`}</style>
          <div className="fixed inset-0 z-[55] bg-black" aria-hidden />
          <CinematicIntro
            key={introKey}
            forcePlay={forcePlay}
            onDone={handleDone}
          />
        </>
      ) : null}
      <div
        id="home-inner"
        aria-hidden={!introDone}
        className={
          introDone ? "" : "invisible pointer-events-none select-none"
        }
      >
        {children}
      </div>
    </>
  );
}
