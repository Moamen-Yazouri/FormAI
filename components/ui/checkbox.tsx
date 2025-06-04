"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        // Base shape & layout
        "size-4 shrink-0 rounded-[4px] border transition-shadow shadow-xs outline-none",

        // Background & border (dark-friendly)
        "bg-slate-950 border-slate-700",

        // Checked state
        "data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500 data-[state=checked]:text-white",

        // Focus ring
        "focus-visible:ring-2 focus-visible:ring-cyan-500/40 focus-visible:border-cyan-500",

        // Error state (aria-invalid)
        "aria-invalid:border-red-500 dark:aria-invalid:ring-red-600/30",

        // Disabled state
        "disabled:cursor-not-allowed disabled:opacity-50",

        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
