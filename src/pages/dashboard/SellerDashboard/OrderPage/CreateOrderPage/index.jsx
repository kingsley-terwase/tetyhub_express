import { useState } from "react";
import { Box, Grid, Stack, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ArrowLeftRegular } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radius } from "@/lib/theme";
import { useOrderForm } from "./UseOrderForm";
import { OrderActions } from "./OrderActions";
import { OrderFormBasic } from "./OrderFormBasicInfo";
import { OrderFormItems } from "./OrderFormItems";
import { OrderFormPayment } from "./OrderFormPayment";
import { OrderFormSummary } from "./OrderFormSummary";
import { getRoleBasePath } from "@/lib/roles";
import { useAuthStore } from "@/store/auth";

export default function CreateOrderPage() {
  const { fg, bg, border, main } = useColor();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { permission } = useAuthStore.getState();
  // @ts-ignore
  const base = getRoleBasePath(permission);

  const {
    form,
    errors,
    set,
    addItem,
    removeItem,
    updateQty,
    validate,
    reset,
    total,
  } = useOrderForm();

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: bg.secondary,
      "& fieldset": { borderColor: border.primary },
      "&:hover fieldset": { borderColor: fg.tertiary },
      "&.Mui-focused fieldset": { borderColor: main.primary },
    },
    "& input, & textarea, & .MuiSelect-select": {
      color: fg.primary,
      fontSize: 14,
    },
    "& .MuiFormLabel-root": { color: fg.tertiary, fontSize: 13 },
    "& .MuiFormHelperText-root": { fontSize: 11 },
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    console.log("order submitted", form);
    setLoading(false);
    reset();
    navigate("/orders");
  };

  return (
    <Stack gap={spacingTokens.md}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={1}
      >
        <Stack direction="row" alignItems="center" gap={1.5}>
          <IconButton
            size="small"
            onClick={() => navigate(`${base}/orders`)}
            sx={{ border: `1px solid ${border.primary}`, borderRadius: 1.5 }}
          >
            <ArrowLeftRegular fontSize={16} color={fg.secondary} />
          </IconButton>
          <Box>
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ color: fg.primary }}
            >
              Create Order
            </Typography>
            <Typography variant="caption" sx={{ color: fg.tertiary }}>
              Manual order entry
            </Typography>
          </Box>
        </Stack>
        <OrderActions
          onCancel={() => navigate("/create-order")}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </Stack>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack gap={2}>
            <Box
              sx={{
                borderRadius: radius[8],
                border: `1px solid ${border.primary}`,
                backgroundColor: bg.secondary,
                p: spacingTokens.md,
              }}
            >
              <OrderFormBasic
                form={form}
                errors={errors}
                set={set}
                inputSx={inputSx}
                fg={fg}
              />
            </Box>

            <Box
              sx={{
                borderRadius: radius[8],
                border: `1px solid ${border.primary}`,
                backgroundColor: bg.secondary,
                p: spacingTokens.md,
              }}
            >
              <OrderFormItems
                items={form.items}
                error={errors.items}
                onAdd={addItem}
                onRemove={removeItem}
                onQtyChange={updateQty}
                fg={fg}
                bg={bg}
                border={border}
                main={main}
              />
            </Box>

            <Box
              sx={{
                borderRadius: radius[8],
                border: `1px solid ${border.primary}`,
                backgroundColor: bg.secondary,
                p: spacingTokens.md,
              }}
            >
              <OrderFormPayment
                form={form}
                set={set}
                inputSx={inputSx}
                fg={fg}
              />
            </Box>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <OrderFormSummary form={form} total={total} />
        </Grid>
      </Grid>
    </Stack>
  );
}
