// @ts-nocheck
// Shared building blocks for the TETYHUB admin dashboard.
// Import these into every /dashboard/admin page so the whole section
// reads as one designed surface instead of five separate screens.
import { keyframes } from "@emotion/react";
import { Box, Stack, Typography, InputBase, Drawer } from "@mui/material";
import {
  ArrowUp24Filled,
  ArrowDown24Filled,
  Search24Regular,
  Dismiss24Regular,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radiusTokens } from "@/lib/theme";

export const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Semantic status colors — deliberately outside the brand token system
// because a dashboard needs states (pending/success/danger) to read the
// same regardless of which theme skin is active.
export const STATUS = {
  pending: { bg: "rgba(240,177,0,0.12)", fg: "#F0B100", label: "Pending" },
  approved: { bg: "rgba(34,197,94,0.12)", fg: "#22C55E", label: "Approved" },
  rejected: { bg: "rgba(248,81,73,0.12)", fg: "#F85149", label: "Rejected" },
  flagged: { bg: "rgba(248,81,73,0.12)", fg: "#F85149", label: "Flagged" },
  live: { bg: "rgba(34,197,94,0.12)", fg: "#22C55E", label: "Live" },
  in_review: { bg: "rgba(88,166,255,0.12)", fg: "#58A6FF", label: "In review" },
  confirmed: { bg: "rgba(88,166,255,0.12)", fg: "#58A6FF", label: "Confirmed" },
  in_progress: {
    bg: "rgba(240,177,0,0.12)",
    fg: "#F0B100",
    label: "In progress",
  },
  completed: { bg: "rgba(34,197,94,0.12)", fg: "#22C55E", label: "Completed" },
  cancelled: {
    bg: "rgba(139,148,158,0.14)",
    fg: "#8B949E",
    label: "Cancelled",
  },
  disputed: { bg: "rgba(248,81,73,0.12)", fg: "#F85149", label: "Disputed" },
};

export function StatusChip({ status, size = "md" }) {
  const s = STATUS[status] ?? STATUS.pending;
  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.6,
        backgroundColor: s.bg,
        color: s.fg,
        fontSize: size === "sm" ? 10.5 : 11.5,
        fontWeight: 700,
        fontFamily: "Poppins",
        borderRadius: 999,
        px: size === "sm" ? 1 : 1.3,
        py: size === "sm" ? 0.35 : 0.5,
        whiteSpace: "nowrap",
      }}
    >
      <Box
        component="span"
        sx={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          backgroundColor: s.fg,
          flexShrink: 0,
        }}
      />
      {s.label}
    </Box>
  );
}

// Page-level header: title + optional subtitle + right-aligned action slot.
export function PageHeader({ title, subtitle, action }) {
  const { fg } = useColor();
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      alignItems={{ xs: "flex-start", sm: "center" }}
      justifyContent="space-between"
      gap={1.4}
      sx={{ mb: { xs: 2.5, md: 3.5 } }}
    >
      <Stack gap={0.4}>
        <Typography
          sx={{
            fontFamily: "Syne",
            fontWeight: 700,
            fontSize: { xs: 21, sm: 24, md: 27 },
            color: fg.primary,
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography sx={{ fontSize: 13, color: fg.tertiary }}>
            {subtitle}
          </Typography>
        )}
      </Stack>
      {action && <Box sx={{ width: { xs: "100%", sm: "auto" } }}>{action}</Box>}
    </Stack>
  );
}

// A bordered content panel — the base unit every table/list/chart sits in.
export function SectionCard({ children, sx, noPadding }) {
  const { border } = useColor();
  return (
    <Box
      sx={{
        border: `1px solid ${border.primary}`,
        borderRadius: radiusTokens.md,
        p: noPadding ? 0 : { xs: 1.75, sm: 2.4 },
        animation: `${fadeUp} 0.3s ease-out both`,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

// KPI stat card for the overview grid. `delta` is a signed percentage.
export function KpiCard({ icon: Icon, label, value, delta, accent }) {
  const { fg, border, bg } = useColor();
  const positive = delta >= 0;
  return (
    <SectionCard sx={{ flex: 1, minWidth: 0 }}>
      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Box
          sx={{
            width: 34,
            height: 34,
            borderRadius: radiusTokens.sm ?? 8,
            backgroundColor: `${accent}18`,
            color: accent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon style={{ fontSize: 17 }} />
        </Box>
        {typeof delta === "number" && (
          <Stack
            direction="row"
            alignItems="center"
            gap={0.3}
            sx={{ color: positive ? "#22C55E" : "#F85149" }}
          >
            {positive ? (
              <ArrowUp24Filled style={{ fontSize: 12 }} />
            ) : (
              <ArrowDown24Filled style={{ fontSize: 12 }} />
            )}
            <Typography sx={{ fontSize: 11.5, fontWeight: 700 }}>
              {Math.abs(delta)}%
            </Typography>
          </Stack>
        )}
      </Stack>
      <Typography
        sx={{
          fontFamily: "Syne",
          fontWeight: 700,
          fontSize: { xs: 20, sm: 23 },
          color: fg.primary,
          mt: 1.6,
          lineHeight: 1.1,
        }}
      >
        {value}
      </Typography>
      <Typography sx={{ fontSize: 12, color: fg.tertiary, mt: 0.4 }}>
        {label}
      </Typography>
    </SectionCard>
  );
}

// Compact search field used at the top of list/table pages.
export function SearchField({ value, onChange, placeholder = "Search..." }) {
  const { border, fg } = useColor();
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={1}
      sx={{
        border: `1px solid ${border.primary}`,
        borderRadius: radiusTokens.sm ?? 8,
        px: 1.4,
        py: 1,
        minWidth: 0,
        flex: { xs: "1 1 auto", sm: "0 1 260px" },
      }}
    >
      <Search24Regular
        style={{ fontSize: 16, color: fg.tertiary, flexShrink: 0 }}
      />
      <InputBase
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        sx={{
          fontSize: 16,
          flexGrow: 1,
          color: fg.primary,
          minWidth: 0,
          "& input": { fontSize: 16 },
        }}
      />
    </Stack>
  );
}

// Segmented pill tabs — used for Pending/Approved/Rejected style filters.
export function PillTabs({ tabs, value, onChange, counts }) {
  const { fg, border, main, bg } = useColor();
  return (
    <Stack
      direction="row"
      gap={0.6}
      sx={{
        border: `1px solid ${border.primary}`,
        borderRadius: 999,
        p: 0.5,
        width: "fit-content",
        maxWidth: "100%",
        overflowX: "auto",
      }}
    >
      {tabs.map((t) => {
        const active = t.key === value;
        return (
          <Box
            key={t.key}
            onClick={() => onChange(t.key)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.7,
              px: 1.6,
              py: 0.7,
              borderRadius: 999,
              cursor: "pointer",
              flexShrink: 0,
              backgroundColor: active ? main.primary : "transparent",
              color: active ? "#fff" : fg.secondary,
              transition: "all 0.15s ease",
            }}
          >
            <Typography
              sx={{ fontSize: 12.5, fontWeight: 700, fontFamily: "Poppins" }}
            >
              {t.label}
            </Typography>
            {counts?.[t.key] != null && (
              <Box
                sx={{
                  fontSize: 10.5,
                  fontWeight: 700,
                  borderRadius: 999,
                  px: 0.7,
                  minWidth: 16,
                  textAlign: "center",
                  backgroundColor: active
                    ? "rgba(255,255,255,0.25)"
                    : bg.secondary,
                  color: active ? "#fff" : fg.tertiary,
                }}
              >
                {counts[t.key]}
              </Box>
            )}
          </Box>
        );
      })}
    </Stack>
  );
}

// Empty state for zero-result lists/tables.
export function EmptyState({ icon: Icon, title, subtitle }) {
  const { fg, border } = useColor();
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      gap={1}
      sx={{ py: 6, px: 2, textAlign: "center" }}
    >
      {Icon && (
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: `1.5px solid ${border.primary}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: fg.tertiary,
            mb: 0.5,
          }}
        >
          <Icon style={{ fontSize: 20 }} />
        </Box>
      )}
      <Typography sx={{ fontSize: 14, fontWeight: 700, color: fg.primary }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography sx={{ fontSize: 12.5, color: fg.tertiary, maxWidth: 320 }}>
          {subtitle}
        </Typography>
      )}
    </Stack>
  );
}

export function money(n) {
  return `₦${n.toLocaleString("en-NG")}`;
}

// Initials avatar — used anywhere a person/business needs a face.
export function Avatar({ name, size = 34, accent }) {
  const { main } = useColor();
  const color = accent ?? main.primary;
  const initials = (name || "?")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: `${color}1c`,
        color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.38,
        fontWeight: 700,
        fontFamily: "Poppins",
        flexShrink: 0,
      }}
    >
      {initials}
    </Box>
  );
}

// Small metric block — used in header stat strips (Orders, Disputes, Payments, etc).
export function StatBlock({ label, value, accent, sub }) {
  const { fg, border } = useColor();
  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 0,
        border: `1px solid ${border.primary}`,
        borderRadius: radiusTokens.md,
        px: 2,
        py: 1.6,
      }}
    >
      <Typography sx={{ fontSize: 12, color: fg.tertiary, mb: 0.6 }}>
        {label}
      </Typography>
      <Typography
        sx={{
          fontFamily: "Syne",
          fontWeight: 700,
          fontSize: 19,
          color: accent ?? fg.primary,
        }}
      >
        {value}
      </Typography>
      {sub && (
        <Typography sx={{ fontSize: 11, color: fg.tertiary, mt: 0.3 }}>
          {sub}
        </Typography>
      )}
    </Box>
  );
}

// Slim progress bar — verification completeness, usage caps, quota bars.
export function ProgressBar({ value, max = 100, accent }) {
  const { border, main } = useColor();
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <Box
      sx={{
        width: "100%",
        height: 5,
        borderRadius: 999,
        backgroundColor: border.primary,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: `${pct}%`,
          height: "100%",
          backgroundColor: accent ?? main.primary,
          borderRadius: 999,
          transition: "width 0.3s ease",
        }}
      />
    </Box>
  );
}

// Small icon-only or icon+label button used in table row actions.
export function RowAction({ icon: Icon, label, tone, onClick }) {
  const { border, fg, main } = useColor();
  const styles =
    tone === "primary"
      ? { backgroundColor: main.primary, color: "#fff" }
      : tone === "danger"
        ? { backgroundColor: "rgba(248,81,73,0.1)", color: "#F85149" }
        : {
            backgroundColor: "transparent",
            color: fg.secondary,
            border: `1px solid ${border.primary}`,
          };
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      gap={0.5}
      onClick={onClick}
      sx={{
        ...styles,
        borderRadius: radiusTokens.sm ?? 8,
        px: 1.2,
        py: 0.7,
        cursor: "pointer",
        flexShrink: 0,
        transition: "opacity 0.15s ease",
        "&:hover": { opacity: 0.85 },
      }}
    >
      {Icon && <Icon style={{ fontSize: 13.5 }} />}
      <Typography
        sx={{
          fontSize: 11.5,
          fontWeight: 700,
          fontFamily: "Poppins",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </Typography>
    </Stack>
  );
}

// ---------------------------------------------------------------------
// Slide-over detail panel — the "View" action on any list/table row
// (sellers, buyers, disputes, tickets, etc) should open one of these
// instead of navigating away. One consistent pattern across the admin.
// ---------------------------------------------------------------------
export function SidePanel({
  open,
  onClose,
  title,
  subtitle,
  avatar,
  children,
  footer,
  width = 460,
}) {
  const { fg, border, bg } = useColor();
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: width },
          backgroundColor: bg.primary,
          borderLeft: `1px solid ${border.primary}`,
        },
      }}
    >
      <Stack sx={{ height: "100%" }}>
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          gap={1.2}
          sx={{
            p: { xs: 1.75, sm: 2.4 },
            borderBottom: `1px solid ${border.primary}`,
            flexShrink: 0,
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            gap={1.2}
            sx={{ minWidth: 0 }}
          >
            {avatar}
            <Stack gap={0.2} sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: 800,
                  fontSize: 15.5,
                  color: fg.primary,
                }}
                noWrap
              >
                {title}
              </Typography>
              {subtitle && (
                <Typography sx={{ fontSize: 12, color: fg.tertiary }} noWrap>
                  {subtitle}
                </Typography>
              )}
            </Stack>
          </Stack>
          <Box
            onClick={onClose}
            sx={{
              cursor: "pointer",
              color: fg.tertiary,
              flexShrink: 0,
              p: 0.6,
              "&:hover": { color: fg.primary },
            }}
          >
            <Dismiss24Regular style={{ fontSize: 18 }} />
          </Box>
        </Stack>

        <Box sx={{ flexGrow: 1, overflowY: "auto", p: { xs: 1.75, sm: 2.4 } }}>
          {children}
        </Box>

        {footer && (
          <Box
            sx={{
              p: { xs: 1.75, sm: 2.4 },
              borderTop: `1px solid ${border.primary}`,
              flexShrink: 0,
            }}
          >
            {footer}
          </Box>
        )}
      </Stack>
    </Drawer>
  );
}

// A small heading used to break up sections inside a SidePanel.
export function PanelSectionTitle({ children }) {
  const { fg } = useColor();
  return (
    <Typography
      sx={{
        fontSize: 11.5,
        fontWeight: 700,
        color: fg.tertiary,
        textTransform: "uppercase",
        letterSpacing: 0.5,
        mb: 1,
      }}
    >
      {children}
    </Typography>
  );
}

// Label/value row for key-fact lists inside a panel.
export function DetailRow({ label, value }) {
  const { fg, border } = useColor();
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      gap={1}
      sx={{ py: 1, borderBottom: `1px solid ${border.primary}` }}
    >
      <Typography sx={{ fontSize: 12.5, color: fg.tertiary, flexShrink: 0 }}>
        {label}
      </Typography>
      <Typography
        sx={{
          fontSize: 12.5,
          fontWeight: 600,
          color: fg.primary,
          textAlign: "right",
        }}
      >
        {value}
      </Typography>
    </Stack>
  );
}
