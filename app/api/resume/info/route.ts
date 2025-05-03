import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Profile from "@/models/Profile"

export async function GET() {
  try {
    await dbConnect()
    const profile = await Profile.findOne()

    if (!profile || !profile.resumeUrl) {
      return NextResponse.json({ success: false, message: "No resume found" }, { status: 200 })
    }

    return NextResponse.json({
      success: true,
      url: profile.resumeUrl,
      name: profile.resumeName || "resume.pdf",
    })
  } catch (error) {
    console.error("Error fetching resume info:", error)
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect()
    const { url, name, size, type } = await request.json()

    if (!url || !name) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    const profile = await Profile.findOneAndUpdate(
      {},
      {
        resumeUrl: url,
        resumeName: name,
        resumeSize: size,
        resumeType: type,
        updatedAt: new Date(),
      },
      { new: true, upsert: true },
    )

    return NextResponse.json({
      success: true,
      url: profile.resumeUrl,
      name: profile.resumeName,
    })
  } catch (error) {
    console.error("Error saving resume info:", error)
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    await dbConnect()
    await Profile.findOneAndUpdate(
      {},
      {
        $unset: { resumeUrl: "", resumeName: "", resumeSize: "", resumeType: "" },
      },
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting resume info:", error)
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}
