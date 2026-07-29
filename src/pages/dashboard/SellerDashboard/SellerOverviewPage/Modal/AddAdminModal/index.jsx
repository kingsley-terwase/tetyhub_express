import { Button } from "@/components/ui";
import { spacingTokens } from "@/lib/theme";
import { ModalLayout } from "@/layouts";
import { AddRegular } from "@fluentui/react-icons";
import {
  Stack,
  OutlinedInput,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

/**
 * @param {import("@/types/global.d").ModalConfig} props
 */
export default function AddAdminModal({ open, onClose }) {
  return (
    <ModalLayout
      open={open}
      onClose={onClose}
      title="Add New Admin"
      caption="Create a new administrator account with appropriate access"
      actionSlot={
        <>
          <Button size="small" startContent={<AddRegular />} color="primary">
            Add Admin
          </Button>
        </>
      }
    >
      <Stack gap={spacingTokens.md} sx={{ mt: 1 }}>
        {/* Full Name */}
        <FormControl fullWidth>
          <OutlinedInput placeholder="Enter full name" fullWidth />
        </FormControl>

        {/* Email */}
        <FormControl fullWidth>
          <OutlinedInput
            type="email"
            placeholder="admin@company.com"
            fullWidth
          />
        </FormControl>

        {/* Phone Number */}
        <FormControl fullWidth>
          <OutlinedInput type="tel" placeholder="+234 801 234 5678" fullWidth />
        </FormControl>

        {/* Role */}
        <FormControl fullWidth>
          <Select variant="outlined" defaultValue="">
            <MenuItem value="" disabled>
              Select Role
            </MenuItem>
            <MenuItem value="super_admin">Super Admin</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="manager">Manager</MenuItem>
            <MenuItem value="moderator">Moderator</MenuItem>
          </Select>
        </FormControl>

        {/* Password */}
        <FormControl fullWidth>
          <OutlinedInput
            type="password"
            placeholder="Create secure password"
            fullWidth
          />
        </FormControl>

        {/* Confirm Password */}
        <FormControl fullWidth>
          <OutlinedInput
            type="password"
            placeholder="Confirm password"
            fullWidth
          />
        </FormControl>

        {/* Status */}
        <FormControl fullWidth>
          <Select variant="outlined" defaultValue="active">
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </ModalLayout>
  );
}
