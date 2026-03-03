import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/context/auth";
import { OnboardingProvider } from "@/context/onboarding";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Momentum HQ — Personal Ops Cockpit",
  description:
    "Daily plan, priorities, time blocks, and review for founders who ship.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0f0f11] text-[#f4f4f5] min-h-screen`}
      >
        <AuthProvider>
          <OnboardingProvider>{children}</OnboardingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
