import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Experience from "@/models/Experience"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const experience = await Experience.findById(params.id)
    if (!experience) {
      return NextResponse.json({ success: false }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: experience })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const data = await request.json()
    const experience = await Experience.findByIdAndUpdate(params.id, data, {
      new: true,
      runValidators: true,
    })
    if (!experience) {
      return NextResponse.json({ success: false }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: experience })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const experience = await Experience.findByIdAndDelete(params.id)
    if (!experience) {
      return NextResponse.json({ success: false }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: {} })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 })
  }
}

