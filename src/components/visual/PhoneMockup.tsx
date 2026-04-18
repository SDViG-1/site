"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type PhoneMockupProps = {
  className?: string;
};

const TASKS = [
  { id: 1, label: "Ревью плана недели", time: "08:30", done: true, tag: "Deep" },
  { id: 2, label: "Прогулка 20 минут", time: "09:10", done: true, tag: "Body" },
  { id: 3, label: "Продумать релиз v2.4", time: "10:00", done: false, tag: "Deep" },
  { id: 4, label: "Созвон: дизайн-ревью", time: "11:30", done: false, tag: "Meet" },
  { id: 5, label: "Обед без экранов", time: "13:00", done: false, tag: "Body" },
];

export function PhoneMockup({ className }: PhoneMockupProps) {
  return (
    <motion.div
      aria-hidden="true"
      className={cn("relative select-none will-change-transform", className)}
      initial={{ opacity: 0, y: 40, rotate: -6 }}
      animate={{ opacity: 1, y: 0, rotate: -6 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        {/* Floor reflection blur */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 left-1/2 h-16 w-[78%] -translate-x-1/2 rounded-[50%] blur-2xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(10,10,12,0.25), transparent 70%)",
          }}
        />

        {/* Phone body */}
        <div
          className="relative mx-auto aspect-[9/19.5] w-[280px] sm:w-[320px] rounded-[44px] p-[2px]"
          style={{
            background:
              "linear-gradient(160deg, #1a1a1e 0%, #0a0a0c 50%, #1a1a1e 100%)",
            boxShadow:
              "0 40px 80px -30px rgba(10,10,12,0.55), 0 12px 30px -12px rgba(10,10,12,0.3)",
          }}
        >
          <div
            className="relative h-full w-full overflow-hidden rounded-[42px] bg-white"
            style={{
              boxShadow:
                "inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 0 0 3px #0a0a0c",
            }}
          >
            {/* Screen content */}
            <div className="flex h-full w-full flex-col bg-[#fbfbf9]">
              {/* Status bar */}
              <div className="flex items-center justify-between px-6 pt-4 text-[10px] font-semibold text-[var(--color-ink)]">
                <span>9:41</span>
                <span className="flex items-center gap-1">
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                    <path
                      d="M1 9h1V6H1v3Zm3 0h1V4H4v5Zm3 0h1V2H7v7Zm3 0h1V0h-1v9Z"
                      fill="currentColor"
                    />
                  </svg>
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                    <path
                      d="M6 2c1.9 0 3.6.7 4.9 1.9l1-1C10.3 1.4 8.3.6 6 .6S1.7 1.4.1 2.9l1 1A7.3 7.3 0 0 1 6 2Z"
                      fill="currentColor"
                    />
                    <path
                      d="M6 5c1.1 0 2.1.4 2.8 1.2l1-1A5.3 5.3 0 0 0 6 3.6a5.3 5.3 0 0 0-3.8 1.6l1 1A4 4 0 0 1 6 5Z"
                      fill="currentColor"
                    />
                    <circle cx="6" cy="8" r="1.2" fill="currentColor" />
                  </svg>
                  <span className="ml-0.5 inline-flex h-2.5 w-5 items-center rounded-[2px] border border-current/70 px-[1px]">
                    <span className="h-1.5 w-full rounded-[1px] bg-current" />
                  </span>
                </span>
              </div>

              {/* Notch */}
              <div className="absolute left-1/2 top-2 h-6 w-[92px] -translate-x-1/2 rounded-full bg-[#0a0a0c]" />

              {/* Content */}
              <div className="flex flex-1 flex-col overflow-hidden px-5 pt-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--color-ink)]/45">
                      Вторник · 12 марта
                    </p>
                    <h3 className="mt-1 text-[19px] font-semibold tracking-tight text-[var(--color-ink)]">
                      Доброе утро,&nbsp;Саша
                    </h3>
                  </div>
                  <div
                    className="grid h-8 w-8 place-items-center rounded-full text-[11px] font-semibold text-white"
                    style={{
                      background:
                        "linear-gradient(180deg, var(--color-teal-400), var(--color-teal-600))",
                    }}
                  >
                    С
                  </div>
                </div>

                {/* Tabs */}
                <div className="mt-4 flex items-center gap-1 rounded-full bg-black/5 p-1">
                  {["Утро", "День", "Вечер"].map((t, i) => (
                    <div
                      key={t}
                      className={cn(
                        "flex-1 rounded-full py-1 text-center text-[10.5px] font-semibold transition-colors",
                        i === 1
                          ? "bg-white text-[var(--color-ink)] shadow-sm"
                          : "text-[var(--color-ink)]/55"
                      )}
                    >
                      {t}
                    </div>
                  ))}
                </div>

                {/* Progress card */}
                <div className="mt-4 overflow-hidden rounded-2xl border border-black/[0.05] bg-white p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[10.5px] font-medium text-[var(--color-ink)]/55">
                      Фокус · 2 ч 40 мин
                    </p>
                    <span
                      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9.5px] font-semibold"
                      style={{
                        background: "var(--color-teal-50)",
                        color: "var(--color-teal-700)",
                      }}
                    >
                      <span
                        className="inline-block h-1.5 w-1.5 rounded-full"
                        style={{ background: "var(--color-teal-500)" }}
                      />
                      В ритме
                    </span>
                  </div>
                  <div className="mt-2 flex items-end justify-between">
                    <span className="text-[24px] font-semibold tracking-tight text-[var(--color-ink)]">
                      68%
                    </span>
                    <span className="text-[10.5px] font-medium text-[var(--color-ink)]/45">
                      4 из 6 задач
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-black/5">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: "68%",
                        background:
                          "linear-gradient(90deg, var(--color-teal-400), var(--color-teal-600))",
                      }}
                    />
                  </div>
                </div>

                {/* Task list */}
                <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink)]/45">
                  Сегодня
                </p>
                <ul className="mt-2 flex-1 space-y-1.5 overflow-hidden">
                  {TASKS.slice(0, 5).map((t) => (
                    <li
                      key={t.id}
                      className="flex items-center gap-2.5 rounded-xl border border-black/[0.04] bg-white px-3 py-2"
                    >
                      <span
                        className={cn(
                          "grid h-4 w-4 place-items-center rounded-full border transition-colors",
                          t.done
                            ? "border-transparent"
                            : "border-black/15 bg-white"
                        )}
                        style={
                          t.done
                            ? { background: "var(--color-teal-500)" }
                            : undefined
                        }
                      >
                        {t.done && (
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path
                              d="M2 5.2 4.2 7.2 8.2 2.6"
                              stroke="white"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </span>
                      <span
                        className={cn(
                          "flex-1 text-[11.5px] font-medium leading-4",
                          t.done
                            ? "text-[var(--color-ink)]/40 line-through"
                            : "text-[var(--color-ink)]"
                        )}
                      >
                        {t.label}
                      </span>
                      <span className="text-[10px] font-medium text-[var(--color-ink)]/40">
                        {t.time}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Bottom tab bar */}
                <div className="-mx-5 mt-auto flex items-center justify-around border-t border-black/[0.05] bg-white/80 px-5 py-3 backdrop-blur">
                  {[
                    { icon: "day", active: true },
                    { icon: "focus" },
                    { icon: "habits" },
                    { icon: "profile" },
                  ].map((tab, i) => (
                    <span
                      key={i}
                      className={cn(
                        "grid h-7 w-7 place-items-center rounded-full",
                        tab.active
                          ? "text-[var(--color-teal-600)]"
                          : "text-[var(--color-ink)]/35"
                      )}
                    >
                      <TabIcon kind={tab.icon} />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function TabIcon({ kind }: { kind: string }) {
  switch (kind) {
    case "day":
      return (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="3.2" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M10 2v1.6M10 16.4V18M2 10h1.6M16.4 10H18M4.5 4.5l1.1 1.1M14.4 14.4l1.1 1.1M4.5 15.5l1.1-1.1M14.4 5.6l1.1-1.1"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "focus":
      return (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="10" cy="10" r="2.5" fill="currentColor" />
        </svg>
      );
    case "habits":
      return (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <path
            d="M3 10c2-4 4-6 7-6 2.2 0 3.5 1.2 4 2.5-1 .5-1.7 1.3-2 2.5-.6 2.2.4 4.5 3 5-1.8 1.3-3.9 2-6 2-4 0-6-2-6-6Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "profile":
      return (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M3.5 17c1.2-3 3.7-4.5 6.5-4.5s5.3 1.5 6.5 4.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return null;
  }
}
