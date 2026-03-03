"use client";

import { useAuth } from "@/context/auth";
import { useState } from "react";

const DEFAULT_TASKS = [
  { id: 1, text: "Review product roadmap", done: false },
  { id: 2, text: "Sync with engineering team", done: false },
  { id: 3, text: "Write weekly investor update", done: false },
];

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState(DEFAULT_TASKS);
  const [newTask, setNewTask] = useState("");
  const [intention, setIntention] = useState("");

  function toggleTask(id: number) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function addTask() {
    if (!newTask.trim()) return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), text: newTask.trim(), done: false },
    ]);
    setNewTask("");
  }

  const completed = tasks.filter((t) => t.done).length;
  const progress = tasks.length > 0 ? (completed / tasks.length) * 100 : 0;

  return (
    <div className="px-8 py-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">
          {greeting()}, {user?.name.split(" ")[0]} 👋
        </h1>
        <p className="text-[#52525b] text-sm mt-1">
          Let&apos;s make today count.
        </p>
      </div>

      {/* Intention */}
      <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-5 mb-4 hover:border-[#3f3f46] transition-colors">
        <label className="block text-xs font-semibold uppercase tracking-widest text-[#52525b] mb-3">
          Today&apos;s intention
        </label>
        <input
          type="text"
          value={intention}
          onChange={(e) => setIntention(e.target.value)}
          placeholder="What does a great day look like today?"
          className="w-full bg-transparent border-none text-sm text-white placeholder:text-[#3f3f46] focus:outline-none"
        />
      </div>

      {/* Tasks */}
      <div className="bg-[#18181b] border border-[#27272a] rounded-xl overflow-hidden hover:border-[#3f3f46] transition-colors">
        <div className="px-5 pt-5 pb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#52525b]">
              Today&apos;s tasks
            </h2>
            <span className="text-xs text-[#52525b] tabular-nums">
              {completed}/{tasks.length} done
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-0.5 bg-[#27272a] rounded-full mb-5">
            <div
              className="h-0.5 bg-[#7c3aed] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <ul className="flex flex-col gap-1">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center gap-3 group cursor-pointer py-1.5 rounded-lg px-1 hover:bg-[#27272a]/50 transition-colors"
                onClick={() => toggleTask(task.id)}
              >
                <div
                  className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${
                    task.done
                      ? "bg-[#7c3aed] border-[#7c3aed]"
                      : "border-[#3f3f46] group-hover:border-[#7c3aed]"
                  }`}
                >
                  {task.done && (
                    <svg
                      className="w-2.5 h-2.5 text-white"
                      fill="none"
                      viewBox="0 0 12 12"
                    >
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <span
                  className={`text-sm transition-colors ${
                    task.done ? "line-through text-[#52525b]" : "text-[#f4f4f5]"
                  }`}
                >
                  {task.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Add task */}
        <div className="border-t border-[#27272a] px-5 py-3 flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="Add a task…"
            className="flex-1 bg-transparent text-sm text-white placeholder:text-[#3f3f46] focus:outline-none"
          />
          <button
            onClick={addTask}
            className="text-[#52525b] hover:text-[#a1a1aa] text-xl leading-none transition-colors px-1"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
