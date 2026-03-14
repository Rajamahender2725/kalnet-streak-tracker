import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daily Learning Streak Tracker",
  description: "Track your daily study streak",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0f0f1a] text-slate-100">
        <nav className="border-b border-slate-800 bg-[#0f0f1a]/80 backdrop-blur sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              <span className="font-bold text-lg text-indigo-400">StreakTracker</span>
            </div>
            <div className="flex gap-6 text-sm font-medium">
              <a href="/dashboard" className="text-slate-300 hover:text-indigo-400 transition-colors">Dashboard</a>
              <a href="/history" className="text-slate-300 hover:text-indigo-400 transition-colors">History</a>
            </div>
          </div>
        </nav>
        <main className="max-w-4xl mx-auto px-4 py-10">{children}</main>
      </body>
    </html>
  );
}
