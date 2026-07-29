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
  InputAdornment,
} from "@mui/material";
import {
  Eye24Regular,
  EyeOff24Regular,
  LockClosed24Regular,
  ShieldCheckmark24Regular,
  Flash24Regular,
  Mail24Regular,
  Sparkle24Filled,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radiusTokens } from "@/lib/theme";
import { useReveal } from "../../HomePage/Hooks";
import AuthLeftPanel from "../AuthLeftPanel";
import GoogleIcon from "../GoogleIcon";
import { useNavigate } from "react-router-dom";

const FONT = "Poppins";

export default function LoginPage() {
  const { bg, fg, border, main } = useColor();
  const [showPassword, setShowPassword] = useState(false);
  const form = useReveal();

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
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <Stack
      direction="row"
      sx={{ minHeight: "100vh", backgroundColor: bg.primary }}
    >
      <AuthLeftPanel />

      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ flex: 1, px: { xs: 3, md: 6 }, py: 6 }}
      >
        <Box
          ref={form.ref}
          className={form.className}
          sx={{ width: "100%", maxWidth: 400 }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap={0.6}
            sx={{ mb: 1 }}
          >
            <Sparkle24Filled style={{ fontSize: 14, color: main.primary }} />
            <Typography
              sx={{
                fontFamily: FONT,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: main.primary,
              }}
            >
              WELCOME BACK
            </Typography>
          </Stack>
          <Typography
            sx={{
              fontFamily: FONT,
              fontSize: { xs: 26, md: 30 },
              fontWeight: 700,
              color: fg.primary,
              textAlign: "center",
              mb: 4,
            }}
          >
            Sign Into Your{" "}
            <Box component="span" sx={{ color: main.primary }}>
              Account
            </Box>
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
              py: 1.2,
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
                EMAIL
              </Typography>
              <TextField
                fullWidth
                placeholder="you@example.com"
                sx={inputSx}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail24Regular
                        style={{ fontSize: 17, color: fg.tertiary }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
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
                placeholder="••••••••"
                sx={inputSx}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockClosed24Regular
                        style={{ fontSize: 17, color: fg.tertiary }}
                      />
                    </InputAdornment>
                  ),
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

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
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
                    sx={{ fontFamily: FONT, fontSize: 13, color: fg.secondary }}
                  >
                    Remember me
                  </Typography>
                }
              />
              <Typography
                sx={{
                  fontFamily: FONT,
                  fontSize: 13,
                  fontWeight: 600,
                  color: main.primary,
                  cursor: "pointer",
                }}
              >
                Forgot password?
              </Typography>
            </Stack>

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
                mt: 1,
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
              SIGN IN →
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
            No account yet?{" "}
            <Box
              onClick={handleRegister}
              component="span"
              sx={{ color: main.primary, fontWeight: 700, cursor: "pointer" }}
            >
              Create an account
            </Box>
          </Typography>

          <Stack
            direction="row"
            justifyContent="center"
            gap={2.5}
            sx={{ mt: 4, opacity: 0.7 }}
          >
            <Stack direction="row" alignItems="center" gap={0.4}>
              <LockClosed24Regular
                style={{ fontSize: 13, color: fg.tertiary }}
              />
              <Typography
                sx={{ fontFamily: FONT, fontSize: 11, color: fg.tertiary }}
              >
                Secure Login
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" gap={0.4}>
              <ShieldCheckmark24Regular
                style={{ fontSize: 13, color: fg.tertiary }}
              />
              <Typography
                sx={{ fontFamily: FONT, fontSize: 11, color: fg.tertiary }}
              >
                SOC 2 Compliant
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" gap={0.4}>
              <Flash24Regular style={{ fontSize: 13, color: fg.tertiary }} />
              <Typography
                sx={{ fontFamily: FONT, fontSize: 11, color: fg.tertiary }}
              >
                99.9% Uptime
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
}
