"use client";

import { useState, useEffect, useRef } from "react";
import { useOnboarding, OnboardingData } from "@/context/onboarding";

type Step = 0 | 1 | 2;

export default function OnboardingModal() {
  const { isComplete, completeOnboarding } = useOnboarding();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<Step>(0);
  const [priorities, setPriorities] = useState<[string, string, string]>(["", "", ""]);
  const [dayStart, setDayStart] = useState("09:00");
  const [dayEnd, setDayEnd] = useState("18:00");

  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isComplete && step === 1) {
      firstInputRef.current?.focus();
    }
  }, [mounted, isComplete, step]);

  if (!mounted || isComplete) return null;

  function setPriority(index: number, value: string) {
    const next: [string, string, string] = [...priorities] as [string, string, string];
    next[index] = value;
    setPriorities(next);
  }

  const canAdvanceStep1 =
    priorities[0].trim() !== "" &&
    priorities[1].trim() !== "" &&
    priorities[2].trim() !== "";

  function handleFinish() {
    const data: OnboardingData = { priorities, dayStart, dayEnd };
    completeOnboarding(data);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm">
      <div className="bg-[#18181b] border border-[#3f3f46] rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl">
        {/* Step dots */}
        {step > 0 && (
          <div className="flex gap-1.5 mb-6">
            {([1, 2] as const).map((s) => (
              <div
                key={s}
                className={`h-1 rounded-full transition-all duration-300 ${
                  step >= s ? "bg-[#7c3aed] w-6" : "bg-[#3f3f46] w-3"
                }`}
              />
            ))}
          </div>
        )}

        {step === 0 && <WelcomeStep onNext={() => setStep(1)} />}
        {step === 1 && (
          <PrioritiesStep
            priorities={priorities}
            onChange={setPriority}
            onBack={() => setStep(0)}
            onNext={() => setStep(2)}
            canAdvance={canAdvanceStep1}
            firstInputRef={firstInputRef}
          />
        )}
        {step === 2 && (
          <WorkdayStep
            dayStart={dayStart}
            dayEnd={dayEnd}
            onDayStartChange={setDayStart}
            onDayEndChange={setDayEnd}
            onBack={() => setStep(1)}
            onFinish={handleFinish}
          />
        )}
      </div>
    </div>
  );
}

function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="text-center">
      <div className="text-4xl mb-4">🚀</div>
      <h2 className="text-xl font-semibold mb-2">Welcome to Momentum HQ</h2>
      <p className="text-[#71717a] text-sm mb-6 leading-relaxed">
        Your personal ops cockpit for founders who ship.
        <br />
        Let&apos;s set up your workspace — it takes under a minute.
      </p>
      <button
        onClick={onNext}
        className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
      >
        Get Started →
      </button>
    </div>
  );
}

function PrioritiesStep({
  priorities,
  onChange,
  onBack,
  onNext,
  canAdvance,
  firstInputRef,
}: {
  priorities: [string, string, string];
  onChange: (index: number, value: string) => void;
  onBack: () => void;
  onNext: () => void;
  canAdvance: boolean;
  firstInputRef: React.RefObject<HTMLInputElement>;
}) {
  return (
    <div>
      <p className="text-xs text-[#71717a] font-medium uppercase tracking-wide mb-1">
        Step 1 of 2
      </p>
      <h2 className="text-lg font-semibold mb-1">What are your top 3 priorities?</h2>
      <p className="text-[#71717a] text-sm mb-5">
        These become your Big Rocks — the outcomes that matter most right now.
      </p>

      <div className="flex flex-col gap-3 mb-6">
        {([0, 1, 2] as const).map((i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-[#52525b] text-sm w-4 text-right flex-shrink-0">
              {i + 1}
            </span>
            <input
              ref={i === 0 ? firstInputRef : undefined}
              type="text"
              value={priorities[i]}
              onChange={(e) => onChange(i, e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && i < 2 && (e.currentTarget.nextElementSibling as HTMLElement | null)?.focus()}
              placeholder={
                i === 0
                  ? "e.g. Launch beta to 50 users"
                  : i === 1
                  ? "e.g. Close seed round term sheet"
                  : "e.g. Hire first engineer"
              }
              className="flex-1 bg-[#27272a] border border-[#3f3f46] rounded-md px-3 py-2 text-sm text-white placeholder:text-[#52525b] focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
            />
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 bg-[#27272a] hover:bg-[#3f3f46] border border-[#3f3f46] text-[#a1a1aa] hover:text-white font-medium py-2.5 px-4 rounded-lg transition-colors text-sm"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!canAdvance}
          className="flex-1 bg-[#7c3aed] hover:bg-[#6d28d9] disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium py-2.5 px-4 rounded-lg transition-colors text-sm"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

function WorkdayStep({
  dayStart,
  dayEnd,
  onDayStartChange,
  onDayEndChange,
  onBack,
  onFinish,
}: {
  dayStart: string;
  dayEnd: string;
  onDayStartChange: (v: string) => void;
  onDayEndChange: (v: string) => void;
  onBack: () => void;
  onFinish: () => void;
}) {
  return (
    <div>
      <p className="text-xs text-[#71717a] font-medium uppercase tracking-wide mb-1">
        Step 2 of 2
      </p>
      <h2 className="text-lg font-semibold mb-1">When is your ideal workday?</h2>
      <p className="text-[#71717a] text-sm mb-5">
        We&apos;ll use this to frame your daily plan and time blocks.
      </p>

      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center gap-4">
          <label className="text-sm text-[#a1a1aa] w-20 flex-shrink-0">Starts at</label>
          <input
            type="time"
            value={dayStart}
            onChange={(e) => onDayStartChange(e.target.value)}
            className="bg-[#27272a] border border-[#3f3f46] rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#7c3aed] [color-scheme:dark]"
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="text-sm text-[#a1a1aa] w-20 flex-shrink-0">Ends at</label>
          <input
            type="time"
            value={dayEnd}
            onChange={(e) => onDayEndChange(e.target.value)}
            className="bg-[#27272a] border border-[#3f3f46] rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#7c3aed] [color-scheme:dark]"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 bg-[#27272a] hover:bg-[#3f3f46] border border-[#3f3f46] text-[#a1a1aa] hover:text-white font-medium py-2.5 px-4 rounded-lg transition-colors text-sm"
        >
          ← Back
        </button>
        <button
          onClick={onFinish}
          className="flex-1 bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-medium py-2.5 px-4 rounded-lg transition-colors text-sm"
        >
          Finish ✓
        </button>
      </div>
    </div>
  );
}
