"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const COLUMNS = [
  {
    title: "Продукт",
    links: [
      { label: "Метод", href: "#method" },
      { label: "Экосистема", href: "#ecosystem" },
      { label: "Геймификация", href: "#dopamine" },
      { label: "Тарифы", href: "#pricing" },
      { label: "Что нового", href: "#changelog" },
    ],
  },
  {
    title: "Компания",
    links: [
      { label: "О нас", href: "#about" },
      { label: "Принципы", href: "#principles" },
      { label: "Блог", href: "#blog" },
      { label: "Пресса", href: "#press" },
      { label: "Карьера", href: "#careers" },
    ],
  },
  {
    title: "Ресурсы",
    links: [
      { label: "Помощь", href: "#help" },
      { label: "Гайды", href: "/guides" },
      { label: "API", href: "#api" },
      { label: "Статус", href: "#status" },
      { label: "Контакты", href: "mailto:hello@sdvig.app" },
    ],
  },
  {
    title: "Юридическое",
    links: [
      { label: "Условия", href: "#terms" },
      { label: "Приватность", href: "#privacy-policy" },
      { label: "Cookie", href: "#cookies" },
      { label: "Лицензии", href: "#licenses" },
      { label: "DPA", href: "#dpa" },
    ],
  },
];

const SOCIAL = [
  { label: "X (Twitter)", href: "#x", icon: "x" as const },
  { label: "Telegram", href: "#tg", icon: "tg" as const },
  { label: "YouTube", href: "#yt", icon: "yt" as const },
  { label: "Instagram", href: "#ig", icon: "ig" as const },
];

export function Footer() {
  return (
    <footer className="relative bg-[var(--color-paper)] pt-20 sm:pt-28">
      {/* Pre-footer CTA */}
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <div className="relative overflow-hidden rounded-[32px] border border-black/[0.06] bg-[var(--color-cream)] p-10 sm:p-14">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-50 blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(56,196,176,0.28), transparent 70%)",
            }}
          />
          <div className="relative flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
            <div className="max-w-[52ch]">
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-ink)]/45">
                Без суеты
              </div>
              <h3 className="mt-3 text-[34px] font-semibold leading-[1.05] tracking-[-0.02em] text-[var(--color-ink)] sm:text-[44px]">
                Начни с сегодняшнего
                <span
                  style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
                  className="font-normal"
                >
                  {" "}утра
                </span>
                .
              </h3>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#download"
                className="inline-flex h-12 items-center justify-center rounded-full px-5 text-[14.5px] font-semibold text-white shadow-[0_10px_24px_-10px_rgba(27,170,150,0.6)]"
                style={{
                  background:
                    "linear-gradient(180deg, var(--color-teal-400) 0%, var(--color-teal-600) 100%)",
                }}
              >
                Скачать SDViGApp
              </Link>
              <a
                href="#pricing"
                className="inline-flex h-12 items-center justify-center rounded-full border border-black/[0.1] bg-white px-5 text-[14.5px] font-semibold text-[var(--color-ink)] transition-colors hover:border-black/[0.2]"
              >
                Сравнить тарифы
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-24 w-full max-w-[1200px] border-t border-black/[0.08] px-6 pb-10 pt-14">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
          {/* Brand */}
          <div className="col-span-2 flex flex-col gap-4">
            <Logo />
            <p className="max-w-[36ch] text-[13px] leading-relaxed text-[var(--color-ink)]/55">
              SDViGApp — это спокойный инструмент ежедневной продуктивности.
              Разработано в Лиссабоне, уважает твоё внимание.
            </p>
            <div className="flex items-center gap-2">
              {SOCIAL.map((s) => (
                <a
                  key={s.icon}
                  href={s.href}
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-black/[0.08] text-[var(--color-ink)]/65 transition-colors hover:border-black/[0.2] hover:text-[var(--color-ink)]"
                >
                  <SocialIcon kind={s.icon} />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-ink)]/50">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-[13.5px] text-[var(--color-ink)]/70 transition-colors hover:text-[var(--color-ink)]"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Disclosure */}
        <div className="mt-14 flex flex-col items-start justify-between gap-5 border-t border-black/[0.06] pt-8 sm:flex-row sm:items-center">
          <p className="text-[12px] text-[var(--color-ink)]/50">
            © 2026 SDViGApp Method, Lda. All rights reserved. NIPC 516 824 221. Av.
            da Liberdade 10, 1250-147 Lisboa, Portugal.
          </p>
          <div className="flex items-center gap-5 text-[12px] text-[var(--color-ink)]/50">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--color-ink)]"
            >
              <GlobeIcon />
              Русский
            </button>
            <span className="inline-flex items-center gap-1.5">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--color-teal-500)" }}
              />
              Все системы в норме
            </span>
          </div>
        </div>

        <p className="mt-6 max-w-[82ch] text-[11px] leading-relaxed text-[var(--color-ink)]/35">
          SDViGApp не является средством диагностики, лечения или профилактики
          заболеваний. Продукт помогает организовать режим дня и поддерживать
          здоровые привычки. Для клинических вопросов обратитесь к специалисту.
        </p>
      </div>
    </footer>
  );
}

function SocialIcon({ kind }: { kind: "x" | "tg" | "yt" | "ig" }) {
  switch (kind) {
    case "x":
      return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M1 1l5.2 7.1L1.3 13h1.5l4.2-4.5L10.4 13H13L7.5 5.6 12.5 1h-1.5L6.9 4.8 4.3 1H1Z"
            fill="currentColor"
          />
        </svg>
      );
    case "tg":
      return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="m1 7 11.5-4.5-1.8 9.5-3-.8-1.7 2-.3-2.6 6.2-5.3-7 4.6L1 9V7Z"
            fill="currentColor"
          />
        </svg>
      );
    case "yt":
      return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="1" y="3.5" width="12" height="7" rx="1.6" fill="currentColor" />
          <path d="M6 5.5v3l2.5-1.5L6 5.5Z" fill="white" />
        </svg>
      );
    case "ig":
      return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="1.5" y="1.5" width="11" height="11" rx="3" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="10.3" cy="3.7" r="0.7" fill="currentColor" />
        </svg>
      );
  }
}

function GlobeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.1" />
      <path
        d="M1.5 7h11M7 1.5c1.8 2 2.8 3.9 2.8 5.5S8.8 10.5 7 12.5C5.2 10.5 4.2 8.6 4.2 7S5.2 3.5 7 1.5Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
    </svg>
  );
}
