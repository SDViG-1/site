import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Контакты команды SDViGApp: реквизиты ИП, генеральный директор, технический директор, почта, Telegram, Instagram.",
};

type Person = {
  role: string;
  name: string;
  email: string;
  telegram: { handle: string; url: string };
  instagram: { handle: string; url: string };
};

const TEAM: Person[] = [
  {
    role: "CEO · Генеральный директор",
    name: "Имя Фамилия",
    email: "ceo@sdvig.app",
    telegram: { handle: "@sdvig_ceo", url: "https://t.me/sdvig_ceo" },
    instagram: { handle: "@sdvig_ceo", url: "https://instagram.com/sdvig_ceo" },
  },
  {
    role: "CTO · Технический директор",
    name: "Имя Фамилия",
    email: "cto@sdvig.app",
    telegram: { handle: "@sdvig_cto", url: "https://t.me/sdvig_cto" },
    instagram: { handle: "@sdvig_cto", url: "https://instagram.com/sdvig_cto" },
  },
];

const LEGAL = [
  { label: "Наименование", value: "ИП Фамилия Имя Отчество" },
  { label: "ОГРНИП", value: "000000000000000" },
  { label: "ИНН", value: "000000000000" },
  { label: "Адрес", value: "Россия, г. Москва, ул. Пример, д. 1" },
  { label: "Банк", value: "АО «Пример Банк»" },
  { label: "Р/С", value: "40802 810 0 0000 0000000" },
  { label: "К/С", value: "30101 810 0 0000 0000000" },
  { label: "БИК", value: "000000000" },
];

const GENERAL_CONTACTS = {
  email: "hello@sdvig.app",
  telegram: { handle: "@sdvigapp", url: "https://t.me/sdvigapp" },
  instagram: { handle: "@sdvigapp", url: "https://instagram.com/sdvigapp" },
};

export default function ContactsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#030303]">
        <section className="relative pb-20 pt-32 sm:pb-28 sm:pt-40">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[520px]">
            <div
              className="absolute left-1/2 top-16 h-[420px] w-[720px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(56,196,176,0.18), transparent 70%)",
              }}
            />
          </div>

          <div className="relative mx-auto w-full max-w-[1200px] px-6">
            <div className="flex flex-col items-start gap-5 sm:items-center sm:text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[12px] font-medium text-white/70">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: "var(--color-teal-400)" }}
                />
                Контакты
              </span>

              <h1 className="max-w-[22ch] text-[38px] font-semibold leading-[1.04] tracking-[-0.02em] text-white sm:text-[56px] lg:text-[64px]">
                Связаться с{" "}
                <span
                  style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
                  className="font-normal text-[var(--color-teal-300)]"
                >
                  SDViGApp
                </span>
                .
              </h1>

              <p className="max-w-[60ch] text-[16px] leading-relaxed text-white/55 sm:text-[17.5px]">
                Пишите напрямую руководителям или на общую почту. Отвечаем
                спокойно, по одному письму — без авто-ответов и маркетинга.
              </p>
            </div>

            {/* General contacts */}
            <div className="mt-14 grid gap-4 sm:grid-cols-3">
              <GeneralCard
                label="Почта"
                value={GENERAL_CONTACTS.email}
                href={`mailto:${GENERAL_CONTACTS.email}`}
                icon={<MailIcon />}
              />
              <GeneralCard
                label="Telegram"
                value={GENERAL_CONTACTS.telegram.handle}
                href={GENERAL_CONTACTS.telegram.url}
                icon={<TelegramIcon />}
              />
              <GeneralCard
                label="Instagram"
                value={GENERAL_CONTACTS.instagram.handle}
                href={GENERAL_CONTACTS.instagram.url}
                icon={<InstagramIcon />}
              />
            </div>

            {/* Team */}
            <div className="mt-20">
              <div className="mb-8 flex items-end justify-between gap-4">
                <h2 className="text-[24px] font-semibold tracking-[-0.01em] text-white sm:text-[30px]">
                  Команда
                </h2>
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
                  Прямые контакты
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {TEAM.map((p) => (
                  <PersonCard key={p.role} person={p} />
                ))}
              </div>
            </div>

            {/* Legal */}
            <div className="mt-20">
              <div className="mb-8 flex items-end justify-between gap-4">
                <h2 className="text-[24px] font-semibold tracking-[-0.01em] text-white sm:text-[30px]">
                  Реквизиты
                </h2>
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
                  Индивидуальный предприниматель
                </div>
              </div>

              <div className="overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0a0a0c]">
                <dl className="grid grid-cols-1 divide-y divide-white/[0.06] sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                  <div className="divide-y divide-white/[0.06]">
                    {LEGAL.slice(0, 4).map((item) => (
                      <LegalRow key={item.label} label={item.label} value={item.value} />
                    ))}
                  </div>
                  <div className="divide-y divide-white/[0.06]">
                    {LEGAL.slice(4).map((item) => (
                      <LegalRow key={item.label} label={item.label} value={item.value} />
                    ))}
                  </div>
                </dl>
              </div>

              <p className="mt-4 max-w-[70ch] text-[12px] leading-relaxed text-white/40">
                Для юридически значимой переписки используйте электронную почту{" "}
                <a
                  href={`mailto:${GENERAL_CONTACTS.email}`}
                  className="text-white/60 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white"
                >
                  {GENERAL_CONTACTS.email}
                </a>
                . Ответ в течение 3 рабочих дней.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function GeneralCard({
  label,
  value,
  href,
  icon,
}: {
  label: string;
  value: string;
  href: string;
  icon: React.ReactNode;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group relative flex items-center gap-4 overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#0a0a0c] p-5 transition-colors hover:border-white/[0.18]"
    >
      <span
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/[0.08] text-[var(--color-teal-300)]"
        style={{
          background:
            "linear-gradient(180deg, rgba(56,196,176,0.12) 0%, rgba(56,196,176,0.02) 100%)",
        }}
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
          {label}
        </div>
        <div className="mt-1 truncate text-[15px] font-medium text-white">
          {value}
        </div>
      </div>
      <ArrowIcon className="shrink-0 text-white/30 transition-colors group-hover:text-white/70" />
    </a>
  );
}

function PersonCard({ person }: { person: Person }) {
  const initials = person.name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0a0a0c] p-6 sm:p-7">
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(56,196,176,0.14), transparent 70%)",
        }}
      />
      <div className="relative flex items-center gap-4">
        <div
          className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-white/[0.1] text-[16px] font-semibold text-white"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.015) 100%)",
          }}
        >
          {initials}
        </div>
        <div className="min-w-0">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-teal-300)]">
            {person.role}
          </div>
          <div className="mt-1 text-[18px] font-semibold tracking-[-0.01em] text-white">
            {person.name}
          </div>
        </div>
      </div>

      <ul className="relative mt-6 flex flex-col divide-y divide-white/[0.06] border-t border-white/[0.06]">
        <ContactRow
          icon={<MailIcon />}
          label="Почта"
          value={person.email}
          href={`mailto:${person.email}`}
        />
        <ContactRow
          icon={<TelegramIcon />}
          label="Telegram"
          value={person.telegram.handle}
          href={person.telegram.url}
          external
        />
        <ContactRow
          icon={<InstagramIcon />}
          label="Instagram"
          value={person.instagram.handle}
          href={person.instagram.url}
          external
        />
      </ul>
    </div>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="group flex items-center gap-4 py-3.5 text-white/80 transition-colors hover:text-white"
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/[0.08] text-white/60 transition-colors group-hover:border-white/[0.2] group-hover:text-[var(--color-teal-300)]">
          {icon}
        </span>
        <span className="w-24 shrink-0 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
          {label}
        </span>
        <span className="min-w-0 flex-1 truncate text-[14.5px] font-medium">
          {value}
        </span>
        <ArrowIcon className="shrink-0 text-white/25 transition-colors group-hover:text-white/70" />
      </a>
    </li>
  );
}

function LegalRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 px-5 py-3.5 sm:px-6 sm:py-4">
      <dt className="w-28 shrink-0 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45 sm:w-32">
        {label}
      </dt>
      <dd className="min-w-0 flex-1 text-[14px] font-medium text-white/85">
        {value}
      </dd>
    </div>
  );
}

function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect
        x="2"
        y="3.5"
        width="12"
        height="9"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="m2.5 4.5 5.5 4 5.5-4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="m1.7 7.6 11.5-4.4c.5-.2 1 .2.9.8l-1.9 9.3c-.1.5-.7.8-1.2.5l-3.1-2.1-1.7 1.8c-.3.3-.8.1-.8-.3l-.3-2.7 6.2-5.1c.1-.1 0-.3-.2-.2L3.7 9l-2-.5c-.5-.2-.5-.8 0-.9Z"
        fill="currentColor"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect
        x="2"
        y="2"
        width="12"
        height="12"
        rx="3.2"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <circle cx="8" cy="8" r="2.8" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="11.6" cy="4.4" r="0.8" fill="currentColor" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M5 11 11 5M6 5h5v5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
