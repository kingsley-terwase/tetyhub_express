import { Box, Stack, Typography, IconButton } from "@mui/material";
import {
  ArrowLeftRegular,
  PrintRegular,
  EditRegular,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { StatusChip } from "@/components/shared";
import { RiskBadge } from "../../RiskBadge";
import { useNavigate } from "react-router-dom";
import { getRoleBasePath } from "@/lib/roles.js";
import { useAuthStore } from "@/store/auth";

// @ts-ignore
export default function OrderHeader({ order }) {
  const { fg, border, main } = useColor();
  const { permission } = useAuthStore.getState();

  // @ts-ignore
  const base = getRoleBasePath(permission);
  const navigate = useNavigate();

  return (
    <Stack direction="row" justifyContent="space-between" flexWrap="wrap">
      <Stack direction="row" alignItems="center" gap={1.5}>
        <IconButton
          onClick={() => window.history.back()}
          size="small"
          sx={{ border: `1px solid ${border.primary}`, borderRadius: 1.5 }}
        >
          <ArrowLeftRegular fontSize={16} color={fg.secondary} />
        </IconButton>

        <Box>
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ color: fg.primary }}
            >
              {order.id}
            </Typography>
            <StatusChip status={order.status} />
            <RiskBadge risk={order.risk} />
          </Stack>

          <Typography variant="caption" sx={{ color: fg.tertiary }}>
            Placed on {order.date} · via {order.channel}
          </Typography>
        </Box>
      </Stack>

      <Stack direction="row" gap={1}>
        <IconButton
          sx={{
            border: `1px solid ${border.primary}`,
            px: 1.4,
            py: 0.8,
          }}
        >
          <PrintRegular fontSize={16} color={fg.secondary} />
        </IconButton>

        <Stack
          direction="row"
          alignItems="center"
          gap={0.6}
          onClick={() => navigate(`${base}/edit-order`)}
          sx={{
            px: 1.5,
            py: 0.8,
            borderRadius: 1.5,
            cursor: "pointer",
            backgroundColor: main.primary,
          }}
        >
          <EditRegular fontSize={16} color="#fff" />
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>
            Edit Order
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
