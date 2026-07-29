import { Divider, Typography } from "@mui/material";

import { useColor } from "@/contexts/color";
import Section from "../Section";
import InfoRow from "../InfoRow";
import { CreditCardClockRegular } from "@fluentui/react-icons";

// @ts-ignore
export function PaymentBreakdown({ data }) {
  const { fg, border, main, status } = useColor();

  const subtotal =
    data?.items?.reduce(
      (
        /** @type {number} */ sum,
        /** @type {{ price: number; qty: number; }} */ i,
      ) => sum + i.price * i.qty,
      0,
    ) ?? 0;

  const total =
    subtotal +
    (data?.payment?.discount ?? 0) +
    (data?.payment?.shipping ?? 0) +
    (data?.payment?.tax ?? 0);

  return (
    <Section title="Payment Breakdown" icon={CreditCardClockRegular}>
      <InfoRow label="Subtotal" value={`$${subtotal.toFixed(2)}`} />

      <InfoRow
        label="Discount"
        value={
          <Typography
            variant="body2"
            fontWeight={500}
            sx={{ color: status?.success?.primary ?? main.success }}
          >
            -${Math.abs(data?.payment?.discount ?? 0).toFixed(2)}
          </Typography>
        }
      />

      <InfoRow
        label="Shipping"
        value={`$${(data?.payment?.shipping ?? 0).toFixed(2)}`}
      />

      <InfoRow label="Tax" value={`$${(data?.payment?.tax ?? 0).toFixed(2)}`} />

      <Divider sx={{ borderColor: border.primary, my: 1 }} />

      <InfoRow
        label="Total"
        value={
          <Typography fontWeight={700} sx={{ color: fg.primary }}>
            ${total.toFixed(2)}
          </Typography>
        }
      />

      <InfoRow label="Paid via" value={data?.billing?.method ?? "-"} />
    </Section>
  );
}
