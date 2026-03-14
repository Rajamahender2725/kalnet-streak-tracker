"use client";

import { useEffect, useState } from "react";
import HistoryList from "@/components/HistoryList";

interface HistoryItem {
  raw: string;
  formatted: string;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/history")
      .then((r) => r.json())
      .then((d) => setHistory(d.history))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">Study History 📖</h1>
        <p className="text-slate-400 mt-2">
          Every day you studied — listed newest first.
        </p>
      </div>

      {/* Summary badge */}
      {!loading && history.length > 0 && (
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-full px-4 py-2 text-sm font-medium">
          📊 Total: {history.length} study day{history.length !== 1 ? "s" : ""}
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-xl bg-slate-800/30 animate-pulse h-16" />
          ))}
        </div>
      ) : (
        <HistoryList history={history} />
      )}

      <div className="text-center pt-4">
        <a
          href="/dashboard"
          className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
        >
          ← Back to Dashboard
        </a>
      </div>
    </div>
  );
}
