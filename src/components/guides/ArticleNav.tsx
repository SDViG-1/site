import Link from "next/link";
import type { Article } from "@/lib/articles";

type Props = {
  prev: Article | null;
  next: Article | null;
};

export function ArticleNav({ prev, next }: Props) {
  return (
    <nav
      aria-label="Навигация по статьям"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5"
    >
      <NavCell article={prev} direction="prev" />
      <NavCell article={next} direction="next" />
    </nav>
  );
}

function NavCell({
  article,
  direction,
}: {
  article: Article | null;
  direction: "prev" | "next";
}) {
  const isPrev = direction === "prev";
  const labelText = isPrev ? "Предыдущая" : "Следующая";

  if (!article) {
    return (
      <div
        aria-hidden="true"
        className="hidden min-h-[110px] rounded-[20px] border border-dashed border-black/[0.06] sm:block"
      />
    );
  }

  return (
    <Link
      href={`/guides/${article.slug}`}
      aria-label={`${labelText}: ${article.title}`}
      className="group relative flex min-h-[110px] flex-col justify-center gap-2 overflow-hidden rounded-[20px] border border-black/[0.06] bg-white p-5 transition-[border-color,box-shadow,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-black/[0.12] hover:bg-[var(--color-cream)] hover:shadow-[0_20px_40px_-24px_rgba(10,10,12,0.12)] sm:p-6"
      style={{ textAlign: isPrev ? "left" : "right" }}
    >
      <span
        className={`flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.18em] text-[var(--color-ink)]/45 ${
          isPrev ? "" : "justify-end"
        }`}
      >
        {isPrev && <Arrow direction="left" className="group-hover:-translate-x-1.5" />}
        {labelText}
        {!isPrev && <Arrow direction="right" className="group-hover:translate-x-1.5" />}
      </span>
      <span className="text-[16.5px] font-semibold leading-[1.25] tracking-[-0.005em] text-[var(--color-ink)] sm:text-[17.5px]">
        {article.title}
      </span>
    </Link>
  );
}

function Arrow({
  direction,
  className,
}: {
  direction: "left" | "right";
  className?: string;
}) {
  return (
    <span
      className={`inline-block text-[var(--color-ink)]/55 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        className ?? ""
      }`}
    >
      {direction === "left" ? (
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
          <path
            d="M14 6H2m0 0 4.5-4.5M2 6l4.5 4.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
          <path
            d="M2 6h12m0 0-4.5-4.5M14 6l-4.5 4.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );
}
