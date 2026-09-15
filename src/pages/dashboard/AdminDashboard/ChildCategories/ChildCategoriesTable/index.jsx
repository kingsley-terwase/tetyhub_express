// @ts-nocheck
import { Box, Stack, Typography } from "@mui/material";
import { Edit24Regular, Eye24Regular } from "@fluentui/react-icons";

const GREEN = "#22C55E";
const GRAY = "#94A3B8";

function StatusPill({ active }) {
    const color = active ? GREEN : GRAY;
    return (
        <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.6, px: 1.1, py: 0.4, borderRadius: 999, backgroundColor: `${color}1a` }}>
            <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: color }} />
            <Typography sx={{ fontSize: 11.5, fontWeight: 700, color }}>{active ? "Active" : "Inactive"}</Typography>
        </Box>
    );
}


export default function ChildCategoriesTable({ childCategories, loading, subcategoryMap, fg, border, main, onView, onEdit }) {
    if (loading) {
        return <Typography sx={{ fontSize: 13, color: fg.tertiary, px: 2.4, py: 3, textAlign: "center" }}>Loading child categories...</Typography>;
    }

    if (childCategories.length === 0) {
        return <Typography sx={{ fontSize: 13, color: fg.tertiary, px: 2.4, py: 3, textAlign: "center" }}>No child categories yet.</Typography>;
    }

    return (
        <Stack>
            {childCategories.map((item, i) => (
                <Stack
                    key={item.id}
                    direction="row"
                    alignItems="center"
                    gap={1.6}
                    sx={{ px: { xs: 1.75, sm: 2.4 }, py: 1.4, borderTop: i === 0 ? "none" : `1px solid ${border.primary}` }}
                >
                    <Box
                        component="img"
                        src={item.image}
                        alt=""
                        sx={{ width: 44, height: 44, borderRadius: 1.5, objectFit: "cover", flexShrink: 0, backgroundColor: border.primary }}
                    />

                    <Box sx={{ flex: 2, minWidth: 0 }}>
                        <Typography sx={{ fontSize: 13.5, fontWeight: 700, color: fg.primary }}>{item.name}</Typography>
                        <Typography sx={{ fontSize: 11, color: fg.tertiary }}>
                            {subcategoryMap[item.subcategory_id] || `Subcategory #${item.subcategory_id}`}
                        </Typography>
                    </Box>

                    <Box sx={{ flex: 1, display: { xs: "none", sm: "block" } }}>
                        <StatusPill active={item.status} />
                    </Box>

                    <Stack direction="row" gap={1.2} sx={{ flexShrink: 0 }}>
                        <Box
                            onClick={() => onView(item.id)}
                            title="View details"
                            sx={{ cursor: "pointer", color: fg.secondary, display: "flex", "&:hover": { color: main.primary } }}
                        >
                            <Eye24Regular style={{ fontSize: 18 }} />
                        </Box>
                        <Box
                            onClick={() => onEdit(item)}
                            title="Edit child category"
                            sx={{ cursor: "pointer", color: fg.secondary, display: "flex", "&:hover": { color: main.primary } }}
                        >
                            <Edit24Regular style={{ fontSize: 18 }} />
                        </Box>
                    </Stack>
                </Stack>
            ))}
        </Stack>
    );
}