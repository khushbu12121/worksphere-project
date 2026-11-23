
import MainLayout from "@/components/layout/MainLayout";
import { currentUser } from "@/lib/user";
import { hasPermission } from "@/lib/permissions";

const members = [
  {
    id: 1,
    name: "Khushbu Bansal",
    initials: "KB",
    role: "Workspace Admin",
    department: "Management",
    email: "khushbu@example.com",
    status: "Active",
    color: "bg-indigo-100 text-indigo-700",
  },
  {
    id: 2,
    name: "Aarav Kumar",
    initials: "AK",
    role: "UI/UX Designer",
    department: "Design",
    email: "aarav@example.com",
    status: "Active",
    color: "bg-violet-100 text-violet-700",
  },
  {
    id: 3,
    name: "Priya Sharma",
    initials: "PS",
    role: "Frontend Developer",
    department: "Development",
    email: "priya@example.com",
    status: "Active",
    color: "bg-pink-100 text-pink-700",
  },
  {
    id: 4,
    name: "Rahul Mehta",
    initials: "RM",
    role: "Backend Developer",
    department: "Development",
    email: "rahul@example.com",
    status: "Active",
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: 5,
    name: "Sneha Verma",
    initials: "SV",
    role: "Marketing Executive",
    department: "Marketing",
    email: "sneha@example.com",
    status: "Away",
    color: "bg-amber-100 text-amber-700",
  },
  {
    id: 6,
    name: "Karan Singh",
    initials: "KS",
    role: "Product Manager",
    department: "Management",
    email: "karan@example.com",
    status: "Active",
    color: "bg-emerald-100 text-emerald-700",
  },
];

export default function TeamPage() {
  const canViewTeam = hasPermission(currentUser.role, "VIEW_TEAM");

  if (!canViewTeam) {
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
            You do not have permission to view the Team Members page.
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
              Team Members
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Manage your team and collaborate together.
            </p>
          </div>

          <button
            type="button"
            className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            + Invite Member
          </button>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: "Total Members", value: "18", icon: "👥" },
            { label: "Active Members", value: "16", icon: "✓" },
            { label: "Departments", value: "4", icon: "▦" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{item.label}</p>
                <span className="text-xl" aria-hidden="true">
                  {item.icon}
                </span>
              </div>

              <h2 className="mt-3 text-3xl font-bold text-slate-900">
                {item.value}
              </h2>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6">
            <h2 className="font-bold text-slate-900">
              All Team Members
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              View your workspace members and their roles.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {members.map((member) => (
              <article
                key={member.id}
                className="rounded-xl border border-slate-100 p-5 transition hover:border-indigo-200 hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold ${member.color}`}
                    aria-hidden="true"
                  >
                    {member.initials}
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      member.status === "Active"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {member.status}
                  </span>
                </div>

                <h3 className="mt-5 font-bold text-slate-900">
                  {member.name}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {member.role}
                </p>

                <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                  <p className="text-xs text-slate-500">
                    ✉ {member.email}
                  </p>

                  <p className="text-xs text-slate-500">
                    Department: {member.department}
                  </p>
                </div>

                <div className="mt-5 border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                  >
                    View Profile →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
