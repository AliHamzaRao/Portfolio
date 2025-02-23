import dbConnect from "@/lib/mongodb"
import Project from "@/models/Project"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        await dbConnect()
        const projects = await Project.find({})
        return NextResponse.json({ success: true, data: projects })
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 })
    }
}

export async function PUT(request: Request) {
    try {
        await dbConnect()
        const data = await request.json()
        const project = await Project.findOneAndUpdate({}, data, {
            new: true,
            upsert: true,
            runValidators: true,
        })
        return NextResponse.json({ success: true, data: project })
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 })
    }
}

