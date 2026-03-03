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

// Placeholder past reviews — realistic founder copy
const PAST_REVIEWS: {
  date: string;
  wins: string;
  tomorrow: string;
}[] = [];

export default function ReviewPage() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);
  const [pastReviews, setPastReviews] = useState(PAST_REVIEWS);

  function handleChange(id: string, value: string) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setSaved(false);
  }

  function handleSave() {
    const wins = answers["wins"]?.trim();
    const tomorrow = answers["tomorrow"]?.trim();
    if (wins || tomorrow) {
      const today = new Date().toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      setPastReviews((prev) => [
        { date: today, wins: wins || "—", tomorrow: tomorrow || "—" },
        ...prev,
      ]);
    }
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

      {/* Past Reviews */}
      <div className="mt-12">
        <h2 className="text-sm font-semibold mb-4">Past reviews</h2>

        {pastReviews.length === 0 ? (
          /* Empty state */
          <div className="bg-[#18181b] border border-[#3f3f46] rounded-xl p-8 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-xl bg-[#27272a] flex items-center justify-center mb-3">
              <svg
                className="w-5 h-5 text-[#52525b]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                />
              </svg>
            </div>
            <p className="text-sm font-medium mb-1">No past reviews yet</p>
            <p className="text-[#52525b] text-xs max-w-xs">
              Complete your first daily review above and it will appear here.
              Reviews help you spot patterns and track momentum over time.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {pastReviews.map((r, i) => (
              <div
                key={i}
                className="bg-[#18181b] border border-[#3f3f46] rounded-xl p-4"
              >
                <p className="text-xs text-[#71717a] mb-2">{r.date}</p>
                <div className="flex flex-col gap-1.5">
                  <div>
                    <span className="text-[10px] text-[#52525b] uppercase tracking-wide">
                      Wins
                    </span>
                    <p className="text-sm text-[#f4f4f5] mt-0.5">{r.wins}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#52525b] uppercase tracking-wide">
                      Tomorrow
                    </span>
                    <p className="text-sm text-[#f4f4f5] mt-0.5">
                      {r.tomorrow}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
