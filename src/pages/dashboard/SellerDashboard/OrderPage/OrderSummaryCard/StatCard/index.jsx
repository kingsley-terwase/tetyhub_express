import { Box, Stack, Typography } from "@mui/material";
import { useColor } from "@/contexts/color";
import { spacingTokens, radius } from "@/lib/theme";
import { Counter, AccentBar, Shimmer, useCardState } from "../animlib";

/**
 * @param {{
 *   label:     string,
 *   end:       number,
 *   prefix?:   string,
 *   sub:       string,
 *   icon:      any,
 *   iconColor: string,
 *   iconBg:    string,
 *   delay:     number,
 * }} props
 */
export function StatCard({
  label,
  end,
  prefix = "",
  sub,
  icon: Icon,
  iconColor,
  iconBg,
  delay,
}) {
  const { bg, fg, border } = useColor();
  const { ready, hovered, handlers } = useCardState(delay);

  return (
    <Box
      {...handlers}
      sx={{
        flex: 1,
        minWidth: 180,
        position: "relative",
        borderRadius: radius[8],
        overflow: "hidden",
        border: `1px solid ${hovered ? iconColor + "66" : border.primary}`,
        backgroundColor: bg.secondary,
        p: spacingTokens.md,
        cursor: "default",
        opacity: ready ? 1 : 0,
        animation: ready
          ? "osc-fadeUp .5s cubic-bezier(.4,0,.2,1) both"
          : "none",
        transition: "border-color .25s, box-shadow .25s, transform .2s",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 10px 36px ${iconColor}28, 0 2px 8px ${iconColor}14`
          : "0 1px 4px rgba(0,0,0,.05)",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          pointerEvents: "none",
          background: hovered
            ? `radial-gradient(ellipse at 80% 10%, ${iconColor}18 0%, transparent 65%)`
            : "none",
        },
      }}
    >
      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Box>
          <Typography
            variant="caption"
            sx={{ color: fg.tertiary, fontWeight: 500 }}
          >
            {label}
          </Typography>
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{
              color: fg.primary,
              mt: 0.5,
              lineHeight: 1.2,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {ready ? (
              <Counter
                end={end}
                prefix={prefix}
                duration={900 + delay * 0.4}
                ready={ready}
              />
            ) : (
              "—"
            )}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: fg.tertiary, mt: 0.5, display: "block" }}
          >
            {sub}
          </Typography>
        </Box>

        <Box
          sx={{
            p: 1.2,
            borderRadius: 2,
            flexShrink: 0,
            backgroundColor: hovered ? iconColor + "30" : iconBg,
            transition: "background-color .25s, transform .25s",
            transform: hovered ? "scale(1.15) rotate(-6deg)" : "scale(1)",
            animation: ready
              ? `osc-iconPop .65s cubic-bezier(.4,0,.2,1) ${delay + 120}ms both`
              : "none",
          }}
        >
          <Icon fontSize={22} color={iconColor} style={{ display: "block" }} />
        </Box>
      </Stack>

      <Shimmer color={iconColor} visible={hovered} />
      {ready && <AccentBar color={iconColor} delay={delay + 220} />}
    </Box>
  );
}
