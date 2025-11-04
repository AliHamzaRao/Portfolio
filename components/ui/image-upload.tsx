"use client";

import { Button } from "@/components/ui/button";
import { upload } from "@vercel/blob/client";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import type React from "react";
import { useCallback, useState } from "react";

interface ImageUploadProps {
  onChange: (value: string[]) => void;
  onRemove: (value: string) => void;
  value: string[];
  multiple?: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {
  const [loading, setLoading] = useState(false);

  const onUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        setLoading(true);
        const file = e.target.files?.[0];
        if (!file) return;

        // Upload to Vercel Blob
        const blob = await upload(file.name, file, {
          access: "public",
          handleUploadUrl: "/api/upload",
        });

        onChange([...value, blob.url]);
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setLoading(false);
      }
    },
    [onChange]
  );

  return (
    <div className="mb-4 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => document.getElementById("imageUpload")?.click()}
          disabled={loading}
        >
          <ImagePlus className="h-4 w-4 mr-2" />
          {loading ? "Uploading..." : "Upload Image"}
        </Button>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onUpload}
          disabled={loading}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {value.map((url) => (
          <div key={url} className="relative group aspect-square">
            <div className="absolute inset-0 flex items-center justify-center opacity-0 bg-black/40 group-hover:opacity-100 transition-opacity z-10">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => onRemove(url)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Image
              src={url || "/placeholder.svg"}
              alt="Upload"
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100px, 200px"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

