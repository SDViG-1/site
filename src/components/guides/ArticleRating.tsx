"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const MAX_CHARS = 500;

export function ArticleRating() {
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const displayed = hover || rating;
  const locked = rating > 0;
  const chars = feedback.length;
  const overLimit = chars >= MAX_CHARS;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const next = e.target.value;
    if (next.length > MAX_CHARS) {
      setFeedback(next.slice(0, MAX_CHARS));
      return;
    }
    setFeedback(next);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      aria-labelledby="rating-heading"
      className="rounded-[24px] border border-black/[0.06] bg-white p-6 sm:p-8"
    >
      <h3
        id="rating-heading"
        className="text-[20px] font-semibold tracking-[-0.01em] text-[var(--color-ink)] sm:text-[22px]"
      >
        Насколько полезен был этот материал?
      </h3>

      <div
        role="radiogroup"
        aria-label="Оценка материала"
        onMouseLeave={() => !locked && setHover(0)}
        className="mt-5 flex items-center gap-2 sm:gap-2.5"
      >
        {[1, 2, 3, 4, 5].map((n) => {
          const active = n <= displayed;
          return (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={rating === n}
              aria-label={`${n} ${n === 1 ? "звезда" : n < 5 ? "звезды" : "звёзд"}`}
              onMouseEnter={() => !locked && setHover(n)}
              onFocus={() => !locked && setHover(n)}
              onClick={() => {
                if (submitted) return;
                setRating(n);
                setHover(0);
              }}
              disabled={submitted}
              className="group grid h-11 w-11 place-items-center rounded-full transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.08] focus-visible:scale-[1.08] disabled:opacity-70 sm:h-12 sm:w-12"
            >
              <Star active={active} />
            </button>
          );
        })}

        <span className="ml-2 text-[12.5px] font-medium text-[var(--color-ink)]/45">
          {locked ? `${rating} из 5` : "оцените от 1 до 5"}
        </span>
      </div>

      <AnimatePresence initial={false} mode="wait">
        {locked && !submitted && (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -6, height: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={handleSubmit}
            className="overflow-hidden"
          >
            <div className="mt-6">
              <label htmlFor="feedback" className="sr-only">
                Заметки или пожелания
              </label>
              <div className="relative">
                <textarea
                  id="feedback"
                  name="feedback"
                  value={feedback}
                  onChange={handleChange}
                  rows={4}
                  maxLength={MAX_CHARS}
                  placeholder="Ваши заметки или пожелания..."
                  className="block w-full resize-none rounded-[16px] bg-[#f4f4f3] px-4 py-3.5 pr-20 text-[14.5px] leading-relaxed text-[var(--color-ink)] placeholder:text-[var(--color-ink)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-teal-400)]/70"
                  style={{ border: "1px solid transparent" }}
                />
                <span
                  aria-live="polite"
                  className={`pointer-events-none absolute bottom-3 right-4 text-[11.5px] font-medium tabular-nums transition-colors duration-300 ${
                    overLimit
                      ? "text-red-500"
                      : "text-[var(--color-ink)]/40"
                  }`}
                >
                  {chars} / {MAX_CHARS}
                </span>
              </div>

              <div className="mt-4 flex justify-end">
                <motion.button
                  type="submit"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-[14px] font-semibold text-white shadow-[0_10px_24px_-12px_rgba(27,170,150,0.55)]"
                  style={{
                    background:
                      "linear-gradient(180deg, var(--color-teal-400) 0%, var(--color-teal-600) 100%)",
                  }}
                >
                  Отправить
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 8h11.5m0 0L9 3.5M13.5 8 9 12.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.form>
        )}

        {submitted && (
          <motion.div
            key="thanks"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 flex items-center gap-3 rounded-[16px] bg-[var(--color-teal-50)] px-4 py-4"
          >
            <span
              className="grid h-8 w-8 flex-none place-items-center rounded-full text-white"
              style={{ background: "var(--color-teal-500)" }}
            >
              <motion.svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <motion.path
                  d="M3.5 8.5 6.7 11.6 12.5 5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                />
              </motion.svg>
            </span>
            <p className="text-[14.5px] font-semibold text-[var(--color-teal-800)]">
              Спасибо за отзыв!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Star({ active }: { active: boolean }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      className="transition-[fill,stroke] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
    >
      <defs>
        <linearGradient id="goldStarFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#e7d094" />
          <stop offset="55%" stopColor="#c9a14a" />
          <stop offset="100%" stopColor="#7b592a" />
        </linearGradient>
      </defs>
      <path
        d="M14 2.8l3.24 6.95 7.58 1-5.58 5.27 1.42 7.52L14 20.04l-6.66 3.5 1.42-7.52L3.18 10.75l7.58-1z"
        fill={active ? "url(#goldStarFill)" : "transparent"}
        stroke={active ? "#7b592a" : "#c9a14a"}
        strokeOpacity={active ? 0.5 : 0.9}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
