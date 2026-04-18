"use client";

import { useEffect, useState } from "react";

/**
 * Detect small viewports (≤ 768px by default). SSR-safe: returns false on first render,
 * then updates on mount. Listens to matchMedia changes.
 */
export function useIsMobile(maxWidthPx = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia(`(max-width: ${maxWidthPx}px)`);
    const apply = () => setIsMobile(mql.matches);
    apply();
    mql.addEventListener("change", apply);
    return () => mql.removeEventListener("change", apply);
  }, [maxWidthPx]);

  return isMobile;
}
