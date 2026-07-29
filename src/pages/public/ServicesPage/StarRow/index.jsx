// @ts-nocheck
import { Stack } from "@mui/material";
import { Star24Filled } from "@fluentui/react-icons";

export default function StarRow({ rating, size = 16 }) {
  return (
    <Stack direction="row" gap={0.2}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star24Filled
          key={i}
          style={{ fontSize: size, color: i < rating ? "#f5a623" : "#d1d5db" }}
        />
      ))}
    </Stack>
  );
}
