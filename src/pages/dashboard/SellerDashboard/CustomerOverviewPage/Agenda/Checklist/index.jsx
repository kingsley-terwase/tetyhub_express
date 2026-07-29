import { Checkbox } from "@/components/ui";
import { spacingTokens } from "@/lib/theme";
import { useColor } from "@/contexts/color";
import { CheckmarkCircleFilled } from "@fluentui/react-icons";
import { Stack, Typography } from "@mui/material";
import { useState } from "react";

const checklist = [
  "BMG Project Meeting at 5:00 PM WAT",
  "Document end points after every update",
  "BMG Project Meeting at 5:00 PM WAT",
];

export default function Checklist() {
  const { fg: _fg, main } = useColor();
  const [checked, setChecked] = useState(checklist.map(() => false));

  const fg = _fg.primary;

  const handleCheck = (/** @type {number} */ index) => {
    setChecked((prev) => prev.map((val, i) => (i === index ? !val : val)));
  };

  return (
    <Stack gap={spacingTokens.lg}>
      <Stack direction="row" alignItems="center" gap={spacingTokens.md}>
        <CheckmarkCircleFilled fontSize={22} color={fg} />
        <Typography color={fg} fontWeight={600}>
          Check List
        </Typography>
      </Stack>
      <Stack gap={spacingTokens.md}>
        {checklist.map((item, index) => (
          <Stack key={index} alignItems="center" direction="row" gap={spacingTokens.md}>
            <Checkbox
              accent={main.success}
              checked={checked[index]}
              onCheck={() => handleCheck(index)}
            />
            <Typography color={fg}>{item}</Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
