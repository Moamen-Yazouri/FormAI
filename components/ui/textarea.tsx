import * as React from "react"
import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex w-full min-h-16 rounded-md border px-3 py-2 text-base md:text-sm shadow-xs outline-none transition-[color,box-shadow]",

        "bg-slate-950 text-slate-200 placeholder:text-slate-400",

        "border-slate-700 focus-visible:border-cyan-500 focus-visible:ring-2 focus-visible:ring-cyan-500/40",

        "aria-invalid:border-red-500 dark:aria-invalid:ring-red-600/30",

        
        "disabled:cursor-not-allowed disabled:opacity-50",

        
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
