"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EducationPage() {
  const [education, setEducation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const response = await fetch("/api/education");
      const data = await response.json();
      if (data.success) {
        setEducation(data.data);
      }
    } catch (error) {
      console.error("Error fetching education:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this education entry?"))
      return;

    try {
      const response = await fetch(`/api/education/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setEducation(education.filter((edu: any) => edu._id !== id));
      }
    } catch (error) {
      console.error("Error deleting education:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Education</h1>
        <Button onClick={() => router.push("/admin/education/new")}>
          <Plus className="mr-2 h-4 w-4" /> Add Education
        </Button>
      </div>

      <div className="grid gap-4">
        {education.map((edu: any) => (
          <Card key={edu._id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div>
                  <span>{edu.degree}</span>
                  <span className="text-muted-foreground text-sm ml-2">
                    at {edu.institution}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => router.push(`/admin/education/${edu._id}`)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(edu._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{edu.period}</p>
              {edu.description && <p className="mt-2">{edu.description}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

