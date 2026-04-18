import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ARTICLES } from "@/lib/articles";
import { GuidesFilter } from "@/components/guides/GuidesFilter";

export const metadata: Metadata = {
  title: "Гайды",
  description:
    "Внутренние материалы команды SDViGApp: про внимание, привычки и честные инструменты продуктивности.",
};

export default function GuidesIndexPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#030303]">
        <section className="relative pb-24 pt-32 sm:pb-32 sm:pt-40">
          <div className="mx-auto w-full max-w-[1200px] px-6">
            <div className="flex flex-col items-start gap-5 sm:items-center sm:text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[12px] font-medium text-white/70">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: "var(--color-teal-400)" }}
                />
                Все гайды
              </span>

              <h1 className="max-w-[22ch] text-[38px] font-semibold leading-[1.04] tracking-[-0.02em] text-white sm:text-[56px] lg:text-[68px]">
                Библиотека{" "}
                <span
                  style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
                  className="font-normal text-[var(--color-teal-300)]"
                >
                  SDViGApp
                </span>
                .
              </h1>

              <p className="max-w-[60ch] text-[16px] leading-relaxed text-white/55 sm:text-[17.5px]">
                Все материалы, которые мы пишем для своих. Без новостного шума,
                без обязательного ежедневного чтения. Возвращайся, когда
                действительно нужно.
              </p>
            </div>

            <div className="mt-14">
              <GuidesFilter articles={ARTICLES} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
