// @ts-nocheck
import { useRef, useState } from "react";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import { ImageAdd24Regular, Dismiss16Regular } from "@fluentui/react-icons";
import { radiusTokens } from "@/lib/theme";

export default function MultiImageUploadField({ existingImageUrls = [], onChange, border, fg, main }) {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handlePick = (e) => {
    const picked = Array.from(e.target.files || []);
    if (!picked.length) return;
    const nextFiles = [...files, ...picked];
    const nextPreviews = [...previews, ...picked.map((f) => URL.createObjectURL(f))];
    setFiles(nextFiles);
    setPreviews(nextPreviews);
    onChange(nextFiles);
    e.target.value = "";
  };

  const handleRemove = (index) => {
    const nextFiles = files.filter((_, i) => i !== index);
    const nextPreviews = previews.filter((_, i) => i !== index);
    setFiles(nextFiles);
    setPreviews(nextPreviews);
    onChange(nextFiles);
  };

  // Once the user picks new files, show those instead of the existing
  // ones — same "replace, don't merge" behavior as the single-image field.
  const tiles = previews.length ? previews : existingImageUrls;
  const removable = previews.length > 0;

  return (
    <Stack gap={0.6}>
      <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: fg.primary }}>Images</Typography>
      <Stack direction="row" gap={1} flexWrap="wrap">
        {tiles.map((src, i) => (
          <Box key={src + i} sx={{ position: "relative", width: 72, height: 72 }}>
            <Box
              component="img"
              src={src}
              alt=""
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: radiusTokens.sm ?? 8,
                border: `1px solid ${border.primary}`,
              }}
            />
            {removable && (
              <IconButton
                size="small"
                onClick={() => handleRemove(i)}
                sx={{
                  position: "absolute",
                  top: -6,
                  right: -6,
                  width: 20,
                  height: 20,
                  bgcolor: "#fff",
                  border: `1px solid ${border.primary}`,
                  "&:hover": { bgcolor: "#fff" },
                }}
              >
                <Dismiss16Regular style={{ fontSize: 12 }} />
              </IconButton>
            )}
          </Box>
        ))}
        <Box
          onClick={() => inputRef.current?.click()}
          sx={{
            width: 72,
            height: 72,
            border: `1.5px dashed ${border.primary}`,
            borderRadius: radiusTokens.sm ?? 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            "&:hover": { borderColor: main.primary },
          }}
        >
          <ImageAdd24Regular style={{ fontSize: 20, color: fg.tertiary }} />
        </Box>
      </Stack>
      <input ref={inputRef} type="file" accept="image/*" multiple hidden onChange={handlePick} />
      <Typography sx={{ fontSize: 11, color: fg.tertiary }}>JPEG or PNG. First image becomes the thumbnail.</Typography>
    </Stack>
  );
}