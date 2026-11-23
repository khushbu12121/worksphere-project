
import { describe, it, expect } from "vitest";
import { hasPermission } from "./permissions";

describe("Role-based permissions", () => {
  it("should allow Team Members to view projects", () => {
    expect(hasPermission("TEAM_MEMBER", "VIEW_PROJECTS")).toBe(true);
  });

  it("should not allow Team Members to view analytics", () => {
    expect(hasPermission("TEAM_MEMBER", "VIEW_ANALYTICS")).toBe(false);
  });

  it("should allow Project Managers to create projects", () => {
    expect(hasPermission("PROJECT_MANAGER", "CREATE_PROJECT")).toBe(true);
  });

  it("should allow Auditors to view analytics", () => {
    expect(hasPermission("AUDITOR", "VIEW_ANALYTICS")).toBe(true);
  });

  it("should not allow Auditors to create projects", () => {
    expect(hasPermission("AUDITOR", "CREATE_PROJECT")).toBe(false);
  });
});
