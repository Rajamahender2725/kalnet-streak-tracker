import { NextResponse } from "next/server";
import { readData } from "@/lib/storage";
import { formatDate } from "@/lib/streakLogic";

export async function GET() {
  const data = readData();
  const sorted = [...data.studyDates].sort((a, b) => (a > b ? -1 : 1));
  const history = sorted.map((d) => ({ raw: d, formatted: formatDate(d) }));
  return NextResponse.json({ history });
}
