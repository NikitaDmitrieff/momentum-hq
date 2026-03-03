"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";
import Link from "next/link";

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("alex@momentum-hq.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch {
      setError("Invalid credentials. Try any email/password.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link href="/" className="font-semibold text-xl tracking-tight">
            Momentum <span className="text-[#a78bfa]">HQ</span>
          </Link>
          <p className="text-[#71717a] text-sm mt-2">Sign in to your cockpit</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#18181b] border border-[#3f3f46] rounded-xl p-6 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-[#27272a] border border-[#3f3f46] rounded-md px-3 py-2 text-sm text-white placeholder:text-[#52525b] focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
              placeholder="you@example.com"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-[#27272a] border border-[#3f3f46] rounded-md px-3 py-2 text-sm text-white placeholder:text-[#52525b] focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#7c3aed] hover:bg-[#6d28d9] disabled:opacity-60 text-white font-medium py-2 rounded-md transition-colors text-sm mt-1"
          >
            {isLoading ? "Signing in…" : "Sign in"}
          </button>

          <p className="text-[#52525b] text-xs text-center">
            This is a demo — any credentials work.
          </p>
        </form>
      </div>
    </div>
  );
}
