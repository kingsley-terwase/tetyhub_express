import { Button } from "@/components/ui";
import { AddRegular } from "@fluentui/react-icons";
import { Stack, Box, Typography, LinearProgress, Tooltip } from "@mui/material";
import { progressPill, progressBar, cancelBtn, publishBtn } from "../styles";

/**
 * Action slot content: completion progress pill + Cancel + Publish buttons.
 * @param {{ progress: number, onClose: () => void }} props
 */
export default function ModalProgressActions({ progress, onClose }) {
  return (
    <Stack direction="row" gap={1} alignItems="center">
      <Tooltip title={`${progress}% complete`} placement="top">
        <Box sx={progressPill}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={progressBar(progress)}
          />
          <Typography variant="caption" fontWeight={600} color="text.secondary">
            {progress}%
          </Typography>
        </Box>
      </Tooltip>

      <Button size="small" variant="outlined" onClick={onClose} sx={cancelBtn}>
        Cancel
      </Button>

      <Button
        size="small"
        startContent={<AddRegular />}
        color="primary"
        disabled={progress < 70}
        sx={publishBtn}
      >
        Publish Product
      </Button>
    </Stack>
  );
}
