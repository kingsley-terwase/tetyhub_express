// @ts-nocheck
import { Box, Typography, Stack, Button } from "@mui/material";
import {
  CheckmarkCircle24Filled,
  Location24Regular,
  Timer24Regular,
  Briefcase24Regular,
  Chat24Regular,
  CalendarLtr24Regular,
} from "@fluentui/react-icons";
import { spacingTokens, radiusTokens } from "@/lib/theme";
import StarRow from "../StarRow";

export default function ProviderCard({ service, fg, border, main, bg }) {
  return (
    <Stack
      gap={1.4}
      sx={{
        border: `1px solid ${border.primary}`,
        borderRadius: radiusTokens.md,
        backgroundColor: bg.primary,
        p: spacingTokens.md,
      }}
    >
      <Stack direction="row" alignItems="center" gap={1.2}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            backgroundColor: main.primary,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: 18,
            flexShrink: 0,
          }}
        >
          {service.providerName.charAt(0)}
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Stack direction="row" alignItems="center" gap={0.4} flexWrap="wrap">
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: 14.5,
                fontWeight: 700,
                color: fg.primary,
              }}
            >
              {service.providerName}
            </Typography>
            {service.verified && (
              <CheckmarkCircle24Filled
                style={{ fontSize: 15, color: main.primary, flexShrink: 0 }}
              />
            )}
          </Stack>
          <Stack direction="row" alignItems="center" gap={0.6}>
            <StarRow rating={service.rating} size={13} />
            <Typography
              sx={{ fontFamily: "Poppins", fontSize: 11.5, color: fg.tertiary }}
            >
              ({service.ratingCount})
            </Typography>
          </Stack>
        </Box>
      </Stack>

      <Box sx={{ borderTop: `1px solid ${border.primary}`, pt: 1.4 }}>
        <Typography
          sx={{ fontFamily: "Poppins", fontSize: 10.5, color: fg.tertiary }}
        >
          {service.priceType}
        </Typography>
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: 24,
            fontWeight: 800,
            color: fg.primary,
          }}
        >
          ₦{service.startingPrice.toLocaleString()}
        </Typography>
      </Box>

      <Stack gap={0.9}>
        <Stack direction="row" alignItems="center" gap={0.7}>
          <Location24Regular style={{ fontSize: 15, color: fg.tertiary }} />
          <Typography
            sx={{ fontFamily: "Poppins", fontSize: 12, color: fg.secondary }}
          >
            {service.location}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" gap={0.7}>
          <Timer24Regular style={{ fontSize: 15, color: fg.tertiary }} />
          <Typography
            sx={{ fontFamily: "Poppins", fontSize: 12, color: fg.secondary }}
          >
            {service.responseTime}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" gap={0.7}>
          <Briefcase24Regular style={{ fontSize: 15, color: fg.tertiary }} />
          <Typography
            sx={{ fontFamily: "Poppins", fontSize: 12, color: fg.secondary }}
          >
            {service.completedJobs}+ jobs completed
          </Typography>
        </Stack>
      </Stack>

      <Stack gap={1}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<CalendarLtr24Regular style={{ fontSize: 18 }} />}
          sx={{
            backgroundColor: main.primary,
            textTransform: "none",
            fontFamily: "Poppins",
            fontWeight: 700,
            fontSize: 13.5,
            borderRadius: radiusTokens.sm,
            py: 1.1,
          }}
        >
          Book Now
        </Button>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<Chat24Regular style={{ fontSize: 17 }} />}
          sx={{
            borderColor: main.primary,
            color: main.primary,
            textTransform: "none",
            fontFamily: "Poppins",
            fontWeight: 700,
            fontSize: 13.5,
            borderRadius: radiusTokens.sm,
            py: 1,
          }}
        >
          Message {service.providerName.split(" ")[0]}
        </Button>
      </Stack>

      <Typography
        sx={{
          fontFamily: "Poppins",
          fontSize: 10.5,
          color: fg.tertiary,
          textAlign: "center",
        }}
      >
        Free cancellation up to 48 hours before your booking
      </Typography>
    </Stack>
  );
}
