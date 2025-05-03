import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Testimonial from "@/models/Testimonial"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const testimonial = await Testimonial.findById(params.id)
    if (!testimonial) {
      return NextResponse.json({ success: false }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: testimonial })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const data = await request.json()
    const testimonial = await Testimonial.findByIdAndUpdate(params.id, data, {
      new: true,
      runValidators: true,
    })
    if (!testimonial) {
      return NextResponse.json({ success: false }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: testimonial })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const testimonial = await Testimonial.findByIdAndDelete(params.id)
    if (!testimonial) {
      return NextResponse.json({ success: false }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: {} })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 })
  }
}
