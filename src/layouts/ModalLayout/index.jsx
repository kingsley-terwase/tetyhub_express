import { useColor } from "@/contexts/color";
import { Modal as BaseModal, Box, Stack } from "@mui/material";
import { radius, spacing, spacingTokens } from "@/lib/theme";
import ModalHeader from "./ModalHeader";
import React from "react";

/**
 * @param {Object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {import("@mui/material").ModalProps["children"]} props.children
 * @param {keyof typeof radius} [props.round]
 * @param {Partial<{xs?: string, sm?: string, md?: string, lg?: string, xl?: string}>} [props.width]
 * @param {boolean} [props.overflowVisible]
 * @param {keyof typeof spacing} [props.py]
 * @param {keyof typeof spacing} [props.px]
 * @param {string} [props.title]
 * @param {string} [props.caption]
 * @param {React.ReactNode} [props.actionSlot]
 */
export default function ModalLayout({
  open,
  onClose,
  children,
  round = 0,
  width,
  py = 3,
  px = 3,
  title,
  caption,
  actionSlot,
}) {
  const { shadow, bg, border } = useColor();
  return (
    <BaseModal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",

          width: width
            ? width
            : { xs: "90%", sm: "80%", md: "60%", lg: "40%", xl: "30%" },

          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",

          backgroundColor: bg.tertiary,
          boxShadow: shadow.spread,
          borderRadius: radius[round],
          border: "none",
          outline: "none",
          overflow: "hidden",
        }}
      >
        {title && (
          <ModalHeader
            title={title}
            caption={caption}
            onClose={onClose}
            py={py}
            px={px}
          />
        )}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            padding: `${spacing[py]} ${spacing[px]}`,
          }}
        >
          {children}
        </Box>
        {actionSlot && (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            flexWrap="wrap"
            gap={spacingTokens.sm}
            padding={`${spacing[py]} ${spacing[px]}`}
            borderTop={`0.5px solid ${border.primary}`}
            sx={{ "& > *": { flexShrink: 0 } }}
          >
            {actionSlot}
          </Stack>
        )}
      </Box>
    </BaseModal>
  );
}
