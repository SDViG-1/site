import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import {
  getAdjacentArticles,
  getAllSlugs,
  getArticleBySlug,
} from "@/lib/articles";
import { ArticleCover } from "@/components/guides/ArticleCover";
import { ArticleNav } from "@/components/guides/ArticleNav";
import { ArticleRating } from "@/components/guides/ArticleRating";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Материал не найден" };
  return {
    title: article.title,
    description: article.preview,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const { prev, next } = getAdjacentArticles(slug);

  return (
    <>
      <Navbar />
      <main className="bg-[#030303]">
        <article className="mx-auto w-full px-6 pb-24 pt-28 sm:pt-36">
          <div className="mx-auto w-full max-w-[720px]">
            <Link
              href="/guides"
              className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-white/55 transition-colors hover:text-white"
            >
              <svg
                width="14"
                height="12"
                viewBox="0 0 16 12"
                fill="none"
                aria-hidden="true"
                className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-1"
              >
                <path
                  d="M14 6H2m0 0 4.5-4.5M2 6l4.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Все гайды
            </Link>

            <header className="mt-8 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex h-7 items-center rounded-full border border-[var(--color-teal-400)]/25 px-3 text-[11.5px] font-semibold tracking-[0.04em] text-[var(--color-teal-300)]"
                  style={{ background: "rgba(27,170,150,0.12)" }}
                >
                  {article.tag}
                </span>
                <time
                  dateTime={article.date}
                  className="text-[12.5px] font-medium text-white/50"
                >
                  {article.dateLabel}
                </time>
                <span className="text-[12.5px] font-medium text-white/35">
                  · {article.readingMinutes} мин чтения
                </span>
              </div>

              <h1 className="text-[34px] font-semibold leading-[1.08] tracking-[-0.02em] text-white sm:text-[44px] lg:text-[52px]">
                {article.title}
              </h1>

              <p className="text-[18px] leading-relaxed text-white/70 sm:text-[20px]">
                {article.intro}
              </p>
            </header>

            <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-[22px] border border-white/[0.08]">
              <ArticleCover cover={article.cover} title={article.title} />
            </div>

            <div className="mt-12 flex flex-col gap-7 text-[18px] leading-[1.75] text-white/80 sm:text-[19px]">
              {article.body.map((block, i) => {
                switch (block.type) {
                  case "h2":
                    return (
                      <h2
                        key={i}
                        className="mt-6 text-[24px] font-semibold leading-[1.2] tracking-[-0.01em] text-white sm:text-[28px]"
                      >
                        {block.text}
                      </h2>
                    );
                  case "p":
                    return <p key={i}>{block.text}</p>;
                  case "quote":
                    return (
                      <blockquote
                        key={i}
                        className="border-l-2 pl-5 text-[20px] font-medium italic leading-[1.55] text-white/90 sm:text-[22px]"
                        style={{
                          borderColor: "var(--color-teal-400)",
                          fontFamily: "var(--font-display)",
                        }}
                      >
                        {block.text}
                      </blockquote>
                    );
                  case "list":
                    return (
                      <ul key={i} className="flex flex-col gap-3 pl-0">
                        {block.items.map((item, j) => (
                          <li key={j} className="flex gap-3">
                            <span
                              aria-hidden="true"
                              className="mt-[11px] h-1.5 w-1.5 flex-none rounded-full"
                              style={{ background: "var(--color-teal-400)" }}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    );
                }
              })}
            </div>

            <hr className="my-14 border-t border-white/[0.08]" />

            <ArticleNav prev={prev} next={next} />

            <div className="mt-10">
              <ArticleRating />
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

export const dynamic = "force-static";
