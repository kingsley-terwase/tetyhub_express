// @ts-nocheck
import { useEffect, useRef, useState } from "react";

/**
 * useReveal — fires once when the element scrolls into view.
 * Returns a ref to attach and a boolean you use to toggle the
 * "is-visible" class from animations.css (or pass into useCountUp).
 */

export function useReveal({
  threshold = 0.25,
  rootMargin = "0px 0px -10% 0px",
} = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, isVisible];
}

/**
 * useCountUp — animates 0 -> target once `start` becomes true.
 * Pair with useReveal: pass its `isVisible` as `start`.
 * @param {unknown} target
 */
export function useCountUp(target, { duration = 1600, start = false } = {}) {
  const [value, setValue] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!start || hasRun.current) return undefined;
    hasRun.current = true;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setValue(target);
      return undefined;
    }

    let frame;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      // @ts-ignore
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, target, duration]);

  return value;
}

/** Ticks down to a target time, hoursFromNow after first mount. Returns {h,m,s,expired}. */
export function useCountdown(hoursFromNow = 6) {
  const targetRef = useRef(Date.now() + hoursFromNow * 3600 * 1000);
  const [remaining, setRemaining] = useState(targetRef.current - Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining(Math.max(targetRef.current - Date.now(), 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const totalSeconds = Math.floor(remaining / 1000);
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");

  return { h, m, s, expired: remaining <= 0 };
}
