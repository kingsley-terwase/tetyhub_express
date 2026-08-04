// @ts-nocheck
import { useState } from "react";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Heart24Regular,
  Heart24Filled,
  Star24Filled,
  Flash20Filled,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { radiusTokens } from "@/lib/theme";

export default function ProductListingCard({ product }) {
  const { bg, fg, border, main } = useColor();
  const navigate = useNavigate();
  const [wishlisted, setWishlisted] = useState(false);
  const discount = product.originalPrice
    ? Math.round(100 - (product.price / product.originalPrice) * 100)
    : null;

  return (
    <Box
      onClick={() => navigate(`/products/${product.id}`)}
      sx={{
        position: "relative",
        cursor: "pointer",
        borderRadius: radiusTokens.md,
        border: `1px solid ${border.primary}`,
        backgroundColor: bg.secondary,
        overflow: "hidden",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 16px 30px -16px rgba(0,0,0,0.3)",
        },
        "&:hover .plc-img": { transform: "scale(1.07)" },
      }}
    >
      {discount && (
        <Box
          sx={{
            position: "absolute",
            top: { xs: 7, sm: 10 },
            left: { xs: 7, sm: 10 },
            zIndex: 2,
            px: { xs: 0.8, sm: 1 },
            py: 0.3,
            borderRadius: radiusTokens.sm,
            background: "linear-gradient(135deg, #ef4444, #f97316)",
          }}
        >
          <Typography
            sx={{ fontSize: { xs: 9, sm: 10 }, fontWeight: 800, color: "#fff" }}
          >
            -{discount}%
          </Typography>
        </Box>
      )}

      {product.official && (
        <Box
          sx={{
            position: "absolute",
            top: { xs: discount ? 30 : 7, sm: discount ? 36 : 10 },
            left: { xs: 7, sm: 10 },
            zIndex: 2,
            px: { xs: 0.8, sm: 1 },
            py: 0.25,
            borderRadius: radiusTokens.sm,
            backgroundColor: main.primary,
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: 8.5, sm: 9.5 },
              fontWeight: 700,
              color: "#fff",
            }}
          >
            Official Store
          </Typography>
        </Box>
      )}

      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          setWishlisted((w) => !w);
        }}
        sx={{
          position: "absolute",
          top: { xs: 4, sm: 6 },
          right: { xs: 4, sm: 6 },
          zIndex: 2,
          width: { xs: 30, sm: 32 },
          height: { xs: 30, sm: 32 },
          backgroundColor: "rgba(255,255,255,0.85)",
          "&:hover": { backgroundColor: "#fff" },
        }}
      >
        {wishlisted ? (
          <Heart24Filled style={{ fontSize: 16, color: "#ef4444" }} />
        ) : (
          <Heart24Regular style={{ fontSize: 16, color: "#111" }} />
        )}
      </IconButton>

      <Box
        sx={{
          height: { xs: 128, sm: 160 },
          overflow: "hidden",
          backgroundColor: "#fff",
        }}
      >
        <Box
          component="img"
          className="plc-img"
          src={product.image}
          alt={product.name}
          loading="lazy"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
            transition: "transform 0.4s ease",
          }}
        />
      </Box>

      <Stack gap={{ xs: 0.5, sm: 0.6 }} sx={{ p: { xs: 1.1, sm: 1.5 } }}>
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: { xs: 12, sm: 13 },
            color: fg.primary,
            lineHeight: 1.3,
            height: { xs: 31, sm: 34 },
            overflow: "hidden",
          }}
        >
          {product.name}
        </Typography>

        <Stack direction="row" alignItems="baseline" gap={0.8}>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: { xs: 14.5, sm: 16 },
              fontWeight: 800,
              color: fg.primary,
            }}
          >
            ₦{product.price.toLocaleString()}
          </Typography>
        </Stack>
        {product.originalPrice && (
          <Stack
            direction="row"
            alignItems="center"
            gap={0.8}
            sx={{ mt: -0.6 }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: { xs: 11, sm: 12 },
                color: fg.tertiary,
                textDecoration: "line-through",
              }}
            >
              ₦{product.originalPrice.toLocaleString()}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: { xs: 10.5, sm: 11 },
                fontWeight: 700,
                color: "#f97316",
              }}
            >
              -{discount}%
            </Typography>
          </Stack>
        )}

        <Stack direction="row" alignItems="center" gap={0.4} flexWrap="wrap">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star24Filled
              key={i}
              style={{
                fontSize: 12,
                color: i < Math.round(product.rating) ? "#f5a623" : "#d1d5db",
              }}
            />
          ))}
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: { xs: 10.5, sm: 11 },
              color: fg.tertiary,
            }}
          >
            ({product.ratingCount.toLocaleString()})
          </Typography>
        </Stack>

        {product.express && (
          <Stack direction="row" alignItems="center" gap={0.4} sx={{ mt: 0.3 }}>
            <Flash20Filled style={{ fontSize: 12, color: main.primary }} />
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: { xs: 10, sm: 10.5 },
                fontWeight: 700,
                color: main.primary,
              }}
            >
              TETYHUB EXPRESS
            </Typography>
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
