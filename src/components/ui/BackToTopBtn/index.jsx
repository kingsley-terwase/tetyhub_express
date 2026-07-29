import { useEffect, useState } from "react";
import { Box, Fade } from "@mui/material";
import { ArrowUp24Filled } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radius } from "@/lib/theme";

const SHOW_AFTER_PX = 400;

export default function BackToTopBtn() {
  const { main } = useColor();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // handles a page that loads already scrolled (e.g. back-navigation)
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Fade in={visible}>
      <Box
        component="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        sx={{
          position: "fixed",
          bottom: { xs: spacingTokens.md, md: spacingTokens.lg },
          right: { xs: spacingTokens.md, md: spacingTokens.lg },
          zIndex: 40,
          width: 48,
          height: 48,
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: radius.full,
          backgroundColor: main.primary,
          color: "#fff",
          boxShadow: "0 10px 24px -8px rgba(0,0,0,0.35)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          "&:hover": {
            transform: "translateY(-3px)",
            boxShadow: "0 14px 28px -8px rgba(0,0,0,0.4)",
          },
        }}
      >
        <ArrowUp24Filled style={{ fontSize: 22 }} />
      </Box>
    </Fade>
  );
}
