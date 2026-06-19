import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from("bookings")
      .insert([{
        user_id: body.userId,
        truck_id: body.truckId,
        pickup_address: body.pickupAddress,
        dropoff_address: body.dropoffAddress,
        pickup_date: body.pickupDate,
        pickup_time: body.pickupTime,
        distance: body.distance,
        estimated_hours: body.estimatedHours,
        total_price: body.totalPrice,
        status: "pending",
      }])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, booking: data })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    let query = supabase
      .from("bookings")
      .select("*, trucks(*)")
      .order("created_at", { ascending: false })

    if (userId) {
      query = query.eq("user_id", userId)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json({ success: true, bookings: data })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
