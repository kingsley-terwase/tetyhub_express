import { Box, Stack, Typography } from "@mui/material";
import { spacingTokens } from "@/lib/theme";
import { useColor } from "@/contexts/color";
// import { Button } from "@/components/ui";

export default function Banner() {
  const { main } = useColor();
  return (
    <Box
      sx={{
        p: spacingTokens.md,
        borderRadius: 4,
        background: `linear-gradient(90deg, ${main.primary} 0%, ${main.primary}  100%)`,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        overflow: "hidden",
      }}
    >
      <Stack spacing={1} maxWidth={420}>
        <Typography variant="h6" fontWeight={600}>
          Hello Kingsley!
        </Typography>

        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          You need Support/Help.Weve got you covered 🙂
        </Typography>
        <Box>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              color: "#000",
              borderRadius: 4,
              px: spacingTokens.sm,
              py: spacingTokens.xs,
              cursor: "pointer",
              backgroundColor: "white",
              fontWeight: 500,
            }}
          >
            Get in Touch 👍
          </Box>
        </Box>
      </Stack>

      <Box
        component="img"
        src="/avatar.png"
        alt="welcome"
        sx={{
          height: 140,
          objectFit: "contain",
          display: { xs: "none", md: "block" },
        }}
      />
    </Box>
  );
}
