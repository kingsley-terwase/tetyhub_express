import { useState } from "react";
import { Box, InputBase, IconButton } from "@mui/material";
import { Search24Regular } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radiusTokens } from "@/lib/theme";

export default function FooterSearch() {
  const { border, main } = useColor();
  const [query, setQuery] = useState("");

  const handleSubmit = (/** @type {{ preventDefault: () => void; }} */ e) => {
    e.preventDefault();
    // TODO: wire to real search route, e.g. navigate(`/search?q=${query}`)
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        alignItems: "center",
        border: `1px solid ${border.primary}`,
        borderRadius: radiusTokens.md,
        overflow: "hidden",
        maxWidth: 340,
      }}
    >
      <InputBase
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products, services..."
        sx={{ fontSize: 14, flexGrow: 1, px: spacingTokens.sm, color: "#fff" }}
      />
      <IconButton
        type="submit"
        aria-label="Search"
        sx={{
          backgroundColor: main.primary,
          borderRadius: 0,
          color: "#fff",
          px: spacingTokens.sm,
        }}
      >
        <Search24Regular style={{ fontSize: 18 }} />
      </IconButton>
    </Box>
  );
}
