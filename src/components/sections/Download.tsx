"use client";

import { motion } from "framer-motion";

export function Download() {
  return (
    <section
      id="download"
      className="relative isolate overflow-hidden bg-[#030303] py-28 sm:py-36"
    >
      {/* Soft background blurs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          className="absolute left-1/2 top-[48%] h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(56,196,176,0.28), transparent 70%)",
          }}
        />
        <div
          className="absolute -right-40 top-10 h-[420px] w-[420px] rounded-full opacity-45 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(109,220,202,0.22), transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse at 50% 50%, black 40%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 50% 50%, black 40%, transparent 75%)",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-[1000px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-6 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[12px] font-medium text-white/70">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--color-teal-400)" }}
            />
            Скачать приложение
          </span>

          <h2 className="max-w-[22ch] text-balance text-[38px] font-semibold leading-[1.04] tracking-[-0.02em] text-white sm:text-[52px] lg:text-[64px]">
            Готов{" "}
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
              }}
              className="font-normal text-[var(--color-teal-300)]"
            >
              начать
            </span>
            ?
          </h2>

          <p className="max-w-[58ch] text-[16px] leading-relaxed text-white/60 sm:text-[17.5px]">
            Скачай SDViGApp и верни себе фокус. Бесплатно, без рекламы и без
            отслеживания — всё работает на устройстве.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <StoreButton
              store="apple"
              href="https://apps.apple.com/app/sdvigapp/id0"
            />
            <StoreButton
              store="google"
              href="https://play.google.com/store/apps/details?id=app.sdvig"
            />
          </div>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12.5px] text-white/45">
            <TrustItem>iOS 16+</TrustItem>
            <Dot />
            <TrustItem>Android 12+</TrustItem>
            <Dot />
            <TrustItem>24 МБ</TrustItem>
            <Dot />
            <TrustItem>Без рекламы</TrustItem>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

function TrustItem({ children }: { children: React.ReactNode }) {
  return <li className="inline-flex items-center">{children}</li>;
}

function Dot() {
  return (
    <li aria-hidden="true" className="inline-flex items-center">
      <span className="h-1 w-1 rounded-full bg-white/30" />
    </li>
  );
}

function StoreButton({
  store,
  href,
}: {
  store: "apple" | "google";
  href: string;
}) {
  const isApple = store === "apple";
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
