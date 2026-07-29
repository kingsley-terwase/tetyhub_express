import { Stack } from "@mui/material";
import { spacing, spacingTokens } from "@/lib/theme";
import { Typography } from "@/components/ui";
import { DismissRegular } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";

/**
 * @param {Object} props
 * @param {keyof typeof spacing} props.py
 * @param {keyof typeof spacing} props.px
 * @param {string} props.title
 * @param {string} [props.caption]
 * @param {() => void} props.onClose
 */

export default function ModalHeader({ py, px, title, caption, onClose }) {
  const { fg, border } = useColor();

  return (
    <Stack
      direction="row"
      alignItems={caption ? "flex-start" : "center"}
      justifyContent="space-between"
      borderBottom={`0.5px solid ${border.primary}`}
      sx={{ padding: `${spacing[py]} ${spacing[px]}` }}
    >
      <Stack gap={spacingTokens.md}>
        <Typography
          variant="h3"
          fontWeight={700}
          lineHeight={1}
          sx={{ whiteSpace: "nowrap" }}
        >
          {title}
        </Typography>
        {caption && (
          <Typography
            variant="caption"
            color="secondary"
            sx={{ textWrap: "pretty" }}
          >
            {caption}
          </Typography>
        )}
      </Stack>
      <DismissRegular
        fontSize={18}
        color={fg.secondary}
        onClick={onClose}
        style={{ cursor: "pointer" }}
      />
    </Stack>
  );
}
