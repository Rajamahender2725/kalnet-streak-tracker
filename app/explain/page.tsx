"use client";
import { useState } from "react";
import Link from "next/link";

const SUGGESTED_TOPICS = ["Photosynthesis", "Newton's Laws of Motion", "Recursion in Programming", "World War II", "Pythagorean Theorem", "DNA Replication", "Supply and Demand", "Machine Learning"];

export default function ExplainPage() {
  const [topic, setTopic] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleExplain = async (topicToExplain: string = topic) => {
    if (!topicToExplain.trim()) return;
    setLoading(true); setExplanation(""); setError(""); setTopic(topicToExplain);
    try {
      const res = await fetch("/api/explain", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ topic: topicToExplain }) });
      const data = await res.json();
      if (data.error) setError(data.error);
      else setExplanation(data.explanation);
    } catch { setError("Something went wrong. Please try again."); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">🤖 AI Study Topic Explainer</h1>
        <p className="text-slate-400 mt-2">Type any study topic and Claude AI will explain it in a clear, student-friendly way.</p>
      </div>
      <div className="rounded-2xl border border-slate-700/50 bg-slate-800/30 p-6 space-y-4">
        <label className="block text-sm font-medium text-slate-300 uppercase tracking-wide">Enter a Study Topic</label>
        <div className="flex gap-3">
          <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleExplain()} placeholder="e.g. Photosynthesis, Newton's Laws, Recursion..." className="flex-1 bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors" />
          <button onClick={() => handleExplain()} disabled={loading || !topic.trim()} className="bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-xl transition-all duration-200 active:scale-95 whitespace-nowrap">
            {loading ? "Explaining..." : "Explain →"}
          </button>
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-2 uppercase tracking-wide">Try a suggested topic:</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_TOPICS.map((t) => (<button key={t} onClick={() => handleExplain(t)} disabled={loading} className="text-xs bg-slate-700/50 hover:bg-indigo-500/20 border border-slate-600 hover:border-indigo-500/40 text-slate-300 hover:text-indigo-300 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50">{t}</button>))}
          </div>
        </div>
      </div>
      {error && <div className="bg-red-500/20 border border-red-500/30 text-red-300 rounded-xl px-5 py-4 text-sm">⚠️ {error}</div>}
      {loading && <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6 space-y-3 animate-pulse"><div className="h-4 bg-slate-700 rounded w-3/4" /><div className="h-4 bg-slate-700 rounded w-full" /><div className="h-4 bg-slate-700 rounded w-5/6" /></div>}
      {explanation && !loading && (
        <div className="rounded-2xl border border-violet-500/30 bg-violet-500/5 p-6 space-y-4">
          <div className="flex items-center gap-2"><span className="text-2xl">🤖</span><h2 className="font-bold text-violet-300 text-lg">AI Explanation: {topic}</h2></div>
          <div className="text-slate-200 leading-relaxed whitespace-pre-wrap text-sm">{explanation}</div>
          <div className="pt-2 border-t border-slate-700"><button onClick={() => handleExplain()} className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">🔄 Regenerate explanation</button></div>
        </div>
      )}
      <div className="text-center"><Link href="/dashboard" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors">← Back to Dashboard</Link></div>
    </div>
  );
}
