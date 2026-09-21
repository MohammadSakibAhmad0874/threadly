import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// ── GET /api/orders/[id] ─────────────────────────────────────
// Fetch a single order by ID
export async function GET(_request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ order: data });
  } catch (err) {
    console.error("GET /api/orders/[id] error:", err);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}

// ── PATCH /api/orders/[id] ───────────────────────────────────
// Update order status or any field (used by Live Stitch tracker)
export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    const supabase = createServerClient();

    // Only allow updating safe fields
    const allowedFields = [
      "status",
      "delivery_date",
      "timeline",
      "notes",
      "measurements",
      "fabric",
    ];

    const updates: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("orders")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ order: data });
  } catch (err) {
    console.error("PATCH /api/orders/[id] error:", err);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}
