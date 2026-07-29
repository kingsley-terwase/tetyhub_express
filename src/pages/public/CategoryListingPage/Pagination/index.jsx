// @ts-nocheck
import { Stack, Box, Typography } from "@mui/material";
import {
  ChevronLeft16Regular,
  ChevronRight16Regular,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { radiusTokens } from "@/lib/theme";

export default function Pagination({ page, totalPages, onChange }) {
  const { fg, border, main } = useColor();

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
  );

  const items = [];
  let last = 0;
  for (const p of pages) {
    if (p - last > 1) items.push("…");
    items.push(p);
    last = p;
  }

  const btnSx = (active) => ({
    minWidth: 28,
    height: 28,
    px: 0.8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radiusTokens.sm,
    fontFamily: "Poppins",
    fontSize: 12.5,
    fontWeight: active ? 700 : 500,
    color: active ? "#fff" : fg.secondary,
    backgroundColor: active ? main.primary : "transparent",
    border: `1px solid ${active ? main.primary : border.primary}`,
    cursor: "pointer",
    transition: "background-color 0.15s ease, color 0.15s ease",
    "&:hover": active
      ? {}
      : { backgroundColor: `${main.primary}10`, borderColor: main.primary },
  });

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      gap={0.6}
      sx={{ mt: 5 }}
    >
      <Box
        onClick={() => page > 1 && onChange(page - 1)}
        sx={{
          ...btnSx(false),
          opacity: page === 1 ? 0.35 : 1,
          cursor: page === 1 ? "default" : "pointer",
        }}
      >
        <ChevronLeft16Regular style={{ fontSize: 13 }} />
      </Box>

      {items.map((p, i) =>
        p === "…" ? (
          <Typography
            key={`dots-${i}`}
            sx={{ fontSize: 12.5, color: fg.tertiary, px: 0.4 }}
          >
            …
          </Typography>
        ) : (
          <Box key={p} onClick={() => onChange(p)} sx={btnSx(p === page)}>
            {p}
          </Box>
        ),
      )}

      <Box
        onClick={() => page < totalPages && onChange(page + 1)}
        sx={{
          ...btnSx(false),
          opacity: page === totalPages ? 0.35 : 1,
          cursor: page === totalPages ? "default" : "pointer",
        }}
      >
        <ChevronRight16Regular style={{ fontSize: 13 }} />
      </Box>
    </Stack>
  );
}
