"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const PHRASES = [
  "Список задач на день\u00a0вызывает панику?",
  "Инерция не даёт сделать\u00a0первый шаг?",
  "Вечером кажется, что день\u00a0прошёл впустую?",
];
// Индексы шагов: 0..PHRASES.length-1 — фразы, PHRASES.length — closing
const CLOSING_STEP = PHRASES.length;
const TOTAL_STEPS = PHRASES.length + 1;

// Минимальная пауза между шагами, мс
const COOLDOWN_MS = 700;
// Порог для свайпа и колёсика
const TOUCH_THRESHOLD = 24;
const WHEEL_THRESHOLD = 6;

type Phase = "before" | "active" | "after";

export function Empathy() {
  const sectionRef = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<Phase>("before");

  // Рефы, чтобы обработчики событий видели актуальные значения без пересоздания.
  const phaseRef = useRef<Phase>(phase);
  const stepRef = useRef(step);
  const cooldownUntilRef = useRef(0);

  useLayoutEffect(() => {
    phaseRef.current = phase;
  }, [phase]);
  useLayoutEffect(() => {
    stepRef.current = step;
  }, [step]);

  const lockScroll = useCallback(() => {
    const scrollBarComp = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    document.body.style.overscrollBehavior = "none";
    if (scrollBarComp > 0) document.body.style.paddingRight = `${scrollBarComp}px`;
  }, []);

  const unlockScroll = useCallback(() => {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.body.style.touchAction = "";
    document.body.style.overscrollBehavior = "";
    document.body.style.paddingRight = "";
  }, []);

  const engage = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    // Снэп к началу секции, чтобы sticky-панель была ровно в viewport
    window.scrollTo({ top: section.offsetTop, behavior: "auto" });
    phaseRef.current = "active";
    stepRef.current = 0;
    setStep(0);
    setPhase("active");
    cooldownUntilRef.current = performance.now() + 250;
    lockScroll();
  }, [lockScroll]);

  const exit = useCallback(
    (direction: 1 | -1) => {
      const section = sectionRef.current;
      unlockScroll();
      phaseRef.current = direction === 1 ? "after" : "before";
      setPhase(direction === 1 ? "after" : "before");
      if (!section) return;
      const target =
        direction === 1
          ? section.offsetTop + section.offsetHeight
          : Math.max(0, section.offsetTop - 2);
      // Следующий кадр — чтобы overflow реально снялся
      requestAnimationFrame(() => {
        window.scrollTo({ top: target, behavior: "auto" });
      });
    },
    [unlockScroll]
  );

  const advance = useCallback(
    (dir: 1 | -1) => {
      if (phaseRef.current !== "active") return;
      const now = performance.now();
      if (now < cooldownUntilRef.current) return;
      cooldownUntilRef.current = now + COOLDOWN_MS;

      const next = stepRef.current + dir;
      if (next > CLOSING_STEP) {
        exit(1);
        return;
      }
      if (next < 0) {
        exit(-1);
        return;
      }
      stepRef.current = next;
      setStep(next);
    },
    [exit]
  );

  // Следим за положением секции: когда верх блока доходит до верха viewport — активируемся.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const check = () => {
      if (phaseRef.current !== "before" && phaseRef.current !== "after") return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      if (phaseRef.current === "before") {
        // Секция заняла весь viewport (или почти) и её верх пересёк верх экрана
        if (rect.top <= 2 && rect.bottom > vh * 0.5) {
          engage();
        }
      } else if (phaseRef.current === "after") {
        // Если пользователь промотал назад и секция снова ниже экрана — сбрасываем к before.
        if (rect.top > 4) {
          phaseRef.current = "before";
          setPhase("before");
        }
      }
    };

    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    check();

    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [engage]);

  // Перехватываем ввод в активной фазе.
  useEffect(() => {
    if (phase !== "active") return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) < WHEEL_THRESHOLD) return;
      advance(e.deltaY > 0 ? 1 : -1);
    };

    let touchStartY: number | null = null;
    let touchConsumed = false;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? null;
      touchConsumed = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (touchStartY === null) return;
      e.preventDefault();
      if (touchConsumed) return;
      const currentY = e.touches[0]?.clientY ?? touchStartY;
      const delta = touchStartY - currentY;
      if (Math.abs(delta) > TOUCH_THRESHOLD) {
        touchConsumed = true;
        advance(delta > 0 ? 1 : -1);
      }
    };
    const onTouchEnd = () => {
      touchStartY = null;
      touchConsumed = false;
    };

    const onKey = (e: KeyboardEvent) => {
      if (
        e.key === "ArrowDown" ||
        e.key === "PageDown" ||
        e.key === " " ||
        e.key === "Spacebar"
      ) {
        e.preventDefault();
        advance(1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        advance(-1);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, [phase, advance]);

  // На всякий случай снимаем лок при размонтировании
  useEffect(() => {
    return () => {
      unlockScroll();
    };
  }, [unlockScroll]);

  const isDark = phase === "active" || phase === "after";
  const showClosing =
    (phase === "active" && step === CLOSING_STEP) || phase === "after";
  const activePhrase =
    phase === "active" && step < CLOSING_STEP ? PHRASES[step] : null;

  return (
    <section
      id="method"
      ref={sectionRef}
      className="relative"
      style={{ height: "100vh" }}
    >
      <motion.div
        initial={false}
        animate={{ backgroundColor: isDark ? "#0a0a0c" : "#ffffff" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden"
        style={phase === "active" ? { touchAction: "none" } : undefined}
      >
        {/* Мягкое свечение в темноте */}
        <AnimatePresence>
          {isDark && (
            <motion.div
              key="glow"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="pointer-events-none absolute inset-0"
            >
              <div
                className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(27,170,150,0.10), transparent 70%)",
                  filter: "blur(60px)",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative mx-auto flex h-full w-full max-w-[1100px] flex-col items-center justify-center px-6 text-center">
          <div className="relative flex items-center justify-center">
            <AnimatePresence mode="wait" initial={false}>
              {activePhrase && (
                <motion.h2
                  key={step}
                  initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -22, filter: "blur(8px)" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="max-w-[22ch] text-[36px] font-semibold leading-[1.08] tracking-[-0.02em] text-white sm:text-[54px] lg:text-[72px]"
                >
                  {activePhrase}
                </motion.h2>
              )}

              {showClosing && (
                <motion.div
                  key="closing"
                  initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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

        {/* Прогресс-точки */}
        {phase === "active" && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2"
          >
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <motion.span
                key={i}
                animate={{
                  backgroundColor:
                    i === step ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.28)",
                  scale: i === step ? 1.25 : 1,
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="block h-1.5 w-1.5 rounded-full"
              />
            ))}
          </div>
        )}

        {/* Подсказка «Скролл» — только на первом шаге */}
        <AnimatePresence>
          {phase === "active" && step === 0 && (
            <motion.div
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.55 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              aria-hidden="true"
              className="pointer-events-none absolute bottom-20 left-1/2 -translate-x-1/2 text-[11px] font-medium uppercase tracking-[0.28em] text-white/60"
            >
              Скролл
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
