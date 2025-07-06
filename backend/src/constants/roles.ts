export const Roles = {
  OWNER: 'Owner',
  ADMIN: 'Admin',
  MANAGER: 'Manager',
  STAFF: 'Staff',
} as const;

export type Role = typeof Roles[keyof typeof Roles];