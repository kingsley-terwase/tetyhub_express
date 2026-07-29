import { useContext } from "react";
import { radiusTokens, spacingTokens } from "@/lib/theme";
import { ColorContext } from "../color";

/**
 * Returns all sx style objects for AddProductModal components,
 * sourced exclusively from the app's ColorContext theme tokens.
 */
export function useProductStyles() {
  // @ts-ignore
  const { bg, fg, border, input, main, button, elevate, shadow, status } =
    useContext(ColorContext);

  const PRIMARY = main.primary;
  const inputBg = input.outlined.default.bg;
  const inputFg = input.outlined.default.fg;
  const inputPlaceholder = input.outlined.default.placeholder;
  const surfaceBg = bg.secondary;

  const sectionLabelRow = { mb: 1.5 };

  const sectionLabelIcon = {
    fontSize: 15,
    color: PRIMARY,
    flexShrink: 0,
  };

  const sectionLabelText = {
    fontWeight: 700,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    fontSize: 10.5,
    color: fg.secondary,
  };

  const fieldLabel = {
    fontSize: 12,
    fontWeight: 600,
    mb: 0.5,
    color: fg.secondary,
  };

  const fieldLabelHint = {
    ml: 0.75,
    color: fg.disabled,
    fontWeight: 400,
  };

  const fieldLabelRequired = { color: status.error.primary };

  const progressPill = {
    display: "flex",
    alignItems: "center",
    gap: 1,
    px: 1.5,
    py: 0.6,
    borderRadius: radiusTokens["5xl"],
    bgcolor: elevate.primary,
    minWidth: 110,
  };

  const progressBar = (/** @type {number} */ progress) => ({
    flex: 1,
    height: 5,
    borderRadius: radiusTokens["5xl"],
    bgcolor: border.primary,
    "& .MuiLinearProgress-bar": {
      borderRadius: radiusTokens["5xl"],
      bgcolor: progress === 100 ? status.success.primary : PRIMARY,
    },
  });

  const cancelBtn = {
    borderRadius: radiusTokens.md,
    borderColor: border.primary,
    color: fg.secondary,
  };

  const publishBtn = {
    borderRadius: radiusTokens.md,
    py: 2.75,
    px: 2,
    bgcolor: PRIMARY,
    color: button.primary.default.fg.normal,
    fontWeight: 600,
    "&:hover": { bgcolor: PRIMARY },
  };

  // ─── ProductMediaSection ───────────────────────────────────────
  const dropZone = (
    /** @type {any} */ dragOver,
    /** @type {any} */ hasImages,
  ) => ({
    border: "2px dashed",
    borderColor: dragOver ? PRIMARY : border.primary,
    borderRadius: radiusTokens.lg,
    p: 3,
    textAlign: "center",
    cursor: "pointer",
    bgcolor: dragOver ? bg.primary : surfaceBg,
    transition: "all 0.2s ease",
    "&:hover": { borderColor: PRIMARY, bgcolor: bg.primary },
    display: hasImages ? "none" : "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 1,
  });

  const dropZoneIcon = { fontSize: 32, color: fg.disabled };

  const dropZoneBrowse = { color: PRIMARY, fontWeight: 700 };

  const dropZoneHint = { color: fg.disabled };

  const thumbnailBox = (/** @type {any} */ isCover) => ({
    position: "relative",
    aspectRatio: "1/1",
    borderRadius: radiusTokens.xl,
    overflow: "hidden",
    border: isCover ? `2px solid ${PRIMARY}` : `2px solid ${border.primary}`,
    "&:hover .remove-btn": { opacity: 1 },
  });

  const thumbnailImg = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  };

  const coverChip = {
    position: "absolute",
    bottom: 6,
    left: 6,
    fontSize: 10,
    height: 18,
    bgcolor: PRIMARY,
    color: button.primary.default.fg.normal,
    fontWeight: 700,
  };

  const removeBtn = {
    position: "absolute",
    top: 5,
    right: 5,
    bgcolor: "rgba(0,0,0,0.55)",
    borderRadius: radiusTokens["5xl"],
    width: 22,
    height: 22,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    opacity: 0,
    transition: "opacity 0.15s",
    backdropFilter: "blur(4px)",
  };

  const removeBtnIcon = { fontSize: 11, color: "#fff" };

  const addMoreTile = {
    aspectRatio: "1/1",
    borderRadius: radiusTokens.xl,
    border: "2px dashed",
    borderColor: border.primary,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 0.5,
    cursor: "pointer",
    bgcolor: surfaceBg,
    "&:hover": { borderColor: PRIMARY, bgcolor: bg.primary },
    transition: "all 0.2s",
  };

  const addMoreIcon = { fontSize: 20, color: fg.disabled };

  // ─── BasicInfoSection ──────────────────────────────────────────
  const statusDot = (/** @type {any} */ color) => ({
    width: 7,
    height: 7,
    borderRadius: radiusTokens["5xl"],
    bgcolor: color,
    flexShrink: 0,
  });

  const charCounter = {
    color: fg.disabled,
    fontSize: 11,
  };

  const descCharCounter = {
    mt: 0.5,
    textAlign: "right",
    color: fg.disabled,
    fontSize: 11,
  };

  // ─── PricingSection ────────────────────────────────────────────
  const discountBadge = {
    mt: 1.5,
    px: 1.5,
    py: 0.75,
    borderRadius: radiusTokens.md,
    bgcolor: status.success.primary + "18",
    border: `1px solid ${status.success.primary}40`,
    display: "inline-flex",
    alignItems: "center",
    gap: 0.75,
  };

  const discountIcon = { fontSize: 13, color: status.success.primary };

  const discountText = { color: status.success.primary };

  const currencySymbol = {
    fontWeight: 600,
    fontSize: 13,
    color: fg.secondary,
  };

  // ─── InventorySection ──────────────────────────────────────────
  const availabilityToggleBtn = {
    borderRadius: `${radiusTokens.md} !important`,
    textTransform: "none",
    fontSize: 12,
    fontWeight: 600,
    px: 1.5,
    border: `1.5px solid ${border.primary}`,
    color: fg.secondary,
    bgcolor: surfaceBg,
    "&.Mui-selected": {
      bgcolor: PRIMARY,
      color: button.primary.default.fg.normal,
      borderColor: PRIMARY,
      "&:hover": { bgcolor: PRIMARY },
    },
  };

  const weightUnitSelect = {
    fontSize: 12,
    fontWeight: 600,
    color: fg.secondary,
    minWidth: 36,
  };

  const unitLabel = { color: fg.disabled, fontSize: 12 };

  // ─── OrganisationSection / TagInput ───────────────────────────
  const tagInputWrapper = {
    border: `1px solid ${border.primary}`,
    borderRadius: radiusTokens.md,
    px: 1.25,
    py: 0.75,
    display: "flex",
    flexWrap: "wrap",
    gap: 0.5,
    alignItems: "center",
    minHeight: 46,
    cursor: "text",
    bgcolor: inputBg,
    "&:focus-within": {
      borderColor: PRIMARY,
      borderWidth: "2px",
    },
    transition: "border-color 0.15s",
  };

  const tagChip = {
    fontSize: 11,
    height: 22,
    bgcolor: elevate.primary,
    color: fg.primary,
    fontWeight: 600,
    border: `1px solid ${border.primary}`,
    ".MuiChip-icon": { ml: "6px" },
    ".MuiChip-deleteIcon": { color: fg.disabled },
  };

  const tagChipIcon = { fontSize: 11, color: fg.secondary };

  const tagNativeInput = {
    border: "none",
    outline: "none",
    fontSize: 13,
    flex: 1,
    minWidth: 120,
    bgcolor: "transparent",
    color: inputFg,
    fontFamily: "inherit",
    "&::placeholder": { color: inputPlaceholder },
  };

  const tagCount = { color: fg.disabled, fontSize: 11 };

  // ─── VisibilitySection ─────────────────────────────────────────
  const featuredToggleBtn = (/** @type {string} */ value) => ({
    flex: 1,
    textTransform: "none",
    fontSize: 12,
    fontWeight: 600,
    color: fg.secondary,
    "&.Mui-selected": {
      bgcolor:
        value === "yes" ? status.warning.primary + "22" : elevate.primary,
      color: value === "yes" ? status.warning.primary : fg.primary,
      borderColor:
        value === "yes" ? status.warning.primary + "66" : border.primary,
    },
  });

  const divider = { borderColor: border.secondary };
  const sectionWrapper = { width: "100%" };

  const pageInner = {
    maxWidth: 900,
    mx: "auto",
    display: "flex",
    flexDirection: "column",
    gap: spacingTokens.lg,
  };

  const pageHeader = {
    pb: spacingTokens.md,
    borderBottom: `1px solid ${border.primary}`,
  };

  const pageTitle = {
    fontSize: 20,
    fontWeight: 700,
    color: fg.primary,
    lineHeight: 1.3,
  };

  const pageCaption = {
    fontSize: 13,
    color: fg.secondary,
    mt: 0.5,
  };

  const pageCard = {
    bgcolor: bg.tertiary,
    border: `1px solid ${border.primary}`,
    borderRadius: radiusTokens["3xl"],
    boxShadow: shadow.spreadSoft,
    overflow: "hidden",
  };

  const pageCardInner = {
    px: { xs: spacingTokens.md, md: spacingTokens.lg },
    py: spacingTokens.lg,
    display: "flex",
    flexDirection: "column",
    gap: spacingTokens.lg,
  };

  const pageActions = {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: spacingTokens.sm,
    pt: spacingTokens.md,
    borderTop: `1px solid ${border.primary}`,
    mt: spacingTokens.md,
  };

  return {
    sectionLabelRow,
    sectionLabelIcon,
    sectionLabelText,
    fieldLabel,
    fieldLabelHint,
    fieldLabelRequired,
    progressPill,
    progressBar,
    cancelBtn,
    publishBtn,
    dropZone,
    dropZoneIcon,
    dropZoneBrowse,
    dropZoneHint,
    thumbnailBox,
    thumbnailImg,
    coverChip,
    removeBtn,
    removeBtnIcon,
    addMoreTile,
    addMoreIcon,
    statusDot,
    charCounter,
    descCharCounter,
    discountBadge,
    discountIcon,
    discountText,
    currencySymbol,
    availabilityToggleBtn,
    weightUnitSelect,
    unitLabel,
    tagInputWrapper,
    tagChip,
    tagChipIcon,
    tagNativeInput,
    tagCount,
    featuredToggleBtn,
    divider,
    sectionWrapper,
    pageInner,
    pageHeader,
    pageTitle,
    pageCaption,
    pageCard,
    pageCardInner,
    pageActions,
  };
}
