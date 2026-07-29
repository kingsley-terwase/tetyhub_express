import { Stack } from "@mui/material";
import { useColor } from "@/contexts/color";
import Button from "@/components/ui/Button";

import { DismissRegular, CheckmarkRegular } from "@fluentui/react-icons";

/**
 * @param {{ onCancel: () => void, onSubmit: () => void, loading?: boolean }} props
 */
export function ModalActions({ onCancel, onSubmit, loading = false }) {
  const { fg, main } = useColor();

  return (
    <Stack direction="row" gap={1.2}>
      <Button
        round={3}
        noShadow
        // @ts-ignore
        color={main.error}
        startContent={<DismissRegular fontSize={16} />}
        onClick={onCancel}
        sx={{
          px: 2,
          py: 0.9,
          backgroundColor: main.error,
          color: fg.primary,
          //   "&:hover": { backgroundColor: bg.tertiary },
        }}
      >
        Cancel
      </Button>

      <Button
        round={3}
        startContent={<CheckmarkRegular fontSize={16} />}
        onClick={onSubmit}
        loading={loading}
        sx={{
          px: 2,
          py: 0.9,
          backgroundColor: main.primary,
          color: "#fff",
          "&:hover": { opacity: 0.9 },
        }}
      >
        Create Campaign
      </Button>
    </Stack>
  );
}
