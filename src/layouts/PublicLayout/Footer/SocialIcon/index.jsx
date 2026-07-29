import { Box } from "@mui/material";

const ICONS_BY_KEY = {
  tiktok: "/Image/tik.png",
  facebook: "/Image/fb.png",
  x: "/Image/x.png",
  instagram: "/Image/instagram.png",
  whatsapp: "/Image/whatsapp.png",
};

// @ts-ignore
export default function SocialIcon({ social, size = 16 }) {
  // @ts-ignore
  const src = ICONS_BY_KEY[social.key];
  if (!src) return null;

  return (
    <Box
      component="img"
      src={src}
      alt={social.label}
      sx={{ width: size, height: size, objectFit: "contain", display: "block" }}
    />
  );
}
