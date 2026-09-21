import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

// ── GET /api/orders ──────────────────────────────────────────
// Returns all orders for the authenticated user (by phone header)
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
      .from("orders")
      .select("*")
      .eq("user_id", phone)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ orders: data ?? [] });
  } catch (err) {
    console.error("GET /api/orders error:", err);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

// ── POST /api/orders ─────────────────────────────────────────
// Creates a new order in Supabase
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate core fields
    const required = ["id", "garmentType", "garmentName", "pickupDate", "pickupTime", "userId"];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const supabase = createServerClient();

    const orderRow = {
      id: body.id,
      user_id: body.userId,
      garment_type: body.garmentType,
      garment_name: body.garmentName,
      status: body.status ?? "ORDER_PLACED",
      pickup_date: body.pickupDate,
      pickup_time: body.pickupTime,
      delivery_date: body.deliveryDate ?? null,
      address: body.address ?? {},
      measurements: body.measurements ?? {},
      fabric: body.fabric ?? {},
      price: body.price ?? 0,
      timeline: body.timeline ?? [],
      notes: body.notes ?? null,
    };

    const { data, error } = await supabase
      .from("orders")
      .insert(orderRow)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ order: data }, { status: 201 });
  } catch (err) {
    console.error("POST /api/orders error:", err);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
