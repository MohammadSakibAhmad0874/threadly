import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

// ── GET /api/profile ─────────────────────────────────────────
export async function GET(request: Request) {
  try {
    const phone = request.headers.get("x-user-phone");
    if (!phone) {
      return NextResponse.json(
        { error: "x-user-phone header is required" },
        { status: 401 }
      );
    }

    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("phone", phone)
      .single();

    if (error && error.code !== "PGRST116") throw error; // PGRST116 = not found

    return NextResponse.json({ profile: data ?? null });
  } catch (err) {
    console.error("GET /api/profile error:", err);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

// ── POST /api/profile ────────────────────────────────────────
// Upsert (create or update) user profile
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.phone) {
      return NextResponse.json(
        { error: "phone is required" },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    const profileRow = {
      phone: body.phone,
      name: body.name ?? "",
      email: body.email ?? "",
      addresses: body.addresses ?? [],
    };

    const { data, error } = await supabase
      .from("profiles")
      .upsert(profileRow, { onConflict: "phone" })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ profile: data });
  } catch (err) {
    console.error("POST /api/profile error:", err);
    return NextResponse.json(
      { error: "Failed to save profile" },
      { status: 500 }
    );
  }
}
