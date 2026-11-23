
import MainLayout from "@/components/layout/MainLayout";
import { currentUser } from "@/lib/user";
import { hasPermission } from "@/lib/permissions";



const monthlyData = [
  { month: "Jan", tasks: 35, completed: 20 },
  { month: "Feb", tasks: 48, completed: 30 },
  { month: "Mar", tasks: 42, completed: 32 },
  { month: "Apr", tasks: 60, completed: 45 },
  { month: "May", tasks: 55, completed: 40 },
  { month: "Jun", tasks: 75, completed: 62 },
  { month: "Jul", tasks: 68, completed: 55 },
  { month: "Aug", tasks: 85, completed: 70 },
];

const projectPerformance = [
  {
    name: "Website Redesign",
    progress: 75,
    color: "bg-violet-500",
    tasks: 24,
  },
  {
    name: "Mobile App Development",
    progress: 45,
    color: "bg-blue-500",
    tasks: 32,
  },
  {
    name: "Marketing Campaign",
    progress: 90,
    color: "bg-emerald-500",
    tasks: 18,
  },
  {
    name: "CRM Integration",
    progress: 60,
    color: "bg-amber-500",
    tasks: 26,
  },
];

const productivity = [
  { day: "Mon", value: 65 },
  { day: "Tue", value: 85 },
  { day: "Wed", value: 55 },
  { day: "Thu", value: 90 },
  { day: "Fri", value: 75 },
  { day: "Sat", value: 40 },
  { day: "Sun", value: 30 },
];

export default function AnalyticsPage() {
  const canViewAnalytics = hasPermission(
  currentUser.role,
  "VIEW_ANALYTICS"
);
  if (!canViewAnalytics) {
    return (
      <MainLayout>
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <div className="mb-4 text-5xl">🔒</div>

          <h1 className="text-2xl font-bold text-slate-900">
            Access Denied
          </h1>

          <p className="mt-2 max-w-md text-slate-500">
            You do not have permission to view the Analytics page.
            Please contact your workspace administrator.
          </p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-7">

        {/* Heading */}
        <section>
          <h1 className="text-2xl font-bold text-slate-900">
            Analytics Overview
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Track workspace performance and team productivity.
          </p>
        </section>

        {/* Statistics */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Total Projects",
              value: "24",
              change: "+12.5%",
              icon: "▦",
            },
            {
              label: "Tasks Completed",
              value: "142",
              change: "+18.4%",
              icon: "✓",
            },
            {
              label: "Team Productivity",
              value: "86%",
              change: "+8.2%",
              icon: "↗",
            },
            {
              label: "Team Members",
              value: "18",
              change: "+2 new",
              icon: "♙",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">
                  {item.label}
                </p>
                <span className="text-xl text-indigo-600">
                  {item.icon}
                </span>
              </div>

              <h2 className="mt-4 text-3xl font-bold text-slate-900">
                {item.value}
              </h2>

              <p className="mt-2 text-xs font-semibold text-emerald-600">
                {item.change} from last month
              </p>
            </div>
          ))}
        </section>

        {/* Monthly Chart */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-bold text-slate-900">
                Monthly Task Performance
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                Tasks created and completed each month.
              </p>
            </div>

            <span className="rounded-lg bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-600">
              2026
            </span>
          </div>

          <div className="mt-8 flex items-end justify-around gap-3 border-b border-slate-100 pb-2">
            {monthlyData.map((item) => (
              <div
                key={item.month}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <div className="flex h-48 w-full items-end justify-center gap-1">
                  <div
                    className="w-3 rounded-t-md bg-indigo-500 sm:w-5"
                    style={{ height: `${item.tasks}%` }}
                    title={`Created: ${item.tasks}`}
                  />
                  <div
                    className="w-3 rounded-t-md bg-emerald-400 sm:w-5"
                    style={{ height: `${item.completed}%` }}
                    title={`Completed: ${item.completed}`}
                  />
                </div>

                <span className="text-xs text-slate-500">
                  {item.month}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 flex justify-center gap-6">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="h-3 w-3 rounded-sm bg-indigo-500" />
              Created
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="h-3 w-3 rounded-sm bg-emerald-400" />
              Completed
            </div>
          </div>
        </section>

        {/* Project Performance */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="font-bold text-slate-900">
            Project Performance
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Track the completion progress of each project.
          </p>

          <div className="mt-6 space-y-7">
            {projectPerformance.map((project) => (
              <div key={project.name}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800">
                      {project.name}
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      {project.tasks} tasks
                    </p>
                  </div>

                  <span className="text-sm font-bold text-slate-700">
                    {project.progress}%
                  </span>
                </div>

                <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${project.color}`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Weekly Productivity */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="font-bold text-slate-900">
            Weekly Productivity
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Team productivity throughout the week.
          </p>

          <div className="mt-7 grid grid-cols-7 gap-3">
            {productivity.map((item) => (
              <div
                key={item.day}
                className="flex flex-col items-center gap-3"
              >
                <span className="text-xs font-semibold text-slate-600">
                  {item.value}%
                </span>

                <div className="flex h-36 w-full items-end rounded-lg bg-slate-50">
                  <div
                    className="w-full rounded-lg bg-indigo-500 transition-all"
                    style={{ height: `${item.value}%` }}
                  />
                </div>

                <span className="text-xs text-slate-400">
                  {item.day}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-200 py-5 text-center text-xs text-slate-400">
          WorkSphere Analytics © 2026
        </footer>

      </div>
    </MainLayout>
  );
}
