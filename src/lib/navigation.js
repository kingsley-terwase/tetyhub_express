import { useAuthStore } from "@/store/auth";
import { isAdminRole, isVendorRole, isCustomerRole } from "@/lib/roles";
import {
  DocumentLandscapeDataRegular,
  FormRegular,
  SettingsRegular,
  WrenchSettingsRegular,
  CircleSparkleRegular,
  PersonRegular,
  GlanceRegular,
  ShoppingBagRegular,
  StarRegular,
  MailRegular,
  MegaphoneRegular,
  ChatRegular,
  GridRegular,
  CurrencyDollarRupeeRegular,
  PersonAvailableRegular,
  StoreMicrosoftRegular,
  ImageMultipleRegular,
  WalletRegular,
  WarningRegular,
  ImageRegular,
  TagRegular,
  DocumentTextRegular,
  HistoryRegular,
  DataBarVerticalRegular,
  CubeRegular,
} from "@fluentui/react-icons";

/** @typedef {import("@/types/global.d.js").NavItem & { color?: string }} NavItemProps */

/**
 * Menus are keyed by tier ("admin", "vendor", "customer"), not by the
 * literal role string. super_admin and admin share the "admin" tier's
 * dashboard nav (finer-grained access is handled by Admin Permissions);
 * vendor and vendor_admin share the "vendor" tier's nav the same way.
 * @type {Record<string, NavItemProps[]>}
 */
const MENUS = {
  admin: [
    {
      label: "Overview",
      path: "/dashboard/admin",
      color: "#fff",
      icon: GridRegular,
    },
    {
      label: "Seller Approvals",
      path: "/dashboard/admin/seller-approvals",
      color: "#ddac0a",
      icon: PersonAvailableRegular,
    },
    {
      label: "Admin",
      path: "/dashboard/admin/admins",
      color: "#90f50b",
      icon: PersonAvailableRegular,
    },
    {
      label: "Admin Roles",
      path: "/dashboard/admin/admin-roles",
      color: "#f50b64",
      icon: PersonAvailableRegular,
    },
    {
      label: "Categories",
      path: "/dashboard/admin/categories",
      color: "#0bf5c2",
      icon: CubeRegular,
    },
    {
      label: "Subcategories",
      path: "/dashboard/admin/sub_categories",
      color: "#ac78ac",
      icon: CubeRegular,
    },
    {
      label: "Childcategories",
      path: "/dashboard/admin/child_categories",
      color: "#205bb4",
      icon: CubeRegular,
    },
    {
      label: "Seller Directories",
      path: "/dashboard/admin/seller-directory",
      color: "#F1592A",
      icon: StoreMicrosoftRegular,
    },
    {
      label: "Buyer Directories",
      path: "/dashboard/admin/buyer-directory",
      color: "#ff13a8",
      icon: PersonRegular,
    },
    {
      label: "Listing Moderation",
      path: "/dashboard/admin/listing-moderation",
      color: "#4dff00",
      icon: ImageMultipleRegular,
    },
    {
      label: "Orders",
      path: "/dashboard/admin/orders",
      icon: ShoppingBagRegular,
    },
    {
      label: "Payments",
      path: "/dashboard/admin/payments",
      color: "#f717ff",
      icon: WalletRegular,
    },
    {
      label: "Promotions",
      path: "/dashboard/admin/promotions",
      color: "#0cf5f1",
      icon: TagRegular,
    },
    {
      label: "Currency",
      path: "/dashboard/admin/currency",
      color: "#afa652",
      icon: CurrencyDollarRupeeRegular,
    },
    {
      label: "Kyc",
      path: "/dashboard/admin/kyc",
      color: "#b57bc1",
      icon: DocumentTextRegular,
    },
    {
      label: "Activity Log",
      path: "/dashboard/admin/activity-log",
      color: "#f50c8a",
      icon: HistoryRegular,
    },
    {
      label: "Analytics",
      path: "/dashboard/admin/analytics",
      color: "#cd003a",
      icon: DataBarVerticalRegular,
    },
    {
      label: "Content Management",
      path: "/dashboard/admin/content-management",
      color: "#2bff0b",
      icon: ImageRegular,
    },
    {
      label: "Announcements",
      path: "/dashboard/admin/announcements",
      color: "#37aeb9",
      icon: MegaphoneRegular,
    },
    {
      label: "Disputes",
      path: "/dashboard/admin/disputes",
      color: "#db0000",
      icon: WarningRegular,
    },
    {
      label: "Reviews",
      path: "/dashboard/admin/reviews",
      color: "#e9f50c",
      icon: StarRegular,
    },
    {
      label: "Support Tickets",
      path: "/dashboard/admin/support-tickets",
      color: "#a41cff",
      icon: ChatRegular,
    },
    {
      label: "Settings",
      path: "/dashboard/admin/settings",
      icon: SettingsRegular,
    },
  ],

  vendor: [
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
    {
      label: "Listings",
      color: "#84f50c",
      path: "/dashboard/seller/listings",
      icon: ShoppingBagRegular,
    },
    {
      label: "Messages",
      color: "#f50cda",
      path: "/dashboard/seller/messages",
      icon: MailRegular,
    },
    {
      label: "Promotions",
      color: "#0cf5f1",
      path: "/dashboard/seller/promotions",
      icon: MegaphoneRegular,
    },
    {
      label: "Reviews",
      color: "#e9f50c",
      path: "/dashboard/seller/reviews",
      icon: StarRegular,
    },
    {
      label: "Seller Settings",
      color: "#f50c5a",
      path: "/dashboard/seller/seller-settings",
      icon: SettingsRegular,
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

export function useNavigationMenu() {
  // @ts-ignore
  const { permission } = useAuthStore.getState();

  if (isAdminRole(permission)) return MENUS.admin;
  if (isVendorRole(permission)) return MENUS.vendor;
  if (isCustomerRole(permission)) return MENUS.customer;
  return [];
}

const SETTINGS_MENU = [
  { label: "Account", path: "/settings/account", icon: PersonRegular },
];

export function useSettingsMenu() {
  // @ts-ignore
  const { permission } = useAuthStore.getState();

  // Same "Account" item for every tier today; kept as a lookup (rather than
  // returning SETTINGS_MENU unconditionally) so a role-specific settings
  // item can be added per tier later without changing callers.
  if (isAdminRole(permission)) return SETTINGS_MENU;
  if (isVendorRole(permission)) return SETTINGS_MENU;
  if (isCustomerRole(permission)) return SETTINGS_MENU;
  return [];
}