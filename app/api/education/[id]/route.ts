import dbConnect from "@/lib/mongodb"
import Education from "@/models/Education"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect()
        const education = await Education.findById(params.id)
        if (!education) {
            return NextResponse.json({ success: false }, { status: 404 })
        }
        return NextResponse.json({ success: true, data: education })
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 })
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect()
        const data = await request.json()
        const education = await Education.findByIdAndUpdate(params.id, data, {
            new: true,
            runValidators: true,
        })
        if (!education) {
            return NextResponse.json({ success: false }, { status: 404 })
        }
        return NextResponse.json({ success: true, data: education })
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 })
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect()
        const education = await Education.findByIdAndDelete(params.id)
        if (!education) {
            return NextResponse.json({ success: false }, { status: 404 })
        }
        return NextResponse.json({ success: true, data: {} })
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 })
    }
}

