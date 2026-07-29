// @ts-nocheck
import { Box, Stack, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Rocket24Filled } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radiusTokens } from "@/lib/theme";
import { useReveal } from "../../HomePage/Hooks";

export default function SellCTA() {
  const { main } = useColor();
  const navigate = useNavigate();
  const { ref, className } = useReveal();

  return (
    <Box sx={{}}>
      <Stack
        ref={ref}
        className={className}
        alignItems="center"
        gap={2}
        sx={{
          textAlign: "center",
          py: { xs: 6, md: 4 },
          px: 3,
          background: `linear-gradient(135deg, #000 0%, #1e1b4b 130%)`,
        }}
      >
        <Typography
          sx={{
            // fontFamily: "Poppins",
            fontSize: { xs: 24, md: 32 },
            fontWeight: 800,
            color: "#fff",
          }}
        >
          Your first sale is closer than you think
        </Typography>
        <Typography
          sx={{
            // fontFamily: "Poppins",
            fontSize: 15,
            color: "rgba(255,255,255,0.85)",
            maxWidth: 440,
          }}
        >
          Join thousands of sellers already building their business on TETYHUB.
        </Typography>
        <Button
          onClick={() => navigate("/register")}
          startIcon={<Rocket24Filled style={{ fontSize: 19 }} />}
          sx={{
            mt: 1,
            backgroundColor: "#fff",
            color: main.primary,
            textTransform: "none",
            // fontFamily: "Poppins",
            fontWeight: 700,
            borderRadius: radiusTokens.md,
            px: 3.5,
            py: 1.3,
            "&:hover": { backgroundColor: "#fff", opacity: 0.9 },
          }}
        >
          Create Your Store
        </Button>
      </Stack>
    </Box>
  );
}
