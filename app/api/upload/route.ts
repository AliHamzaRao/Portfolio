import { put } from "@vercel/blob"
import { handleUpload } from "@vercel/blob/client"
import { NextResponse } from "next/server"

export async function POST(request: Request): Promise<NextResponse> {
    const body = await request.json()

    try {
        const jsonResponse = await handleUpload({
            body,
            request,
            onBeforeGenerateToken: async (pathname) => {
                // Check authentication if needed
                return {
                    allowedContentTypes: ["image/jpeg", "image/png", "image/gif"],
                    maximumSizeInBytes: 5 * 1024 * 1024, // 5MB
                }
            },
            onUploadCompleted: async ({ blob }) => {
                // You can store the blob URL in your database here if needed
                console.log("Upload completed", blob)
            },
        })

        return NextResponse.json(jsonResponse)
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Error uploading file" },
            { status: 400 },
        )
    }
}

// Handle PUT requests from the Vercel Blob client
export async function PUT(request: Request): Promise<NextResponse> {
    const blob = await put(request.url, request, {
        access: "public",
    })

    return NextResponse.json(blob)
}

