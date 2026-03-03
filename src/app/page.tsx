"use client";

import Link from "next/link";
import { useState } from "react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-[#3f3f46] sticky top-0 z-50 bg-[#0f0f11]/90 backdrop-blur-sm">
        <span className="font-semibold text-lg tracking-tight">
          Momentum <span className="text-[#a78bfa]">HQ</span>
        </span>
        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href="#pricing"
            className="text-sm text-[#a1a1aa] hover:text-white transition-colors hidden sm:block"
          >
            Pricing
          </a>
          <a
            href="#faq"
            className="text-sm text-[#a1a1aa] hover:text-white transition-colors hidden sm:block"
          >
            FAQ
          </a>
          <Link
            href="/login"
            className="text-sm text-[#a1a1aa] hover:text-white transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/dashboard"
            className="text-sm bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-4 py-1.5 rounded-md transition-colors font-medium"
          >
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-28 sm:py-36 gap-8 overflow-hidden">
        {/* Gradient glow background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[#7c3aed]/20 rounded-full blur-[130px]" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-7 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full border border-[#3f3f46] text-[#a78bfa] bg-[#18181b]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] animate-pulse" />
            Built for founders who ship
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-balance leading-tight">
            Your personal ops cockpit,{" "}
            <span className="text-[#a78bfa]">every single day</span>
          </h1>

          <p className="text-[#a1a1aa] text-lg max-w-xl text-balance leading-relaxed">
            Plan your day, protect your priorities, block your time, and review
            what actually moved the needle — all in one focused workspace.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-1">
            <Link
              href="/dashboard"
              className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold px-8 py-3 rounded-md transition-colors text-sm"
            >
              Start for free →
            </Link>
            <a
              href="#features"
              className="border border-[#3f3f46] hover:border-[#71717a] text-[#a1a1aa] hover:text-white font-medium px-8 py-3 rounded-md transition-colors text-sm"
            >
              See how it works
            </a>
          </div>

          <p className="text-xs text-[#52525b]">
            No credit card required · Free forever plan available
          </p>
        </div>
      </section>

      {/* Stats / Social proof */}
      <section className="py-12 border-y border-[#3f3f46] bg-[#18181b]">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-center text-[10px] sm:text-xs text-[#52525b] uppercase tracking-widest mb-8">
            Trusted by indie founders and early-stage teams
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  {s.value}
                </div>
                <div className="text-xs text-[#71717a] mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-xs text-[#7c3aed] font-semibold uppercase tracking-widest mb-3">
            Features
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            Everything you need. Nothing you don&apos;t.
          </h2>
          <p className="text-center text-[#71717a] max-w-xl mx-auto mb-12 text-sm leading-relaxed">
            Built around the daily rituals of high-output founders. Four
            powerful views, zero bloat.
          </p>
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

      {/* Testimonials */}
      <section
        id="testimonials"
        className="py-24 px-6 bg-[#18181b] border-y border-[#3f3f46]"
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs text-[#7c3aed] font-semibold uppercase tracking-widest mb-3">
            Testimonials
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            Founders love it. Here&apos;s why.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-[#0f0f11] border border-[#3f3f46] rounded-xl p-6 flex flex-col gap-4"
              >
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[#a78bfa] text-sm">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-sm text-[#d4d4d8] leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-[#27272a]">
                  <div className="w-8 h-8 rounded-full bg-[#7c3aed] flex items-center justify-center text-xs font-semibold text-white flex-shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">
                      {t.name}
                    </div>
                    <div className="text-xs text-[#71717a]">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs text-[#7c3aed] font-semibold uppercase tracking-widest mb-3">
            Pricing
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            Simple, founder-friendly pricing
          </h2>
          <p className="text-center text-[#71717a] max-w-md mx-auto mb-12 text-sm leading-relaxed">
            Start free. Upgrade when you&apos;re ready. No hidden fees, no
            surprises.
          </p>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative border rounded-xl p-6 flex flex-col gap-5 ${
                  plan.featured
                    ? "border-[#7c3aed] bg-[#18181b]"
                    : "border-[#3f3f46] bg-[#18181b]"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#7c3aed] text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                    Most popular
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-sm text-[#a1a1aa]">
                    {plan.name}
                  </h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-sm text-[#71717a]">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#71717a] mt-2 leading-relaxed">
                    {plan.description}
                  </p>
                </div>
                <ul className="flex flex-col gap-2.5 flex-1">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-xs text-[#a1a1aa]"
                    >
                      <span className="text-[#a78bfa] mt-0.5 flex-shrink-0">
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/dashboard"
                  className={`text-center text-sm font-medium py-2.5 px-4 rounded-md transition-colors ${
                    plan.featured
                      ? "bg-[#7c3aed] hover:bg-[#6d28d9] text-white"
                      : "border border-[#3f3f46] hover:border-[#71717a] text-[#a1a1aa] hover:text-white"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Comparison row */}
          <div className="mt-12 border border-[#3f3f46] rounded-xl overflow-hidden">
            <div className="grid grid-cols-4 bg-[#18181b] border-b border-[#3f3f46] text-xs font-semibold px-4 py-3">
              <div className="text-[#71717a]">Feature</div>
              <div className="text-center text-[#a1a1aa]">Free</div>
              <div className="text-center text-[#a78bfa]">Pro</div>
              <div className="text-center text-[#a1a1aa]">Team</div>
            </div>
            {COMPARISON.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-4 px-4 py-3 text-xs ${
                  i % 2 === 0 ? "bg-[#0f0f11]" : "bg-[#18181b]"
                }`}
              >
                <div className="text-[#a1a1aa]">{row.feature}</div>
                <div className="text-center text-[#71717a]">{row.free}</div>
                <div className="text-center text-[#a78bfa] font-medium">
                  {row.pro}
                </div>
                <div className="text-center text-[#71717a]">{row.team}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="py-24 px-6 bg-[#18181b] border-t border-[#3f3f46]"
      >
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-xs text-[#7c3aed] font-semibold uppercase tracking-widest mb-3">
            FAQ
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            Common questions
          </h2>
          <div className="flex flex-col gap-3">
            {FAQ.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 relative overflow-hidden border-t border-[#3f3f46]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#7c3aed]/15 rounded-full blur-[110px]" />
        </div>
        <div className="relative max-w-2xl mx-auto text-center flex flex-col items-center gap-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">
            Ready to run your day like a{" "}
            <span className="text-[#a78bfa]">pro?</span>
          </h2>
          <p className="text-[#a1a1aa] text-lg max-w-md text-balance leading-relaxed">
            Join hundreds of founders who use Momentum HQ to stay focused, move
            fast, and build what matters.
          </p>
          <Link
            href="/dashboard"
            className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold px-8 py-3 rounded-md transition-colors text-sm mt-2"
          >
            Start for free — no card required →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[#3f3f46]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-semibold text-sm tracking-tight">
            Momentum <span className="text-[#a78bfa]">HQ</span>
          </span>
          <div className="flex items-center gap-6 text-xs text-[#52525b]">
            <a href="#features" className="hover:text-[#a1a1aa] transition-colors">
              Features
            </a>
            <a href="#pricing" className="hover:text-[#a1a1aa] transition-colors">
              Pricing
            </a>
            <a href="#faq" className="hover:text-[#a1a1aa] transition-colors">
              FAQ
            </a>
          </div>
          <p className="text-xs text-[#52525b]">
            © {new Date().getFullYear()} Momentum HQ. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#3f3f46] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium hover:bg-[#27272a] transition-colors"
      >
        {q}
        <span
          className={`text-[#71717a] transition-transform duration-200 flex-shrink-0 ml-4 ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-[#71717a] leading-relaxed border-t border-[#3f3f46] pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

const STATS = [
  { value: "500+", label: "Founders using it" },
  { value: "12k+", label: "Tasks completed" },
  { value: "4.9/5", label: "Average rating" },
  { value: "0", label: "Features you don't need" },
];

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

const TESTIMONIALS = [
  {
    quote:
      "Momentum HQ replaced three different apps I was juggling. Now I open it every morning and close it every evening. That's it.",
    name: "Sarah Chen",
    role: "Founder, Orbit Labs",
    initials: "SC",
  },
  {
    quote:
      "The time blocking feature alone is worth it. I finally stopped letting my calendar run me. I run my calendar now.",
    name: "Marcus Webb",
    role: "CEO, Clearpath",
    initials: "MW",
  },
  {
    quote:
      "I shipped more in my first week using Momentum HQ than in the entire month before. The daily review is a game changer.",
    name: "Priya Nair",
    role: "Solo founder, Inkwell",
    initials: "PN",
  },
];

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for solo founders just getting started.",
    featured: false,
    cta: "Get started free",
    features: [
      "Daily planning workspace",
      "Up to 3 priorities per day",
      "Basic time blocks",
      "Daily review journal",
      "1 workspace",
    ],
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "For founders serious about operating at their peak.",
    featured: true,
    cta: "Start Pro trial",
    features: [
      "Everything in Free",
      "Unlimited priorities",
      "Advanced time blocking",
      "Weekly review mode",
      "Keyboard shortcuts",
      "Priority support",
    ],
  },
  {
    name: "Team",
    price: "$49",
    period: "/month",
    description: "For founding teams who ship together.",
    featured: false,
    cta: "Contact us",
    features: [
      "Everything in Pro",
      "Up to 5 team members",
      "Shared priorities view",
      "Team standup digest",
      "Admin dashboard",
      "SSO / SAML",
    ],
  },
];

const COMPARISON = [
  { feature: "Daily planning", free: "✓", pro: "✓", team: "✓" },
  { feature: "Priorities per day", free: "3", pro: "Unlimited", team: "Unlimited" },
  { feature: "Time blocks", free: "Basic", pro: "Advanced", team: "Advanced" },
  { feature: "Weekly review", free: "—", pro: "✓", team: "✓" },
  { feature: "Team members", free: "1", pro: "1", team: "Up to 5" },
  { feature: "Priority support", free: "—", pro: "✓", team: "✓" },
];

const FAQ = [
  {
    q: "Is there really a free plan?",
    a: "Yes — the free plan is genuinely useful and not a crippled trial. You get the core daily planning loop: intentions, priorities, time blocks, and daily review. Upgrade when you need more.",
  },
  {
    q: "Do I need a credit card to sign up?",
    a: "No credit card required for the free plan. We'll ask for payment details only when you choose to upgrade to Pro or Team.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Absolutely. Cancel from your account settings at any time. You'll keep access until the end of your billing period, then drop back to the free plan with no data loss.",
  },
  {
    q: "Is my data private?",
    a: "Your plans, priorities, and reviews are private to you by default. We don't sell your data or use it to train AI models. Team plan members only see what you explicitly share.",
  },
  {
    q: "What makes Momentum HQ different from Notion or Todoist?",
    a: "Momentum HQ is opinionated by design. It's built around one workflow — the daily ops ritual — not an infinite canvas. Less setup, faster results, and it actually gets used.",
  },
  {
    q: "Is there a mobile app?",
    a: "The web app is fully responsive and works great on mobile. Native iOS and Android apps are on the roadmap for later this year.",
  },
];
