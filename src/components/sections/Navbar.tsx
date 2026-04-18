"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

type NavItem = {
  id: string;
  label: string;
  href: string;
  isRoute?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { id: "method", label: "Метод", href: "/#method" },
  { id: "ecosystem", label: "Экосистема", href: "/#ecosystem" },
  { id: "guides", label: "Гайды", href: "/guides", isRoute: true },
  { id: "pricing", label: "Тарифы", href: "/#pricing" },
  { id: "download", label: "Скачать", href: "/#download" },
];

export function Navbar() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 12);
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setHovered(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="fixed inset-x-0 top-3 z-50 flex justify-center px-4 sm:top-5"
      >
        <nav
          aria-label="Основная навигация"
          className={cn(
            "relative flex w-full items-center justify-between gap-1 rounded-full border transition-[background,box-shadow,border-color,backdrop-filter] duration-500",
            "md:w-auto md:justify-start",
            "backdrop-blur-xl",
            scrolled
              ? "border-black/[0.06] bg-white/70 shadow-[0_8px_30px_-12px_rgba(10,10,12,0.18)]"
              : "border-black/[0.04] bg-white/40 shadow-[0_2px_10px_-8px_rgba(10,10,12,0.15)]"
          )}
          style={{
            padding: "6px",
            WebkitBackdropFilter: "saturate(160%) blur(18px)",
            backdropFilter: "saturate(160%) blur(18px)",
          }}
        >
          <div className="flex items-center pl-3 pr-2">
            <Logo compact />
          </div>

          <ul
            role="menubar"
            onMouseLeave={() => setHovered(null)}
            className="hidden items-center md:flex"
          >
            {NAV_ITEMS.map((item) => (
              <li key={item.id} role="none" className="relative">
                <NavLink
                  item={item}
                  hovered={hovered}
                  onHover={setHovered}
                />
              </li>
            ))}
          </ul>

          <div className="ml-1 flex items-center gap-1 pl-1 pr-1">
            <Link
              href="#login"
              className={cn(
                "hidden h-9 items-center rounded-full px-3 text-[13.5px] font-medium text-[var(--color-ink)]/70 transition-colors hover:text-[var(--color-ink)]/45 md:inline-flex"
              )}
            >
              Войти
            </Link>
            <motion.a
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              href="/#download"
              className={cn(
                "relative inline-flex h-9 items-center gap-1.5 overflow-hidden rounded-full px-4 text-[13.5px] font-semibold text-white",
                "shadow-[0_6px_18px_-6px_rgba(27,170,150,0.55)]"
              )}
              style={{
                background:
                  "linear-gradient(180deg, var(--color-teal-400) 0%, var(--color-teal-600) 100%)",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M8 2.5v8.2M4.3 7.4 8 11.1l3.7-3.7M3 13h10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="hidden sm:inline">Скачать</span>
            </motion.a>

            <button
              type="button"
              aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen((v) => !v)}
              className="ml-1 grid h-9 w-9 place-items-center rounded-full border border-black/[0.06] bg-white/60 text-[var(--color-ink)] md:hidden"
            >
              <Burger open={mobileOpen} />
            </button>
          </div>
        </nav>
      </motion.header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        items={NAV_ITEMS}
      />
    </>
  );
}

function NavLink({
  item,
  hovered,
  onHover,
}: {
  item: NavItem;
  hovered: string | null;
  onHover: (id: string | null) => void;
}) {
  const className = cn(
    "relative inline-flex h-9 items-center rounded-full px-4 text-[13.5px] font-medium text-[var(--color-ink)]/75 transition-colors",
    "hover:text-[var(--color-ink)]"
  );

  const content = (
    <>
      {item.label}
      <AnimatePresence>
        {hovered === item.id && (
          <motion.span
            layoutId="nav-underline"
            className="pointer-events-none absolute bottom-1 left-4 right-4 h-[2px] rounded-full"
            style={{ background: "var(--color-teal-500)" }}
            transition={{
              type: "spring",
              stiffness: 420,
              damping: 34,
              mass: 0.6,
            }}
          />
        )}
      </AnimatePresence>
    </>
  );

  if (item.isRoute) {
    return (
      <Link
        role="menuitem"
        href={item.href}
        onMouseEnter={() => onHover(item.id)}
        onFocus={() => onHover(item.id)}
        className={className}
      >
        {content}
      </Link>
    );
  }

  return (
    <a
      role="menuitem"
      href={item.href}
      onMouseEnter={() => onHover(item.id)}
      onFocus={() => onHover(item.id)}
      className={className}
    >
      {content}
    </a>
  );
}

function Burger({ open }: { open: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <motion.path
        d="M2 4.5h12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        animate={open ? { d: "M3.5 3.5l9 9", opacity: 1 } : { d: "M2 4.5h12", opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.path
        d="M2 8h12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.25 }}
        style={{ originX: 0.5, originY: 0.5 }}
      />
      <motion.path
        d="M2 11.5h12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        animate={open ? { d: "M3.5 12.5l9 -9", opacity: 1 } : { d: "M2 11.5h12", opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

function MobileMenu({
  open,
  onClose,
  items,
}: {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-nav"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-40 flex flex-col md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[var(--color-ink)]/18 backdrop-blur-md"
          />

          <motion.div
            initial={{ y: "-6%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-4%", opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-0 mt-[72px] overflow-hidden rounded-b-[28px] border-b border-black/[0.06] bg-white px-4 pb-5 pt-2 shadow-[0_40px_80px_-30px_rgba(10,10,12,0.25)] sm:px-5"
          >
            <ul className="flex flex-col divide-y divide-black/[0.05]">
              {items.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: 0.05 + i * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <MobileNavLink item={item} onClose={onClose} />
                </motion.li>
              ))}
            </ul>

            <div className="mt-5 flex flex-col gap-3 border-t border-black/[0.05] pt-5">
              <Link
                href="#login"
                onClick={onClose}
                className="inline-flex h-12 w-full items-center justify-center rounded-full border border-black/[0.08] bg-white text-[15px] font-semibold text-[var(--color-ink)]"
              >
                Войти
              </Link>
              <Link
                href="/#download"
                onClick={onClose}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full text-[15px] font-semibold text-white shadow-[0_10px_24px_-10px_rgba(27,170,150,0.55)]"
                style={{
                  background:
                    "linear-gradient(180deg, var(--color-teal-400) 0%, var(--color-teal-600) 100%)",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M8 2.5v8.2M4.3 7.4 8 11.1l3.7-3.7M3 13h10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Скачать SDViGApp
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MobileNavLink({
  item,
  onClose,
}: {
  item: NavItem;
  onClose: () => void;
}) {
  const baseClass =
    "flex items-center justify-between px-2 py-5 text-[18px] font-semibold text-[var(--color-ink)] active:bg-black/[0.03]";

  if (item.isRoute) {
    return (
      <Link href={item.href} onClick={onClose} className={baseClass}>
        <span>{item.label}</span>
        <Chevron />
      </Link>
    );
  }

  return (
    <a href={item.href} onClick={onClose} className={baseClass}>
      <span>{item.label}</span>
      <Chevron />
    </a>
  );
}

function Chevron() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M6 3.5 10.5 8 6 12.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.4"
      />
    </svg>
  );
}
