import { cn } from "@/lib/utils";
import type { HTMLAttributes, PropsWithChildren } from "react";

export default function Container({
  children,
  className,
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className={cn("container lg:mx-auto max-w-6xl", className)} {...rest}>
      {children}
    </div>
  );
}
