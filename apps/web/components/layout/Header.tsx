
"use client";

import { usePathname } from "next/navigation";
import { currentUser, roleLabels } from "../../lib/user";

const pageDetails: Record<string, { title: string; breadcrumb: string }> = {
  "/": {
    title: "Dashboard",
    breadcrumb: "Workspace / Overview",
  },
  "/projects": {
    title: "Projects",
    breadcrumb: "Workspace / Projects",
  },
  "/tasks": {
    title: "My Tasks",
    breadcrumb: "Workspace / Tasks",
  },
  "/team": {
    title: "Team",
    breadcrumb: "Workspace / Team",
  },
  "/analytics": {
    title: "Analytics",
    breadcrumb: "Workspace / Analytics",
  },
  "/settings": {
    title: "Settings",
    breadcrumb: "Workspace / Preferences",
  },
  "/help": {
    title: "Help & Support",
    breadcrumb: "Workspace / Support",
  },
};

type HeaderProps = {
  onMenuClick: () => void;
};

export default function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname();

  const currentPage = pageDetails[pathname] || {
    title: "WorkSphere",
    breadcrumb: "Workspace",
  };

  return (
    <header className="flex min-h-24 items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-4 sm:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          aria-controls="worksphere-sidebar"
          className="rounded-lg border border-slate-200 p-2 text-xl text-slate-700 hover:bg-slate-50 md:hidden"
        >
          ☰
        </button>

        <div className="min-w-0">
          <p className="truncate text-xs text-slate-400 sm:text-sm">
            {currentPage.breadcrumb}
          </p>
          <h1 className="truncate text-xl font-bold text-slate-900 sm:text-2xl">
            {currentPage.title}
          </h1>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600 sm:h-10 sm:w-10">
          KB
        </div>

        <div className="hidden sm:block">
          <p className="font-semibold text-slate-900">
            {currentUser.name}
          </p>
          <p className="text-sm text-slate-400">
            {roleLabels[currentUser.role]}
          </p>
        </div>
      </div>
    </header>
  );
}
