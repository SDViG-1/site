"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function Gamification() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <section
      id="dopamine"
      ref={ref}
      className="relative overflow-hidden bg-[#030303] py-28 sm:py-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(201,161,74,0.08),transparent_55%)]"
      />
      {/* Background orbiting hex outlines */}
      <BackgroundHexagons />

      <div className="relative mx-auto flex w-full max-w-[1100px] flex-col items-center gap-8 px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[12px] font-medium text-white/70"
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--color-gold-400)" }}
          />
          Двигатель дофамина
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          className="max-w-[22ch] text-[36px] font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-[52px] lg:text-[64px]"
        >
          Каждое завершённое дело — шаг к уровню{" "}
          <span
            style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
            className="font-normal text-[var(--color-gold-300)]"
          >
            Мастер
          </span>
          .
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
          className="max-w-[58ch] text-[16.5px] leading-relaxed text-white/60"
        >
          SDViGApp coin — тихая валюта прогресса. Ты получаешь её за фокус,
          привычки и честные шаги. Без ярких баннеров, без назойливых пушей —
          только спокойное ощущение, что день собрался.
        </motion.p>

        <div className="relative mt-10 flex items-center justify-center">
          <HexCoin inView={inView} />
          <OrbitBadges inView={inView} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[13px] text-white/55"
        >
          <Stat value="14" label="дней подряд" />
          <Divider />
          <Stat value="432" label="SDViGApp coin собрано" />
          <Divider />
          <Stat value="7" label="ритуалов открыто" />
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <span className="flex flex-col items-center leading-tight">
      <span className="text-[24px] font-semibold tracking-tight text-white">
        {value}
      </span>
      <span className="mt-1 text-[11.5px] font-medium uppercase tracking-[0.18em] text-white/50">
        {label}
      </span>
    </span>
  );
}

function Divider() {
  return (
    <span
      aria-hidden="true"
      className="h-10 w-px"
      style={{
        background:
          "linear-gradient(to bottom, transparent, rgba(255,255,255,0.18), transparent)",
      }}
    />
  );
}

function HexCoin({ inView }: { inView: boolean }) {
  const hexPath =
    "M100 8 L173 50 L173 142 L100 184 L27 142 L27 50 Z";

  return (
    <div className="relative h-[320px] w-[320px] sm:h-[380px] sm:w-[380px]">
      {/* Level "Мастер" ring — ignites */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 90deg, rgba(201,161,74,0) 0deg, rgba(201,161,74,0.4) 140deg, rgba(216,184,102,0.6) 180deg, rgba(201,161,74,0.4) 220deg, rgba(201,161,74,0) 360deg)",
          filter: "blur(6px)",
          opacity: 0.75,
        }}
      />

      {/* Master label above coin */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute left-1/2 top-[-32px] -translate-x-1/2 whitespace-nowrap text-[10.5px] font-semibold uppercase tracking-[0.26em] text-[var(--color-gold-300)]"
      >
        Уровень · Мастер
      </motion.div>

      {/* Coin SVG */}
      <div className="absolute inset-[36px]">
        <motion.svg
          viewBox="0 0 200 192"
          className="h-full w-full"
          initial={{ rotate: -8, scale: 0.96 }}
          animate={inView ? { rotate: 0, scale: 1 } : {}}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        >
          <defs>
            <linearGradient id="goldFill" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#e7d094" />
              <stop offset="45%" stopColor="#c9a14a" />
              <stop offset="100%" stopColor="#7b592a" />
            </linearGradient>
            <linearGradient id="goldEdge" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#f3e7c3" />
              <stop offset="100%" stopColor="#997031" />
            </linearGradient>
            <linearGradient id="goldFace" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#e0c27d" />
              <stop offset="100%" stopColor="#b68a3c" />
            </linearGradient>
            <radialGradient id="goldHighlight" cx="35%" cy="30%" r="55%">
              <stop offset="0%" stopColor="rgba(255,245,220,0.55)" />
              <stop offset="100%" stopColor="rgba(255,245,220,0)" />
            </radialGradient>
            <filter id="softInset">
              <feGaussianBlur stdDeviation="1" />
            </filter>
          </defs>

          {/* Fill — fades in after lines draw */}
          <motion.path
            d={hexPath}
            fill="url(#goldFill)"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1.0, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Inner face */}
          <motion.path
            d="M100 22 L158 56 L158 134 L100 168 L42 134 L42 56 Z"
            fill="url(#goldFace)"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1.0, delay: 1.0 }}
          />

          {/* Top highlight */}
          <motion.path
            d="M100 22 L158 56 L158 134 L100 168 L42 134 L42 56 Z"
            fill="url(#goldHighlight)"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1.0, delay: 1.2 }}
          />

          {/* Edge outline — assembles first */}
          <motion.path
            d={hexPath}
            fill="none"
            stroke="url(#goldEdge)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          />

          {/* Inner construction lines (assembly feel) */}
          {[
            "M100 22 L100 168",
            "M42 56 L158 134",
            "M42 134 L158 56",
          ].map((d, i) => (
            <motion.path
              key={i}
              d={d}
              stroke="rgba(255,245,220,0.35)"
              strokeWidth="0.6"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 0.35 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.4 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ))}

          {/* Inner hex accent */}
          <motion.path
            d="M100 50 L138 72 L138 118 L100 140 L62 118 L62 72 Z"
            fill="none"
            stroke="rgba(62,44,22,0.35)"
            strokeWidth="0.8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 1.25, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Central "S" monogram */}
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <path
              d="M83 104c3.5 2 7 3 11 3 5 0 8-1.8 8-5s-2.3-4.5-7.5-5.6c-6.8-1.5-10.3-3.8-10.3-8.6 0-4.8 4.3-8.2 11.2-8.2 4 0 7.2 1 9.8 2.6"
              stroke="#7b592a"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              filter="url(#softInset)"
            />
            <path
              d="M83 104c3.5 2 7 3 11 3 5 0 8-1.8 8-5s-2.3-4.5-7.5-5.6c-6.8-1.5-10.3-3.8-10.3-8.6 0-4.8 4.3-8.2 11.2-8.2 4 0 7.2 1 9.8 2.6"
              stroke="#f3e7c3"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
            />
          </motion.g>
        </motion.svg>
      </div>

      {/* Subtle floating */}
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
      />

      {/* Glow base */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 left-1/2 h-14 w-[70%] -translate-x-1/2 rounded-[50%] blur-2xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(201,161,74,0.35), transparent 70%)",
        }}
      />
    </div>
  );
}

function OrbitBadges({ inView }: { inView: boolean }) {
  const badges = [
    { label: "+12 SDViGApp", sub: "Фокус 60м", x: -230, y: -90, delay: 1.6 },
    { label: "+5 SDViGApp", sub: "Прогулка", x: 220, y: -110, delay: 1.8 },
    { label: "Серия 14 дн.", sub: "Привычки", x: 240, y: 80, delay: 2.0 },
    { label: "+8 SDViGApp", sub: "Дебриф", x: -250, y: 60, delay: 2.2 },
  ];

  return (
    <>
      {badges.map((b, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 sm:block"
          style={{
            marginLeft: `${b.x}px`,
            marginTop: `${b.y}px`,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: b.delay,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="whitespace-nowrap rounded-2xl border border-white/[0.08] bg-[#0a0a0c]/90 px-3.5 py-2 shadow-[0_10px_30px_-14px_rgba(0,0,0,0.6)] backdrop-blur-md"
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 4 + i * 0.3,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex items-center gap-2.5"
            >
              <span
                className="grid h-6 w-6 place-items-center rounded-md"
                style={{
                  background:
                    "linear-gradient(180deg,#e7d094,#c9a14a)",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M6 1 10.5 3.5 10.5 8.5 6 11 1.5 8.5 1.5 3.5 Z"
                    stroke="rgba(62,44,22,0.6)"
                    strokeWidth="1"
                    fill="none"
                  />
                </svg>
              </span>
              <div className="flex flex-col leading-tight">
                <span className="text-[12px] font-semibold text-white">
                  {b.label}
                </span>
                <span className="text-[10.5px] text-white/55">
                  {b.sub}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      ))}
    </>
  );
}

function BackgroundHexagons() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden sm:block">
      {/* Top-right large orbit */}
      <motion.div
        className="absolute -right-20 -top-10 opacity-25"
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      >
        <HexOutline size={520} />
      </motion.div>

      {/* Bottom-left medium */}
      <motion.div
        className="absolute -bottom-24 -left-24 opacity-20"
        animate={{ rotate: -360 }}
        transition={{ duration: 110, repeat: Infinity, ease: "linear" }}
      >
        <HexOutline size={420} />
      </motion.div>

      {/* Middle floating small */}
      <motion.div
        className="absolute left-[20%] top-[20%] opacity-15"
        animate={{ rotate: 360 }}
        transition={{ duration: 140, repeat: Infinity, ease: "linear" }}
      >
        <HexOutline size={200} />
      </motion.div>
      <motion.div
        className="absolute right-[18%] bottom-[24%] opacity-15"
        animate={{ rotate: -360 }}
        transition={{ duration: 160, repeat: Infinity, ease: "linear" }}
      >
        <HexOutline size={180} />
      </motion.div>
    </div>
  );
}

function HexOutline({ size }: { size: number }) {
  return (
    <svg width={size} height={size * 0.96} viewBox="0 0 200 192" fill="none">
      <path
        d="M100 8 L173 50 L173 142 L100 184 L27 142 L27 50 Z"
        stroke="rgba(216,184,102,0.28)"
        strokeWidth="0.8"
      />
      <path
        d="M100 32 L152 62 L152 130 L100 160 L48 130 L48 62 Z"
        stroke="rgba(216,184,102,0.18)"
        strokeWidth="0.6"
      />
    </svg>
  );
}
