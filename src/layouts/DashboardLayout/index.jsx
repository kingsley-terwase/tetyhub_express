import { useState } from "react";
import { Box, Drawer, useTheme, useMediaQuery } from "@mui/material";
import { useColor } from "@/contexts/color";
import { spacingTokens } from "@/lib/theme";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const { border, bg } = useColor();
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = () => setMobileOpen((prev) => !prev);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {!isMobile && (
        <Box
          sx={{
            flexShrink: 0,
            height: "100vh",
            borderRight: `1px solid ${border.primary}`,
            backgroundColor: bg.secondary,
            overflowY: "auto",
          }}
        >
          <Sidebar />
        </Box>
      )}

      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={toggleDrawer}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              boxShadow: "none !important",
              borderRight: `1px solid ${border.primary}`,
              backgroundColor: bg.secondary,
            },
          }}
        >
          <Sidebar />
        </Drawer>
      )}

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflow: "hidden",
          minWidth: 0,
        }}
      >
        <Box sx={{ flexShrink: 0 }}>
          <Navbar onToggle={toggleDrawer} />
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            overflowX: "hidden",
            p: spacingTokens.md,
            boxSizing: "border-box",
            backgroundColor: bg.dashboard,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
