import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs outline-none transition-all duration-200",
        "bg-slate-900/50 border-cyan-500/30 text-slate-200 placeholder:text-blue-300",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:border-cyan-500",
        "aria-invalid:border-red-500 aria-invalid:ring-red-500/40 dark:aria-invalid:ring-red-400/40",
        className,
      )}
      {...props}
    />
  )
}

export { Input }
