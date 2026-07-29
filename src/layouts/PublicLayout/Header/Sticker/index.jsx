// @ts-nocheck
import { Box } from "@mui/material";
import { keyframes } from "@emotion/react";
import { useColor } from "@/contexts/color";

const wiggle = keyframes`
  0%, 100% { transform: rotate(-9deg); }
  50% { transform: rotate(-4deg); }
`;

export default function StickerBadge({
  icon: Icon,
  size = 84,
  iconSize,
  animate = true,
}) {
  const { main } = useColor();

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        flexShrink: 0,
        borderRadius: "50%",
        backgroundColor: "#fff",
        border: `2px dashed ${main.primary}55`,
        boxShadow: "0 10px 22px -8px rgba(0,0,0,0.22)",
        animation: animate ? `${wiggle} 5s ease-in-out infinite` : "none",
      }}
    >
      <Icon
        style={{
          fontSize: iconSize ?? Math.round(size * 0.45),
          color: main.primary,
        }}
      />
    </Box>
  );
}
