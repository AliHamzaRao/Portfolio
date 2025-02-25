import { existsSync } from "fs"
import { mkdir, writeFile } from "fs/promises"
import { NextResponse } from "next/server"
import { join } from "path"

export async function POST(request: Request) {
    try {
        const formData = await request.formData()
        const file = formData.get("file") as File
        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Create unique filename
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
        const filename = `${uniqueSuffix}-${file.name}`

        // Ensure uploads directory exists
        const uploadDir = join(process.cwd(), "public", "uploads")
        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true })
        }

        // Save to public/uploads directory
        const path = join(uploadDir, filename)
        await writeFile(path, buffer)

        // Return the URL
        const url = `/uploads/${filename}`

        return NextResponse.json({ url })
    } catch (error) {
        console.error("Error uploading file:", error)
        return NextResponse.json({ error: "Error uploading file" }, { status: 500 })
    }
}

