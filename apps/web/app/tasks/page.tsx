
import MainLayout from "@/components/layout/MainLayout";
import { currentUser } from "@/lib/user";
import { hasPermission } from "@/lib/permissions";

const tasks = [
  {
    id: 1,
    title: "Finalize homepage wireframes",
    project: "Website Redesign",
    priority: "High",
    status: "In Progress",
    due: "Nov 22, 2026",
  },
  {
    id: 2,
    title: "Implement user authentication",
    project: "Mobile App Development",
    priority: "High",
    status: "In Review",
    due: "Nov 23, 2026",
  },
  {
    id: 3,
    title: "Prepare campaign report",
    project: "Marketing Campaign",
    priority: "Medium",
    status: "To Do",
    due: "Nov 24, 2026",
  },
  {
    id: 4,
    title: "Review database schema",
    project: "Mobile App Development",
    priority: "Low",
    status: "Completed",
    due: "Nov 20, 2026",
  },
  {
    id: 5,
    title: "Create landing page",
    project: "Website Redesign",
    priority: "Medium",
    status: "In Progress",
    due: "Nov 26, 2026",
  },
];

export default function TasksPage() {
  const canViewTasks = hasPermission(currentUser.role, "VIEW_TASKS");

  const statusStyle: Record<string, string> = {
    "In Progress": "bg-blue-50 text-blue-700",
    "In Review": "bg-violet-50 text-violet-700",
    "To Do": "bg-amber-50 text-amber-700",
    Completed: "bg-emerald-50 text-emerald-700",
  };

  if (!canViewTasks) {
    return (
      <MainLayout>
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <div className="mb-4 text-5xl" aria-hidden="true">🔒</div>
          <h1 className="text-2xl font-bold text-slate-900">
            Access Denied
          </h1>
          <p className="mt-2 max-w-md text-slate-500">
            You do not have permission to view Tasks.
            Please contact your workspace administrator.
          </p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-7">
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              My Tasks
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Manage and track all your assigned tasks.
            </p>
          </div>

          <button
            type="button"
            disabled
            title="Task creation will be implemented in the task API integration."
            className="cursor-not-allowed rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white opacity-70"
          >
            + New Task
          </button>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: "Total Tasks", value: "8" },
            { label: "In Progress", value: "3" },
            { label: "Completed", value: "4" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <p className="text-sm text-slate-500">{item.label}</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">
                {item.value}
              </h2>
            </div>
          ))}
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-100 p-5">
            <h2 className="font-bold text-slate-900">Task List</h2>
            <p className="mt-1 text-xs text-slate-400">
              Your recent assigned tasks.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs text-slate-400">
                <tr>
                  <th className="px-5 py-4">Task</th>
                  <th className="px-5 py-4">Priority</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Due Date</th>
                </tr>
              </thead>

              <tbody>
                {tasks.map((task) => (
                  <tr
                    key={task.id}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-5 py-5">
                      <p className="font-semibold text-slate-800">
                        {task.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {task.project}
                      </p>
                    </td>
                    <td className="px-5 py-5 text-slate-600">
                      {task.priority}
                    </td>
                    <td className="px-5 py-5">
                      <span
                        className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[task.status]}`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-5 text-slate-500">
                      {task.due}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
