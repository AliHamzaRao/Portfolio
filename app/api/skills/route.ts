import dbConnect from "@/lib/mongodb"
import Skill from "@/models/Skill"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    await dbConnect()
    const skills = await Skill.find({}).sort("order")
    return NextResponse.json({ success: true, data: skills })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 })
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect()
    const data = await request.json()
    const skill = await Skill.create(data)
    return NextResponse.json({ success: true, data: skill }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 })
  }
}

