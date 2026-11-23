
"use client";

import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { currentUser } from "@/lib/user";
import { hasPermission } from "@/lib/permissions";



const projects = [
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

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const canViewProjects = hasPermission(
  currentUser.role,
  "VIEW_PROJECTS"
);

const canCreateProject = hasPermission(
  currentUser.role,
  "CREATE_PROJECT"
);

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
              type="button"
              disabled
              title="Project creation will be implemented in the project API integration."
              className="cursor-not-allowed rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white opacity-70"
            >
              + New Project
            </button>
          )}
        </section>

        {/* Statistics */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            ["Total Projects", "24"],
            ["In Progress", "18"],
            ["Completed", "6"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <p className="text-sm text-slate-500">{label}</p>

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
            <span className="sr-only">Search projects</span>
            <input
              type="search"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </label>

          <label>
            <span className="sr-only">Filter projects by status</span>
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

              <div className="mt-6 flex justify-between text-sm">
                <span className="text-slate-500">Progress</span>
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
                  style={{ width: `${project.progress}%` }}
                />
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4">
                <p className="text-xs text-slate-400">Due date</p>

                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {project.due}
                </p>
              </div>
            </article>
          ))}
        </section>

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
      </div>
    </MainLayout>
  );
}
