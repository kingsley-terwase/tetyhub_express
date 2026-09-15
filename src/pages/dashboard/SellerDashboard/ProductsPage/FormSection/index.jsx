// @ts-nocheck
import { useState } from "react";
import { Box, Stack, Typography, Collapse } from "@mui/material";
import { ChevronDown20Regular, ChevronRight20Regular } from "@fluentui/react-icons";
import { radiusTokens } from "@/lib/theme";

export default function FormSection({ title, description, defaultOpen = true, fg, border, children }) {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <Box sx={{ border: `1px solid ${border.primary}`, borderRadius:2, overflow: "hidden" }}>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                onClick={() => setOpen((o) => !o)}
                sx={{ px: 2, py: 1.4, cursor: "pointer", userSelect: "none" }}
            >
                <Box>
                    <Typography sx={{ fontSize: 14, fontWeight: 700, color: fg.primary }}>{title}</Typography>
                    {description && (
                        <Typography sx={{ fontSize: 12, color: fg.tertiary, mt: 0.2 }}>{description}</Typography>
                    )}
                </Box>
                {open ? (
                    <ChevronDown20Regular style={{ color: fg.tertiary }} />
                ) : (
                    <ChevronRight20Regular style={{ color: fg.tertiary }} />
                )}
            </Stack>
            <Collapse in={open}>
                <Box sx={{ px: 2, pb: 2.2, pt: 0.2, borderTop: `1px solid ${border.primary}` }}>
                    <Stack gap={1.8}>{children}</Stack>
                </Box>
            </Collapse>
        </Box>
    );
}