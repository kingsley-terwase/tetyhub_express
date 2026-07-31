// @ts-nocheck
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Stack,
  Typography,
  Button,
  Modal,
  TextField,
  IconButton,
} from "@mui/material";
import {
  ShieldCheckmark24Filled,
  Star24Filled,
  Location24Regular,
  Clock24Regular,
  ChatMultiple24Regular,
  PersonAdd24Regular,
  Dismiss24Regular,
  Send24Filled,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radiusTokens } from "@/lib/theme";

// Placeholder store data until this reads from a real vendor API/store.
const STORE = {
  name: "Deja Crafts",
  category: "Fashion & Accessories",
  verified: true,
  rating: 4.8,
  reviewCount: 312,
  followers: 1240,
  location: "Lagos, Nigeria",
  responseTime: "Under 2 hours",
  memberSince: "2023",
  bio: "Handmade leather goods and Ankara-print accessories, crafted in small batches. Every piece is made to order — expect character, not perfection.",
  banner:
    "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=70",
  avatar:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=75",
};

const OFFERINGS = [
  {
    id: 1,
    type: "product",
    name: "Hand-loomed Ankara Bag",
    price: 18500,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=70",
  },
  {
    id: 2,
    type: "product",
    name: "Leather Sandals, Tan",
    price: 22000,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=70",
  },
  {
    id: 3,
    type: "service",
    name: "Custom Bag Design Consultation",
    price: 8000,
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=400&q=70",
  },
  {
    id: 4,
    type: "product",
    name: "Ankara Print Wallet",
    price: 9500,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=70",
  },
];

const REVIEWS = [
  {
    name: "Amara C.",
    rating: 5,
    quote: "The bag is even more beautiful in person. Fast shipping too.",
    avatar: "1580489944761-15a19d654956",
  },
  {
    name: "Kwame O.",
    rating: 4,
    quote:
      "Great craftsmanship, took a little longer than expected but worth the wait.",
    avatar: "1500648767791-00dcc994a43e",
  },
];

function OfferingCard({ item }) {
  const { bg, fg, border, main } = useColor();
  const navigate = useNavigate();

  return (
    <Box
      onClick={() =>
        navigate(
          item.type === "product"
            ? `/products/${item.id}`
            : `/services/${item.id}`,
        )
      }
      sx={{
        borderRadius: radiusTokens.md,
        border: `1px solid ${border.primary}`,
        backgroundColor: bg.secondary,
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 16px 28px -16px rgba(0,0,0,0.3)",
        },
        "&:hover .off-img": { transform: "scale(1.07)" },
      }}
    >
      <Box sx={{ position: "relative", height: 150, overflow: "hidden" }}>
        <Box
          component="img"
          className="off-img"
          src={item.image}
          alt={item.name}
          loading="lazy"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.4s ease",
          }}
        />
        {item.type === "service" && (
          <Box
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              px: 1,
              py: 0.25,
              borderRadius: radiusTokens.sm,
              backgroundColor: main.primary,
            }}
          >
            <Typography sx={{ fontSize: 10, fontWeight: 700, color: "#fff" }}>
              SERVICE
            </Typography>
          </Box>
        )}
      </Box>
      <Stack gap={0.5} sx={{ p: 1.5 }}>
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: 13,
            fontWeight: 600,
            color: fg.primary,
          }}
          noWrap
        >
          {item.name}
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: 14,
              fontWeight: 800,
              color: fg.primary,
            }}
          >
            ₦{item.price.toLocaleString()}
          </Typography>
          <Stack direction="row" alignItems="center" gap={0.3}>
            <Star24Filled style={{ fontSize: 13, color: "#f5a623" }} />
            <Typography
              sx={{ fontFamily: "Poppins", fontSize: 12, color: fg.tertiary }}
            >
              {item.rating}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

function MessageModal({ open, onClose }) {
  const { bg, fg, border, main } = useColor();
  const [message, setMessage] = useState("");

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: 420,
          backgroundColor: bg.primary,
          borderRadius: radiusTokens.lg,
          border: `1px solid ${border.primary}`,
          p: 3,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: 16,
              fontWeight: 700,
              color: fg.primary,
            }}
          >
            Message {STORE.name}
          </Typography>
          <IconButton size="small" onClick={onClose}>
            <Dismiss24Regular style={{ fontSize: 18, color: fg.secondary }} />
          </IconButton>
        </Stack>

        <TextField
          fullWidth
          multiline
          minRows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Hi ${STORE.name}, I'm interested in...`}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              fontFamily: "Poppins",
              fontSize: 14,
              color: fg.primary,
              "& fieldset": { borderColor: border.primary },
              "&:hover fieldset": { borderColor: main.primary },
              "&.Mui-focused fieldset": { borderColor: main.primary },
            },
          }}
        />

        <Button
          fullWidth
          disabled={!message.trim()}
          endIcon={<Send24Filled style={{ fontSize: 16 }} />}
          onClick={() => {
            // TODO: wire to real messaging API once one exists
            setMessage("");
            onClose();
          }}
          sx={{
            textTransform: "none",
            fontFamily: "Poppins",
            fontWeight: 700,
            borderRadius: radiusTokens.md,
            backgroundColor: main.primary,
            color: "#fff",
            py: 1.1,
            "&:hover": { backgroundColor: main.primary, opacity: 0.9 },
            "&.Mui-disabled": {
              backgroundColor: border.primary,
              color: fg.tertiary,
            },
          }}
        >
          Send message
        </Button>
      </Box>
    </Modal>
  );
}

export default function StorePage() {
  const { bg, fg, border, main } = useColor();
  const [tab, setTab] = useState("all");
  const [following, setFollowing] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);

  const filtered = OFFERINGS.filter((o) => tab === "all" || o.type === tab);

  return (
    <Box sx={{ backgroundColor: bg.primary }}>
      {/* banner */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 160, md: 220 },
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={STORE.banner}
          alt=""
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.35))",
          }}
        />
      </Box>

      <Box sx={{ px: { xs: spacingTokens.md, md: spacingTokens.xl } }}>
        {/* profile row — avatar pulled up with a negative margin so it overlaps the banner */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", sm: "flex-end" }}
          justifyContent="space-between"
          gap={2}
          sx={{ mt: "28px", mb: 3 }}
        >
          <Stack direction="row" alignItems="flex-end" gap={2}>
            <Box
              component="img"
              src={STORE.avatar}
              alt={STORE.name}
              sx={{
                width: 96,
                height: 96,
                borderRadius: "50%",
                objectFit: "cover",
                border: `4px solid ${bg.primary}`,
                boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
              }}
            />
            <Stack gap={0.3} sx={{ pb: 0.5 }}>
              <Stack direction="row" alignItems="center" gap={0.6}>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: 20,
                    fontWeight: 800,
                    color: fg.primary,
                  }}
                >
                  {STORE.name}
                </Typography>
                {STORE.verified && (
                  <ShieldCheckmark24Filled
                    style={{ fontSize: 18, color: "#16a34a" }}
                  />
                )}
              </Stack>
              <Typography
                sx={{ fontFamily: "Poppins", fontSize: 13, color: fg.tertiary }}
              >
                {STORE.category}
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="row" gap={1.2}>
            <Button
              onClick={() => setMessageOpen(true)}
              startIcon={<ChatMultiple24Regular style={{ fontSize: 16 }} />}
              sx={{
                textTransform: "none",
                fontFamily: "Poppins",
                fontWeight: 700,
                fontSize: 13,
                borderRadius: radiusTokens.md,
                border: `1px solid ${border.primary}`,
                color: fg.primary,
              }}
            >
              Message
            </Button>
            <Button
              onClick={() => setFollowing((f) => !f)}
              startIcon={<PersonAdd24Regular style={{ fontSize: 16 }} />}
              sx={{
                textTransform: "none",
                fontFamily: "Poppins",
                fontWeight: 700,
                fontSize: 13,
                borderRadius: radiusTokens.md,
                backgroundColor: following ? bg.secondary : main.primary,
                color: following ? fg.primary : "#fff",
                border: following ? `1px solid ${border.primary}` : "none",
                "&:hover": {
                  backgroundColor: following ? bg.secondary : main.primary,
                  opacity: 0.9,
                },
              }}
            >
              {following ? "Following" : "Follow"}
            </Button>
          </Stack>
        </Stack>

        {/* stats row */}
        <Stack direction="row" flexWrap="wrap" gap={3} sx={{ mb: 2 }}>
          <Stack direction="row" alignItems="center" gap={0.5}>
            <Star24Filled style={{ fontSize: 15, color: "#f5a623" }} />
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: 13,
                fontWeight: 700,
                color: fg.primary,
              }}
            >
              {STORE.rating}
            </Typography>
            <Typography
              sx={{ fontFamily: "Poppins", fontSize: 12.5, color: fg.tertiary }}
            >
              ({STORE.reviewCount} reviews)
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap={0.5}>
            <Location24Regular style={{ fontSize: 15, color: fg.tertiary }} />
            <Typography
              sx={{ fontFamily: "Poppins", fontSize: 12.5, color: fg.tertiary }}
            >
              {STORE.location}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap={0.5}>
            <Clock24Regular style={{ fontSize: 15, color: fg.tertiary }} />
            <Typography
              sx={{ fontFamily: "Poppins", fontSize: 12.5, color: fg.tertiary }}
            >
              Responds {STORE.responseTime}
            </Typography>
          </Stack>
          <Typography
            sx={{ fontFamily: "Poppins", fontSize: 12.5, color: fg.tertiary }}
          >
            {STORE.followers.toLocaleString()} followers · Member since{" "}
            {STORE.memberSince}
          </Typography>
        </Stack>

        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: 13.5,
            color: fg.secondary,
            lineHeight: 1.7,
            maxWidth: 640,
            mb: 4,
          }}
        >
          {STORE.bio}
        </Typography>

        {/* tabs */}
        <Stack
          direction="row"
          gap={3}
          sx={{ borderBottom: `1px solid ${border.primary}`, mb: 3 }}
        >
          {[
            { key: "all", label: "All" },
            { key: "product", label: "Products" },
            { key: "service", label: "Services" },
            { key: "reviews", label: "Reviews" },
          ].map((t) => (
            <Typography
              key={t.key}
              onClick={() => setTab(t.key)}
              sx={{
                fontFamily: "Poppins",
                fontSize: 13.5,
                fontWeight: 700,
                color: tab === t.key ? main.primary : fg.tertiary,
                cursor: "pointer",
                pb: 1.2,
                borderBottom: `2px solid ${tab === t.key ? main.primary : "transparent"}`,
              }}
            >
              {t.label}
            </Typography>
          ))}
        </Stack>

        {tab === "reviews" ? (
          <Stack gap={2} sx={{ pb: 8, maxWidth: 560 }}>
            {REVIEWS.map((r) => (
              <Stack
                key={r.name}
                direction="row"
                gap={1.5}
                sx={{
                  p: 2,
                  borderRadius: radiusTokens.md,
                  border: `1px solid ${border.primary}`,
                }}
              >
                <Box
                  component="img"
                  src={`https://images.unsplash.com/photo-${r.avatar}?auto=format&fit=crop&w=80&q=70`}
                  alt={r.name}
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                />
                <Stack gap={0.4}>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontSize: 13,
                        fontWeight: 700,
                        color: fg.primary,
                      }}
                    >
                      {r.name}
                    </Typography>
                    <Stack direction="row" gap={0.1}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star24Filled
                          key={i}
                          style={{
                            fontSize: 11,
                            color: i < r.rating ? "#f5a623" : "#d1d5db",
                          }}
                        />
                      ))}
                    </Stack>
                  </Stack>
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontSize: 13,
                      color: fg.secondary,
                    }}
                  >
                    {r.quote}
                  </Typography>
                </Stack>
              </Stack>
            ))}
          </Stack>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: spacingTokens.md,
              pb: 8,
            }}
          >
            {filtered.map((item) => (
              <OfferingCard key={item.id} item={item} />
            ))}
          </Box>
        )}
      </Box>

      <MessageModal open={messageOpen} onClose={() => setMessageOpen(false)} />
    </Box>
  );
}
