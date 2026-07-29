export const ROLES = {
  ADMIN: 1,
  SELLER: 2,
  CUSTOMER: 3,
};

export const SUBROLES = {
  PLATFORM_ADMIN: 1,
  SUPPORT_STAFF: 2,
};

// Turns a permission object into the menu/role key used by nav config.
/**
 * @param {{ role_id: any; subrole_id: any; }} permission
 */
export function getRoleKey(permission) {
  const role = permission?.role_id;
  const subrole = permission?.subrole_id;

  if (role == ROLES.ADMIN && subrole == SUBROLES.PLATFORM_ADMIN)
    return "platform_admin";
  if (role == ROLES.ADMIN && subrole == SUBROLES.SUPPORT_STAFF)
    return "support_staff";
  if (role == ROLES.SELLER) return "seller";
  if (role == ROLES.CUSTOMER) return "customer";
  return null;
}

/**
 * @param {{ role_id: any; subrole_id: any; }} permission
 */
export function getRoleBasePath(permission) {
  const role = getRoleKey(permission);
  if (role === "seller") return "/dashboard/seller";
  if (role === "customer") return "/dashboard/customer";
  if (role === "platform_admin" || role === "support_staff")
    return "/dashboard/admin";
  return "/login";
}
