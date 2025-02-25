import dbConnect from "@/lib/mongodb"
import Education from "@/models/Education"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        await dbConnect()
        const education = await Education.find({}).sort("order")
        return NextResponse.json({ success: true, data: education })
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 })
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect()
        const data = await request.json()
        const education = await Education.create(data)
        return NextResponse.json({ success: true, data: education }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 })
    }
}

