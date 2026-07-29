import { Box, Stack, Typography } from "@mui/material";
import {
  CheckmarkCircleFilled,
  DismissCircleFilled,
  CircleHalfFillRegular,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";

const KF_ID = "otl-keyframes";
if (typeof document !== "undefined" && !document.getElementById(KF_ID)) {
  const s = document.createElement("style");
  s.id = KF_ID;
  s.textContent = `
    @keyframes otl-pop    { 0%{transform:scale(0);opacity:0} 70%{transform:scale(1.25)} 100%{transform:scale(1);opacity:1} }
    @keyframes otl-fill   { from{width:0} to{width:100%} }
    @keyframes otl-pulse  { 0%,100%{box-shadow:0 0 0 0 currentColor} 60%{box-shadow:0 0 0 7px transparent} }
    @keyframes otl-fadeUp { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
  `;
  document.head.appendChild(s);
}

const steps = [
  "Placed",
  "Paid",
  "Processing",
  "Packed",
  "Shipped",
  "Delivered",
];

/** @type {Record<string, number>} */
const statusStepMap = {
  pending: 1,
  processing: 3,
  shipped: 5,
  completed: 6,
  cancelled: 0,
  refunded: 0,
};

// @ts-ignore
export function OrderTimeline({ status }) {
  const { main, fg, border, bg, status: s } = useColor();

  const currentStep = statusStepMap[status] ?? 0;
  const isCancelled = status === "cancelled" || status === "refunded";
  const successColor = s?.success?.primary ?? main.success;
  const cancelColor = s?.error?.primary ?? main.error;
  const activeColor = isCancelled ? cancelColor : successColor;

  return (
    <Box sx={{ py: 1.5, px: 1 }}>
      <Stack direction="row" alignItems="flex-start">
        {steps.map((step, i) => {
          const done = !isCancelled && i < currentStep;
          const active = !isCancelled && i === currentStep - 1;
          const isLast = i === steps.length - 1;

          return (
            <Box
              key={step}
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
              }}
            >
              {/* Connector */}
              {!isLast && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 18,
                    left: "50%",
                    width: "100%",
                    height: 2,
                    backgroundColor: border.primary,
                    overflow: "hidden",
                    borderRadius: 99,
                  }}
                >
                  {done && (
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: successColor,
                        animation: `otl-fill .5s cubic-bezier(.4,0,.2,1) ${i * 80}ms both`,
                      }}
                    />
                  )}
                </Box>
              )}

              {/* Node */}
              <Box sx={{ position: "relative", zIndex: 1, mt: 0.5 }}>
                {/* Pulse ring on active step */}
                {active && (
                  <Box
                    sx={{
                      position: "absolute",
                      inset: -6,
                      borderRadius: "50%",
                      border: `2px solid ${activeColor}`,
                      opacity: 0.35,
                      animation: "otl-pulse 1.8s ease-in-out infinite",
                      color: activeColor,
                    }}
                  />
                )}

                {/* Circle */}
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: `2px solid ${done || active ? activeColor : isCancelled && i === 0 ? cancelColor : border.primary}`,
                    backgroundColor: done
                      ? `${successColor}18`
                      : active
                        ? `${activeColor}12`
                        : bg.tertiary,
                    transition: "border-color .3s, background-color .3s",
                    animation:
                      done || active
                        ? `otl-pop .45s cubic-bezier(.4,0,.2,1) ${i * 70}ms both`
                        : "none",
                  }}
                >
                  {done ? (
                    <CheckmarkCircleFilled
                      fontSize={20}
                      color={successColor}
                      style={{ display: "block" }}
                    />
                  ) : active ? (
                    <CircleHalfFillRegular
                      fontSize={20}
                      color={activeColor}
                      style={{ display: "block" }}
                    />
                  ) : isCancelled && i === 0 ? (
                    <DismissCircleFilled
                      fontSize={20}
                      color={cancelColor}
                      style={{ display: "block" }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: border.primary,
                      }}
                    />
                  )}
                </Box>
              </Box>

              {/* Step label */}
              <Typography
                variant="caption"
                sx={{
                  mt: 1,
                  textAlign: "center",
                  fontSize: 11,
                  fontWeight: active ? 700 : done ? 500 : 400,
                  color: active
                    ? fg.primary
                    : done
                      ? fg.secondary
                      : fg.tertiary,
                  letterSpacing: active ? "0.02em" : 0,
                  animation:
                    done || active
                      ? `otl-fadeUp .4s ease ${i * 70 + 100}ms both`
                      : "none",
                }}
              >
                {step}
              </Typography>

              {active && (
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: 10,
                    color: activeColor,
                    fontWeight: 600,
                    textAlign: "center",
                    mt: 0.3,
                    animation: "otl-fadeUp .4s ease 200ms both",
                  }}
                >
                  Current
                </Typography>
              )}

              {isCancelled && i === 0 && (
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: 10,
                    color: cancelColor,
                    fontWeight: 600,
                    textAlign: "center",
                    mt: 0.3,
                  }}
                >
                  {status === "refunded" ? "Refunded" : "Cancelled"}
                </Typography>
              )}
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
