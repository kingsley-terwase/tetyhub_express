// @ts-nocheck
import { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import {
  Eye24Regular,
  EyeOff24Regular,
  ShoppingBag24Filled,
  StoreMicrosoft24Filled,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radiusTokens } from "@/lib/theme";
import { useReveal } from "../../HomePage/Hooks";
import AuthLeftPanel from "../AuthLeftPanel";
import { useNavigate } from "react-router-dom";

const FONT = "Poppins";

const ROLES = [
  {
    id: "buyer",
    label: "I'm a Buyer",
    desc: "Browse and shop from verified sellers",
    icon: ShoppingBag24Filled,
    color: "#3b82f6",
  },
  {
    id: "seller",
    label: "I'm a Seller",
    desc: "List products and grow your store",
    icon: StoreMicrosoft24Filled,
    color: "#ec4899",
  },
];

/** Official Google "G" mark — used instead of a plain letter to match the reference. */
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"
      />
    </svg>
  );
}

/** Compact segmented pill — sliding color highlight instead of two bulky cards. */
function RoleTabs({ role, setRole }) {
  const { bg, fg, border } = useColor();
  const activeIndex = ROLES.findIndex((r) => r.id === role);
  const activeColor = ROLES[activeIndex].color;

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        borderRadius: radiusTokens.full,
        border: `1px solid ${border.primary}`,
        backgroundColor: bg.secondary,
        p: 0.5,
        mb: 1.2,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 4,
          bottom: 4,
          left: activeIndex === 0 ? 4 : "50%",
          width: "calc(50% - 4px)",
          borderRadius: radiusTokens.full,
          backgroundColor: activeColor,
          transition: "left 0.3s ease, background-color 0.3s ease",
        }}
      />
      {ROLES.map((r) => {
        const Icon = r.icon;
        const isActive = r.id === role;
        return (
          <Stack
            key={r.id}
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap={0.7}
            onClick={() => setRole(r.id)}
            sx={{
              position: "relative",
              zIndex: 1,
              flex: 1,
              py: 1,
              cursor: "pointer",
              transition: "color 0.3s ease",
            }}
          >
            <Icon
              style={{ fontSize: 16, color: isActive ? "#fff" : fg.secondary }}
            />
            <Typography
              sx={{
                fontFamily: FONT,
                fontSize: 13,
                fontWeight: 700,
                color: isActive ? "#fff" : fg.secondary,
              }}
            >
              {r.label}
            </Typography>
          </Stack>
        );
      })}
    </Box>
  );
}

export default function RegisterPage() {
  const { bg, fg, border, main } = useColor();
  const [role, setRole] = useState("buyer");
  const [showPassword, setShowPassword] = useState(false);
  const form = useReveal();
  const activeRole = ROLES.find((r) => r.id === role);
  const navigate = useNavigate();
  const handleSignIn = () => {
    navigate("/login");
  };

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      fontFamily: FONT,
      borderRadius: radiusTokens.md,
      color: fg.primary,
      "& fieldset": { borderColor: border.primary },
      "&:hover fieldset": { borderColor: main.primary },
      "&.Mui-focused fieldset": { borderColor: main.primary },
    },
  };

  return (
    <Stack direction="row" sx={{ backgroundColor: bg.primary }}>
      <AuthLeftPanel />

      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ flex: 1, px: { xs: 3, md: 6 }, py: 4 }}
      >
        <Box
          ref={form.ref}
          className={form.className}
          sx={{ width: "100%", maxWidth: 420 }}
        >
          <Typography
            sx={{
              fontFamily: FONT,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: main.primary,
              textAlign: "center",
              mb: 1,
            }}
          >
            JOIN US
          </Typography>
          <Typography
            sx={{
              fontFamily: FONT,
              fontSize: { xs: 24, md: 28 },
              fontWeight: 800,
              color: fg.primary,
              textAlign: "center",
              mb: 3,
            }}
          >
            Create Your{" "}
            <Box component="span" sx={{ color: main.primary }}>
              Account
            </Box>
          </Typography>

          <Typography
            sx={{
              fontFamily: FONT,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.06em",
              color: fg.secondary,
              mb: 1,
            }}
          >
            I WANT TO
          </Typography>

          <RoleTabs role={role} setRole={setRole} />
          <Typography
            sx={{
              fontFamily: FONT,
              fontSize: 12,
              color: fg.tertiary,
              textAlign: "center",
              mb: 3,
            }}
          >
            {activeRole.desc}
          </Typography>

          <Button
            fullWidth
            variant="outlined"
            sx={{
              borderColor: border.primary,
              color: fg.primary,
              textTransform: "none",
              fontFamily: FONT,
              fontWeight: 600,
              borderRadius: radiusTokens.md,
              py: 1.1,
              mb: 2.5,
              gap: 1,
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 8px 18px -10px rgba(0,0,0,0.25)",
              },
            }}
            startIcon={<GoogleIcon />}
          >
            Continue with Google
          </Button>

          <Stack direction="row" alignItems="center" gap={1.5} sx={{ mb: 2.5 }}>
            <Box
              sx={{ flex: 1, height: "1px", backgroundColor: border.primary }}
            />
            <Typography
              sx={{ fontFamily: FONT, fontSize: 11, color: fg.tertiary }}
            >
              OR
            </Typography>
            <Box
              sx={{ flex: 1, height: "1px", backgroundColor: border.primary }}
            />
          </Stack>

          <Stack gap={2}>
            <Box>
              <Typography
                sx={{
                  fontFamily: FONT,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  color: fg.secondary,
                  mb: 0.6,
                }}
              >
                FULL NAME
              </Typography>
              <TextField fullWidth placeholder="Your name" sx={inputSx} />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontFamily: FONT,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  color: fg.secondary,
                  mb: 0.6,
                }}
              >
                EMAIL
              </Typography>
              <TextField fullWidth placeholder="you@example.com" sx={inputSx} />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontFamily: FONT,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  color: fg.secondary,
                  mb: 0.6,
                }}
              >
                PASSWORD
              </Typography>
              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                placeholder="At least 8 characters"
                sx={inputSx}
                InputProps={{
                  endAdornment: (
                    <Box
                      onClick={() => setShowPassword((s) => !s)}
                      sx={{
                        cursor: "pointer",
                        display: "flex",
                        color: fg.tertiary,
                      }}
                    >
                      {showPassword ? (
                        <EyeOff24Regular style={{ fontSize: 18 }} />
                      ) : (
                        <Eye24Regular style={{ fontSize: 18 }} />
                      )}
                    </Box>
                  ),
                }}
              />
            </Box>

            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  sx={{
                    color: border.primary,
                    "&.Mui-checked": { color: main.primary },
                  }}
                />
              }
              label={
                <Typography
                  sx={{ fontFamily: FONT, fontSize: 12.5, color: fg.secondary }}
                >
                  I agree to the Terms of Service and Privacy Policy
                </Typography>
              }
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{
                position: "relative",
                overflow: "hidden",
                backgroundColor: main.primary,
                borderRadius: radiusTokens.md,
                textTransform: "none",
                fontFamily: FONT,
                fontWeight: 700,
                letterSpacing: "0.04em",
                py: 1.3,
                mt: 0.5,
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: `0 12px 24px -10px ${main.primary}88`,
                },
                "&:hover::after": { left: "130%" },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "-60%",
                  width: "40%",
                  height: "100%",
                  background:
                    "linear-gradient(120deg, transparent, rgba(255,255,255,0.35), transparent)",
                  transform: "skewX(-20deg)",
                  transition: "left 0.6s ease",
                },
              }}
            >
              CREATE ACCOUNT →
            </Button>
          </Stack>

          <Typography
            sx={{
              fontFamily: FONT,
              fontSize: 13,
              color: fg.secondary,
              textAlign: "center",
              mt: 3,
            }}
          >
            Already have an account?{" "}
            <Box
              onClick={handleSignIn}
              component="span"
              sx={{ color: main.primary, fontWeight: 700, cursor: "pointer" }}
            >
              Sign in
            </Box>
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
}
