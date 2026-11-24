
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { currentUser, roleLabels } from "../../lib/user";
import { hasPermission, type Permission } from "../../lib/permissions";

type NavigationItem = {
  name: string;
  href: string;
  icon: string;
  permission: Permission;
};

const navigation: NavigationItem[] = [
  { name: "Overview", href: "/", icon: "▦", permission: "VIEW_OVERVIEW" },
  { name: "Projects", href: "/projects", icon: "▤", permission: "VIEW_PROJECTS" },
  { name: "My Tasks", href: "/tasks", icon: "✓", permission: "VIEW_TASKS" },
  { name: "Team", href: "/team", icon: "♙", permission: "VIEW_TEAM" },
  { name: "Analytics", href: "/analytics", icon: "▥", permission: "VIEW_ANALYTICS" },
];

const preferences: NavigationItem[] = [
  { name: "Settings", href: "/settings", icon: "⚙", permission: "VIEW_SETTINGS" },
  { name: "Help & Support", href: "/help", icon: "ⓘ", permission: "VIEW_HELP" },
];

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const visibleNavigation = navigation.filter((item) =>
    hasPermission(currentUser.role, item.permission)
  );

  const visiblePreferences = preferences.filter((item) =>
    hasPermission(currentUser.role, item.permission)
  );

  const renderLinks = (items: NavigationItem[]) =>
    items.map((item) => {
      const isActive =
        pathname === item.href ||
        (item.href !== "/" && pathname.startsWith(item.href + "/"));

      return (
        <Link
          key={item.name}
          href={item.href}
          onClick={onClose}
          aria-current={isActive ? "page" : undefined}
          className={`flex items-center gap-4 rounded-xl px-4 py-4 transition-colors ${
            isActive
              ? "bg-indigo-50 font-semibold text-indigo-600"
              : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
          }`}
        >
          <span className="text-xl" aria-hidden="true">
            {item.icon}
          </span>
          <span className="font-medium">{item.name}</span>
        </Link>
      );
    });

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      <aside
        id="worksphere-sidebar"
        aria-label="Main sidebar"
        className={`fixed inset-y-0 left-0 z-50 flex h-dvh max-h-dvh w-72 flex-col overflow-y-auto overscroll-contain border-r border-slate-200 bg-white p-6 transition-transform duration-300 md:sticky md:top-0 md:h-screen md:max-h-screen md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-12 flex shrink-0 items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-2xl font-bold text-white">
              W
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">WorkSphere</h1>
              <p className="text-sm text-slate-500">Workspace Management</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-xl text-slate-500 hover:bg-slate-100 md:hidden"
          >
            ×
          </button>
        </div>

        <div className="shrink-0">
          <p className="mb-5 text-xs font-bold tracking-widest text-slate-400">
            WORKSPACE
          </p>
          <nav className="space-y-2" aria-label="Workspace navigation">
            {renderLinks(visibleNavigation)}
          </nav>
        </div>

        <div className="mt-12 shrink-0">
          <p className="mb-5 text-xs font-bold tracking-widest text-slate-400">
            PREFERENCES
          </p>
          <nav className="space-y-2" aria-label="Preferences navigation">
            {renderLinks(visiblePreferences)}
          </nav>
        </div>

        <div className="mt-auto shrink-0 border-t border-slate-200 pt-8">
          <div className="flex items-center gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700"
              aria-hidden="true"
            >
              {currentUser.name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>

            <div className="min-w-0">
              <p className="truncate font-semibold text-slate-900">
                {currentUser.name}
              </p>
              <p className="text-sm text-slate-500">
                {roleLabels[currentUser.role]}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
