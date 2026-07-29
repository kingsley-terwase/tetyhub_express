// @ts-nocheck
import { Box, Stack, Typography } from "@mui/material";
import {
  MailRegular,
  CallRegular,
  LocationRegular,
  PersonRegular,
  TagRegular,
  StarRegular,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { makeLabelSx } from "../lib";

/** @param {{ customer: import("../lib").Customer }} props */
export function CustomerOverview({ customer }) {
  const { fg, bg, border } = useColor();
  const labelSx = makeLabelSx({ fg });

  const rows = [
    {
      icon: <MailRegular fontSize={14} />,
      label: "Email",
      value: customer.email,
    },
    {
      icon: <CallRegular fontSize={14} />,
      label: "Phone",
      value: customer.phone,
    },
    {
      icon: <LocationRegular fontSize={14} />,
      label: "Country",
      value: customer.country,
    },
    {
      icon: <StarRegular fontSize={14} />,
      label: "Tier",
      value: customer.tier,
    },
    {
      icon: <PersonRegular fontSize={14} />,
      label: "Segment",
      value: customer.segment,
    },
    {
      icon: <TagRegular fontSize={14} />,
      label: "ID",
      value: `#${customer.id}`,
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 1.5,
        pt: 2,
      }}
    >
      {rows.map(({ icon, label, value }) => (
        <Box
          key={label}
          sx={{
            p: 1.5,
            borderRadius: "10px",
            border: `1px solid ${border.primary}`,
            backgroundColor: bg.secondary,
          }}
        >
          <Stack direction="row" alignItems="center" gap={0.6} mb={0.4}>
            <Box sx={{ color: fg.tertiary, display: "flex" }}>{icon}</Box>
            <Typography component="span" sx={labelSx}>
              {label}
            </Typography>
          </Stack>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 500,
              color: fg.primary,
              wordBreak: "break-word",
              lineHeight: 1.4,
            }}
          >
            {value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
