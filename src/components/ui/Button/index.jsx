import { radius, spacing } from "@/lib/theme";
import { useColor } from "@/contexts/color";
import { Button as BaseButton } from "@mui/material";
import { PulseLoader } from "react-spinners";

/**
 * @param {import("@mui/material").ButtonProps & {
 *    startContent?: import("@mui/material").ButtonProps["startIcon"],
 *    endContent?: import("@mui/material").ButtonProps["endIcon"],
 *    round?: keyof radius,
 *    icon?: boolean,
 *    noShadow?: boolean,
 * }} props
 */

export default function Button({
  children,
  color,
  startContent,
  endContent,
  loading = false,
  round = 5,
  disabled,
  icon,
  sx,
  noShadow,
  ...props
}) {
  const { shadow } = useColor();

  return (
    <BaseButton
      {...props}
      className={icon ? "icon" : ""}
      color={color}
      disabled={loading || disabled}
      sx={{
        borderRadius: radius[round],
        gap: spacing[1],
        boxShadow: !noShadow && color === "secondary" ? shadow.default : "none",
        ...sx,
      }}
    >
      {startContent && startContent}
      {children}
      {loading ? (
        <PulseLoader size={10}></PulseLoader>
      ) : (
        endContent && endContent
      )}
    </BaseButton>
  );
}
