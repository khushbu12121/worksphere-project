
"use client";

import { useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import { currentUser, roleLabels } from "@/lib/user";
import { hasPermission } from "@/lib/permissions";

export default function SettingsPage() {
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState("khushbu@example.com");

  const [notifications, setNotifications] = useState({
    email: true,
    tasks: true,
    projects: false,
    updates: true,
  });

  const [theme, setTheme] = useState("Light");
  const [saved, setSaved] = useState(false);

  const canViewSettings = hasPermission(currentUser.role, "VIEW_SETTINGS");

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
  };

  if (!canViewSettings) {
    return (
      <MainLayout>
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <div className="mb-4 text-5xl" aria-hidden="true">🔒</div>
          <h1 className="text-2xl font-bold text-slate-900">Access Denied</h1>
          <p className="mt-2 max-w-md text-slate-500">
            You do not have permission to view Settings.
            Please contact your workspace administrator.
          </p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mx-auto max-w-5xl space-y-7">
        <section>
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage your account, preferences and workspace settings.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">
              Profile Information
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Update your personal information.
            </p>
          </div>

          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-xl font-bold text-indigo-700">
              {name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">{name}</h3>
              <p className="text-sm text-slate-400">
                {roleLabels[currentUser.role]}
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="profile-name" className="mb-2 block text-sm font-medium text-slate-700">
                Full Name
              </label>
              <input
                id="profile-name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setSaved(false);
                }}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label htmlFor="profile-email" className="mb-2 block text-sm font-medium text-slate-700">
                Email Address
              </label>
              <input
                id="profile-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSaved(false);
                }}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label htmlFor="profile-role" className="mb-2 block text-sm font-medium text-slate-700">
                Job Title
              </label>
              <input
                id="profile-role"
                value={roleLabels[currentUser.role]}
                readOnly
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm"
              />
            </div>

            <div>
              <label htmlFor="profile-department" className="mb-2 block text-sm font-medium text-slate-700">
                Department
              </label>
              <input
                id="profile-department"
                defaultValue="Management"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Notification Preferences
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Choose which notifications you want to receive.
          </p>

          <div className="mt-6 divide-y divide-slate-100">
            {[
              { key: "email" as const, title: "Email Notifications", description: "Receive important updates through email." },
              { key: "tasks" as const, title: "Task Notifications", description: "Get notified about task assignments and deadlines." },
              { key: "projects" as const, title: "Project Updates", description: "Receive updates about your ongoing projects." },
              { key: "updates" as const, title: "Workspace Updates", description: "Stay informed about workspace activities." },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between gap-4 py-5">
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">{item.title}</h3>
                  <p className="mt-1 text-xs text-slate-400">{item.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleNotification(item.key)}
                  aria-label={item.title}
                  aria-pressed={notifications[item.key]}
                  className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                    notifications[item.key] ? "bg-indigo-600" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${
                      notifications[item.key] ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Appearance</h2>
          <p className="mt-1 text-sm text-slate-400">
            Customize how your workspace looks.
          </p>

          <div className="mt-5">
            <label className="mb-3 block text-sm font-medium text-slate-700">
              Choose Theme
            </label>
            <div className="flex flex-wrap gap-3">
              {["Light", "Dark", "System"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setTheme(item);
                    setSaved(false);
                  }}
                  aria-pressed={theme === item}
                  className={`rounded-xl border px-6 py-3 text-sm font-medium transition ${
                    theme === item
                      ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                      : "border-slate-200 text-slate-600 hover:border-indigo-300"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Security & Password
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Manage your account security.
          </p>

          <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-sm font-semibold text-slate-800">Password</h3>
              <p className="mt-1 text-xs text-slate-400">
                Keep your account secure with a strong password.
              </p>
            </div>
            <button
              type="button"
              disabled
              title="Password management is not implemented yet."
              className="cursor-not-allowed rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-500 opacity-70"
            >
              Change Password
            </button>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-5">
            <h3 className="text-sm font-semibold text-slate-800">
              Two-Factor Authentication
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Additional account protection will be available soon.
            </p>
            <span className="mt-3 inline-block rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
              Coming Soon
            </span>
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-4 pb-6">
          <p className="text-sm text-slate-500" role="status">
            {saved ? "Changes saved in this session!" : "Don't forget to save your changes."}
          </p>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-xl bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
