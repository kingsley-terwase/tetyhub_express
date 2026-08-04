// @ts-nocheck
import { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  Modal,
  IconButton,
} from "@mui/material";
import {
  CheckmarkCircle24Filled,
  Location24Regular,
  Timer24Regular,
  Briefcase24Regular,
  CalendarLtr24Regular,
  Dismiss24Regular,
  Clock24Regular,
  CheckmarkCircleFilled,
} from "@fluentui/react-icons";
import { spacingTokens, radiusTokens } from "@/lib/theme";
import StarRow from "../StarRow";

const TIME_SLOTS = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"];

function BookingModal({ open, onClose, service, fg, border, main, bg }) {
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const handleClose = () => {
    onClose();
    setConfirmed(false);
    setDate("");
    setSlot(null);
  };

  const canConfirm = date && slot;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "92%",
          maxWidth: 540,
          maxHeight: "90vh",
          overflowY: "auto",
          backgroundColor: bg.primary,
          borderRadius: radiusTokens.lg,
          border: `1px solid ${border.primary}`,
          p: 3,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: 17,
              fontWeight: 700,
              color: fg.primary,
            }}
          >
            {confirmed ? "Booking Confirmed" : "Book This Service"}
          </Typography>
          <IconButton size="small" onClick={handleClose}>
            <Dismiss24Regular style={{ fontSize: 18, color: fg.secondary }} />
          </IconButton>
        </Stack>

        {confirmed ? (
          <Stack
            alignItems="center"
            textAlign="center"
            gap={1.5}
            sx={{ py: 4 }}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#16a34a1a",
              }}
            >
              <CheckmarkCircleFilled
                style={{ fontSize: 50, color: "#16a34a" }}
              />
            </Box>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: 15,
                fontWeight: 700,
                color: fg.primary,
              }}
            >
              You're booked with {service.providerName}
            </Typography>
            <Typography
              sx={{ fontFamily: "Poppins", fontSize: 13, color: fg.secondary }}
            >
              {date} at {slot}
            </Typography>
            <Button
              onClick={handleClose}
              sx={{
                mt: 1,
                textTransform: "none",
                fontFamily: "Poppins",
                fontWeight: 700,
                color: main.primary,
              }}
            >
              Done
            </Button>
          </Stack>
        ) : (
          <Stack gap={2.5}>
            {/* provider recap */}
            <Stack
              direction="row"
              alignItems="center"
              gap={1.2}
              sx={{
                p: 1.5,
                borderRadius: radiusTokens.md,
                backgroundColor: bg.secondary,
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: main.primary,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: 15,
                  flexShrink: 0,
                }}
              >
                {service.providerName.charAt(0)}
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: 13.5,
                    fontWeight: 700,
                    color: fg.primary,
                  }}
                  noWrap
                >
                  {service.title ?? "This service"} — {service.providerName}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: 11.5,
                    color: fg.tertiary,
                  }}
                >
                  {service.location}
                </Typography>
              </Box>
            </Stack>

            {/* date */}
            <Box>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: 12,
                  fontWeight: 700,
                  color: fg.secondary,
                  mb: 0.7,
                }}
              >
                SELECT A DATE
              </Typography>
              <Box
                component="input"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                sx={{
                  width: "100%",
                  fontFamily: "Poppins",
                  fontSize: 13.5,
                  color: fg.primary,
                  backgroundColor: "transparent",
                  border: `1px solid ${border.primary}`,
                  borderRadius: radiusTokens.sm,
                  px: 1.5,
                  py: 1,
                  "&:focus": { outline: "none", borderColor: main.primary },
                }}
              />
            </Box>

            {/* time slots */}
            <Box>
              <Stack
                direction="row"
                alignItems="center"
                gap={0.6}
                sx={{ mb: 0.9 }}
              >
                <Clock24Regular style={{ fontSize: 14, color: fg.secondary }} />
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: 12,
                    fontWeight: 700,
                    color: fg.secondary,
                  }}
                >
                  AVAILABLE TIME SLOTS
                </Typography>
              </Stack>
              <Stack direction="row" flexWrap="wrap" gap={0.8}>
                {TIME_SLOTS.map((t) => (
                  <Box
                    key={t}
                    onClick={() => setSlot(t)}
                    sx={{
                      px: 1.4,
                      py: 0.7,
                      borderRadius: radiusTokens.sm,
                      cursor: "pointer",
                      fontFamily: "Poppins",
                      fontSize: 12.5,
                      fontWeight: 600,
                      color: slot === t ? "#fff" : fg.secondary,
                      backgroundColor: slot === t ? main.primary : bg.secondary,
                      border: `1px solid ${slot === t ? main.primary : border.primary}`,
                      transition: "all 0.15s ease",
                    }}
                  >
                    {t}
                  </Box>
                ))}
              </Stack>
            </Box>

            {/* price summary */}
            <Stack
              sx={{ pt: 1.5, borderTop: `1px solid ${border.primary}` }}
              gap={0.6}
            >
              <Stack direction="row" justifyContent="space-between">
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: 13,
                    color: fg.secondary,
                  }}
                >
                  {service.priceType}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: 13,
                    fontWeight: 700,
                    color: fg.primary,
                  }}
                >
                  ₦{service.startingPrice.toLocaleString()}
                </Typography>
              </Stack>
              <Typography
                sx={{ fontFamily: "Poppins", fontSize: 11, color: fg.tertiary }}
              >
                Final price may vary based on scope — confirmed with the
                provider before work begins.
              </Typography>
            </Stack>

            <Button
              fullWidth
              disabled={!canConfirm}
              startIcon={<CalendarLtr24Regular style={{ fontSize: 17 }} />}
              onClick={() => setConfirmed(true)}
              sx={{
                position: "relative",
                overflow: "hidden",
                textTransform: "none",
                fontFamily: "Poppins",
                fontWeight: 700,
                fontSize: 13.5,
                borderRadius: radiusTokens.sm,
                backgroundColor: main.primary,
                color: "#fff",
                py: 1.1,
                "&:hover": { backgroundColor: main.primary, opacity: 0.9 },
                "&.Mui-disabled": {
                  backgroundColor: border.primary,
                  color: fg.tertiary,
                },
                "&:hover::after": { left: "130%" },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "-60%",
                  width: "40%",
                  height: "100%",
                  background:
                    "linear-gradient(120deg, transparent, rgba(255,255,255,0.35), transparent)",
                  transform: "skewX(-20deg)",
                  transition: "left 0.6s ease",
                },
              }}
            >
              Confirm Booking
            </Button>

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
        )}
      </Box>
    </Modal>
  );
}

export default function ProviderCard({ service, fg, border, main, bg }) {
  const [bookingOpen, setBookingOpen] = useState(false);

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
          onClick={() => setBookingOpen(true)}
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

      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        service={service}
        fg={fg}
        border={border}
        main={main}
        bg={bg}
      />
    </Stack>
  );
}
