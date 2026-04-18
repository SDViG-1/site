# Shift — Landing Page

A premium, production-ready landing page for a productivity product, built with
Next.js 16 App Router, TypeScript, Tailwind CSS v4 and Framer Motion. The
interaction language is Russian.

The page is composed of eight sections — every one crafted with custom motion
design, no templates or stock imagery.

## Sections

1. **Floating capsule navigation** — frosted glass that deepens on scroll,
   spring-animated teal underline, calm text link and solid teal CTA.
2. **Hero** — large heading with a _breathing_ last-word morph («хаоса» →
   «выгорания» → «прокрастинации»), hand-built floating phone mockup with its
   own Day-tab UI, soft teal blurs behind.
3. **Dark Room (empathy)** — page fades from white to graphite, scroll-driven
   oversized phrases cross-fade in and out.
4. **Ecosystem** — asymmetric Bento grid (Morning/Evening, Focus, Wellbeing,
   Inbox/Finance). Every card has its own bespoke hover choreography (task
   check-off, focus progress ring, wellbeing bars filling, money blur).
5. **Dopamine engine** — matte gold Hex-S coin that assembles from construction
   lines; translucent hexagons orbit behind; the «Мастер» ring ignites on
   scroll.
6. **Privacy safe** — monolithic lock whose shackle snaps closed when the block
   enters the viewport, plus three small pillars.
7. **Pricing** — Базовый (Спокойствие) and Премиум (Ритм) with gold trim,
   «Выбор фаундера» ribbon, and a teal heartbeat-pulsing CTA.
8. **Footer** — bank-quality minimal corporate layout with links, status chip,
   and regulatory disclosure.

## Tech stack

- Next.js 16 (App Router, Turbopack)
- React 19 + TypeScript
- Tailwind CSS v4 (custom `@theme` tokens — teal / gold / graphite)
- Framer Motion (all animations, scroll progress, layout-id underline, etc.)
- `clsx` + `tailwind-merge` for class composition
- `next/font/google` — Inter (Cyrillic) + Lora (Cyrillic italic display) +
  JetBrains Mono

## Scripts

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # Production build
npm run start     # Production server
npm run lint
```

## Structure

```
src/
├── app/
│   ├── globals.css       # Theme tokens, keyframes, utility classes
│   ├── layout.tsx        # Fonts, metadata, root shell
│   └── page.tsx          # Composition of sections
├── components/
│   ├── sections/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Empathy.tsx
│   │   ├── Ecosystem.tsx
│   │   ├── Gamification.tsx
│   │   ├── Privacy.tsx
│   │   ├── Pricing.tsx
│   │   └── Footer.tsx
│   ├── ui/
│   │   └── Logo.tsx
│   └── visual/
│       └── PhoneMockup.tsx
└── lib/
    └── utils.ts          # cn() helper
```

## Motion principles

- Easing is consistent: `[0.22, 1, 0.36, 1]` (out-quint) for entrances,
  `[0.65, 0, 0.35, 1]` for snappier interactions (lock, buttons).
- `prefers-reduced-motion` is respected globally (see `globals.css`).
- No layout thrash: hover scales are tiny (≤ 1.5%), the morphing word reserves
  space with an invisible placeholder of the longest word.

## Design tokens

Defined via Tailwind v4 `@theme` in `globals.css`:

- `--color-teal-*` (50 → 900) — calm turquoise accent.
- `--color-gold-*` (50 → 900) — matte editorial gold (no cheap shine).
- `--color-ink`, `--color-graphite`, `--color-cream`, `--color-paper`.
- `--shadow-soft`, `--shadow-card`, `--shadow-glow-teal`, `--shadow-glow-gold`.
- `--ease-out-quint`, `--ease-in-out-quart`.

## Notes

- All copy is Russian (as specified); language is set in `<html lang="ru">`.
- Every visual — phone UI, hex coin, lock, icons — is hand-drawn inline SVG;
  no image assets required.
