import { NextResponse } from "next/server";
import { getStyleRecommendation } from "@/lib/aiService";
import { AIStyleInput } from "@/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.garment) {
      return NextResponse.json(
        { error: "garment is required" },
        { status: 400 }
      );
    }

    const input: AIStyleInput = {
      garment: body.garment,
      occasion: body.occasion || "Formal & Business",
      notes: body.notes || "",
    };

    const recommendation = await getStyleRecommendation(input);

    return NextResponse.json({
      recommendation,
      source: process.env.GEMINI_API_KEY ? "gemini" : "curated_archive",
    });
  } catch (error) {
    console.error("AI Style API error:", error);
    return NextResponse.json(
      { error: "Failed to generate recommendation" },
      { status: 500 }
    );
  }
}
