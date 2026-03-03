"use client";

import { useState } from "react";

const QUESTIONS = [
  {
    id: "wins",
    label: "What were today's wins?",
    placeholder: "What went well, shipped, or moved forward…",
  },
  {
    id: "learnings",
    label: "What did you learn?",
    placeholder: "Insights, surprises, observations…",
  },
  {
    id: "blockers",
    label: "What slowed you down?",
    placeholder: "Blockers, distractions, or friction points…",
  },
  {
    id: "tomorrow",
    label: "What's the most important thing tomorrow?",
    placeholder: "One clear priority for the next day…",
  },
];

export default function ReviewPage() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  function handleChange(id: string, value: string) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setSaved(false);
  }

  function handleSave() {
    // In a real app, persist to DB
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const filled = QUESTIONS.filter((q) => answers[q.id]?.trim()).length;

  return (
    <div className="px-8 py-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Daily Review</h1>
        <p className="text-[#71717a] text-sm mt-1">
          Close the loop. Reflect, learn, reset.
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-1 bg-[#27272a] rounded-full">
          <div
            className="h-1 bg-[#7c3aed] rounded-full transition-all duration-500"
            style={{ width: `${(filled / QUESTIONS.length) * 100}%` }}
          />
        </div>
        <span className="text-xs text-[#71717a]">
          {filled}/{QUESTIONS.length}
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {QUESTIONS.map((q) => (
          <div
            key={q.id}
            className="bg-[#18181b] border border-[#3f3f46] rounded-xl p-5"
          >
            <label className="block text-sm font-medium mb-2">{q.label}</label>
            <textarea
              value={answers[q.id] ?? ""}
              onChange={(e) => handleChange(q.id, e.target.value)}
              placeholder={q.placeholder}
              rows={3}
              className="w-full bg-[#27272a] border border-[#3f3f46] rounded-md px-3 py-2 text-sm text-white placeholder:text-[#52525b] focus:outline-none focus:ring-2 focus:ring-[#7c3aed] resize-none"
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={handleSave}
          className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-medium px-5 py-2 rounded-md text-sm transition-colors"
        >
          Save review
        </button>
        {saved && (
          <span className="text-[#34d399] text-sm animate-fade-in">
            ✓ Saved
          </span>
        )}
      </div>
    </div>
  );
}
