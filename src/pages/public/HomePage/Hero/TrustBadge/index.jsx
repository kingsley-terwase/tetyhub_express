import { Box, Stack, Typography } from "@mui/material";
import { Star12Filled } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";

const avatars = [
  { initials: "TK", color: "#14b8a6" },
  { initials: "AM", color: "#f59e0b" },
  { initials: "BF", color: "#ef4444" },
  { initials: "CN", color: "#8b5cf6" },
  { initials: "RL", color: "#3b82f6" },
];

const STAR_GOLD = "#f5a623";

export default function TrustBadge() {
  const { bg, fg, main } = useColor();

  return (
    <Stack direction="row" alignItems="center" gap={1.5} sx={{ pt: 1 }}>
      <Stack direction="row">
        {avatars.map((a, i) => (
          <Box
            key={a.initials}
            sx={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              backgroundColor: a.color,
              border: `2px solid ${bg.primary}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ml: i === 0 ? 0 : -1.2,
            }}
          >
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>
              {a.initials}
            </Typography>
          </Box>
        ))}
      </Stack>

      <Stack gap={0.2}>
        <Stack direction="row" gap={0.2}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star12Filled key={i} style={{ fontSize: 12, color: STAR_GOLD }} />
          ))}
        </Stack>
        <Typography sx={{ fontSize: 13, color: fg.secondary }}>
          Trusted by{" "}
          <Box component="span" sx={{ fontWeight: 700, color: main.primary }}>
            500+
          </Box>{" "}
          brands worldwide
        </Typography>
      </Stack>
    </Stack>
  );
}
