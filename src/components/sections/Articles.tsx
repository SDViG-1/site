"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ARTICLES } from "@/lib/articles";
import { ArticleCard } from "@/components/guides/ArticleCard";

export function Articles() {
  const items = ARTICLES.slice(0, 3);

  return (
    <section
      id="articles"
      className="relative bg-white py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <div className="flex flex-col items-start gap-5 sm:items-center sm:text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-white px-3 py-1 text-[12px] font-medium text-[var(--color-ink)]/70"
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--color-teal-500)" }}
            />
            Гайды
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            className="max-w-[22ch] text-[34px] font-semibold leading-[1.05] tracking-[-0.02em] text-[var(--color-ink)] sm:text-[46px] lg:text-[54px]"
          >
            Короткие разборы{" "}
            <span
              style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
              className="font-normal text-[var(--color-teal-600)]"
            >
              без воды
            </span>
            .
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            className="max-w-[58ch] text-[16px] leading-relaxed text-[var(--color-ink)]/55 sm:text-[17px]"
          >
            Читается быстро, работает долго. Это внутренние материалы команды
            SDViGApp — про внимание, привычки и честные инструменты, которые мы
            собираем сами для себя и делимся с тобой.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7"
        >
          {items.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </motion.div>

        <div className="mt-14 flex justify-center">
          <AllGuidesLink />
        </div>
      </div>
    </section>
  );
}

function AllGuidesLink() {
  return (
    <Link
      href="/guides"
      className="group inline-flex items-center gap-2 rounded-full px-1 py-2 text-[15px] font-semibold text-[var(--color-ink)] transition-colors hover:text-[var(--color-teal-700)]"
    >
      <span className="relative">
        Читать все гайды
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -bottom-0.5 h-[1.5px] origin-left scale-x-0 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
          style={{ background: "var(--color-teal-500)" }}
        />
      </span>
      <span className="relative block h-4 w-5 overflow-hidden">
        <svg
          width="20"
          height="16"
          viewBox="0 0 20 16"
          fill="none"
          aria-hidden="true"
          className="absolute left-0 top-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5"
        >
          <path
            d="M2 8h14m0 0-4.5-4.5M16 8l-4.5 4.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}
