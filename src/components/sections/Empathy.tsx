"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const PHRASES = [
  "Список задач на день\u00a0вызывает панику?",
  "Инерция не даёт сделать\u00a0первый шаг?",
  "Вечером кажется, что день\u00a0прошёл впустую?",
];
const CLOSING_STEP = PHRASES.length;
const TOTAL_STEPS = PHRASES.length + 1;

/** Высота «дорожки» скролла: шаги меняются по положению страницы, без блокировки body */
const SECTION_HEIGHT_VH = TOTAL_STEPS * 72;

type Phase = "before" | "active" | "after";

export function Empathy() {
  const sectionRef = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<Phase>("before");
  const reduceMotion = useReducedMotion();
  const rafRef = useRef<number | null>(null);

  const syncFromScroll = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;

    const top = el.offsetTop;
    const vh = window.innerHeight;
    const end = top + el.offsetHeight - vh;
    const y = window.scrollY;

    let nextPhase: Phase;
    let nextStep = 0;

    if (y < top - 0.5) {
      nextPhase = "before";
      nextStep = 0;
    } else if (y >= end - 0.5) {
      nextPhase = "after";
      nextStep = CLOSING_STEP;
    } else {
      nextPhase = "active";
      const span = Math.max(1, end - top);
      const progress = (y - top) / span;
      const raw = progress * TOTAL_STEPS;
      nextStep = Math.min(CLOSING_STEP, Math.max(0, Math.floor(raw - 1e-9)));
    }

    setPhase((p) => (p === nextPhase ? p : nextPhase));
    setStep((s) => (s === nextStep ? s : nextStep));
  }, []);

  const scheduleSync = useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      syncFromScroll();
    });
  }, [syncFromScroll]);

  useLayoutEffect(() => {
    syncFromScroll();
  }, [syncFromScroll]);

  useEffect(() => {
    window.addEventListener("scroll", scheduleSync, { passive: true });
    window.addEventListener("resize", scheduleSync);
    return () => {
      window.removeEventListener("scroll", scheduleSync);
      window.removeEventListener("resize", scheduleSync);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [scheduleSync]);

  const isDark = phase === "active" || phase === "after";
  const showClosing =
    (phase === "active" && step === CLOSING_STEP) || phase === "after";
  const activePhrase =
    phase === "active" && step < CLOSING_STEP ? PHRASES[step] : null;

  const phraseEase = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      id="method"
      ref={sectionRef}
      className="relative"
      style={{ height: `${SECTION_HEIGHT_VH}dvh` }}
    >
      <motion.div
        initial={false}
        animate={{ backgroundColor: isDark ? "#0a0a0c" : "#ffffff" }}
        transition={{ duration: 0.75, ease: phraseEase }}
        className="sticky top-0 flex h-[100dvh] w-full items-center justify-center overflow-hidden"
      >
        <AnimatePresence>
          {isDark && (
            <motion.div
              key="glow"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0.2 : 0.6 }}
              className="pointer-events-none absolute inset-0"
            >
              <div
                className="absolute left-1/2 top-1/2 h-[min(900px,140vw)] w-[min(900px,140vw)] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(27,170,150,0.10), transparent 70%)",
                  filter: reduceMotion ? undefined : "blur(56px)",
                  willChange: reduceMotion ? undefined : "opacity",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative mx-auto flex h-full w-full max-w-[1100px] flex-col items-center justify-center px-6 text-center">
          <div className="relative flex min-h-[40vh] items-center justify-center">
            <AnimatePresence mode="wait" initial={false}>
              {activePhrase && (
                <motion.h2
                  key={step}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduceMotion ? 0 : -18 }}
                  transition={{
                    duration: reduceMotion ? 0.2 : 0.5,
                    ease: phraseEase,
                  }}
                  className="max-w-[22ch] text-[36px] font-semibold leading-[1.08] tracking-[-0.02em] text-white sm:text-[54px] lg:text-[72px]"
                >
                  {activePhrase}
                </motion.h2>
              )}

              {showClosing && (
                <motion.div
                  key="closing"
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduceMotion ? 0 : -18 }}
                  transition={{
                    duration: reduceMotion ? 0.2 : 0.6,
                    ease: phraseEase,
                  }}
                  className="flex flex-col items-center gap-5"
                >
                  <span
                    className="inline-block h-12 w-[1px]"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent, rgba(255,255,255,0.55), transparent)",
                    }}
                  />
                  <p
                    className="text-balance px-6 text-[22px] font-medium leading-snug text-white/90 sm:text-[28px] lg:text-[32px]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    SDViGApp — твой спокойный выход.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {phase === "active" && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2"
          >
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <motion.span
                key={i}
                initial={false}
                animate={{
                  backgroundColor:
                    i === step ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.28)",
                  scale: i === step ? 1.25 : 1,
                }}
                transition={{ duration: 0.28, ease: phraseEase }}
                className="block h-1.5 w-1.5 rounded-full"
              />
            ))}
          </div>
        )}

        <AnimatePresence>
          {phase === "active" && step === 0 && (
            <motion.div
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.55 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              aria-hidden="true"
              className="pointer-events-none absolute bottom-20 left-1/2 -translate-x-1/2 text-[11px] font-medium uppercase tracking-[0.28em] text-white/55"
            >
              Скролл
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
