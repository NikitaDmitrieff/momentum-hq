"use client";

import { useState, useEffect } from "react";
import { useOnboarding } from "@/context/onboarding";

const MAX_ROCKS = 3;

export default function PrioritiesPage() {
  const { data: onboardingData } = useOnboarding();
  const [rocks, setRocks] = useState<{ id: number; text: string; done: boolean }[]>([]);

  useEffect(() => {
    if (onboardingData) {
      setRocks(
        onboardingData.priorities
          .filter((p) => p.trim() !== "")
          .map((text, i) => ({ id: i + 1, text, done: false }))
      );
    }
  }, [onboardingData]);
  const [newRock, setNewRock] = useState("");

  function toggleRock(id: number) {
    setRocks((prev) =>
      prev.map((r) => (r.id === id ? { ...r, done: !r.done } : r))
    );
  }

  function addRock() {
    if (!newRock.trim() || rocks.length >= MAX_ROCKS) return;
    setRocks((prev) => [
      ...prev,
      { id: Date.now(), text: newRock.trim(), done: false },
    ]);
    setNewRock("");
  }

  function removeRock(id: number) {
    setRocks((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <div className="px-8 py-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Priorities</h1>
        <p className="text-[#71717a] text-sm mt-1">
          Three big rocks max. What absolutely must move forward today?
        </p>
      </div>

      <div className="bg-[#18181b] border border-[#3f3f46] rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold">Big Rocks</h2>
          <span className="text-xs text-[#71717a]">
            {rocks.length}/{MAX_ROCKS}
          </span>
        </div>

        <ul className="flex flex-col gap-3 mb-4">
          {rocks.map((rock, i) => (
            <li
              key={rock.id}
              className="flex items-center gap-3 group"
            >
              <span className="text-[#52525b] text-xs w-4 text-right flex-shrink-0">
                {i + 1}
              </span>
              <div
                className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center cursor-pointer transition-colors ${
                  rock.done
                    ? "bg-[#7c3aed] border-[#7c3aed]"
                    : "border-[#3f3f46] hover:border-[#7c3aed]"
                }`}
                onClick={() => toggleRock(rock.id)}
              >
                {rock.done && (
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span
                className={`flex-1 text-sm ${rock.done ? "line-through text-[#52525b]" : ""}`}
                onClick={() => toggleRock(rock.id)}
              >
                {rock.text}
              </span>
              <button
                onClick={() => removeRock(rock.id)}
                className="opacity-0 group-hover:opacity-100 text-[#52525b] hover:text-red-400 text-xs transition-all"
              >
                ✕
              </button>
            </li>
          ))}

          {rocks.length === 0 && (
            <p className="text-[#52525b] text-sm text-center py-4">
              No big rocks yet. Add up to {MAX_ROCKS}.
            </p>
          )}
        </ul>

        {rocks.length < MAX_ROCKS && (
          <div className="flex gap-2">
            <input
              type="text"
              value={newRock}
              onChange={(e) => setNewRock(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addRock()}
              placeholder="What must move forward today?"
              className="flex-1 bg-[#27272a] border border-[#3f3f46] rounded-md px-3 py-1.5 text-sm text-white placeholder:text-[#52525b] focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
            />
            <button
              onClick={addRock}
              className="bg-[#27272a] hover:bg-[#3f3f46] border border-[#3f3f46] text-[#a1a1aa] hover:text-white px-3 py-1.5 rounded-md text-sm transition-colors"
            >
              +
            </button>
          </div>
        )}

        {rocks.length >= MAX_ROCKS && (
          <p className="text-xs text-[#52525b] text-center">
            You&apos;ve hit the limit. Focus on these {MAX_ROCKS} things.
          </p>
        )}
      </div>
    </div>
  );
}
