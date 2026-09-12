"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { INTRO_REPLAY_EVENT } from "@/components/cinematic-intro";

const CinematicIntro = dynamic(
  () =>
    import("@/components/cinematic-intro").then((m) => ({
      default: m.CinematicIntro,
    })),
  { ssr: false },
);

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

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("replayIntro") === "1") {
      window.history.replaceState({}, "", "/");
    }

    const onReplay = () => replayIntro();
    window.addEventListener(INTRO_REPLAY_EVENT, onReplay);
    return () => window.removeEventListener(INTRO_REPLAY_EVENT, onReplay);
  }, [replayIntro]);

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
        <CinematicIntro
          key={introKey}
          forcePlay={forcePlay}
          onDone={handleDone}
        />
      ) : null}
      <div
        id="home-inner"
        aria-hidden={!introDone}
        className={introDone ? "" : "pointer-events-none select-none"}
      >
        {children}
      </div>
    </>
  );
}
