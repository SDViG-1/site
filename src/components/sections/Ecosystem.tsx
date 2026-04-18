"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

/** Та же идея, что у container-scroll: прогресс скролла → rotateX / scale / translateY на своих карточках */
function ScrollTiltPanel({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const tilt = reduceMotion ? 0 : compact ? 12 : 16;
  const rotateX = useTransform(scrollYProgress, [0, 1], [tilt, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : compact ? [0.93, 1] : [0.94, 1]
  );
  const translateY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : compact ? [20, 0] : [28, 0]
  );

  return (
    <div
      ref={ref}
      className={cn("min-h-0", className)}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="h-full will-change-transform [transform-style:preserve-3d]"
        style={{
          rotateX,
          scale,
          translateY,
          transformOrigin: "50% 42%",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function Ecosystem() {
  return (
    <section
      id="ecosystem"
      className="relative bg-[#030303] py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <SectionHeader />
        <div className="mt-14 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-6">
          <ScrollTiltPanel className="md:col-span-4">
            <MorningEveningCard />
          </ScrollTiltPanel>
          <ScrollTiltPanel className="md:col-span-2">
            <FocusCard />
          </ScrollTiltPanel>
          <ScrollTiltPanel className="md:col-span-2">
            <WellbeingCard />
          </ScrollTiltPanel>
          <ScrollTiltPanel className="md:col-span-4">
            <InboxFinanceCard />
          </ScrollTiltPanel>
        </div>
      </div>
    </section>
  );
}

function SectionHeader() {
  return (
    <div className="flex flex-col items-start gap-5 sm:items-center sm:text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[12px] font-medium text-white/70">
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: "var(--color-teal-400)" }}
        />
        Экосистема
      </span>
      <h2 className="max-w-[22ch] text-[34px] font-semibold leading-[1.08] tracking-[-0.02em] text-white sm:text-[44px] lg:text-[54px]">
        Четыре инструмента. Одна&nbsp;
        <span
          style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
          className="font-normal text-white/80"
        >
          тихая
        </span>{" "}
        ритм-машина.
      </h2>
      <p className="max-w-[58ch] text-[16px] leading-relaxed text-white/55 sm:text-[17px]">
        Не 47 кнопок и дашбордов, а честный набор поверхностей, которые работают
        вместе: планирование дня, глубокий фокус, забота о себе и аккуратный
        учёт денег — чтобы дофамин не утекал.
      </p>
    </div>
  );
}

function BentoCard({
  className,
  children,
  onHoverChange,
  ariaLabel,
}: {
  className?: string;
  children: React.ReactNode;
  onHoverChange?: (hovered: boolean) => void;
  ariaLabel: string;
}) {
  return (
    <motion.article
      aria-label={ariaLabel}
      onHoverStart={() => onHoverChange?.(true)}
      onHoverEnd={() => onHoverChange?.(false)}
      whileHover={{ scale: 1.015, y: -2 }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      className={cn(
        "group relative flex min-h-[280px] overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#0a0a0c] p-7 shadow-[0_1px_2px_rgba(0,0,0,0.25),0_24px_60px_-30px_rgba(0,0,0,0.6)] transition-shadow",
        "hover:border-white/[0.12] hover:shadow-[0_1px_2px_rgba(0,0,0,0.35),0_30px_80px_-30px_rgba(0,0,0,0.75)]",
        className
      )}
    >
      {children}
    </motion.article>
  );
}

function CardEyebrow({ label, color = "teal" }: { label: string; color?: "teal" | "gold" }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{
          background:
            color === "gold" ? "var(--color-gold-400)" : "var(--color-teal-400)",
        }}
      />
      {label}
    </span>
  );
}

function CardTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        "mt-4 text-[22px] font-semibold leading-tight tracking-[-0.01em] text-white sm:text-[24px]",
        className
      )}
    >
      {children}
    </h3>
  );
}

function CardDescription({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-2 max-w-[38ch] text-[14.5px] leading-relaxed text-white/55">
      {children}
    </p>
  );
}

/* ------------------ Card 1: Morning / Evening ------------------- */

const TASKS = [
  { id: 1, label: "Прогулка 20 минут", time: "08:10" },
  { id: 2, label: "Глубокая работа: v2.4 релиз", time: "09:30" },
  { id: 3, label: "Созвон с командой", time: "11:00" },
  { id: 4, label: "Лёгкий обед без экранов", time: "13:00" },
];

function MorningEveningCard({ className }: { className?: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <BentoCard
      ariaLabel="Утро и вечер — планирование дня"
      onHoverChange={setHovered}
      className={className}
    >
      <div className="flex w-full flex-col sm:flex-row sm:items-stretch">
        <div className="flex min-w-0 max-w-[320px] flex-col">
          <CardEyebrow label="Утро & Вечер" />
          <CardTitle>Честный план на день за&nbsp;две&nbsp;минуты</CardTitle>
          <CardDescription>
            Начни с трёх настоящих дел. Вечером — спокойный дебриф: что сделал,
            что переносим, что отпускаем.
          </CardDescription>
        </div>

        <div className="relative mt-6 flex-1 sm:ml-8 sm:mt-0">
          <div className="absolute -inset-4 -z-0 rounded-3xl bg-[linear-gradient(180deg,rgba(27,170,150,0.12),transparent)]" />
          <ul className="relative z-10 space-y-2">
            {TASKS.map((t, i) => (
              <TaskRow key={t.id} task={t} hovered={hovered} order={i} />
            ))}
          </ul>
        </div>
      </div>
    </BentoCard>
  );
}

function TaskRow({
  task,
  hovered,
  order,
}: {
  task: { id: number; label: string; time: string };
  hovered: boolean;
  order: number;
}) {
  const delay = 0.08 * order;

  return (
    <li className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3">
      <span className="relative grid h-5 w-5 place-items-center">
        <motion.span
          className="absolute inset-0 rounded-full"
          initial={false}
          animate={{
            backgroundColor: hovered
              ? "rgba(27,170,150,1)"
              : "rgba(255,255,255,0.04)",
            borderColor: hovered
              ? "rgba(27,170,150,1)"
              : "rgba(255,255,255,0.22)",
          }}
          transition={{ duration: 0.35, delay: delay + 0.05 }}
          style={{ borderWidth: 1.5, borderStyle: "solid" }}
        />
        <motion.svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className="relative"
          initial={false}
        >
          <motion.path
            d="M2.5 6.2 5 8.5 9.5 3.6"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={false}
            animate={{ pathLength: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.45, delay: delay + 0.15, ease: [0.65, 0, 0.35, 1] }}
          />
        </motion.svg>
      </span>
      <motion.span
        initial={false}
        animate={{
          color: hovered ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.92)",
        }}
        transition={{ duration: 0.35, delay: delay + 0.15 }}
        className="relative flex-1 text-[14px] font-medium"
      >
        {task.label}
        {/* Strike line */}
        <motion.span
          className="pointer-events-none absolute left-0 top-1/2 h-[1.4px] w-full -translate-y-1/2 origin-left bg-current"
          initial={false}
          animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 0.8 : 0 }}
          transition={{
            duration: 0.45,
            delay: delay + 0.18,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </motion.span>
      <span className="text-[12px] font-medium text-white/40">
        {task.time}
      </span>
    </li>
  );
}

/* ------------------ Card 2: Focus ------------------- */

function FocusCard({ className }: { className?: string }) {
  const [hovered, setHovered] = useState(false);
  const RADIUS = 62;
  const CIRC = 2 * Math.PI * RADIUS;

  return (
    <BentoCard
      ariaLabel="Глубокий фокус"
      onHoverChange={setHovered}
      className={className}
    >
      <div className="flex w-full flex-col">
        <CardEyebrow label="Фокус" />
        <CardTitle>Таймер, который защищает твоё внимание</CardTitle>
        <div className="relative mx-auto my-6 grid h-[180px] w-[180px] place-items-center">
          <svg width="170" height="170" viewBox="0 0 170 170" className="-rotate-90">
            <circle
              cx="85"
              cy="85"
              r={RADIUS}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="2"
            />
            <motion.circle
              cx="85"
              cy="85"
              r={RADIUS}
              fill="none"
              stroke="url(#focusGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              initial={false}
              animate={{ strokeDashoffset: hovered ? CIRC * 0.18 : CIRC }}
              transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
            />
            <defs>
              <linearGradient id="focusGrad" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#38c4b0" />
                <stop offset="100%" stopColor="#0f7267" />
              </linearGradient>
            </defs>
          </svg>
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <div className="text-center">
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                Deep work
              </div>
              <motion.div
                initial={false}
                animate={{ color: hovered ? "var(--color-teal-300)" : "#ffffff" }}
                className="mt-1 text-[32px] font-semibold tracking-tight"
              >
                48:12
              </motion.div>
              <div className="text-[11.5px] text-white/45">из&nbsp;60:00</div>
            </div>
          </div>
        </div>
        <CardDescription>
          Один квадрат времени. Никаких уведомлений, никакого зума — только ты и
          задача.
        </CardDescription>
      </div>
    </BentoCard>
  );
}

/* ------------------ Card 3: Wellbeing ------------------- */

function WellbeingCard({ className }: { className?: string }) {
  const [hovered, setHovered] = useState(false);
  const steps = [0, 1, 2, 3, 4];
  const current = hovered ? 4 : 2;

  return (
    <BentoCard
      ariaLabel="Wellbeing и самочувствие"
      onHoverChange={setHovered}
      className={className}
    >
      <div className="flex w-full flex-col">
        <CardEyebrow label="Wellbeing" />
        <CardTitle>Самочувствие — тоже&nbsp;метрика</CardTitle>
        <div className="mt-6 flex items-end gap-2">
          {steps.map((i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{
                backgroundColor:
                  i <= current
                    ? "var(--color-teal-500)"
                    : "rgba(255,255,255,0.08)",
                height: 18 + i * 10,
                opacity: i <= current ? 1 : 0.6,
              }}
              transition={{
                duration: 0.45,
                delay: 0.06 * i,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex-1 rounded-xl"
              style={{ minWidth: 16 }}
            />
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between text-[11.5px] text-white/55">
          <span>Понедельник</span>
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--color-teal-400)" }}
            />
            Чувствую лучше
          </span>
        </div>
        <CardDescription>
          Ежедневный короткий чек-ин: энергия, сон, настроение. Через неделю —
          тихая правда о ритме.
        </CardDescription>
      </div>
    </BentoCard>
  );
}

/* ------------------ Card 4: Inbox / Finance ------------------- */

type Expense = {
  id: number;
  title: string;
  category: string;
  amount: string;
  icon: "coffee" | "book" | "taxi" | "gym";
};

const EXPENSES: Expense[] = [
  { id: 1, title: "Flat White, Cold", category: "Кофе", amount: "− 320 ₽", icon: "coffee" },
  { id: 2, title: "Кристофер Вогельзанг", category: "Книги", amount: "− 890 ₽", icon: "book" },
  { id: 3, title: "Янд.Такси · комфорт", category: "Такси", amount: "− 430 ₽", icon: "taxi" },
];

function InboxFinanceCard({ className }: { className?: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <BentoCard
      ariaLabel="Инбокс и финансы"
      onHoverChange={setHovered}
      className={className}
    >
      <div className="flex w-full flex-col sm:flex-row sm:items-stretch">
        <div className="flex min-w-0 max-w-[320px] flex-col">
          <CardEyebrow label="Инбокс & Финансы" />
          <CardTitle>Приватный учёт. Никому&nbsp;не отдаём.</CardTitle>
          <CardDescription>
            Веди расходы без напряжения. Наведи — суммы скроются: твои деньги
            остаются только твоими.
          </CardDescription>
        </div>

        <div className="mt-6 flex-1 sm:ml-8 sm:mt-0">
          <div className="mb-3 flex items-center justify-between rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">
                Баланс недели
              </div>
              <motion.div
                initial={false}
                animate={{ filter: hovered ? "blur(8px)" : "blur(0px)" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-1 text-[22px] font-semibold tracking-tight text-white"
              >
                18&nbsp;420&nbsp;₽
              </motion.div>
            </div>
            <motion.span
              initial={false}
              animate={{ opacity: hovered ? 1 : 0 }}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.05] px-2.5 py-1 text-[11px] font-semibold text-white/75"
            >
              <LockMiniIcon />
              Скрыто
            </motion.span>
          </div>

          <ul className="space-y-2">
            {EXPENSES.map((e, i) => (
              <ExpenseRow key={e.id} expense={e} hovered={hovered} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </BentoCard>
  );
}

function ExpenseRow({
  expense,
  hovered,
  index,
}: {
  expense: Expense;
  hovered: boolean;
  index: number;
}) {
  return (
    <li className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3">
      <span className="grid h-8 w-8 place-items-center rounded-xl bg-white/[0.05] text-white/70">
        <ExpenseIcon kind={expense.icon} />
      </span>
      <div className="flex min-w-0 flex-1 flex-col leading-tight">
        <span className="truncate text-[13.5px] font-medium text-white">
          {expense.title}
        </span>
        <span className="text-[11.5px] text-white/45">
          {expense.category}
        </span>
      </div>
      <motion.span
        initial={false}
        animate={{ filter: hovered ? "blur(7px)" : "blur(0px)" }}
        transition={{
          duration: 0.4,
          delay: 0.03 * index,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="text-[13.5px] font-semibold text-white"
      >
        {expense.amount}
      </motion.span>
    </li>
  );
}

function ExpenseIcon({ kind }: { kind: Expense["icon"] }) {
  switch (kind) {
    case "coffee":
      return (
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
          <path
            d="M4 8h11a2 2 0 0 1 2 2v1a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8Z"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M7 4c0 1 1 1 1 2M10 4c0 1 1 1 1 2M13 4c0 1 1 1 1 2"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );
    case "book":
      return (
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
          <path
            d="M4 4h9a2 2 0 0 1 2 2v11H6a2 2 0 0 1-2-2V4ZM4 15h11"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "taxi":
      return (
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
          <path
            d="M3.5 13v-2l1.5-4h10l1.5 4v2M6 13h8"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <circle cx="6" cy="15" r="1.5" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="14" cy="15" r="1.5" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    case "gym":
      return (
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
          <path
            d="M5 8v4M15 8v4M3 9.5v1M17 9.5v1M7 6v8M13 6v8M7 10h6"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

function LockMiniIcon() {
  return (
    <svg width="10" height="11" viewBox="0 0 10 11" fill="none">
      <rect x="1" y="5" width="8" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M3 5V3.5A2 2 0 0 1 7 3.5V5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
