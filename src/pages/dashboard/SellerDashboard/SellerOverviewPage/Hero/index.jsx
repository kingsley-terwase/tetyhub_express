import { Button, Typography } from "@/components/ui";
import { spacingTokens } from "@/lib/theme";
import { AddFilled } from "@fluentui/react-icons";
import { Box, Stack } from "@mui/material";
import { useState } from "react";
import AddAdminModal from "../Modal/AddAdminModal";

export default function Hero() {
  const [addAdmin, setAddAdmin] = useState(false);

  /** @returns {void} */
  const handleOpen = () => {
    setAddAdmin(true);
  };

  /** @returns {void} */
  const handleClose = () => {
    setAddAdmin(false);
  };

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      justifyContent={{ xs: "start", md: "space-between" }}
      alignItems="start"
      gap={spacingTokens.lg}
    >
      <Box>
        <Typography variant="h1">👋 Welcome Back, Kingsley</Typography>
        <Typography variant="body1" color="secondary">
          Wednesday, March 25, 2026
        </Typography>
      </Box>

      <Stack direction="row" gap={spacingTokens.sm} flexWrap="wrap">
        <Button
          onClick={handleOpen}
          color="primary"
          size="large"
          startContent={<AddFilled />}
        >
          Add Admin
        </Button>
      </Stack>

      <AddAdminModal open={addAdmin} onClose={handleClose} />
    </Stack>
  );
}
