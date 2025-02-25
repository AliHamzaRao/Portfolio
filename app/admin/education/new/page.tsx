"use client";

import { EducationForm } from "@/components/admin/forms/EducationForm";
import { useRouter } from "next/navigation";

export default function NewEducationPage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      const response = await fetch("/api/education", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/admin/education");
      } else {
        throw new Error("Failed to create education entry");
      }
    } catch (error) {
      console.error("Error creating education entry:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Add New Education</h1>
      <EducationForm onSubmit={handleSubmit} />
    </div>
  );
}

