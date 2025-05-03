"use client"

import type React from "react"

import { useEffect, useState } from "react"
import AdminLayout from "@/components/admin/AdminLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, Search, ExternalLink } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { fetchSocialPlatformsFromAPI } from "@/lib/social-platforms-service"
import { useProfile } from "@/contexts/ProfileContext"

interface SocialPlatform {
  name: string
  icon: string
  urlPattern: string
}

interface SocialLink {
  platform: string
  url: string
  icon: string
}

export default function SocialsPage() {
  const { toast } = useToast()
  const { profile, refreshProfile } = useProfile()
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([])
  const [filteredPlatforms, setFilteredPlatforms] = useState<SocialPlatform[]>([])
  const [showPlatformSelector, setShowPlatformSelector] = useState(false)
  const [newSocialLink, setNewSocialLink] = useState<SocialLink>({
    platform: "",
    url: "",
    icon: "",
  })
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load available platforms
        const availablePlatforms = await fetchSocialPlatformsFromAPI()
        setPlatforms(availablePlatforms)
        setFilteredPlatforms(availablePlatforms)

        // Load existing social links from profile
        if (profile && profile.socialLinks) {
          setSocialLinks(profile.socialLinks)
        }
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [profile])

  useEffect(() => {
    if (searchQuery) {
      const filtered = platforms.filter((platform) => platform.name.toLowerCase().includes(searchQuery.toLowerCase()))
      setFilteredPlatforms(filtered)
    } else {
      setFilteredPlatforms(platforms)
    }
  }, [searchQuery, platforms])

  const handleSelectPlatform = (platform: SocialPlatform) => {
    setNewSocialLink({
      platform: platform.name,
      url: platform.urlPattern.replace("[username]", ""),
      icon: platform.icon,
    })
    setShowPlatformSelector(false)
  }

  const handleAddSocialLink = async () => {
    if (!newSocialLink.platform || !newSocialLink.url) {
      toast({
        title: "Error",
        description: "Please select a platform and enter a URL",
        variant: "destructive",
      })
      return
    }

    try {
      // Add to local state
      const updatedLinks = [...socialLinks, newSocialLink]
      setSocialLinks(updatedLinks)

      // Update profile
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...profile,
          socialLinks: updatedLinks,
        }),
      })

      if (!response.ok) throw new Error("Failed to update social links")

      await refreshProfile()

      toast({
        title: "Success",
        description: "Social link added successfully",
      })

      // Reset form
      setNewSocialLink({
        platform: "",
        url: "",
        icon: "",
      })
    } catch (error) {
      console.error("Error adding social link:", error)
      toast({
        title: "Error",
        description: "Failed to add social link",
        variant: "destructive",
      })
    }
  }

  const handleRemoveSocialLink = async (index: number) => {
    try {
      // Remove from local state
      const updatedLinks = socialLinks.filter((_, i) => i !== index)
      setSocialLinks(updatedLinks)

      // Update profile
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...profile,
          socialLinks: updatedLinks,
        }),
      })

      if (!response.ok) throw new Error("Failed to update social links")

      await refreshProfile()

      toast({
        title: "Success",
        description: "Social link removed successfully",
      })
    } catch (error) {
      console.error("Error removing social link:", error)
      toast({
        title: "Error",
        description: "Failed to remove social link",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <p>Loading social platforms...</p>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Manage Social Links</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Add New Social Link</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Platform</label>
                  <div className="relative">
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                      onClick={() => setShowPlatformSelector(!showPlatformSelector)}
                    >
                      {newSocialLink.platform || "Select a platform"}
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>

                    {showPlatformSelector && (
                      <Card className="absolute z-10 w-full mt-1 max-h-64 overflow-auto">
                        <CardContent className="p-2">
                          <div className="sticky top-0 bg-background p-2">
                            <div className="relative">
                              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Search platforms..."
                                className="pl-8"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="mt-2 space-y-1">
                            {filteredPlatforms.map((platform) => (
                              <Button
                                key={platform.name}
                                variant="ghost"
                                className="w-full justify-start"
                                onClick={() => handleSelectPlatform(platform)}
                              >
                                {platform.name}
                              </Button>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">URL</label>
                  <Input
                    value={newSocialLink.url}
                    onChange={(e) => setNewSocialLink({ ...newSocialLink, url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>

                <div className="flex items-end">
                  <Button onClick={handleAddSocialLink} disabled={!newSocialLink.platform || !newSocialLink.url}>
                    <Plus className="mr-2 h-4 w-4" /> Add
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Social Links</CardTitle>
          </CardHeader>
          <CardContent>
            {socialLinks.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>You haven't added any social links yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {socialLinks.map((link, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 flex items-center justify-center bg-background rounded-full">
                        {/* Use Simple Icons CDN for the icon */}
                        <img
                          src={`https://cdn.simpleicons.org/${link.icon}`}
                          alt={link.platform}
                          className="w-5 h-5"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg?height=20&width=20"
                          }}
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{link.platform}</h3>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted-foreground hover:text-primary flex items-center"
                        >
                          {link.url}
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </div>
                    </div>
                    <Button variant="destructive" size="icon" onClick={() => handleRemoveSocialLink(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

function ChevronDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}
