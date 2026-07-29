import { useState } from "react";
import { Box, Stack, Typography, Chip, Select, MenuItem } from "@mui/material";
import { HistoryRegular, CheckmarkCircleFilled } from "@fluentui/react-icons";
import Section from "../Section";
import { useColor } from "@/contexts/color";

const HISTORY = [
  {
    id: 1,
    title: "Order Created",
    date: "21 Sep, 2022 at 4:49",
    done: true,
    tags: [],
  },
  {
    id: 2,
    title: "Order status was changed to",
    date: null,
    done: false,
    status: "Quick Buy",
    tags: [
      { label: "New", color: "#22c55e" },
      { label: "Quick Buy", color: "#0e69bf" },
    ],
    tagDate: "13 Sep, 2022 at 8:58",
  },
];

const STATUS_OPTIONS = [
  "Quick Buy",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

// @ts-ignore
const StatusTag = ({ label, color }) => (
  <Chip
    label={label}
    size="small"
    sx={{
      backgroundColor: color,
      color: "#fff",
      fontWeight: 700,
      fontSize: 11,
      height: 20,
      borderRadius: "4px",
      border: "none",
      "&:hover": {
        backgroundColor: color,
        filter: "brightness(0.9)",
      },
      "& .MuiChip-label": { px: 1 },
    }}
  />
);

export default function OrderHistory({
  history = HISTORY,
  currentStatus = "Quick Buy",
}) {
  const { bg, fg, main, border, status: s } = useColor();
  const [status, setStatus] = useState(currentStatus);

  return (
    <Section title="Order History" icon={HistoryRegular}>
      <Stack gap={0}>
        {history.map((event, i) => (
          <Stack
            key={event.id}
            direction="row"
            gap={1.5}
            pb={i < history.length - 1 ? 2 : 0}
          >
            <Stack alignItems="center" gap={0}>
              <Box sx={{ mt: 0.3 }}>
                {event.done ? (
                  <CheckmarkCircleFilled
                    fontSize={18}
                    color={s.success.primary}
                  />
                ) : (
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      border: `2px solid ${border.primary}`,
                      bgcolor: bg.primary,
                      mt: 0.1,
                    }}
                  />
                )}
              </Box>
              {i < history.length - 1 && (
                <Box
                  sx={{
                    width: 2,
                    flex: 1,
                    bgcolor: border.primary,
                    mt: 0.5,
                    minHeight: 28,
                  }}
                />
              )}
            </Stack>

            <Box flex={1} pb={0.5}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                gap={1}
              >
                <Box>
                  <Typography variant="body2" fontWeight={600} mb={0.2}>
                    {event.title}
                  </Typography>
                  {event.date && (
                    <Typography variant="caption" color={fg.tertiary}>
                      {event.date}
                    </Typography>
                  )}
                </Box>

                {event.status && (
                  <Stack direction="row" alignItems="center" gap={0.8}>
                    <Typography variant="caption" color={fg.tertiary}>
                      Status:
                    </Typography>
                    <Select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      size="small"
                      variant="outlined"
                      sx={{
                        height: 26,
                        fontSize: 12,
                        fontWeight: 600,
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: border.primary,
                        },
                        "& .MuiSelect-select": { py: 0.3, px: 1 },
                      }}
                      renderValue={(val) => (
                        <Stack direction="row" alignItems="center" gap={0.5}>
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              bgcolor: main.primary,
                            }}
                          />
                          <span>{val}</span>
                        </Stack>
                      )}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <MenuItem key={s} value={s} sx={{ fontSize: 13 }}>
                          {s}
                        </MenuItem>
                      ))}
                    </Select>
                  </Stack>
                )}
              </Stack>

              {event.tags?.length > 0 && (
                <Stack gap={0.6} mt={1}>
                  {event.tags.map((tag, ti) => (
                    <Stack
                      key={`${event.id}-tag-${ti}`}
                      direction="row"
                      alignItems="center"
                      gap={1}
                    >
                      <StatusTag label={tag.label} color={tag.color} />
                      {event.tagDate && (
                        <Typography variant="caption" color={fg.tertiary}>
                          {event.tagDate}
                        </Typography>
                      )}
                    </Stack>
                  ))}
                </Stack>
              )}
            </Box>
          </Stack>
        ))}
      </Stack>
    </Section>
  );
}
