"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useMotionValue } from "framer-motion";

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  format?: (value: number) => string;
  once?: boolean;
}

const defaultFormat = (v: number) => Math.round(v).toLocaleString("tr-TR");

/**
 * Scroll-triggered count-up. Animates from `from` to `to` on first viewport entry.
 * Monad uses this for the headline stats strip (TPS, validators, finality).
 */
export function CountUp({
  to,
  from = 0,
  duration = 1.2,
  format = defaultFormat,
  once = true,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: "-10%" });
  const motionValue = useMotionValue(from);
  const [display, setDisplay] = useState(() => format(from));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, to, {
      duration,
      ease: [0.4, 0, 0.2, 1],
      onUpdate: (latest) => setDisplay(format(latest)),
    });
    return () => controls.stop();
  }, [inView, to, duration, format, motionValue]);

  return <span ref={ref}>{display}</span>;
}
