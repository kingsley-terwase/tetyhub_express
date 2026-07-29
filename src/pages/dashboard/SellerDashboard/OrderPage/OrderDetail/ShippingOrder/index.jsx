import { Typography } from "@mui/material";
import { VehicleShipRegular } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import Section from "../Section";
import InfoRow from "../InfoRow";

// @ts-ignore
export function ShippingOrder({ data }) {
  const { main } = useColor();

  return (
    <Section title="Fulfillment & Shipping" icon={VehicleShipRegular}>
      <InfoRow label="Method" value={data.shipping.method} />
      <InfoRow label="Carrier" value={data.shipping.carrier} />

      <InfoRow
        label="Tracking #"
        value={
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{
              color: main.primary,
              cursor: "pointer",
              fontFamily: "monospace",
            }}
          >
            {data.shipping.tracking}
          </Typography>
        }
      />

      <InfoRow label="Est. Delivery" value={data.shipping.eta} />
    </Section>
  );
}
