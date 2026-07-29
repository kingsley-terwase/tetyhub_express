import { Box, Stack } from "@mui/material";
import { ArrowExitFilled } from "@fluentui/react-icons";
import { useRef, useState } from "react";
import { spacingTokens } from "@/lib/theme";
import { useNavigationMenu } from "@/lib/navigation";
import { useLocation, useNavigate } from "react-router-dom";
import { footerHeight, headerHeight } from "./lib";
import { useColor } from "@/contexts/color";
import { useLogOut } from "@/queries/auth";
import { ScreenLoader, Typography } from "@/components/ui";
import { NavLink } from "@/components/shared";

/** @typedef {import("@/types/global.d").NavItem} NavItemProps */
export default function Sidebar() {
  /** @type {React.RefObject<HTMLDivElement | null>} */
  const navRef = useRef(null);

  const menu = useNavigationMenu();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { status, main } = useColor();

  const [selected, setSelected] = useState(/** @type {number | null} */ (null));

  const { loading: logoutLoading, logOut } = useLogOut();

  /**
   * @param {NavItemProps} item
   * @param {number} index
   */
  function handleNavigation(item, index) {
    if (item?.sub && item?.sub?.length > 0) {
      setSelected((current) => (current === index ? null : index));
      return;
    }
    if (!item?.path) return;
    navigate(item?.path);
  }

  /** @param {NavItemProps} item */
  function handleSubNavigatiion(item) {
    if (!item?.path) return;
    navigate(item?.path);
  }

  async function handleLogout() {
    await logOut();
  }

  return (
    <>
      <Box ref={navRef} sx={{ height: "100vh" }}>
        <Stack
          display="flex"
          alignItems="center"
          justifyContent="center"
          height={headerHeight}
        >
          {/* <Box
            component="img"
            height="25px"
            src={theme === "dark" ? "/logo-light.png" : "/logo-dark.png"}
          ></Box> */}
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: "0.2rem",
              color: "#fff",
              flexShrink: 0,
            }}
          >
            TETY
            <Box component="span" sx={{ color: main.primary }}>
              HUB
            </Box>
          </Typography>
        </Stack>

        <Box
          sx={{
            px: spacingTokens.md,
            height: `calc(100svh - (${headerHeight} + ${footerHeight}))`,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: spacingTokens.xs,
          }}
        >
          {menu.map((item, index) => (
            <Stack key={index} gap={spacingTokens.xs}>
              <NavLink
                nav={item}
                active={
                  item.path === pathname ||
                  item?.sub?.some((subItem) => subItem.path === pathname) ||
                  false
                }
                onNavigate={() => handleNavigation(item, index)}
                subNavOpen={selected === index}
              ></NavLink>

              {item?.sub && item?.sub?.length > 0 && (
                <Stack
                  gap={spacingTokens.sm}
                  sx={{
                    maxHeight: selected === index ? "500px" : "0px",
                    overflowY: "hidden",
                    overflowX: "visible",
                    transition: "max-height 0.35s ease-in-out",
                  }}
                >
                  {item?.sub?.map((subItem, subIndex) => (
                    <NavLink
                      key={subIndex}
                      nav={subItem}
                      active={subItem.path === pathname}
                      onNavigate={() => handleSubNavigatiion(subItem)}
                      x={spacingTokens.md}
                    ></NavLink>
                  ))}
                </Stack>
              )}
            </Stack>
          ))}
        </Box>

        <Stack
          direction="row"
          display="flex"
          alignItems="center"
          justifyContent="end"
          height={footerHeight}
          px={spacingTokens.sm}
        >
          <ArrowExitFilled
            color={status.error.primary}
            fontSize={20}
            style={{ cursor: "pointer" }}
            onClick={handleLogout}
          ></ArrowExitFilled>
        </Stack>
      </Box>

      {logoutLoading && <ScreenLoader open message="Logging out... 🤯" />}
    </>
  );
}
