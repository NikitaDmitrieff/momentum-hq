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
        <p className="text-[#52525b] text-sm mt-1">
          Close the loop. Reflect, learn, reset.
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-0.5 bg-[#27272a] rounded-full">
          <div
            className="h-0.5 bg-[#7c3aed] rounded-full transition-all duration-500"
            style={{ width: `${(filled / QUESTIONS.length) * 100}%` }}
          />
        </div>
        <span className="text-xs text-[#52525b]">
          {filled}/{QUESTIONS.length}
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {QUESTIONS.map((q) => (
          <div
            key={q.id}
            className="bg-[#18181b] border border-[#27272a] rounded-xl p-5 hover:border-[#3f3f46] transition-colors"
          >
            <label className="block text-xs font-semibold uppercase tracking-widest text-[#52525b] mb-3">
              {q.label}
            </label>
            <textarea
              value={answers[q.id] ?? ""}
              onChange={(e) => handleChange(q.id, e.target.value)}
              placeholder={q.placeholder}
              rows={3}
              className="w-full bg-transparent text-sm text-white placeholder:text-[#3f3f46] focus:outline-none resize-none"
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
