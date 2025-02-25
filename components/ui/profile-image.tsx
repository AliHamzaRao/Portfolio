import { cn } from "@/lib/utils";
import Image from "next/image";

interface ProfileImageProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizes = {
  sm: "w-12 h-12",
  md: "w-16 h-16",
  lg: "w-24 h-24",
  xl: "w-32 h-32",
};

export function ProfileImage({
  src,
  alt,
  size = "md",
  className,
}: ProfileImageProps) {
  return (
    <div
      className={cn(
        "relative rounded-full overflow-hidden border-2 border-white shadow-lg",
        sizes[size],
        className
      )}
    >
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        fill
        className="object-cover"
        sizes={`(max-width: 768px) ${
          Number.parseInt(sizes[size]) * 0.8
        }px, ${Number.parseInt(sizes[size])}px`}
      />
    </div>
  );
}

