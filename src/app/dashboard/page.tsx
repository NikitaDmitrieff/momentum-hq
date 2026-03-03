"use client";

import { useAuth } from "@/context/auth";
import { useState } from "react";

const TODAY = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

const DEFAULT_TASKS = [
  { id: 1, text: "Review product roadmap", done: false },
  { id: 2, text: "Sync with engineering team", done: false },
  { id: 3, text: "Write weekly investor update", done: false },
];

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
        <p className="text-[#71717a] text-sm">{TODAY}</p>
        <h1 className="text-2xl font-semibold mt-1">
          Good morning, {user?.name.split(" ")[0]} 👋
        </h1>
      </div>

      {/* Intention */}
      <div className="bg-[#18181b] border border-[#3f3f46] rounded-xl p-5 mb-5">
        <label className="block text-sm font-medium mb-2">
          Today&apos;s intention
        </label>
        <input
          type="text"
          value={intention}
          onChange={(e) => setIntention(e.target.value)}
          placeholder="What does a great day look like today?"
          className="w-full bg-[#27272a] border border-[#3f3f46] rounded-md px-3 py-2 text-sm text-white placeholder:text-[#52525b] focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
        />
      </div>

      {/* Tasks */}
      <div className="bg-[#18181b] border border-[#3f3f46] rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold">Today&apos;s tasks</h2>
          <span className="text-xs text-[#71717a]">
            {completed}/{tasks.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-[#27272a] rounded-full mb-4">
          <div
            className="h-1 bg-[#7c3aed] rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <ul className="flex flex-col gap-2 mb-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center gap-3 group cursor-pointer"
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

        {/* Add task */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="Add a task…"
            className="flex-1 bg-[#27272a] border border-[#3f3f46] rounded-md px-3 py-1.5 text-sm text-white placeholder:text-[#52525b] focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
          />
          <button
            onClick={addTask}
            className="bg-[#27272a] hover:bg-[#3f3f46] border border-[#3f3f46] text-[#a1a1aa] hover:text-white px-3 py-1.5 rounded-md text-sm transition-colors"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
