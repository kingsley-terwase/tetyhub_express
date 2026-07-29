// @ts-nocheck
import { useState } from "react";
import { keyframes } from "@emotion/react";
import { Box, Stack, Typography } from "@mui/material";
import { LightbulbFilament24Regular } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radiusTokens } from "@/lib/theme";
import { useReveal } from "../Hooks";

const ripple = keyframes`
  0% { transform: scale(1); opacity: 0.55; }
  100% { transform: scale(1.9); opacity: 0; }
`;

const NODES = [
  {
    id: "browse",
    label: "Browse",
    sticker: "🔍",
    color: "#3b82f6",
    pos: { top: 60, left: 200 },
    title: "Browse & Discover",
    body: "Explore thousands of products across every category, filtered by price, rating, and seller trust score.",
  },
  {
    id: "order",
    label: "Order",
    sticker: "🛍️",
    color: "#f59e0b",
    pos: { top: 157, left: 333 },
    title: "Order & Checkout",
    body: "Add to cart, checkout securely, and get instant confirmation — no back-and-forth needed.",
  },
  {
    id: "track",
    label: "Track",
    sticker: "🚚",
    color: "#10b981",
    pos: { top: 313, left: 282 },
    title: "Track Your Order",
    body: "Follow every shipment with live updates from the seller, so you always know where things stand.",
  },
  {
    id: "support",
    label: "Support",
    sticker: "💬",
    color: "#8b5cf6",
    pos: { top: 313, left: 118 },
    title: "Real Support",
    body: "Reach a real person through chat or WhatsApp whenever something needs sorting out.",
  },
  {
    id: "sell",
    label: "Sell",
    sticker: "🚀",
    color: "#ec4899",
    pos: { top: 157, left: 67 },
    title: "Sell on TETYHUB",
    body: "List your first product in minutes and start reaching buyers across the platform immediately.",
  },
];

const HUB = { top: 190, left: 200 };

function EcosystemDiagram({ active, setActive, main, bg, fg, border }) {
  return (
    <Box
      sx={{
        position: "relative",
        width: 400,
        height: 380,
        maxWidth: "100%",
        mx: "auto",
      }}
    >
      <svg
        width="400"
        height="380"
        style={{ position: "absolute", top: 0, left: 0, overflow: "visible" }}
      >
        <defs>
          <marker
            id="arrow-inactive"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="4"
            orient="auto"
          >
            <path d="M0,0 L8,4 L0,8 Z" fill={"gray"} />
          </marker>
          <marker
            id="arrow-active"
            markerWidth="9"
            markerHeight="9"
            refX="6"
            refY="4.5"
            orient="auto"
          >
            <path d="M0,0 L9,4.5 L0,9 Z" fill={NODES[active].color} />
          </marker>
        </defs>
        {NODES.map((node, i) => {
          const isActive = i === active;
          // pull the endpoint in slightly so the arrowhead doesn't hide under the node circle
          const dx = node.pos.left - HUB.left;
          const dy = node.pos.top - HUB.top;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const pullBack = 40;
          const x2 = node.pos.left - (dx / dist) * pullBack;
          const y2 = node.pos.top - (dy / dist) * pullBack;
          return (
            <line
              key={node.id}
              x1={HUB.left}
              y1={HUB.top}
              x2={x2}
              y2={y2}
              stroke={isActive ? node.color : "gray"}
              strokeWidth={isActive ? 2.5 : 1.4}
              strokeDasharray={isActive ? "0" : "4 4"}
              markerEnd={
                isActive ? "url(#arrow-active)" : "url(#arrow-inactive)"
              }
            />
          );
        })}
      </svg>

      {/* center hub */}
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          position: "absolute",
          top: HUB.top,
          left: HUB.left,
          transform: "translate(-50%, -50%)",
          width: 96,
          height: 96,
          borderRadius: "50%",
          border: "3px solid #fff",
          backgroundColor: main.primary,
          boxShadow: `0 8px 24px -6px ${main.primary}88`,
          textAlign: "center",
          zIndex: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.2,
            px: 1,
          }}
        >
          TETYHUB
        </Typography>
        <Typography sx={{ fontSize: 10, color: "rgba(255,255,255,0.8)" }}>
          ECOSYSTEM
        </Typography>
      </Stack>

      {NODES.map((node, i) => {
        const isActive = active === i;
        return (
          <Box
            key={node.id}
            sx={{
              position: "absolute",
              top: node.pos.top,
              left: node.pos.left,
              transform: "translate(-50%, -50%)",
            }}
          >
            {isActive && (
              <>
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    backgroundColor: node.color,
                    animation: `${ripple} 1.8s ease-out infinite`,
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    backgroundColor: node.color,
                    animation: `${ripple} 1.8s ease-out infinite`,
                    animationDelay: "0.6s",
                  }}
                />
              </>
            )}
            <Stack
              alignItems="center"
              justifyContent="center"
              onClick={() => setActive(i)}
              sx={{
                position: "relative",
                width: 68,
                height: 68,
                borderRadius: "50%",
                cursor: "pointer",
                backgroundColor: isActive ? node.color : bg.secondary,
                border: `2px solid ${isActive ? node.color : border.primary}`,
                boxShadow: isActive
                  ? `0 6px 18px -4px ${node.color}aa`
                  : "none",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                zIndex: 2,
                "&:hover": { transform: "scale(1.06)" },
              }}
            >
              <Typography sx={{ fontSize: 20, lineHeight: 1 }}>
                {node.sticker}
              </Typography>
              <Typography
                sx={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: isActive ? "#fff" : fg.primary,
                  mt: 0.3,
                }}
              >
                {node.label}
              </Typography>
            </Stack>
          </Box>
        );
      })}
    </Box>
  );
}

export default function HowItWorks() {
  const { bg, fg, border, main } = useColor();
  const [active, setActive] = useState(0);
  const header = useReveal();
  const diagram = useReveal();
  const activeNode = NODES[active];

  return (
    <Box sx={{ px: { xs: 3, md: 8 }, py: 8 }}>
      <Stack
        ref={header.ref}
        className={header.className}
        alignItems="center"
        textAlign="center"
        gap={1.5}
        sx={{ maxWidth: 640, mx: "auto", mb: 6 }}
      >
        <Box
          sx={{
            px: 1.7,
            py: 0.5,
            borderRadius: radiusTokens.xl,
            border: `1px solid ${main.primary}`,
            backgroundColor: bg.primary,
          }}
        >
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.06em",
              color: main.primary,
              fontFamily: "Syne",
            }}
          >
            ● HOW IT WORKS
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: { xs: 26, md: 34 },
            fontWeight: 800,
            color: fg.primary,
          }}
        >
          How Buyers{" "}
          <Box component="span" sx={{ color: main.primary }}>
            Actually
          </Box>{" "}
          Use TETY
          <Box component="span" sx={{ color: main.primary }}>
            HUB
          </Box>{" "}
        </Typography>
        <Typography sx={{ fontSize: 15, color: fg.secondary }}>
          Start anywhere. Every path — buying or selling — leads back to the
          same marketplace.
        </Typography>
      </Stack>

      <Stack
        direction={{ xs: "column", md: "row" }}
        gap={{ xs: 4, md: 6 }}
        alignItems="center"
      >
        <Box
          ref={diagram.ref}
          className={diagram.className}
          sx={{ flex: "1 1 380px" }}
        >
          <EcosystemDiagram
            active={active}
            setActive={setActive}
            main={main}
            bg={bg}
            fg={fg}
            border={border}
          />
        </Box>

        <Stack sx={{ flex: "1 1 380px", width: "100%" }} gap={2}>
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {NODES.map((node, i) => (
              <Stack
                key={node.id}
                direction="row"
                alignItems="center"
                gap={0.5}
                onClick={() => setActive(i)}
                sx={{
                  px: 1.5,
                  py: 0.4,
                  borderRadius: radiusTokens.xl,
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 700,
                  color: active === i ? "#fff" : fg.secondary,
                  backgroundColor: active === i ? main.primary : bg.secondary,
                  border: `1px solid ${active === i ? main.primary : border.primary}`,
                  transition: "all 0.2s ease",
                }}
              >
                <Typography
                  sx={{ fontSize: 13, fontWeight: 700, color: "inherit" }}
                >
                  {node.label}
                </Typography>
                <Typography sx={{ fontSize: 14 }}>{node.sticker}</Typography>
              </Stack>
            ))}
          </Stack>

          <Box
            sx={{
              borderRadius: radiusTokens.md,
              border: `1px solid ${border.primary}`,
              backgroundColor: bg.secondary,
              p: spacingTokens.lg,
            }}
          >
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 700,
                color: activeNode.color,
                letterSpacing: "0.06em",
                mb: 0.5,
              }}
            >
              STEP 0{active + 1}
            </Typography>
            <Typography
              sx={{ fontSize: 19, fontWeight: 800, color: fg.primary, mb: 1 }}
            >
              {activeNode.title}
            </Typography>
            <Typography
              sx={{ fontSize: 14, color: fg.secondary, lineHeight: 1.6, mb: 2 }}
            >
              {activeNode.body}
            </Typography>

            <Stack direction="row" gap={0.6}>
              {NODES.map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    flex: 1,
                    height: 4,
                    borderRadius: 999,
                    backgroundColor:
                      i <= active ? activeNode.color : border.primary,
                    transition: "background-color 0.25s ease",
                  }}
                />
              ))}
            </Stack>
          </Box>

          <Stack
            direction="row"
            gap={1.2}
            sx={{
              p: spacingTokens.md,
              borderRadius: radiusTokens.md,
              backgroundColor: `${main.primary}0d`,
            }}
          >
            <LightbulbFilament24Regular
              style={{ fontSize: 20, color: main.primary, flexShrink: 0 }}
            />
            <Box>
              <Typography
                sx={{ fontSize: 13, fontWeight: 700, color: fg.primary }}
              >
                You can start anywhere.
              </Typography>
              <Typography sx={{ fontSize: 13, color: fg.secondary }}>
                Ready to buy? Start with Browse. Ready to sell? Jump straight to
                Sell — your journey, your pace.
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
