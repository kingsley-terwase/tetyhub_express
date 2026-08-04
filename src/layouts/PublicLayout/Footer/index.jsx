import { Box, Typography, Stack, IconButton } from "@mui/material";
import {
  ChevronRight16Regular,
  Globe24Regular,
  ChevronDown16Regular,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radius, radiusTokens } from "@/lib/theme";
import { FOOTER_COLUMNS, BOTTOM_LINKS, SOCIAL_LINKS } from "./data";
import FooterSearch from "./FooterSearch";
import SocialIcon from "./SocialIcon";

const HEADING_FONT = "Syne";

// Deliberately fixed dark colors, not the theme's light-mode `bg` tokens —
// BMG's footer is a dark anchor band against an otherwise light site.
// Swap these two constants if you add a real dark-mode palette later.
const FOOTER_BG = "#0B1224";
const FOOTER_BG_DEEP = "#080D1B";
const TEXT_MUTED = "rgba(255,255,255,0.62)";
const DIVIDER_LINE = "rgba(255,255,255,0.08)";

export default function Footer() {
  const { main } = useColor();

  return (
    <Box
      component="footer"
      sx={{ backgroundColor: FOOTER_BG, fontFamily: HEADING_FONT }}
    >
      <Box
        sx={{
          px: { xs: spacingTokens.md, md: 4 },
          py: 8,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "2fr 1fr",
            md: "1.3fr repeat(4, 1fr)",
          },
          gap: spacingTokens.md,
        }}
      >
        <Box
          sx={{
            gridColumn: { xs: "1 / -1", sm: "1 / -1", md: "auto" },
            borderRadius: { xs: radiusTokens.md, md: 0 },
            // p: { xs: spacingTokens.md, md: 0 },
            pr: { md: spacingTokens.lg },
            pb: { xs: spacingTokens.lg, md: 0 },
            mb: { xs: spacingTokens.md, md: 0 },
            borderBottom: { xs: `1px solid ${DIVIDER_LINE}`, md: "none" },
          }}
        >
          <Typography
            sx={{
              fontSize: 22,
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
          <Typography
            sx={{
              fontSize: 15,
              color: TEXT_MUTED,
              maxWidth: 280,
              mb: spacingTokens.md,
              lineHeight: 1.6,
            }}
          >
            Verified sellers and real buyers on one marketplace — goods and
            services, side by side, built for trust from day one.
          </Typography>

          <Box sx={{ mb: spacingTokens.md }}>
            <FooterSearch />
          </Box>

          <Stack direction="row" spacing={spacingTokens.xs}>
            {SOCIAL_LINKS.map((social) => (
              <IconButton
                key={social.key}
                component="a"
                href={social.href}
                aria-label={social.label}
                sx={{
                  width: 54,
                  height: 54,
                  backgroundColor: "#fff",
                  color: FOOTER_BG,
                  "&:hover": { backgroundColor: main.primary, color: "#fff" },
                }}
              >
                <SocialIcon social={social} size={35} />
              </IconButton>
            ))}
          </Stack>
        </Box>

        {FOOTER_COLUMNS.map((column) => (
          <Box key={column.title}>
            <Typography
              sx={{
                fontSize: 17,
                fontWeight: 700,
                color: "#fff",
                mb: spacingTokens.sm,
              }}
            >
              {column.title}
            </Typography>
            <Stack spacing={spacingTokens.xs}>
              {column.links.map((link) => (
                <Box
                  key={link.href}
                  component="a"
                  href={link.href}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // gap: 4,
                    fontSize: 15,
                    color: TEXT_MUTED,
                    textDecoration: "none",
                    py: 0.4,
                    "&:hover": { color: "#fff" },
                  }}
                >
                  <ChevronRight16Regular
                    style={{ fontSize: 14, color: main.primary, flexShrink: 0 }}
                  />
                  {link.label}
                </Box>
              ))}
            </Stack>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          backgroundColor: FOOTER_BG_DEEP,
          px: { xs: spacingTokens.md, md: spacingTokens.xl },
          py: spacingTokens.md,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: spacingTokens.sm,
        }}
      >
        <Typography sx={{ fontSize: 16, color: TEXT_MUTED }}>
          <Box
            component="span"
            sx={{ letterSpacing: "0.2rem", fontWeight: 700, color: "#fff" }}
          >
            TETYHUB
          </Box>{" "}
          © {new Date().getFullYear()}. All rights reserved.
        </Typography>

        <Stack
          direction="row"
          spacing={spacingTokens.sm}
          divider={
            <Typography sx={{ fontSize: 12, color: TEXT_MUTED }}>•</Typography>
          }
        >
          {BOTTOM_LINKS.map((link) => (
            <Typography
              key={link.href}
              component="a"
              href={link.href}
              sx={{
                fontSize: 12,
                color: TEXT_MUTED,
                textDecoration: "none",
                "&:hover": { color: "#fff" },
              }}
            >
              {link.label}
            </Typography>
          ))}
        </Stack>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            backgroundColor: "rgba(255,255,255,0.06)",
            borderRadius: radius.full,
            px: spacingTokens.sm,
            py: 0.5,
            color: "#fff",
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          <Globe24Regular style={{ fontSize: 16 }} />
          EN — English
          <ChevronDown16Regular style={{ fontSize: 14 }} />
        </Box>
      </Box>
    </Box>
  );
}
