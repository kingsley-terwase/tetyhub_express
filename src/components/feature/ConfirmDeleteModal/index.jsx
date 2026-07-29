import { Typography, Stack, Box } from "@mui/material";
import { DeleteRegular, DismissRegular } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import ModalLayout from "@/layouts/ModalLayout";

/**
 * @param {Object}  props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {() => void} props.onConfirm
 * @param {string}  [props.title]
 * @param {string}  [props.description]
 * @param {string}  [props.itemName]        name of what's being deleted e.g. "Wireless Headphones"
 * @param {boolean} [props.loading]
 */

export default function ConfirmDeleteModal({
  open,
  onClose,
  onConfirm,
  title = "Delete Item",
  description = "This action cannot be undone. The item will be permanently removed.",
  itemName,
  loading = false,
}) {
  const { fg, bg, border, main, status: s } = useColor();

  const dangerColor = s?.error?.primary ?? main.error;
  const dangerBg = s?.error?.secondary ?? "#fee2e2";

  return (
    <ModalLayout
      open={open}
      onClose={onClose}
      title={title}
      caption="Permanent action — please confirm"
      round={8}
      width={{ xs: "92%", sm: "70%", md: "44%", lg: "32%", xl: "26%" }}
      py={5}
      px={5}
      actionSlot={
        <Stack direction="row" gap={1.2}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap={0.8}
            onClick={onClose}
            sx={{
              px: 2,
              py: 1,
              borderRadius: 2,
              cursor: "pointer",
              border: `1px solid ${border.primary}`,
              backgroundColor: bg.secondary,
              minWidth: 110,
              "&:hover": { backgroundColor: bg.tertiary },
              transition: "all .15s ease",
            }}
          >
            <DismissRegular fontSize={16} color={fg.secondary} />
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 600,
                color: fg.secondary,
              }}
            >
              Cancel
            </Typography>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap={0.8}
            onClick={loading ? undefined : onConfirm}
            sx={{
              px: 2,
              py: 1,
              borderRadius: 2,
              cursor: loading ? "not-allowed" : "pointer",
              backgroundColor: dangerColor,
              minWidth: 110,
              opacity: loading ? 0.7 : 1,
              "&:hover": { opacity: loading ? 0.7 : 0.9 },
              transition: "all .15s ease",
            }}
          >
            <DeleteRegular fontSize={16} color="#fff" />
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 600,
                color: "#fff",
              }}
            >
              {loading ? "Deleting..." : "Delete"}
            </Typography>
          </Stack>
        </Stack>
      }
    >
      <Stack gap={2.2}>
        <Stack direction="row" gap={1.5} alignItems="flex-start">
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              backgroundColor: dangerBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <DeleteRegular fontSize={22} color={dangerColor} />
          </Box>

          <Typography
            variant="body2"
            sx={{
              color: fg.secondary,
              lineHeight: 1.6,
              mt: 0.4,
            }}
          >
            {description}
          </Typography>
        </Stack>

        {itemName && (
          <Box
            sx={{
              px: 1.6,
              py: 1.2,
              borderRadius: 2,
              backgroundColor: bg.secondary,
              border: `1px solid ${border.primary}`,
            }}
          >
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 600,
                color: fg.tertiary,
                mb: 0.4,
                textTransform: "uppercase",
                letterSpacing: ".4px",
              }}
            >
              Item to be deleted
            </Typography>

            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 600,
                color: fg.primary,
              }}
            >
              {itemName}
            </Typography>
          </Box>
        )}
      </Stack>
    </ModalLayout>
  );
}
