// @ts-nocheck
// Shared building blocks for the seller dashboard. Import from here on every
// seller page/modal so spacing, colors, and interaction patterns stay identical.
import {
  Box,
  Stack,
  Typography,
  InputBase,
  Dialog,
  IconButton,
} from "@mui/material";
import {
  Dismiss24Regular,
  Search24Regular,
  ChevronDown24Regular,
} from "@fluentui/react-icons";
import { radiusTokens } from "@/lib/theme";

export const money = (n) => `₦${Number(n || 0).toLocaleString("en-NG")}`;

export const initials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const AVATAR_PALETTE = [
  "#6C5CE7",
  "#E64980",
  "#0FA36B",
  "#E8912D",
  "#3B82F6",
  "#B4409A",
];
export const avatarColor = (seed = "") => {
  let h = 0;
  for (let i = 0; i < seed.length; i++)
    h = (h * 31 + seed.charCodeAt(i)) % AVATAR_PALETTE.length;
  return AVATAR_PALETTE[Math.abs(h)];
};

// tone -> color mapping used by Pill. Keep this the single source of truth
// so "success" always means the same green everywhere in the dashboard.
const TONES = {
  neutral: "#8A8F98",
  info: "#3B82F6",
  success: "#0FA36B",
  warning: "#E8912D",
  danger: "#F04F4F",
  brand: "#6C5CE7",
};

export function Pill({ label, tone = "neutral", icon: Icon, sx = {} }) {
  const color = TONES[tone] || tone;
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={0.5}
      sx={{
        display: "inline-flex",
        backgroundColor: `${color}1c`,
        color,
        borderRadius: 999,
        px: 1.1,
        py: 0.4,
        fontSize: 11.5,
        fontWeight: 700,
        whiteSpace: "nowrap",
        width: "fit-content",
        ...sx,
      }}
    >
      {Icon && <Icon style={{ fontSize: 12 }} />}
      {label}
    </Stack>
  );
}

export function Avatar({ name, size = 34 }) {
  const color = avatarColor(name);
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: `${color}26`,
        color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.33,
        fontWeight: 700,
        flexShrink: 0,
      }}
    >
      {initials(name)}
    </Box>
  );
}

export function StatCard({
  icon: Icon,
  label,
  value,
  delta,
  deltaTone = "success",
  fg,
  border,
  bg,
  accent,
}) {
  return (
    <Box
      sx={{
        border: `1px solid ${border.primary}`,
        borderRadius: radiusTokens.md,
        p: { xs: 1.8, sm: 2.2 },
        minWidth: 0,
        backgroundColor: bg.primary,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Typography
          sx={{ fontSize: 12.5, color: fg.secondary, fontWeight: 600 }}
        >
          {label}
        </Typography>
        {Icon && (
          <Box
            sx={{
              width: 30,
              height: 30,
              borderRadius: radiusTokens.sm ?? 8,
              backgroundColor: `${accent}16`,
              color: accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon style={{ fontSize: 15 }} />
          </Box>
        )}
      </Stack>
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontSize: { xs: 20, sm: 23 },
          fontWeight: 800,
          color: fg.primary,
          mt: 1,
        }}
      >
        {value}
      </Typography>
      {delta && (
        <Typography
          sx={{
            fontSize: 11.5,
            color: TONES[deltaTone],
            fontWeight: 700,
            mt: 0.6,
          }}
        >
          {delta}
        </Typography>
      )}
    </Box>
  );
}

// Individually-outlined filter chips, e.g. "All 10 · new 2 · returning 2"
export function FilterChips({ tabs, active, onChange, fg, border, main }) {
  return (
    <Stack
      direction="row"
      gap={0.9}
      sx={{
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
        "&::-webkit-scrollbar": { display: "none" },
        scrollbarWidth: "none",
        pb: 0.2,
      }}
    >
      {tabs.map((t) => {
        const isActive = t.key === active;
        return (
          <Stack
            key={t.key}
            direction="row"
            alignItems="center"
            gap={0.7}
            onClick={() => onChange(t.key)}
            sx={{
              flexShrink: 0,
              border: `1.5px solid ${isActive ? main.primary : border.primary}`,
              color: isActive ? main.primary : fg.secondary,
              borderRadius: 999,
              px: 1.5,
              py: 0.75,
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            <Typography sx={{ fontSize: 12.5, fontWeight: 700 }}>
              {t.label}
            </Typography>
            {t.count != null && (
              <Box
                sx={{
                  fontSize: 11,
                  fontWeight: 700,
                  backgroundColor: isActive
                    ? `${main.primary}1c`
                    : `${fg.secondary}1a`,
                  borderRadius: 999,
                  px: 0.8,
                  minWidth: 18,
                  textAlign: "center",
                }}
              >
                {t.count}
              </Box>
            )}
          </Stack>
        );
      })}
    </Stack>
  );
}

// Search input + optional select, matching the Customers page toolbar
export function Toolbar({
  search,
  onSearch,
  placeholder = "Search...",
  right,
  border,
  fg,
}) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      gap={1.2}
      sx={{ minWidth: 0 }}
    >
      <Stack
        direction="row"
        alignItems="center"
        gap={1}
        sx={{
          flexGrow: 1,
          minWidth: 0,
          border: `1px solid ${border.primary}`,
          borderRadius: radiusTokens.sm ?? 8,
          px: 1.4,
          py: 1,
        }}
      >
        <Search24Regular
          style={{ fontSize: 16, color: fg.tertiary, flexShrink: 0 }}
        />
        <InputBase
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder={placeholder}
          sx={{ fontSize: 13.5, flexGrow: 1, color: fg.primary, minWidth: 0 }}
        />
      </Stack>
      {right}
    </Stack>
  );
}

export function Select({ value, onChange, options, border, fg }) {
  return (
    <Box sx={{ position: "relative", flexShrink: 0 }}>
      <Stack
        component="select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        direction="row"
        sx={{
          appearance: "none",
          border: `1px solid ${border.primary}`,
          borderRadius: radiusTokens.sm ?? 8,
          px: 1.4,
          py: 1,
          pr: 3.4,
          fontSize: 13,
          fontWeight: 600,
          color: fg.primary,
          backgroundColor: "transparent",
          cursor: "pointer",
          minHeight: 44,
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </Stack>
      <ChevronDown24Regular
        style={{
          position: "absolute",
          right: 10,
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: 14,
          color: fg.tertiary,
          pointerEvents: "none",
        }}
      />
    </Box>
  );
}

// Desktop table primitives — used inside a Box with display:{xs:'none', md:'block'}
export function TGrid({ children, cols, sx = {} }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: cols,
        alignItems: "center",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  subtitle,
  action,
  fg,
  border,
}) {
  return (
    <Stack
      alignItems="center"
      textAlign="center"
      gap={1}
      sx={{
        py: 6,
        px: 3,
        border: `1px dashed ${border.primary}`,
        borderRadius: radiusTokens.md,
      }}
    >
      {Icon && <Icon style={{ fontSize: 30, color: fg.tertiary }} />}
      <Typography sx={{ fontSize: 14.5, fontWeight: 700, color: fg.primary }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography sx={{ fontSize: 12.5, color: fg.tertiary, maxWidth: 320 }}>
          {subtitle}
        </Typography>
      )}
      {action}
    </Stack>
  );
}

export function PrimaryButton({
  children,
  onClick,
  disabled,
  main,
  fullWidthMobile = true,
  icon: Icon,
}) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      gap={0.8}
      onClick={disabled ? undefined : onClick}
      sx={{
        backgroundColor: disabled ? `${main.primary}55` : main.primary,
        color: "#fff",
        borderRadius: radiusTokens.sm ?? 8,
        px: 2,
        py: 1.1,
        fontSize: 13,
        fontWeight: 700,
        fontFamily: "Poppins",
        cursor: disabled ? "not-allowed" : "pointer",
        minHeight: 44,
        width: { xs: fullWidthMobile ? "100%" : "auto", sm: "auto" },
        flexShrink: 0,
        whiteSpace: "nowrap",
        transition: "transform 0.15s ease",
        "&:hover": disabled ? undefined : { transform: "translateY(-1px)" },
      }}
    >
      {Icon && <Icon style={{ fontSize: 16 }} />}
      {children}
    </Stack>
  );
}

export function GhostButton({ children, onClick, main, fg, border }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      gap={0.8}
      onClick={onClick}
      sx={{
        border: `1px solid ${border.primary}`,
        color: fg.primary,
        borderRadius: radiusTokens.sm ?? 8,
        px: 1.8,
        py: 1.1,
        fontSize: 13,
        fontWeight: 700,
        cursor: "pointer",
        minHeight: 44,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </Stack>
  );
}

// Modal shell: full-screen sheet on mobile, centered card on desktop.
export function ModalShell({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  bg,
  fg,
  border,
  maxWidth = 480,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: bg.primary,
          backgroundImage: "none",
          borderRadius: { xs: 0, sm: radiusTokens.md },
          m: { xs: 0, sm: 2 },
          width: { xs: "100%", sm: `min(${maxWidth}px, 92vw)` },
          maxWidth: "none",
          height: { xs: "100%", sm: "auto" },
          maxHeight: { xs: "100%", sm: "88vh" },
        },
      }}
    >
      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
        sx={{
          p: { xs: 2, sm: 2.6 },
          borderBottom: `1px solid ${border.primary}`,
        }}
      >
        <Stack gap={0.3} sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: 16.5,
              fontWeight: 800,
              color: fg.primary,
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography sx={{ fontSize: 12.5, color: fg.tertiary }}>
              {subtitle}
            </Typography>
          )}
        </Stack>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ color: fg.secondary, flexShrink: 0 }}
        >
          <Dismiss24Regular style={{ fontSize: 18 }} />
        </IconButton>
      </Stack>
      <Box sx={{ p: { xs: 2, sm: 2.6 }, overflowY: "auto", flexGrow: 1 }}>
        {children}
      </Box>
      {footer && (
        <Stack
          direction="row"
          gap={1.2}
          sx={{
            p: { xs: 2, sm: 2.6 },
            borderTop: `1px solid ${border.primary}`,
          }}
        >
          {footer}
        </Stack>
      )}
    </Dialog>
  );
}

// PageHeader / SectionCard mirror the ones already used on the admin
// settings page. If your project already exports equivalents from a shared
// "data" module, feel free to delete these two and import those instead —
// they're included here so this package works standalone.
export function PageHeader({ title, subtitle, action, fg }) {
  return (
    <Stack
      direction="row"
      alignItems="flex-start"
      justifyContent="space-between"
      gap={1.4}
      sx={{ mb: { xs: 2.4, md: 3 }, flexWrap: "wrap" }}
    >
      <Stack gap={0.4}>
        <Typography
          sx={{
            fontFamily: "Syne",
            fontWeight: 700,
            fontSize: { xs: 22, md: 26 },
            color: fg?.primary,
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography sx={{ fontSize: 13, color: fg?.tertiary }}>
            {subtitle}
          </Typography>
        )}
      </Stack>
      {action}
    </Stack>
  );
}

export function SectionCard({ children, noPadding, border, sx = {} }) {
  return (
    <Box
      sx={{
        border: `1px solid ${border?.primary}`,
        borderRadius: radiusTokens.md,
        p: noPadding ? 0 : { xs: 1.75, sm: 2.4 },
        minWidth: 0,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export function ModalField({
  label,
  hint,
  value,
  onChange,
  placeholder,
  fg,
  border,
  multiline,
  minRows,
}) {
  return (
    <Stack gap={0.6} sx={{ mb: 1.6 }}>
      <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: fg.primary }}>
        {label}
      </Typography>
      {hint && (
        <Typography sx={{ fontSize: 11.5, color: fg.tertiary, mt: -0.4 }}>
          {hint}
        </Typography>
      )}
      <Box
        sx={{
          border: `1px solid ${border.primary}`,
          borderRadius: radiusTokens.sm ?? 8,
          px: 1.4,
          py: 1,
        }}
      >
        <InputBase
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          multiline={multiline}
          minRows={minRows}
          sx={{
            fontSize: 15,
            width: "100%",
            color: fg.primary,
            "& textarea, & input": { fontSize: 15 },
          }}
        />
      </Box>
    </Stack>
  );
}
