"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PhoneMockup } from "@/components/visual/PhoneMockup";

const MORPH_WORDS = ["хаоса", "выгорания", "прокрастинации"];

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-28 sm:pt-36 lg:pt-40"
    >
      {/* Background — soft teal blurs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          className="absolute -right-40 -top-20 h-[520px] w-[520px] rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(56,196,176,0.35), transparent 70%)",
          }}
        />
        <div
          className="absolute -left-32 top-40 h-[420px] w-[420px] rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(109,220,202,0.28), transparent 70%)",
          }}
        />
        <div
          className="absolute left-1/2 top-[40%] h-[680px] w-[680px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(27,170,150,0.22), transparent 65%)",
          }}
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #0a0a0c 1px, transparent 1px), linear-gradient(to bottom, #0a0a0c 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse at 50% 20%, black 45%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 50% 20%, black 45%, transparent 75%)",
          }}
        />
      </div>

      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-12 px-6 pb-4 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:pb-6">
        {/* Left: copy */}
        <div className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-black/[0.06] bg-white/60 px-3 py-1 text-[12px] font-medium text-[var(--color-ink)]/70 backdrop-blur-xl"
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--color-teal-500)" }}
            />
            Новая версия · v2.4 «Дыхание»
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            className="mt-5 text-[46px] font-semibold leading-[1.02] tracking-[-0.02em] text-[var(--color-ink)] sm:text-[64px] lg:text-[80px]"
          >
            <span className="block">Вытащи себя</span>
            <span className="block">
              из&nbsp;
              <MorphWord words={MORPH_WORDS} />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
            className="mt-6 max-w-[520px] text-[16.5px] leading-relaxed text-[var(--color-ink)]/60 sm:text-[17.5px]"
          >
            SDViGApp — это спокойный инструмент продуктивности. Разбирает утро,
            день и вечер на честные шаги. Убирает инерцию, возвращает фокус,
            мягко ведёт к ритму, в котором ты снова чувствуешь себя собой.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <StoreButton store="apple" />
            <StoreButton store="google" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.45 }}
            className="mt-8 flex items-center gap-4 text-[12.5px] text-[var(--color-ink)]/50"
          >
            <div className="flex -space-x-2">
              {["#C9A14A", "#1baa96", "#0f7267"].map((c, i) => (
                <span
                  key={i}
                  className="grid h-6 w-6 place-items-center rounded-full border-2 border-white text-[10px] font-semibold text-white"
                  style={{ background: c }}
                >
                  {["Н", "И", "М"][i]}
                </span>
              ))}
            </div>
            <span>
              <strong className="font-semibold text-[var(--color-ink)]/75">
                12&nbsp;400+
              </strong>{" "}
              человек уже дышат ровнее
            </span>
          </motion.div>
        </div>

        {/* Right: phone */}
        <div className="relative flex items-center justify-center py-8 lg:py-0">
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}

function MorphWord({ words }: { words: readonly string[] }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <MorphWordStatic words={words} />;
  }

  return <MorphWordTypewriter words={words} />;
}

function MorphWordStatic({ words }: { words: readonly string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((j) => (j + 1) % words.length), 2800);
    return () => clearInterval(id);
  }, [words.length]);
  const word = words[i] ?? "";
  return (
    <span className="relative inline-block align-baseline">
      <span aria-hidden="true" className="invisible whitespace-nowrap">
        прокрастинации
      </span>
      <span
        className="absolute inset-0 whitespace-nowrap italic"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 400,
          color: "var(--color-teal-600)",
          letterSpacing: "-0.01em",
        }}
      >
        {word}
      </span>
    </span>
  );
}

function MorphWordTypewriter({ words }: { words: readonly string[] }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [phase, setPhase] = useState<"typing" | "pause" | "deleting">("typing");

  const target = words[wordIndex] ?? "";

  useEffect(() => {
    let id: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (display.length < target.length) {
        id = setTimeout(() => {
          setDisplay((s) => target.slice(0, s.length + 1));
        }, 52);
      } else {
        id = setTimeout(() => setPhase("pause"), 720);
      }
    } else if (phase === "pause") {
      id = setTimeout(() => setPhase("deleting"), 380);
    } else {
      if (display.length > 0) {
        id = setTimeout(() => {
          setDisplay((s) => s.slice(0, -1));
        }, 36);
      } else {
        id = setTimeout(() => {
          setWordIndex((j) => (j + 1) % words.length);
          setPhase("typing");
        }, 220);
      }
    }

    return () => clearTimeout(id);
  }, [display, phase, target, wordIndex, words.length]);

  return (
    <span className="relative inline-block align-baseline">
      <span aria-hidden="true" className="invisible whitespace-nowrap">
        прокрастинации
      </span>
      <span
        className="absolute inset-0 whitespace-nowrap italic"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 400,
          color: "var(--color-teal-600)",
          letterSpacing: "-0.01em",
        }}
      >
        {display}
        <span
          aria-hidden="true"
          className="typewriter-caret ml-[2px] inline-block h-[0.72em] w-[2px] translate-y-[0.08em] rounded-sm bg-[var(--color-teal-600)] align-baseline"
        />
      </span>
    </span>
  );
}

function StoreButton({ store }: { store: "apple" | "google" }) {
  const isApple = store === "apple";
  return (
    <motion.a
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      href={isApple ? "#apple" : "#google"}
      aria-label={isApple ? "Скачать в App Store" : "Скачать в Google Play"}
      className="inline-flex h-14 items-center gap-3 rounded-2xl px-5 text-white shadow-[0_14px_30px_-18px_rgba(10,10,12,0.8)] transition-colors"
      style={{
        background:
          "linear-gradient(180deg, #1b1b1e 0%, #0a0a0c 100%)",
      }}
    >
      <span className="grid h-7 w-7 place-items-center">
        {isApple ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M16.4 12.3c0-2.1 1.7-3.1 1.8-3.2-1-1.5-2.5-1.7-3-1.7-1.3-.1-2.5.7-3.2.7-.6 0-1.7-.7-2.8-.7-1.4 0-2.8.8-3.5 2.1-1.5 2.7-.4 6.6 1.1 8.8.7 1.1 1.6 2.3 2.7 2.2 1.1 0 1.5-.7 2.8-.7s1.7.7 2.9.7c1.2 0 2-1.1 2.7-2.2.8-1.3 1.2-2.5 1.2-2.5s-2.2-.9-2.2-3.5ZM14.3 5.8C14.9 5 15.3 4 15.2 3c-.9 0-2 .6-2.6 1.4-.5.7-1 1.7-.9 2.7 1 .1 2-.5 2.6-1.3Z"
              fill="currentColor"
            />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M4.2 3.3c-.4.4-.6 1-.6 1.7v14c0 .7.2 1.3.6 1.7l8-8-8-9.4Z"
              fill="#00C7B6"
            />
            <path
              d="m14.6 10.9 2.6-1.5-10.5-6a1.7 1.7 0 0 0-2.5.9l10.4 6.6Z"
              fill="#FFD43B"
            />
            <path
              d="M17.2 14.6 14.6 13.1l-2.4 2.6 2.1 2.1c.5.3 1.1.3 1.7-.1l7.2-4.2-5.9 1.1Z"
              fill="#F46464"
            />
            <path
              d="M14.6 13.1 4.2 20.7a1.7 1.7 0 0 0 2.5.5l10.5-6-2.6-2.1Z"
              fill="#4AC076"
            />
          </svg>
        )}
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[10.5px] font-medium uppercase tracking-widest text-white/60">
          {isApple ? "Скачать в" : "Доступно в"}
        </span>
        <span className="mt-1 text-[16.5px] font-semibold">
          {isApple ? "App Store" : "Google Play"}
        </span>
      </span>
    </motion.a>
  );
}
