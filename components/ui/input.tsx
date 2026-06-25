import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "min-h-12 flex-1 rounded-full bg-transparent px-5 text-base font-semibold text-[#171713] outline-none placeholder:text-[#9c9d96] focus-visible:ring-2 focus-visible:ring-[#ff6247]/35",
        className,
      )}
      {...props}
    />
  );
}
