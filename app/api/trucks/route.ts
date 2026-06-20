import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    // TODO: Fetch from Supabase
    return NextResponse.json({ 
      success: true, 
      trucks: []
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
