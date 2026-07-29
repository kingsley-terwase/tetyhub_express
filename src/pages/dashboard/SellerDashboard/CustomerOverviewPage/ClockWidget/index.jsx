import { useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { radiusTokens, spacingTokens } from "@/lib/theme";
import useColor from "@/contexts/color/useColor";

export default function ClockWidget() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const { theme } = useColor();

  const hours = time.getHours() % 12 || 12;
  const minutes = String(time.getMinutes()).padStart(2, "0");
  const ampm = time.getHours() >= 12 ? "PM" : "AM";

  const dateLabel = time.toLocaleDateString("en-US", {
    weekday: "long",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      gap={spacingTokens.sm}
      sx={{
        backgroundColor: theme === "dark" ? "#093030" : "#3ABFBF",
        borderRadius: radiusTokens["5xl"],
        padding: spacingTokens.xl,
      }}
    >
      <Stack direction="row" alignItems="baseline" gap={spacingTokens.sm}>
        <Typography
          sx={{
            fontSize: "64px",
            fontWeight: 800,
            lineHeight: 1,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {hours} : {minutes}
        </Typography>
        <Typography
          sx={{
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "1px",
          }}
        >
          {ampm}
        </Typography>
      </Stack>
      <Typography>{dateLabel}</Typography>
    </Stack>
  );
}
