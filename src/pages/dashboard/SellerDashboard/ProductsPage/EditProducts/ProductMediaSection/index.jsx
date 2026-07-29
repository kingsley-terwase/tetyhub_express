import { useRef } from "react";
import {
  ImageAddRegular,
  DismissRegular,
  AddRegular,
} from "@fluentui/react-icons";
import { Box, Grid, Chip, Typography } from "@mui/material";
import SectionLabel from "../SectionLabel";
import { useProductStyles } from "@/contexts/products";

/**
 * @param {{ images: any, dragOver: any, onDrop: any, onDragOver: any, onDragLeave: any, onRemove: any }} props
 */
export default function ProductMediaSection({
  images,
  dragOver,
  onDrop,
  onDragOver,
  onDragLeave,
  onRemove,
}) {
  const s = useProductStyles();
  // @ts-ignore
  const fileRef = useRef();

  return (
    <Box sx={s.sectionWrapper}>
      <SectionLabel icon={ImageAddRegular} label="Product Media" />

      <Box
        onClick={() => fileRef.current?.click()}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        sx={s.dropZone(dragOver, images.length > 0)}
      >
        <ImageAddRegular style={s.dropZoneIcon} />
        <Typography variant="body2" fontWeight={500}>
          Drag & drop images here, or{" "}
          <Box component="span" sx={s.dropZoneBrowse}>
            browse
          </Box>
        </Typography>
        <Typography variant="caption" sx={s.dropZoneHint}>
          PNG, JPG, WEBP · Up to 6 images · Max 5MB each
        </Typography>
      </Box>

      <input
        ref={fileRef}
        type="file"
        multiple
        accept="image/*"
        style={{ display: "none" }}
        onChange={onDrop}
      />

      {images.length > 0 && (
        <Grid container spacing={1}>
          {images.map(
            (
              /** @type {{ url: string | undefined; name: string | undefined; }} */ img,
              /** @type {import("react").Key | null | undefined} */ i,
            ) => (
              <Grid size={{ xs: 4, sm: 3 }} key={i}>
                <Box sx={s.thumbnailBox(i === 0)}>
                  <Box
                    component="img"
                    src={img.url}
                    alt={img.name}
                    sx={s.thumbnailImg}
                  />
                  {i === 0 && (
                    <Chip label="Cover" size="small" sx={s.coverChip} />
                  )}
                  <Box
                    className="remove-btn"
                    onClick={() => onRemove(i)}
                    sx={s.removeBtn}
                  >
                    <DismissRegular style={s.removeBtnIcon} />
                  </Box>
                </Box>
              </Grid>
            ),
          )}
          {images.length < 6 && (
            <Grid size={{ xs: 4, sm: 3 }}>
              <Box onClick={() => fileRef.current?.click()} sx={s.addMoreTile}>
                <AddRegular style={s.addMoreIcon} />
                <Typography variant="caption" fontSize={10}>
                  Add more
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  );
}
