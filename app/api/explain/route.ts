import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  const { topic } = await req.json();
  if (!topic || topic.trim().length === 0) {
    return NextResponse.json({ error: "Topic is required" }, { status: 400 });
  }
  try {
    const message = await client.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 1024,
      messages: [{ role: "user", content: `You are a helpful study assistant. Explain the following topic clearly for a student. Structure your response with: 1. A simple 1-2 sentence definition 2. 3-4 key points 3. One real-world example. Keep it under 300 words.\n\nTopic: ${topic}` }],
    });
    const text = message.content.filter((b) => b.type === "text").map((b) => (b as { type: "text"; text: string }).text).join("");
    return NextResponse.json({ explanation: text });
  } catch (error) {
    console.error("Anthropic error:", error);
    return NextResponse.json({ error: "Failed to get AI explanation." }, { status: 500 });
  }
}
