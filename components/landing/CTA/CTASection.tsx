import BackgroundColors from "./backgroundColors";
import MemoizedCTAText from "./textContent";
import MemoizedCTAImage from "./CTAImage";
import React from "react";


const CTASection = () => {

    return (
        <section className="w-full py-20 relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950">
            <BackgroundColors/>
            <div className="relative w-full max-w-7xl mx-auto px-6 z-10">
                <div className="rounded-2xl px-8 py-16 md:px-16 bg-slate-900/50 backdrop-blur-md border border-cyan-700/30 shadow-[0_0_60px_-15px_rgba(6,182,212,0.1)]">
                    <div className="flex flex-col lg:flex-row items-center gap-12">

                        <MemoizedCTAText/>

                        <MemoizedCTAImage/>

                    </div>
                </div>
            </div>
        </section>
    )
}


export default CTASection;
