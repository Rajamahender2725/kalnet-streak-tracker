"use client";

import { useEffect, useState, useCallback } from "react";
import StreakCard from "@/components/StreakCard";
import StudyButton from "@/components/StudyButton";

interface StreakData {
  streak: number;
  totalDays: number;
  lastStudyDate: string | null;
}

export default function DashboardPage() {
  const [data, setData] = useState<StreakData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStreak = useCallback(async () => {
    try {
      const res = await fetch("/api/streak");
      const json = await res.json();
      setData(json);
    } catch {
      console.error("Failed to fetch streak");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStreak();
  }, [fetchStreak]);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white">
          Welcome back! 👋
        </h1>
        <p className="text-slate-400 mt-2">
          Keep your streak alive — consistency is the key to mastery.
        </p>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl border border-slate-700 bg-slate-800/30 p-6 animate-pulse h-28" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StreakCard
            title="Current Streak"
            value={`${data?.streak ?? 0} days`}
            icon="🔥"
            accent="indigo"
          />
          <StreakCard
            title="Total Study Days"
            value={data?.totalDays ?? 0}
            icon="📚"
            accent="purple"
          />
          <StreakCard
            title="Last Studied"
            value={data?.lastStudyDate ?? "Never"}
            icon="📅"
            accent="emerald"
          />
        </div>
      )}

      {/* Streak Visual */}
      {!loading && (data?.streak ?? 0) > 0 && (
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 flex items-center gap-4">
          <div className="text-5xl">
            {(data?.streak ?? 0) >= 7 ? "🏆" : (data?.streak ?? 0) >= 3 ? "⚡" : "🌱"}
          </div>
          <div>
            <p className="font-bold text-amber-300 text-lg">
              {(data?.streak ?? 0) >= 7
                ? "Incredible! You're on fire!"
                : (data?.streak ?? 0) >= 3
                ? "Great work! Keep it up!"
                : "Good start! Build that habit!"}
            </p>
            <p className="text-slate-400 text-sm mt-0.5">
              You&apos;ve studied {data?.streak} day{data?.streak !== 1 ? "s" : ""} in a row.
            </p>
          </div>
        </div>
      )}

      {/* Study Button */}
      <div className="rounded-2xl border border-slate-700/50 bg-slate-800/30 p-8 flex flex-col items-center gap-4">
        <h2 className="text-xl font-semibold text-slate-200">Ready to log today&apos;s session?</h2>
        <p className="text-slate-400 text-sm text-center">
          Click the button below to record that you studied today.
        </p>
        <StudyButton onSuccess={fetchStreak} />
      </div>

      {/* Quick link to history */}
      <div className="text-center">
        <a
          href="/history"
          className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
        >
          View full study history →
        </a>
      </div>
    </div>
  );
}
