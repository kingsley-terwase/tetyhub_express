// @ts-nocheck
import { Box, Stack, Typography } from "@mui/material";
import { MailRegular, CallRegular } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { StatusBadge } from "../lib";

/** @param {{ customer: import("../lib").Customer }} props */
export function CustomerHeader({ customer }) {
  const { fg, bg, border } = useColor();

  const initials =
    customer.avatar ??
    customer.name
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  return (
    <Stack
      direction="row"
      alignItems="flex-start"
      gap={2}
      sx={{
        p: 3,
        borderBottom: `1px solid ${border.primary}`,
        background: `linear-gradient(135deg, ${bg.secondary} 0%, ${bg.tertiary} 100%)`,
      }}
    >
      {/* Avatar */}
      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: "18px",
          background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow: "0 4px 14px rgba(99,102,241,0.35)",
        }}
      >
        <Typography
          sx={{
            fontSize: 22,
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "-0.5px",
          }}
        >
          {initials}
        </Typography>
      </Box>

      {/* Name / meta */}
      <Stack gap={0.6} flex={1} minWidth={0}>
        <Stack direction="row" alignItems="center" gap={1} flexWrap="wrap">
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 700,
              color: fg.primary,
              letterSpacing: "-0.3px",
            }}
          >
            {customer.name}
          </Typography>
          <StatusBadge status={customer.status} />
        </Stack>
        <Typography sx={{ fontSize: 12, color: fg.tertiary }}>
          {customer.segment} · Customer since {customer.joined}
        </Typography>

        {/* Contact chips */}
        <Stack direction="row" gap={1} mt={0.5} flexWrap="wrap">
          {[
            { icon: <MailRegular fontSize={12} />, label: customer.email },
            { icon: <CallRegular fontSize={12} />, label: customer.phone },
          ].map(({ icon, label }) => (
            <Stack
              key={label}
              direction="row"
              alignItems="center"
              gap={0.5}
              sx={{
                px: 1.2,
                py: 0.4,
                borderRadius: "8px",
                backgroundColor: bg.secondary,
                border: `1px solid ${border.primary}`,
              }}
            >
              <Box sx={{ color: fg.tertiary, display: "flex" }}>{icon}</Box>
              <Typography sx={{ fontSize: 11, color: fg.secondary }}>
                {label}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}
