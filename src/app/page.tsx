import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-[#3f3f46]">
        <span className="font-semibold text-lg tracking-tight">
          Momentum <span className="text-[#a78bfa]">HQ</span>
        </span>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm text-[#a1a1aa] hover:text-white transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/dashboard"
            className="text-sm bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-4 py-1.5 rounded-md transition-colors"
          >
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24 gap-8">
        <div className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full border border-[#3f3f46] text-[#a78bfa] bg-[#18181b]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] animate-pulse" />
          Built for founders who ship
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-balance max-w-3xl leading-tight">
          Your personal ops cockpit,{" "}
          <span className="text-[#a78bfa]">every single day</span>
        </h1>

        <p className="text-[#a1a1aa] text-lg max-w-xl text-balance">
          Plan your day, protect your priorities, block your time, and review
          what actually moved the needle — all in one focused workspace.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <Link
            href="/dashboard"
            className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-medium px-6 py-2.5 rounded-md transition-colors"
          >
            Open dashboard →
          </Link>
          <a
            href="#features"
            className="border border-[#3f3f46] hover:border-[#71717a] text-[#a1a1aa] hover:text-white font-medium px-6 py-2.5 rounded-md transition-colors"
          >
            Learn more
          </a>
        </div>
      </main>

      {/* Features */}
      <section id="features" className="py-20 px-6 border-t border-[#3f3f46]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-12">
            Everything you need. Nothing you don&apos;t.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="bg-[#18181b] border border-[#3f3f46] rounded-xl p-5 flex flex-col gap-2 hover:border-[#7c3aed] transition-colors"
              >
                <span className="text-2xl">{f.icon}</span>
                <h3 className="font-semibold text-sm">{f.title}</h3>
                <p className="text-[#71717a] text-xs leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-6 border-t border-[#3f3f46] text-center text-[#52525b] text-xs">
        © {new Date().getFullYear()} Momentum HQ. All rights reserved.
      </footer>
    </div>
  );
}

const FEATURES = [
  {
    icon: "📋",
    title: "Daily Plan",
    desc: "Set your intentions each morning with a structured daily planning ritual.",
  },
  {
    icon: "🎯",
    title: "Priorities",
    desc: "Surface what matters most. Three big rocks per day, no more.",
  },
  {
    icon: "⏱️",
    title: "Time Blocks",
    desc: "Design your calendar in advance and protect deep-work slots.",
  },
  {
    icon: "🔍",
    title: "Daily Review",
    desc: "Close the loop each evening with a structured reflection practice.",
  },
];
