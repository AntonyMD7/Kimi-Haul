import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // TODO: Connect to Supabase and create booking
    // For now, return mock success
    return NextResponse.json({ 
      success: true, 
      booking: {
        id: "mock-booking-id",
        ...body,
        status: "pending",
        created_at: new Date().toISOString()
      }
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    // TODO: Fetch from Supabase
    return NextResponse.json({ 
      success: true, 
      bookings: []
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
