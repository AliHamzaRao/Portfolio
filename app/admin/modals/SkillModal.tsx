"use client";

import { SkillForm } from "@/components/admin/forms/SkillForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

interface SkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  skill?: any;
  onSubmit: (data: any) => Promise<void>;
}

export function SkillModal({
  isOpen,
  onClose,
  skill,
  onSubmit,
}: SkillModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      onClose();
    } catch (error) {
      console.error("Error submitting skill:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{skill ? "Edit Skill" : "Add New Skill"}</DialogTitle>
        </DialogHeader>
        <SkillForm initialData={skill} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}

