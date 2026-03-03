"use client";

import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Today", icon: "📋" },
  { href: "/dashboard/priorities", label: "Priorities", icon: "🎯" },
  { href: "/dashboard/time-blocks", label: "Time Blocks", icon: "⏱️" },
  { href: "/dashboard/review", label: "Review", icon: "🔍" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-[#71717a] text-sm">Redirecting…</span>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 bg-[#18181b] border-r border-[#3f3f46] flex flex-col">
        <div className="px-4 py-5 border-b border-[#3f3f46]">
          <Link href="/" className="font-semibold text-base tracking-tight">
            Momentum <span className="text-[#a78bfa]">HQ</span>
          </Link>
        </div>

        <nav className="flex-1 px-2 py-4 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-[#27272a] text-white font-medium"
                    : "text-[#a1a1aa] hover:text-white hover:bg-[#27272a]"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User footer */}
        <div className="px-3 py-4 border-t border-[#3f3f46] flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#7c3aed] flex items-center justify-center text-xs font-bold flex-shrink-0">
            {user.avatarInitials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate">{user.name}</p>
            <p className="text-[#52525b] text-[10px] truncate">{user.email}</p>
          </div>
          <button
            onClick={logout}
            className="text-[#52525b] hover:text-white text-xs transition-colors"
            title="Sign out"
          >
            ↩
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
