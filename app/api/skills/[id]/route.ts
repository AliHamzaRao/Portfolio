import dbConnect from "@/lib/mongodb"
import Skill from "@/models/Skill"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const skill = await Skill.findById(params.id)
    if (!skill) {
      return NextResponse.json({ success: false }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: skill })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const data = await request.json()
    const skill = await Skill.findByIdAndUpdate(params.id, data, {
      new: true,
      runValidators: true,
    })
    if (!skill) {
      return NextResponse.json({ success: false }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: skill })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const skill = await Skill.findByIdAndDelete(params.id)
    if (!skill) {
      return NextResponse.json({ success: false }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: {} })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 })
  }
}

