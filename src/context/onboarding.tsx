"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

export interface OnboardingData {
  priorities: [string, string, string];
  dayStart: string;
  dayEnd: string;
}

interface OnboardingContextValue {
  isComplete: boolean;
  data: OnboardingData | null;
  completeOnboarding: (data: OnboardingData) => void;
  resetOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

const STORAGE_KEY = "momentum_onboarding";

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [isComplete, setIsComplete] = useState(false);
  const [data, setData] = useState<OnboardingData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed: OnboardingData = JSON.parse(stored);
        setData(parsed);
        setIsComplete(true);
      } catch {
        // ignore malformed data
      }
    }
  }, []);

  const completeOnboarding = useCallback((onboardingData: OnboardingData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(onboardingData));
    setData(onboardingData);
    setIsComplete(true);
  }, []);

  const resetOnboarding = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setData(null);
    setIsComplete(false);
  }, []);

  return (
    <OnboardingContext.Provider value={{ isComplete, data, completeOnboarding, resetOnboarding }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding(): OnboardingContextValue {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding must be used within <OnboardingProvider>");
  return ctx;
}
