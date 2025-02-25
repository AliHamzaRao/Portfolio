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
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";

interface SkillFormProps {
  initialData?: any;
  onSubmit: (data: any) => Promise<void>;
}

interface DevIcon {
  name: string;
  versions: {
    svg: string[];
  };
}

export function SkillForm({ initialData, onSubmit }: SkillFormProps) {
  const [open, setOpen] = useState(false);
  const [skills, setSkills] = useState<DevIcon[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    icon: initialData?.icon || "",
    category: initialData?.category || "Frontend",
    order: initialData?.order || 0,
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.json"
      );
      const data = await response.json();
      setSkills(data);
    } catch (error) {
      console.error("Error fetching skills:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSkillSelect = async (skillName: string) => {
    try {
      // Get the SVG URL for the selected skill
      const skill = skills.find(
        (s) => s.name.toLowerCase() === skillName.toLowerCase()
      );
      if (skill) {
        const iconVersion = skill.versions.svg[0]; // Get the first SVG version
        const iconUrl = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.name}/${skill.name}-${iconVersion}.svg`;

        setFormData({
          ...formData,
          name: skillName,
          icon: iconUrl,
        });
      }
    } catch (error) {
      console.error("Error setting skill icon:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Skill Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label>Skill</label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {formData.name || "Select skill..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search skills..." />
                  <CommandList>
                    <CommandEmpty>No skill found.</CommandEmpty>
                    <CommandGroup className="max-h-60 overflow-auto">
                      {skills.map((skill) => (
                        <CommandItem
                          key={skill.name}
                          onSelect={() => {
                            handleSkillSelect(skill.name);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              formData.name === skill.name
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {skill.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <label htmlFor="customSkill">Custom Skill Name (Optional)</label>
            <Input
              id="customSkill"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Or enter custom skill name"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="icon">Custom Icon URL (Optional)</label>
            <Input
              id="icon"
              value={formData.icon}
              onChange={(e) =>
                setFormData({ ...formData, icon: e.target.value })
              }
              placeholder="Enter custom icon URL"
            />
          </div>

          {formData.icon && (
            <div className="flex items-center gap-2">
              <span>Preview:</span>
              <img
                src={formData.icon || "/placeholder.svg"}
                alt={formData.name}
                className="w-6 h-6"
              />
            </div>
          )}

          <div className="space-y-2">
            <label>Category</label>
            <select
              className="w-full p-2 border rounded"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Database">Database</option>
              <option value="DevOps">DevOps</option>
              <option value="Mobile">Mobile</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="order">Display Order</label>
            <Input
              id="order"
              type="number"
              value={formData.order}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  order: Number.parseInt(e.target.value),
                })
              }
              required
            />
          </div>
        </CardContent>
      </Card>

      <Button type="submit">Save Skill</Button>
    </form>
  );
}

