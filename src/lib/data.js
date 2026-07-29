import {
  GlanceRegular,
  PersonRegular,
  PersonStarRegular,
  CubeRegular,
  DocumentLandscapeDataRegular,
  WrenchSettingsRegular,
  CircleSparkleRegular,
  ShoppingBagRegular,
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
    label: "Home",
    icon: GlanceRegular,
  },
  "/dashboard/admin": {
    label: "Overview",
    icon: GlanceRegular,
  },
  "/dashboard/admin/seller-approvals": {
    label: "Seller Approvals",
    icon: PersonStarRegular,
  },
  "/dashboard/admin/listing-moderation": {
    label: "Listing Moderation",
    icon: DocumentLandscapeDataRegular,
  },
  "/dashboard/admin/orders": {
    label: "Orders",
    icon: ShoppingBagRegular,
  },
  "/dashboard/admin/orders/:id": {
    label: "Orders",
    icon: ShoppingBagRegular,
  },
  "/dashboard/seller": {
    label: "Overview",
    icon: GlanceRegular,
  },
  "/dashboard/seller/products": {
    label: "Products",
    icon: CubeRegular,
  },
  "/dashboard/seller/products/add": {
    label: "Add Product",
    icon: CubeRegular,
  },
  "/dashboard/seller/products/:id/edit": {
    label: "Edit Product",
    icon: CubeRegular,
  },
  "/dashboard/seller/campaign": {
    label: "Campaign",
    icon: WrenchSettingsRegular,
  },
  "/dashboard/seller/services": {
    label: "Services",
    icon: DocumentLandscapeDataRegular,
  },
  "/dashboard/seller/ai": {
    label: "Ai",
    icon: CircleSparkleRegular,
  },
  "/dashboard/seller/orders": {
    label: "Orders",
    icon: ShoppingBagRegular,
  },
  "/dashboard/seller/orders/:id": {
    label: "Orders",
    icon: ShoppingBagRegular,
  },
  "/dashboard/seller/create-order": {
    label: "Create Order",
    icon: ShoppingBagRegular,
  },
  "/dashboard/seller/customers": {
    label: "Customers",
    icon: PersonRegular,
  },
  "/dashboard/customer": {
    label: "Overview",
    icon: GlanceRegular,
  },
  "/dashboard/customer/orders": {
    label: "Orders",
    icon: ShoppingBagRegular,
  },
  "/dashboard/customer/orders/:id": {
    label: "Orders",
    icon: ShoppingBagRegular,
  },
  "/settings/account": {
    label: "Account",
    icon: PersonRegular,
  },
};
