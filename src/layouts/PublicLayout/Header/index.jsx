// @ts-nocheck
import { useState } from "react";
import {
  Box,
  Typography,
  InputBase,
  IconButton,
  Badge,
  Button,
  Stack,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Search24Regular,
  ShoppingBag24Filled,
  Navigation24Regular,
  Dismiss24Regular,
  QuestionCircle24Regular,
  ChevronRight24Regular,
  Tag24Regular,
  PeopleCommunity24Regular,
  Person24Filled,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radius, radiusTokens } from "@/lib/theme";
import CategoriesMenu from "./CategoriesMenu";
import { NAV_LINKS } from "./data";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import { getRoleBasePath } from "@/lib/roles";
import { useCart } from "@/Hooks/cart";

const HEADING_FONT = "Syne";

/** Exact label → icon, matching the real NAV_LINKS in data.js. Falls back to a
 * generic chevron so a future link added without an entry here doesn't break. */
const NAV_ICONS = {
  "Sell on TETYHUB": Tag24Regular,
  Services: PeopleCommunity24Regular,
  Support: QuestionCircle24Regular,
};

function getNavIcon(label = "") {
  // @ts-ignore
  return NAV_ICONS[label] ?? ChevronRight24Regular;
}

export default function Header() {
  const { bg, fg, border, main } = useColor();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const user = useAuthStore((s) => s.user);
  const permission = useAuthStore((s) => s.permission);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const { cart } = useCart();

  const cartItemCount = (cart?.items ?? cart?.item_count ?? cart?.products ?? []).reduce(
    (sum, it) => sum + Number(it.quantity ?? it.qty ?? 1),
    0
  );

  const handleLogin = () => {
    navigate("/login");
  };

  const handleHome = () => {
    navigate("/");
  };

  const handleCart = () => {
    navigate("/cart");
  };

  const handleGreetingClick = () => {
    navigate(getRoleBasePath(permission));
  };

  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 30,
        backgroundColor: bg.primary,
        borderBottom: `1px solid ${border.primary}`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: spacingTokens.lg,
          px: { xs: spacingTokens.sm, md: spacingTokens.xl },
          py: spacingTokens.sm,
        }}
      >
        <IconButton
          onClick={() => setDrawerOpen(true)}
          sx={{
            display: { xs: "flex", lg: "none" },
            color: fg.primary,
            flexShrink: 0,
          }}
          aria-label="Open menu"
        >
          <Navigation24Regular style={{ fontSize: 22 }} />
        </IconButton>

        <Typography
          onClick={handleHome}
          sx={{
            fontSize: 22,
            fontWeight: 800,
            cursor: "pointer",
            color: fg.primary,
            flexShrink: 0,
          }}
        >
          TETY
          <Box component="span" sx={{ color: main.primary }}>
            HUB
          </Box>
        </Typography>

        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <CategoriesMenu />
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: spacingTokens.xs,
            backgroundColor: bg.secondary,
            border: `1px solid ${border.primary}`,
            borderRadius: radiusTokens.lg,
            px: spacingTokens.md,
            py: 0.75,
          }}
        >
          <Search24Regular style={{ fontSize: 18, color: fg.secondary }} />
          <InputBase
            placeholder="Search products, services, and sellers"
            sx={{
              fontSize: 14,
              flexGrow: 1,
              fontFamily: HEADING_FONT,
              color: fg.primary,
              "& input::placeholder": { color: fg.secondary, opacity: 1 },
            }}
          />
        </Box>

        <Stack
          direction="row"
          spacing={spacingTokens.md}
          alignItems="center"
          sx={{ display: { xs: "none", lg: "flex" } }}
        >
          {NAV_LINKS.map((link) => {
            const Icon = getNavIcon(link.label);
            return (
              <Stack
                key={link.href}
                component="a"
                href={link.href}
                direction="row"
                alignItems="center"
                gap={0.5}
                sx={{ textDecoration: "none" }}
              >
                <Icon style={{ fontSize: 16, color: fg.secondary }} />
                <Typography
                  sx={{
                    fontFamily: HEADING_FONT,
                    fontSize: 14,
                    fontWeight: 600,
                    color: fg.primary,
                    whiteSpace: "nowrap",
                  }}
                >
                  {link.label}
                </Typography>
              </Stack>
            );
          })}
        </Stack>

        <Stack
          direction="row"
          spacing={spacingTokens.xs}
          alignItems="center"
          sx={{ flexShrink: 0, ml: "auto" }}
        >
          <IconButton
            onClick={handleCart}
            size="small"
            sx={{ color: fg.primary }}
            aria-label="Cart"
          >
            <Badge badgeContent={cartItemCount} color="error" max={99} invisible={cartItemCount === 0}>
              <ShoppingBag24Filled style={{ fontSize: 20 }} />
            </Badge>
          </IconButton>

          {isAuthenticated ? (
            <Stack
              direction="row"
              alignItems="center"
              gap={0.7}
              onClick={handleGreetingClick}
              sx={{
                display: { xs: "none", sm: "flex" },
                cursor: "pointer",
                pl: 0.5,
                pr: 1.3,
                py: 0.6,
                borderRadius: radius.full,
                backgroundColor: bg.secondary,
                border: `1px solid ${border.primary}`,
              }}
            >
              <Box
                sx={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  backgroundColor: main.primary,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Person24Filled style={{ fontSize: 14 }} />
              </Box>
              <Typography
                onClick={handleGreetingClick}
                sx={{
                  fontFamily: HEADING_FONT,
                  fontSize: 13.5,
                  fontWeight: 700,
                  color: fg.primary,
                  whiteSpace: "nowrap",
                }}
              >
                Hi, {user?.firstname || "there"}
              </Typography>
            </Stack>
          ) : (
            <Button
              variant="contained"
              size="small"
              onClick={handleLogin}
              sx={{
                display: { xs: "none", sm: "inline-flex" },
                fontFamily: HEADING_FONT,
                textTransform: "none",
                fontWeight: 600,
                backgroundColor: main.primary,
                borderRadius: radius.full,
                px: spacingTokens.md,
              }}
            >
              Get started
            </Button>
          )}
        </Stack>
      </Box>

      {/* Mobile drawer — search + nav links + CTA, mirrors desktop content */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 280, backgroundColor: bg.primary, height: "100%" }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ p: spacingTokens.md }}
          >
            <Typography
              sx={{ fontSize: 18, fontWeight: 800, color: fg.primary }}
            >
              TETY
              <Box component="span" sx={{ color: main.primary }}>
                HUB
              </Box>
            </Typography>
            <IconButton
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
            >
              <Dismiss24Regular style={{ fontSize: 20, color: fg.primary }} />
            </IconButton>
          </Stack>

          <Box sx={{ px: spacingTokens.md, pb: spacingTokens.sm }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: spacingTokens.xs,
                backgroundColor: bg.secondary,
                border: `1px solid ${border.primary}`,
                borderRadius: radiusTokens.lg,
                px: spacingTokens.md,
                py: 0.75,
              }}
            >
              <Search24Regular style={{ fontSize: 18, color: fg.secondary }} />
              <InputBase
                placeholder="Search products..."
                sx={{
                  fontSize: 14,
                  flexGrow: 1,
                  color: fg.primary,
                  "& input::placeholder": { color: fg.secondary, opacity: 1 },
                }}
              />
            </Box>
          </Box>

          <Divider sx={{ borderColor: border.primary }} />

          <List>
            {NAV_LINKS.map((link) => {
              const Icon = getNavIcon(link.label);
              return (
                <ListItemButton
                  key={link.href}
                  component="a"
                  href={link.href}
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <Icon style={{ fontSize: 20, color: fg.secondary }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={link.label}
                    primaryTypographyProps={{
                      sx: {
                        fontFamily: HEADING_FONT,
                        fontSize: 14,
                        color: fg.primary,
                      },
                    }}
                  />
                </ListItemButton>
              );
            })}
          </List>

          <Box sx={{ px: spacingTokens.md, pt: spacingTokens.sm }}>
            {isAuthenticated ? (
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  setDrawerOpen(false);
                  handleGreetingClick();
                }}
                sx={{
                  fontFamily: HEADING_FONT,
                  textTransform: "none",
                  fontWeight: 600,
                  backgroundColor: main.primary,
                  borderRadius: radius.full,
                }}
              >
                Hi, {user?.firstname || "there"} — Go to dashboard
              </Button>
            ) : (
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  setDrawerOpen(false);
                  handleLogin();
                }}
                sx={{
                  fontFamily: HEADING_FONT,
                  textTransform: "none",
                  fontWeight: 600,
                  backgroundColor: main.primary,
                  borderRadius: radius.full,
                }}
              >
                Get started
              </Button>
            )}
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}