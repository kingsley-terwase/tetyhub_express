import { Box, Divider, Stack, Typography } from "@mui/material";
import { useColor } from "@/contexts/color";
import { radius, spacingTokens } from "@/lib/theme";

const SHIPPING_COST = 25;
const TAX_RATE = 0.05;

/**
 * @param {{
 *   form:  import("../UseOrderForm").OrderForm,
 *   total: number,
 * }} props
 */
export function OrderFormSummary({ form, total }) {
  const { fg, bg, border } = useColor();

  const tax = total * TAX_RATE;
  const shipping = form.items.length > 0 ? SHIPPING_COST : 0;
  const grand = total + tax + shipping;

  /** @param {string} label @param {string} value @param {boolean} [bold] */
  const Row = (label, value, bold = false) => (
    <Stack direction="row" justifyContent="space-between" py={0.7}>
      <Typography variant="body2" sx={{ color: fg.secondary }}>
        {label}
      </Typography>
      <Typography
        variant="body2"
        fontWeight={bold ? 700 : 500}
        sx={{ color: bold ? fg.primary : fg.secondary }}
      >
        {value}
      </Typography>
    </Stack>
  );

  return (
    <Box
      sx={{
        position: "sticky",
        top: 80,
        borderRadius: radius[8],
        border: `1px solid ${border.primary}`,
        backgroundColor: bg.secondary,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          px: spacingTokens.md,
          py: spacingTokens.sm,
          borderBottom: `1px solid ${border.primary}`,
        }}
      >
        <Typography variant="body2" fontWeight={700} sx={{ color: fg.primary }}>
          Order Summary
        </Typography>
      </Box>

      <Box sx={{ p: spacingTokens.md }}>
        {form.items.length === 0 ? (
          <Typography variant="caption" sx={{ color: fg.tertiary }}>
            No items added yet
          </Typography>
        ) : (
          form.items.map((item) => (
            <Stack
              key={item.id}
              direction="row"
              justifyContent="space-between"
              py={0.5}
            >
              <Typography variant="caption" sx={{ color: fg.secondary }} noWrap>
                {item.name} × {item.qty}
              </Typography>
              <Typography
                variant="caption"
                fontWeight={600}
                sx={{ color: fg.primary, ml: 1, flexShrink: 0 }}
              >
                ${(item.price * item.qty).toFixed(2)}
              </Typography>
            </Stack>
          ))
        )}

        <Divider sx={{ borderColor: border.primary, my: 1.5 }} />

        {Row("Subtotal", `$${total.toFixed(2)}`)}
        {Row("Shipping", shipping > 0 ? `$${shipping}` : "—")}
        {Row("Tax (5%)", `$${tax.toFixed(2)}`)}

        <Divider sx={{ borderColor: border.primary, my: 1.5 }} />

        {Row("Total", `$${grand.toFixed(2)}`, true)}

        <Box
          sx={{
            mt: 1.5,
            p: 1.2,
            borderRadius: 1.5,
            backgroundColor: bg.tertiary,
          }}
        >
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="caption" sx={{ color: fg.tertiary }}>
              Payment
            </Typography>
            <Typography
              variant="caption"
              fontWeight={600}
              sx={{ color: fg.secondary }}
            >
              {form.payment}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" mt={0.5}>
            <Typography variant="caption" sx={{ color: fg.tertiary }}>
              Delivery
            </Typography>
            <Typography
              variant="caption"
              fontWeight={600}
              sx={{ color: fg.secondary }}
            >
              {form.shipping}
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
