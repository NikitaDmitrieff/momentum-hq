"use client";

import { useState } from "react";

interface Block {
  id: number;
  time: string;
  label: string;
  type: "deep" | "admin" | "meeting" | "break";
}

const TYPE_COLORS: Record<Block["type"], string> = {
  deep: "bg-[#7c3aed]/20 border-[#7c3aed] text-[#a78bfa]",
  admin: "bg-[#0ea5e9]/10 border-[#0ea5e9] text-[#38bdf8]",
  meeting: "bg-[#f59e0b]/10 border-[#f59e0b] text-[#fbbf24]",
  break: "bg-[#10b981]/10 border-[#10b981] text-[#34d399]",
};

const DEFAULT_BLOCKS: Block[] = [
  { id: 1, time: "09:00", label: "Deep work — product sprint", type: "deep" },
  { id: 2, time: "11:00", label: "Team standup", type: "meeting" },
  { id: 3, time: "12:30", label: "Lunch break", type: "break" },
  { id: 4, time: "14:00", label: "Deep work — fundraising deck", type: "deep" },
  { id: 5, time: "16:00", label: "Email & admin", type: "admin" },
];

export default function TimeBlocksPage() {
  const [blocks, setBlocks] = useState<Block[]>(DEFAULT_BLOCKS);
  const [form, setForm] = useState({ time: "", label: "", type: "deep" as Block["type"] });

  function addBlock() {
    if (!form.time || !form.label.trim()) return;
    const newBlock: Block = { id: Date.now(), ...form };
    setBlocks((prev) =>
      [...prev, newBlock].sort((a, b) => a.time.localeCompare(b.time))
    );
    setForm({ time: "", label: "", type: "deep" });
  }

  function removeBlock(id: number) {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  }

  return (
    <div className="px-8 py-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Time Blocks</h1>
        <p className="text-[#71717a] text-sm mt-1">
          Design your day in advance. Protect your deep work.
        </p>
      </div>

      {/* Block list */}
      <div className="flex flex-col gap-2 mb-6">
        {blocks.map((block) => (
          <div
            key={block.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border group ${TYPE_COLORS[block.type]}`}
          >
            <span className="font-mono text-xs w-10 flex-shrink-0">
              {block.time}
            </span>
            <span className="flex-1 text-sm">{block.label}</span>
            <span className="text-xs capitalize opacity-60">{block.type}</span>
            <button
              onClick={() => removeBlock(block.id)}
              className="opacity-0 group-hover:opacity-100 text-current opacity-40 hover:opacity-100 text-xs transition-all ml-2"
            >
              ✕
            </button>
          </div>
        ))}

        {blocks.length === 0 && (
          <p className="text-[#52525b] text-sm text-center py-8">
            No blocks yet. Add one below.
          </p>
        )}
      </div>

      {/* Add block form */}
      <div className="bg-[#18181b] border border-[#3f3f46] rounded-xl p-5">
        <h2 className="text-sm font-semibold mb-4">Add a block</h2>
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#71717a]">Time</label>
              <input
                type="time"
                value={form.time}
                onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
                className="bg-[#27272a] border border-[#3f3f46] rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#71717a]">Type</label>
              <select
                value={form.type}
                onChange={(e) =>
                  setForm((f) => ({ ...f, type: e.target.value as Block["type"] }))
                }
                className="bg-[#27272a] border border-[#3f3f46] rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
              >
                <option value="deep">Deep Work</option>
                <option value="meeting">Meeting</option>
                <option value="admin">Admin</option>
                <option value="break">Break</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={form.label}
              onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
              onKeyDown={(e) => e.key === "Enter" && addBlock()}
              placeholder="What's this block for?"
              className="flex-1 bg-[#27272a] border border-[#3f3f46] rounded-md px-3 py-1.5 text-sm text-white placeholder:text-[#52525b] focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
            />
            <button
              onClick={addBlock}
              className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-4 py-1.5 rounded-md text-sm transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
