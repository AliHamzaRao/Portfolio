import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export function middleware(request: NextRequest) {
    // Get the pathname of the request (e.g. /, /api/endpoint)
    const path = request.nextUrl.pathname

    // If it's the root path, just return the response
    if (path === "/") {
        return NextResponse.next()
    }

    const origin = request.headers.get("origin") || ""

    // Handle OPTIONS request for CORS
    if (request.method === "OPTIONS") {
        return new NextResponse(null, {
            status: 204,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                "Access-Control-Max-Age": "86400",
            },
        })
    }

    // Handle the actual request
    const response = NextResponse.next()

    // Add the CORS headers to the response
    response.headers.set("Access-Control-Allow-Origin", "*")
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")

    return response
}

export const config = {
    matcher: "/api/:path*",
}

