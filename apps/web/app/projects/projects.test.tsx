
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

describe("Projects Page", () => {
  beforeEach(() => {
    currentUser.role = "PROJECT_MANAGER";
  });

  // 1. Render Projects page
  it("should render the Projects page and existing projects", () => {
    render(<ProjectsPage />);

    expect(
      screen.getByRole("heading", { name: "Projects" })
    ).toBeInTheDocument();

    expect(screen.getByText("Website Redesign")).toBeInTheDocument();
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

    expect(screen.getByText("WorkSphere Testing")).toBeInTheDocument();

    expect(screen.getByRole("status")).toHaveTextContent(
      "Project created successfully"
    );
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
});
