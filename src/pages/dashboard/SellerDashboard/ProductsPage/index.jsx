// @ts-nocheck
import { useEffect, useState } from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import { AddFilled } from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";
import { useColor } from "@/contexts/color";
import { radiusTokens } from "@/lib/theme";
import { useProducts } from "@/Hooks/products";
import ProductsTable from "./ProductsTable";

const PAGE_SIZE = 20;

export default function ProductsPage() {
  const { fg, bg, border, main } = useColor();
  const navigate = useNavigate();
  const { fetchProducts, products, loading } = useProducts();

  const [offset, setOffset] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);

  const load = async () => {
    const result = await fetchProducts({ offset, limit: PAGE_SIZE });
    setHasNextPage(Boolean(result.hasNextPage));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  const page = Math.floor(offset / PAGE_SIZE) + 1;

  return (
    <Box>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent={{ xs: "start", md: "space-between" }}
        alignItems={{ xs: "start", md: "center" }}
        gap={1.6}
        sx={{ mb: 2.4 }}
      >
        <Box>
          <Typography sx={{ fontSize: { xs: 22, md: 26 }, fontWeight: 800, color: fg.primary }}>Products</Typography>
          <Typography sx={{ fontSize: 13, color: fg.secondary, mt: 0.4 }}>
            Everything you're selling in your store.
          </Typography>
        </Box>
        <Button
          onClick={() => navigate("/dashboard/seller/products/add")}
          variant="contained"
          startIcon={<AddFilled />}
          sx={{ backgroundColor: main.primary, textTransform: "none", fontWeight: 700, borderRadius: radiusTokens.md, px: 2.4, flexShrink: 0 }}
        >
          New product
        </Button>
      </Stack>

      <Box sx={{ border: `1px solid ${border.primary}`, borderRadius: radiusTokens.lg ?? 12, backgroundColor: bg.secondary, overflow: "hidden" }}>
        <ProductsTable
          products={products}
          loading={loading}
          fg={fg}
          border={border}
          onEdit={(p) => navigate(`/dashboard/seller/products/${p.id}/edit`)}
        />
      </Box>

      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1.6 }}>
        <Typography sx={{ fontSize: 12.5, color: fg.tertiary }}>Page {page}</Typography>
        <Stack direction="row" gap={1}>
          <Button disabled={offset === 0} onClick={() => setOffset((o) => Math.max(0, o - PAGE_SIZE))} sx={{ textTransform: "none", color: fg.secondary }}>
            Previous
          </Button>
          <Button disabled={!hasNextPage} onClick={() => setOffset((o) => o + PAGE_SIZE)} sx={{ textTransform: "none", color: fg.secondary }}>
            Next
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}