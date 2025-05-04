"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { EducationForm } from "@/components/admin/forms/EducationForm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditEducationPage({
  params,
}: {
  params: { id: string };
}) {
  const [education, setEducation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const response = await fetch(`/api/education/${params.id}`);
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

  const handleSubmit = async (data: any) => {
    try {
      const response = await fetch(`/api/education/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/admin/education");
      } else {
        throw new Error("Failed to update education");
      }
    } catch (error) {
      console.error("Error updating education:", error);
    }
  };

  if (isLoading) {
    return <AdminLayout><div>Loading...</div></AdminLayout>;
  }

  if (!education) {
    return <AdminLayout><div>Education entry not found</div></AdminLayout>;
  }

  return (

    <AdminLayout><div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Education</h1>
      <EducationForm initialData={education} onSubmit={handleSubmit} />
    </div></AdminLayout>
  );
}

