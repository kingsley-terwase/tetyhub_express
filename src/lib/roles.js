// @ts-nocheck
export const ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  VENDOR: "vendor",
  VENDOR_ADMIN: "vendor_admin",
  CUSTOMER: "customer",
};

/**
 * Returns the exact role string as-is — kept literal (not collapsed) since
 * "super_admin" vs "admin" and "vendor" vs "vendor_admin" matter for display
 * purposes (e.g. the Admins list page's role labels).
 * @param {{ role?: string }} permission
 */
export function getRoleKey(permission) {
  const role = permission?.role;
  if (Object.values(ROLES).includes(role)) return role;
  return null;
}

/**
 * Groups the two admin-tier roles together. Use this anywhere the previous
 * code checked `permission?.role === ROLES.ADMIN` — that equality check
 * silently excluded plain "admin" accounts and only ever matched
 * "super_admin". Both need the same dashboard access; permission-level
 * restrictions (via Admin Permissions) handle the finer-grained difference.
 * @param {{ role?: string }} permission
 */
export function isAdminRole(permission) {
  const role = permission?.role;
  return role === ROLES.SUPER_ADMIN || role === ROLES.ADMIN;
}

/**
 * Groups the two vendor-tier roles together, same reasoning as isAdminRole.
 * @param {{ role?: string }} permission
 */
export function isVendorRole(permission) {
  const role = permission?.role;
  return role === ROLES.VENDOR || role === ROLES.VENDOR_ADMIN;
}

/** @param {{ role?: string }} permission */
export function isCustomerRole(permission) {
  return permission?.role === ROLES.CUSTOMER;
}

/**
 * @param {{ role?: string }} permission
 */
export function getRoleBasePath(permission) {
  if (isAdminRole(permission)) return "/dashboard/admin";
  if (isVendorRole(permission)) return "/dashboard/seller";
  if (isCustomerRole(permission)) return "/account";
  return "/login";
}