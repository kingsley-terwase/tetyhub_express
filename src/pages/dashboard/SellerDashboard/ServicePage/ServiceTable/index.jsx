
// @ts-nocheck
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    IconButton,
    Typography,
    Box,
} from "@mui/material";
import { Edit16Regular, Eye16Regular } from "@fluentui/react-icons";

const GREEN = "#22C55E";
const GRAY = "#94A3B8";

function formatPrice(price, currencyCode) {
    if (price === undefined || price === null) return "—";

    const amount = Number(price).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return currencyCode ? `${currencyCode} ${amount}` : amount;
}

export default function ServicesTable({
    services,
    loading,
    fg,
    border,
    onEdit,
}) {
    if (loading) {
        return (
            <Typography
                sx={{
                    fontSize: 13,
                    color: fg.tertiary,
                    textAlign: "center",
                    py: 4,
                }}
            >
                Loading...
            </Typography>
        );
    }

    if (!services.length) {
        return (
            <Typography
                sx={{
                    fontSize: 13,
                    color: fg.tertiary,
                    textAlign: "center",
                    py: 4,
                }}
            >
                No services yet.
            </Typography>
        );
    }

    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell
                        sx={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: fg.tertiary,
                            borderColor: border.primary,
                        }}
                    >
                        Service
                    </TableCell>

                    <TableCell
                        sx={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: fg.tertiary,
                            borderColor: border.primary,
                        }}
                    >
                        Base price
                    </TableCell>

                    <TableCell
                        sx={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: fg.tertiary,
                            borderColor: border.primary,
                        }}
                    >
                        Duration
                    </TableCell>

                    <TableCell
                        sx={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: fg.tertiary,
                            borderColor: border.primary,
                        }}
                    >
                        Status
                    </TableCell>

                    <TableCell
                        sx={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: fg.tertiary,
                            borderColor: border.primary,
                        }}
                        align="right"
                    >
                        Actions
                    </TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {services.map((s) => {
                    // Use thumbnail first, then fall back to the first image
                    const serviceImage =
                        s.thumbnail ||
                        (Array.isArray(s.images) && s.images.length > 0
                            ? s.images[0]
                            : "");

                    // API status is now "active" or "paused"
                    const isActive =
                        s.status === "active" || s.status === true;

                    return (
                        <TableRow key={s.id} hover>
                            <TableCell
                                sx={{
                                    fontSize: 13,
                                    fontWeight: 700,
                                    color: fg.primary,
                                    borderColor: border.primary,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1.2,
                                    }}
                                >
                                    {/* Service image / thumbnail */}
                                    <Box
                                        sx={{
                                            width: 42,
                                            height: 42,
                                            minWidth: 42,
                                            borderRadius: 1,
                                            overflow: "hidden",
                                            border: `1px solid ${border.primary}`,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            backgroundColor: `${fg.tertiary}0D`,
                                        }}
                                    >
                                        {serviceImage ? (
                                            <Box
                                                component="img"
                                                src={serviceImage}
                                                alt={s.name || "Service"}
                                                sx={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                    display: "block",
                                                }}
                                            />
                                        ) : (
                                            <Typography
                                                sx={{
                                                    fontSize: 10,
                                                    color: fg.tertiary,
                                                }}
                                            >
                                                No image
                                            </Typography>
                                        )}
                                    </Box>

                                    <Typography
                                        sx={{
                                            fontSize: 13,
                                            fontWeight: 700,
                                            color: fg.primary,
                                        }}
                                    >
                                        {s.name}
                                    </Typography>
                                </Box>
                            </TableCell>

                            <TableCell
                                sx={{
                                    fontSize: 13,
                                    color: fg.primary,
                                    borderColor: border.primary,
                                }}
                            >
                                {formatPrice(
                                    s.base_price,
                                    s.currency?.code
                                )}
                            </TableCell>

                            <TableCell
                                sx={{
                                    fontSize: 13,
                                    color: fg.primary,
                                    borderColor: border.primary,
                                }}
                            >
                                {s.duration_mins
                                    ? `${s.duration_mins} min`
                                    : "—"}
                            </TableCell>

                            <TableCell
                                sx={{
                                    borderColor: border.primary,
                                }}
                            >
                                <Chip
                                    label={
                                        isActive ? "Active" : "Paused"
                                    }
                                    size="small"
                                    sx={{
                                        backgroundColor: `${isActive ? GREEN : GRAY
                                            }1A !important`,
                                        fontWeight: 700,
                                        fontSize: 11.5,
                                        "& .MuiChip-label": {
                                            color: `${isActive ? GREEN : GRAY
                                                } !important`,
                                        },
                                    }}
                                />
                            </TableCell>
                            <TableCell
                                align="right"
                                sx={{
                                    borderColor: border.primary,
                                }}
                            >
                                <IconButton
                                    size="small"
                                    onClick={() => onEdit(s)}
                                >
                                    <Edit16Regular
                                        style={{
                                            fontSize: 16,
                                            color: fg.secondary,
                                        }}
                                    />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
