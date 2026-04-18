import Link from "next/link";
import type { Article } from "@/lib/articles";
import { ArticleCover } from "./ArticleCover";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/guides/${article.slug}`}
      aria-label={article.title}
      className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-black/[0.06] bg-white transition-[box-shadow,border-color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-black/[0.1] hover:shadow-[0_30px_60px_-24px_rgba(10,10,12,0.18)]"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]">
          <ArticleCover cover={article.cover} title={article.title} />
        </div>
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/[0.04]" />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:gap-4 sm:p-6 lg:p-7">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 sm:gap-3">
          <span
            className="inline-flex h-6 items-center rounded-full px-2.5 text-[10.5px] font-semibold tracking-[0.04em] text-[var(--color-teal-700)] sm:h-7 sm:px-3 sm:text-[11.5px]"
            style={{ background: "var(--color-teal-50)" }}
          >
            {article.tag}
          </span>
          <time
            dateTime={article.date}
            className="text-[11px] font-medium text-[var(--color-ink)]/45 sm:text-[12px]"
          >
            {article.dateLabel}
          </time>
        </div>

        <h3 className="text-[16px] font-semibold leading-[1.2] tracking-[-0.01em] text-[var(--color-ink)] sm:text-[22px] sm:leading-[1.15] lg:text-[24px]">
          {article.title}
        </h3>

        <p className="line-clamp-2 text-[13px] leading-relaxed text-[var(--color-ink)]/58 sm:line-clamp-3 sm:text-[14.5px]">
          {article.preview}
        </p>

        <div className="mt-auto flex items-center gap-1.5 pt-1 text-[11.5px] font-medium text-[var(--color-ink)]/45 sm:pt-2 sm:text-[12.5px]">
          <span>{article.readingMinutes} мин чтения</span>
        </div>
      </div>
    </Link>
  );
}
