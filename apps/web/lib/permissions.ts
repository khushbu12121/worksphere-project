
import type { Role } from "./user";

export type Permission =
  | "VIEW_OVERVIEW"
  | "VIEW_PROJECTS"
  | "CREATE_PROJECT"
  | "VIEW_TASKS"
  | "VIEW_TEAM"
  | "VIEW_ANALYTICS"
  | "VIEW_SETTINGS"
  | "VIEW_HELP";

const rolePermissions: Record<Role, Permission[]> = {
  PLATFORM_ADMIN: [
    "VIEW_OVERVIEW",
    "VIEW_PROJECTS",
    "CREATE_PROJECT",
    "VIEW_TASKS",
    "VIEW_TEAM",
    "VIEW_ANALYTICS",
    "VIEW_SETTINGS",
    "VIEW_HELP",
  ],

  ORGANIZATION_OWNER: [
    "VIEW_OVERVIEW",
    "VIEW_PROJECTS",
    "CREATE_PROJECT",
    "VIEW_TASKS",
    "VIEW_TEAM",
    "VIEW_ANALYTICS",
    "VIEW_SETTINGS",
    "VIEW_HELP",
  ],

  PROJECT_MANAGER: [
    "VIEW_OVERVIEW",
    "VIEW_PROJECTS",
    "CREATE_PROJECT",
    "VIEW_TASKS",
    "VIEW_TEAM",
    "VIEW_ANALYTICS",
    "VIEW_SETTINGS",
    "VIEW_HELP",
  ],

  TEAM_MEMBER: [
    "VIEW_OVERVIEW",
    "VIEW_PROJECTS",
    "VIEW_TASKS",
    "VIEW_SETTINGS",
    "VIEW_HELP",
  ],

  AUDITOR: [
    "VIEW_OVERVIEW",
    "VIEW_ANALYTICS",
    "VIEW_HELP",
  ],
};

export function hasPermission(
  role: Role,
  permission: Permission
): boolean {
  return rolePermissions[role].includes(permission);
}

export function getPermissions(role: Role): Permission[] {
  return rolePermissions[role];
}
