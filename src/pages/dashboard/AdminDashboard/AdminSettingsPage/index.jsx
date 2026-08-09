// @ts-nocheck
import { useState } from "react";
import { Box, Stack, Typography, InputBase, Switch } from "@mui/material";
import {
  Settings24Regular,
  Wallet24Regular,
  Tag24Regular,
  People24Regular,
  Alert24Regular,
  Add24Regular,
  Dismiss24Regular,
  MailInbox24Regular,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { radiusTokens } from "@/lib/theme";
import { PageHeader, SectionCard, StatusChip } from "../data";

const NAV = [
  { key: "general", label: "General", icon: Settings24Regular },
  { key: "fees", label: "Fees & payouts", icon: Wallet24Regular },
  { key: "categories", label: "Categories", icon: Tag24Regular },
  { key: "team", label: "Team & roles", icon: People24Regular },
  { key: "notifications", label: "Notifications", icon: Alert24Regular },
];

const INITIAL_CATEGORIES = [
  "Home services",
  "Electronics",
  "Fashion",
  "Design services",
  "Vehicles",
  "Short-let apartments",
  "Handyman & repairs",
];

const TEAM = [
  { name: "Ada Okafor", email: "ada@tetyhub.com", role: "Super admin" },
  { name: "Yusuf Danladi", email: "yusuf@tetyhub.com", role: "Moderator" },
  { name: "Chinelo Umeh", email: "chinelo@tetyhub.com", role: "Support" },
];

export default function AdminSettingsPage() {
  const { fg, bg, border, main } = useColor();
  const [section, setSection] = useState("general");

  return (
    <Box>
      <PageHeader
        title="Settings"
        subtitle="Platform configuration and admin team."
      />

      {/* ---- Horizontal pill tabs ---- */}
      <Box
        sx={{
          mb: { xs: 2.4, md: 3 },
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
        }}
      >
        <Stack
          direction="row"
          gap={0.5}
          sx={{
            display: "inline-flex",
            p: 0.5,
            backgroundColor: bg.secondary,
            border: `1px solid ${border.primary}`,
            borderRadius: 999,
          }}
        >
          {NAV.map((n) => {
            const active = n.key === section;
            const Icon = n.icon;
            return (
              <Stack
                key={n.key}
                direction="row"
                alignItems="center"
                gap={0.7}
                onClick={() => setSection(n.key)}
                sx={{
                  px: { xs: 1.5, sm: 1.9 },
                  py: 0.95,
                  borderRadius: 999,
                  cursor: "pointer",
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                  backgroundColor: active ? main.primary : "transparent",
                  boxShadow: active ? `0 2px 10px 0 ${main.primary}40` : "none",
                  transition:
                    "background-color 0.18s ease, box-shadow 0.18s ease",
                  "&:hover": !active
                    ? { backgroundColor: `${fg.secondary}14` }
                    : undefined,
                }}
              >
                <Icon
                  style={{
                    fontSize: 15,
                    color: active ? "#fff" : fg.secondary,
                    flexShrink: 0,
                  }}
                />
                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: active ? 700 : 600,
                    color: active ? "#fff" : fg.secondary,
                  }}
                >
                  {n.label}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </Box>

      {/* ---- Content ---- */}
      <Box sx={{ minWidth: 0, width: "100%" }}>
        {section === "general" && <GeneralSection fg={fg} border={border} />}
        {section === "fees" && <FeesSection fg={fg} border={border} />}
        {section === "categories" && (
          <CategoriesSection fg={fg} border={border} main={main} />
        )}
        {section === "team" && (
          <TeamSection fg={fg} border={border} main={main} />
        )}
        {section === "notifications" && (
          <NotificationsSection fg={fg} border={border} main={main} />
        )}
      </Box>
    </Box>
  );
}

// ---------------------------------------------------------------------

function SettingsField({
  label,
  hint,
  value,
  onChange,
  placeholder,
  border,
  fg,
}) {
  return (
    <Stack gap={0.6}>
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
          mt: 0.3,
        }}
      >
        <InputBase
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          sx={{
            fontSize: 16,
            width: "100%",
            color: fg.primary,
            "& input": { fontSize: 16 },
          }}
        />
      </Box>
    </Stack>
  );
}

function SaveBar({ main }) {
  return (
    <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2.4 }}>
      <Box
        sx={{
          backgroundColor: main.primary,
          color: "#fff",
          borderRadius: radiusTokens.sm ?? 8,
          px: 2.4,
          py: 1.1,
          fontSize: 13,
          fontWeight: 700,
          fontFamily: "Poppins",
          cursor: "pointer",
          textAlign: "center",
          width: { xs: "100%", sm: "auto" },
        }}
      >
        Save changes
      </Box>
    </Stack>
  );
}

function GeneralSection({ fg, border }) {
  const [platform, setPlatform] = useState("TETYHUB");
  const [supportEmail, setSupportEmail] = useState("support@tetyhub.com");
  const [currency, setCurrency] = useState("NGN (₦)");
  const [timezone, setTimezone] = useState("Africa/Lagos (WAT)");
  const { main } = useColor();

  return (
    <SectionCard>
      <SectionTitle
        title="General"
        subtitle="Basic details about your marketplace."
        fg={fg}
      />
      <Stack gap={1.8} sx={{ mt: 2 }}>
        <SettingsField
          label="Platform name"
          value={platform}
          onChange={setPlatform}
          border={border}
          fg={fg}
        />
        <SettingsField
          label="Support email"
          hint="Buyers and sellers reach you here."
          value={supportEmail}
          onChange={setSupportEmail}
          border={border}
          fg={fg}
        />
        <Stack
          direction={{ xs: "column", sm: "row" }}
          gap={1.4}
          sx={{ minWidth: 0 }}
        >
          <Box sx={{ flex: 1 }}>
            <SettingsField
              label="Default currency"
              value={currency}
              onChange={setCurrency}
              border={border}
              fg={fg}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <SettingsField
              label="Timezone"
              value={timezone}
              onChange={setTimezone}
              border={border}
              fg={fg}
            />
          </Box>
        </Stack>
      </Stack>
      <SaveBar main={main} />
    </SectionCard>
  );
}

function FeesSection({ fg, border }) {
  const [fee, setFee] = useState("1.5");
  const [minPayout, setMinPayout] = useState("5000");
  const [schedule, setSchedule] = useState("Weekly, every Friday");
  const { main } = useColor();

  return (
    <SectionCard>
      <SectionTitle
        title="Fees & payouts"
        subtitle="What TETYHUB charges and when sellers get paid."
        fg={fg}
      />
      <Stack gap={1.8} sx={{ mt: 2 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          gap={1.4}
          sx={{ minWidth: 0 }}
        >
          <Box sx={{ flex: 1 }}>
            <SettingsField
              label="Service fee (%)"
              hint="Charged on top of every order subtotal."
              value={fee}
              onChange={setFee}
              border={border}
              fg={fg}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <SettingsField
              label="Minimum payout (₦)"
              value={minPayout}
              onChange={setMinPayout}
              border={border}
              fg={fg}
            />
          </Box>
        </Stack>
        <SettingsField
          label="Payout schedule"
          value={schedule}
          onChange={setSchedule}
          border={border}
          fg={fg}
        />
      </Stack>
      <SaveBar main={main} />
    </SectionCard>
  );
}

function CategoriesSection({ fg, border, main }) {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [input, setInput] = useState("");

  const addCategory = () => {
    const v = input.trim();
    if (!v || categories.includes(v)) return;
    setCategories([...categories, v]);
    setInput("");
  };

  const removeCategory = (c) =>
    setCategories(categories.filter((x) => x !== c));

  return (
    <SectionCard>
      <SectionTitle
        title="Categories"
        subtitle="Shown to sellers when they list, and used for browsing filters."
        fg={fg}
      />
      <Stack direction="row" gap={1} sx={{ mt: 2, mb: 1.8, minWidth: 0 }}>
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            border: `1px solid ${border.primary}`,
            borderRadius: radiusTokens.sm ?? 8,
            px: 1.4,
            py: 1,
          }}
        >
          <InputBase
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addCategory()}
            placeholder="Add a category, e.g. Event planning"
            sx={{
              fontSize: 16,
              width: "100%",
              color: fg.primary,
              "& input": { fontSize: 16 },
            }}
          />
        </Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          onClick={addCategory}
          sx={{
            backgroundColor: main.primary,
            color: "#fff",
            borderRadius: radiusTokens.sm ?? 8,
            px: 1.6,
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <Add24Regular style={{ fontSize: 18 }} />
        </Stack>
      </Stack>

      <Stack direction="row" flexWrap="wrap" gap={0.9}>
        {categories.map((c) => (
          <Stack
            key={c}
            direction="row"
            alignItems="center"
            gap={0.6}
            sx={{
              border: `1px solid ${border.primary}`,
              borderRadius: 999,
              pl: 1.4,
              pr: 1,
              py: 0.7,
            }}
          >
            <Typography sx={{ fontSize: 12.5, color: fg.primary }}>
              {c}
            </Typography>
            <Box
              onClick={() => removeCategory(c)}
              sx={{
                display: "flex",
                cursor: "pointer",
                color: fg.tertiary,
                "&:hover": { color: "#F85149" },
              }}
            >
              <Dismiss24Regular style={{ fontSize: 13 }} />
            </Box>
          </Stack>
        ))}
      </Stack>
    </SectionCard>
  );
}

function TeamSection({ fg, border, main }) {
  return (
    <SectionCard noPadding>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap={1}
        sx={{ p: { xs: 1.75, sm: 2.4 }, flexWrap: "wrap" }}
      >
        <SectionTitle
          title="Team & roles"
          subtitle="Who has access to this admin dashboard."
          fg={fg}
          noMargin
        />
        <Box
          sx={{
            backgroundColor: main.primary,
            color: "#fff",
            borderRadius: radiusTokens.sm ?? 8,
            px: 1.8,
            py: 1,
            fontSize: 12.5,
            fontWeight: 700,
            fontFamily: "Poppins",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          Invite admin
        </Box>
      </Stack>
      <Stack>
        {TEAM.map((t) => (
          <Stack
            key={t.email}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={1.4}
            sx={{
              px: { xs: 1.75, sm: 2.4 },
              py: 1.4,
              borderTop: `1px solid ${border.primary}`,
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              gap={1.2}
              sx={{ minWidth: 0 }}
            >
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  backgroundColor: `${main.primary}18`,
                  color: main.primary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {t.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Box>
              <Stack sx={{ minWidth: 0 }}>
                <Typography
                  sx={{ fontSize: 13, fontWeight: 700, color: fg.primary }}
                  noWrap
                >
                  {t.name}
                </Typography>
                <Typography sx={{ fontSize: 11.5, color: fg.tertiary }} noWrap>
                  {t.email}
                </Typography>
              </Stack>
            </Stack>
            <Box
              sx={{
                fontSize: 11.5,
                fontWeight: 700,
                color: fg.secondary,
                border: `1px solid ${border.primary}`,
                borderRadius: 999,
                px: 1.2,
                py: 0.5,
                flexShrink: 0,
                whiteSpace: "nowrap",
              }}
            >
              {t.role}
            </Box>
          </Stack>
        ))}
      </Stack>
    </SectionCard>
  );
}

function NotificationsSection({ fg, border, main }) {
  const [prefs, setPrefs] = useState({
    newSeller: true,
    flaggedListing: true,
    disputes: true,
    payouts: false,
    weeklyDigest: true,
  });

  const toggle = (key) => setPrefs((p) => ({ ...p, [key]: !p[key] }));

  const rows = [
    {
      key: "newSeller",
      label: "New seller applications",
      hint: "Get notified the moment someone applies to sell.",
    },
    {
      key: "flaggedListing",
      label: "Flagged listings",
      hint: "Alert when a listing is auto-flagged for review.",
    },
    {
      key: "disputes",
      label: "Order disputes",
      hint: "Immediate alert when a buyer opens a dispute.",
    },
    {
      key: "payouts",
      label: "Payout completions",
      hint: "Confirmation once a payout batch finishes.",
    },
    {
      key: "weeklyDigest",
      label: "Weekly summary email",
      hint: "A recap of revenue, orders, and approvals.",
    },
  ];

  return (
    <SectionCard noPadding>
      <Box sx={{ p: { xs: 1.75, sm: 2.4 } }}>
        <SectionTitle
          title="Notifications"
          subtitle="What this admin account gets alerted about."
          fg={fg}
          noMargin
        />
      </Box>
      <Stack>
        {rows.map((r) => (
          <Stack
            key={r.key}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={1.4}
            sx={{
              px: { xs: 1.75, sm: 2.4 },
              py: 1.4,
              borderTop: `1px solid ${border.primary}`,
            }}
          >
            <Stack sx={{ minWidth: 0 }}>
              <Typography
                sx={{ fontSize: 13, fontWeight: 700, color: fg.primary }}
              >
                {r.label}
              </Typography>
              <Typography sx={{ fontSize: 11.5, color: fg.tertiary, mt: 0.2 }}>
                {r.hint}
              </Typography>
            </Stack>
            <Switch
              checked={prefs[r.key]}
              onChange={() => toggle(r.key)}
              sx={{
                flexShrink: 0,
                "& .MuiSwitch-switchBase.Mui-checked": { color: main.primary },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: main.primary,
                },
              }}
            />
          </Stack>
        ))}
      </Stack>
    </SectionCard>
  );
}

function SectionTitle({ title, subtitle, fg, noMargin }) {
  return (
    <Stack gap={0.3} sx={{ mb: noMargin ? 0 : 0 }}>
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontWeight: 800,
          fontSize: 15,
          color: fg.primary,
        }}
      >
        {title}
      </Typography>
      <Typography sx={{ fontSize: 12, color: fg.tertiary }}>
        {subtitle}
      </Typography>
    </Stack>
  );
}
