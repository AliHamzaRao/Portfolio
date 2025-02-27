import dbConnect from "@/lib/mongodb"
import Experience from "@/models/Experience"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    await dbConnect()
    const experiences = await Experience.find({}).sort("order")
    return NextResponse.json({ success: true, data: experiences })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 })
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect()
    const data = await request.json()
    const experience = await Experience.create(data)
    return NextResponse.json({ success: true, data: experience }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 })
  }
}

