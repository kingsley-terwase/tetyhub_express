import { Stack, Box, Typography } from "@mui/material";
import { useColor } from "@/contexts/color";
import { TABS } from "../UseCustomerView";

/**
 * @param {{ activeTab: string, onChange: (tab: string) => void }} props
 */
export function CustomerTabs({ activeTab, onChange }) {
  const { fg, border, main } = useColor();

  return (
    <Stack
      direction="row"
      gap={0}
      sx={{
        px: 3,
        borderBottom: `1px solid ${border.primary}`,
        mt: 1,
      }}
    >
      {TABS.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <Box
            key={tab}
            onClick={() => onChange(tab)}
            sx={{
              px: 1.5,
              py: 1.2,
              cursor: "pointer",
              position: "relative",
              userSelect: "none",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -1,
                left: 0,
                right: 0,
                height: "2px",
                backgroundColor: isActive ? main.primary : "transparent",
                borderRadius: "2px 2px 0 0",
                transition: "background-color 0.15s ease",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: isActive ? 700 : 500,
                color: isActive ? main.primary : fg.tertiary,
                transition: "color 0.15s ease",
              }}
            >
              {tab}
            </Typography>
          </Box>
        );
      })}
    </Stack>
  );
}
