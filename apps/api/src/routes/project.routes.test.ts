
import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import pool from "../config/database";
import app from "../app";

vi.mock("../config/database", () => ({
  default: {
    query: vi.fn(),
  },
}));

const mockQuery = vi.mocked(pool.query) as any;

const authorizedHeaders = {
  "x-user-role": "PROJECT_MANAGER",
  "x-organization-id": "org-001",
  "x-user-id": "user-001",
};

const validProject = {
  name: "Test Project",
  description: "Testing project API",
  category: "Development",
  startDate: "2026-11-24",
  dueDate: "2026-12-20",
  priority: "High",
};

describe("Projects API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch projects for an authorized user", async () => {
    mockQuery.mockResolvedValueOnce({
      rows: [{ id: 1, name: "Test Project" }],
      rowCount: 1,
      command: "SELECT",
      oid: 0,
      fields: [],
    });

    const response = await request(app)
      .get("/api/projects")
      .set(authorizedHeaders);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.projects).toHaveLength(1);
  });

  it("should reject unauthorized users", async () => {
    const response = await request(app).get("/api/projects");

    expect(response.status).toBe(403);
    expect(response.body.success).toBe(false);
    expect(mockQuery).not.toHaveBeenCalled();
  });

  it("should create a project with valid details", async () => {
    mockQuery.mockResolvedValueOnce({
      rows: [{ id: 1, ...validProject }],
      rowCount: 1,
      command: "INSERT",
      oid: 0,
      fields: [],
    });

    const response = await request(app)
      .post("/api/projects")
      .set(authorizedHeaders)
      .send(validProject);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Project created successfully.");
  });

  it("should reject an empty project name", async () => {
    const response = await request(app)
      .post("/api/projects")
      .set(authorizedHeaders)
      .send({ ...validProject, name: "   " });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(mockQuery).not.toHaveBeenCalled();
  });

  it("should reject a due date earlier than start date", async () => {
    const response = await request(app)
      .post("/api/projects")
      .set(authorizedHeaders)
      .send({
        ...validProject,
        startDate: "2026-12-20",
        dueDate: "2026-11-24",
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(mockQuery).not.toHaveBeenCalled();
  });

  it("should return a safe error when the database fails", async () => {
    mockQuery.mockRejectedValueOnce(new Error("Database connection failed"));

    const response = await request(app)
      .get("/api/projects")
      .set(authorizedHeaders);

    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Unable to fetch projects.");
  });
});
