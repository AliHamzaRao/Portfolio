import dbConnect from "@/lib/mongodb"
import Project from "@/models/Project"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect()
        const project = await Project.findById(params.id)
        if (!project) {
            return NextResponse.json({ success: false }, { status: 404 })
        }
        return NextResponse.json({ success: true, data: project })
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 })
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect()
        const data = await request.json()
        const project = await Project.findByIdAndUpdate(params.id, data, {
            new: true,
            runValidators: true,
        })
        if (!project) {
            return NextResponse.json({ success: false }, { status: 404 })
        }
        return NextResponse.json({ success: true, data: project })
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 })
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect()
        const project = await Project.findByIdAndDelete(params.id)
        if (!project) {
            return NextResponse.json({ success: false }, { status: 404 })
        }
        return NextResponse.json({ success: true, data: {} })
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 })
    }
}

