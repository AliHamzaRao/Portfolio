import type { SocialPlatform } from "./social-platform"

// Function to fetch social platforms from a public API
export async function fetchSocialPlatformsFromAPI(query = ""): Promise<SocialPlatform[]> {
  try {
    // Using the Simple Icons API to get social platform icons
    const response = await fetch(`https://api.simpleicons.org/icons?q=${query}`)
    const data = await response.json()

    // Transform the data to match our interface
    return data.map((item: any) => ({
      name: item.title,
      icon: item.slug,
      urlPattern: getUrlPatternForPlatform(item.title),
    }))
  } catch (error) {
    console.error("Error fetching social platforms:", error)
    // Fallback to some common platforms if the API fails
    return getDefaultSocialPlatforms()
  }
}

// Helper function to get URL pattern based on platform name
function getUrlPatternForPlatform(platformName: string): string {
  const name = platformName.toLowerCase()

  // Define patterns for common platforms
  const patterns: Record<string, string> = {
    github: "https://github.com/[username]",
    linkedin: "https://linkedin.com/in/[username]",
    twitter: "https://twitter.com/[username]",
    x: "https://x.com/[username]",
    instagram: "https://instagram.com/[username]",
    facebook: "https://facebook.com/[username]",
    youtube: "https://youtube.com/c/[username]",
    medium: "https://medium.com/@[username]",
    dev: "https://dev.to/[username]",
    dribbble: "https://dribbble.com/[username]",
    behance: "https://behance.net/[username]",
    codepen: "https://codepen.io/[username]",
    stackoverflow: "https://stackoverflow.com/users/[username]",
    gitlab: "https://gitlab.com/[username]",
    bitbucket: "https://bitbucket.org/[username]",
    hashnode: "https://hashnode.com/@[username]",
    twitch: "https://twitch.tv/[username]",
    reddit: "https://reddit.com/user/[username]",
    pinterest: "https://pinterest.com/[username]",
    tiktok: "https://tiktok.com/@[username]",
  }

  // Return the pattern if found, otherwise use a generic pattern
  return patterns[name] || `https://${name}.com/[username]`
}

// Default social platforms as fallback
function getDefaultSocialPlatforms(): SocialPlatform[] {
  return [
    { name: "GitHub", icon: "github", urlPattern: "https://github.com/[username]" },
    { name: "LinkedIn", icon: "linkedin", urlPattern: "https://linkedin.com/in/[username]" },
    { name: "Twitter", icon: "twitter", urlPattern: "https://twitter.com/[username]" },
    { name: "Instagram", icon: "instagram", urlPattern: "https://instagram.com/[username]" },
    { name: "Facebook", icon: "facebook", urlPattern: "https://facebook.com/[username]" },
    { name: "YouTube", icon: "youtube", urlPattern: "https://youtube.com/c/[username]" },
    { name: "Medium", icon: "medium", urlPattern: "https://medium.com/@[username]" },
    { name: "Dev.to", icon: "dev", urlPattern: "https://dev.to/[username]" },
    { name: "Dribbble", icon: "dribbble", urlPattern: "https://dribbble.com/[username]" },
    { name: "Behance", icon: "behance", urlPattern: "https://behance.net/[username]" },
  ]
}
