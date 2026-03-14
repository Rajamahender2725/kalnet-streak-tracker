"use client";

import { useState } from "react";

interface StudyButtonProps {
  onSuccess: () => void;
}

export default function StudyButton({ onSuccess }: StudyButtonProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/study", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setMessage({ text: data.message, type: "success" });
        onSuccess();
      } else {
        setMessage({ text: data.message, type: "error" });
      }
    } catch {
      setMessage({ text: "Something went wrong. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handleClick}
        disabled={loading}
        className="w-full max-w-sm bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-lg py-4 px-8 rounded-2xl shadow-lg shadow-indigo-500/25 transition-all duration-200 active:scale-95"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Marking...
          </span>
        ) : (
          "✅ I Studied Today"
        )}
      </button>

      {message && (
        <div
          className={`w-full max-w-sm text-center py-3 px-4 rounded-xl text-sm font-medium ${
            message.type === "success"
              ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-300"
              : "bg-red-500/20 border border-red-500/30 text-red-300"
          }`}
        >
          {message.type === "success" ? "🎉 " : "⚠️ "}
          {message.text}
        </div>
      )}
    </div>
  );
}
