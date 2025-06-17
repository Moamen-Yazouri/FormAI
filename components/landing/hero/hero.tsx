"use client";
import dynamic from "next/dynamic";
import MemoizedBackgroundElements from "./backgroundElements";
import MemoizedLeftMotionElements from "./leftMotionElements";
import RightMotionsElements from "./rightMotionsElements";
import React from "react";

const FormDataFlow = dynamic(() =>
    import("../hero/form-data-flow").then(mod => mod.FormDataFlow),
    { ssr: false }
);
const FloatingFormElements = dynamic(() =>
    import("../hero/floating-form-elements").then(mod => mod.FloatingFormElements),
    { ssr: false }
);


const EnhancedHero = () => {
    
    return (
        <div className="bg-slate-950 relative overflow-hidden pt-20 pb-10">
        
            <MemoizedBackgroundElements />

            <div className="absolute inset-0 z-0 pointer-events-none">
                <FormDataFlow  />
                <FloatingFormElements />
            </div>

            <section className="relative py-8 md:py-12 w-full z-10">
                <div className="relative w-full max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <MemoizedLeftMotionElements />
                        <RightMotionsElements />
                    </div>
                </div>
            </section>
        </div>
    );
}
const MemoizedHero = React.memo(EnhancedHero);
export default MemoizedHero;