
import MainLayout from "@/components/layout/MainLayout";

const projects = [
  {
    name: "Website Redesign",
    category: "Design",
    progress: 75,
    color: "bg-violet-500",
    initials: "WR",
    members: ["AK", "PS", "RM"],
    due: "Nov 25, 2026",
  },
  {
    name: "Mobile App Development",
    category: "Development",
    progress: 45,
    color: "bg-blue-500",
    initials: "MA",
    members: ["KS", "JD", "AM"],
    due: "Dec 02, 2026",
  },
  {
    name: "Marketing Campaign",
    category: "Marketing",
    progress: 90,
    color: "bg-emerald-500",
    initials: "MC",
    members: ["PS", "AK"],
    due: "Nov 23, 2026",
  },
];

const tasks = [
  {
    title: "Finalize homepage wireframes",
    project: "Website Redesign",
    priority: "High",
    status: "In Progress",
    date: "Today",
  },
  {
    title: "Implement user authentication",
    project: "Mobile App",
    priority: "High",
    status: "In Review",
    date: "Nov 22",
  },
  {
    title: "Prepare campaign report",
    project: "Marketing",
    priority: "Medium",
    status: "To Do",
    date: "Nov 24",
  },
  {
    title: "Review database schema",
    project: "Mobile App",
    priority: "Low",
    status: "Completed",
    date: "Nov 20",
  },
];

const activity = [
  {
    initials: "AK",
    name: "Aarav Kumar",
    action: "completed a task in",
    target: "Website Redesign",
    time: "10 minutes ago",
    color: "bg-violet-100 text-violet-700",
  },
  {
    initials: "PS",
    name: "Priya Sharma",
    action: "created a new task in",
    target: "Mobile App",
    time: "35 minutes ago",
    color: "bg-pink-100 text-pink-700",
  },
  {
    initials: "RM",
    name: "Rahul Mehta",
    action: "uploaded a file to",
    target: "Marketing Campaign",
    time: "1 hour ago",
    color: "bg-blue-100 text-blue-700",
  },
];

const statistics = [
  {
    label: "Total Projects",
    value: "24",
    change: "+12.5%",
    icon: "▦",
    iconBg: "bg-indigo-50 text-indigo-600",
  },
  {
    label: "Active Tasks",
    value: "86",
    change: "+8.2%",
    icon: "✓",
    iconBg: "bg-blue-50 text-blue-600",
  },
  {
    label: "Completed Tasks",
    value: "142",
    change: "+18.4%",
    icon: "◉",
    iconBg: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Team Members",
    value: "18",
    change: "+2 new",
    icon: "♙",
    iconBg: "bg-amber-50 text-amber-600",
  },
];

function Avatar({
  initials,
  color = "bg-slate-200 text-slate-700",
}: {
  initials: string;
  color?: string;
}) {
  return (
    <div
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${color}`}
    >
      {initials}
    </div>
  );
}

export default function Home() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-[1500px] space-y-7">

        {/* Welcome Section */}
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Good evening, Khushbu! 👋
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Here&apos;s what&apos;s happening with your workspace today.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600">
              November 21, 2026
            </div>

            <button className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700">
              + New Project
            </button>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statistics.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-100/50"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  {stat.label}
                </p>

                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl ${stat.iconBg}`}
                >
                  {stat.icon}
                </span>
              </div>

              <div className="mt-4 flex items-end justify-between">
                <h3 className="text-3xl font-bold tracking-tight text-slate-900">
                  {stat.value}
                </h3>

                <span className="mb-1 text-xs font-semibold text-emerald-600">
                  {stat.change}
                </span>
              </div>

              <p className="mt-2 text-xs text-slate-400">
                Compared to last month
              </p>
            </div>
          ))}
        </section>

        {/* Active Projects Section */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900">
                Active Projects
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                Track the progress of your ongoing projects.
              </p>
            </div>

            <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">
              View all →
            </button>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.name}
                className="rounded-xl border border-slate-100 p-4 transition hover:border-indigo-200 hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white ${project.color}`}
                  >
                    {project.initials}
                  </div>

                  <button className="text-xl text-slate-400">
                    ⋯
                  </button>
                </div>

                <p className="mt-4 text-xs font-medium text-slate-400">
                  {project.category}
                </p>

                <h4 className="mt-1 font-bold text-slate-800">
                  {project.name}
                </h4>

                <div className="mt-5 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Progress</span>

                  <span className="font-bold text-slate-800">
                    {project.progress}%
                  </span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${project.color}`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <div className="flex -space-x-2">
                    {project.members.map((member, index) => (
                      <div
                        key={member}
                        className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-[9px] font-bold ${
                          index === 0
                            ? "bg-indigo-100 text-indigo-700"
                            : index === 1
                              ? "bg-pink-100 text-pink-700"
                              : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {member}
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-slate-400">
                    Due {project.due}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tasks and Activity Section */}
        <section className="grid gap-6 xl:grid-cols-3">

          {/* Recent Tasks */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <div>
                <h3 className="font-bold text-slate-900">
                  Recent Tasks
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  Keep track of your team&apos;s tasks.
                </p>
              </div>

              <button className="text-sm font-semibold text-indigo-600">
                View all →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs text-slate-400">
                  <tr>
                    <th className="px-5 py-3 font-medium">Task</th>
                    <th className="px-5 py-3 font-medium">Priority</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium">Due date</th>
                  </tr>
                </thead>

                <tbody>
                  {tasks.map((task) => (
                    <tr
                      key={task.title}
                      className="border-t border-slate-100"
                    >
                      <td className="min-w-48 px-5 py-4">
                        <p className="font-semibold text-slate-800">
                          {task.title}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {task.project}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-xs text-slate-600">
                        {task.priority}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${
                            task.status === "Completed"
                              ? "bg-emerald-50 text-emerald-700"
                              : task.status === "In Progress"
                                ? "bg-blue-50 text-blue-700"
                                : task.status === "In Review"
                                  ? "bg-violet-50 text-violet-700"
                                  : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {task.status}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-500">
                        {task.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-bold text-slate-900">
              Recent Activity
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              Latest team updates.
            </p>

            <div className="mt-6 space-y-6">
              {activity.map((item) => (
                <div key={item.name} className="flex gap-3">
                  <Avatar
                    initials={item.initials}
                    color={item.color}
                  />

                  <div className="min-w-0">
                    <p className="text-xs leading-5 text-slate-600">
                      <span className="font-bold text-slate-800">
                        {item.name}
                      </span>{" "}

                      {item.action}{" "}

                      <span className="font-semibold text-indigo-600">
                        {item.target}
                      </span>
                    </p>

                    <p className="mt-1 text-[11px] text-slate-400">
                      {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-7 w-full border-t border-slate-100 pt-4 text-center text-sm font-semibold text-indigo-600">
              View all activity →
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex flex-col justify-between gap-2 border-t border-slate-200 py-5 text-xs text-slate-400 sm:flex-row">
          <p>© 2026 WorkSphere. All rights reserved.</p>

          <p>Built for better teamwork and productivity.</p>
        </footer>

      </div>
    </MainLayout>
  );
}
