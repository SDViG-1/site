import Link from "next/link";
import type { Article } from "@/lib/articles";
import { ArticleCover } from "./ArticleCover";
import { DotPattern } from "@/components/ui/dot-pattern-1";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/guides/${article.slug}`}
      aria-label={article.title}
      className="group relative flex h-full flex-col border border-white/[0.08] bg-[#0a0a0c]/60 transition-[border-color,transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-white/[0.18] hover:shadow-[0_30px_70px_-30px_rgba(27,170,150,0.35)]"
    >
      {/* dotted pattern overlay */}
      <DotPattern
        width={5}
        height={5}
        className="fill-white/[0.08] md:fill-white/[0.1]"
      />

      {/* corner marks — 4 маленьких квадрата в углах */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-[3px] -top-[3px] h-1.5 w-1.5 bg-[var(--color-teal-400)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-[3px] -top-[3px] h-1.5 w-1.5 bg-[var(--color-teal-400)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[3px] -left-[3px] h-1.5 w-1.5 bg-[var(--color-teal-400)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[3px] -right-[3px] h-1.5 w-1.5 bg-[var(--color-teal-400)]"
      />

      {/* Cover */}
      <div className="relative z-10 aspect-[16/10] w-full overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]">
          <ArticleCover cover={article.cover} title={article.title} />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0c]/40 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/10" />
      </div>

      {/* Body */}
      <div className="relative z-10 flex flex-1 flex-col gap-3 p-4 sm:gap-4 sm:p-6 lg:p-7">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 sm:gap-3">
          <span
            className="inline-flex h-6 items-center rounded-full border border-[var(--color-teal-400)]/25 px-2.5 text-[10.5px] font-semibold tracking-[0.04em] text-[var(--color-teal-300)] sm:h-7 sm:px-3 sm:text-[11.5px]"
            style={{ background: "rgba(27,170,150,0.12)" }}
          >
            {article.tag}
          </span>
          <time
            dateTime={article.date}
            className="text-[11px] font-medium text-white/45 sm:text-[12px]"
          >
            {article.dateLabel}
          </time>
        </div>

        <h3 className="text-[16px] font-semibold leading-[1.2] tracking-[-0.01em] text-white sm:text-[22px] sm:leading-[1.15] lg:text-[24px]">
          {article.title}
        </h3>

        <p className="line-clamp-2 text-[13px] leading-relaxed text-white/55 sm:line-clamp-3 sm:text-[14.5px]">
          {article.preview}
        </p>

        <div className="mt-auto flex items-center gap-1.5 pt-1 text-[11.5px] font-medium text-white/45 sm:pt-2 sm:text-[12.5px]">
          <span>{article.readingMinutes} мин чтения</span>
        </div>
      </div>
    </Link>
  );
}
