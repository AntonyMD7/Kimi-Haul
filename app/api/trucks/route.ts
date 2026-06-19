import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const available = searchParams.get("available")

    let query = supabase.from("trucks").select("*")

    if (type && type !== "all") {
      query = query.eq("type", type)
    }

    if (available === "true") {
      query = query.eq("available", true)
    }

    const { data, error } = await query.order("price_per_hour", { ascending: true })

    if (error) throw error

    return NextResponse.json({ success: true, trucks: data })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
