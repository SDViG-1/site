"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const PHRASES = [
  "Список задач на день\u00a0вызывает панику?",
  "Инерция не даёт сделать\u00a0первый шаг?",
  "Вечером кажется, что день\u00a0прошёл впустую?",
];

export function Empathy() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const bgProgress = useTransform(scrollYProgress, [0.08, 0.4], [0, 1]);
  const bg = useTransform(
    bgProgress,
    [0, 1],
    ["#ffffff", "#0a0a0c"]
  );

  const starsOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.45, 0.95, 1],
    [0, 1, 1, 0]
  );

  return (
    <section
      id="method"
      ref={ref}
      className="relative"
      style={{ height: "200vh" }}
    >
      <motion.div
        style={{ background: bg }}
        className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden"
      >
        {/* Soft ambient glow — appears once we're in the dark */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: starsOpacity }}
          className="pointer-events-none absolute inset-0"
        >
          <div
            className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(27,170,150,0.10), transparent 70%)",
            }}
          />
          <Stars />
        </motion.div>

        <div className="relative mx-auto flex h-full w-full max-w-[1100px] flex-col items-center justify-center px-6 text-center">
          {PHRASES.map((p, i) => {
            const start = 0.52 + i * 0.16;
            const mid = start + 0.06;
            const out = start + 0.14;
            return (
              <Phrase
                key={p}
                text={p}
                progress={scrollYProgress}
                range={[start, mid, out, Math.min(out + 0.04, 1)]}
                index={i}
              />
            );
          })}

          {/* Closing line */}
          <Closing progress={scrollYProgress} />
        </div>

        {/* Scroll hint */}
        <ScrollHint progress={scrollYProgress} />
      </motion.div>
    </section>
  );
}

function Phrase({
  text,
  progress,
  range,
  index,
}: {
  text: string;
  progress: MotionValue<number>;
  range: [number, number, number, number];
  index: number;
}) {
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, range, [24, 0, 0, -24]);
  const blur = useTransform(progress, range, [14, 0, 0, 14]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <motion.h2
      aria-hidden={index === 0 ? undefined : true}
      style={{ opacity, y, filter }}
      className="absolute max-w-[22ch] text-[36px] font-semibold leading-[1.08] tracking-[-0.02em] text-white sm:text-[54px] lg:text-[72px]"
    >
      {text}
    </motion.h2>
  );
}

function Closing({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.92, 0.96, 1], [0, 1, 1]);
  const y = useTransform(progress, [0.92, 0.96], [20, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute bottom-16 flex flex-col items-center gap-3"
    >
      <span
        className="inline-block h-10 w-[1px]"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(255,255,255,0.5), transparent)",
        }}
      />
      <p
        className="text-[16px] font-medium text-white/75 sm:text-[18px]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        SDViGApp — твой спокойный выход.
      </p>
    </motion.div>
  );
}

function ScrollHint({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(
    progress,
    [0.45, 0.52, 0.88, 1],
    [0, 0.6, 0.15, 0]
  );
  return (
    <motion.div
      aria-hidden="true"
      style={{ opacity }}
      className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] font-medium uppercase tracking-[0.28em] text-white/60"
    >
      Скролл
    </motion.div>
  );
}

function Stars() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="dust" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#dust)" />
      {Array.from({ length: 50 }).map((_, i) => {
        const x = (i * 137) % 100;
        const y = (i * 53.5) % 100;
        const r = (i % 7) * 0.12 + 0.3;
        const o = 0.1 + ((i * 31) % 40) / 100;
        return (
          <circle
            key={i}
            cx={`${x}%`}
            cy={`${y}%`}
            r={r}
            fill="white"
            opacity={o}
          />
        );
      })}
    </svg>
  );
}
