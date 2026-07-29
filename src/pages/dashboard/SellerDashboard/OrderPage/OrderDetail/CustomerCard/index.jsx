import { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Divider,
  Collapse,
  IconButton,
  Chip,
  Avatar,
} from "@mui/material";
import {
  PersonRegular,
  EditRegular,
  MailRegular,
  GlobeRegular,
  PhoneRegular,
  LocationRegular,
  ShieldRegular,
  ChevronDownRegular,
  ChevronUpRegular,
  CartRegular,
  WarningRegular,
} from "@fluentui/react-icons";
import Section from "../Section";
import InfoRow from "../InfoRow";
import { useColor } from "@/contexts/color";
import { MOCK_CUSTOMER, SectionHeader } from "./lib";

export default function CustomerCard({ customer = MOCK_CUSTOMER }) {
  const { bg, fg, border } = useColor();
  const [expanded, setExpanded] = useState(false);
  const c = { ...MOCK_CUSTOMER, ...customer };

  return (
    <Section
      title="Customer Info"
      icon={PersonRegular}
      // @ts-ignore
      action={
        <IconButton size="small">
          <EditRegular fontSize={14} />
        </IconButton>
      }
    >
      <Stack direction="row" alignItems="center" gap={1.5} mb={1.5}>
        <Avatar
          sx={{
            width: 44,
            height: 44,
            bgcolor: c.avatarColor,
            fontWeight: 700,
            fontSize: 15,
          }}
        >
          {c.initials ?? c.name?.slice(0, 2).toUpperCase()}
        </Avatar>
        <Box flex={1} minWidth={0}>
          <Typography fontWeight={700} fontSize={14} noWrap>
            {c.name}
          </Typography>
          <Stack direction="row" alignItems="center" gap={0.5}>
            <MailRegular fontSize={11} color={fg.tertiary} />
            <Typography variant="caption" color={fg.tertiary} noWrap>
              {c.email}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap={0.5}>
            <GlobeRegular fontSize={11} color={fg.tertiary} />
            <Typography variant="caption" color={fg.tertiary}>
              IP: {c.ip}
            </Typography>
          </Stack>
        </Box>
      </Stack>

      <Stack direction="row" gap={1} mb={1.5}>
        <Chip
          icon={<WarningRegular fontSize={12} color="#ef4444" />}
          label="Add to Blacklist"
          size="small"
          variant="outlined"
          sx={{
            borderColor: "#ef4444",
            color: "#ef4444",
            fontSize: 11,
            height: 24,
          }}
        />
        <Chip
          icon={<CartRegular fontSize={12} />}
          label={`${c.orders} Orders`}
          size="small"
          sx={{
            bgcolor: bg.tertiary,
            color: fg.secondary,
            fontSize: 11,
            height: 24,
          }}
        />
      </Stack>

      <Divider sx={{ borderColor: border.primary, mb: 1.5 }} />

      <Stack gap={0.6} mb={1}>
        <InfoRow
          label="Phone"
          value={
            <Stack direction="row" alignItems="center" gap={0.5}>
              <PhoneRegular fontSize={12} />
              {c.phone}
            </Stack>
          }
        />
        <InfoRow label="Orders" value={c.orders} />
      </Stack>

      <Box
        onClick={() => setExpanded((v) => !v)}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          cursor: "pointer",
          color: fg.tertiary,
          mt: 0.5,
          "&:hover": { color: fg.primary },
        }}
      >
        <Typography variant="caption" fontWeight={600}>
          {expanded ? "Hide details" : "View full details"}
        </Typography>
        {expanded ? (
          <ChevronUpRegular fontSize={13} />
        ) : (
          <ChevronDownRegular fontSize={13} />
        )}
      </Box>

      <Collapse in={expanded}>
        <Divider sx={{ borderColor: border.primary, my: 1.5 }} />

        {SectionHeader(
          // @ts-ignore
          "Delivery Details",
        )}
        <Stack gap={0.5} mb={1.5}>
          <InfoRow label="Speedy" value={c.delivery.method} />
          <InfoRow label="Office" value={c.delivery.office} />
          <InfoRow label="Address" value={c.delivery.address} />
          <InfoRow
            label="Tracking No"
            value={
              <Typography
                variant="body2"
                sx={{
                  color: "primary.main",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                {c.delivery.tracking}
              </Typography>
            }
          />
        </Stack>

        <Divider sx={{ borderColor: border.primary, mb: 1.5 }} />
        {SectionHeader(
          // @ts-ignore
          "Shipping Info",
        )}
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
          sx={{
            cursor: "pointer",
            mb: 1.5,
            "&:hover": { opacity: 0.8 },
          }}
        >
          <Box
            sx={{
              width: 24,
              height: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
              bgcolor: "#3b82f6",
              boxShadow: "0 2px 4px rgba(59, 130, 246, 0.3)",
            }}
          >
            <LocationRegular fontSize={14} style={{ color: "#fff" }} />
          </Box>

          <Typography
            variant="caption"
            fontWeight={700}
            sx={{
              color: "primary.main",
              textDecoration: "none",
              letterSpacing: "0.02em",
            }}
          >
            VIEW ON MAP
          </Typography>
        </Stack>

        <Divider sx={{ borderColor: border.primary, mb: 1.5 }} />
        {SectionHeader(
          // @ts-ignore
          "Payment Info",
        )}
        <Stack gap={0.5}>
          <InfoRow
            label="Payment Method"
            value={
              <Stack direction="row" alignItems="center" gap={0.5}>
                <ShieldRegular fontSize={12} />
                {c.payment.method}
              </Stack>
            }
          />
          <InfoRow
            label="Transaction No."
            value={
              <Typography
                variant="body2"
                sx={{
                  color: "primary.main",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                {c.payment.transaction}
              </Typography>
            }
          />
        </Stack>
      </Collapse>
    </Section>
  );
}
