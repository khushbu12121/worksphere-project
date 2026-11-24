
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";

import ProjectsPage from "./page";
import { currentUser } from "@/lib/user";
import {
  fetchProjects,
  createProject,
} from "@/lib/projects-api";

vi.mock("@/components/layout/MainLayout", () => ({
  default: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

vi.mock("@/lib/user", () => ({
  currentUser: {
    id: "test-user",
    name: "Test User",
    role: "PROJECT_MANAGER",
  },
  roleLabels: {},
}));

vi.mock("@/lib/projects-api", () => ({
  fetchProjects: vi.fn(),
  createProject: vi.fn(),
}));

const sampleProjects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Redesign company website",
    category: "Design",
    start_date: "2026-11-01",
    due_date: "2026-11-25",
    priority: "High" as const,
    progress: 75,
    status: "In Progress" as const,
    created_at: "2026-11-01T10:00:00.000Z",
  },
  {
    id: 2,
    name: "Mobile App Development",
    description: "Build mobile application",
    category: "Development",
    start_date: "2026-11-01",
    due_date: "2026-12-02",
    priority: "Medium" as const,
    progress: 45,
    status: "In Progress" as const,
    created_at: "2026-11-01T10:00:00.000Z",
  },
  {
    id: 3,
    name: "Marketing Campaign",
    description: "Marketing campaign",
    category: "Marketing",
    start_date: "2026-11-01",
    due_date: "2026-11-23",
    priority: "Low" as const,
    progress: 90,
    status: "In Progress" as const,
    created_at: "2026-11-01T10:00:00.000Z",
  },
  {
    id: 4,
    name: "Database Optimization",
    description: "Optimize database",
    category: "Development",
    start_date: "2026-11-01",
    due_date: "2026-11-20",
    priority: "High" as const,
    progress: 100,
    status: "Completed" as const,
    created_at: "2026-11-01T10:00:00.000Z",
  },
];

describe("Projects Page", () => {
  beforeEach(() => {
  vi.clearAllMocks();

  currentUser.role = "PROJECT_MANAGER";

  vi.mocked(fetchProjects).mockResolvedValue(sampleProjects);

  vi.mocked(createProject).mockImplementation(async (payload) => ({
    id: 5,
    name: payload.name,
    description: payload.description,
    category: payload.category,
    start_date: payload.startDate,
    due_date: payload.dueDate,
    priority: payload.priority,
    progress: 0,
    status: "In Progress",
    created_at: "2026-11-23T10:00:00.000Z",
  }));
});

  async function waitForProjectsToLoad() {
    await screen.findByText("Website Redesign");
  }

  // 1. Render Projects page
  it("should render the Projects page and existing projects", async () => {
    render(<ProjectsPage />);

    expect(
      screen.getByRole("heading", { name: "Projects" })
    ).toBeInTheDocument();

    await waitForProjectsToLoad();

    expect(screen.getByText("Mobile App Development")).toBeInTheDocument();
  });

  // 2. Open Create Project modal
  it("should open the Create Project modal", async () => {
    const user = userEvent.setup();

    render(<ProjectsPage />);

    await user.click(
      screen.getByRole("button", { name: /new project/i })
    );

    expect(
      screen.getByRole("dialog", { name: /create new project/i })
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByLabelText(/project name/i)).toHaveFocus();
    });
  });

  // 3. Create project with valid details
  it("should create a project with valid details", async () => {
    const user = userEvent.setup();

    render(<ProjectsPage />);

    await user.click(
      screen.getByRole("button", { name: /new project/i })
    );

    await user.type(
      screen.getByLabelText(/project name/i),
      "WorkSphere Testing"
    );

    await user.type(
      screen.getByLabelText(/category/i),
      "Development"
    );

    fireEvent.change(screen.getByLabelText(/start date/i), {
      target: { value: "2026-11-24" },
    });

    fireEvent.change(screen.getByLabelText(/due date/i), {
      target: { value: "2026-11-30" },
    });

    await user.click(
      screen.getByRole("button", { name: /^create project$/i })
    );

    expect(
      await screen.findByText("WorkSphere Testing")
    ).toBeInTheDocument();

    expect(screen.getByRole("status")).toHaveTextContent(
      "Project created successfully"
    );

    expect(createProject).toHaveBeenCalledTimes(1);
  });

  // 4. Reject whitespace-only project name
  it("should show an error when the project name contains only spaces", async () => {
    const user = userEvent.setup();

    render(<ProjectsPage />);

    await user.click(
      screen.getByRole("button", { name: /new project/i })
    );

    await user.type(screen.getByLabelText(/project name/i), "   ");

    await user.type(
      screen.getByLabelText(/category/i),
      "Development"
    );

    fireEvent.change(screen.getByLabelText(/start date/i), {
      target: { value: "2026-11-24" },
    });

    fireEvent.change(screen.getByLabelText(/due date/i), {
      target: { value: "2026-11-30" },
    });

    await user.click(
      screen.getByRole("button", { name: /^create project$/i })
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Please fill in all required fields."
    );

    expect(createProject).not.toHaveBeenCalled();
  });

  // 5. Hide Create Project button for Team Members
  it("should hide the Create Project button for Team Members", () => {
    currentUser.role = "TEAM_MEMBER";

    render(<ProjectsPage />);

    expect(
      screen.queryByRole("button", { name: /new project/i })
    ).not.toBeInTheDocument();
  });

  // 6. Search projects
  it("should search projects by project name", async () => {
    const user = userEvent.setup();

    render(<ProjectsPage />);

    await waitForProjectsToLoad();

    await user.type(
      screen.getByRole("searchbox", { name: /search projects/i }),
      "Website"
    );

    expect(screen.getByText("Website Redesign")).toBeInTheDocument();

    expect(
      screen.queryByText("Mobile App Development")
    ).not.toBeInTheDocument();
  });

  // 7. Filter completed projects
  it("should filter projects by Completed status", async () => {
    const user = userEvent.setup();

    render(<ProjectsPage />);

    await waitForProjectsToLoad();

    await user.selectOptions(
      screen.getByRole("combobox", {
        name: /filter projects by status/i,
      }),
      "Completed"
    );

    expect(screen.getByText("Database Optimization")).toBeInTheDocument();

    expect(
      screen.queryByText("Website Redesign")
    ).not.toBeInTheDocument();
  });

  // 8. Empty search result
  it("should show an empty state when no projects match the search", async () => {
    const user = userEvent.setup();

    render(<ProjectsPage />);

    await waitForProjectsToLoad();

    await user.type(
      screen.getByRole("searchbox", { name: /search projects/i }),
      "XYZ123NoProject"
    );

    expect(screen.getByRole("status")).toHaveTextContent(
      "No projects found"
    );
  });

  // 9. Tab key should keep focus inside modal
  it("should keep keyboard focus inside the modal when pressing Tab", async () => {
    const user = userEvent.setup();

    render(<ProjectsPage />);

    await user.click(
      screen.getByRole("button", { name: /new project/i })
    );

    const dialog = screen.getByRole("dialog");
    const closeButton = screen.getByRole("button", {
      name: /close form/i,
    });

    closeButton.focus();
    await user.tab();

    expect(dialog).toContainElement(document.activeElement as HTMLElement);
  });

  // 10. Shift+Tab should keep focus inside modal
  it("should move focus backward inside the modal with Shift+Tab", async () => {
    const user = userEvent.setup();

    render(<ProjectsPage />);

    await user.click(
      screen.getByRole("button", { name: /new project/i })
    );

    const dialog = screen.getByRole("dialog");
    const firstInput = screen.getByLabelText(/project name/i);

    firstInput.focus();
    await user.tab({ shift: true });

    expect(dialog).toContainElement(document.activeElement as HTMLElement);
  });

  // 11. Escape should close modal
  it("should close the modal when Escape is pressed", async () => {
    const user = userEvent.setup();

    render(<ProjectsPage />);

    await user.click(
      screen.getByRole("button", { name: /new project/i })
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  // 12. Focus should return to New Project button
  it("should return focus to New Project button after closing the modal", async () => {
    const user = userEvent.setup();

    render(<ProjectsPage />);

    const createButton = screen.getByRole("button", {
      name: /new project/i,
    });

    await user.click(createButton);
    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(createButton).toHaveFocus();
    });
  });

  // 13. Due date minimum should follow the selected start date
  it("should set the minimum due date equal to the selected start date", async () => {
    const user = userEvent.setup();

    render(<ProjectsPage />);

    await user.click(
      screen.getByRole("button", { name: /new project/i })
    );

    const startDate = screen.getByLabelText(/start date/i);
    const dueDate = screen.getByLabelText(/due date/i);

    fireEvent.change(startDate, {
      target: { value: "2026-11-30" },
    });

    expect(dueDate).toHaveAttribute("min", "2026-11-30");
  });
});
