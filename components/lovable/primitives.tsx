import * as React from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-[#c6f135] text-[#08080f] shadow-[0_18px_44px_rgba(198,241,53,0.24)] hover:-translate-y-0.5 hover:bg-[#d7ff5d]",
  secondary:
    "bg-white text-[#08080f] shadow-[0_18px_44px_rgba(255,255,255,0.12)] hover:-translate-y-0.5 hover:bg-[#f4f7ec]",
  outline:
    "border border-white/12 bg-white/[0.04] text-white hover:-translate-y-0.5 hover:border-[#c6f135]/45 hover:bg-[#c6f135]/10",
  ghost: "bg-transparent text-white/70 hover:bg-white/8 hover:text-white",
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-sm",
  lg: "h-14 px-7 text-base",
};

export interface LovableButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function LovableButton({
  className,
  size = "md",
  variant = "primary",
  ...props
}: LovableButtonProps) {
  return (
    <button
      suppressHydrationWarning
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-black transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c6f135]/50 disabled:pointer-events-none disabled:opacity-50",
        buttonVariants[variant],
        buttonSizes[size],
        className,
      )}
      {...props}
    />
  );
}

export function LovableCard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border border-white/10 bg-[#0f0f1c]/88 shadow-[0_24px_70px_rgba(0,0,0,0.28)]",
        className,
      )}
      {...props}
    />
  );
}

export function LovableBadge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-2 rounded-full border border-[#c6f135]/25 bg-[#c6f135]/10 px-4 py-2 text-xs font-black uppercase text-[#d9ff65]",
        className,
      )}
      {...props}
    />
  );
}

export function LovableInput({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      suppressHydrationWarning
      className={cn(
        "min-h-12 min-w-0 flex-1 rounded-lg border border-white/10 bg-white/[0.06] px-4 text-base font-bold text-white outline-none placeholder:text-white/42 focus:border-[#c6f135]/50 focus:ring-2 focus:ring-[#c6f135]/20",
        className,
      )}
      {...props}
    />
  );
}

export function LovableProgress({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className={cn("h-2 overflow-hidden rounded-full bg-white/10", className)}>
      <div
        className="h-full rounded-full bg-[linear-gradient(90deg,#c6f135,#10b981)]"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
