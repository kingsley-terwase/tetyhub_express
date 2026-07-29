import { Box, Typography, Stack } from "@mui/material";
import {
  Document24Regular,
  TextBulletListSquare24Regular,
  CommentMultiple24Regular,
} from "@fluentui/react-icons";
import { radiusTokens } from "@/lib/theme";

const NAV_ITEMS = [
  { key: "description", label: "Product details", icon: Document24Regular },
  {
    key: "specifications",
    label: "Specifications",
    icon: TextBulletListSquare24Regular,
  },
  {
    key: "reviews",
    label: "Verified Customer Feedback",
    icon: CommentMultiple24Regular,
  },
];

// @ts-ignore
export default function ProductInfoSidebarNav({
  // @ts-ignore
  activeTab,
  // @ts-ignore
  onSelect,
  // @ts-ignore
  fg,
  // @ts-ignore
  border,
  // @ts-ignore
  // @ts-ignore
  main,
  // @ts-ignore
  bg,
}) {
  return (
    <Box
      sx={{
        border: `1px solid ${border.primary}`,
        borderRadius: radiusTokens.md,
        backgroundColor: bg.primary,
        overflow: "hidden",
      }}
    >
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.key;
        return (
          <Stack
            key={item.key}
            direction="row"
            alignItems="center"
            gap={1.2}
            onClick={() => onSelect(item.key)}
            sx={{
              px: 1.6,
              py: 1.3,
              cursor: "pointer",
              backgroundColor: isActive ? bg.secondary : "transparent",
              borderLeft: `3px solid ${isActive ? main.primary : "transparent"}`,
              "&:hover": { backgroundColor: bg.secondary },
            }}
          >
            <Icon
              style={{
                fontSize: 18,
                color: isActive ? main.primary : fg.secondary,
              }}
            />
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: 13,
                fontWeight: isActive ? 700 : 500,
                color: isActive ? main.primary : fg.primary,
              }}
            >
              {item.label}
            </Typography>
          </Stack>
        );
      })}
    </Box>
  );
}
