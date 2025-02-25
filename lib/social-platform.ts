export interface SocialPlatform {
    name: string
    icon: string
    urlPattern: string
}

// Function to fetch social platforms from a public API
export async function fetchSocialPlatforms(query: string): Promise<SocialPlatform[]> {
    try {
        // You can replace this with any public API that provides social media platform data
        const response = await fetch(`https://api.simplesvg.com/v1/search?q=${query}`)
        const data = await response.json()

        // Transform the data to match our interface
        return data.map((item: any) => ({
            name: item.name,
            icon: item.icon,
            urlPattern: item.url_pattern || `https://${item.name.toLowerCase()}.com/[username]`,
        }))
    } catch (error) {
        console.error("Error fetching social platforms:", error)
        // Fallback to some common platforms if the API fails
        return [
            { name: "GitHub", icon: "github", urlPattern: "https://github.com/[username]" },
            { name: "LinkedIn", icon: "linkedin", urlPattern: "https://linkedin.com/in/[username]" },
            { name: "Twitter", icon: "twitter", urlPattern: "https://twitter.com/[username]" },
            { name: "Instagram", icon: "instagram", urlPattern: "https://instagram.com/[username]" },
            { name: "Facebook", icon: "facebook", urlPattern: "https://facebook.com/[username]" },
            { name: "YouTube", icon: "youtube", urlPattern: "https://youtube.com/c/[username]" },
            { name: "Medium", icon: "medium", urlPattern: "https://medium.com/@[username]" },
            { name: "Dev.to", icon: "dev", urlPattern: "https://dev.to/[username]" },
        ]
    }
}

