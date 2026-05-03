"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const NAVBAR_CLEARANCE = 80;

/** Та же логика, что в Navbar: шапка скрывается при прокрутке вниз после ~48px. */
function useNavbarHiddenSync() {
  const reduceMotion = useReducedMotion();
  const lastScrollY = useRef(0);
  const [headerHidden, setHeaderHidden] = useState(false);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
  }, []);

  const sync = useCallback(() => {
    const v = window.scrollY;
    const prev = lastScrollY.current;
    lastScrollY.current = v;

    if (reduceMotion) {
      setHeaderHidden(false);
      return;
    }

    if (v < 48) {
      setHeaderHidden(false);
      return;
    }

    const delta = v - prev;
    if (delta > 6) setHeaderHidden(true);
    else if (delta < -6) setHeaderHidden(false);
  }, [reduceMotion]);

  return { headerHidden, syncHeaderHidden: sync };
}

export function PrivacyInteractive() {
  const [showTocChip, setShowTocChip] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);
  const { headerHidden, syncHeaderHidden } = useNavbarHiddenSync();

  const update = useCallback(() => {
    syncHeaderHidden();

    const toc = document.getElementById("privacy-toc");
    if (toc) {
      const rect = toc.getBoundingClientRect();
      setShowTocChip(rect.bottom < NAVBAR_CLEARANCE);
    }
    setShowBackTop(window.scrollY > 360);
  }, [syncHeaderHidden]);

  useEffect(() => {
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollToToc = () => {
    document.getElementById("privacy-toc")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Закреплённая ссылка «Содержание» — после прокрутки мимо блока оглавления */}
      <div
        className={`fixed inset-x-0 z-40 flex justify-center px-4 transition-[top,opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[top] sm:px-5 ${
          headerHidden ? "top-3 sm:top-4" : "top-[4.5rem] sm:top-[5.25rem]"
        } ${
          showTocChip ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
        aria-hidden={!showTocChip}
      >
        <button
          type="button"
          onClick={scrollToToc}
          tabIndex={showTocChip ? 0 : -1}
          className="inline-flex items-center gap-2 rounded-full border border-[#e4e4e7] bg-white/95 px-4 py-2 text-[13px] font-semibold text-[#0a0a0c] shadow-[0_4px_24px_-8px_rgba(10,10,12,0.15)] backdrop-blur-md transition-colors hover:border-[#d4d4d8] hover:bg-white"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M3.5 5h9M3.5 8h9M3.5 11h9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          Содержание
        </button>
      </div>

      {/* Наверх */}
      <button
        type="button"
        onClick={scrollTop}
        aria-label="Наверх"
        tabIndex={showBackTop ? 0 : -1}
        className={`fixed bottom-6 right-4 z-40 grid h-11 w-11 place-items-center rounded-full border border-[#e4e4e7] bg-white/95 text-[#0a0a0c] shadow-[0_4px_24px_-8px_rgba(10,10,12,0.2)] backdrop-blur-md transition-[opacity,transform] duration-300 hover:border-[#d4d4d8] hover:bg-white sm:bottom-8 sm:right-6 ${
          showBackTop ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M8 12V4M4 8l4-4 4 4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  );
}
