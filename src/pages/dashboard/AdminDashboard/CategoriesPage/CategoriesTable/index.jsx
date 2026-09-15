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

const TYPE_LABELS = { products: "Products", services: "Services", both: "Both" };

function TypeBadge({ type, main }) {
  if (!type) return null;
  return (
    <Box sx={{ display: "inline-flex", px: 1, py: 0.3, borderRadius: 999, backgroundColor: `${main.primary}1a`, width: "fit-content" }}>
      <Typography sx={{ fontSize: 11, fontWeight: 700, color: main.primary }}>
        {TYPE_LABELS[type] || type}
      </Typography>
    </Box>
  );
}

function formatDate(iso) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString(undefined, { dateStyle: "medium" });
  } catch {
    return "—";
  }
}

export default function CategoriesTable({ categories, loading, fg, border, main, onView, onEdit }) {
  if (loading) {
    return <Typography sx={{ fontSize: 13, color: fg.tertiary, px: 2.4, py: 3, textAlign: "center" }}>Loading categories...</Typography>;
  }

  if (categories.length === 0) {
    return <Typography sx={{ fontSize: 13, color: fg.tertiary, px: 2.4, py: 3, textAlign: "center" }}>No categories yet.</Typography>;
  }

  return (
    <Stack>
      {categories.map((cat, i) => (
        <Stack
          key={cat.id}
          direction="row"
          alignItems="center"
          gap={1.6}
          sx={{ px: { xs: 1.75, sm: 2.4 }, py: 1.4, borderTop: i === 0 ? "none" : `1px solid ${border.primary}` }}
        >
          <Box
            component="img"
            src={cat.image}
            alt=""
            sx={{ width: 44, height: 44, borderRadius: 1.5, objectFit: "cover", flexShrink: 0, backgroundColor: border.primary }}
          />

          <Box sx={{ flex: 2, minWidth: 0 }}>
            <Typography sx={{ fontSize: 13.5, fontWeight: 700, color: fg.primary }}>{cat.name}</Typography>
            <Typography sx={{ fontSize: 11, color: fg.tertiary, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {cat.description || "—"}
            </Typography>
          </Box>

          <Box sx={{ flex: 1, display: { xs: "none", sm: "block" } }}>
            <TypeBadge type={cat.type} main={main} />
          </Box>

          <Box sx={{ flex: 1, display: { xs: "none", sm: "block" } }}>
            <StatusPill active={cat.status} />
          </Box>

          <Typography sx={{ flex: 1, fontSize: 12, color: fg.tertiary, display: { xs: "none", md: "block" } }}>
            {formatDate(cat.created_at)}
          </Typography>

          <Stack direction="row" gap={1.2} sx={{ flexShrink: 0 }}>
            <Box
              onClick={() => onView(cat.id)}
              title="View details"
              sx={{ cursor: "pointer", color: fg.secondary, display: "flex", "&:hover": { color: main.primary } }}
            >
              <Eye24Regular style={{ fontSize: 18 }} />
            </Box>
            <Box
              onClick={() => onEdit(cat)}
              title="Edit category"
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