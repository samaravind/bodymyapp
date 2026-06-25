import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "dark" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg" | "default" | "icon";

const variants: Record<ButtonVariant, string> = {
  default:
    "bg-[#ff6247] text-white shadow-[0_14px_36px_rgba(255,98,71,0.26)] hover:-translate-y-0.5 hover:bg-[#f2553d]",
  dark:
    "bg-[#12120f] text-white shadow-[0_14px_35px_rgba(18,18,15,0.18)] hover:-translate-y-0.5 hover:bg-black",
  outline:
    "border border-[#171713]/10 bg-white text-[#171713] shadow-[0_12px_30px_rgba(23,23,19,0.06)] hover:-translate-y-0.5 hover:border-[#ff6247]/40",
  ghost: "bg-transparent text-[#63655f] hover:bg-[#171713]/5 hover:text-[#171713]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-7 text-base",
  default: "h-10 px-4 py-2 text-sm",
  icon: "size-9 p-0",
};

export function buttonVariants({
  className,
  size = "md",
  variant = "default",
}: {
  className?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
} = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-black transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6247]/45 disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({ className, size = "md", variant = "default", ...props }: ButtonProps) {
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  );
}
