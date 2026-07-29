import { Checkbox } from "@/components/ui";
import { spacingTokens } from "@/lib/theme";
import { useColor } from "@/contexts/color";
import { AlertFilled } from "@fluentui/react-icons";
import { Stack, Typography } from "@mui/material";
import { useState } from "react";

const reminders = [
  "BMG Project Meeting at 5:00 PM WAT",
  "Document end points after every update",
  "BMG Project Meeting at 5:00 PM WAT",
];

export default function Reminders() {
  const { fg: _fg } = useColor();
  const [checked, setChecked] = useState(reminders.map(() => false));

  const fg = _fg.primary;

  const handleCheck = (/** @type {number} */ index) => {
    setChecked((prev) => prev.map((val, i) => (i === index ? !val : val)));
  };

  return (
    <Stack gap={spacingTokens.lg}>
      <Stack direction="row" alignItems="center" gap={spacingTokens.md}>
        <AlertFilled fontSize={22} color={fg} />
        <Typography color={fg} fontWeight={600}>
          Reminders
        </Typography>
      </Stack>
      <Stack gap={spacingTokens.md}>
        {reminders.map((item, index) => (
          <Stack key={index} alignItems="center" direction="row" gap={spacingTokens.md}>
            <Checkbox accent={fg} checked={checked[index]} onCheck={() => handleCheck(index)} />
            <Typography>{item}</Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
