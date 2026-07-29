import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";

const KF_ID = "osc-keyframes";
if (typeof document !== "undefined" && !document.getElementById(KF_ID)) {
  const s = document.createElement("style");
  s.id = KF_ID;
  s.textContent = `
    @keyframes osc-fadeUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
    @keyframes osc-iconPop { 0%{transform:scale(.4) rotate(-20deg);opacity:0} 70%{transform:scale(1.18) rotate(4deg)} 100%{transform:scale(1) rotate(0);opacity:1} }
    @keyframes osc-shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
    @keyframes osc-barIn   { from{transform:scaleX(0)} to{transform:scaleX(1)} }
  `;
  document.head.appendChild(s);
}

/**
 * @param {{ end: number, prefix?: string, duration?: number, ready: boolean }} props
 */
export function Counter({ end, prefix = "", duration = 1100, ready }) {
  const [val, setVal] = useState(0);
  const raf = useRef(/** @type {number|null} */ (null));

  useEffect(() => {
    if (!ready) return;
    const t0 = performance.now();
    const tick = (/** @type {number} */ now) => {
      const p = Math.min((now - t0) / duration, 1);
      const e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setVal(Math.round(end * e));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [end, duration, ready]);

  return (
    <>
      {prefix}
      {val.toLocaleString()}
    </>
  );
}

/**
 * @param {{ color: string, delay: number }} props
 */
export function AccentBar({ color, delay }) {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "3px",
        borderRadius: "0 0 8px 8px",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          height: "100%",
          background: `linear-gradient(90deg, transparent, ${color}cc, transparent)`,
          transformOrigin: "left",
          animation: `osc-barIn .7s cubic-bezier(.4,0,.2,1) ${delay}ms both`,
        }}
      />
    </Box>
  );
}

/**
 * @param {{ color: string, visible: boolean }} props
 */
export function Shimmer({ color, visible }) {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        borderRadius: "inherit",
        background: `linear-gradient(105deg, transparent 35%, ${color}18 50%, transparent 65%)`,
        backgroundSize: "250% 100%",
        animation: visible ? "osc-shimmer 1.5s linear infinite" : "none",
        opacity: visible ? 1 : 0,
        transition: "opacity .2s",
        pointerEvents: "none",
      }}
    />
  );
}

/**
 * @param {number} delay
 * @returns {{ ready: boolean, hovered: boolean, handlers: { onMouseEnter: () => void, onMouseLeave: () => void } }}
 */
export function useCardState(delay) {
  const [ready, setReady] = useState(false);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return {
    ready,
    hovered,
    handlers: {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
    },
  };
}
