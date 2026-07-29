import { Box, Stack, Typography, Divider } from "@mui/material";
import Section from "../Section";
import { BoxRegular } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { ORDER_ITEMS } from "./lib";
import { Chip } from "@/components/ui";

export default function OrderItems({ items = ORDER_ITEMS }) {
  const { bg, fg, border } = useColor();
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <Section title="Order Details" icon={BoxRegular}>
      <Stack gap={0}>
        {items.map((item, i) => (
          <Box key={item.id ?? i}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              py={1.5}
              gap={2}
            >
              <Box
                component="img"
                src={item.image}
                alt={item.name}
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 2,
                  objectFit: "cover",
                  flexShrink: 0,
                  border: `1px solid ${border.primary}`,
                }}
              />

              <Box flex={1} minWidth={0}>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  noWrap
                  sx={{ mb: 0.3 }}
                >
                  {item.name}
                </Typography>
                <Stack
                  direction="row"
                  gap={0.8}
                  alignItems="center"
                  flexWrap="wrap"
                >
                  <Chip
                    label={item.variant}
                    size="small"
                    sx={{
                      height: 18,
                      fontSize: 10,
                      bgcolor: bg.tertiary,
                      color: fg.secondary,
                      fontWeight: 500,
                      borderRadius: 1,
                    }}
                  />
                  <Typography variant="caption" color={fg.tertiary}>
                    SKU: {item.sku}
                  </Typography>
                </Stack>
                <Typography variant="caption" color={fg.tertiary}>
                  Quantity: {item.qty}
                </Typography>
              </Box>

              <Box textAlign="right" flexShrink={0}>
                <Typography fontWeight={700} fontSize={15}>
                  ${(item.price * item.qty).toFixed(2)}
                </Typography>
              </Box>
            </Stack>

            {i < items.length - 1 && (
              <Divider sx={{ borderColor: border.primary }} />
            )}
          </Box>
        ))}

        <Divider sx={{ borderColor: border.primary, mt: 0.5 }} />
        <Stack direction="row" justifyContent="space-between" pt={1.5}>
          <Typography variant="body2" color={fg.secondary}>
            {items.length} item{items.length !== 1 ? "s" : ""} · Order Total
          </Typography>
          <Typography fontWeight={800} fontSize={16}>
            ${total.toFixed(2)}
          </Typography>
        </Stack>
      </Stack>
    </Section>
  );
}
