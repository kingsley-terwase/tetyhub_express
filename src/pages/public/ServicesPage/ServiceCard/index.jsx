import { useNavigate } from "react-router-dom";
import { Box, Typography, Stack } from "@mui/material";
import {
  Star24Filled,
  CheckmarkCircle24Filled,
  Location24Regular,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radiusTokens } from "@/lib/theme";

// @ts-ignore
function StarRow({ rating, size = 13 }) {
  return (
    <Stack direction="row" gap={0.15}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star24Filled
          key={i}
          style={{ fontSize: size, color: i < rating ? "#f5a623" : "#d1d5db" }}
        />
      ))}
    </Stack>
  );
}

// @ts-ignore
export default function ServiceCard({ service }) {
  const { bg, fg, border, main } = useColor();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/service/${service.id}`, { state: { service } });
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        cursor: "pointer",
        borderRadius: radiusTokens.md,
        border: `1px solid ${border.primary}`,
        backgroundColor: bg.primary,
        overflow: "hidden",
        transition:
          "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 18px 32px -18px rgba(0,0,0,0.28)",
          borderColor: main.primary,
        },
      }}
    >
      <Box sx={{ position: "relative", height: 160, overflow: "hidden" }}>
        <Box
          component="img"
          src={service.image}
          alt={service.title}
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        {service.verified && (
          <Stack
            direction="row"
            alignItems="center"
            gap={0.4}
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              backgroundColor: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(4px)",
              borderRadius: radiusTokens.sm,
              px: 0.9,
              py: 0.35,
            }}
          >
            <CheckmarkCircle24Filled
              style={{ fontSize: 13, color: "#4ade80" }}
            />
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: 10.5,
                fontWeight: 700,
                color: "#fff",
              }}
            >
              Verified
            </Typography>
          </Stack>
        )}
      </Box>

      <Box sx={{ p: spacingTokens.md }}>
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: 11.5,
            fontWeight: 700,
            color: main.primary,
            textTransform: "uppercase",
            letterSpacing: "0.03em",
            mb: 0.4,
          }}
        >
          {service.providerName}
        </Typography>
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: 14.5,
            fontWeight: 700,
            color: fg.primary,
            lineHeight: 1.35,
            mb: 0.8,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {service.title}
        </Typography>

        <Stack direction="row" alignItems="center" gap={0.6} sx={{ mb: 0.8 }}>
          <StarRow rating={service.rating} />
          <Typography
            sx={{ fontFamily: "Poppins", fontSize: 11.5, color: fg.tertiary }}
          >
            ({service.ratingCount})
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" gap={0.4} sx={{ mb: 1.2 }}>
          <Location24Regular style={{ fontSize: 13, color: fg.tertiary }} />
          <Typography
            sx={{ fontFamily: "Poppins", fontSize: 11.5, color: fg.tertiary }}
          >
            {service.location}
          </Typography>
        </Stack>

        <Box sx={{ borderTop: `1px solid ${border.primary}`, pt: 1 }}>
          <Typography
            sx={{ fontFamily: "Poppins", fontSize: 10.5, color: fg.tertiary }}
          >
            {service.priceType}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: 16,
              fontWeight: 800,
              color: fg.primary,
            }}
          >
            ₦{service.startingPrice.toLocaleString()}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
