// @ts-nocheck
import { useEffect, useState } from "react";
import { keyframes } from "@emotion/react";
import { Box, Stack, Typography } from "@mui/material";

/**
 * AppLoader — full-screen branded loading state.
 *
 * Usage:
 *   const [ready, setReady] = useState(false);
 *   return ready ? <App /> : <AppLoader show onHidden={() => {}} />;
 *
 * Or with real progress (data fetch, asset preload, etc):
 *   <AppLoader show progress={pct} />
 *
 * Props:
 *   show       — boolean. Set false to trigger the exit animation.
 *   progress   — optional 0–100 number. Omit for a smooth indeterminate bar.
 *   onHidden   — called once the exit transition finishes (unmount here).
 *   primary    — brand accent color (defaults to TETYHUB blue).
 *   tagline    — small line under the wordmark.
 */

const drift = keyframes`
  0%   { transform: translate(0, 0) scale(1); }
  50%  { transform: translate(3%, -4%) scale(1.06); }
  100% { transform: translate(0, 0) scale(1); }
`;

const drift2 = keyframes`
  0%   { transform: translate(0, 0) scale(1); }
  50%  { transform: translate(-4%, 3%) scale(1.08); }
  100% { transform: translate(0, 0) scale(1); }
`;

const ringSpin = keyframes`
  to { transform: rotate(360deg); }
`;

const breathe = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.06); }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0%   { transform: translateX(-60%); }
  100% { transform: translateX(160%); }
`;

const dotPulse = keyframes`
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.35; }
  40% { transform: scale(1); opacity: 1; }
`;

export default function AppLoader({
  show = true,
  progress,
  onHidden,
  primary = "#0b298a",
  brand = "TETY",
  brandAccent = "HUB",
  tagline = "Connecting you with trusted people.",
}) {
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(show);

  useEffect(() => {
    if (!show && mounted) {
      setExiting(true);
      const t = setTimeout(() => {
        setMounted(false);
        onHidden?.();
      }, 520);
      return () => clearTimeout(t);
    }
    if (show) {
      setMounted(true);
      setExiting(false);
    }
  }, [show]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!mounted) return null;

  const determinate = typeof progress === "number";

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        overflow: "hidden",
        opacity: exiting ? 0 : 1,
        transform: exiting ? "scale(1.03)" : "scale(1)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
        pointerEvents: exiting ? "none" : "auto",
      }}
    >
      {/* soft drifting background blobs for depth */}
      <Box
        sx={{
          position: "absolute",
          top: "-10%",
          left: "-8%",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${primary}22 0%, transparent 70%)`,
          animation: `${drift} 9s ease-in-out infinite`,
          filter: "blur(2px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-12%",
          right: "-6%",
          width: 360,
          height: 360,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${primary}18 0%, transparent 70%)`,
          animation: `${drift2} 11s ease-in-out infinite`,
          filter: "blur(2px)",
        }}
      />

      <Stack alignItems="center" sx={{ position: "relative", zIndex: 1 }}>
        {/* logo mark with spinning ring */}
        <Box sx={{ position: "relative", width: 86, height: 86, mb: 3.5 }}>
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "7px solid transparent",
              borderTopColor: primary,
              borderRightColor: `${primary}55`,
              animation: `${ringSpin} 1s linear infinite`,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 10,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${primary}, ${primary}cc)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 8px 24px ${primary}40`,
              animation: `${breathe} 2.4s ease-in-out infinite`,
            }}
          >
            <Typography
              sx={{
                fontFamily: "Syne",
                fontWeight: 700,
                fontSize: 36,
                color: "#fff",
                letterSpacing: "-0.02em",
              }}
            >
              T
            </Typography>
          </Box>
        </Box>

        {/* wordmark */}
        <Stack
          direction="row"
          sx={{ animation: `${fadeUp} 0.5s ease-out 0.15s both` }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: 800,
              fontSize: 26,
              color: "#14161a",
              letterSpacing: "-0.01em",
            }}
          >
            {brand}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: 800,
              fontSize: 26,
              color: primary,
              letterSpacing: "-0.01em",
            }}
          >
            {brandAccent}
          </Typography>
        </Stack>

        {tagline && (
          <Typography
            sx={{
              fontSize: 13,
              color: "#7a7f88",
              fontFamily: "Poppins",
              mt: 0.8,
              animation: `${fadeUp} 0.5s ease-out 0.3s both`,
            }}
          >
            {tagline}
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
