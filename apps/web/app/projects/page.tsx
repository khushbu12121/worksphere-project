
"use client";

import { useEffect, useRef, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { currentUser } from "@/lib/user";
import { hasPermission } from "@/lib/permissions";

type Project = {
  id: number;
  name: string;
  category: string;
  description?: string;
  progress: number;
  status: string;
  due: string;
  color: string;
  priority?: string;
};

const initialProjects: Project[] = [
  {
    id: 1,
    name: "Website Redesign",
    category: "Design",
    progress: 75,
    status: "In Progress",
    due: "Nov 25, 2026",
    color: "bg-violet-500",
  },
  {
    id: 2,
    name: "Mobile App Development",
    category: "Development",
    progress: 45,
    status: "In Progress",
    due: "Dec 02, 2026",
    color: "bg-blue-500",
  },
  {
    id: 3,
    name: "Marketing Campaign",
    category: "Marketing",
    progress: 90,
    status: "In Progress",
    due: "Nov 23, 2026",
    color: "bg-emerald-500",
  },
  {
    id: 4,
    name: "Database Optimization",
    category: "Development",
    progress: 100,
    status: "Completed",
    due: "Nov 20, 2026",
    color: "bg-amber-500",
  },
];

const priorityColors: Record<string, string> = {
  Low: "bg-emerald-500",
  Medium: "bg-blue-500",
  High: "bg-rose-500",
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    startDate: "",
    dueDate: "",
    priority: "Medium",
  });

  const createButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const canViewProjects = hasPermission(
    currentUser.role,
    "VIEW_PROJECTS"
  );

  const canCreateProject = hasPermission(
    currentUser.role,
    "CREATE_PROJECT"
  );

  // Keyboard accessibility and focus management
  useEffect(() => {
    if (!isModalOpen) return;

    const modal = modalRef.current;
    const createButton = createButtonRef.current;

    const firstInput = modal?.querySelector<HTMLElement>(
      "[data-autofocus]"
    );

    firstInput?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
        setFormError("");
        return;
      }

      if (event.key === "Tab" && modal) {
        const focusableElements =
          modal.querySelectorAll<HTMLElement>(
            'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
          );

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (!first || !last) return;

        if (
          event.shiftKey &&
          document.activeElement === first
        ) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

   return () => {
  document.removeEventListener("keydown", handleKeyDown);
  createButton?.focus();
};
  }, [isModalOpen]);

  if (!canViewProjects) {
    return (
      <MainLayout>
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <div className="mb-4 text-5xl" aria-hidden="true">
            🔒
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            Access Denied
          </h1>

          <p className="mt-2 max-w-md text-slate-500">
            You do not have permission to view Projects.
            Please contact your workspace administrator.
          </p>
        </div>
      </MainLayout>
    );
  }

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || project.status === filter;

    return matchesSearch && matchesFilter;
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setFormError("");
    setSuccessMessage("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormError("");
  };

  const handleCreateProject = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setFormError("");
    setSuccessMessage("");

    const {
      name,
      description,
      category,
      startDate,
      dueDate,
      priority,
    } = formData;

    if (
      !name.trim() ||
      !category.trim() ||
      !startDate ||
      !dueDate
    ) {
      setFormError("Please fill in all required fields.");
      return;
    }

    if (dueDate < startDate) {
      setFormError(
        "Due date cannot be earlier than the start date."
      );
      return;
    }

    const newProject: Project = {
      id: Date.now(),
      name: name.trim(),
      description: description.trim(),
      category: category.trim(),
      progress: 0,
      status: "In Progress",
      due: new Date(
        `${dueDate}T00:00:00`
      ).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      color: priorityColors[priority],
      priority,
    };

    setProjects((previous) => [
      newProject,
      ...previous,
    ]);

    setFormData({
      name: "",
      description: "",
      category: "",
      startDate: "",
      dueDate: "",
      priority: "Medium",
    });

    setIsModalOpen(false);

    setSuccessMessage(
      "Project created successfully in this demo session!"
    );
  };

  return (
    <MainLayout>
      <div className="space-y-7">

        {/* Heading */}
        <section className="flex flex-col justify-between gap-4 sm:flex-row">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Projects
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage and track all your workspace projects.
            </p>
          </div>

          {canCreateProject && (
            <button
              ref={createButtonRef}
              type="button"
              onClick={() => {
                setFormError("");
                setSuccessMessage("");
                setIsModalOpen(true);
              }}
              className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              + New Project
            </button>
          )}
        </section>

        {/* Success Message */}
        {successMessage && (
          <div
            role="status"
            aria-live="polite"
            className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700"
          >
            {successMessage}
          </div>
        )}

        {/* Statistics */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            ["Total Projects", projects.length],
            [
              "In Progress",
              projects.filter(
                (p) => p.status === "In Progress"
              ).length,
            ],
            [
              "Completed",
              projects.filter(
                (p) => p.status === "Completed"
              ).length,
            ],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <p className="text-sm text-slate-500">
                {label}
              </p>

              <h2 className="mt-3 text-3xl font-bold text-slate-900">
                {value}
              </h2>
            </div>
          ))}
        </section>

        {/* Search and Filter */}
        <section
          className="flex flex-col gap-3 sm:flex-row"
          aria-label="Search and filter projects"
        >
          <label className="flex-1">
            <span className="sr-only">
              Search projects
            </span>

            <input
              type="search"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </label>

          <label>
            <span className="sr-only">
              Filter projects by status
            </span>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm sm:w-auto"
            >
              <option value="All">All Projects</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </label>
        </section>

        {/* Project Cards */}
        <section
          className="grid gap-5 lg:grid-cols-2"
          aria-label="Project list"
        >
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`h-3 w-3 rounded-full ${project.color}`}
                  aria-hidden="true"
                />

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    project.status === "Completed"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-blue-50 text-blue-700"
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <p className="mt-5 text-xs text-slate-400">
                {project.category}
              </p>

              <h3 className="mt-2 text-lg font-bold text-slate-900">
                {project.name}
              </h3>

              {project.description && (
                <p className="mt-2 text-sm text-slate-500">
                  {project.description}
                </p>
              )}

              {project.priority && (
                <p className="mt-2 text-xs text-slate-500">
                  Priority: {project.priority}
                </p>
              )}

              <div className="mt-6 flex justify-between text-sm">
                <span className="text-slate-500">
                  Progress
                </span>

                <span className="font-bold">
                  {project.progress}%
                </span>
              </div>

              <div
                className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100"
                role="progressbar"
                aria-label={`${project.name} completion`}
                aria-valuenow={project.progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className={`h-full rounded-full ${project.color}`}
                  style={{
                    width: `${project.progress}%`,
                  }}
                />
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4">
                <p className="text-xs text-slate-400">
                  Due date
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {project.due}
                </p>
              </div>
            </article>
          ))}
        </section>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div
            className="rounded-2xl bg-white p-10 text-center"
            role="status"
          >
            <p className="text-slate-500">
              No projects found. Try another search or filter.
            </p>
          </div>
        )}

        {/* Create Project Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) {
                closeModal();
              }
            }}
          >
            <div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="create-project-title"
              aria-describedby="create-project-description"
              className="my-auto w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl sm:p-8"
            >
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h2
                    id="create-project-title"
                    className="text-xl font-bold text-slate-900"
                  >
                    Create New Project
                  </h2>

                  <p
                    id="create-project-description"
                    className="mt-1 text-sm text-slate-500"
                  >
                    Enter the details to create a project.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Close form"
                  className="rounded-lg px-3 py-1 text-xl text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  ×
                </button>
              </div>

              <form
                onSubmit={handleCreateProject}
                className="space-y-4"
              >
                {/* Project Name */}
                <div>
                  <label
                    htmlFor="project-name"
                    className="mb-1 block text-sm font-medium text-slate-700"
                  >
                    Project Name *
                  </label>

                  <input
                    id="project-name"
                    data-autofocus
                    name="name"
                    type="text"
                    required
                    maxLength={100}
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter project name"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="project-description"
                    className="mb-1 block text-sm font-medium text-slate-700"
                  >
                    Description
                  </label>

                  <textarea
                    id="project-description"
                    name="description"
                    rows={3}
                    maxLength={500}
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your project"
                    className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                {/* Category */}
                <div>
                  <label
                    htmlFor="project-category"
                    className="mb-1 block text-sm font-medium text-slate-700"
                  >
                    Category *
                  </label>

                  <input
                    id="project-category"
                    name="category"
                    type="text"
                    required
                    maxLength={50}
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="e.g. Design, Development"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                {/* Dates */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="project-start-date"
                      className="mb-1 block text-sm font-medium text-slate-700"
                    >
                      Start Date *
                    </label>

                    <input
                      id="project-start-date"
                      name="startDate"
                      type="date"
                      required
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-slate-300 px-3 py-3 text-sm outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="project-due-date"
                      className="mb-1 block text-sm font-medium text-slate-700"
                    >
                      Due Date *
                    </label>

                    <input
                      id="project-due-date"
                      name="dueDate"
                      type="date"
                      required
                      min={formData.startDate || undefined}
                      value={formData.dueDate}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-slate-300 px-3 py-3 text-sm outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* Priority */}
                <div>
                  <label
                    htmlFor="project-priority"
                    className="mb-1 block text-sm font-medium text-slate-700"
                  >
                    Priority
                  </label>

                  <select
                    id="project-priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                {/* Error */}
                {formError && (
                  <p
                    role="alert"
                    aria-live="assertive"
                    className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
                  >
                    {formError}
                  </p>
                )}

                {/* Actions */}
                <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Create Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
