// @ts-nocheck
import { useEffect, useState } from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import { AddFilled } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { radiusTokens } from "@/lib/theme";
import { useCurrencies } from "@/Hooks/currencies";
import CurrenciesTable from "./CurrencyTable";
import CurrencyFormModal from "./CurrencyFormModal";

export default function CurrenciesPage() {
    const { fg, bg, border, main } = useColor();
    const { fetchCurrencies, currencies, loading } = useCurrencies();

    const [modalOpen, setModalOpen] = useState(false);
    const [editingCurrency, setEditingCurrency] = useState(null);

    useEffect(() => {
        fetchCurrencies();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleAdd = () => {
        setEditingCurrency(null);
        setModalOpen(true);
    };

    const handleEdit = (currency) => {
        setEditingCurrency(currency);
        setModalOpen(true);
    };

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
                    <Typography sx={{ fontSize: { xs: 22, md: 26 }, fontWeight: 800, color: fg.primary }}>Currencies</Typography>
                    <Typography sx={{ fontSize: 13, color: fg.secondary, mt: 0.4 }}>
                        The currencies vendors can price products and services in.
                    </Typography>
                </Box>
                <Button
                    onClick={handleAdd}
                    variant="contained"
                    startIcon={<AddFilled />}
                    sx={{ backgroundColor: main.primary, textTransform: "none", fontWeight: 700, borderRadius: radiusTokens.md, px: 2.4, flexShrink: 0 }}
                >
                    New currency
                </Button>
            </Stack>

            <Box sx={{ border: `1px solid ${border.primary}`, borderRadius: radiusTokens.lg ?? 12, backgroundColor: bg.secondary, overflow: "hidden" }}>
                <CurrenciesTable currencies={currencies} loading={loading} fg={fg} border={border} onEdit={handleEdit} />
            </Box>

            <CurrencyFormModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSaved={fetchCurrencies}
                editingCurrency={editingCurrency}
            />
        </Box>
    );
}