"use client";

import { useAuth } from "@/context/auth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

const NAV_SECTIONS = [
  {
    label: "Daily",
    items: [
      { href: "/dashboard", label: "Today", icon: "📋", shortcut: "G T" },
      { href: "/dashboard/priorities", label: "Priorities", icon: "🎯", shortcut: "G P" },
      { href: "/dashboard/time-blocks", label: "Time Blocks", icon: "⏱️", shortcut: "G B" },
    ],
  },
  {
    label: "Reflect",
    items: [
      { href: "/dashboard/review", label: "Review", icon: "🔍", shortcut: "G R" },
    ],
  },
];

const SHORTCUTS = [
  { key: "G T", desc: "Go to Today" },
  { key: "G P", desc: "Go to Priorities" },
  { key: "G B", desc: "Go to Time Blocks" },
  { key: "G R", desc: "Go to Review" },
  { key: "?", desc: "Toggle this panel" },
  { key: "Esc", desc: "Close panel" },
];

const ALL_ITEMS = NAV_SECTIONS.flatMap((s) => s.items);

function formatDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [keyBuffer, setKeyBuffer] = useState("");

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (e.key === "?") {
        setShowShortcuts((v) => !v);
        return;
      }
      if (e.key === "Escape") {
        setShowShortcuts(false);
        setKeyBuffer("");
        return;
      }

      const buf = (keyBuffer + e.key.toUpperCase()).slice(-4);
      setKeyBuffer(buf);

      if (buf.endsWith("GT")) {
        router.push("/dashboard");
        setKeyBuffer("");
      } else if (buf.endsWith("GP")) {
        router.push("/dashboard/priorities");
        setKeyBuffer("");
      } else if (buf.endsWith("GB")) {
        router.push("/dashboard/time-blocks");
        setKeyBuffer("");
      } else if (buf.endsWith("GR")) {
        router.push("/dashboard/review");
        setKeyBuffer("");
      }
    },
    [keyBuffer, router]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-[#71717a] text-sm">Redirecting…</span>
      </div>
    );
  }

  const currentItem = ALL_ITEMS.find((item) => item.href === pathname);
  const pageTitle = currentItem?.label ?? "Dashboard";

  return (
    <div className="flex h-screen bg-[#0f0f11] text-[#f4f4f5] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 bg-[#18181b] border-r border-[#27272a] flex flex-col">
        {/* Logo */}
        <div className="px-4 py-4 border-b border-[#27272a]">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#7c3aed] flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
              M
            </div>
            <span className="font-semibold text-sm">
              Momentum <span className="text-[#a78bfa]">HQ</span>
            </span>
          </Link>
        </div>

        {/* Navigation sections */}
        <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label}>
              <p className="px-2 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-[#52525b]">
                {section.label}
              </p>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`group flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-all ${
                        active
                          ? "bg-[#7c3aed]/15 text-white font-medium"
                          : "text-[#a1a1aa] hover:text-white hover:bg-[#27272a]"
                      }`}
                    >
                      <span className="text-base leading-none">{item.icon}</span>
                      <span className="flex-1">{item.label}</span>
                      {active ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed] flex-shrink-0" />
                      ) : (
                        <span className="text-[10px] font-mono text-[#52525b] opacity-0 group-hover:opacity-100 transition-opacity">
                          {item.shortcut}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Shortcuts hint */}
        <div className="px-3 pb-2">
          <button
            onClick={() => setShowShortcuts(true)}
            className="w-full flex items-center gap-2 px-2 py-2 rounded-lg text-xs text-[#52525b] hover:text-[#a1a1aa] hover:bg-[#27272a] transition-colors"
          >
            <kbd className="px-1.5 py-0.5 bg-[#27272a] border border-[#3f3f46] rounded text-[10px] font-mono leading-none">
              ?
            </kbd>
            <span>Keyboard shortcuts</span>
          </button>
        </div>

        {/* User footer */}
        <div className="px-3 py-3 border-t border-[#27272a]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#7c3aed] flex items-center justify-center text-xs font-bold flex-shrink-0">
              {user.avatarInitials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-[#f4f4f5] truncate">{user.name}</p>
              <p className="text-[11px] text-[#52525b] truncate">{user.email}</p>
            </div>
            <button
              onClick={logout}
              className="text-[#52525b] hover:text-[#a1a1aa] transition-colors text-sm flex-shrink-0"
              title="Sign out"
            >
              ↩
            </button>
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-13 border-b border-[#27272a] flex items-center justify-between px-6 flex-shrink-0 bg-[#0f0f11]">
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-semibold text-[#f4f4f5]">{pageTitle}</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#52525b]">{formatDate()}</span>
            <div className="w-px h-4 bg-[#27272a]" />
            <button
              onClick={() => setShowShortcuts(true)}
              className="flex items-center gap-1.5 text-xs text-[#52525b] hover:text-[#a1a1aa] transition-colors"
            >
              <kbd className="px-1.5 py-0.5 bg-[#27272a] border border-[#3f3f46] rounded text-[10px] font-mono leading-none">
                ?
              </kbd>
              <span>Shortcuts</span>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>

      {/* Keyboard shortcuts modal */}
      {showShortcuts && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowShortcuts(false)}
        >
          <div
            className="bg-[#18181b] border border-[#3f3f46] rounded-xl p-6 w-80 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold">Keyboard Shortcuts</h2>
              <button
                onClick={() => setShowShortcuts(false)}
                className="text-[#52525b] hover:text-[#a1a1aa] transition-colors text-xs"
              >
                ESC
              </button>
            </div>
            <div className="space-y-2.5">
              {SHORTCUTS.map((s) => (
                <div key={s.key} className="flex items-center justify-between gap-4">
                  <span className="text-sm text-[#a1a1aa]">{s.desc}</span>
                  <kbd className="px-2 py-1 bg-[#27272a] border border-[#3f3f46] rounded text-[11px] font-mono text-[#f4f4f5] whitespace-nowrap flex-shrink-0">
                    {s.key}
                  </kbd>
                </div>
              ))}
            </div>
            <p className="mt-5 text-[11px] text-[#52525b]">
              Press <kbd className="px-1 py-0.5 bg-[#27272a] rounded text-[10px] font-mono">?</kbd> anywhere to toggle this panel.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
