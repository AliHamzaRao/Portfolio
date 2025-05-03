import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Testimonial from "@/models/Testimonial"

export async function GET() {
  try {
    await dbConnect()
    const testimonials = await Testimonial.find({}).sort("order")
    return NextResponse.json({ success: true, data: testimonials })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 })
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect()
    const data = await request.json()
    const testimonial = await Testimonial.create(data)
    return NextResponse.json({ success: true, data: testimonial }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 })
  }
}
