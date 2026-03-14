export interface StudyData {
  studyDates: string[]; // ISO date strings YYYY-MM-DD
}

export function getTodayDate(): string {
  return new Date().toISOString().split("T")[0];
}

export function calculateStreak(studyDates: string[]): number {
  if (studyDates.length === 0) return 0;

  const sorted = [...studyDates].sort((a, b) => (a > b ? -1 : 1));
  const today = getTodayDate();
  const yesterday = getDateOffset(-1);

  // Streak only counts if studied today or yesterday
  if (sorted[0] !== today && sorted[0] !== yesterday) return 0;

  let streak = 1;
  for (let i = 1; i < sorted.length; i++) {
    const expected = getDateOffset(-(i), sorted[0] === today ? 0 : 1);
    if (sorted[i] === expected) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

function getDateOffset(offset: number, extraOffset: number = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offset - extraOffset);
  return d.toISOString().split("T")[0];
}

export function hasStudiedToday(studyDates: string[]): boolean {
  return studyDates.includes(getTodayDate());
}

export function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
