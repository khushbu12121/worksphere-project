
export type Role =
  | "PLATFORM_ADMIN"
  | "ORGANIZATION_OWNER"
  | "PROJECT_MANAGER"
  | "TEAM_MEMBER"
  | "AUDITOR";

export const currentUser = {
  id: "user-001",
  name: "Khushbu Bansal",
  role: "PROJECT_MANAGER" as Role,
};

export const roleLabels: Record<Role, string> = {
  PLATFORM_ADMIN: "Platform Admin",
  ORGANIZATION_OWNER: "Organization Owner",
  PROJECT_MANAGER: "Project Manager",
  TEAM_MEMBER: "Team Member",
  AUDITOR: "Auditor",
};
