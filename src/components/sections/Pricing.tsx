"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const PLANS = {
  base: {
    name: "Спокойствие",
    tagline: "Базовые инструменты, чтобы собрать день.",
    price: "0",
    period: "навсегда",
    features: [
      "Планирование: утро, день, вечер",
      "Фокус-таймер (до 60 минут)",
      "Короткий чек-ин самочувствия",
      "Расходы — одна категория",
      "Локальное хранение данных",
    ],
    cta: "Начать бесплатно",
  },
  pro: {
    name: "Ритм",
    tagline: "Дофаминовый двигатель + глубина.",
    price: "490",
    period: "в месяц",
    features: [
      "Всё из «Спокойствия»",
      "SDViGApp coin, уровни и ритуалы",
      "Глубокая аналитика фокуса",
      "Неограниченные категории и цели",
      "Wellbeing-инсайты и тренды недели",
      "E2E-синхронизация между устройствами",
      "Ранний доступ к новым инструментам",
    ],
    cta: "Оформить Ритм",
  },
} as const;

export function Pricing() {
  return (
    <section
      id="pricing"
      className="relative bg-[#030303] py-28 sm:py-36"
    >
      <div className="mx-auto w-full max-w-[1100px] px-6">
        <div className="flex flex-col items-start gap-5 sm:items-center sm:text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[12px] font-medium text-white/70">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--color-gold-400)" }}
            />
            Инвестиция в фокус
          </span>
          <h2 className="max-w-[20ch] text-[34px] font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-[46px] lg:text-[56px]">
            Два тарифа. Ноль давления.
          </h2>
          <p className="max-w-[56ch] text-[16px] leading-relaxed text-white/55 sm:text-[17px]">
            Оба плана без бесплатных триалов-ловушек. Переходишь в «Ритм», только
            если действительно чувствуешь, что он тебе нужен.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          <BaseCard />
          <ProCard />
        </div>

        <div className="mt-10 flex flex-col items-center gap-2 text-center">
          <p className="text-[12.5px] text-white/45">
            Годовая подписка «Ритм» — 4 490 ₽ (–25%). Отмена в любой момент.
          </p>
        </div>
      </div>
    </section>
  );
}

function BaseCard() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex h-full flex-col rounded-[28px] border border-white/[0.08] bg-[#0a0a0c] p-8 sm:p-10"
    >
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
        <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
        Базовый
      </div>
      <h3 className="mt-4 text-[28px] font-semibold tracking-tight text-white">
        {PLANS.base.name}
      </h3>
      <p className="mt-2 text-[14.5px] text-white/55">
        {PLANS.base.tagline}
      </p>

      <div className="mt-8 flex items-end gap-2">
        <span className="text-[56px] font-semibold leading-none tracking-tight text-white">
          {PLANS.base.price}
          <span className="text-[26px] align-top text-white/55">
            ₽
          </span>
        </span>
        <span className="mb-2 text-[13.5px] text-white/55">
          {PLANS.base.period}
        </span>
      </div>

      <Link
        href="/#download"
        className="mt-8 inline-flex h-12 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] text-[14.5px] font-semibold text-white transition-colors hover:border-white/[0.25] hover:bg-white/[0.08]"
      >
        {PLANS.base.cta}
      </Link>

      <ul className="mt-8 space-y-3">
        {PLANS.base.features.map((f) => (
          <FeatureItem key={f}>{f}</FeatureItem>
        ))}
      </ul>
    </motion.article>
  );
}

function ProCard() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
      className={cn(
        "relative flex h-full flex-col rounded-[28px] bg-[#0a0a0c] p-8 sm:p-10",
        "shadow-[0_0_0_1.5px_var(--color-gold-400),0_30px_80px_-30px_rgba(201,161,74,0.55)]"
      )}
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(201,161,74,0.10) 0%, rgba(10,10,12,0) 40%)",
      }}
    >
      {/* Gold corner label */}
      <span
        className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white"
        style={{
          background:
            "linear-gradient(180deg, #c9a14a, #7b592a)",
          boxShadow:
            "0 10px 24px -10px rgba(201,161,74,0.6), inset 0 1px 0 rgba(255,255,255,0.15)",
        }}
      >
        Выбор фаундера
      </span>

      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-gold-300)]">
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: "var(--color-gold-400)" }}
        />
        Премиум
      </div>
      <h3 className="mt-4 text-[28px] font-semibold tracking-tight text-white">
        {PLANS.pro.name}
      </h3>
      <p className="mt-2 text-[14.5px] text-white/55">
        {PLANS.pro.tagline}
      </p>

      <div className="mt-8 flex items-end gap-2">
        <span className="text-[56px] font-semibold leading-none tracking-tight text-white">
          {PLANS.pro.price}
          <span className="text-[26px] align-top text-white/55">
            ₽
          </span>
        </span>
        <span className="mb-2 text-[13.5px] text-white/55">
          {PLANS.pro.period}
        </span>
      </div>

      <motion.a
        href="#subscribe"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="heartbeat-teal mt-8 inline-flex h-12 items-center justify-center rounded-full text-[14.5px] font-semibold text-white"
        style={{
          background:
            "linear-gradient(180deg, var(--color-teal-400) 0%, var(--color-teal-600) 100%)",
        }}
      >
        {PLANS.pro.cta}
      </motion.a>

      <ul className="mt-8 space-y-3">
        {PLANS.pro.features.map((f) => (
          <FeatureItem key={f} premium>
            {f}
          </FeatureItem>
        ))}
      </ul>
    </motion.article>
  );
}

function FeatureItem({
  children,
  premium = false,
}: {
  children: React.ReactNode;
  premium?: boolean;
}) {
  return (
    <li className="flex items-start gap-3 text-[14px] leading-relaxed text-white/80">
      <span
        className="mt-[3px] grid h-4 w-4 flex-none place-items-center rounded-full"
        style={{
          background: premium
            ? "rgba(201,161,74,0.18)"
            : "rgba(27,170,150,0.16)",
          color: premium ? "var(--color-gold-300)" : "var(--color-teal-300)",
        }}
      >
        <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
          <path
            d="M2 5.2 4.2 7.2 8.2 2.6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span>{children}</span>
    </li>
  );
}
