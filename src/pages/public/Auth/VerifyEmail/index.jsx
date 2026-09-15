// @ts-nocheck
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Box, Stack, Typography, TextField, Button, InputAdornment } from "@mui/material";
import {
    CheckmarkCircle24Filled,
    ErrorCircle24Filled,
    Mail24Regular,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { radiusTokens } from "@/lib/theme";
import { useReveal } from "../../HomePage/Hooks";
import AuthLeftPanel from "../AuthLeftPanel";
import { useVerifyEmail, useResendVerification } from "@/Hooks/auth";
import AppLoader from "@/Utils/AppLoader";

const FONT = "Poppins";

export default function VerifyEmailPage() {
    const { fg, border, main } = useColor();
    const form = useReveal();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const { verifyEmail, loading: verifying } = useVerifyEmail();
    const { resendVerification, loading: resending } = useResendVerification();

    // "checking" | "success" | "error" | "idle" (no link params — direct visit)
    const [status, setStatus] = useState("checking");
    const [email, setEmail] = useState(searchParams.get("email") || "");
    const [resent, setResent] = useState(false);

    useEffect(() => {
        const urlEmail = searchParams.get("email");
        const urlToken = searchParams.get("token");

        if (!urlEmail || !urlToken) {
            setStatus("idle");
            return;
        }

        (async () => {
            const result = await verifyEmail({ email: urlEmail, token: urlToken });
            setStatus(result.success ? "success" : "error");
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleResend = async (e) => {
        e.preventDefault();
        if (!email) return;
        const result = await resendVerification(email);
        if (result.success) setResent(true);
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
        <Stack direction="row" sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
            <AuthLeftPanel />

            <Stack alignItems="center" justifyContent="center" sx={{ flex: 1, px: { xs: 3, md: 6 }, py: 6 }}>
                <Box ref={form.ref} className={form.className} sx={{ width: "100%", maxWidth: 400 }}>
                    <AppLoader show={verifying} tagline="Verifying your email..." />

                    {/* SUCCESS */}
                    {status === "success" && (
                        <Stack alignItems="center" gap={1.6} sx={{ textAlign: "center" }}>
                            <CheckmarkCircle24Filled style={{ fontSize: 48, color: "#22C55E" }} />
                            <Typography sx={{ fontFamily: FONT, fontSize: 22, fontWeight: 800, color: fg.primary }}>
                                Email verified
                            </Typography>
                            <Typography sx={{ fontFamily: FONT, fontSize: 13.5, color: fg.secondary, maxWidth: 320 }}>
                                Your account is ready. You can sign in now.
                            </Typography>
                            <Button
                                onClick={() => navigate("/login")}
                                variant="contained"
                                fullWidth
                                sx={{
                                    mt: 1,
                                    backgroundColor: main.primary,
                                    textTransform: "none",
                                    fontFamily: FONT,
                                    fontWeight: 700,
                                    borderRadius: radiusTokens.md,
                                    py: 1.2,
                                }}
                            >
                                Go to sign in
                            </Button>
                        </Stack>
                    )}

                    {/* ERROR — link invalid/expired, or IDLE — arrived with no link at all */}
                    {(status === "error" || status === "idle") && (
                        <Stack gap={2}>
                            <Stack alignItems="center" gap={1.2} sx={{ textAlign: "center", mb: 1 }}>
                                {status === "error" && (
                                    <ErrorCircle24Filled style={{ fontSize: 44, color: "#EF4444" }} />
                                )}
                                <Typography sx={{ fontFamily: FONT, fontSize: 20, fontWeight: 800, color: fg.primary }}>
                                    {status === "error" ? "That link didn't work" : "Verify your email"}
                                </Typography>
                                <Typography sx={{ fontFamily: FONT, fontSize: 13.5, color: fg.secondary, maxWidth: 340 }}>
                                    {status === "error"
                                        ? "It may have expired or already been used. Enter your email below and we'll send a new one."
                                        : "Enter the email you signed up with and we'll send you a verification link."}
                                </Typography>
                            </Stack>

                            {resent ? (
                                <Stack alignItems="center" gap={1} sx={{ textAlign: "center", py: 1 }}>
                                    <CheckmarkCircle24Filled style={{ fontSize: 32, color: main.primary }} />
                                    <Typography sx={{ fontFamily: FONT, fontSize: 13.5, color: fg.primary, fontWeight: 700 }}>
                                        Check your inbox
                                    </Typography>
                                    <Typography sx={{ fontFamily: FONT, fontSize: 12.5, color: fg.secondary }}>
                                        We've sent a new link to <strong>{email}</strong>.
                                    </Typography>
                                </Stack>
                            ) : (
                                <Box component="form" onSubmit={handleResend}>
                                    <Stack gap={1.4}>
                                        <TextField
                                            fullWidth
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@example.com"
                                            sx={inputSx}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Mail24Regular style={{ fontSize: 17, color: fg.tertiary }} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            fullWidth
                                            disabled={resending || !email}
                                            sx={{
                                                backgroundColor: main.primary,
                                                textTransform: "none",
                                                fontFamily: FONT,
                                                fontWeight: 700,
                                                borderRadius: radiusTokens.md,
                                                py: 1.2,
                                            }}
                                        >
                                            {resending ? "Sending..." : "Resend verification email"}
                                        </Button>
                                    </Stack>
                                </Box>
                            )}

                            <Typography
                                onClick={() => navigate("/login")}
                                sx={{
                                    fontFamily: FONT,
                                    fontSize: 13,
                                    color: fg.secondary,
                                    textAlign: "center",
                                    cursor: "pointer",
                                    mt: 1,
                                }}
                            >
                                Back to <Box component="span" sx={{ color: main.primary, fontWeight: 700 }}>sign in</Box>
                            </Typography>
                        </Stack>
                    )}
                </Box>
            </Stack>
        </Stack>
    );
}