
import { Router, Request, Response } from "express";
import { z } from "zod";
import pool from "../config/database";

const router = Router();

// Temporary demo authorization.
// Assessment 04 mein ise JWT authentication se replace karenge.
const allowedRoles = [
  "PLATFORM_ADMIN",
  "ORGANIZATION_OWNER",
  "PROJECT_MANAGER",
];

const projectSchema = z.object({
  name: z.string().trim().min(1).max(100),
  description: z.string().trim().max(500).optional().default(""),
  category: z.string().trim().min(1).max(50),
  startDate: z.iso.date(),
  dueDate: z.iso.date(),
  priority: z.enum(["Low", "Medium", "High"]).default("Medium"),
}).refine((data) => data.dueDate >= data.startDate, {
  message: "Due date cannot be earlier than start date.",
  path: ["dueDate"],
});

// GET all projects
router.get("/", async (req: Request, res: Response) => {
  try {
    const role = req.header("x-user-role");
    const organizationId = req.header("x-organization-id");

    if (!role || !allowedRoles.includes(role)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view projects.",
      });
    }

    if (!organizationId || organizationId.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Valid organization ID is required.",
      });
    }

    const result = await pool.query(
      `SELECT id, name, description, category,
              start_date, due_date, priority,
              progress, status, created_at
       FROM projects
       WHERE organization_id = $1
       ORDER BY created_at DESC`,
      [organizationId]
    );

    return res.status(200).json({
      success: true,
      projects: result.rows,
    });
  } catch (error) {
    console.error("Fetch projects failed:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch projects.",
    });
  }
});

// POST create a project
router.post("/", async (req: Request, res: Response) => {
  try {
    const role = req.header("x-user-role");
    const organizationId = req.header("x-organization-id");
    const userId = req.header("x-user-id");

    if (!role || !allowedRoles.includes(role)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to create projects.",
      });
    }

    if (
      !organizationId ||
      organizationId.length > 100 ||
      !userId ||
      userId.length > 100
    ) {
      return res.status(400).json({
        success: false,
        message: "Valid user and organization IDs are required.",
      });
    }

    const validation = projectSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid project details.",
        errors: validation.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    const project = validation.data;

    const result = await pool.query(
      `INSERT INTO projects
        (organization_id, name, description, category,
         start_date, due_date, priority, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, name, description, category,
                 start_date, due_date, priority,
                 progress, status, created_at`,
      [
        organizationId,
        project.name,
        project.description,
        project.category,
        project.startDate,
        project.dueDate,
        project.priority,
        userId,
      ]
    );

    return res.status(201).json({
      success: true,
      message: "Project created successfully.",
      project: result.rows[0],
    });
  } catch (error) {
    console.error("Create project failed:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create project.",
    });
  }
});

export default router;
