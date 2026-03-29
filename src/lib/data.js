import {
  BuildingRegular,
  GlanceRegular,
  PersonRegular,
  PersonStarRegular,
  CubeRegular,
  DocumentLandscapeDataRegular,
  WrenchSettingsRegular,
  CircleSparkleRegular,
} from "@fluentui/react-icons";

/** @type {Record<string, import("@mui/material").ChipProps["color"]>} */
export const TASK_STATUS_VARIANT = {
  done: "success",
  "in-progress": "primary",
  "to-do": "warning",
  overdue: "error",
  cancelled: "default",
};

/** @type {Record<string, import("@mui/material").ChipProps["color"]>} */
export const TASK_PRIORITY_VARIANT = {
  low: "info",
  urgent: "error",
  high: "warning",
  medium: "primary",
};

/** @type {Record<string, import("@mui/material").ChipProps["color"]>} */
export const COMPANY_STATUS_VARIANT = {
  lead: "success",
  customer: "primary",
  prospect: "warning",
};

/** @type {Record<string, Omit<import("@/types/global.d.js").NavItem, "path" | "sub">>} */
export const namedRoutes = {
  "/": {
    label: "Overview",
    icon: GlanceRegular,
  },
  "/products": {
    label: "Products",
    icon: CubeRegular,
  },
  "/campaign": {
    label: "Campaign",
    icon: WrenchSettingsRegular,
  },
  "/services": {
    label: "Services",
    icon: DocumentLandscapeDataRegular,
  },
  "/ai": {
    label: "Ai",
    icon: CircleSparkleRegular,
  },
  "/settings/account": {
    label: "Account",
    icon: PersonRegular,
  },
  "/settings/company/general": {
    label: "Company",
    icon: BuildingRegular,
  },
  "/admins": {
    label: "Admins",
    icon: PersonStarRegular,
  },
};
/** @type {any} */
export const ROLES = {
  "1:1": "platform_super_admin",
};
