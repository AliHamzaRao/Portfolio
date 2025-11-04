"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ImageUpload } from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ProfileImage } from "@/components/ui/profile-image";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  fetchSocialPlatforms,
  type SocialPlatform,
} from "@/lib/social-platform";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

interface ProfileFormProps {
  initialData?: any;
  onSubmit: (data: any) => Promise<void>;
}

export function ProfileForm({ initialData, onSubmit }: ProfileFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    title: initialData?.title || "",
    description: initialData?.description || "",
    aboutMe: initialData?.aboutMe || "", // added about me field
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    location: initialData?.location || "",
    image: initialData?.image || "",
    socialLinks: Array.isArray(initialData?.socialLinks)
      ? initialData.socialLinks
      : [],
  });

  const [newSocialLink, setNewSocialLink] = useState<SocialLink>({
    platform: "",
    url: "",
    icon: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [platforms, setPlatforms] = useState<SocialPlatform[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openPlatformSelect, setOpenPlatformSelect] = useState(false);

  useEffect(() => {
    if (searchQuery) {
      const delayDebounceFn = setTimeout(() => {
        fetchSocialPlatforms(searchQuery).then(setPlatforms);
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchQuery]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  };

  const addSocialLink = () => {
    if (newSocialLink.platform && newSocialLink.url) {
      setFormData({
        ...formData,
        socialLinks: [...formData.socialLinks, { ...newSocialLink }],
      });
      setNewSocialLink({ platform: "", url: "", icon: "" });
    }
  };

  const removeSocialLink = (index: number) => {
    setFormData({
      ...formData,
      socialLinks: formData.socialLinks.filter((_: any, i: any) => i !== index),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Image Upload Card */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Image</CardTitle>
        </CardHeader>
        <CardContent>
          <ImageUpload
            value={formData.image ? [formData.image] : []}
            onChange={(url) => setFormData({ ...formData, image: url })}
            onRemove={() => setFormData({ ...formData, image: "" })}
          />
          {formData.image && (
            <div className="flex justify-center mt-4">
              <ProfileImage
                src={formData.image}
                alt="Profile Preview"
                size="xl"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Personal Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Existing personal information fields */}
          <div className="space-y-2">
            <label htmlFor="name">Full Name</label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="title">Professional Title</label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description">Short Description</label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="A brief description that appears in the hero section"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="aboutMe">About Me Section</label>
            <Textarea
              id="aboutMe"
              value={formData.aboutMe}
              onChange={(e) =>
                setFormData({ ...formData, aboutMe: e.target.value })
              }
              placeholder="Detailed about me section that appears in the About section"
              className="h-32"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone">Phone</label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="location">Location</label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Social Links Card */}
      <Card>
        <CardHeader>
          <CardTitle>Social Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Popover
                open={openPlatformSelect}
                onOpenChange={setOpenPlatformSelect}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[200px] bg-transparent"
                  >
                    {newSocialLink.platform || "Select platform"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search platforms..."
                      value={searchQuery}
                      onValueChange={setSearchQuery}
                    />
                    <CommandList>
                      <CommandEmpty>No platform found.</CommandEmpty>
                      <CommandGroup>
                        {platforms.map((platform) => (
                          <CommandItem
                            key={platform.name}
                            onSelect={() => {
                              setNewSocialLink({
                                ...newSocialLink,
                                platform: platform.name,
                                icon: platform.icon,
                              });
                              setOpenPlatformSelect(false);
                            }}
                          >
                            {platform.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <Input
                placeholder="Username or full URL"
                value={newSocialLink.url}
                onChange={(e) => {
                  const platform = platforms.find(
                    (p) => p.name === newSocialLink.platform
                  );
                  let url = e.target.value;
                  if (platform && !url.startsWith("http")) {
                    url = platform.urlPattern.replace(
                      "[username]",
                      e.target.value
                    );
                  }
                  setNewSocialLink({ ...newSocialLink, url });
                }}
              />
              <Button type="button" onClick={addSocialLink}>
                Add
              </Button>
            </div>

            <div className="space-y-2">
              {formData.socialLinks.map((link: SocialLink, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-secondary p-2 rounded"
                >
                  <span className="flex-1">{link.platform}</span>
                  <span className="flex-1 truncate">{link.url}</span>
                  <span className="flex-1">{link.icon}</span>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeSocialLink(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Profile"}
      </Button>
    </form>
  );
}
