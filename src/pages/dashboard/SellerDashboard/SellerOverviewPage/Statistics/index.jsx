import { SalesDynamics, SummaryCard } from "@/components/shared";
import {
  DiversityRegular,
  PeopleRegular,
  ShoppingBagRegular,
  ToolboxRegular,
  WalletCreditCardFilled,
  WalletFilled,
} from "@fluentui/react-icons";
import { Box, Grid, Stack } from "@mui/material";
import OrderInsight from "../OrderAnalytics/OrderInsight";
import Transactions from "../OrderAnalytics/Transactions";
import TransactionCard from "@/components/shared/TransactionCard";
import Banner from "../../Banner";
import { spacingTokens } from "@/lib/theme";

export default function Statistics() {
  return (
    <Grid container spacing={2} alignItems="flex-start">
      <Grid size={{ xs: 12, md: 6 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <SummaryCard
              secondaryLabel="Users"
              value={3000}
              color="neutral"
              percentValue={-0.4}
              percentLabel="Since last week"
              icon={PeopleRegular}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <SummaryCard
              secondaryLabel="Orders"
              value={57000}
              color="neutral"
              icon={ShoppingBagRegular}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <SummaryCard
              secondaryLabel="Categories"
              value={1000}
              percentValue={-0.009}
              color="neutral"
              icon={DiversityRegular}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <SummaryCard
              secondaryLabel="Services"
              value={7000}
              color="neutral"
              icon={ToolboxRegular}
            />
          </Grid>
        </Grid>
        <SalesDynamics></SalesDynamics>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Stack spacing={2}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <OrderInsight />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Transactions />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TransactionCard
                icon={WalletCreditCardFilled}
                label="Paid Invoices"
                value="$30,256.23"
                footerLabel="Current Financial Year"
                percentValue={15}
                color="purple"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TransactionCard
                icon={WalletFilled}
                label="Funds received"
                value="$150,256.23"
                footerLabel="Current Financial Year"
                percentValue={59}
                color="success"
              />
            </Grid>
          </Grid>
        </Stack>
        <Box sx={{ py: spacingTokens.md }}>
          <Banner />
        </Box>
      </Grid>
    </Grid>
  );
}
