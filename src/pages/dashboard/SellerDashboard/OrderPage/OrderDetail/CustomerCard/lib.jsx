import { Typography } from "@/components/ui";
import { useColor } from "@/contexts/color";
import { EditRegular } from "@fluentui/react-icons";
import { IconButton, Stack } from "@mui/material";

export const MOCK_CUSTOMER = {
  name: "Svetoslava Panayotova",
  email: "you@example.com",
  phone: "0876537622",
  ip: "94.155.40.227",
  orders: 11,
  initials: "SP",
  avatarColor: "#22c55e",
  blacklisted: false,
  delivery: {
    method: "Speedy · Delivery to office",
    office: "RUSE – THE Wrestlers",
    address: "Laura Petkova 3400 Montana, Bulgaria",
    tracking: "61833014106",
  },
  shipping: {
    address: "Laura Petkova 3400 Montana, Bulgaria",
    phone: "0876537622",
    vat: "–",
  },
  payment: {
    method: "Cash on delivery",
    transaction: "0876537622",
  },
};

/**
 * @param {{ label: React.ReactNode }} props
 */
export const SectionHeader = ({ label }) => {
  const { fg } = useColor();

  return (
    <Stack direction="row" alignItems="center" gap={1}>
      <Typography
        fontSize={14}
        fontWeight={700}
        // @ts-ignore
        color={fg.primary}
      >
        {label}
      </Typography>
      <IconButton size="small">
        <EditRegular fontSize={14} />
      </IconButton>
    </Stack>
  );
};
