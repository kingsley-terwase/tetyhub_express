import { dashboardNavHeight, spacingTokens } from "@/lib/theme";
import { useColor } from "@/contexts/color";
import {
  LocationDismissRegular,
  NavigationFilled,
} from "@fluentui/react-icons";
import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import Avatar from "./Avatar";
import Notification from "./Notification";
import { Crumb } from "@/components/shared";
import { useCurrentRoute } from "@/lib/route";
import { useState } from "react";
import { ThemeToggleButton } from "@/components/ui";

/**
 * @param {Object} props
 * @param {() => void} props.onToggle
 */
export default function Navbar({ onToggle }) {
  const { bg, border, theme: mode, toggleTheme } = useColor();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { getCurrentRouteName } = useCurrentRoute();
  const [spinning, setSpinning] = useState(false);

  const handleToggle = () => {
    if (spinning) return;
    setSpinning(true);
    toggleTheme();
    setTimeout(() => setSpinning(false), 500);
  };

  const isDark = mode === "dark";

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        backgroundColor: bg.tertiary,
        borderBottom: `1px solid ${border.primary}`,
        height: dashboardNavHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxSizing: "border-box",
        px: spacingTokens.md,
        zIndex: theme.zIndex.appBar,
      }}
    >
      <Stack direction="row" alignItems="center" gap={spacingTokens.sm}>
        <NavigationFilled
          fontSize={22}
          onClick={onToggle}
          style={{ display: isMobile ? "block" : "none" }}
        />
        <Crumb
          active
          nav={
            getCurrentRouteName() || {
              label: "Dashboard",
              icon: LocationDismissRegular,
            }
          }
        />
      </Stack>

      <Stack direction="row" alignItems="center" gap={spacingTokens.md}>
        <ThemeToggleButton
          spinning={spinning}
          isDark={isDark}
          onToggle={handleToggle}
        />
        <Notification />
        <Avatar />
      </Stack>
    </Box>
  );
}
