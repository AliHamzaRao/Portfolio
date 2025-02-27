import dbConnect from "@/lib/mongodb"
import Profile from "@/models/Profile"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    await dbConnect()
    const profile = await Profile.findOne()
    return NextResponse.json({ success: true, data: profile })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 })
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect()
    const data = await request.json()
    const profile = await Profile.findOneAndUpdate({}, data, {
      new: true,
      upsert: true,
      runValidators: true,
    })
    return NextResponse.json({ success: true, data: profile })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 })
  }
}

// Add PUT method explicitly
export async function PUT(request: Request) {
  try {
    await dbConnect()
    const data = await request.json()
    const profile = await Profile.findOneAndUpdate({}, data, {
      new: true,
      upsert: true,
      runValidators: true,
    })
    return NextResponse.json({ success: true, data: profile })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 })
  }
}

