"use client";

import React, { useMemo } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface ScrollableContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    maxHeight?: string;
    hideScrollbar?: boolean;
    enableScrollOptimization?: boolean;
}

const ScrollableContainer = React.forwardRef<HTMLDivElement, ScrollableContainerProps>(
    ({ 
        className, 
        children, 
        maxHeight = "70vh", 
        hideScrollbar = false, 
        enableScrollOptimization = true,
        ...props 
    }, ref) => {
        const isMobile = useIsMobile();
        
        const containerClassName = useMemo(() => {
            return cn(
                "overflow-y-auto",
                hideScrollbar ? "scrollbar-hide" : "custom-scrollbar pr-2",
                isMobile && "mt-14",
                enableScrollOptimization && [
                    "will-change-scroll",
                    "transform-gpu",
                ],
                className
            );
        }, [hideScrollbar, isMobile, enableScrollOptimization, className]);

        const containerStyle = useMemo(() => ({
            maxHeight,
            ...(enableScrollOptimization && {
                WebkitOverflowScrolling: 'touch' as any,
                scrollBehavior: 'smooth' as const,
                contain: 'layout style paint' as any,
            }),
        }), [maxHeight, enableScrollOptimization]);

        return (
            <div
                ref={ref}
                className={containerClassName}
                style={containerStyle}
                {...props}
            >
                {children}
            </div>
        );
    }
);

ScrollableContainer.displayName = "ScrollableContainer";

export { ScrollableContainer };