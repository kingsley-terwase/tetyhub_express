import { useAuthStore } from "@/store/auth";
import { getRoleKey } from "@/lib/roles";
import {
  DocumentLandscapeDataRegular,
  FormRegular,
  GlanceRegular,
  SettingsRegular,
  WrenchSettingsRegular,
  CircleSparkleRegular,
  PersonRegular,
  PersonStarRegular,
  ShoppingBagRegular,
} from "@fluentui/react-icons";

/** @typedef {import("@/types/global.d.js").NavItem & { color?: string }} NavItemProps */

export function useNavigationMenu() {
  const { permission } = useAuthStore.getState();

  /** @type {string} */
  // @ts-ignore
  const role = getRoleKey(permission) ?? "";

  /** @type {Record<string, NavItemProps[]>} */
  const menu = {
    platform_admin: [
      { label: "Overview", path: "/dashboard/admin", icon: GlanceRegular },
      {
        label: "Seller Approvals",
        path: "/dashboard/admin/seller-approvals",
        icon: PersonStarRegular,
      },
      {
        label: "Listing Moderation",
        path: "/dashboard/admin/listing-moderation",
        icon: DocumentLandscapeDataRegular,
      },
      {
        label: "Orders",
        path: "/dashboard/admin/orders",
        icon: ShoppingBagRegular,
      },
      { label: "Settings", path: "/settings/account", icon: SettingsRegular },
    ],

    support_staff: [
      { label: "Overview", path: "/dashboard/admin", icon: GlanceRegular },
      {
        label: "Seller Approvals",
        path: "/dashboard/admin/seller-approvals",
        icon: PersonStarRegular,
      },
      {
        label: "Listing Moderation",
        path: "/dashboard/admin/listing-moderation",
        icon: DocumentLandscapeDataRegular,
      },
      {
        label: "Orders",
        path: "/dashboard/admin/orders",
        icon: ShoppingBagRegular,
      },
    ],

    seller: [
      { label: "Overview", path: "/dashboard/seller", icon: GlanceRegular },
      {
        label: "Products",
        color: "#3B009D",
        path: "/dashboard/seller/products",
        icon: FormRegular,
      },
      {
        label: "Campaign",
        color: "#F1592A",
        path: "/dashboard/seller/campaign",
        icon: WrenchSettingsRegular,
      },
      {
        label: "Services",
        color: "#00FF5E",
        path: "/dashboard/seller/services",
        icon: DocumentLandscapeDataRegular,
      },
      {
        label: "Ai",
        color: "#ff0099",
        path: "/dashboard/seller/ai",
        icon: CircleSparkleRegular,
      },
      {
        label: "Orders",
        color: "#ff8800",
        path: "/dashboard/seller/orders",
        icon: ShoppingBagRegular,
      },
      {
        label: "Customers",
        color: "#b308de",
        path: "/dashboard/seller/customers",
        icon: PersonRegular,
      },
    ],

    customer: [
      { label: "Overview", path: "/dashboard/customer", icon: GlanceRegular },
      {
        label: "Orders",
        path: "/dashboard/customer/orders",
        icon: ShoppingBagRegular,
      },
    ],
  };

  return menu[role] ?? [];
}

export function useSettingsMenu() {
  const { permission } = useAuthStore.getState();

  /** @type {string} */
  // @ts-ignore
  const role = getRoleKey(permission) ?? "";

  /** @type {Record<string, NavItemProps[]>} */
  const menu = {
    platform_admin: [
      { label: "Account", path: "/settings/account", icon: PersonRegular },
    ],
    seller: [
      { label: "Account", path: "/settings/account", icon: PersonRegular },
    ],
    customer: [
      { label: "Account", path: "/settings/account", icon: PersonRegular },
    ],
  };

  return menu[role] ?? [];
}
