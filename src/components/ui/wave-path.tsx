"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type WavePathProps = React.ComponentProps<"div">;

export function WavePath({ className, ...props }: WavePathProps) {
  const path = useRef<SVGPathElement>(null);
  const stateRef = useRef({
    progress: 0,
    x: 0.2,
    time: Math.PI / 2,
    reqId: null as number | null,
  });

  const setPath = (progress: number) => {
    if (typeof window === "undefined") return;
    const width = window.innerWidth * 0.7;
    if (path.current) {
      path.current.setAttributeNS(
        null,
        "d",
        `M0 100 Q${width * stateRef.current.x} ${100 + progress * 0.6}, ${width} 100`
      );
    }
  };

  const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;

  const resetAnimation = () => {
    stateRef.current.time = Math.PI / 2;
    stateRef.current.progress = 0;
  };

  const animateOut = () => {
    const s = stateRef.current;
    const newProgress = s.progress * Math.sin(s.time);
    s.progress = lerp(s.progress, 0, 0.025);
    s.time += 0.2;
    setPath(newProgress);
    if (Math.abs(s.progress) > 0.75) {
      s.reqId = requestAnimationFrame(animateOut);
    } else {
      resetAnimation();
    }
  };

  const manageMouseEnter = () => {
    const s = stateRef.current;
    if (s.reqId) {
      cancelAnimationFrame(s.reqId);
      resetAnimation();
    }
  };

  const manageMouseMove = (e: React.MouseEvent) => {
    const s = stateRef.current;
    const { movementY, clientX } = e;
    if (path.current) {
      const pathBound = path.current.getBoundingClientRect();
      s.x = (clientX - pathBound.left) / pathBound.width;
      s.progress += movementY;
      setPath(s.progress);
    }
  };

  const manageMouseLeave = () => {
    animateOut();
  };

  useEffect(() => {
    setPath(0);
    const state = stateRef.current;
    const onResize = () => setPath(state.progress);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (state.reqId) cancelAnimationFrame(state.reqId);
    };
  }, []);

  return (
    <div
      className={cn("relative mx-auto h-px w-[70vw] text-white/40", className)}
      {...props}
    >
      <div
        onMouseEnter={manageMouseEnter}
        onMouseMove={manageMouseMove}
        onMouseLeave={manageMouseLeave}
        className="relative -top-5 z-10 h-10 w-full hover:-top-[150px] hover:h-[300px]"
      />
      <svg className="pointer-events-none absolute -top-[100px] h-[300px] w-full">
        <path
          ref={path}
          className="fill-none stroke-current"
          strokeWidth={1.25}
        />
      </svg>
    </div>
  );
}
