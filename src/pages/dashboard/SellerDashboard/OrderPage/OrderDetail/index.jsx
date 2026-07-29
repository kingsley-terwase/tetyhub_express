import { Grid, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { spacingTokens } from "@/lib/theme";
import { orders, orderDetails } from "../lib";

import FulfillmentStatus from "./FulfilmentStatus";
import OrderItems from "./OrderItems";
import OrderHeader from "./OrderHeader";
import { PaymentBreakdown } from "./PaymentBreakdown";
import { ShippingOrder } from "./ShippingOrder";
import CustomerCard from "./CustomerCard";
import OrderHistory from "./OrderHistory";

export default function OrderDetail() {
  const { id } = useParams();

  const order = orders.find((o) => o.id === id) ?? orders[0];

  const baseDetail = orderDetails["ORD-7841"];

  orders.forEach((o) => {
    if (!orderDetails[o.id]) {
      orderDetails[o.id] = {
        ...baseDetail,
        customer: {
          ...baseDetail.customer,
          name: o.customer,
          email: o.email,
          avatar: o.avatar,
          avatarColor: "#0e7decf2",
        },
      };
    }
  });

  const d = orderDetails[order.id];

  if (!d) return null;

  return (
    <Stack gap={spacingTokens.md}>
      <OrderHeader order={order} />
      <FulfillmentStatus status={order.status} />

      <Grid container spacing={1.5}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack gap={1.5}>
            <OrderItems
              // @ts-ignore
              data={d}
            />
            <PaymentBreakdown data={d} />
            <ShippingOrder data={d} />
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Stack gap={1.5}>
            <CustomerCard
              // @ts-ignore
              data={d}
            />
            <OrderHistory
              // @ts-ignore
              data={d}
            />
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
