"use client";

import { WavePath } from "@/components/ui/wave-path";

/**
 * Тонкая волна-разделитель между тёмными секциями.
 * Интерактивная: при наведении прогибается за курсором и плавно возвращается.
 */
export function SectionDivider() {
  return (
    <div
      aria-hidden="true"
      className="relative flex w-full items-center justify-center bg-[#030303] py-10 sm:py-14"
    >
      <WavePath className="text-white/35" />
    </div>
  );
}
