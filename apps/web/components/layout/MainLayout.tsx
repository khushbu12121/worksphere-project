
"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { currentUser, roleLabels } from "@/lib/user";

type LayoutConfig = {
  title: string;
  description: string;
  accent: string;
  background: string;
};

const roleLayouts: Record<string, LayoutConfig> = {
  PLATFORM_ADMIN: {
    title: "Platform Administration",
    description: "Manage the platform and organizations",
    accent: "border-violet-500",
    background: "bg-violet-50",
  },
  ORGANIZATION_OWNER: {
    title: "Organization Workspace",
    description: "Manage your organization and teams",
    accent: "border-blue-500",
    background: "bg-blue-50",
  },
  PROJECT_MANAGER: {
    title: "Project Management",
    description: "Manage projects, tasks and team delivery",
    accent: "border-emerald-500",
    background: "bg-emerald-50",
  },
  TEAM_MEMBER: {
    title: "My Workspace",
    description: "View your tasks and project updates",
    accent: "border-orange-500",
    background: "bg-orange-50",
  },
  AUDITOR: {
    title: "Audit Workspace",
    description: "Review platform activity and analytics",
    accent: "border-slate-500",
    background: "bg-slate-100",
  },
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);

  const layout =
    roleLayouts[currentUser.role] ?? roleLayouts.TEAM_MEMBER;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <main className="min-w-0 flex-1 p-4 sm:p-6">
          <div
            className={`mb-6 rounded-xl border-l-4 ${layout.accent} ${layout.background} p-4`}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {roleLabels[currentUser.role]}
            </p>

            <h1 className="mt-1 text-xl font-bold text-slate-900">
              {layout.title}
            </h1>

            <p className="mt-1 text-sm text-slate-600">
              {layout.description}
            </p>
          </div>

          {children}
        </main>
      </div>
    </div>
  );
}
