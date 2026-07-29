import { Stack, Typography, Box } from "@mui/material";
import { useMemo } from "react";
import { customers, segments } from "../lib";
import { useColor } from "@/contexts/color";

// @ts-ignore
export default function SegmentTabs({ segment, setSegment, resetPage }) {
  const { bg, border, main } = useColor();

  const segCounts = useMemo(() => {
    const counts = {};
    segments.forEach((s) => {
      // @ts-ignore
      counts[s] =
        s === "all"
          ? customers.length
          : customers.filter((c) => c.segment === s).length;
    });
    return counts;
  }, []);

  return (
    <Stack direction="row" gap={1} flexWrap="wrap">
      {segments.map((s) => {
        const active = segment === s;
        const label = s === "all" ? "All" : s;

        return (
          <Stack
            key={s}
            direction="row"
            alignItems="center"
            onClick={() => {
              setSegment(s);
              resetPage();
            }}
            sx={{
              px: 1.4,
              py: 0.6,
              borderRadius: 2,
              cursor: "pointer",
              border: `1px solid ${active ? main.primary : border.primary}`,
              backgroundColor: active ? `${main.primary}18` : bg.secondary,
            }}
          >
            <Typography fontSize={12}>{label}</Typography>

            <Box sx={{ ml: 0.5 }}>
              <Typography fontSize={11}>
                {
                  // @ts-ignore
                  segCounts[s]
                }
              </Typography>
            </Box>
          </Stack>
        );
      })}
    </Stack>
  );
}
