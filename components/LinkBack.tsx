"use client";

import { useRouter } from "next/navigation";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  classNameIcon?: string;
}

export default function LinkBack({ className, classNameIcon }: Props) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.back()}
      className={cn(
        "p-2 w-10 h-10 rounded-full hover:bg-slate-400/30 transition-colors inline-block cursor-pointer",
        className
      )}
    >
      <MdOutlineKeyboardBackspace
        className={cn("w-full h-full", classNameIcon)}
      />
    </div>
  );
}
