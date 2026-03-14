import { NextResponse } from "next/server";
import { readData, writeData } from "@/lib/storage";
import { getTodayDate } from "@/lib/streakLogic";

export async function POST() {
  const data = readData();
  const today = getTodayDate();

  if (data.studyDates.includes(today)) {
    return NextResponse.json(
      { success: false, message: "You have already marked today." },
      { status: 400 }
    );
  }

  data.studyDates.push(today);
  writeData(data);

  return NextResponse.json({ success: true, message: "Study session recorded!" });
}
