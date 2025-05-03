import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import ResumeSettings from "@/models/ResumeSettings"

export async function GET() {
  try {
    await dbConnect()
    const settings = await ResumeSettings.findOne()
    return NextResponse.json({ success: true, data: settings })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 })
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect()
    const data = await request.json()
    const settings = await ResumeSettings.create(data)
    return NextResponse.json({ success: true, data: settings }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 })
  }
}

export async function PUT(request: Request) {
  try {
    await dbConnect()
    const data = await request.json()
    const settings = await ResumeSettings.findOneAndUpdate({}, data, {
      new: true,
      upsert: true,
      runValidators: true,
    })
    return NextResponse.json({ success: true, data: settings })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 })
  }
}
