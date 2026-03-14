import { NextResponse } from "next/server";
import { readData } from "@/lib/storage";
import { calculateStreak, formatDate } from "@/lib/streakLogic";

export async function GET() {
  const data = readData();
  const sorted = [...data.studyDates].sort((a, b) => (a > b ? -1 : 1));
  const streak = calculateStreak(data.studyDates);
  const totalDays = data.studyDates.length;
  const lastStudyDate = sorted[0] ? formatDate(sorted[0]) : null;

  return NextResponse.json({ streak, totalDays, lastStudyDate });
}
