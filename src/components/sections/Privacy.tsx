"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function Privacy() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });

  return (
    <section
      id="privacy"
      ref={ref}
      className="relative bg-[var(--color-paper)] py-28 sm:py-36"
    >
      <div className="mx-auto flex w-full max-w-[880px] flex-col items-center gap-8 px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-white px-3 py-1 text-[12px] font-medium text-[var(--color-ink)]/70"
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--color-teal-500)" }}
          />
          Сейф
        </motion.span>

        <Lock inView={inView} />

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
          className="max-w-[22ch] text-[34px] font-semibold leading-[1.08] tracking-[-0.02em] text-[var(--color-ink)] sm:text-[46px] lg:text-[56px]"
        >
          Твои данные — только&nbsp;твои.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 1.0 }}
          className="max-w-[56ch] text-[16.5px] leading-relaxed text-[var(--color-ink)]/60"
        >
          Дневник, задачи и финансы живут на устройстве. Синхронизация — по
          сквозному шифрованию: ключ мы не храним и не видим. Без трекеров, без
          перепродажи. Тихо. Строго. По-взрослому.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.15 }}
          className="mt-6 grid w-full max-w-[640px] grid-cols-1 gap-4 sm:grid-cols-3"
        >
          <Pillar
            icon={<DeviceIcon />}
            title="На устройстве"
            desc="База по умолчанию хранится локально."
          />
          <Pillar
            icon={<LockSmallIcon />}
            title="E2E-шифрование"
            desc="Синхрон через конверт, который не вскрыть."
          />
          <Pillar
            icon={<NoEyeIcon />}
            title="Без трекинга"
            desc="Нет аналитики третьих сторон. Ноль."
          />
        </motion.div>
      </div>
    </section>
  );
}

function Lock({ inView }: { inView: boolean }) {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="relative mt-2"
    >
      {/* Base glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(27,170,150,0.22), transparent 70%)",
        }}
      />

      <svg
        width="160"
        height="180"
        viewBox="0 0 160 180"
        className="relative"
      >
        <defs>
          <linearGradient id="lockBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1f2024" />
            <stop offset="100%" stopColor="#0a0a0c" />
          </linearGradient>
          <linearGradient id="lockShackle" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#2a2b30" />
            <stop offset="100%" stopColor="#111114" />
          </linearGradient>
          <linearGradient id="keyhole" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#38c4b0" />
            <stop offset="100%" stopColor="#0f7267" />
          </linearGradient>
        </defs>

        {/* Shackle — open to closed */}
        <motion.g
          style={{ transformBox: "fill-box", transformOrigin: "center bottom" }}
          initial={{ y: -16 }}
          animate={inView ? { y: 0 } : {}}
          transition={{
            duration: 0.7,
            ease: [0.65, 0, 0.35, 1],
            delay: 0.4,
          }}
        >
          <motion.path
            d="M50 80 V54 a30 30 0 0 1 60 0 V80"
            fill="none"
            stroke="url(#lockShackle)"
            strokeWidth="14"
            strokeLinecap="round"
          />
          {/* Highlight */}
          <path
            d="M58 78 V54 a22 22 0 0 1 44 0 V78"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </motion.g>

        {/* Click flash on close */}
        <motion.circle
          cx="80"
          cy="80"
          r="36"
          fill="rgba(56,196,176,0.35)"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={inView ? { opacity: [0, 0.6, 0], scale: [0.6, 1.4, 1.8] } : {}}
          transition={{ duration: 0.9, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Body */}
        <motion.g
          initial={{ y: 6, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <rect
            x="30"
            y="78"
            width="100"
            height="86"
            rx="18"
            fill="url(#lockBody)"
          />
          <rect
            x="30"
            y="78"
            width="100"
            height="86"
            rx="18"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />

          {/* Inset highlight */}
          <rect
            x="33"
            y="81"
            width="94"
            height="20"
            rx="15"
            fill="rgba(255,255,255,0.04)"
          />

          {/* Keyhole */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <circle cx="80" cy="115" r="10" fill="url(#keyhole)" />
            <path
              d="M80 118 L80 138"
              stroke="url(#keyhole)"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </motion.g>
        </motion.g>

        {/* Soft base shadow */}
        <ellipse
          cx="80"
          cy="172"
          rx="44"
          ry="4"
          fill="rgba(10,10,12,0.12)"
        />
      </svg>

      {/* Click label — appears briefly */}
      <motion.span
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: [0, 1, 0], scale: [0.9, 1, 1] } : {}}
        transition={{ duration: 1.2, delay: 1.05 }}
        className="pointer-events-none absolute left-1/2 top-[44%] -translate-x-1/2 whitespace-nowrap rounded-full border border-black/[0.06] bg-white/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-teal-700)] shadow-[0_6px_18px_-8px_rgba(10,10,12,0.2)]"
      >
        Защищено
      </motion.span>
    </motion.div>
  );
}

function Pillar({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-black/[0.05] bg-white p-5 text-center">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--color-cream)] text-[var(--color-ink)]/80">
        {icon}
      </span>
      <span className="mt-1 text-[14px] font-semibold text-[var(--color-ink)]">
        {title}
      </span>
      <span className="text-[12.5px] leading-relaxed text-[var(--color-ink)]/55">
        {desc}
      </span>
    </div>
  );
}

function DeviceIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <rect x="4" y="2.5" width="12" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 15h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function LockSmallIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <rect x="4" y="9" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6.5 9V6.5a3.5 3.5 0 0 1 7 0V9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function NoEyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <path
        d="M2 10c1.8-3.5 4.7-5.5 8-5.5S16.2 6.5 18 10c-1.8 3.5-4.7 5.5-8 5.5S3.8 13.5 2 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="10" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3 3l14 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
