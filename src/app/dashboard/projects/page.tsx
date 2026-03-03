"use client";

import { useState } from "react";

export default function ProjectsPage() {
  const [projects] = useState<string[]>([]);

  return (
    <div className="px-8 py-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Projects</h1>
          <p className="text-[#71717a] text-sm mt-1">
            Track your key initiatives and connect them to your daily plan.
          </p>
        </div>
        <button
          className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-medium px-4 py-2 rounded-md text-sm transition-colors"
          onClick={() => {}}
        >
          + New project
        </button>
      </div>

      {projects.length === 0 ? (
        /* Empty state */
        <div className="bg-[#18181b] border border-[#3f3f46] rounded-xl p-12 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#27272a] flex items-center justify-center mb-4">
            <svg
              className="w-7 h-7 text-[#52525b]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
              />
            </svg>
          </div>

          <h2 className="text-base font-semibold mb-2">No projects yet</h2>
          <p className="text-[#71717a] text-sm max-w-xs mb-6">
            Projects help you group your big rocks and daily tasks around the
            initiatives that matter most — fundraising, product, hiring.
          </p>

          <button
            className="bg-[#27272a] hover:bg-[#3f3f46] border border-[#3f3f46] text-sm font-medium px-4 py-2 rounded-md transition-colors"
            onClick={() => {}}
          >
            Create your first project
          </button>
        </div>
      ) : null}

      {/* Suggested project types (shown alongside empty state) */}
      {projects.length === 0 && (
        <div className="mt-5 grid grid-cols-3 gap-3">
          {[
            {
              icon: "🚀",
              name: "Product launch",
              desc: "Ship v2 to early adopters",
            },
            {
              icon: "💰",
              name: "Fundraising",
              desc: "Close the seed round",
            },
            {
              icon: "🤝",
              name: "Hiring",
              desc: "Build out the founding team",
            },
          ].map((t) => (
            <div
              key={t.name}
              className="bg-[#18181b] border border-[#3f3f46] rounded-xl p-4 cursor-pointer hover:border-[#7c3aed]/50 transition-colors group"
            >
              <span className="text-xl mb-2 block">{t.icon}</span>
              <p className="text-sm font-medium group-hover:text-white transition-colors">
                {t.name}
              </p>
              <p className="text-[#52525b] text-xs mt-0.5">{t.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
