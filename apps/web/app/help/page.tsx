
"use client";

import { useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import { currentUser } from "@/lib/user";
import { hasPermission } from "@/lib/permissions";

const faqs = [
  {
    question: "How do I create a new project?",
    answer:
      "Go to the Projects page and click the New Project button. Enter your project details and save it.",
  },
  {
    question: "How can I assign tasks to team members?",
    answer:
      "Open My Tasks and click New Task. Add the task title, select a project, choose a priority and assign a team member.",
  },
  {
    question: "How can I track project progress?",
    answer:
      "Visit the Overview or Analytics page to monitor project progress, completed tasks and team productivity.",
  },
  {
    question: "How do I invite a new team member?",
    answer:
      "Open the Team page and click Invite Member. Enter the member's details to get started.",
  },
  {
    question: "Can I change my account settings?",
    answer:
      "Yes. Visit the Settings page to update your profile, notification preferences and appearance settings.",
  },
  {
    question: "How do I manage notifications?",
    answer:
      "Open Settings and use the notification toggles to choose which updates you want to receive.",
  },
];

const categories = [
  {
    icon: "📁",
    title: "Projects",
    description: "Learn how to create and manage projects.",
  },
  {
    icon: "✓",
    title: "Tasks",
    description: "Manage tasks, deadlines and priorities.",
  },
  {
    icon: "👥",
    title: "Team Management",
    description: "Manage members and collaboration.",
  },
  {
    icon: "⚙",
    title: "Account Settings",
    description: "Manage your profile and preferences.",
  },
];

export default function HelpPage() {
  const [search, setSearch] = useState("");
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const canViewHelp = hasPermission(currentUser.role, "VIEW_HELP");

  if (!canViewHelp) {
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
            You do not have permission to view Help & Support.
            Please contact your workspace administrator.
          </p>
        </div>
      </MainLayout>
    );
  }

  const filteredFaqs = faqs.filter((faq) =>
    `${faq.question} ${faq.answer}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Heading */}
        <section>
          <h1 className="text-2xl font-bold text-slate-900">
            Help & Support
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Find answers, explore guides and get help with WorkSphere.
          </p>
        </section>

        {/* Hero */}
        <section className="rounded-2xl bg-indigo-600 px-6 py-12 text-center text-white sm:px-12">
          <div className="text-4xl" aria-hidden="true">
            👋
          </div>

          <h2 className="mt-4 text-2xl font-bold">
            How can we help you?
          </h2>

          <p className="mt-2 text-sm text-indigo-100">
            Search our help center to find answers to your questions.
          </p>

          <div className="mx-auto mt-7 flex max-w-xl items-center gap-3 rounded-xl bg-white px-4 py-3">
            <span className="text-xl text-slate-400" aria-hidden="true">
              ⌕
            </span>

            <label className="w-full">
              <span className="sr-only">Search help articles</span>
              <input
                type="search"
                placeholder="Search for help articles..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setActiveFaq(null);
                }}
                className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
            </label>
          </div>
        </section>

        {/* Categories */}
        <section>
          <div className="mb-5">
            <h2 className="text-lg font-bold text-slate-900">
              Browse Help Categories
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Explore help topics by category.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {categories.map((category) => (
              <article
                key={category.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-md"
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-2xl text-indigo-600"
                  aria-hidden="true"
                >
                  {category.icon}
                </div>

                <h3 className="mt-4 font-bold text-slate-800">
                  {category.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {category.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section
          id="faq"
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">
              Frequently Asked Questions
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Find quick answers to common questions.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredFaqs.map((faq, index) => (
              <div key={faq.question} className="py-4">
                <button
                  type="button"
                  onClick={() =>
                    setActiveFaq(activeFaq === index ? null : index)
                  }
                  aria-expanded={activeFaq === index}
                  className="flex w-full items-center justify-between gap-4 text-left"
                >
                  <span className="text-sm font-semibold text-slate-800">
                    {faq.question}
                  </span>

                  <span
                    className="text-xl text-indigo-600"
                    aria-hidden="true"
                  >
                    {activeFaq === index ? "−" : "+"}
                  </span>
                </button>

                {activeFaq === index && (
                  <p className="mt-3 pr-8 text-sm leading-7 text-slate-500">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}

            {filteredFaqs.length === 0 && (
              <p className="py-8 text-center text-sm text-slate-500">
                No matching questions found. Try another search.
              </p>
            )}
          </div>
        </section>

        {/* Contact Support */}
        <section className="grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl"
              aria-hidden="true"
            >
              ✉️
            </div>

            <h3 className="mt-4 font-bold text-slate-900">
              Email Support
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Have a question? Send us an email and our support team can help.
            </p>

            <a
              href="mailto:support@worksphere.com"
              className="mt-5 inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-800"
            >
              Contact Support →
            </a>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-2xl"
              aria-hidden="true"
            >
              📚
            </div>

            <h3 className="mt-4 font-bold text-slate-900">
              Documentation
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Explore guides and learn more about using WorkSphere.
            </p>

            <a
              href="#faq"
              onClick={() => {
                setSearch("");
                setActiveFaq(0);
              }}
              className="mt-5 inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-800"
            >
              Explore Guides →
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-400">
          © 2026 WorkSphere. All rights reserved.
        </footer>
      </div>
    </MainLayout>
  );
}
