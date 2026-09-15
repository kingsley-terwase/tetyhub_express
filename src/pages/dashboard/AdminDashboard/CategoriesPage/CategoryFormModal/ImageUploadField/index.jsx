// @ts-nocheck
import { useRef, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { ImageAdd24Regular } from "@fluentui/react-icons";
import { radiusTokens } from "@/lib/theme";


export default function ImageUploadField({ existingImageUrl, onChange, border, fg, main }) {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handlePick = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setPreviewUrl(URL.createObjectURL(file));
        onChange(file);
    };

    const displayUrl = previewUrl || existingImageUrl;

    return (
        <Stack gap={0.6}>
            <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: fg.primary }}>Image</Typography>
            <Box
                onClick={() => inputRef.current?.click()}
                sx={{
                    border: `1.5px dashed ${border.primary}`,
                    borderRadius: radiusTokens.sm ?? 8,
                    height: 120,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    overflow: "hidden",
                    position: "relative",
                    "&:hover": { borderColor: main.primary },
                }}
            >
                {displayUrl ? (
                    <Box component="img" src={displayUrl} alt="" sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                    <Stack alignItems="center" gap={0.5}>
                        <ImageAdd24Regular style={{ fontSize: 22, color: fg.tertiary }} />
                        <Typography sx={{ fontSize: 12, color: fg.tertiary }}>Click to upload</Typography>
                    </Stack>
                )}
            </Box>
            <input ref={inputRef} type="file" accept="image/*" hidden onChange={handlePick} />
            <Typography sx={{ fontSize: 11, color: fg.tertiary }}>JPEG or PNG recommended.</Typography>
        </Stack>
    );
}