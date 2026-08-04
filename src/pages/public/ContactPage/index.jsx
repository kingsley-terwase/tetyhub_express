// @ts-nocheck
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Box, Stack, Typography, TextField, Button } from "@mui/material";
import {
  Mail24Filled,
  Call24Filled,
  Location24Filled,
  Clock24Filled,
  Send24Filled,
  CheckmarkCircle24Filled,
  CheckmarkCircleFilled,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radiusTokens } from "@/lib/theme";

const CONTACT_INFO = [
  {
    icon: Mail24Filled,
    color: "#3b82f6",
    label: "Email us",
    value: "support@tetyhub.com",
  },
  {
    icon: Call24Filled,
    color: "#10b981",
    label: "Call us",
    value: "+234 800 123 4567",
  },
  {
    icon: Location24Filled,
    color: "#ec4899",
    label: "Visit us",
    value: "Lagos, Nigeria",
  },
  {
    icon: Clock24Filled,
    color: "#f59e0b",
    label: "Support hours",
    value: "Mon–Sat, 8am–8pm WAT",
  },
];

export default function ContactPage() {
  const { bg, fg, border, main } = useColor();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 700, once: true, easing: "ease-out-cubic" });
  }, []);

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = () => {
    // TODO: wire to a real contact/support API once one exists
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      fontFamily: "Poppins",
      borderRadius: radiusTokens.md,
      color: fg.primary,
      "& fieldset": { borderColor: border.primary },
      "&:hover fieldset": { borderColor: main.primary },
      "&.Mui-focused fieldset": { borderColor: main.primary },
    },
  };

  return (
    <Box sx={{ backgroundColor: bg.primary }}>
      <Box
        sx={{
          px: { xs: spacingTokens.md, md: spacingTokens.xl },
          pt: { xs: 8, md: 10 },
          pb: 4,
          textAlign: "center",
        }}
      >
        <Stack
          data-aos="fade-up"
          alignItems="center"
          gap={1.5}
          sx={{ maxWidth: 560, mx: "auto" }}
        >
          <Box
            sx={{
              px: 1.5,
              py: 0.5,
              borderRadius: radiusTokens.full ?? 999,
              border: `1px solid ${main.primary}55`,
              backgroundColor: `${main.primary}0d`,
            }}
          >
            <Typography
              sx={{
                fontFamily: "Syne",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: main.primary,
              }}
            >
              GET IN TOUCH
            </Typography>
          </Box>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: { xs: 28, md: 40 },
              fontWeight: 800,
              color: fg.primary,
              lineHeight: 1.15,
            }}
          >
            We're here to help
          </Typography>
          <Typography
            sx={{ fontFamily: "Poppins", fontSize: 15, color: fg.secondary }}
          >
            Questions, feedback, or just want to say hi — send us a message and
            a real person will get back to you.
          </Typography>
        </Stack>
      </Box>

      <Box sx={{ px: { xs: spacingTokens.md, md: spacingTokens.xl }, pb: 10 }}>
        <Stack direction={{ xs: "column", md: "row" }} gap={4}>
          {/* form */}
          <Box
            data-aos="fade-right"
            sx={{
              flex: "1.3 1 400px",
              borderRadius: radiusTokens.lg,
              border: `1px solid ${border.primary}`,
              backgroundColor: bg.secondary,
              p: { xs: 3, md: 4 },
            }}
          >
            {submitted ? (
              <Stack
                alignItems="center"
                textAlign="center"
                gap={1.5}
                sx={{ py: 6 }}
              >
                <CheckmarkCircleFilled
                  style={{ fontSize: 44, color: "#16a34a" }}
                />
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: 18,
                    fontWeight: 700,
                    color: fg.primary,
                  }}
                >
                  Message sent
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: 13.5,
                    color: fg.secondary,
                  }}
                >
                  We'll get back to you within 24 hours.
                </Typography>
                <Button
                  onClick={() => setSubmitted(false)}
                  sx={{
                    mt: 1,
                    textTransform: "none",
                    fontFamily: "Poppins",
                    fontWeight: 700,
                    color: main.primary,
                  }}
                >
                  Send another message
                </Button>
              </Stack>
            ) : (
              <Stack gap={2.5}>
                <Stack direction={{ xs: "column", sm: "row" }} gap={2}>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontSize: 12,
                        fontWeight: 700,
                        color: fg.secondary,
                        mb: 0.6,
                      }}
                    >
                      NAME
                    </Typography>
                    <TextField
                      fullWidth
                      value={form.name}
                      onChange={update("name")}
                      placeholder="Your name"
                      sx={inputSx}
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontSize: 12,
                        fontWeight: 700,
                        color: fg.secondary,
                        mb: 0.6,
                      }}
                    >
                      EMAIL
                    </Typography>
                    <TextField
                      fullWidth
                      value={form.email}
                      onChange={update("email")}
                      placeholder="you@example.com"
                      sx={inputSx}
                    />
                  </Box>
                </Stack>

                <Box>
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontSize: 12,
                      fontWeight: 700,
                      color: fg.secondary,
                      mb: 0.6,
                    }}
                  >
                    SUBJECT
                  </Typography>
                  <TextField
                    fullWidth
                    value={form.subject}
                    onChange={update("subject")}
                    placeholder="What's this about?"
                    sx={inputSx}
                  />
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontSize: 12,
                      fontWeight: 700,
                      color: fg.secondary,
                      mb: 0.6,
                    }}
                  >
                    MESSAGE
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    minRows={5}
                    value={form.message}
                    onChange={update("message")}
                    placeholder="Tell us more..."
                    sx={inputSx}
                  />
                </Box>

                <Button
                  onClick={handleSubmit}
                  disabled={!form.name || !form.email || !form.message}
                  endIcon={<Send24Filled style={{ fontSize: 16 }} />}
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    textTransform: "none",
                    fontFamily: "Poppins",
                    fontWeight: 700,
                    borderRadius: radiusTokens.md,
                    backgroundColor: main.primary,
                    color: "#fff",
                    py: 1.2,
                    "&:hover": { backgroundColor: main.primary, opacity: 0.9 },
                    "&.Mui-disabled": {
                      backgroundColor: border.primary,
                      color: fg.tertiary,
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
                  Send Message
                </Button>
              </Stack>
            )}
          </Box>

          {/* contact info */}
          <Stack data-aos="fade-left" gap={2} sx={{ flex: "1 1 260px" }}>
            {CONTACT_INFO.map((c) => {
              const Icon = c.icon;
              return (
                <Stack
                  key={c.label}
                  direction="row"
                  alignItems="center"
                  gap={1.5}
                  sx={{
                    p: 2.2,
                    borderRadius: radiusTokens.md,
                    border: `1px solid ${border.primary}`,
                    backgroundColor: bg.secondary,
                    transition: "transform 0.2s ease",
                    "&:hover": { transform: "translateY(-3px)" },
                  }}
                >
                  <Box
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: `${c.color}1a`,
                      flexShrink: 0,
                    }}
                  >
                    <Icon style={{ fontSize: 20, color: c.color }} />
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontSize: 12,
                        color: fg.tertiary,
                      }}
                    >
                      {c.label}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontSize: 14,
                        fontWeight: 700,
                        color: fg.primary,
                      }}
                    >
                      {c.value}
                    </Typography>
                  </Box>
                </Stack>
              );
            })}

            <Box
              sx={{ borderRadius: radiusTokens.md, overflow: "hidden", mt: 1 }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=500&q=70"
                alt=""
                sx={{
                  width: "100%",
                  height: 160,
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
