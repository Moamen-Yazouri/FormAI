"use client"
import React from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface ScrollableContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    maxHeight?: string
    hideScrollbar?: boolean
}

const ScrollableContainer = React.forwardRef<HTMLDivElement, ScrollableContainerProps>(
    ({ className, children, maxHeight = "70vh", hideScrollbar = false, ...props }, ref) => {
        const isMobile = useIsMobile();
        return (
        <div
            ref={ref}
            className={cn("overflow-y-auto", hideScrollbar ? "scrollbar-hide" : "custom-scrollbar pr-2", className)}
            style={{ maxHeight }}
            {...props}
        >
            {children}
        </div>
        )
    },
)

ScrollableContainer.displayName = "ScrollableContainer"

export { ScrollableContainer }
