interface StreakCardProps {
  title: string;
  value: string | number;
  icon: string;
  accent?: string;
}

export default function StreakCard({ title, value, icon, accent = "indigo" }: StreakCardProps) {
  const accentMap: Record<string, string> = {
    indigo: "border-indigo-500/30 bg-indigo-500/10",
    purple: "border-purple-500/30 bg-purple-500/10",
    emerald: "border-emerald-500/30 bg-emerald-500/10",
    amber: "border-amber-500/30 bg-amber-500/10",
  };

  return (
    <div className={`rounded-2xl border p-6 ${accentMap[accent] || accentMap.indigo}`}>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl">{icon}</span>
        <span className="text-sm font-medium text-slate-400 uppercase tracking-wide">{title}</span>
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
}
