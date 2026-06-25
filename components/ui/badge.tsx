import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-[#f0dcd5] bg-white/72 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#ff6247] shadow-[0_16px_48px_rgba(23,23,19,0.05)]",
        className,
      )}
      {...props}
    />
  );
}
