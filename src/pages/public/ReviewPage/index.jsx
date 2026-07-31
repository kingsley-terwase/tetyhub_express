// @ts-nocheck
import { useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { keyframes } from "@emotion/react";
import { Box, Stack, Typography, InputBase } from "@mui/material";
import {
  ArrowLeft24Regular,
  Star24Filled,
  Star24Regular,
  CheckmarkCircle24Filled,
  ShieldCheckmark24Regular,
  CheckmarkCircleFilled,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radiusTokens } from "@/lib/theme";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Bouncy entrance for the success checkmark — overshoots then settles.
const bounceIn = keyframes`
  0% { transform: scale(0); opacity: 0; }
  45% { transform: scale(1.18); opacity: 1; }
  65% { transform: scale(0.92); }
  82% { transform: scale(1.06); }
  100% { transform: scale(1); }
`;

// Expanding ring that fires once and fades — the "ripple" behind the checkmark.
const rippleOut = keyframes`
  0% { transform: scale(0.75); opacity: 0.55; }
  100% { transform: scale(2.6); opacity: 0; }
`;

// One-shot confetti particle: flies outward to its own (--tx, --ty), spins, fades.
const confettiFly = keyframes`
  0% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 1; }
  100% { transform: translate(var(--tx), var(--ty)) rotate(var(--rot)) scale(0.4); opacity: 0; }
`;

const RATING_LABELS = [
  "",
  "Not great",
  "Could be better",
  "It was okay",
  "Really good",
  "Excellent!",
];

const TAGS_BY_RATING = {
  low: [
    "Late arrival",
    "Poor communication",
    "Not as described",
    "Would not rebook",
  ],
  high: [
    "On time",
    "Great communication",
    "High quality work",
    "Friendly",
    "Would book again",
    "Good value",
  ],
};

const CONFETTI_COLORS = [
  "#f5a623",
  "#2ecc71",
  "#3498db",
  "#e74c3c",
  "#9b59b6",
  "#1abc9c",
];

const money = (n) => `₦${Number(n || 0).toLocaleString("en-NG")}`;

// Fires once on mount: a burst of small colored pieces flying outward, then gone.
function ConfettiBurst() {
  const particles = useMemo(
    () =>
      Array.from({ length: 26 }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 90 + Math.random() * 90;
        return {
          id: i,
          tx: Math.cos(angle) * distance,
          ty: Math.sin(angle) * distance - 20,
          rot: Math.random() * 720 - 360,
          delay: Math.random() * 0.12,
          duration: 700 + Math.random() * 400,
          size: 5 + Math.random() * 5,
          color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
          round: i % 2 === 0,
        };
      }),
    [],
  );

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "visible",
      }}
    >
      {particles.map((p) => (
        <Box
          key={p.id}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: p.size,
            height: p.size,
            marginTop: -p.size / 2,
            marginLeft: -p.size / 2,
            backgroundColor: p.color,
            borderRadius: p.round ? "50%" : "2px",
            "--tx": `${p.tx}px`,
            "--ty": `${p.ty}px`,
            "--rot": `${p.rot}deg`,
            animation: `${confettiFly} ${p.duration}ms ease-out ${p.delay}s forwards`,
          }}
        />
      ))}
    </Box>
  );
}

export default function ReviewPage() {
  const { bg, fg, border, main } = useColor();
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state || {};
  const orderId = state.orderId || "TH-482913";
  const provider = state.provider || { name: "SparkleCo" };
  const items = state.items || [
    { id: "c1", title: "Deep home window cleaning (up to 3 rooms)" },
  ];

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const [review, setReview] = useState("");
  const [tip, setTip] = useState(null);
  const [customTip, setCustomTip] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const displayRating = hoverRating || rating;
  const tagOptions =
    displayRating >= 4 || (!displayRating && true)
      ? TAGS_BY_RATING.high
      : TAGS_BY_RATING.low;

  const toggleTag = (tag) =>
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );

  const tipAmount = tip === "custom" ? Number(customTip) || 0 : tip || 0;

  const canSubmit = rating > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    // Wire this up to your real reviews/tips API.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Box
        sx={{
          backgroundColor: bg.primary,
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: spacingTokens.md,
        }}
      >
        <Stack
          alignItems="center"
          textAlign="center"
          gap={1.6}
          sx={{ maxWidth: 400 }}
        >
          <Box
            sx={{
              position: "relative",
              width: 84,
              height: 84,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* ripple rings — fire once, staggered, then stay gone */}
            {[0, 0.18, 0.36].map((delay, i) => (
              <Box
                key={i}
                sx={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  border: `2px solid ${main.primary}`,
                  opacity: 0,
                  animation: `${rippleOut} 1.1s ease-out ${delay + 0.15}s forwards`,
                }}
              />
            ))}

            {/* one-time confetti burst */}
            <ConfettiBurst />

            <Box
              sx={{
                width: 84,
                height: 84,
                borderRadius: "50%",
                backgroundColor: `${main.primary}14`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                animation: `${bounceIn} 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both`,
              }}
            >
              <CheckmarkCircleFilled style={{ fontSize: 82, color: "green" }} />
            </Box>
          </Box>
          <Typography
            sx={{
              fontFamily: "Syne",
              fontWeight: 700,
              fontSize: 32,
              color: fg.primary,
              animation: `${fadeUp} 0.4s ease-out 0.3s both`,
            }}
          >
            Thanks for the feedback
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              color: fg.secondary,
              lineHeight: 1.6,
              animation: `${fadeUp} 0.4s ease-out 0.38s both`,
            }}
          >
            Your review helps other buyers choose {provider.name} with
            confidence
            {tipAmount > 0
              ? ` — and your ${money(tipAmount)} tip has been sent their way.`
              : "."}
          </Typography>
          <Box
            onClick={() => navigate("/cart")}
            sx={{
              mt: 1,
              backgroundColor: main.primary,
              color: "#fff",
              borderRadius: radiusTokens.md,
              px: 3,
              py: 1.2,
              cursor: "pointer",
              fontFamily: "Poppins",
              fontWeight: 700,
              fontSize: 14,
              animation: `${fadeUp} 0.4s ease-out 0.46s both`,
            }}
          >
            Back to my orders
          </Box>
        </Stack>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: bg.primary }}>
      <Box
        sx={{
          px: { xs: spacingTokens.md, md: spacingTokens.xl },
          pt: { xs: 3, md: 4.5 },
          pb: 2,
          maxWidth: 640,
          mx: "auto",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Syne",
            fontWeight: 700,
            fontSize: { xs: 22, md: 28 },
            color: fg.primary,
          }}
        >
          Rate your experience
        </Typography>
        <Typography sx={{ fontSize: 13, color: fg.tertiary, mt: 0.4 }}>
          Order {orderId}
        </Typography>
      </Box>

      <Box
        sx={{
          px: { xs: spacingTokens.md, md: spacingTokens.xl },
          pb: { xs: 6, md: 8 },
          maxWidth: 640,
          mx: "auto",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          gap={1.4}
          sx={{
            border: `1px solid ${border.primary}`,
            borderRadius: radiusTokens.md,
            p: spacingTokens.md,
            mb: spacingTokens.md,
            animation: `${fadeUp} 0.3s ease-out both`,
          }}
        >
          <Box
            sx={{
              width: 46,
              height: 46,
              borderRadius: "50%",
              backgroundColor: main.primary,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Poppins",
              fontWeight: 700,
              fontSize: 17,
              flexShrink: 0,
            }}
          >
            {provider.name.charAt(0)}
          </Box>
          <Stack sx={{ minWidth: 0 }}>
            <Typography
              sx={{ fontSize: 14.5, fontWeight: 700, color: fg.primary }}
            >
              {provider.name}
            </Typography>
            <Typography sx={{ fontSize: 12.5, color: fg.tertiary }} noWrap>
              {items.map((it) => it.title).join(", ")}
            </Typography>
          </Stack>
        </Stack>

        {/* star rating */}
        <Box
          sx={{
            border: `1px solid ${border.primary}`,
            borderRadius: radiusTokens.md,
            p: spacingTokens.md,
            mb: spacingTokens.md,
            textAlign: "center",
            animation: `${fadeUp} 0.3s ease-out 0.05s both`,
          }}
        >
          <Typography
            sx={{ fontSize: 13.5, fontWeight: 700, color: fg.primary, mb: 2 }}
          >
            How was the job overall?
          </Typography>
          <Stack
            direction="row"
            justifyContent="center"
            gap={1}
            sx={{ mb: 1.2 }}
          >
            {[1, 2, 3, 4, 5].map((n) => {
              const filled = n <= displayRating;
              const StarIcon = filled ? Star24Filled : Star24Regular;
              return (
                <StarIcon
                  key={n}
                  onClick={() => setRating(n)}
                  onMouseEnter={() => setHoverRating(n)}
                  onMouseLeave={() => setHoverRating(0)}
                  style={{
                    fontSize: 34,
                    color: filled ? "#f5a623" : border.primary,
                    cursor: "pointer",
                    transition: "transform 0.1s ease",
                  }}
                />
              );
            })}
          </Stack>
          <Typography
            sx={{ fontSize: 12.5, color: fg.secondary, minHeight: 18 }}
          >
            {RATING_LABELS[displayRating] || "Tap a star to rate"}
          </Typography>
        </Box>

        {/* quick tags */}
        {rating > 0 && (
          <Box
            sx={{
              border: `1px solid ${border.primary}`,
              borderRadius: radiusTokens.md,
              p: spacingTokens.md,
              mb: spacingTokens.md,
              animation: `${fadeUp} 0.3s ease-out both`,
            }}
          >
            <Typography
              sx={{
                fontSize: 13.5,
                fontWeight: 700,
                color: fg.primary,
                mb: 1.6,
              }}
            >
              What stood out?{" "}
              <Typography
                component="span"
                sx={{ fontSize: 12, color: fg.tertiary, fontWeight: 400 }}
              >
                (optional)
              </Typography>
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {tagOptions.map((tag) => {
                const active = selectedTags.includes(tag);
                return (
                  <Box
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    sx={{
                      border: `1px solid ${active ? main.primary : border.primary}`,
                      backgroundColor: active
                        ? `${main.primary}12`
                        : "transparent",
                      color: active ? main.primary : fg.secondary,
                      borderRadius: radiusTokens.full ?? 999,
                      px: 1.6,
                      py: 0.7,
                      fontSize: 12.5,
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {tag}
                  </Box>
                );
              })}
            </Stack>
          </Box>
        )}

        {/* written review */}
        {rating > 0 && (
          <Box
            sx={{
              border: `1px solid ${border.primary}`,
              borderRadius: radiusTokens.md,
              p: spacingTokens.md,
              mb: spacingTokens.md,
              animation: `${fadeUp} 0.3s ease-out 0.05s both`,
            }}
          >
            <Typography
              sx={{
                fontSize: 13.5,
                fontWeight: 700,
                color: fg.primary,
                mb: 1.2,
              }}
            >
              Tell us more{" "}
              <Typography
                component="span"
                sx={{ fontSize: 12, color: fg.tertiary, fontWeight: 400 }}
              >
                (optional)
              </Typography>
            </Typography>
            <Box
              sx={{
                border: `1px solid ${border.primary}`,
                borderRadius: radiusTokens.sm ?? 8,
                px: 1.6,
                py: 1.2,
              }}
            >
              <InputBase
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder={`Share details about the ${provider.name} experience — what went well, what could improve...`}
                multiline
                minRows={3}
                sx={{ fontSize: 13, width: "100%", color: fg.primary }}
              />
            </Box>
          </Box>
        )}

        {/* tip */}
        {rating >= 4 && (
          <Box
            sx={{
              border: `1px solid ${border.primary}`,
              borderRadius: radiusTokens.md,
              p: spacingTokens.md,
              mb: spacingTokens.md,
              animation: `${fadeUp} 0.3s ease-out 0.1s both`,
            }}
          >
            <Typography
              sx={{
                fontSize: 13.5,
                fontWeight: 700,
                color: fg.primary,
                mb: 0.4,
              }}
            >
              Add a tip for {provider.name}?
            </Typography>
            <Typography sx={{ fontSize: 12, color: fg.tertiary, mb: 1.6 }}>
              100% goes directly to your provider.
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {[500, 1000, 2000].map((amt) => (
                <Box
                  key={amt}
                  onClick={() => setTip(tip === amt ? null : amt)}
                  sx={{
                    border: `1px solid ${tip === amt ? main.primary : border.primary}`,
                    backgroundColor:
                      tip === amt ? `${main.primary}12` : "transparent",
                    color: tip === amt ? main.primary : fg.primary,
                    borderRadius: radiusTokens.sm ?? 8,
                    px: 1.8,
                    py: 0.9,
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {money(amt)}
                </Box>
              ))}
              <Box
                onClick={() => setTip(tip === "custom" ? null : "custom")}
                sx={{
                  border: `1px solid ${tip === "custom" ? main.primary : border.primary}`,
                  backgroundColor:
                    tip === "custom" ? `${main.primary}12` : "transparent",
                  color: tip === "custom" ? main.primary : fg.primary,
                  borderRadius: radiusTokens.sm ?? 8,
                  px: 1.8,
                  py: 0.9,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Custom
              </Box>
            </Stack>
            {tip === "custom" && (
              <Box
                sx={{
                  mt: 1.4,
                  border: `1px solid ${border.primary}`,
                  borderRadius: radiusTokens.sm ?? 8,
                  px: 1.4,
                  py: 0.9,
                  maxWidth: 180,
                }}
              >
                <InputBase
                  value={customTip}
                  onChange={(e) =>
                    setCustomTip(e.target.value.replace(/[^\d]/g, ""))
                  }
                  placeholder="₦ amount"
                  sx={{ fontSize: 13, width: "100%", color: fg.primary }}
                />
              </Box>
            )}
          </Box>
        )}

        {/* submit */}
        <Box
          onClick={handleSubmit}
          sx={{
            textAlign: "center",
            backgroundColor: canSubmit ? main.primary : border.primary,
            color: "#fff",
            borderRadius: radiusTokens.md,
            py: 1.4,
            fontFamily: "Poppins",
            fontWeight: 700,
            fontSize: 14.5,
            cursor: canSubmit ? "pointer" : "not-allowed",
            transition: "transform 0.15s ease",
            "&:hover": canSubmit
              ? { transform: "translateY(-1px)" }
              : undefined,
          }}
        >
          Submit review{tipAmount > 0 ? ` & send ${money(tipAmount)} tip` : ""}
        </Box>

        <Typography
          onClick={() => navigate("/orders")}
          sx={{
            textAlign: "center",
            fontSize: 12.5,
            color: fg.tertiary,
            mt: 1.6,
            cursor: "pointer",
          }}
        >
          Maybe later
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          gap={0.7}
          sx={{ mt: 2.5 }}
        >
          <ShieldCheckmark24Regular
            style={{ fontSize: 14, color: fg.tertiary }}
          />
          <Typography sx={{ fontSize: 11.5, color: fg.tertiary }}>
            Reviews are only accepted from confirmed bookings
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
