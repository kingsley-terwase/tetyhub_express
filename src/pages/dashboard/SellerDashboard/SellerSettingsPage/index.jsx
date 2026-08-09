// @ts-nocheck
import { useState } from "react";
import { Box, Stack, Typography, InputBase, Switch } from "@mui/material";
import {
  StoreMicrosoft24Regular,
  BuildingBank24Regular,
  Alert24Regular,
  Camera24Regular,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { radiusTokens } from "@/lib/theme";
import { PageHeader, SectionCard, PrimaryButton, Avatar } from "../SellerUi";

const NAV = [
  { key: "profile", label: "Store profile", icon: StoreMicrosoft24Regular },
  { key: "payout", label: "Payout details", icon: BuildingBank24Regular },
  { key: "notifications", label: "Notifications", icon: Alert24Regular },
];

export default function SellerSettingsPage() {
  const { fg, bg, border, main } = useColor();
  const [section, setSection] = useState("profile");

  return (
    <Box>
      <PageHeader
        title="Settings"
        subtitle="Your store profile, payout account, and alerts."
        fg={fg}
      />

      <Box
        sx={{
          mb: { xs: 2.4, md: 3 },
          overflowX: "auto",
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
                  transition: "background-color 0.18s ease",
                  "&:hover": !active
                    ? { backgroundColor: `${fg.secondary}14` }
                    : undefined,
                }}
              >
                <Icon
                  style={{
                    fontSize: 15,
                    color: active ? "#fff" : fg.secondary,
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

      {section === "profile" && (
        <ProfileSection fg={fg} bg={bg} border={border} main={main} />
      )}
      {section === "payout" && (
        <PayoutSection fg={fg} border={border} main={main} />
      )}
      {section === "notifications" && (
        <NotificationsSection fg={fg} border={border} main={main} />
      )}
    </Box>
  );
}

function Field({ label, hint, value, onChange, placeholder, border, fg }) {
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
      <Box sx={{ width: { xs: "100%", sm: "auto" } }}>
        <PrimaryButton main={main}>Save changes</PrimaryButton>
      </Box>
    </Stack>
  );
}

function ProfileSection({ fg, bg, border, main }) {
  const [store, setStore] = useState("SparkleCo");
  const [tagline, setTagline] = useState("Deep home cleaning done right.");
  const [category, setCategory] = useState("Home services");
  const [phone, setPhone] = useState("080X XXX XXXX");

  return (
    <SectionCard border={border}>
      <Stack direction="row" alignItems="center" gap={1.6} sx={{ mb: 2.4 }}>
        <Box sx={{ position: "relative" }}>
          <Avatar name={store} size={64} />
          <Box
            sx={{
              position: "absolute",
              bottom: -2,
              right: -2,
              width: 24,
              height: 24,
              borderRadius: "50%",
              backgroundColor: main.primary,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `2px solid ${bg.primary}`,
              cursor: "pointer",
            }}
          >
            <Camera24Regular style={{ fontSize: 12 }} />
          </Box>
        </Box>
        <Stack gap={0.2}>
          <Typography
            sx={{ fontSize: 14.5, fontWeight: 800, color: fg.primary }}
          >
            {store}
          </Typography>
          <Typography sx={{ fontSize: 12, color: fg.tertiary }}>
            Store logo shown on your listings
          </Typography>
        </Stack>
      </Stack>

      <Stack gap={1.8}>
        <Field
          label="Store name"
          value={store}
          onChange={setStore}
          border={border}
          fg={fg}
        />
        <Field
          label="Tagline"
          hint="Shown under your store name to buyers."
          value={tagline}
          onChange={setTagline}
          border={border}
          fg={fg}
        />
        <Stack
          direction={{ xs: "column", sm: "row" }}
          gap={1.4}
          sx={{ minWidth: 0 }}
        >
          <Stack sx={{ flex: 1, minWidth: 0 }}>
            <Field
              label="Primary category"
              value={category}
              onChange={setCategory}
              border={border}
              fg={fg}
            />
          </Stack>
          <Stack sx={{ flex: 1, minWidth: 0 }}>
            <Field
              label="Contact phone"
              value={phone}
              onChange={setPhone}
              border={border}
              fg={fg}
            />
          </Stack>
        </Stack>
      </Stack>
      <SaveBar main={main} />
    </SectionCard>
  );
}

function PayoutSection({ fg, border, main }) {
  const [bank, setBank] = useState("GTBank");
  const [account, setAccount] = useState("0123456789");
  const [accountName, setAccountName] = useState("SparkleCo Services Ltd");

  return (
    <SectionCard border={border}>
      <Typography sx={{ fontSize: 12.5, color: fg.tertiary, mb: 1.8 }}>
        Earnings are sent here when you request a withdrawal.
      </Typography>
      <Stack gap={1.8}>
        <Field
          label="Bank name"
          value={bank}
          onChange={setBank}
          border={border}
          fg={fg}
        />
        <Stack
          direction={{ xs: "column", sm: "row" }}
          gap={1.4}
          sx={{ minWidth: 0 }}
        >
          <Stack sx={{ flex: 1, minWidth: 0 }}>
            <Field
              label="Account number"
              value={account}
              onChange={setAccount}
              border={border}
              fg={fg}
            />
          </Stack>
          <Stack sx={{ flex: 1, minWidth: 0 }}>
            <Field
              label="Account name"
              value={accountName}
              onChange={setAccountName}
              border={border}
              fg={fg}
            />
          </Stack>
        </Stack>
      </Stack>
      <SaveBar main={main} />
    </SectionCard>
  );
}

function NotificationsSection({ fg, border, main }) {
  const [prefs, setPrefs] = useState({
    newOrder: true,
    message: true,
    review: true,
    payout: true,
    promo: false,
  });
  const toggle = (k) => setPrefs((p) => ({ ...p, [k]: !p[k] }));

  const rows = [
    {
      key: "newOrder",
      label: "New orders",
      hint: "Get notified the moment a buyer places an order.",
    },
    {
      key: "message",
      label: "New messages",
      hint: "Alert when a buyer sends you a message.",
    },
    {
      key: "review",
      label: "New reviews",
      hint: "Get notified when a buyer leaves a review.",
    },
    {
      key: "payout",
      label: "Payout completed",
      hint: "Confirmation once a withdrawal lands in your account.",
    },
    {
      key: "promo",
      label: "TETYHUB tips & promos",
      hint: "Occasional tips on growing your store.",
    },
  ];

  return (
    <SectionCard noPadding border={border}>
      <Stack>
        {rows.map((r, i) => (
          <Stack
            key={r.key}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={1.4}
            sx={{
              px: { xs: 1.75, sm: 2.4 },
              py: 1.4,
              borderTop: i === 0 ? "none" : `1px solid ${border.primary}`,
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
