"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Article, ArticleTag } from "@/lib/articles";
import { ArticleCard } from "./ArticleCard";

type Filter = "Все" | ArticleTag;

type Props = {
  articles: Article[];
};

export function GuidesFilter({ articles }: Props) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("Все");

  const tags = useMemo(() => {
    const seen = new Set<ArticleTag>();
    const ordered: ArticleTag[] = [];
    for (const a of articles) {
      if (!seen.has(a.tag)) {
        seen.add(a.tag);
        ordered.push(a.tag);
      }
    }
    return ordered;
  }, [articles]);

  const filters: Filter[] = useMemo(() => ["Все", ...tags], [tags]);

  const counts = useMemo(() => {
    const map = new Map<Filter, number>();
    map.set("Все", articles.length);
    for (const a of articles) {
      map.set(a.tag, (map.get(a.tag) ?? 0) + 1);
    }
    return map;
  }, [articles]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      const byTag = filter === "Все" || a.tag === filter;
      if (!byTag) return false;
      if (!q) return true;
      return `${a.title} ${a.preview} ${a.tag} ${a.intro}`
        .toLowerCase()
        .includes(q);
    });
  }, [articles, filter, query]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <TabRow
          filters={filters}
          active={filter}
          onChange={setFilter}
          counts={counts}
        />
        <SearchInput value={query} onChange={setQuery} />
      </div>

      <ResultsGrid articles={filtered} query={query} filter={filter} />
    </div>
  );
}

function TabRow({
  filters,
  active,
  onChange,
  counts,
}: {
  filters: Filter[];
  active: Filter;
  onChange: (f: Filter) => void;
  counts: Map<Filter, number>;
}) {
  return (
    <div
      role="tablist"
      aria-label="Категории гайдов"
      className="-mx-6 flex gap-1.5 overflow-x-auto px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0"
    >
      {filters.map((f) => {
        const isActive = active === f;
        const count = counts.get(f) ?? 0;
        return (
          <button
            key={f}
            role="tab"
            type="button"
            aria-selected={isActive}
            onClick={() => onChange(f)}
            className={`relative inline-flex h-10 flex-none items-center gap-2 rounded-full px-4 text-[13.5px] font-medium transition-colors ${
              isActive
                ? "text-white"
                : "text-[var(--color-ink)]/70 hover:text-[var(--color-ink)]"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="guides-filter-pill"
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(180deg, #1b1b1e 0%, #0a0a0c 100%)",
                  boxShadow:
                    "0 10px 24px -14px rgba(10,10,12,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 420,
                  damping: 34,
                  mass: 0.7,
                }}
              />
            )}
            <span className="relative z-10 whitespace-nowrap">{f}</span>
            <span
              className={`relative z-10 inline-flex h-5 min-w-[22px] items-center justify-center rounded-full px-1.5 text-[11px] font-semibold tabular-nums transition-colors ${
                isActive
                  ? "bg-white/12 text-white/85"
                  : "bg-black/[0.05] text-[var(--color-ink)]/55"
              }`}
              aria-label={`${count} материалов`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="relative block w-full lg:w-[320px]">
      <span className="sr-only">Поиск по гайдам</span>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-ink)]/45"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle
            cx="7"
            cy="7"
            r="4.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M10.6 10.6 14 14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>

      <input
        type="search"
        inputMode="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Поиск по материалам"
        className="block h-11 w-full rounded-full border border-black/[0.08] bg-white py-0 pl-11 pr-11 text-[14px] text-[var(--color-ink)] placeholder:text-[var(--color-ink)]/40 transition-colors focus:border-[var(--color-teal-400)] focus:outline-none focus:ring-4 focus:ring-[var(--color-teal-400)]/15"
      />

      <AnimatePresence>
        {value.length > 0 && (
          <motion.button
            key="clear"
            type="button"
            onClick={() => onChange("")}
            aria-label="Очистить поиск"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-2.5 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-black/[0.05] text-[var(--color-ink)]/60 transition-colors hover:bg-black/[0.1] hover:text-[var(--color-ink)]"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="m1.5 1.5 7 7m0-7-7 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </label>
  );
}

function ResultsGrid({
  articles,
  query,
  filter,
}: {
  articles: Article[];
  query: string;
  filter: Filter;
}) {
  if (articles.length === 0) {
    return <EmptyState query={query} filter={filter} />;
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 lg:gap-7">
      <AnimatePresence mode="popLayout" initial={false}>
        {articles.map((article) => (
          <motion.div
            key={article.slug}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <ArticleCard article={article} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function EmptyState({
  query,
  filter,
}: {
  query: string;
  filter: Filter;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-3 rounded-[24px] border border-dashed border-black/[0.08] bg-white px-8 py-16 text-center"
    >
      <span
        aria-hidden="true"
        className="grid h-12 w-12 place-items-center rounded-full bg-[var(--color-cream)] text-[var(--color-ink)]/40"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M12.2 12.2 16 16"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <h3 className="text-[18px] font-semibold text-[var(--color-ink)]">
        Ничего не нашлось
      </h3>
      <p className="max-w-[42ch] text-[14px] leading-relaxed text-[var(--color-ink)]/55">
        {query.trim().length > 0 ? (
          <>
            По запросу{" "}
            <span className="font-medium text-[var(--color-ink)]/80">
              «{query.trim()}»
            </span>
            {filter !== "Все" && (
              <>
                {" "}в категории{" "}
                <span className="font-medium text-[var(--color-ink)]/80">
                  {filter}
                </span>
              </>
            )}{" "}
            — ничего. Попробуй другое слово или другую категорию.
          </>
        ) : (
          <>
            В категории{" "}
            <span className="font-medium text-[var(--color-ink)]/80">
              {filter}
            </span>{" "}
            пока нет материалов. Скоро появятся.
          </>
        )}
      </p>
    </motion.div>
  );
}
