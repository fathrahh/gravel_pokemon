import { cn } from "@/lib/utils";
import type { HTMLAttributes, PropsWithChildren } from "react";

export default function Container({
  children,
  className,
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={cn("flex flex-col container lg:mx-auto", className)}
      {...rest}
    >
      {children}
    </div>
  );
}
