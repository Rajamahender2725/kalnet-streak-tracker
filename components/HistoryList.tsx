interface HistoryItem {
  raw: string;
  formatted: string;
}

interface HistoryListProps {
  history: HistoryItem[];
}

export default function HistoryList({ history }: HistoryListProps) {
  const today = new Date().toISOString().split("T")[0];

  if (history.length === 0) {
    return (
      <div className="text-center py-16 text-slate-500">
        <p className="text-5xl mb-4">📚</p>
        <p className="text-lg">No study sessions yet.</p>
        <p className="text-sm mt-1">Go to the dashboard and mark your first study day!</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {history.map((item, index) => (
        <li
          key={item.raw}
          className="flex items-center justify-between bg-slate-800/50 border border-slate-700/50 rounded-xl px-5 py-4"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">{item.raw === today ? "🔥" : "✅"}</span>
            <span className="font-medium text-slate-200">{item.formatted}</span>
            {item.raw === today && (
              <span className="text-xs bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 px-2 py-0.5 rounded-full">
                Today
              </span>
            )}
          </div>
          <span className="text-xs text-slate-500">#{history.length - index}</span>
        </li>
      ))}
    </ul>
  );
}
