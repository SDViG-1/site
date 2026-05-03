"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Circle } from "lucide-react";
import {
  ElegantShape,
  heroFadeUpVariants,
} from "@/components/ui/shape-landing-hero";

const MORPH_WORDS = ["хаоса", "выгорания", "прокрастинации"];

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate min-h-[100dvh] w-full overflow-hidden bg-[#030303] pt-28 sm:pt-36 lg:pt-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-500/[0.08] via-transparent to-teal-500/[0.06] blur-3xl"
      />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-orange-500/[0.14]"
          className="left-[-10%] top-[15%] md:left-[-5%] md:top-[20%]"
        />
        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-teal-500/[0.12]"
          className="right-[-5%] top-[70%] md:right-[0%] md:top-[75%]"
        />
        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-amber-500/[0.14]"
          className="left-[5%] bottom-[5%] md:left-[10%] md:bottom-[10%]"
        />
        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-orange-400/[0.12]"
          className="right-[15%] top-[10%] md:right-[20%] md:top-[15%]"
        />
        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-amber-400/[0.1]"
          className="left-[20%] top-[5%] md:left-[25%] md:top-[10%]"
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[960px] flex-col items-center px-6 pb-16 text-center lg:pb-24">
        <motion.div
          custom={0}
          variants={heroFadeUpVariants}
          initial="hidden"
          animate="visible"
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 md:mb-10"
        >
          <Circle className="h-2 w-2 fill-amber-500/90 text-amber-500/90" />
          <span className="text-[12px] font-medium tracking-wide text-white/60">
            Новая версия · v2.4 «Дыхание»
          </span>
        </motion.div>

        <motion.div
          custom={1}
          variants={heroFadeUpVariants}
          initial="hidden"
          animate="visible"
          className="w-full"
        >
          <h1 className="text-[46px] font-semibold leading-[1.02] tracking-[-0.02em] sm:text-[64px] lg:text-[80px]">
            <span className="block bg-gradient-to-b from-white to-white/75 bg-clip-text text-transparent">
              Вытащи себя
            </span>
            <span className="mt-1 block w-full text-white/90 lg:text-left">
              из&nbsp;
              <MorphWord words={MORPH_WORDS} />
            </span>
          </h1>
        </motion.div>

        <motion.p
          custom={2}
          variants={heroFadeUpVariants}
          initial="hidden"
          animate="visible"
          className="mt-8 max-w-[520px] text-[16.5px] font-light leading-relaxed tracking-wide text-white/45 sm:text-[17.5px]"
        >
          SDViGApp — это спокойный инструмент продуктивности. Разбирает утро,
          день и вечер на честные шаги. Убирает инерцию, возвращает фокус,
          мягко ведёт к ритму, в котором ты снова чувствуешь себя собой.
        </motion.p>

        <motion.div
          custom={3}
          variants={heroFadeUpVariants}
          initial="hidden"
          animate="visible"
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:items-center"
        >
          <StoreButton store="apple" />
          <StoreButton store="google" />
        </motion.div>

        <motion.div
          custom={4}
          variants={heroFadeUpVariants}
          initial="hidden"
          animate="visible"
          className="mt-10 flex flex-wrap items-center justify-center gap-4 text-[12.5px] text-white/45"
        >
          <div className="flex -space-x-2">
            {["#C9A14A", "#1baa96", "#0f7267"].map((c, i) => (
              <span
                key={i}
                className="grid h-6 w-6 place-items-center rounded-full border-2 border-[#030303] text-[10px] font-semibold text-white"
                style={{ background: c }}
              >
                {["Н", "И", "М"][i]}
              </span>
            ))}
          </div>
          <span>
            <strong className="font-semibold text-white/70">12&nbsp;400+</strong>{" "}
            человек уже дышат ровнее
          </span>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80" />
    </section>
  );
}

const morphWordClass =
  "bg-gradient-to-r from-orange-400 via-amber-400 to-amber-600 bg-clip-text text-transparent";

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
    <span className="relative inline-block align-baseline lg:text-left">
      <span aria-hidden="true" className="invisible whitespace-nowrap">
        прокрастинации
      </span>
      <span
        className={`absolute inset-0 whitespace-nowrap italic lg:text-left ${morphWordClass}`}
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 400,
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
    <span className="relative inline-block align-baseline lg:text-left">
      <span aria-hidden="true" className="invisible whitespace-nowrap">
        прокрастинации
      </span>
      <span
        className={`absolute inset-0 whitespace-nowrap italic lg:text-left ${morphWordClass}`}
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 400,
          letterSpacing: "-0.01em",
        }}
      >
        {display}
        <span
          aria-hidden="true"
          className="typewriter-caret ml-[2px] inline-block h-[0.72em] w-[2px] translate-y-[0.08em] rounded-sm bg-amber-400 align-baseline"
        />
      </span>
    </span>
  );
}

function StoreButton({ store }: { store: "apple" | "google" }) {
  const isApple = store === "apple";
  const href = isApple
    ? "https://apps.apple.com/app/sdvigapp/id0"
    : "https://play.google.com/store/apps/details?id=app.sdvig";
  return (
    <motion.a
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={isApple ? "Скачать в App Store" : "Скачать в Google Play"}
      className="inline-flex h-14 items-center gap-3 rounded-2xl border border-white/[0.08] px-5 text-white shadow-[0_14px_30px_-18px_rgba(0,0,0,0.85)] transition-colors"
      style={{
        background: "linear-gradient(180deg, #1b1b1e 0%, #0a0a0c 100%)",
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
